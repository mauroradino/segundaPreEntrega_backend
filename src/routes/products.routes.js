import { Router } from "express";
import { productModel } from "../models/product.models.js";

const productRouter = Router()

productRouter.get('/:limit?/:page?/:sort?/:query?', async(req, res)=>{
     let { limit, page, sort, query } = req.params;
     let queryIn;
     limit === undefined ? limit = 10: null
     page === undefined ? page = 1: null
     sort === "asc" ? sort = 1 : sort === "desc" ? sort = -1 :null
     if(query !== undefined){
        queryIn = {category: query};
     }
     else{
        queryIn = undefined;
     }
    try{
        const products = await productModel.find(queryIn).limit(limit).sort({price: sort})
        res.status(200).send({respuesta: "OK", mensaje: products})
    }
    catch(error){
        console.log(error)
        res.status(400).send({respuesta: "Error", mensaje: error})
    }
})

productRouter.get('/:id', async(req, res)=>{
    const { id } = req.params
    try{
        const products = await productModel.findById(id)
        if(products){
            res.status(200).send({respuesta: "OK", mensaje: products})
        }
        else{
        res.status(404).send({respuesta: "Error", mensaje: "Producto no encontrado"})

        }
    }
    catch(error){
        res.status(400).send({respuesta: "Error", mensaje: error})
    }
})


productRouter.post('/', async(req, res)=>{
    const { title, description, code, price, stock, category, thumbnails } = req.body
    try{
        const respuesta = await productModel.create({ title, description, code, price, stock, category, thumbnails })
        res.status(200).send({respuesta: "OK", mensaje: respuesta})
    }
    catch(error){
        res.status(400).send({respuesta: "Error", mensaje: error})
    }
})

productRouter.put('/:id', async(req, res)=>{
    const { id } = req.params
    const { title, description, code, price, stock, category, thumbnails } = req.body
    try{
        const user = await productModel.findByIdAndUpdate(id, { title, description, code, price, stock, category, thumbnails })
        if(user){
            res.status(200).send({respuesta: "OK", mensaje: user})
        }
        else{
        res.status(404).send({respuesta: "Error", mensaje: "Producto no encontrado"})

        }
    }
    catch(error){
        res.status(400).send({respuesta: "Error", mensaje: error})
    }
})

productRouter.delete('/:id', async(req, res)=>{
    const { id } = req.params
    try{
        const user = await productModel.findByIdAndDelete(id)
        if(user){
            res.status(200).send({respuesta: "OK", mensaje: user})
        }
        else{
        res.status(404).send({respuesta: "Error", mensaje: "Producto no encontrado"})

        }
    }
    catch(error){
        res.status(400).send({respuesta: "Error", mensaje: error})
    }
})

export default productRouter;