import { Router } from "express";
import { verifyAdmin } from "../middlewares/auth.middleware.js";
import { createStudent } from "../controllers/student.controller.js";

const router = Router();

router.route("/create").post(verifyAdmin,createStudent);

export default router;