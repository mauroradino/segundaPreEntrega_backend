import { Schema, model } from "mongoose";
import paginate from 'mongoose-paginate-v2'
const productSchema = new Schema ({
    title: {
        type: String,
        required: true,
        index: true
    },
    description: {
        type: String,
        required: true
    },
    code: {
        type: String,
        unique: true,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    status:{
        type: Boolean,
        default: true
    },
    category: {
        type: String,
        required: true
    },
    thumbnails: {
        type:  String
    },
})

productSchema.plugin(paginate)

export const productModel = model("products" ,productSchema)