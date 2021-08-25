export default class Productos {
    id: number;
    title: string;
    price: number;
    thumbnail: string;
    constructor(idParam: number, titleParam: string, priceParam: number, thumbnailParam: string) {
        this.id = idParam;
        this.title = titleParam;
        this.price = priceParam;
        this.thumbnail = thumbnailParam;
    }

    update(titleParam: string, priceParam: number, thumbnailParam: string) {
        this.title = titleParam;
        this.price = priceParam;
        this.thumbnail = thumbnailParam;
    }
}