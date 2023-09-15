import { Router } from 'express'
import { cartModel } from "../models/cart.model.js";
import { productModel } from '../models/product.models.js';

const cartRouter = Router();

cartRouter.get('/', async(req, res) => {
    const { lim } = req.query;
    try{
        const carts = await cartModel.find().limit(lim);
        if(carts){
            res.status(200).send({respuesta: "OK", mensaje: carts})
        }
        else{
        res.status(404).send({respuesta: "Error", mensaje: "Carrito no encontrado"})

        }
    }
    catch(error){
        res.status(400).send({respuesta: "Error", mensaje: "Carrito no encontrado"})
    }
})

cartRouter.post('/',  async(req, res) =>{
    try{
        const cart = cartModel.create({})
        res.status(200).send({respuesta: "OK", mensaje: cart})
    }
    catch(error){
        res.status(400).send({respuesta: "Error", mensaje: "Error al crear el producto"})
    }
})

cartRouter.put('/:Cid', async (req, res) =>{
   const { Cid } = req.params
   const  newProducts  = req.body.products

   try{
    const selectedCart = await cartModel.findById(Cid);
    newProducts.map((newProduct) =>{
    const index = selectedCart.products.findIndex(product => product.id_prod._id.toString() === newProduct)
     if(index !== -1){
        selectedCart.products[index].quantity++;
    }
    else if (index === -1){
        selectedCart.products.push({id_prod: newProduct, quantity: 1})
    }

    })
      
    await cartModel.findByIdAndUpdate(Cid, selectedCart)        
    res.status(200).send("Carrito actualizado correctamente")
   }
   catch(error){
    res.status(400).send("Error al actualizar el carrito")
    console.log(error)
   }
})

cartRouter.put('/:Cid/products/:Pid', async (req, res) =>{
    const { Cid, Pid } = req.params;
    const { quantity } = req.body;
    try {
        const cart = await cartModel.findById(Cid)
        if (cart) {
            const product = await productModel.findById(Pid) 
            if (product) {
                const indice = cart.products.findIndex(item => item.id_prod._id == Pid)
                console.log(indice)
                if (indice != -1) {
                    cart.products[indice].quantity = quantity 
                } else {
                    cart.products.push({ id_prod: Pid, quantity: quantity }) 
                }
                const respuesta = await cartModel.findByIdAndUpdate(Cid, cart) 
                res.status(200).send({ respuesta: 'OK', mensaje: respuesta })
            } else {
                res.status(404).send({ respuesta: 'Error agregando el producto al carrito', mensaje: 'producto no encontrado' })
            }
        } else {
            res.status(404).send({ respuesta: 'Error agregando el producto al carrito', mensaje: 'carrito no encontrado' })
        }

    } catch (error) {
        console.log(error)
        res.status(400).send({ respuesta: 'Error en agregar producto Carrito', mensaje: error })
    }
})

cartRouter.delete('/:Cid/products/:Pid', async(req,res)=>{
    const { Cid, Pid } = req.params;

    try{
        const selectedCart = await cartModel.findById(Cid);
        const indice = selectedCart.products.findIndex((product) => product.id_prod._id.toString() === Pid)
        indice !== -1 ? selectedCart.products.splice(indice,1) : null
        const respuesta = await cartModel.findByIdAndUpdate(Cid, selectedCart)
        res.status(200).send({respuesta: "Ok", mensaje: respuesta})
    }
    catch(error){
        res.status(400).send({respuesta: "Error", mensaje: "Error eliminando el producto"})
    }
})

cartRouter.delete('/:Cid', async (req, res) =>{
    const { Cid }= req.params;

    try{
        const selectedCart = await cartModel.findById(Cid);
        selectedCart.products = [];
        await cartModel.findByIdAndUpdate(Cid, selectedCart)
        res.status(200).send({respuesta: "Ok", mensaje: selectedCart.products})
    }
    catch(error){
        res.status(400).send({respuesta: "Error", mensaje: "Error al vaciar el carrito"})

    }
})
export default cartRouter;