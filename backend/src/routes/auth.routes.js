import express from "express";
import { googleLogin, getCurrentUser } from "../controllers/auth.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/google", googleLogin);

router.get("/me", verifyJWT, getCurrentUser);

export default router;