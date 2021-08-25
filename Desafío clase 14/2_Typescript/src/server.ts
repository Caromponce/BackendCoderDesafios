import express from 'express';
import { Request, Response } from 'express';
import path from 'path';
import * as http from 'http';
import { Server } from 'socket.io';
import Productos from './utils';
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
const myServer = new http.Server(app);
myServer.listen(puerto, () => console.log('Server up en puerto', puerto));
// const myWSServer = io(myServer);
// const messages = [];

//Comunicacion server y cliente
// myWSServer.on('connection', function (socket) {
//     console.log('Un cliente se ha conectado');
// });
interface messagesTypes {
    author: string,
    text: string,
    time: string
};
var messages: messagesTypes[] = [];
class SocketService {
    myWSServer: any;
    initWsService(server: any) {
        if (!this.myWSServer) {
            this.myWSServer = new Server(server);
            this.myWSServer.on('connection', (socket: any) => {
                console.log('Nueva conexion hecha');

                socket.on('new-message', function (data: messagesTypes) {
                    messages.push(data);
                    myWSServer.sockets.emit('messages', messages);
                });
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
interface productosType {
    id: number,
    title: string,
    price: number,
    thumbnail: string,
    update: Function
};
let productosArray: productosType[] = [];
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
const readOne = (idParam: number) => {
    const productoEncontrado = productosArray.find(producto => producto.id == idParam)
    return productoEncontrado || {
        error: 'producto no encontrado'
    }
}
const create = (title: string, price: number, thumbnail: string) => {
    const newProduct = new Productos(productosArray.length + 1, title, price, thumbnail)
    productosArray.push(newProduct);
    return newProduct;
}

const update = (idParam: number, titleParam: string, priceParam: number, thumbnailParam: string) => {
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
const deleteProd = (idParam: number) => {
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
router.get('/productos/listar', (req: Request, res: Response) => {
    res.json(readAll());
})

router.get('/productos/listar/:id', (req: Request, res: Response) => {
    res.json(readOne(Number(req.params.id)));
})

router.post('/productos/guardar', (req: Request, res: Response) => {
    create(req.body.title, req.body.price, req.body.thumbnail)
    const allProdutos = readAll()
    const myWSServer = socketService.getServer();
    myWSServer.sockets.emit('listaProd', allProdutos);

    res.render("./pages/main", allProdutos)
})

router.put('/productos/actualizar/:id', (req: Request, res: Response) => {
    res.json(update(Number(req.params.id), req.body.title, req.body.price, req.body.thumbnail));
})

router.delete('/productos/borrar/:id', (req: Request, res: Response) => {
    res.json(deleteProd(Number(req.params.id)));
})

router.get('/', (req: Request, res: Response) => {
    const allProdutos = readAll();
    res.render("./pages/main", allProdutos)
})

router.get('/productos/vista', (req: Request, res: Response) => {
    const allProdutos = readAll();
    res.render("./partials/tablaDinamica", allProdutos)
})

router.get('/formulario', (req: Request, res: Response) => {
    res.render("./partials/formulario")
})