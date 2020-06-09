const mongoConnect = require('../utils/database');

class Product {
    constructor(title, author, image, price, description) {
        this.title = title;
        this.author = author;
        this.image = image;
        this.price = price;
        this.description = description;
    }

    save() {

    }
}

const Product = sequelize.define('product', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    author: {
        type: Sequelize.STRING,
        allowNull: false
    },
    image: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: true
    }
});

module.exports = Product;