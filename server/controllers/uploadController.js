import cloudinary from '../config/cloudinary.js';

export const uploadProfilePicture = (req, res) => {
  const contentType = req.headers['content-type'];

  // Check if content type is supported (e.g., image/png)
  if (contentType !== 'image/png' && contentType !== 'image/jpeg') {
    return res.status(400).json({ message: 'Unsupported content type' });
  }

  // Upload raw file directly to Cloudinary
  const uploadStream = cloudinary.uploader.upload_stream(
    { folder: 'profile_pics', resource_type: 'image' },
    (error, result) => {
      if (error) {
        console.error('Error uploading file to Cloudinary:', error);
        return res.status(500).json({ message: 'Error uploading file' });
      }

      // Send back Cloudinary response with URL
      return res.status(200).json({ url: result.secure_url });
    },
  );

  // Pipe the raw file stream directly to Cloudinary
  req.pipe(uploadStream);
};
