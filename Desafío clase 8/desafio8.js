import express from 'express';
import Productos from './utils.js';
const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
const puerto = 8080;

let productosArray = [];
const readAll = () => {
    if (productosArray.length == 0) {
        return {
            error: 'no hay productos cargados'
        }
    } else {
        return productosArray;
    }
}
const readOne = (idParam) => {
    const productoEncontrado = productosArray.find(producto => producto.id == idParam)
    return productoEncontrado || {
        error: 'producto no encontrado'
    }
}
const create = (title, price, thumbnail) => {
    const newProduct = new Productos(productosArray.length + 1, title, price, thumbnail)
    productosArray.push(newProduct);
    return newProduct;
}

const server = app.listen(puerto, () => {
    console.log(`servidor inicializado en puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`));


app.get('/api/productos/listar', (req, res) => {
    res.json(readAll());
})

app.get('/api/productos/listar/:id', (req, res) => {
    res.json(readOne(req.params.id));
})

app.post('/api/productos/guardar', (req, res) => {
    res.json(create(req.body.title, req.body.price, req.body.thumbnail));
})