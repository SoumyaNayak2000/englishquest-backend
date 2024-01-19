import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { creatorRouter } from "./routes/auth.js";
import { UserRouter } from "./routes/user.js";
import { dashBoardRouter } from "./routes/dashboard.js";

import "./db.js";
import { BookRouter } from "./routes/book.js";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(cookieParser());

dotenv.config();

app.use("/api/v1/auth", creatorRouter);
app.use("/api/v1/adduser", UserRouter);
app.use("/api/v1/book", BookRouter);
app.use("/api/v1/creator", dashBoardRouter);

app.listen(process.env.PORT, () => {
  console.log("server is running");
});