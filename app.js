const express = require('express');
const bodyParser = require('body-parser');

const path = require('path');
const root = require('./utils/root');

const admin = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorRoutes = require('./routes/error');

const app = express();

app.use(express.static(path.join(root, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/admin', admin.routes); // this is what we adapted
app.use(shopRoutes);
app.use(errorRoutes);

app.listen(3000);