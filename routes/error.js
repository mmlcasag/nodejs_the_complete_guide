const express = require('express');

const path = require('path');

const root = require('../utils/root');

const router = express.Router();

router.use('/', (req, res, next) => {
    const dirfile = path.join(root, 'views', '404.html');
    res.sendFile(dirfile);
});

module.exports = router;