import express from 'express';
import passport from 'passport';
import { signInGoogleUser } from '../controllers/authController.js';
const router = express.Router();

router.get('/google', passport.authenticate('google'));

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  signInGoogleUser,
);

router.get('/google/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

export default router;
