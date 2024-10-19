import express from "express";
import { dbConnect } from "./config/dbConnect.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import morgan from "morgan";
import path from "path";

import { router } from "./routes/index.js";

const port = process.env.PORT

const app = express();

app.use(express.static("../client/build"));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors()
);
app.use(morgan("dev"));

app.use("/api", router);

app.get("*", (req, res) => {
  res.sendFile(path.resolve("..", "client", "build", "index.html"))
});

dbConnect().then(() => {
  app.listen(port, (e) => {
    if (e) {
      console.error(e, "Ошибка сервера");
    }
    console.log(`server started at http://localhost:${port}`);
  });
});
