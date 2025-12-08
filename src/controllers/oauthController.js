import jwt from "jsonwebtoken";
import ms from "ms";
export const OauthCallback = (req, res) => {
  const user = req.user;
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    process.env.ACCESS_TOKEN_SECRET_SIGNATURE,
    { expiresIn: "1d" }
  );

  res.cookie("accessToken", token, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: ms("14 days"),
  });

  
  const redirectUrl = `${process.env.FRONTEND_URL}/dashboard/boards`;
  res.redirect(redirectUrl);
};

