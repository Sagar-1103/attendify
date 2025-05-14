import { Student } from "../models/student.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import bcrypt from "bcryptjs";
import { v2 as cloudinary } from "cloudinary";

export const createStudent = AsyncHandler(async(req,res)=>{
    const {name,roll,department,email,password,photoBase64} = req.body;
    if(!name || !roll || !department || !email || !password || !photoBase64){
        throw new ApiError(404, "Invalid Fields");
    }

    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
        throw new ApiError(409, "Student with this username already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const base64Image = photoBase64.toString('base64');
    const response = await cloudinary.uploader.upload(`data:image/png;base64,${base64Image}`, {
        folder: "student_photos",
    });

    const student = await Student.create({
        name,
        roll,
        department,
        email,
        password: hashedPassword,
        photo: response.secure_url,
    });

    return res.status(201).json(new ApiResponse(201,{user:{id:student._id,name:student.name,email:student.email,roll:student.roll,department:student.department,role:"student",photo:student.photo}},"Student created successfully"))
})