// non-existing property problem

let user = {}; // a user without "address" property
console.log(user.address.street); // Error!

// prettier-ignore
console.log(user.address ? (user.address.street ? user.address.street.name : null) : null);
console.log(user.address && user.address.street && user.address.street.name); // undefined (no error)

user = {}; // user has no address
console.log(user?.address?.street); // undefined (no error)
console.log(user?.address); // undefined
console.log(user?.address.street); // undefined

// Don’t overuse the optional chaining
// The variable before ?. must be declared

// Short-circuiting
// ? immediately stops (“short-circuits”) the evaluation if the left part doesn’t exist.
user = null;
let x = 0;
user?.sayHi(x++); // no "user", so the execution doesn't reach sayHi call and x++
console.log(x); // 0, value not incremented

// () example
let userAdmin = {
  admin() {
    console.log("I am admin");
  },
};
let userGuest = {};
userAdmin.admin?.(); // I am admin
userGuest.admin?.(); // nothing happens (no such method)

// [] example
let key = "firstName";
let user1 = {
  firstName: "John",
};
let user2 = null;
console.log(user1?.[key]); // John
console.log(user2?.[key]); // undefined

// delete example
delete user?.name; // delete user.name if user exists

// writing example
user = null;
user?.name = "John"; // Error, doesn't work
// because it evaluates to: undefined = "John"