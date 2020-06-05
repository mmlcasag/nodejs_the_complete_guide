const express = require('express');

const path = require('path');

const root = require('../utils/root');

const router = express.Router();

router.get('/', (req, res, next) => {
    const dirfile = path.join(root, 'views', 'shop.html');
    res.sendFile(dirfile);
});

module.exports = router;