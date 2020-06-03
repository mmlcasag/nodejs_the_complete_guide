const http = require('http');

const routes = require('./routes');

const server = http.createServer(routes.handler);

server.listen(3000);

// to use npm type npm init in the terminal
// answer the questions it asks you and thats it
// it will create the file package.json
// it manages your dependencies
// you can also add a new script name: start node.app
// so you can always start the project from now on as npm start
// start is a reserved name so you can start as npm start
// you can also create other scripts, for example blablabla
// in this case you start by typing npm run blablabla