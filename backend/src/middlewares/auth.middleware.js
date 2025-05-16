import { ApiError } from "../utils/ApiError.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Admin } from "../models/admin.model.js";
dotenv.config();

export const verifyAdmin = AsyncHandler(async(req,res,next)=>{
    const token = req.body?.token || req.header("Authorization")?.replace("Bearer ","");

    if(!token){
        throw new ApiError(401,"Unauthorized request");
    }

    const decodedToken = jwt.verify(token,process.env.TOKEN_SECRET);

    const user = await Admin.findById(decodedToken?.id).select("-password -token");
    if(!user){
        throw new ApiError(401,"Invalid Access Token");
    }
    if(user.role!=="admin"){
        throw new ApiError(401,"Unauthorized request for this role");
    }
    req.user = user;
    next();
})

// export const verifyUser = AsyncHandler(async(req,res,next)=>{
//     const token = req.body.token || req.header("Authorization")?.replace("Bearer ","");

//     if(!token){
//         throw new ApiError(401,"Unauthorized request");
//     }

//     const decodedToken = jwt.verify(token,process.env.TOKEN_SECRET);

//     const user = await Admin.findById(decodedToken?._id).select("-password -token");
//     if(!user){
//         throw new ApiError(401,"Invalid Access Token");
//     }
//     if(user.role!=="admin"){
//         throw new ApiError(401,"Unauthorized request for this role");
//     }
//     req.user = user;
//     next();
// })

