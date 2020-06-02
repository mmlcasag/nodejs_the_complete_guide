/* LEVEL 1
var name = "Max";
var age = 29;
var hasHobbies = true;

function summarizeUser(userName, userAge, userHasHobbies) {
    return ("Name: " + userName + " Age: " + userAge + " Has Hobbies: " + userHasHobbies);
}
*/

// LET AND CONST
// var is outdated, now you should use let or const
/*
const name = "Max"; // variables that must not change --> constants
let age = 29 // variables that may change
let hasHobbies = true; // same thing as above
*/
// name = "Marcio"; // this raises an error because it is a constant;

// ARROW FUNCTIONS
// Beginner
/*
const summarizeUser = function (userName, userAge, userHasHobbies) {
    return ("Name: " + userName + " Age: " + userAge + " Has Hobbies: " + userHasHobbies);
}
*/
// Intermediate
/*
const summarizeUser = (userName, userAge, userHasHobbies) => {
    // Advantages of using array functions:
    // 1) It's shorter
    // 2) Enables to use the "this" keyword
    return ("Name: " + userName + " Age: " + userAge + " Has Hobbies: " + userHasHobbies);
}
*/
// Advanced
/*
// Arrow functions with 2 or more arguments
var add = (a, b) => {
    return a + b;
}
// If you have an arrow function with one statement which happens to be the return statement
// you can refactor to this:
var add = (a, b) => a + b;
// this is exactly the same as the function before

// Arrow functions with one argument
// now let's consider another example
var addOne = (a) => {
    return a + 1;
}
// you can refactor to this:
var addOne = (a) => a + 1;
// and also to this:
var addOne = a => a + 1;

// Arrow functions with no arguments
var addRandom = () => {
    return 1 + 8;
}
// you can refactor to this:
var addRandom = () => 1 + 8;

console.log(summarizeUser(name, age, hasHobbies));
console.log(add(1,2));
console.log(addOne(3));
console.log(addRandom());
*/

// Objects
// this will not work
/*
var person = {
    name: "Marcio",
    age: 31,
    greet: () => { // as an array function
        console.log('Name: ' + this.name + ' Age: ' + this.age);
    }
};

person.greet();
// this will console log: Name: undefined Age: undefined
// why?
// when using arrow functions, this is only available inside the scope of the function.
// name and age are outside the scope of the function

// this will work, though
var person = {
    name: "Marcio",
    age: 31,
    greet() {
        console.log('Name: ' + this.name + ' Age: ' + this.age);
    }
};

person.greet();
// this will console log correctly: Name: Marcio Age: 31
*/

// Arrays & Array Methods
/*
// declaring an empty array
const hobby = [];
// declaring an array with elements of different types
const poutpourri = ['A', 'B', true, 1, { name: 'Márcio', age: 31 }];
// declaring an array with elements of the same type
const hobbies = ['Sports', 'Cooking'];

// how to loop through an array

// the "old" way
for (let hobby of hobbies) {
    console.log(hobby);
}

// the "new" way
hobbies.forEach(hobby => {
    console.log(hobby);
});

// other handy functions:

// used to manipulate each element of that array
// and return the result as a new array
const newHobbies = hobbies.map(hobby => {
    return 'Hobby: ' + hobby;
});

// remember:
// the function above can be refactored to this:
const newerHobbies = hobbies.map(hobby => 'Hobby: ' + hobby);

console.log(newerHobbies);
console.log(newHobbies);
console.log(hobbies);
*/
/*
// Objects and Arrays are so-called "Reference Types"

// if hobbies is a const, why can I push new elements inside the array?
const hobbies = ['Sports', 'Cooking'];
hobbies.push('Drawing');
console.log(hobbies);
// turns out we are not storing the values inside the hobbies
// we are storing only a pointer which points to the memory address in which the array is stored
// so even though we are adding another element, the pointer is still the same
// this means that arrays are reference types
// everything is reference types, except numbers, strings, and booleans, basically
*/

// Spread and Rest Operators

// Spread Operator

// copy an array
const hobbies = ['Sports', 'Cooking'];

const array2 = hobbies.slice(); // copies an array
const array3 = [hobbies]; // what do I see in the console? 
                          // is an array with another array in it
                          // this is not a copy
const spreadArray = [...hobbies]; // pulls out all the elements of the array and push it to the new array
const spreadArrayAndMore = [...hobbies, 'Programming'] // we can copy and also and more elements at the same time

console.log(hobbies);
console.log(array2);
console.log(array3);
console.log(spreadArray);
console.log(spreadArrayAndMore);

// we can also spread objects

const person = {
    name: 'Marcio',
    age: 31
}

const newPerson = {...person};

console.log(person);
console.log(newPerson);

// Rest operator

const toArray = (arg1, arg2, arg3) => {
    return [arg1, arg2, arg3];
}

console.log(toArray('Kiko', 'Leandro', 'Bruno'));

// but what if I want to add infinite arguments to that function?

const toArrayRestOperator = (...args) => {
    return args;
}

// you can also use it like that


const toArrayRestOperatorRefactores = (...args) => args;

console.log(toArrayRestOperator(1,2,3,4,5));
console.log(toArrayRestOperatorRefactores(1,2,3,4,5));