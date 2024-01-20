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
app.use(
  cors({
    origin: "https://englishquest-frontend.vercel.app/",
    credentials: true,
  })
);

app.use(express.json());

// app.use(function (req, res, next) {
//   res.setHeader("Access-Control-Allow-Origin", "https://englishquest-frontend.vercel.app/);
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, OPTIONS, PUT, PATCH, DELETE"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "X-Requested-With,content-type"
//   );
//   res.setHeader("Access-Control-Allow-Credentials", true);
//   next();
// });
app.use(cookieParser());

dotenv.config();

app.use("/api/v1/auth", creatorRouter);
app.use("/api/v1/adduser", UserRouter);
app.use("/api/v1/book", BookRouter);
app.use("/api/v1/creator", dashBoardRouter);

app.listen(process.env.PORT, () => {
  console.log("server is running");
});

app.get("/", (req, res) => {
  res.send("Working fine");
});
