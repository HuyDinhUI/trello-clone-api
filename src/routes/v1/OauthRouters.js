import express from 'express'
import passport from 'passport';
import { OauthCallback } from '../../controllers/oauthController.js';

const router = express.Router();

// Gửi người dùng đến Google
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Google redirect về
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/',session:false }),
  OauthCallback
);

export const OauthRouter = router