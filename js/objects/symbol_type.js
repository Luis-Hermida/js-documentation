// Symbols
// A “symbol” represents a unique identifier and can be created using Symbol()

// Symbol takes optional paremeter description
let id1 = Symbol("id");
let id2 = Symbol("id");
console.log(id1 == id2); // false

// Symbols allow us to create “hidden” properties of an object, that no other part of code can
// accidentally access or overwrite.
let user = {
  // belongs to another code
  name: "John",
};

id = Symbol("id");
user[id] = 1;
console.log(user[id]); // we can access the data using the symbol as the key

// Symbols in a object literal
id = Symbol("id");
let user = {
  name: "John",
  [id]: 123, // not "id": 123
};

// Symbols are skipped by for...in and Object.keys(user)
id = Symbol("id");
let user = {
  name: "John",
  age: 30,
  [id]: 123,
};

for (let key in user) console.log(key); // name, age (no symbols)
// the direct access by the symbol works
console.log("Direct: " + user[id]);

// Global symbols
// read from the global registry
let id = Symbol.for("id"); // if the symbol did not exist, it is created
// read it again (maybe from another part of the code)
let idAgain = Symbol.for("id");
// the same symbol
console.log(id === idAgain); // true

// Symbol keyFor
let sym = Symbol.for("name");
let sym2 = Symbol.for("id");
// get name by symbol
console.log(Symbol.keyFor(sym)); // name
console.log(Symbol.keyFor(sym2)); // id
// all symbols have the description property.

// System symbols
// https://tc39.github.io/ecma262/#sec-well-known-symbols
