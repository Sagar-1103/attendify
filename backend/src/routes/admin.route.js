import { Router } from "express";
import { createAdmin, loginAdmin, logoutAdmin } from "../controllers/admin.controller.js";
import {verifyAdmin} from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/create").post(createAdmin);
router.route("/login").post(loginAdmin);
router.route("/logout").patch(verifyAdmin,logoutAdmin);

export default router;