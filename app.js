// this lesson teached how to extract duplicated code from the html pages
// and place it in templates
// so in views, lets create a layouts folder
// and a file named main.pug
// so, how to reuse our skeleton?
// we can extend this layouts from inside our other pug files
// and we can define some placeholders where others views can enter their content
// for example views/layouts/main.pug line 8 and 20
// then on your other pug files you can extend your layout
// for example checkout the 404.pug file
// now let's set the active class in the page we are browsing
// so let's create a new parameter path in every routes file

const express = require('express');
const bodyParser = require('body-parser');

const path = require('path');
const root = require('./utils/root');

const admin = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorRoutes = require('./routes/error');

const app = express();

app.set('view engine', 'pug');
app.set('views', 'views');

app.use(express.static(path.join(root, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/admin', admin.routes);
app.use(shopRoutes);
app.use(errorRoutes);

app.listen(3000);