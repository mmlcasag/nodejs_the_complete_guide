const fs = require('fs');
const path = require('path');

const root = require('../utils/root');

const fileDirectory = path.join(root, 'data', 'products.json');

const generateId = () => {
    const id = Math.floor(Math.random() * (999999 - 1 + 1)) + 1;
    return id.toString();
}

const readContentFromFile = (fileDirectory, callback) => {
    fs.readFile(fileDirectory, (err, fileContent) => {
        if (err) {
            callback([]);
        } else if (fileContent.length === 0) {
            callback([]);
        } else {
            callback(JSON.parse(fileContent));
        }
    });
}

const writeContentToFile = (fileDirectory, fileContent) => {
    fs.writeFile(fileDirectory, JSON.stringify(fileContent), (err) => {
        if (err) {
            console.log('models.product: Error while trying to write file: ' + err);
        }
    });
}

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
        if (this.id) {
            // logic for updating an existing product
            readContentFromFile(fileDirectory, fileContent => {
                const products = [...fileContent];
                const existingProductIndex = products.findIndex(prod => prod.id === this.id)
                products[existingProductIndex] = this;
                writeContentToFile(fileDirectory, products);
            });
        } else {
            // logic for inserting a new product
            this.id = generateId();
            readContentFromFile(fileDirectory, fileContent => {
                const products = [...fileContent];
                products.push(this);
                writeContentToFile(fileDirectory, products);
            });
        }
    }

    static loadById(id, callback) {
        readContentFromFile(fileDirectory, fileContent => {
            const product = fileContent.find(prod => prod.id === id);
            callback(product);
        });
    }

    static fetchAll(callback) {
        readContentFromFile(fileDirectory, fileContent => {
            const products = [...fileContent];
            callback(products);
        });
    }
}