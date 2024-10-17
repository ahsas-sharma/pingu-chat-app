import cloudinary from '../config/cloudinary.js';
import User from '../models/userModel.js';

export const uploadProfilePicture = async (req, res) => {
  let user = await User.findById(req.payload.userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const contentType = req.headers['content-type'];

  // Check if content type is supported (e.g., image/png)
  if (contentType !== 'image/png' && contentType !== 'image/jpeg') {
    return res.status(400).json({ message: 'Unsupported content type' });
  }

  // Upload raw file directly to Cloudinary
  const uploadStream = cloudinary.uploader.upload_stream(
    { folder: 'profile_pics', resource_type: 'image' },
    async (error, result) => {
      if (error) {
        console.error('Error uploading file to Cloudinary:', error);
        return res.status(500).json({ message: 'Error uploading file' });
      }
      user.profilePic = result.secure_url;
      await user.save({ validateBeforeSave: false });

      // Send back Cloudinary response with URL
      return res.status(200).json({
        message: 'Profile picture uploaded',
        url: result.secure_url,
        user: user,
      });
    },
  );

  // Pipe the raw file stream directly to Cloudinary
  req.pipe(uploadStream);
};
