const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Hello from the server!</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
        res.write('</html>');
        // we must do this in order not to execute the outer lines
        return res.end();
    }
    
    if (url === '/message' && method === 'POST') {
        // how to get our request data
        const body = [];
        
        // this adds chunks of data to the body array
        // this is one event listener
        req.on('data', (chunk) => { 
            console.log(chunk);
            body.push(chunk);
        });

        // after all the chunks have been pushed into the body array
        // this is another event listener
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody);

            // now if we break the parsedBody
            // message=message
            // we can store the value in our text file
            const message = parsedBody.split('=')[1];
            
            // I want to store the message in a text file
            fs.writeFileSync('message.txt', message);
        });
        
        // And redirect the user back to '/'
        res.statusCode = 302;
        res.setHeader('Location', '/');
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