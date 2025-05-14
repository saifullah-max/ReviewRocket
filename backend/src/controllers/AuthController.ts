import { Request, Response } from "express";
import User from "../models/User";

export const authController = async (req: Request, res: Response) => {
    console.log("Req:", req.body);
    const user = await User.findOne({})
    res.status(200).json({ redirect: "/", message: "Logged in Successfully" });
    return;
  };
