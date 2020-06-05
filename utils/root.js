const path = require('path');

// path.dirname() return the directory name of a path
// process.mainModule.filename returns app.js
// so this command returns the dirname of the app.js
const root = path.dirname(process.mainModule.filename);

module.exports = root;