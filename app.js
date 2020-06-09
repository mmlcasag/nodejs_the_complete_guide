// how to install mongodb?
// npm install mongodb --save

// now let's get rid of all mysql and sequelize code
// let's update de database.js file
// connecting into mongodb now

const express = require('express');
const bodyParser = require('body-parser');

const path = require('path');
const root = require('./utils/root');

// and now let's import it into our application
const mongoConnect = require('./utils/database');

/*
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorRoutes = require('./routes/error');
*/

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(root, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

/*
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(errorRoutes);
*/

// now in the end of the file we need to execute the function and handle the callback
mongoConnect(client => {
    // let's console.log the client argument
    // to see what information it holds
    console.log(client);
    // and let's run our application
    app.listen(3000);
});