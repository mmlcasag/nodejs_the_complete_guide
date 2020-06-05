const express = require('express');
const bodyParser = require('body-parser');

const path = require('path');
const root = require('./utils/root');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorRoutes = require('./routes/error');

const app = express();

// this lecture shows how to style our pages
// so basically all that i did was to the edit all html files
// placing some css inside
// but as you can see we are copying and pasting in every page
// now we want to use external css files and import them to our pages
// the convention is to create a folder named public
// remember: all your folders and files are not exposed to the public
// if you type localhost:3000/routes/admin.js express doesn't show the file
// but this is exactly what we want to do with public js and css files
// so now we have to tell express which folder(s) we want to expose statically
app.use(express.static(path.join(root, 'public')));

// then i removed the css from inside the html files
// placed them inside the css files located at /public/css/main.css and /public/css/product.css
// and switched from <style> tag to <link rel> tag, importing the newly created public css files
// OBS: notice that on the <link rel> we don't use the /public folder

app.use(bodyParser.urlencoded({ extended: false }));
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(errorRoutes);

app.listen(3000);