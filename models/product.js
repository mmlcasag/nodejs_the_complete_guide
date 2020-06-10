const mongodb = require('mongodb');

const database = require('../utils/database');

class Product {
    constructor(title, author, image, price, description, id) {
        this.title = title;
        this.author = author;
        this.image = image;
        this.price = price;
        this.description = description;
        this._id = new mongodb.ObjectId(id);
    }
    
    save() {
        if (this._id) {
            return database
                .getConnection()
                .collection('products')
                .updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: this });
        } else {
            return database
                .getConnection()
                .collection('products')
                .insertOne(this);
        }
    }

    static fetchAll() {
        return database
            .getConnection()
            .collection('products')
            .find() // returns a cursor
            .toArray(); // you should only use this if you know it will return few records
    }

    static fetchOne(id) {
        return database
            .getConnection()
            .collection('products')
            .find( { _id: new mongodb.ObjectId(id) } ) // we have to use the help of mongodb to search by ID's
            .next(); // returns the first element of the result (and the only one we need)
    }
}

module.exports = Product;