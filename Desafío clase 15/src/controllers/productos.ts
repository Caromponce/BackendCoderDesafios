import { Request, Response } from 'express';
import Productos from '../classes/Producto';
import IProduct from '../interfaces/IProduct';
import { v4 as uuidv4 } from 'uuid';


export let productosArray: IProduct[] = [];

export const read = (req: Request, res: Response) => {
    const idParam = Number(req.params.id);
    if (idParam) {
        const productoEncontrado = productosArray.find(producto => producto.id == idParam)
        return res.json(productoEncontrado || {
            error: 'producto no encontrado'
        })
    } else {
        if (productosArray.length == 0) {
            return res.json({
                error: 'no hay productos cargados'
            })
        } else {
            return res.json({
                data: productosArray
            });
        }
    }
}

export const create = (req: Request, res: Response) => {
    const id = productosArray.length + 1;
    const title = req.body.title;
    const price = req.body.price;
    const thumbnail = req.body.thumbnail;
    const description = req.body.description;
    const code = uuidv4();
    const timestamp = Date.now();
    const stock = req.body.stock;
    const newProduct = new Productos(id, timestamp, title, description, code, price, thumbnail, stock)
    productosArray.push(newProduct);
    return res.json(newProduct);
}

export const update = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const title = req.body.title;
    const price = req.body.price;
    const thumbnail = req.body.thumbnail;
    const description = req.body.description;
    const stock = req.body.stock;
    const productoIndex = productosArray.findIndex(producto => producto.id == id)
    if (productoIndex != -1) {
        productosArray[productoIndex].update(title, price, thumbnail, description, stock);
        return res.json(productosArray[productoIndex]);
    } else {
        return res.json({
            error: 'producto no encontrado'
        })
    }
}

export const deleteProd = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const productoIndex = productosArray.findIndex(producto => producto.id == id);
    if (productoIndex != -1) {
        const productoEliminado = productosArray[productoIndex];
        productosArray.splice(productoIndex, 1);
        return res.json(productoEliminado);
    } else {
        return res.json({
            error: 'producto no encontrado'
        })
    }
}