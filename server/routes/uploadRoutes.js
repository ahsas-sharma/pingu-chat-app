import express from 'express';
import { uploadProfilePicture } from '../controllers/uploadController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Route to upload a profile picture
router.post('/', verifyToken, uploadProfilePicture);

export default router;
