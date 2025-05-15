import mongoose, { Schema } from "mongoose";

const adminSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    name:{
        type:String,
        required:true,
    },
    post:{
        type:String,
        required:true,
    },
    exp:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
        required:true,
    },
    contact:{
        type:String,
        required:true,
    },
    image:{
        type:String,
    },
    department:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    token:{
        type:String,
    },
    role:{
        type:String,
        default:"admin"
    }
},{
    timestamps:true,
})

export const Admin = mongoose.model("Admin",adminSchema);