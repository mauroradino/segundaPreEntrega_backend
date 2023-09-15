import { Schema, model } from "mongoose";


const messageSchema = new Schema ({
    email:{
        type: String
    },
    message:{
        type: String
    },
    time:{
        type: Date, 
        default: Date.now
    }
})

export const messageModel = model("Messages" ,messageSchema)
