import jwt from "jsonwebtoken";
import {User} from "../models/User.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        
        //1. we check for the token in the cookies OR the authorization header.
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer", " ");

        if(!token){
            throw new ApiError(401, "Unauthorized request: No Token found");
        }

        //2. decode the token using the secret key we defined in .env
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        //3. find the user in the database using the decoded_id
        const user = await User.findById(decodedToken?._id);

        if(!user){
            throw new ApiError(401, "Invalid Access Token");
        }

        //4, important: we attach the user object to the req. body;
        req.user = user;

        //5. Allow the request to proceed to the controller.
        next();


    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token");

    }
})

//Middleware to check if the logged in user is an admin.
export const verifyAdmin = asyncHandler(async (req, res, next) => {
    //We assume verifyJWT runs before this, so req.user is already available.

    if(!req.user){
        throw new ApiError(401, "Unauthorized request");
    }

    if(req.user.role !== "ADMIN"){
        throw new ApiError(403, "Forbidden: You do not have admin privileges");
    }

    // If they are an admin, allow the request to proceed to the controller
    next();

})