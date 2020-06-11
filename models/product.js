const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: false
    }
});



/*
const mongodb = require('mongodb');

const database = require('../utils/database');

class Product {
    constructor(title, author, image, price, description, id, userId) {
        this.title = title;
        this.author = author;
        this.image = image;
        this.price = price;
        this.description = description;
        if (id) {
            this._id = new mongodb.ObjectId(id);
        }
        if (userId) {
            this.userId = userId; // new mongodb.ObjectId(userId);
        }
    }

    save() {
        // now when creating a product, 
        // I want to store a user reference
        if (this._id) {
            return database
                .getConnection()
                .collection('products')
                .updateOne({ _id: this._id }, { $set: this });
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
            .find({ _id: new mongodb.ObjectId(id) }) // we have to use the help of mongodb to search by ID's
            .next(); // returns the first element of the result (and the only one we need)
    }

    static deleteOne(id) {
        return database
            .getConnection()
            .collection('products')
            .deleteOne({ _id: new mongodb.ObjectId(id) });
    }
}

module.exports = Product;
*/