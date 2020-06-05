const express = require('express');

const path = require('path');

const router = express.Router();

router.get('/', (req, res, next) => {
    // instead of using res.send()
    // now we are going to point to our html file here
    
    // so maybe something like this? res.sendFile('/views/shop.html'); 
    // in which '/' means the root folder, then views folder, then shop.html file?
    // turns out we get the following error
    // Error: ENOENT: no such file or directory, stat 'D:\views\shop'

    // when dealing with paths it is always good practice to use the path module
    // so let's import it (line 3)
    // we start by using path.join
    // __dirname means our current directory
    // ../ means go up one level
    // you can also use ..
    // then concatenating folders
    // until reaching the desired file
    const dirfile = path.join(__dirname, '..', 'views', 'shop.html');
    // using path you don't need to worry about linux, windows, macOS...
    // so now let's point to our html file
    res.sendFile(dirfile);

    // so now let's to the same to the add-product page
});

module.exports = router;