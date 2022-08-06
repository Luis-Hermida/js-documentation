// A string in JavaScript must be surrounded by quotes.

/*
In JavaScript, there are 3 types of quotes.
1. Double quotes: "Hello" .
2. Single quotes: 'Hello' .
3. Backticks: `Hello`
*/

// prettier-ignore
let str = 'Single quotes are ok too';
let name = "Luis";
let phrase = `can embed another ${str}`;

// Backticks extended functionality - they allow us to embed variables and expressions
// by wrapping them in ${}

// embed a variable
console.log(`Hello, ${name}!`); // Hello, John!
// embed an expression
console.log(`the result is ${1 + 2}`); // the result is 3
