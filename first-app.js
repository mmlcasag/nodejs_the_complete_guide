const fs = require('fs');

console.log('Hello from Node.js!');

fs.writeFileSync('hello.txt', 'Hello from Node.js!')

// REPL

// R Read      ==> Read User Input
// E Evaluate  ==> Evaluate User Input
// P Print     ==> Print Output (Result)
// L Loop      ==> Wait for New Input

// To acess, just type "node" in your terminal
// You can run commands, import packages
// But when you leave, it is not saved anywhere
// To exit, press Ctrl + C twice