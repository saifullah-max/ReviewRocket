import dotenv from "dotenv";
import express, { Request, Response } from "express";
import { connectToDB } from "./config/db";
import cors from "cors";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import "./config/passport";
import authRoutes from "./routes/auth";
import cookieParser from "cookie-parser";

dotenv.config();
connectToDB();

const PORT = process.env.PORT || 8000;

const SESSION_SECRET = process.env.SESSION_SECRET;

const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());

app.use(
  session({
    secret: SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.REMOTE_URI }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/", authRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on PORT: ${PORT}`);
});
