// Number
// The number type represents both integer and floating point numbers.
let n = 123;
n = 12.345;

// Number special numeric values
console.log(1 / 0); // Infinity
console.log("not a number" / 2); // NaN, such division is erroneous
// All mathematical operations are safe

// BigInt
// “number” type cannot represent integer values larger than (253-1)
// (that’s 9007199254740991 ), or less than -(253-1) for negatives

// BigInt type was recently added to the language to represent integers of arbitrary length.
// the "n" at the end means it's a BigInt
const bigint = 1234567890123456789012345678901234567890n;
const sameBigint = BigInt("1234567890123456789012345678901234567890");
const bigintFromNumber = BigInt(10); // same as 10n

// Can be used like a regular number
console.log(1n + 2n); // 3
console.log(5n / 2n); // 2

console.log(1n + 2); // Error: Cannot mix BigInt and other types

// number to bigint
console.log(bigint + BigInt(number)); // 3

// bigint to number
console.log(Number(bigint) + number); // 3

// We can add a separator in the numbers as they get ignored
let billion = 1_000_000_000;

// Letter e we can shorten a number by specifying the zeroes count after the e
billion = 1e9; // 1 billion, literally: 1 and 9 zeroes
let mcs = 1e-6; // 0.000001, e letter can be a negative value
