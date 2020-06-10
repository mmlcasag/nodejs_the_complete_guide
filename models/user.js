const mongodb = require('mongodb');

const database = require('../utils/database');

class User {
    constructor(username, email, cart, id) {
        this.username = username;
        this.email = email;
        this.cart = cart; // { items: [ {...}, {...} ] }
        this._id = new mongodb.ObjectId(id);
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

    getCart() {
        // this.cart.items returns an object like this
        // { productId: new mongodb.ObjectId(product._id), quantity: 1 }
        // we just want the productId, so let's remove the quantity
        const productIds = this.cart.items.map(item => {
            return item.productId;
        });
        // so now we have an array with only the ids of the products we have in the our cart
        // so now we can query them like that:
        return database
            .getConnection()
            .collection('products')
            .find({ _id: { $in: productIds } })
            .toArray()
            .then(products => {
                return products.map(p => {
                    // returns an object with all the properties of the product model
                    // plus the quantity
                    return {...p, quantity: this.cart.items.find(i => i.productId.toString() === p._id.toString()).quantity }
                });
            })
            .catch(err => {
                console.log(err);
            })
    }

    addToCart(product) {
        const updatedCartItems = [...this.cart.items];

        const cartProductIndex = this.cart.items.findIndex(prod => prod.productId.toString() === product._id.toString());
        
        if (cartProductIndex >= 0) {
            updatedCartItems[cartProductIndex].quantity = updatedCartItems[cartProductIndex].quantity + 1;
        } else {
            updatedCartItems.push({ productId: new mongodb.ObjectId(product._id), quantity: 1 });
        }

        const updatedCart = {
            items: updatedCartItems
        };

        return database
            .getConnection()
            .collection('users')
            .updateOne(
                { _id: new mongodb.ObjectId(this._id) }, 
                { $set: { cart: updatedCart } }
            );
    }

    deleteFromCart(product) {
        const updatedCartItems = this.cart.items.filter(prod => prod.productId.toString() !== product._id.toString());
        
        const updatedCart = {
            items: updatedCartItems
        };
        
        return database
            .getConnection()
            .collection('users')
            .updateOne(
                { _id: new mongodb.ObjectId(this._id) }, 
                { $set: { cart: updatedCart } }
            );
    }

    createOrder() {
        return this.getCart()
            .then(products => {
                const order = {
                    items: products,
                    user: {
                        _id: this._id,
                        username: this.username,
                        email: this.email
                    }
                };
                return database
                    .getConnection()
                    .collection('orders')
                    .insertOne(order);
            })
            .then(result => {
                // empties the cart
                this.cart = { items: [] };
                // and updates in the database
                return database
                    .getConnection()
                    .collection('users')
                    .updateOne(
                        { _id: new mongodb.ObjectId(this._id) }, 
                        { $set: { cart: { items: [] } } }
                    );
            });
    }

    getOrders() {
        return database
            .getConnection()
            .collection('orders')
            .find({ 'user._id': this._id }) // when comparing for child properties, we need to place between quotes: 'user._id'
            .toArray();
    }

}

module.exports = User;