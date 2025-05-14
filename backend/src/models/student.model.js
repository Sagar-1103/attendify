import mongoose, { Schema } from "mongoose";

const studentSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    roll:{
        type:String,
        required:true,
    },
    department:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    photo:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        default:"student",
    }
},{
    timestamps:true,
})

export const Student = mongoose.model("Student",studentSchema);