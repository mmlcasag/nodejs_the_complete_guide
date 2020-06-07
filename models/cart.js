const fs = require('fs');
const path = require('path');

const root = require('../utils/root');

const fileDirectory = path.join(root, 'data', 'cart.json');

const readContentFromFile = (fileDirectory, callback) => {
    fs.readFile(fileDirectory, (err, fileContent) => {
        if (err) {
            callback({ products: [], totalPrice: 0 });
        } else if (fileContent.length === 0) {
            callback({ products: [], totalPrice: 0 });
        } else {
            callback(JSON.parse(fileContent));
        }
    });
}

const writeContentToFile = (fileDirectory, fileContent) => {
    fs.writeFile(fileDirectory, JSON.stringify(fileContent), (err) => {
        if (err) {
            console.log('models.cart: Error while trying to write file: ' + err);
        }
    });
}

module.exports = class Cart {
    
    static add(product) {
        readContentFromFile(fileDirectory, fileContent => {
            // creates a local copy of the cart
            const cart = {...fileContent};
            // finds the position of the product inside the array
            const existingProductIndex = cart.products.findIndex(prod => prod.id === product.id);
            // finds the product inside the array
            const existingProduct = cart.products[existingProductIndex];

            let updatedProduct;
            // if found
            if (existingProduct) {
                // creates a copy of the object
                updatedProduct = {...existingProduct};
                // increases its quantity
                updatedProduct.qty = updatedProduct.qty + 1;
                // and refreshes the cart
                cart.products = [...cart.products];
                // and replaces the product in the cart
                cart.products[existingProductIndex] = updatedProduct;
            // if not found
            } else {
                // creates the new object
                updatedProduct = { id: product.id, qty: 1 };
                // and adds it to the cart
                cart.products = [...cart.products, updatedProduct];
            }
            // increases the total price of the cart
            cart.totalPrice = cart.totalPrice + +product.price; // this converts to product.price to number

            writeContentToFile(fileDirectory, cart);
        });
    }

    static remove(product) {
        readContentFromFile(fileDirectory, fileContent => {
            // creates a local copy of the object
            const cart = {...fileContent};
            // finds the product inside the array
            const existingProduct = cart.products.find(prod => prod.id === product.id);
            // updates the totalPrice of the cart subtracting the price times the quantity
            if (existingProduct) {
                cart.totalPrice = cart.totalPrice - (existingProduct.qty * product.price);
            }
            // returns every product with an id different from the one we are trying to delete
            cart.products = cart.products.filter(prod => prod.id !== product.id);
            // save the new array without the product we are trying to delete
            writeContentToFile(fileDirectory, cart);
        });
    }
    
}