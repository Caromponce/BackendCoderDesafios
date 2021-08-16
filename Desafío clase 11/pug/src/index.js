import express from 'express';
import path from 'path';
import Productos from './utils.js';
import handlebars from 'express-handlebars';
import {
    fileURLToPath
} from 'url';

const __filename = fileURLToPath(
    import.meta.url);
const __dirname = path.dirname(__filename);

/** INICIALIZACION API con EXPRESS */
const app = express();
const puerto = 8080;
const router = express.Router();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.set('view engine', 'pug');
const viewsPath = path.resolve(__dirname, '../views');
app.set('views', viewsPath);
app.use(express.static(path.resolve(__dirname, '../public')));

let productosArray = [];
const readAll = () => {
    if (productosArray.length == 0) {
        return {
            error: 'no hay productos cargados'
        }
    } else {
        return {
            data: productosArray
        };
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
    create(req.body.title, req.body.price, req.body.thumbnail)
    const allProdutos = readAll()
    res.render("./partials/formulario")
})

router.put('/productos/actualizar/:id', (req, res) => {
    res.json(update(req.params.id, req.body.title, req.body.price, req.body.thumbnail));
})

router.delete('/productos/borrar/:id', (req, res) => {
    res.json(deleteProd(req.params.id));
})

router.get('/', (req, res) => {
    const allProdutos = readAll();
    res.render("./pages/main", allProdutos)
})

router.get('/productos/vista', (req, res) => {
    const allProdutos = readAll();
    res.render("./partials/tablaDinamica", allProdutos)
})

router.get('/formulario', (req, res) => {
    res.render("./partials/formulario")
})