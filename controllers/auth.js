module.exports.getLogin = (req, res, next) => {
    // how do i read a cookie?
    const cookies = req.get('Cookie');
    console.log(cookies);
    // it works!
    // so let's pass this value as an argument to the view
    let isLoggedIn;
    if (cookies) {
        isLoggedIn = cookies.split('=')[1];
        console.log(isLoggedIn);
    }
    // the problem is that the user can manipulate the cookie
    // he can set it to false, or delete it altogether
    // so this is not a good way to store this kind of information
    // sessions would be better

    // but let's learn a bit more about cookies first
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
    res.setHeader('Set-Cookie', 'LoggedIn=true; Path=/auth/login');
    // this is the most basic way to create a cookie, informing just name and value
    // but you can of course specify other attributes for your cookie, for example:
    // Expires: if you don't specify, it will expire by default when you close your browser
    //   With Expires you have to pass on a date in the HTTP format
    // Max-Age: Alternative to Expires, but it does basically the same thing
    //   but the difference is that here you pass a number in seconds for your cookie to live
    // Domain: if you want the cookie to be sent just to your page or to other pages as well
    // Secure: this means the cookie will only be set if the page is served via https
    //   since our application is served by http I can't set this otherwise the cookie won't be created
    // HttpOnly: with this option enabled means that you can't access the cookie value through 
    //   client-side javascript, with scripts running on the browser
    res.setHeader('Set-Cookie', 'sampleCookie=yes; Path=/; Max-Age=30; ');
    
    // now everytime the client makes a new request
    // he is going to send us back the cookie
    // so now we can read if he has the cookie
    // to set the isLoggedIn propery
    res.redirect('/');
}