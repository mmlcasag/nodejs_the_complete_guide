const express = require('express');

const path = require('path');

// importing our root file
const root = require('../utils/root');

const router = express.Router();

router.use('/', (req, res, next) => {
    // const dirfile = path.join(__dirname, '..', 'views', '404.html');
    
    // now we can replace the line above to this one:
    const dirfile = path.join(root, 'views', '404.html');
    // much better, right?

    res.sendFile(dirfile);
});

module.exports = router;