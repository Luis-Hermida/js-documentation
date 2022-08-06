// One of the most used operations when working with numbers is rounding.

// Math.floor
// Rounds down: 3.1 becomes 3 , and -1.1 becomes -2

// Math.ceil
// Rounds up: 3.1 becomes 4 , and -1.1 becomes -1

// Math.round
// Rounds to the nearest integer: 3.1 becomes 3 , 3.6 becomes 4 , the middle case: 3.5 rounds up to 4 too

// Math.trunc
// Removes anything after the decimal point without rounding: 3.1 becomes 3 , -1.1 becomes -1

// To remove decimals
let num = 1.23456;
console.log(Math.round(num * 100) / 100); // 1.23456 -> 123.456 -> 123 -> 1.23

num = 12.34;
console.log(num.toFixed(1)); // "12.3"

num = 12.34;
console.log(num.toFixed(5)); // "12.34000", added zeroes to make exactly 5 digits

// Issues with calculations
// If a number is really huge, it may overflow the 64-bit storage and become a special numeric value Infinity
console.log(1e500); // Infinity

// console.log( 0.1 + 0.2 == 0.3 ); // false // 0.1 + 0.2 === 0.30000000000000004

// Self-increasing number!
console.log(9999999999999999); // shows 10000000000000000
// This suffers from the same issue: a loss of precision. There are 64 bits for the number, 52 of
// them can be used to store digits, but that’s not enough. So the least significant digits
// disappear.

// Two zeroes
// JS has to representations of zero 0 and -0
