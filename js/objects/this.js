// It’s common that an object method needs to access the information stored in the object
// For instance, the code inside user.sayHi() may need the name of the user

let user = {
  name: "John",
  age: 30,

  sayHi() {
    console.log(`${this.name}`);
  },
};

// the value of this will be user

// this is not bound
// It can be used in any function, even if it’s not a method of an object.
// The value of this is evaluated during the run-time, depending on the context
user = { name: "John" };
let admin = { name: "Admin" };
function sayHi() {
  console.log(this.name);
}
// use the same function in two objects
user.f = sayHi;
admin.f = sayHi;
// these calls have different this
// "this" inside the function is the object "before the dot"
user.f(); // John (this == user)
admin.f(); // Admin (this == admin)
admin["f"](); // Admin (dot or square brackets access the method – doesn't matter)

// Arrow functions have no this
user = {
  firstName: "Ilya",
  sayHi() {
    let arrow = () => console.log(this.firstName);
    arrow();
  },
};
user.sayHi(); // Ilya

// Using this in object literal
function makeUser() {
  return {
    name: "John",
    ref: this,
  };
}
user = makeUser();
console.log(user.ref.name); // Undefined
console.log(user.ref); // Global object
