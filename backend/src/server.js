import dotenv from "dotenv";
import {app} from "./app.js";
import connectDB from "./db/index.js";

//Load environment variables from a .env file
dotenv.config({
    path: './.env'
});


// Since connectDB is an async function, it returns a Promise.
// We chain .then() and .catch() to handle the result.
connectDB()
    .then(() => {
        //Only start the server if database is connect.
        const PORT = process.env.PORT || 8000;
        app.listen(PORT, () => {
            console.log(`Server is running on port: ${PORT}`);
        })
    })
    .catch((error) => {
        console.log("MongoDB connection failed in server.js")
    })