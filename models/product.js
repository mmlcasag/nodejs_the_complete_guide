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

    insert() {
        const query = ' INSERT INTO products ( title, author, image, price, description ) VALUES ( ?, ?, ?, ?, ? ) ';
        const binds = [ this.title, this.author, this.image, this.price, this.description ];
        return database.execute(query, binds);
    }

    update() {
        const query = ' UPDATE products SET title = ?, author = ?, image = ?, price = ?, description = ? WHERE id = ? ';
        const binds = [ this.title, this.author, this.image, this.price, this.description, this.id ];
        return database.execute(query, binds);
    }

    static delete(product) {
        const query = ' DELETE FROM products WHERE id = ? ';
        const binds = [ product.id ];
        return database.execute(query, binds);
    }

    static loadById(id) {
        const query = ' SELECT * FROM products WHERE products.id = ? ';
        const binds = [ id ];
        return database.execute(query, binds);
    }
    
    static fetchAll() {
        // I am not going to handle .then() and .catch() promises here
        // I am returning them to our caller to handle it there
        // So let's adjust wherever in the project there is a call for fetchAll()
        // --> admin.js
        // --> shop.js
        const query = ' SELECT * FROM products ORDER by id ';
        return database.execute(query);
    }

}