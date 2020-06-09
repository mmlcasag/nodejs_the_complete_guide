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
        database
            .getConnection()
            .collection('products')
            .insertOne(this)
            .then(result => {
                console.log(result);
            })
            .catch(err => {
                console.log(err);
            });
    }
}

module.exports = Product;