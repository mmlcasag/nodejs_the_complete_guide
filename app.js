const http = require('http');
 
const server = http.createServer( (req, res) => {
    const url = req.url;
    const method = req.method;
    
    if (url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Greeting Page</title></head>');
        res.write('<body>');
        res.write('<h1>Greeting Page</h1>');
        res.write('<hr />');
        res.write('<form action="/create-user" method="POST"><input type="text" name="username" /><button type="submit">Send</button></form>');
        res.write('<a href="/users">List Users</a>');
        res.write('</body>');
        res.write('</html>');
        return res.end();
    }
    
    if (url === '/users') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>List Users</title></head>');
        res.write('<body>');
        res.write('<h1>List Users</h1>');
        res.write('<hr />');
        res.write('<ul>');
        res.write('<li>Michael Schumacher</li>');
        res.write('<li>Rubens Barrichello</li>');
        res.write('<li>Mika Hakkinen</li>');
        res.write('<li>David Coulthard</li>');
        res.write('<li>Ralf Schumacher</li>')
        res.write('<li>Damon Hill</li>')
        res.write('</ul>');
        res.write('<a href="/">Back</a>');
        res.write('</body>');
        res.write('</html>');
        return res.end();
    }
 
    if (url === '/create-user' && method === 'POST') {
        const body = [];
        
        req.on('data', (chunk) => {
            body.push(chunk);
        });
 
        req.on('end', (chunk) => {
            const parsedBody = Buffer.concat(body).toString();
            const username = parsedBody.split('=')[1];
            
            console.log(username);
            
            res.statusCode = 302;
            res.setHeader('Location', '/');
            return res.end();
        });
    }
});
 
server.listen(3000);