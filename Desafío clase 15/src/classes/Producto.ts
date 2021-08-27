import IProduct from "../interfaces/IProduct";

export default class Productos implements IProduct {
    id: number;
    timestamp: number;
    title: string;
    description: string;
    code: string;
    price: number;
    thumbnail: string;
    stock: number;
    constructor(idParam: number, timestampParam: number, titleParam: string, descriptionParam: string, codeParam: string, priceParam: number, thumbnailParam: string, stockParam: number) {
        this.id = idParam;
        this.timestamp = timestampParam;
        this.title = titleParam;
        this.description = descriptionParam;
        this.code = codeParam;
        this.price = priceParam;
        this.thumbnail = thumbnailParam;
        this.stock = stockParam;
    }

    update(titleParam: string, priceParam: number, thumbnailParam: string, descriptionParam: string, stockParam: number) {
        this.title = titleParam;
        this.price = priceParam;
        this.thumbnail = thumbnailParam;
        this.description = descriptionParam;
        this.stock = stockParam;
    }
}