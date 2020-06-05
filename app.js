// create a npm project and install express.js and nodemon if you want

// create an express.js app which serves two html files of your choice for '/' and '/users'

// add some static css files to your project that should be required by at least one of your html files

const express = require('express');
const bodyparser = require('body-parser');

const path = require('path');

const routes = require('./routes');

const app = express();

app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);

app.listen(3000);