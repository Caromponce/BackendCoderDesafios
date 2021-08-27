import express from 'express';
import path from 'path';
import * as http from 'http';
import handlebars from 'express-handlebars';
import { routerProducto } from './routes/productos';
import { routerCarrito } from './routes/carrito';


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


//Rutas
app.use('/api/productos', routerProducto);
app.use('/api/carrito', routerCarrito);
