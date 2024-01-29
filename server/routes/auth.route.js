import express from "express";
import { login, signup, welcome } from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/welcome", welcome);
router.post("/signup", signup);
router.post("/login", login);

export default router;
