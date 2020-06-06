const express = require('express');
const bodyParser = require('body-parser');

// ok so we have finished our pug lesson
// so let's now dive into handlebars! \o/
// and tje first thing we need to do is to import the module
const handlebars = require('express-handlebars');

const path = require('path');
const root = require('./utils/root');

const admin = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorRoutes = require('./routes/error');

const app = express();

// and then we need to tell express.js that our module can be used as a view engine
// we don't need to do this for pug or ejs because express.js already "knows" them
// but handlebars is a little bit different here
app.engine('handlebars', handlebars({
    layoutsDir: 'views/layouts/',
    defaultLayout: 'main',
    extname: 'handlebars'
}));

// after that you can set handlebars as a view engine, as you would do with pug or ejs
app.set('view engine', 'handlebars');

// and also define the views folder, same thing as before
app.set('views', 'views');

// a side note: you have to name your views with the same extension as you defined at line 21 and 24
// in this case, handlebars.
// you I had typed hbs, for example, than my views should be 404.hbs, shop.hbs, etc...

app.use(express.static(path.join(root, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/admin', admin.routes);
app.use(shopRoutes);
app.use(errorRoutes);

app.listen(3000);