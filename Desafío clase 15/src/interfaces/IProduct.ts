export default interface IProduct {
    id: number,
    timestamp: number,
    title: string,
    description: string,
    code: string,
    price: number,
    thumbnail: string,
    stock: number,
    update: Function
};