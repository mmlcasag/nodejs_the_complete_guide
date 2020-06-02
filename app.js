const http = require('http');

const server = http.createServer((req, res) => {
    // what really matters is this:
    console.log('URL: ' + req.url);
    console.log('Method: ' + req.method);
    console.log('Headers: ' + req.headers);
    
    // if you see object Object it is because it's concatenated with other stuff
    // log it separately to see its contents
    console.log(req.headers);

    // how to send responses

    // set the header
    res.setHeader('Content-Type', 'text/html');
    // write the message
    res.write('<html>');
    res.write('<head><title>Hello from the server!</title></head>');
    res.write('<body><h1>Hello from the server!</h1></body>');
    res.write('</html>');
    // tell the server this is it
    res.end();
    // be careful to not send any other response to the server after res.end()
    // otherwise this will raise an error!
});

server.listen(3000);