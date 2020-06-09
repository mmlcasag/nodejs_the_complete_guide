const Product = require('../models/product');

module.exports.getProducts = (req, res, next) => {
    // what if we want to display only the products
    // created by current logged in user?
    // we can do this by changing this method to:
    req.user.getProducts()
        .then(products => {
            res.render('admin/products', {
                pageTitle: 'Admin Products',
                path: '/admin/products',
                products: products
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

module.exports.getAddProduct = (req, res, next) => {
    const editing = req.query.editing;
    
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/products',
        editing: (editing === 'true')
    });
};

module.exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const author = req.body.author;
    const image = req.body.image;
    const price = req.body.price;
    const description = req.body.description;
    
    // we could do this:
    // userId: req.user.id
    // and it would work
    // but there's a more elegant way to do this
    // remember, req.user is a sequelized object
    // so it has many extented features
    // and since we defined our relationship between models
    // sequelize creates new features for us
    // for example, we told sequelize that a user has many products
    // so sequelize created a createProduct() for us:
    // so now we can just pass the object with the values of the product
    // and sequelize will automatically associate this new product with the user

    // we call this magic association methods
    req.user
        .createProduct({
            title: title,
            author: author,
            image: image,
            price: price,
            description: description
        })
        .then(result => {
            res.redirect('/admin/products');
        })
        .catch(err => {
            console.log(err);
        });
};

module.exports.getEditProduct = (req, res, next) => {
    const id = req.params.id;
    const editing = req.query.editing;
    
    // bear in mind that findByPk returns an object
    // getProducts returns an array of objects
    // therefore you must change from product to products when handling the Promise
    req.user.getProducts({ where: { id: id } })
        .then(products => {
            res.render('admin/edit-product', {
                pageTitle: 'Edit Product',
                path: '/admin/products',
                product: products[0],
                editing: (editing === 'true')
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

module.exports.postEditProduct = (req, res, next) => {
    const id = req.body.id;
    const title = req.body.title;
    const author = req.body.author;
    const image = req.body.image;
    const price = req.body.price;
    const description = req.body.description;
    
    Product.findByPk(id)
        .then(product => {
            // this won't automatically change the data in the database
            product.title = title;
            product.author = author;
            product.image = image;
            product.price = price;
            product.description = description;
            // in order to do that we must run
            // remember that save() also returns a .then() and a catch()
            // in order not to nest many .then() and catch()
            // i am going to return this so I can handle it beneath
            return product.save();
        })
        .then(result => {
            // this will handle successfull responses from the save() method
            res.redirect('/admin/products');
        })
        .catch(err => {
            // this catch() will handle eventual errors for both findByPk() and save() methods
            console.log(err);
        });
};

module.exports.postDeleteProduct = (req, res, next) => {
    const id = req.body.id;
    // we can use the destroy method()
    // Product.destroy({ where: { id: id } });
    // or we can do it like that:
    Product.findByPk(id)
        .then(product => {
            // we can return this because destroy() also returns a Promise
            return product.destroy();
        })
        .then(result => {
            res.redirect('/admin/products');
        })
        .catch(err => {
            console.log(err);
        });
};