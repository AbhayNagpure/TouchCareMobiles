import {OAuth2Client} from "google-auth-library";
import {User} from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

//Initialize the google client

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleLogin = asyncHandler(async (req, res) => {
    //1. Get the token sent by the frontend
    const { googleToken } = req.body;
    if(!googleToken){
        throw new ApiError(400, "Google token is required");
    }

    //2. Ask google to verify the token if real and not expired
    let ticket;

    try {
        ticket = await client.verifyIdToken({
            idToken: googleToken,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
    } catch (error) {
        //if hacker send a fake token, we reject it here.
        throw new ApiError(401, "Invalid Google Token");
    }
    //3. Extract the user's data from googles verified response.
    //'sub' is Google's unique ID for the user.

    const {name, email, picture, sub: googleId} = ticket.getPayload();

    //4. check if this user is already exists in our MongoDB;
    let user = await User.findOne({ email });

    if(!user){
        //if not, its a signup, lets create them.
        user = await User.create({
            name, 
            email,
            googleId,
            avatar: picture,
        })
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
                    role: user.role
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