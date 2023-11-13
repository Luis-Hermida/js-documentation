/*
    //////////
    // Iteration with "ownKeys" and "getOwnPropertyDescriptor"
    //////////

    'Object.keys', 'for..in' loop and most other methods that iterate over object properties use
    '[[OwnPropertyKeys]]' internal method (intercepted by 'ownKeys' trap) to get a list of properties.

    Such methods differ in details:
    - 'Object.getOwnPropertyNames(obj)' returns non-symbol keys.
    - 'Object.getOwnPropertySymbols(obj)' returns symbol keys.
    - 'Object.keys/values()' returns non-symbol keys/values with enumerable flag
    - 'for..in' loops over non-symbol keys with enumerable flag, and also prototype keys.
*/
let user = {
  name: "John",
  age: 30,
  _password: "***",
};

user = new Proxy(user, {
  // "ownKeys" filters out _password
  ownKeys(target) {
    return Object.keys(target).filter((key) => !key.startsWith("_"));
  },
});

for (let key in user) console.log(key); // name, then: age
// same effect on these methods:
console.log(Object.keys(user)); // name,age
console.log(Object.values(user)); // John,30

/*
      If we return a key that doesn't exist in the object, 'Object.keys' wont list it:
  
      `
      let user = { };
      user = new Proxy(user, {
          ownKeys(target) {
          return ['a', 'b', 'c'];
      }
      });
  
      console.log( Object.keys(user) ); // <empty>
      `
  
      This is because 'Object.keys' returns only properties with the 'enumerable' flag.
      To check for it, it calls the internal method '[[GetOwnProperty]]' for every property to get its
      'descriptor'. And here, as there's no property, its descriptor is empty, no 'enumerable' flag, so it's
      skipped.
  
      For 'Object.keys' to return a property, we need it to either exist in the object, with the
      'enumerable' flag, or we can intercept calls to '[[GetOwnProperty]]' (the trap
      'getOwnPropertyDescriptor' does it), and return a descriptor with 'enumerable: true'.
  */
let user2 = {};

user2 = new Proxy(user2, {
  ownKeys(target) {
    // called once to get a list of properties
    return ["a", "b", "c"];
  },
  getOwnPropertyDescriptor(target, prop) {
    // called for every property
    return {
      enumerable: true,
      configurable: true,
      /* ...other flags, probable "value:..." */
    };
  },
});

console.log(Object.keys(user2)); // a, b, c
