/* LEVEL 1
var name = "Max";
var age = 29;
var hasHobbies = true;

function summarizeUser(userName, userAge, userHasHobbies) {
    return ("Name: " + userName + " Age: " + userAge + " Has Hobbies: " + userHasHobbies);
}

console.log(summarizeUser(name, age, hasHobbies));
*/

// LET AND CONST
// var is outdated, now you should use let or const
const name = "Max"; // variables that must not change --> constants
let age = 29 // variables that may change
let hasHobbies = true; // same thing as above

// name = "Marcio"; // this raises an error because it is a constant;