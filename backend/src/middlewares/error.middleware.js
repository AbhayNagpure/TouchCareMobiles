import { ApiError } from "../utils/ApiError.js";

//An Express error-handling middleware Always has 4 arguments: ( err, req, res, next)
export const errorHandler = (err, req, res, next) => {
    let error = err;

    //1. check if the error is already an instance of our custom ApiError
    //if a random internal Node.js error occurs, we wrap it is our ApiError to standardize it.

    if(!(error instanceof ApiError)){
        const statusCode = error.statusCode || 500;
        const message = error.message || "Internal Server Error";

        //we preseve the original stack trace if possible.
        error = new ApiError(statusCode, message, error?.errors || [], error.stack);

    }

    //2. prepare the final JSON response Payload
    const response = {
        success:  error.success,
        message: error.message,
        errors: error.errors,

        //SECURITY TRICK: Only sends the stack trace to the frontend if we are in development mode.
        //In production, exposing  stack traces gives hackers clue about your server file structure!

        ...(process.env.NODE_ENV === "development" ? {stack: error.stack} : {})

    }

    return res.status(error.statusCode || 500).json(response);
}