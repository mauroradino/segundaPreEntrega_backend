
const socket = io()
const id = document.getElementById("IDinput");
const title = document.getElementById("TitleInput");
const description = document.getElementById("DescInput");
const code = document.getElementById("CodeInput");
const price = document.getElementById("PriceInput");
const stock = document.getElementById("StockInput");
const category = document.getElementById("CategInput");
const thumbnails = document.getElementById("ThumbInput");
const btnSubmit = document.getElementById("btnSubmit");
const btnShow = document.getElementById("btnShow");

class product {
    constructor(id, title, description, code, price, stock, category, thumbnails){
        this.id = id;
        this.title = title;
        this.description = description;
        this.code = code;
        this.price = price;
        this.status = true;
        this.stock = stock;
        this.category = category;
        this.thumbnails = thumbnails;
    }
}

btnShow.addEventListener('click', ()=>{
    socket.on('listaProductos', data =>{
        console.log("LISTA DE PRODUCTOS ",data);
    })
})


btnSubmit.addEventListener('click', () =>{
const nuevoProducto = new product (id.value, title.value, description.value, code.value, price.value, stock.value, category.value, thumbnails.value)
socket.emit('newProduct', nuevoProducto);



id.value = ""
title.value = ""
description.value = ""
code.value = ""
price.value = ""
stock.value = ""
category.value = ""
thumbnails.value = ""

Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'Producto Creado Correctamente',
    showConfirmButton: false,
    timer: 2000
  })
})


socket.emit('delServer', "HOLAAA FUNCIONA")


socket.on('productos', (data) => {
    console.log("producto: ",data);
})

socket.on('lista', (data) =>{
    console.log("Lista de Prodcutos: ", data)
})