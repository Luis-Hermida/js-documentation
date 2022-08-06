// Number
// The number type represents both integer and floating point numbers.
let n = 123;
n = 12.345;

// Special numeric values
console.log(1 / 0); // Infinity
console.log("not a number" / 2); // NaN, such division is erroneous
// All mathematical operations are safe

// Special numeric values methods
console.log(isNaN(NaN)); // true
console.log(isNaN("str")); // true

console.log(isFinite("15")); // true
console.log(isFinite("str")); // false, because a special value: NaN
console.log(isFinite(Infinity)); // false, because a special value: Infinity

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

// console.log(1n + 2); // Error: Cannot mix BigInt and other types

let number = 3;
// number to bigint
console.log(bigint + BigInt(number)); // 3

// bigint to number
console.log(Number(bigint) + number); // 3

// We can add a separator in the numbers as they get ignored
let billion = 1_000_000_000;

// Letter e we can shorten a number by specifying the zeroes count after the e
billion = 1e9; // 1 billion, literally: 1 and 9 zeroes
let mcs = 1e-6; // 0.000001, e letter can be a negative value

// parseInt and parseFloat
// Numeric conversion using a plus + or Number() is strict. If a value is not exactly a number, it fails;
console.log(+"100px"); // NaN

// parseInt and parseFloat They “read” a number from a string until they can’t. In case of an error, the gathered number is
// returned. The function parseInt returns an integer, whilst parseFloat will return a floating-point number
console.log(parseInt("100px")); // 100
console.log(parseFloat("12.5em")); // 12.5
console.log(parseInt("12.3")); // 12, only the integer part is returned
console.log(parseFloat("12.3.4")); // 12.3, the second point stops the reading
console.log(parseInt("a123")); // NaN, the first symbol stops the process

// Second argument
// It specifies the base of the numeral system, so parseInt can also parse strings of hex numbers,
// binary numbers and so on

// Fix
console.log((1.35).toFixed(1)); // 1.4
console.log((6.35).toFixed(1)); // 6.3

// 6.35 is rounding down because of presicion issues.
console.log(Math.round(6.35 * 10) / 10); // 6.4
