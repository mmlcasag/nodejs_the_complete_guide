// we are going to use a sql database, mysql to be more precise
// i have already downloaded and installed mysql server and the workbench
// i have also created the database for the course: nodejs-the-complete-guide
// so now it's time to connect our app with a database
// so first thing we are going to this is to run the npm command
// npm install mysql2 --save

// first step done, now it's time to connect with the database
// and we are going to create a database.js file inside the utils folder

const express = require('express');
const bodyParser = require('body-parser');

const path = require('path');
const root = require('./utils/root');

// and we are going to import it on our app.js file
const database = require('./utils/database');
// and now we can call database. and see its many possibilities:
// database.execute()
// database.query()
// database.end()
// and now you can already start writing sql queries, like that:
// database.execute('SELECT * FROM products');
// but we don't have any tables yet
// let's create our first table on the next lecture

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorRoutes = require('./routes/error');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(root, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(errorRoutes);

app.listen(3000);