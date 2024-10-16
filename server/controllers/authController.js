import User from '../models/userModel.js';
import { generateAccessAndRefreshTokens } from '../middleware/auth.js';

export const signInGoogleUser = async (req, res) => {
  let userEmail = req.user.emails[0].value;
  let userId = '';
  try {
    let existingUser = await User.findOne({ email: userEmail });

    // check if user already exists and update google id if needed
    if (existingUser) {
      if (existingUser.googleId === '') {
        existingUser.googleId = req.user.id;
        await existingUser.save({ validateBeforeSave: false });
      }
      userId = existingUser._id;
    } else {
      let newUser = await User.create({
        username: req.user.displayName,
        email: userEmail,
        googleId: req.user.id,
      });
      userId = newUser._id;
    }

    const { accessToken, refreshToken } =
      await generateAccessAndRefreshTokens(userId);

    return res
      .cookie('refreshToken', refreshToken, {
        httpOnly: true,
        sameSite: 'strict',
        secure: true,
      })
      .header('Authorization', accessToken)
      .status(200)
      .json({ token: accessToken });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
