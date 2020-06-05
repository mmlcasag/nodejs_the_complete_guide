const express = require('express');

const path = require('path');

const router = express.Router();

router.use('/', (req, res, next) => {
    const dirfile = path.join(__dirname, '..', 'views', '404.html');
    res.sendFile(dirfile);
});

module.exports = router;