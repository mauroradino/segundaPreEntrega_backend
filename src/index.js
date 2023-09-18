import Express from "express";
import productRouter from "./routes/products.routes.js";
import cartRouter from "./routes/carts.routes.js"
import mongoose from 'mongoose';
import { cartModel } from "./models/cart.model.js";
import { productModel } from "./models/product.models.js";
import 'dotenv/config'
const app = Express();
const PORT = 7070;
mongoose.connect(process.env.MONGOURL)
.then(async ()=> {
  console.log("BDD Conectada");
  const hola = await productModel.paginate();
  console.log(hola)
  const resultados = await cartModel.findOne({ _id: '650313efb77e20f0b28b0d16' });
})
.catch((error)=> console.log(error))

app.use(Express.json())

app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter)  

app.listen(PORT, () =>{ 
  console.log(`Server on port ${PORT}`)
})