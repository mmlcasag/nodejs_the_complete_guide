const express = require('express');

const routes = express.Router();

const users = [];

routes.get('/add-user', (req, res, next) => {
    res.render('add-user', { pageTitle: 'Add User', path: '/add-user' });
});

routes.post('/add-user', (req, res, next) => {
    users.push({ name: req.body.name });
    res.redirect('/users');
});

routes.get('/users', (req, res, next) => {
    res.render('users', { pageTitle: 'Users Page', path: '/users', users: users });
});

routes.get('/', (req, res, next) => {
    res.render('index', { pageTitle: 'Main Page', path: '/' });
});

routes.use((req, res, next) => {
    res.render('404', { pageTitle: '404 Page', path: '/404' });
});

module.exports.routes = routes;
module.exports.users = users;