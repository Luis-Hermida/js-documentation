// The regular {...} syntax allows us to create one object. But often we need to create many
// similar objects, like multiple users or menu items and so on.

// That can be done using constructor functions and the "new" operator.

// Conventions
// They are named with capital letter first.
// They should be executed only with "new" operator.

function User(name) {
  this.name = name;
  this.isAdmin = false;
}
let user = new User("Jack");
console.log(user.name); // Jack
console.log(user.isAdmin); // false

// Similar to
function User(name) {
  // this = {}; (implicitly)
  // add properties to this
  this.name = name;
  this.isAdmin = false;
  // return this; (implicitly)
}

// New with function
// prettier-ignore
user = new function () {
  this.name = "John";
  this.isAdmin = false;
  // ...other code for user creation
  // maybe complex logic and statements
  // local variables etc
};

// Omitting parentheses
// we can omit parentheses after new , if it has no arguments
user = new User(); // <-- no parentheses
// same as
user = new User();

// Return on constructorsas
// If return is called with an object, then the object is returned instead of this .
// If return is called with a primitive, it’s ignored

function BigUser() {
  this.name = "John";
  return { name: "Godzilla" }; // <-- returns this object
}
console.log(new BigUser().name); // Godzilla, got that object

function SmallUser() {
  this.name = "John";
  return; // <-- returns this
}
console.log(new SmallUser().name); // John

// Methods
function User(name) {
  this.name = name;
  this.sayHi = function () {
    alert("My name is: " + this.name);
  };
}
let john = new User("John");
john.sayHi(); // My name is: John
