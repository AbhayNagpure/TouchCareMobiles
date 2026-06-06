import mongoose from "mongoose";

const connectDB = async() => {
    try {

        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`);
        console.log(`MongoDb Connected! DB Host: ${connectionInstance.connection.host}`);

    } catch (error) {
        console.log("MONGODB connection FAILED: ", error);
        process.exit(1);
    }
}

export default connectDB;