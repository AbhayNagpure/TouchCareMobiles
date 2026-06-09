import express from "express";
import { googleLogin, getCurrentUser } from "../controllers/auth.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {User} from "../models/User.model.js"
const router = express.Router();

router.post("/login", googleLogin);

router.get("/dev-token/:email", async (req, res) => {
    const user = await User.findOne({ email: req.params.email });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    
    // Generate the token
    const token = user.generateAccessToken();
    
    // Send it back so you can copy it into Postman!
    res.json({ accessToken: token });
});

router.get("/me", verifyJWT, getCurrentUser);

router.post("/logout", (req, res) => {
    res.clearCookie("accessToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
    });
    res.status(200).json({ message: "Logged out successfully" });
});

export default router;