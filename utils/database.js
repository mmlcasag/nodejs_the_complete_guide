const Sequelize = require('sequelize');

const sequelize = new Sequelize('nodejs-the-complete-guide', 'root', 'root', { host: 'localhost', dialect: 'mysql' });

module.exports = sequelize;