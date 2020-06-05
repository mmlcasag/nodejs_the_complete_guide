const express = require('express');

const path = require('path');

const root = require('../utils/root');

// importing our admin file
const admin = require('./admin');

const router = express.Router();

router.get('/', (req, res, next) => {
    // so we can gain access to our products array defined in the admin.js file
    console.log(admin.products);
    // it works!
    // so this is one way to share data
    // but doing this way means the data is shared across requests and users
    const dirfile = path.join(root, 'views', 'shop.html');
    res.sendFile(dirfile);
});

module.exports = router;