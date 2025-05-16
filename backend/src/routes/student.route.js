import { Router } from "express";
import { verifyAdmin } from "../middlewares/auth.middleware.js";
import { createStudent, enrollStudent, getStudents } from "../controllers/student.controller.js";

const router = Router();

router.route("/create").post(verifyAdmin,createStudent);
router.route("/enroll").patch(verifyAdmin,enrollStudent);
router.route("/").get(verifyAdmin,getStudents);

export default router;