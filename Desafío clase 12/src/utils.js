export default class Productos {
    constructor(idParam, titleParam, priceParam, thumbnailParam) {
        this.id = idParam;
        this.title = titleParam;
        this.price = priceParam;
        this.thumbnail = thumbnailParam;
    }

    update(titleParam, priceParam, thumbnailParam) {
        this.title = titleParam;
        this.price = priceParam;
        this.thumbnail = thumbnailParam;
    }
}