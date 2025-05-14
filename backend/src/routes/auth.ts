import express, { NextFunction, Request, Response } from "express";
import passport from "passport";
import User, { userInterface } from "../models/User";
import jwt, { JwtPayload } from "jsonwebtoken";

const router = express.Router();

router.get(
  "/auth/google",
  (req: Request, res: Response, next: NextFunction) => {
    console.log("Starting google Oauth");
    next();
  },
  passport.authenticate("google")
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  async (req: Request, res: Response) => {
    console.log("/auth/google/callback route called");
    console.log("Req user:", req.user);

    const { accessToken } = req.user as userInterface;
    console.log("Access token:", accessToken);
    res.cookie("token", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
    });
    res.redirect("http://localhost:5173/");
    // res.json({ message: "Authentication successful", redirect: "/" });
    return;
  }
);

router.get("/profile", (req: Request, res: Response) => {
  console.log("/profile called");
  const token = req.cookies.token;
  if (!token) return res.redirect("/login");
  const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
  const decoded = jwt.verify(token, JWT_ACCESS_SECRET!);
  console.log("Decoded:", decoded);
  const { name, email } = decoded as JwtPayload;
  console.log(`Name: ${name}, email: ${email}`);
  res.status(200).json({ message: "Welcome", name, email });
  return;
});

router.get("/logout", (req: Request, res: Response) => {
  req.logout((err) => {
    if (err) return res.status(500).send("Logout failed");
    return res.redirect("/login");
  });
});

router.get("/login", (req: Request, res: Response) => {
  res.send("<a href='/auth/google'>Login with Google</a>");
  return;
});

export default router;
