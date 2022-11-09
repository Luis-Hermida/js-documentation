// Prototypal inheritance
// Is a feature that helps you with reuse the methods of certain object instead of
// building a new object to it.

// [[Prototype]]
/*
    In JavaScript, objects have a special hidden property '[[Prototype]]', that is
    either 'null' or references another object. That object is called a prototype.

    When we read a property from 'object', and it's missing, JavaScript automatically takes it from
    the prototype. In programming, this is called 'prototypal inheritance". And soon we'll study many
    examples of such inheritance, as well as cooler language features built upon it.

    The property [[Prototype]] is internal and hidden, but there are many ways to set it.

    Prototypes have 2 limitations
    - The references can't go in circles. It will throw and error.
    - __proto__ value has to be an object or null. Otherwise it will be ignored.
*/

// __proto__
let animal = {
  eats: true,

  walk() {
    console.log("Walking");
  },
};

let rabbit = {
  jumps: true,
};

rabbit.__proto__ = animal; // sets rabbit.[[Prototype]] = animal

// we can find both properties in rabbit now:
console.log(rabbit.eats); // true (**)
console.log(rabbit.jumps); // true
rabbit.walk(); // Works with methods too

// Prototypes can be chained
let longEar = {
  earLength: 10,
  __proto__: rabbit,
};

longEar.walk();

/*
    Information: __proto__ is a historical getter/setter for [[Prototype]]

    It's a common mistake of novice developers to not know the difference between these two.

    Please note that '__proto__' is not the same as the internal '[[Prototype]]' property. It's
    a getter/setter for '[[Prototype]]'. Later we'll see situations where it matters, for now let's
    just keep it in mind, as we build our understanding of JavaScript language.

    The '__proto__' property is a bit outdated. It exists for historical reasons, modern
    JavaScript suggests that we should use 'Object.getPrototypeOf/Object.setPrototypeOf' functions
    instead that get/set the prototype. We'll cover those functions later.
*/

// Writing doesn't use prototype
/*
    The prototype is only used for reading properties.
    Write/delete operations work directly with the object.
*/
rabbit.walk = function () {
  console.log("Rabbit! Bounce-bounce!");
};

rabbit.walk(); // Rabbit! Bounce-bounce!
// From now on, rabbit.walk() call finds the method immediately in the object and executes it,
// without using the prototype.

// Accessor properties are an exception, as assignment is handled by a setter function. So writing to
// such a property is actually the same as calling a function
let user = {
  name: "John",
  surname: "Smith",

  set fullName(value) {
    [this.name, this.surname] = value.split(" ");
  },

  get fullName() {
    return `${this.name} ${this.surname}`;
  },
};

let admin = {
  __proto__: user,
  isAdmin: true,
};

console.log(admin.fullName); // John Smith (*)

// setter triggers!
admin.fullName = "Alice Cooper"; // (**)
console.log(admin.fullName); // Alice Cooper, state of admin modified
console.log(admin.surname); // Alice Cooper, state of admin modified

console.log(user.fullName); // John Smith, state of user protected
