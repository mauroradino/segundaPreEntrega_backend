import { Schema, model } from "mongoose";

const productSchema = new Schema ({
    title: {
        type: String
    },
    description: {
        type: String
    },
    code: {
        type: String
    },
    price: {
        type: Number
    },
    stock: {
        type: Number
    },
    status:{
        type: Boolean,
        default: true
    },
    category: {
        type: String
    },
    thumbnails: {
        type:  String
    },
})

const cartSchema = new Schema ({
    products: {
        type: Array
    },
})

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

export const productModel = model("Products" ,productSchema)
export const cartModel = model("Carts" ,cartSchema)
export const messageModel = model("Messages" ,messageSchema)