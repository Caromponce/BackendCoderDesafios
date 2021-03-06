import express from 'express';
import path from 'path';
import * as http from 'http';
import socketIo from 'socket.io';
import Productos from './utils.js';
import handlebars from 'express-handlebars';


/** INICIALIZACION API con EXPRESS */
const app = express();
const puerto = 8080;
const router = express.Router();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
//Handlebars
app.set('view engine', 'hbs');
app.engine('hbs', handlebars({
    extname: '.hbs',
    defaultLayout: path.resolve(__dirname, '../views/layouts/index.hbs'),
    layoutsDir: path.resolve(__dirname, '../views/layouts'),
    partialsDir: path.resolve(__dirname, '../views/partials'),
}));
app.use(express.static(path.resolve(__dirname, '../public')));
//Inicio Socket
const myServer = http.Server(app);
myServer.listen(puerto, () => console.log('Server up en puerto', puerto));
// const myWSServer = io(myServer);
// const messages = [];

//Comunicacion server y cliente
// myWSServer.on('connection', function (socket) {
//     console.log('Un cliente se ha conectado');
// });
class SocketService {
    initWsService(server) {
        if (!this.myWSServer) {
            this.myWSServer = socketIo(server);
            this.myWSServer.on('connection', (socket) => {
                console.log('Nueva conexion hecha');
            });
        }
        return this.myWSServer;
    }
    //devuelve el WSService
    getServer() {
        return this.myWSServer;
    }
}
const socketService = new SocketService();
const myWSServer = socketService.initWsService(myServer);

//CRUD Productos
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

//Rutas
app.use('/api', router);
router.get('/productos/listar', (req, res) => {
    res.json(readAll());
})

router.get('/productos/listar/:id', (req, res) => {
    res.json(readOne(req.params.id));
})

router.post('/productos/guardar', (req, res) => {
    create(req.body.title, req.body.price, req.body.thumbnail)
    const allProdutos = readAll()
    const myWSServer = socketService.getServer();
    myWSServer.sockets.emit('listaProd', allProdutos);

    res.render("./pages/main", allProdutos)
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