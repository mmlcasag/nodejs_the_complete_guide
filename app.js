const http = require('http');

const server = http.createServer((req, res) => {
    const url = req.url;
    
    if (url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Hello from the server!</title></head>');
        res.write('<body><form action="/message" method="post"><input type="text" name="message"><button type="submit">Send</button></form></body>');
        res.write('</html>');
        // we must do this in order not to execute the outer lines
        return res.end();
    }
    
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My First Page!</title></head>');
    res.write('<body><h1>Hello from the Node.js Server!</h1></body>');
    res.write('</html>');
    return res.end();
});

server.listen(3000);