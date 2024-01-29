import express from "express";
import { welcome } from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/", welcome);

export default router;
