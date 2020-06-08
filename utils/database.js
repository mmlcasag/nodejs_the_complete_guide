// sequelize uses mysql2 behind the scenes
// now we want to connect sequelize with mysql2

// so, first we need to import it
const Sequelize = require('mysql2');
// and then to instantiate it
const sequelize = new Sequelize('nodejs-the-complete-guide', 'root', 'root', { host: 'localhost', dialect: 'mysql' });

// sequelize will manage connections and pool and all that stuff
// so now we just have to export it and that's it!
module.exports = sequelize;