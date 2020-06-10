const mongodb = require('mongodb');

const database = require('../utils/database');

class User {
    constructor(username, email, cart, id) {
        this.username = username;
        this.email = email;
        this.cart = cart; // { items: [ {...}, {...} ] }
        this._id = new mongodb.ObjectId(id);
    }
    
    save() {
        if (this.id) {
            return database
                .getConnection()
                .collection('users')
                .updateOne({ _id: this.id }, { $set: this });
        } else {
            return database
                .getConnection()
                .collection('users')
                .insertOne(this);
        }
    }

    addToCart(product) {
        const updatedCart = { items: [{ productId: new mongodb.ObjectId(product._id), quantity: 1}] };
        return database
            .getConnection()
            .collection('users')
            .updateOne(
                { _id: new mongodb.ObjectId(this._id) }, 
                { $set: { cart: updatedCart } }
            );
    }

    static fetchAll() {
        return database
            .getConnection()
            .collection('users')
            .find()
            .toArray();
    }

    static fetchOne(id) {
        return database
            .getConnection()
            .collection('users')
            .find({ _id: new mongodb.ObjectId(id) })
            .next();
    }

    static deleteOne(id) {
        return database
            .getConnection()
            .collection('users')
            .deleteOne({ _id: new mongodb.ObjectId(id) });
    }
}

module.exports = User;