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

// to install third-party packages you must type npm install <package-name> on the terminal
// for example npm install nodemon
// nodemon restarts automatically our application after a file is changes
// this is very good during development 
// and node.js offers a special feature regarding this
// you can install some third-party packages just for the development environment
// by typing npm install nodemon --save-dev
// you can install some third-party packages just for the production environment
// by typing npm install nodemon --save
// the default is to install for both environments if you don't provide further information
// by typing npm install nodemon
// you can also install outside the project, globally in your machine so it can work on every project
// by typing npm install nodemon --g

// after running it, check out the package.json file
// you can see nodemon inside the dependencies or devDependencies element
// also, it will create a node_modules folder inside your project
// in this folder will be placed all your project's dependencies
// and also you dependencies' dependencies
// that's why that folder is so huge
// you don't have to add that folder on git on send them to your team
// because you can delete that folder and then rerun npm install
// so node.js will reinstall the dependencies to run your project
// lastly, package-lock.json records the exact versions you used when developing your project