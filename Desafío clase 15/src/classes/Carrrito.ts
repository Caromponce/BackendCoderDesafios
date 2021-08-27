import ICarrito from "../interfaces/ICarrito";
import IProduct from "../interfaces/IProduct";

export default class Carrito implements ICarrito {
    id: number;
    timestamp: number;
    productos: IProduct[] = [];

    constructor(idParam: number, timestampParam: number) {
        this.id = idParam;
        this.timestamp = timestampParam;
    }

    addProduct(producto: IProduct) {
        this.productos.push(producto);
    }

    removeProduct(idProducto: number) {
        const productoIndex = this.productos.findIndex(producto => producto.id == idProducto);
        if (productoIndex != -1) {
            this.productos.splice(productoIndex, 1);
            return true;
        } else {
            return false;
        }
    }

    getProducto(idProducto: number) {
        const producto = this.productos.find(producto => producto.id == idProducto);
        if (producto) {
            return producto;
        } else {
            return false;
        }
    }
}