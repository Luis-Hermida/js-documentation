/*
    //////////
    // Proxy Traps
    //////////
*/
/*
    //////////
    // Default value with "get" trap
    //////////

    The most common traps are for reading/writing properties.

    To intercept reading, the 'handler' should have a method 'get(target, property, receiver)'.

    It triggers when a property is read, with the following arguments:
    - 'target' - is the target object, the one passed as the first argument to 'new Proxy'.
    - 'property' - property name.
    - 'receiver' - if the target property is a getter, then 'receiver' is the object that's going to be
    used as 'this' in its call. Usually that's the 'proxy' object itself (or an object that inherits from
    it, if we inherit from proxy). Right now we don't need this argument, so it will be explained in more
    detail later.

    Let's use 'get' to implement default values for an object.

    We'll make a numeric array that returns '0' for nonexisten values.

    Usually when one tries to get a non-existing array item, they get 'undefined', but we'll wrap a regular
    array into the proxy that traps reading and returns '0' if there's no such property:
*/
let numbers = [0, 1, 2];

numbers = new Proxy(numbers, {
  get(target, prop) {
    if (prop in target) {
      return target[prop];
    } else {
      return 0; // default value
    }
  },
});

console.log(numbers[1]); // 1
console.log(numbers[123]); // 0 (no such item)
/*
    As we can see, it's quite easy to do with a 'get' trap.

    We can use 'Proxy' to implement any logic for "default" values.

    Imagine we have a dictionary, with phrases and their translations:

    let dictionary = {
        'Hello': 'Hola',
        'Bye': 'Adiós'
    };

    Right now, if there's no phrase, reading from 'dictionary' it returns undefined. But in practice,
    leaving a phrase untranslated is usually better than 'undefined'. So let's make it return an
    unstranlated phrase in that case instead of 'undefined'.
*/

let dictionary = {
  Hello: "Hola",
  Bye: "Adiós",
};

dictionary = new Proxy(dictionary, {
  get(target, phrase) {
    // intercept reading a property from dictionary
    if (phrase in target) {
      // if we have it in the dictionary
      return target[phrase]; // return the translation
    } else {
      // otherwise, return the non-translated phrase
      return phrase;
    }
  },
});

// Look up arbitrary phrases in the dictionary!
// At worst, they're not translated.
console.log(dictionary["Hello"]); // Hola
console.log(dictionary["Welcome to Proxy"]); // Welcome to Proxy (no translation)

/*
    Information: Proxy overwrites the variable

    `
    dictionary = new Proxy(dictionary, ...);
    `

    The proxy should totally replace the target object everywhere. No one should ever reference
    the target object after it got proxied.
*/

/*
    //////////
    // Validation with "set" trap
    //////////

    Let's say we want an array exclusively for numbers. If a value of another type is added, there
    should be an error.

    The 'set' trap triggers when a property is written.

    'set(target, property, value, receiver)':
    'target' – is the target object, the one passed as the first argument to new Proxy ,
    'property' – property name,
    'value' – property value,
    'receiver' – similar to get trap, matters only for setter properties.

    The 'set' trap should return 'true' if setting is successful, and 'false' otherwise (triggers
    'TypeError').

    Please note: the built-in functionality of arrays is still working! Values are added by push . The
    length property auto-increases when values are added. Our proxy doesn’t break anything.

    We don’t have to override value-adding array methods like push and unshift , and so on, to
    add checks in there, because internally they use the [[Set]] operation that’s intercepted by
    the proxy.
*/
let numbers2 = [];
numbers2 = new Proxy(numbers2, {
  // (*)
  set(target, prop, val) {
    // to intercept property writing
    if (typeof val == "number") {
      target[prop] = val;
      return true;
    } else {
      return false;
    }
  },
});

numbers2.push(1); // added successfully
numbers2.push(2); // added successfully
console.log("Length is: " + numbers.length); // 2

// numbers2.push("test"); // TypeError ('set' on proxy returned false)
// console.log("This line is never reached (error in the line above)");

/*
    Warning: Don't forget to return 'true'

    For 'set', it must return 'true' for a successful write.

    If we forget to do it or return any falsy value, the operation triggers 'TypeError'.
*/
