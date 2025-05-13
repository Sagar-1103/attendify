import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectDatabase = async()=>{
    try {
        const mongoConnection = await mongoose.connect(`${process.env.DATABASE_URL}/attendify`);
        console.log(`Database Connected : ${mongoConnection.connection.host}`);
    } catch (error) {
        console.log("Database Connection Failed : ",error);
        process.exit(1);
    }

}