// ---------
// || (OR)
// ---------

// Evaluates operands from left to right.
// For each operand, converts it to boolean. If the result is true , stops and returns the original value of that operand.
// If all operands have been evaluated (i.e. all were false ), returns the last operand.

// Combinations
console.log(true || true); // true
console.log(false || true); // true
console.log(true || false); // true
console.log(false || false); // false

// Finding the first truthy value
let firstName = "";
let lastName = "";
let nickName = "SuperCoder";
console.log(firstName || lastName || nickName || "Anonymous"); // SuperCoder

// Short-circuit evaluation
true || console.log("not printed");
false || console.log("printed");

// ---------
// && (AND)
// ---------

// Evaluates operands from left to right.
// For each operand, converts it to a boolean. If the result is false , stops and returns the original value of that operand.
// If all operands have been evaluated (i.e. all were truthy), returns the last operand.

// Combinations
console.log(true && true); // true
console.log(false && true); // false
console.log(true && false); // false
console.log(false && false); // false

// Finding the first flasy value
console.log(1 && 2 && null && 3); // null

// When all values are truthy, the last value is returned
console.log(1 && 2 && 3); // 3, the last one

// ---------
// Precedence of && (AND) is higher than || (OR)
// ---------

// Having: a && b || c && d
// is the same as: (a && b) || (c && d)

// ---------
// ! (NOT)
// ---------

// Converts the operand to boolean type: true/false .
// Returns the inverse value.

alert(!true); // false
alert(!0); // true

// A double NOT !! is sometimes used for converting a value to boolean type

alert(!!"non-empty string"); // true
alert(!!null); // false
