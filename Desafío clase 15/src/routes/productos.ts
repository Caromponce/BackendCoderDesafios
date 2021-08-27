import express from 'express';
import { create, deleteProd, read, update } from '../controllers/productos';
import { checkAdmin } from '../middleware/checkAdmin';

export const routerProducto = express.Router();

routerProducto.post('/agregar', checkAdmin, create);

routerProducto.get('/listar/:id?', read);

routerProducto.put('/actualizar/:id', checkAdmin, update);

routerProducto.delete('/borrar/:id', checkAdmin, deleteProd);