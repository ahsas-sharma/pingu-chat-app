import express from 'express';
import { uploadProfilePicture } from '../controllers/uploadController.js';

const router = express.Router();

// Route to upload a profile picture
router.post('/', uploadProfilePicture);

export default router;
