import passport from "passport";
import {
  Strategy as GoogleStrategy,
  StrategyOptionsWithRequest,
  Profile,
  VerifyCallback,
} from "passport-google-oauth20";
import User, { userInterface } from "../models/User";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

type DoneCallback = (
  error: any,
  user?: Express.User | false | null,
  info?: any
) => void;

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done: DoneCallback) => {
  try {
    const user = await User.findById(id);
    done(null, user as userInterface);
  } catch (error) {
    done(error);
  }
});

const googleStrategyOptions: StrategyOptionsWithRequest = {
  clientID: process.env.CLIENT_ID!,
  clientSecret: process.env.CLIENT_SECRET!,
  callbackURL: "http://localhost:8003/auth/google/callback",
  passReqToCallback: true,
  scope: ["profile", "email"],
};

passport.use(
  new GoogleStrategy(
    googleStrategyOptions,
    async (
      req: Request,
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: VerifyCallback
    ) => {
      try {
        let user = await User.findOne({ googleId: profile.id });
        console.log("Profile: ", profile);

        // Manual Access Token
        const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
        const token = jwt.sign(
          {
            googleId: profile.id,
            name: profile._json.name,
            email: profile._json.email,
          },
          JWT_ACCESS_SECRET!,
          {
            expiresIn: "1 day",
          }
        );

        if (!user) {
          user = await User.create({
            googleId: profile.id,
            name: profile._json.name,
            email: profile._json.email,
            accessToken: token,
          });
        }
        done(null, user as userInterface);
      } catch (err) {
        done(err);
      }
    }
  )
);
