// Object references
// One of the fundamental differences of objects versus primitives is that objects are stored and
// copied “by reference”, whereas primitive values: strings, numbers, booleans, etc – are always
// copied “as a whole value”.

let message = "Hello";
let phrase = message;
message = "Goodbye";
console.log(`${message} ${phrase}`);

let user = { name: "John" };
let admin = user;
admin.name = "Pete"; // changed by the "admin" reference
console.log(user.name); // 'Pete', changes are seen from the "user" reference

// Comparasion by reference
// Two objects are equal only if they are the same object.
let a = {};
let b = a; // copy the reference
alert(a == b); // true, both variables reference the same object
alert(a === b); // true

let c = {};
let d = {}; // two independent objects
alert(c == d); // false
