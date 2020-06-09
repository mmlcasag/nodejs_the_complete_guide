const database = require('../utils/database');

class Product {
    constructor(title, author, image, price, description) {
        this.title = title;
        this.author = author;
        this.image = image;
        this.price = price;
        this.description = description;
    }

    save() {
        return database
            .getConnection()
            .collection('products')
            .insertOne(this);
    }

    static fetchAll() {
        return database
            .getConnection()
            .collection('products')
            .find() // returns a cursor
            .toArray(); // you should only use this if you know it will return few records
    }
}

module.exports = Product;