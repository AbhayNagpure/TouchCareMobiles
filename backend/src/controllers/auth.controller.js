import axios from "axios";
import {User} from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const googleLogin = asyncHandler(async (req, res) => {
    //1. Get the token sent by the frontend
    const { googleToken } = req.body;
    if(!googleToken){
        throw new ApiError(400, "Google token is required");
    }

    //2. Send the access_token to Google's userinfo endpoint to verify it and get user data
    // If the token is fake or expired, Google will return an error and we reject the request
    let googleUser;
    try {
        const { data } = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
            headers: { Authorization: `Bearer ${googleToken}` }
        });
        googleUser = data;
    } catch (error) {
        //if hacker sends a fake token, Google rejects it here.
        throw new ApiError(401, "Invalid Google Token");
    }

    //3. Extract the user's data from Google's verified response.
    //'sub' is Google's unique ID for the user.
    const { name, email, picture, sub: googleId } = googleUser;

    let user = await User.findOne({ email });

    if(!user){
        //if not, its a signup, lets create them.
        user = await User.create({
            name, 
            email,
            googleId,
            avatar: picture,
        })
    } else {
        // if user exists, update their avatar in case they didn't have one
        user.avatar = picture;
        user.name = name;
        await user.save({ validateBeforeSave: false });
    }

    //5.  Generate our own backend JWT token
    const accessToken = user.generateAccessToken();

    //6 Security magic: we send the token as an HTTP-only cookie!
    const cookieOptions = {
        httpOnly: true, //The frontend JS cannot access this cookie ( prevent XSS attacks )
        secure: process.env.NODE_ENV === "production", //must to true in production(HTTPS)
    };

    //7. Send our standardized ApiResponse
    return res.status(200).cookie("accessToken", accessToken, cookieOptions).json(
        new ApiResponse(
            200, 
            {
                user: {
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    avatar: user.avatar
                },
            },
            "User logged in successfully"
        )
    );
})


export const getCurrentUser = asyncHandler(async (req, res) => {
    // Because the request passed through the verifyJWT middleware first, 
    // we already have the authenticated user sitting inside `req.user`!

    return res
        .status(200).json(new ApiResponse(200, req.user, "Current user fetched successfuly"));
})