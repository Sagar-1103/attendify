import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

import homeRouter from "./routes/home.route.js";
import adminRouter from "./routes/admin.route.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
    origin:process.env.CORS_ORIGIN
}))

app.use("/",homeRouter);
app.use("/users/admin",adminRouter);

export {app};