import express from 'express';
import fs from 'fs/promises';
const app = express();

const puerto = 8080;

const server = app.listen(puerto, () => {
    console.log(`servidor inicializado en puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`));

let contadorItem = 0;
let contadorItemRandom = 0;
app.get('/items', async (req, res) => {
    const leerDatosJson = await fs.readFile('productos.txt', "utf-8");
    const jsonParseado = JSON.parse(leerDatosJson);
    contadorItem++;
    res.json({
        items: jsonParseado,
        cantidadProductos: jsonParseado.length
    });
})

app.get('/item-random', async (req, res) => {
    const leerDatosJson = await fs.readFile('productos.txt', "utf-8");
    const jsonParseado = JSON.parse(leerDatosJson);
    contadorItemRandom++;
    res.json({
        item: jsonParseado[Math.floor(Math.random() * jsonParseado.length)]
    })
})

app.get('/visitas', (req, res) => {
    res.json({
        visitas: {
            item: contadorItem,
            itemRandom: contadorItemRandom
        }
    })
})