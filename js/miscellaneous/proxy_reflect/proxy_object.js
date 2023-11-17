/*
    //////////
    // Proxy Object
    //////////

    The proxy and the original object are different objects.

    So if we use the original object as a key, and then proxy it, then the proxy can't be foudn

    As we can see, after proxying we can't find 'user' in the set 'allUsers', because it's a
    different object.
*/
let allUsers = new Set();

class User {
  constructor(name) {
    this.name = name;
    allUsers.add(this);
  }
}

let user = new User("John");
console.log(allUsers.has(user)); // true

user = new Proxy(user, {});
console.log(allUsers.has(user)); // false

/*
    Warning: Proxies can't intercept a strict equality test '==='

    Proxies can intercept many operators, such a 'new' (with 'construct'), 'in' (with 'has'),
    'delete' (with 'deleteProperty') and so on.

    But there's no way to intercept a strict equality test for objects. An object is strictly equal
    to itself only, and no other value.

    So all operations and built-in classes that compare objects for equality will differentiate
    between the objects and the proxy. No replacement here.
*/
