//Node.js has built in Error class

class ApiError extends Error {
    constructor(
        statusCode, 
        message = "Something went wrong",
        errors = [],
        stack = ""
    ) {
        //super() calls the constructor of the parent 'Error' class
        super(message);

        this.statusCode = statusCode;
        this.data = null; //we set data to null because this is an error, not a success response.

        this.message = message;
        this.success = false; //Always false so the frontend knows the request failed.

        this.errors = errors; //Array of specific errors (we will use this for zod validation Error)

        // This captures the exact file and line number where the error occured for debugging.
        
        if(stack){
            this.stack = stack;
        }
        else{
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export {ApiError};