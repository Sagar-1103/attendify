import { app } from "./src/app.js";
import {connectDatabase} from "./src/config/database.config.js";
import {connectCloudinary} from "./src/config/cloudinary.config.js";
import dotenv from "dotenv";
dotenv.config();

connectDatabase()
.then(()=>{
    app.on("error",(error)=>{
        console.log("ERR: ",error);
        throw error
    })
    connectCloudinary();
    app.listen(process.env.PORT||3000,()=>{
        console.log(`Server running on port ${process.env.PORT || 3000}`);
    })
})
.catch((err)=>{
    console.log("MongoDB connection error !!! ",err);
})