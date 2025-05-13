import { Router } from "express";
import { getStatus } from "../controllers/home.controller.js";

const router = Router();

router.route("/").get(getStatus);

export default router;