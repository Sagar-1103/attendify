import mongoose, { Schema } from "mongoose";

const adminSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
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