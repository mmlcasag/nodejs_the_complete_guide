const database = require('../utils/database');

const Cart = require('./cart');

module.exports = class Product {
    constructor(id, title, author, image, price, description) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.image = image;
        this.price = price;
        this.description = description;
    }

    save() {
        
    }

    static remove(product) {
        
    }

    static loadById(id) {
        
    }
    
    static fetchAll() {
        // I am not going to handle .then() and .catch() promises here
        // I am returning them to our caller to handle it there
        // So let's adjust wherever in the project there is a call for fetchAll()
        // --> admin.js
        // --> shop.js
        return database.execute(' SELECT * FROM products ORDER by id ');
    }

}