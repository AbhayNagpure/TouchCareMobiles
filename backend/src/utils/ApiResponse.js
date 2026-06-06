class ApiResponse{
    constructor(statusCode, data, message = "Success"){
        this.statusCode = statusCode;
        this.data = data; //the acutal data (e.g, the product object, or array of users);
        
        this.message = message;

        this.success = statusCode < 400;
    }
}

export {ApiResponse}