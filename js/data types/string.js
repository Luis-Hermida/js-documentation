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

// Backticks Allow multiple lines string
let guestList = `Guests:
* John
* Pete
* Mary
`;

// Special characters

// newline character
guestList = "Guests:\n * John\n * Pete\n * Mary";

let str1 = "Hello\nWorld"; // two lines using a "newline symbol"
// two lines using a normal newline and backticks
let str2 = `Hello
World`;
console.log(str1 == str2); // true

// unicode
console.log("\u00A9"); // ©
console.log("\u{20331}"); // 佫, a rare Chinese hieroglyph (long Unicode)
console.log("\u{1F60D}"); // 😍, a smiling face symbol (another long Unicode)

// escape chracter
console.log("I'm the Walrus!"); // I'm the Walrus!

// string methods
// string length - is a numeric property not a function
console.log(`My\n`.length); // 3

str = `Hello`;
// you can access characters but strings are immutable
console.log(str.charAt(0)); // H
console.log(str[str.length - 1]); // o
// str[0] = 'h'; // error

// changing the case
console.log("Interface".toUpperCase()); // INTERFACE
console.log("Interface".toLowerCase()); // interface
console.log("Interface"[0].toLowerCase()); // 'i'

// searching for a substring
str = "Widget with id";
console.log(str.indexOf("Widget")); // 0, because 'Widget' is found at the beginning
console.log(str.indexOf("widget")); // -1, not found, the search is case-sensitive
console.log(str.indexOf("id")); // 1, "id" is found at the position 1 (..idget with id)
// second parameter allows us to start searching from a given position
console.log(str.indexOf("id", 2)); // 12

// bitwise NOT trick
// bitwise NOT ~ operator In practice, that means a simple thing: for 32-bit integers ~n equals -(n+1).
console.log(~2); // -3, the same as -(2+1)
console.log(~1); // -2, the same as -(1+1)
console.log(~0); // -1, the same as -(0+1)
console.log(~-1); // 0, the same as -(-1+1)
~str.indexOf("Wideget") ? console.log("We found it") : null;

// includes, startsWith, endsWith
console.log("Widget with id".includes("Widget")); // true
console.log("Hello".includes("Bye")); // false
console.log("Widget".includes("id")); // true
console.log("Widget".includes("id", 3)); // false, from position 3 there is no "id"

console.log("Widget".startsWith("Wid")); // true, "Widget" starts with "Wid"
console.log("Widget".endsWith("get")); // true, "Widget" ends with "get

// getting a substring
// There are 3 methods in JavaScript to get a substring: substring , substr and slice
str = "stringify";
// slice
// Returns the part of the string from start to (but not including) end.
console.log(str.slice(0, 5)); // 'strin', the substring from 0 to 5 (not including 5)
console.log(str.slice(0, 1)); // 's', from 0 to 1, but not including 1, so only character at 0
console.log(str.slice(2)); // 'ringify', from the 2nd position till the end
// start at the 4th position from the right, end at the 1st from the right
console.log(str.slice(-4, -1)); // 'gif'

// substring
// This is almost the same as slice , but it allows start to be greater than end.
// these are same for substring
console.log(str.substring(2, 6)); // "ring"
console.log(str.substring(6, 2)); // "ring"
// ...but not for slice:
console.log(str.slice(2, 6)); // "ring" (the same)
console.log(str.slice(6, 2)); // "" (an empty string)
// Negative arguments are treated as 0.

// substr
// Returns the part of the string from start , with the given length.
str = "stringify";
console.log(str.substr(2, 4)); // 'ring', from the 2nd position get 4 characters
console.log(str.substr(-4, 2)); // 'gi', from the 4th position get 2 characters

// Comparing strings
console.log("a" > "Z"); // true - A lowercase letter is always greater than the uppercase
console.log("Österreich" > "Zealand"); // true - Letters with diacritical marks are "out of order"

// All strings are encoded using UTF-16  . That is: each character has a corresponding numeric
// code. There are special methods that allow to get the character for the code and back.

// str.codePointAt(pos)
// different case letters have different codes
console.log("z".codePointAt(0)); // 122
console.log("Z".codePointAt(0)); // 90

// str.fromCodePoint(pos)
console.log(String.fromCodePoint(90)); // Z

// get character by unicode code
// 90 is 5a in hexadecimal system
console.log("\u005a"); // Z

// Correct approach to compare string by using str.localeCompare(str2)
// Returns a negative number if str is less than str2 .
// Returns a positive number if str is greater than str2 .
// Returns 0 if they are equivalent
console.log("Österreich".localeCompare("Zealand")); // -1
