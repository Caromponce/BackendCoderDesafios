import { Request, Response } from 'express';
import Carrito from '../classes/Carrrito';
import { productosArray } from './productos';

let singleCarrito = new Carrito(1, Date.now());

export const read = (req: Request, res: Response) => {
    const idProducto = Number(req.params.idProducto);
    if (idProducto) {
        const productoOfCarrito = singleCarrito.getProducto(idProducto);
        if (productoOfCarrito) {
            return res.json({
                id: singleCarrito.id,
                timestamp: singleCarrito.timestamp,
                producto: productoOfCarrito
            })
        } else {
            return res.json({
                error: 'producto no encontrado en el carrito'
            })
        }
    } else {
        if (singleCarrito.productos.length == 0) {
            return res.json({
                error: 'no hay productos cargados en el carrito'
            })
        } else {
            return res.json({
                data: singleCarrito
            });
        }
    }
}

export const addProducto = (req: Request, res: Response) => {
    const idProducto = Number(req.params.idProducto);
    const productoEncontrado = productosArray.find(producto => producto.id == idProducto)
    if (productoEncontrado) {
        singleCarrito.addProduct(productoEncontrado);
        return res.json(productoEncontrado);
    } else {
        return res.json({
            error: 'No se encontró el producto'
        })
    }
}

export const deleteProdOfCart = (req: Request, res: Response) => {
    const idProducto = Number(req.params.idProducto);
    const removed = singleCarrito.removeProduct(idProducto);
    if (removed) {
        return res.json({
            data: 'producto eliminado del carrito'
        })
    } else {
        return res.json({
            error: 'No se encontró el producto'
        })
    }
}