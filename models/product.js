const fs = require('fs');
const path = require('path');

const root = require('../utils/root');

const fileDirectory = path.join(root, 'data', 'products.json');

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
    constructor(title, author, image, price, description) {
        this.title = title;
        this.author = author;
        this.image = image;
        this.price = price;
        this.description = description;
    }

    save() {
        readContentFromFile(fileDirectory, fileContent => {
            const products = [...fileContent];
            products.push(this);
            writeContentToFile(fileDirectory, products);
        });
    }

    static fetchAll(callback) {
        readContentFromFile(fileDirectory, fileContent => {
            const products = [...fileContent];
            callback(products);
        });
    }
}