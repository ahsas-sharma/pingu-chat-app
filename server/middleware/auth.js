import jwt from 'jsonwebtoken';
import CONFIG from '../config/config.js';
import User from '../models/userModel.js';

// generate both access and refresh token for a given userId
export async function generateAccessAndRefreshTokens(userId) {
  console.log(`Generating access and refresh tokens ...`);
  try {
    let user = await User.findById(userId);
    const accessToken = jwt.sign(
      { userId: userId },
      CONFIG.ACCESS_TOKEN_SECRET,
      {
        expiresIn: '20m',
      },
    );
    const refreshToken = jwt.sign(
      { userId: userId },
      CONFIG.REFRESH_TOKEN_SECRET,
      { expiresIn: '90d' },
    );
    user.refreshToken = refreshToken;
    // store refresh token in the user document
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new Error(error.message);
  }
}

// Returns new access token using refresh token
export async function generateNewAccessToken(req) {
  const refreshToken = req.cookies?.refreshToken;
  if (!refreshToken) {
    throw new Error('Refresh token missing.');
  }
  try {
    const decodedRefreshToken = jwt.verify(
      refreshToken,
      CONFIG.REFRESH_TOKEN_SECRET,
    );

    if (!decodedRefreshToken) {
      throw new Error('Invalid refresh token.');
    }

    // find user for the refresh token and check its validity
    const user = await User.findById(decodedRefreshToken.userId);
    if (!user) {
      throw new Error('User not found.');
    }
    if (user.refreshToken !== refreshToken) {
      throw new Error('Invalid refresh token.');
    }

    // generate new access token
    console.log(`Generating new access token using existing refresh token...`);
    let newAccessToken = jwt.sign(
      { userId: decodedRefreshToken.userId },
      CONFIG.ACCESS_TOKEN_SECRET,
      {
        expiresIn: '15m',
      },
    );
    return newAccessToken;
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      console.log('Refresh token is expired. Please sign in to continue.');
      throw error;
    } else {
      throw error;
    }
  }
}

export async function verifyToken(req, res, next) {
  console.log(`Verifying token ...`);
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({ message: 'Authorization token missing.' });
    }
    const accessToken = req.headers.authorization.split(' ')[1];
    if (!accessToken) {
      return res
        .status(401)
        .json({ message: 'Access Denied. Authorization token missing.' });
    }
    var decodedPayload = jwt.verify(accessToken, CONFIG.ACCESS_TOKEN_SECRET);
    req.payload = decodedPayload;
    next();
  } catch (error) {
    // If token is expired, generate new access token and update authorization header
    if (error.name === 'TokenExpiredError') {
      console.log(`Token expired. Generating new access token...`);
      try {
        let newAccessToken = await generateNewAccessToken(req);

        var decodedPayload = jwt.verify(
          newAccessToken,
          CONFIG.ACCESS_TOKEN_SECRET,
        );
        req.payload = decodedPayload;

        // update authorization header
        res.set('Authorization', newAccessToken);

        // continue with user request
        next();
      } catch (error) {
        return res.status(401).json({ message: error.message });
      }
    } else {
      return res.status(401).json({ message: error.message });
    }
  }
}

// refresh both access and refresh tokens
export async function refreshTokens(req, res) {
  try {
    let { newAccessToken, newRefreshToken } =
      await generateAccessAndRefreshTokens(req.payload.userId);
    return res
      .cookie('refreshToken', newRefreshToken, {
        httpOnly: true,
        sameSite: 'strict',
        secure: true,
      })
      .header('Authorization', newAccessToken)
      .status(200)
      .json({ message: 'Token refreshed', token: newAccessToken });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
