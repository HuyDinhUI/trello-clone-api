import { StatusCodes } from "http-status-codes";
import { JwtProvider } from "../providers/JwtProvider.js";
import "dotenv/config";

const isAuthozied = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(StatusCodes.UNAUTHORIZED).json({ message: "Please Login" });
    return;
  }

  const [type, token] = authHeader.split(" ");
  if (type !== "Bearer" || !token) {
    res.status(StatusCodes.EXPECTATION_FAILED).json({message: "Header is invalid"})
    return;
  }

  try {
    const accessTokenDecoded = await JwtProvider.verifyToken(
      token,
      process.env.ACCESS_TOKEN_SECRET_SIGNATURE
    );

    req.jwtDecoded = accessTokenDecoded;
    next();
  } catch (error) {
    if (error.message?.includes("jwt expired")) {
      res.status(StatusCodes.GONE).json({ message: "Need to refresh token" });
      return;
    }

    res.status(StatusCodes.UNAUTHORIZED);
  }
};

export const authMiddleware = {
  isAuthozied,
};
