import { ApiError  } from "../utils/ApiError.js";

const validate = (schema) => async (req, res, next) => {
    try {
        
        await schema.parseAsync({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        next(); //if perfect,move on to the controller!

    } catch (error) {
        //If data is bad, format the errors and throw our ApiError
        const extractedErrors = error.errors.map((err) => ({
            field: err.path.join('.'),
            message: err.message
        }));

        //This pushes the error to our global Error handler

        next(new ApiError(400, "Validation Error", extractedErrors));
    }
}

export {validate};