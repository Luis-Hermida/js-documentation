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
const firstName = "";
const lastName = "";
const nickName = "SuperCoder";
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

console.log(!true); // false
console.log(!0); // true

// A double NOT !! is sometimes used for converting a value to boolean type

console.log(!!"non-empty string"); // true
console.log(!!null); // false

// ---------
// Nullish coalescing operation '??'
// ---------

const user = undefined;
console.log(user ?? "Anonymous"); // Anonymous (user not defined)

const user2 = "John";
console.log(user2 ?? "Anonymous"); // John (user defined)

const firstName2 = null;
const lastName2 = null;
const nickName2 = "Supercoder";
// shows the first defined value:
console.log(firstName2 ?? lastName2 ?? nickName2 ?? "Anonymous"); // Supercoder

// ---------
// Comparasion with '||'
// ---------

// || returns the first truthy value.
// ?? returns the first defined value.
const height = 0;

console.log(height || 100); // 100
console.log(height ?? 100); // 0
