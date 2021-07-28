import fs from 'fs/promises';
class Archivo {
    constructor(nombreArchivoParam) {
        this.nombreArchivo = nombreArchivoParam;
        this.productos = [];
    }
    async guardar(title, price, thumbnail) {
        try {
            if (typeof title !== "string") throw new Error("Title debe ser de tipo string");
            if (typeof price !== "number") throw new Error("Price debe ser de tipo number");
            if (typeof thumbnail !== "string") throw new Error("Thumbnail debe ser de tipo string");
            this.productos.push({
                title: title,
                price: price,
                thumbnail: thumbnail,
                id: this.productos.length + 1,
            })
            await fs.writeFile(this.nombreArchivo, JSON.stringify(this.productos, null, "\t"));
            console.log(`El producto ${title} fue agregado a ${this.nombreArchivo}`);

        } catch (error) {
            console.log(`Ocurrió un error, no se pudo agregar el producto. ${error.message}`);
        }
    }
    async leer() {
        try {
            const leerArchivo = await fs.readFile(this.nombreArchivo, "utf-8");
            console.log(leerArchivo);
        } catch (error) {
            console.log(this.productos);
        }
    }

    async borrar() {
        try {
            await fs.unlink(this.nombreArchivo);
            console.log(`El archivo ${this.nombreArchivo} fue eliminado correctamente`);
        } catch (error) {
            console.log("El archivo no se pudo borrar");
        }
    }
}

const productos = new Archivo('productos.txt');
productos.guardar("Escuadra", 123.45, "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png");
productos.guardar("Calculadora", 234.56, "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png");
productos.guardar("Globo Terráqueo", 345.67, "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png");
productos.guardar("Error", 345.67, 123);
productos.leer();
productos.borrar();