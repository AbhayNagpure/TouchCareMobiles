const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        //We wrap the controller function in a promise
        //If it succeeds, great. if it fails, .catch() automatically passes the error to next();
        Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
    };
};

export { asyncHandler };