const express = require('express');
const bodyParser = require('body-parser');

const path = require('path');
const root = require('./utils/root');

const admin = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorRoutes = require('./routes/error');

const app = express();

// ok so we have finished our handlebars lesson
// so let's now dive into ejs! \o/
// and now we don't need to import anything
// because ejs is supported out of the box
// so you just have to set as the app's view engine and that's it
app.set('view engine', 'ejs');
app.set('views', 'views');

// the only problem with ejs is that it doesn't support layouts
// but there's a workaround for that and that is the includes
// check out the includes folder inside of views

app.use(express.static(path.join(root, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/admin', admin.routes);
app.use(shopRoutes);
app.use(errorRoutes);

app.listen(3000);