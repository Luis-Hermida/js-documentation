// Type conversions

// To Boolean - All objects are true.
// Numeric - It happens when we apply mathematical functions.
// String - It happens when we output an object
// https://tc39.es/ecma262/#sec-toprimitive

// Hints

// 'string' with console.log
console.log(obj);
// using object as a property key
anotherObj[obj] = 123;

// 'number'
// explicit conversion
let num = Number(obj);
// maths (except binary plus)
let n = +obj; // unary plus
let delta = date1 - date2;
// less/greater comparison
let greater = user1 > user2;

// 'default'
// binary plus + can work both with strings (concatenates them) and numbers (adds them)
let total = obj1 + obj2;
// obj == number uses the "default" hint
if (user == 1) {
}

// Symbol.toPrimitive
// Used to name the conversion method like this:
obj[Symbol.toPrimitive] = function (hint) {
  // here goes the code to convert this object to a primitive
  // it must return a primitive value
  // hint = one of "string", "number", "default"
};

let user = {
  name: "John",
  money: 1000,
  [Symbol.toPrimitive](hint) {
    console.log(`hint: ${hint}`);
    return hint == "string" ? `{name: "${this.name}"}` : this.money;
  },
};
// conversions demo:
console.log(user); // hint: string -> {name: "John"}
console.log(+user); // hint: number -> 1000
console.log(user + 500); // hint: default -> 1500

// toString/valueOf
// If there’s no Symbol.toPrimitive then JavaScript tries to find methods toString and valueOf
// for 'string' hints toString takes priority and for other hints valeOf has it.
// both methods has to return a primitive value or it will be ignored

// Default methods examples
user = { name: "John" };
console.log(user); // [object Object]
console.log(user.valueOf() === user); // true

// Overriding default methods
user = {
  name: "John",
  money: 1000,
  // for hint="string"
  toString() {
    return `{name: "${this.name}"}`;
  },
  // for hint="number" or "default"
  valueOf() {
    return this.money;
  },
};

console.log(user); // toString -> {name: "John"}
console.log(+user); // valueOf -> 1000
console.log(user + 500); // valueOf -> 1500

// A conversion can return any primitive type
let obj = {
  // toString handles all conversions in the absence of other methods
  toString() {
    return "2";
  },
};
alert(obj * 2); // 4, object converted to primitive "2", then multiplication made it a number
