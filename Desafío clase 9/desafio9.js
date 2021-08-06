import express from 'express';
import Productos from './utils.js';
const app = express();
const router = express.Router();
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static('public'));

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

const update = (idParam, titleParam, priceParam, thumbnailParam) => {
    const productoIndex = productosArray.findIndex(producto => producto.id == idParam)
    if (productoIndex != -1) {
        productosArray[productoIndex].update(titleParam, priceParam, thumbnailParam);
        return productosArray[productoIndex];
    } else {
        return {
            error: 'producto no encontrado'
        }
    }
}
const deleteProd = (idParam) => {
    const productoIndex = productosArray.findIndex(producto => producto.id == idParam);
    if (productoIndex != -1) {
        const productoEliminado = productosArray[productoIndex];
        productosArray.splice(productoIndex, 1);
        return productoEliminado;
    } else {
        return {
            error: 'producto no encontrado'
        }
    }
}
app.use('/api', router);
const server = app.listen(puerto, () => {
    console.log(`servidor inicializado en puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`));

router.get('/productos/listar', (req, res) => {
    res.json(readAll());
})

router.get('/productos/listar/:id', (req, res) => {
    res.json(readOne(req.params.id));
})

router.post('/productos/guardar', (req, res) => {
    res.json(create(req.body.title, req.body.price, req.body.thumbnail));
})

router.put('/productos/actualizar/:id', (req, res) => {
    res.json(update(req.params.id, req.body.title, req.body.price, req.body.thumbnail));
})

router.delete('/productos/borrar/:id', (req, res) => {
    res.json(deleteProd(req.params.id));
})