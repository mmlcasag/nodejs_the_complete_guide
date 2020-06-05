const express = require('express');
const bodyParser = require('body-parser');

const path = require('path');
const root = require('./utils/root');

const admin = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorRoutes = require('./routes/error');

const app = express();

// to register our template engine for the project
// we have to set a global configuration value
// so we are basically saying this to express.js
// for any dynamic templates we are try to render, please use this one
app.set('view engine', 'pug');
// we also need to tell express the folder where our views are
app.set('views', 'views');
// now lets add dynamic templates
// look to all the .pug files inside the views folder

// after that, in shop.js we have to render our dynamic template
// so go over there to see what we have done

app.use(express.static(path.join(root, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/admin', admin.routes); // this is what we adapted
app.use(shopRoutes);
app.use(errorRoutes);

app.listen(3000);