import IProduct from "./IProduct";

export default interface ICarrito {
    id: number,
    timestamp: number,
    producto?: IProduct[],
};