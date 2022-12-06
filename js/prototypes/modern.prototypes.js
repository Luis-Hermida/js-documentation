// Prototype methods, objects without __proto__
/*
    The '__proto__' is considered outdated and somewhat deprecated (in browser-only part of the 
    JavaScript standard).

    The modern methos are:

    - Object.create(proto, [descriptors]) - creates an empty object with given 'proto' as
    [[Prototype]] and optional property descriptors.

    - Object.getPrototype(obj) - returns the [[Prototype]] of 'obj'

    - Object.setProperty(obj, proto) - sets the [[Prototype]] of 'obj' to 'proto'
*/

let animal = {
  eats: true,
};

// create a new object with animal as a prototype
let rabbit = Object.create(animal);

console.log(rabbit.eats); // true

console.log(Object.getPrototypeOf(rabbit) === animal); // true

Object.setPrototypeOf(rabbit, {}); // change the prototype of rabbit to {}

// Object.create has an optional second argument: property descriptors. We can provide
// aditional properties to the new object there:
let cat = Object.create(animal, {
  jumps: {
    value: true,
  },
});

console.log(cat.jumps); // true

// We can use 'Object.create' to perform an object cloning more powerful than copying
// properties in 'for..in'
let clone = Object.create(
  Object.getPrototypeOf(animal),
  Object.getOwnPropertyDescriptors(animal)
);
// This call makes a truly exaact copy of 'obj', including all properties: enumerables and
// no enumaerables, dataa properties, and setters and getters with the right [[Prototype]].

/*
    !Warning: Don't change [[Property]] on existing objects if speed matters

    Technically, we can get/set '[[Property]]' at any time. But usually we only set it once at
    the object creation time and don't modify it anymore: 'rabbit' inherits from 'animal', and
    that is not going to change.

    And JavaScript engines are highly optimized for this.. Changing a property "on-the-fly" with
    'Object.setPrototypeOf' or 'obj.__proto__=' is a very slow operation as it breaks
    internal optimizations for object property access operations.
*/

// Very plain objects
/*
    As we know, objects can be used as associative arrays to store key/value pairs.

    But if we tried to store user-provided keys in it (for instance, a user-entered dictionary), we can
    see an interesting glitch: all keys work fine except "__proto__".
*/
let obj = {};
let key = "__proto__"; // We don't have the Window object here so imagine a promt
obj[key] = "some value";

console.log(obj[key]); // [Object: null prototype] {} and [object Object] with promt
/*
    Here, if the user types in __proto__, the assignment is ignored.

    That shouldn't surprise us. The __proto__ property is special: it must be either an object or
    'null'. A string can not become a prototype.

    But we didn't intent to implement such behavior, right? We want to store key/value pairs, and the
    key named "__proto__" was not propertly saved.

    Here the consequences are not terrible. But in other cases we may be assigning object values,
    and then the prototype may indeed be changed. As a result, the execution will go wrong in totally
    unexpected ways.

    What's worse - usually developers do not think about such possibility at all. That makes such
    bugs hard to notice and event turn them into vulnerabilities, specially when JavaScript is used on
    server-side.

    Unexpected things also may happen when assigning to 'toString', which is a funcion by 
    default, and to other built-in methods.

    To avoid this problem, we can just switch to using 'Map' for storage instead of plain objects, then everything
    is fine. But 'Object' can also serve us well here, because language creators gave thought to that problem
    long ago.

    __proto__ is not a property of an object, but an accessor property of 'Object.prototype'

    So, if obj.__proto__ is read or set, the corresponding getter/setter is called from its
    prototype, and it gets/sets [[Prototype]].

    As it was said in the beginning of this tutorial section: __proto__ is a way to access
    [[Prototype]] , it is not [[Prototype]] itself.

    Now, if we intend to use an object as an associative array and be free of such problems, we can
    do it with a little trick, 'Object.create(null)' creates an empty object without a prototype
    ([[Prototype]] is null).

    So, there is no inherited getter/setter for __proto__ . Now it is processed as a regular data
    property, so the example above works right.

    We can call such objects “very plain” or “pure dictionary” objects, because they are even simpler
    than the regular plain object {...}.

    A downside is that such objects lack any built-in object methods, e.g. toString :
*/
let obj2 = Object.create(null);
let key2 = "__proto__"; // We don't have the Window object here so imagine a promt
obj2[key2] = "some value";

console.log(obj[key]); // "some value"

// console.log(obj2); // Error (no toString)
/*
    Solution: Add toString to the object.

    let dictionary = Object.create(null, {
        toString: { // define toString property
            value() { // the value is a function
                return Object.keys(this).join();
            }
        }
    });
*/

// Note that most object-related methods are 'Object.something(...)', like
// 'Object.keys(obj)' - they are not int the prototype, so they will keep working on such objects.
let chineseDictionary = Object.create(null);
chineseDictionary.hello = "你好";
chineseDictionary.bye = "再见";
console.log(Object.keys(chineseDictionary)); // hello,bye
