import express from "express";
import dotenv from "dotenv";
dotenv.config();

import homeRouter from "./routes/home.route.js";
const app = express();

app.use("/",homeRouter);

export {app};