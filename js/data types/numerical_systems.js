// Hexadecimal
// Binary
// Octal

// Hexadecimal  numbers are widely used in JavaScript to represent colors, encode characters,
// and for many other things. So naturally, there exists a shorter way to write them:
// 0x and then the number

console.log(0xff); // 255
console.log(0xff); // 255 (the same, case doesn't matter)

// Binary and octal numeral systems are rarely used, but also supported using the 0b and 0o prefixes;
let a = 0b11111111; // binary form of 255
let b = 0o377; // octal form of 255
console.log(a == b); // true, the same number 255 at both sides

// toString(base) returns a string representation of num in the numeral system with the given base
let num = 255;
console.log(num.toString(16)); // ff
console.log(num.toString(2)); // 11111111

// Two dots to call a method
console.log((123456).toString(36)); // 2n9c
