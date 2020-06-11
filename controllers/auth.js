module.exports.getLogin = (req, res, next) => {
    // how do i read a cookie?
    const cookies = req.get('Cookie');
    console.log(cookies);
    // it works!
    // so let's pass this value as an argument to the view
    const isLoggedIn = cookies.split('=')[1];
    console.log(isLoggedIn);

    res.render('auth/login', {
        pageTitle: 'Login',
        path: '/auth/login',
        isLoggedIn: isLoggedIn
    });
}

module.exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    
    req.isLoggedIn = true;
    // this doesn't work
    // why? because this data we are adding to the request is valid just for that request
    // after i get a response, it's gone!
    // every new request I make, it's another completely different request
    
    // ok, got it
    // so, what should I do?
    // maybe create a cookie
    // hmmm... and how do i do that?
    res.setHeader('Set-Cookie', 'LoggedIn=true');

    // now everytime the client makes a new request
    // he is going to send us back the cookie
    // so now we can read if he has the cookie
    // to set the isLoggedIn propery
    res.redirect('/');
}