import { Admin } from "../models/admin.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const createAdmin = AsyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new ApiError(404, "Invalid Fields");
  }

  const existingUser = await Admin.findOne({ username });

  if (existingUser) {
    throw new ApiError(409, "Admin with this username already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newAdmin = await Admin.create({
    username,
    password: hashedPassword,
  });

  return res.status(201).json(new ApiResponse(201, {user: {id: newAdmin._id,username: newAdmin.username,role: "admin"}}));
});

export const logoutAdmin = AsyncHandler(async (req, res) => {
  const userId = req.user.id;

  if (!userId) {
    throw new ApiError(404, "User id doesnt exist");
  }

  const loggedoutUser = await Admin.findByIdAndUpdate(userId,{
    $unset:{
        token:1
    }
  },{
    new:true
  });

  return res.status(200).json(new ApiResponse(200, {user:loggedoutUser}, "User logged out"));
});

export const loginAdmin = AsyncHandler(async (req, res) => {
    const { username, password } = req.body;

  if (!username || !password) {
    throw new ApiError(404, "Invalid Fields");
  }

  const existingUser = await Admin.findOne({ username });

  if (!existingUser) {
    throw new ApiError(404, "Admin doesnt exist.");
  }

  const isPasswordValid = await bcrypt.compare(password,existingUser.password);

  if(!isPasswordValid){
    throw new ApiError(409,"Wrong Credentials");
  }

  const payload = {
    id: existingUser._id,
    username: existingUser.username,
    role: "admin",
  };
  const token = jwt.sign(payload, process.env.TOKEN_SECRET);

  if (!token) {
    throw new ApiError(500, "Error creating token");
  }

  existingUser.token = token;
  await existingUser.save();

  return res.status(201).json(new ApiResponse(201, {user: {id: existingUser._id,username: existingUser.username,role: "admin"},token}));
});
