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

export const enrollStudent = AsyncHandler(async (req, res) => {
  const { roll, department, semester } = req.body;

  if (!roll || !department || !semester) {
    throw new ApiError(400, "All fields (roll, department, semester) are required");
  }

  const student = await Student.findOne({ roll });
  if (!student) {
    throw new ApiError(404, "Student with this roll number does not exist");
  }

  // Update the student record
  student.department = department;
  student.semester = semester;
  await student.save();

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        user: {
          id: student._id,
          name: student.name,
          email: student.email,
          roll: student.roll,
          department: student.department,
          semester: student.semester,
          role: "student",
          photo: student.photo,
        },
      },
      "Student enrolled/updated successfully"
    )
  );
});

export const getStudents = AsyncHandler(async (req, res) => {

  const students = await Student.find({}).select("-password");

  const formattedStudents = students.map(student => ({
    id: student._id,
    name: student.name,
    email: student.email,
    roll: student.roll,
    department: student.department,
    semester: student.semester,
    role: "student",
    photo: student.photo,
  }));

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        students:formattedStudents
      },
      "Students fetched successfully"
    )
  );
});
