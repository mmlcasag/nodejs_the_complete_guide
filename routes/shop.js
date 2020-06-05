const express = require('express');

const path = require('path');

const router = express.Router();

router.get('/', (req, res, next) => {
    const dirfile = path.join(__dirname, '..', 'views', 'shop.html');
    res.sendFile(dirfile);
});

module.exports = router;