const express = require('express');

const path = require('path');

// importing our root file
const root = require('../utils/root');

const router = express.Router();

router.get('/add-product', (req, res, next) => {
    //const dirfile = path.join(__dirname, '..', 'views', 'add-product.html');

    // now we can replace the line above to this one:
    const dirfile = path.join(root, 'views', 'add-product.html');
    // much better, right?
    
    res.sendFile(dirfile);
});

router.post('/product', (req, res, next) => {
    console.log(req.body);
    res.redirect('/'); 
});

module.exports = router;