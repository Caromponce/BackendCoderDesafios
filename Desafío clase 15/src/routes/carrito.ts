import express from 'express';
import { addProducto, deleteProdOfCart, read } from '../controllers/carrito';

export const routerCarrito = express.Router();

routerCarrito.get('/agregar/:idProducto', addProducto);

routerCarrito.get('/listar/:idProducto?', read);

routerCarrito.delete('/borrar/:idProducto', deleteProdOfCart);