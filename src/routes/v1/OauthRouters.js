import express from 'express'
import passport from 'passport';
import { OauthCallback } from '../../controllers/OauthController.js';

const router = express.Router();

// Gửi người dùng đến Google
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Google redirect về
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/v1/auth/google',session:false }),
  OauthCallback
);

export const OauthRouter = router