import dotenv from "dotenv";
import express, { Request, Response } from "express";
import { connectToDB } from "./config/db";

const app = express();
dotenv.config();
connectToDB();

const PORT = process.env.PORT || 8000;

app.use("/", (req: Request, res: Response) => {
  res.send("Hello from backend");
});

app.listen(PORT, () => {
  console.log(`Server listening on PORT: ${PORT}`);
});
