import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { lowercase } from "zod";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    googleId: {
        type: String,
        required: true,
        unique: true,
    },
    avatar: {
        type: String, //Profile picture from google.
    },
    role: {
        type: String, 
        enum: ["USER", "ADMIN"], 
        default: "USER"
    },
},
    { timestamps: true}
);

//Method to generate JWT token

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this.id,
            email: this.email,
            role: this.role
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "5d"
        }
    );
}

export const User = mongoose.model("User", userSchema)