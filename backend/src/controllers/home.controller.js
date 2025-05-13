import {AsyncHandler} from "../utils/AsyncHandler.js";

export const getStatus = AsyncHandler(async(req,res)=>{
    return res.status(200).json({message:"Attendify server runnning..."})
})

