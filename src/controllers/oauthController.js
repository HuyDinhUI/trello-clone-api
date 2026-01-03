import jwt from "jsonwebtoken";
import { JwtProvider } from "../providers/JwtProvider.js";
export const OauthCallback = async (req, res) => {
  const user = {
    id: req.user.id,
    email: req.user.email,
    username: req.user.username,
  };
  const accessToken = await JwtProvider.generateToken(
    user,
    process.env.ACCESS_TOKEN_SECRET_SIGNATURE,
    "5m"
  );

  const refreshToken = await JwtProvider.generateToken(
    user,
    process.env.REFRESH_TOKEN_SECRET_SIGNATURE,
    "14 days"
  );

  const redirectUrl = `${process.env.FRONTEND_URL}/auth/callback?accessToken=${accessToken}&refreshToken=${refreshToken}`;
  res.redirect(redirectUrl);
};
