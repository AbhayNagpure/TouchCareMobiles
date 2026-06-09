import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import {errorHandler} from "./middlewares/error.middleware.js";
import authRouter from "./routes/auth.routes.js";
import productRouter from "./routes/product.routes.js";

const app = express();

//CORS middleware.
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

//Body parser middlewares
app.use(express.json({limit: "5mb"})); //without this req.body is undefined. this will parse JSON data so that backend can understand it.
app.use(express.urlencoded({extended: true, limit: "5mb"}));

//  Static files and cookies.
app.use(express.static("public"));
app.use(cookieParser());


app.use("/api/v1/auth", authRouter);
app.use("/api/v1/products", productRouter);

app.use(errorHandler);

export {app};
