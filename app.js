cons http = require('http');

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

/////////////////////////////////////////////////////////

// Global Features vs Core Modules vs Third-Party Modules

// The last lectures contained important concepts about available Node.js features and how to unlock them.
// You can basically differentiate between:
// * Global features: Keywords like const or function but also some global objects like process
// * Core Node.js Modules: Examples would be the file-system module ("fs"), the path module ("path") or the Http module ("http")
// * Third-party Modules: Installed via npm install - you can add any kind of feature to your app via this way

// Global features are always available, you don't need to import them into the files where you want to use them.
// Core Node.js Modules don't need to be installed (NO npm install is required) but you need to import them when you want to use features exposed by them.
// Example:
// const fs = require('fs');
// You can now use the fs object exported by the "fs" module.

// Third-party Modules need to be installed (via npm install in the project folder) AND imported.
// Example (which you don't need to understand yet - we'll cover this later in the course):

// In terminal/ command prompt
// npm install express-session --save
// In code file (e.g. app.js)
// const sessions = require('express-session');

//////////////////////////////////////////////////////////

// Global & Local npm Packages

// In the last lecture, we added nodemon as a local dependency to our project.
// The good thing about local dependencies is that you can share projects without the node_modules
// folder (where they are stored) and you can run npm install in a project to then re-create that 
// node_modules folder. This allows you to share only your source code, hence reducing the size of 
// the shared project vastly.
// The attached course code snippets also are shared in that way, hence you need to run npm install 
// in the extracted packages to be able to run my code!
// I showed that nodemon app.js would not work in the terminal or command line because we don't use
// local dependencies there but global packages.
// You could install nodemon globally if you wanted (this is NOT required though - because we can 
// just run it locally): npm install -g nodemon would do the trick. Specifically the -g flag ensures 
// that the package gets added as a global package which you now can use anywhere on your machine, 
// directly from inside the terminal or command prompt.

//////////////////////////////////////////////////////////

// Types of Errors

// Syntax Errors: Typo, you forgot a closing bracket or something like that
// Runtime Errors: When you compile, it works perfectly, but when it's running, it crashes
// Logical Errors: Everything works fine, but the program doesn't do what is supposed to do

//////////////////////////////////////////////////////////

// Syntax Error Example:
// I'm removing the "t" in const on line 1 of this page
// Check out the error when trying to run the code:

/*
cons http = require('http');
     ^^^^

SyntaxError: Unexpected identifier
    at wrapSafe (internal/modules/cjs/loader.js:1047:16)
    at Module._compile (internal/modules/cjs/loader.js:1097:27)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1153:10)
    at Module.load (internal/modules/cjs/loader.js:977:32)
    at Function.Module._load (internal/modules/cjs/loader.js:877:14)
    at Function.executeUserEntryPoint [as runMain] (internal/modules/run_main.js:74:12)
    at internal/main/run_main_module.js:18:47
[nodemon] app crashed - waiting for file changes before starting...
*/

// This is the easiest because it gives you hints to where the problem is
// It doesn't alway give you the correct line, but points you about the right direction