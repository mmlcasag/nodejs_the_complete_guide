const express = require('express');
const bodyParser = require('body-parser');

const path = require('path');
const root = require('./utils/root');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorRoutes = require('./routes/error');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(root, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/admin', adminRoutes.routes);
app.use(shopRoutes);
app.use(errorRoutes);

app.listen(3000);