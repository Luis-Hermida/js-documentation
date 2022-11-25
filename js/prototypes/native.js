// Native Prototypes
/*
    The "prototype" property is widely used by the core of JavaScript itself. All built-in
    constructor functions use it.

    let obj = {};
    console.log( obj ); // "[object Object]"

    Where’s the code that generates the string "[object Object]", That’s a built-in
    toString method, but the obj is empty.

    But the short notation obj = {} is the same as obj = new Object() , where Object
    is a built-in object constructor function, with its own prototype referencing a huge object with
    toString and other methods.

    When new Object() is called (or a literal object {...} is created), the [[Prototype]] of
    it is set to Object.prototype.

    So then when obj.toString() is called the method is taken from Object.prototype.
*/

let obj = {};
console.log(obj.__proto__ === Object.prototype); // true
console.log(obj.toString === obj.__proto__.toString); //true
console.log(obj.toString === Object.prototype.toString); //true

// Other built-in prototypes
/*
    Other built-in objects such as Array , Date , Function and others also keep methods in
    prototypes.

    For instance, when we create an array [1, 2, 3] , the default new Array() constructor is
    used internally. So Array.prototype becomes its prototype and provides methods. That’s
    very memory-efficient.

    By specification, all of the built-in prototypes have Object.prototype on the top.
*/
let arr = [1, 2, 3];
// it inherits from Array.prototype?
console.log(arr.__proto__ === Array.prototype); // true
// then from Object.prototype?
console.log(arr.__proto__.__proto__ === Object.prototype); // true
// and null on the top.
console.log(arr.__proto__.__proto__.__proto__); // null

// It doesn't use the method toString from the Object prototype.
console.log(arr); // 1,2,3 <-- the result of Array.prototype.toString

// Primitives
/*
    The most intricate thing happens with strings, numbers and booleans.
    
    As we remember, they are not objects. But if we try to access their properties, temporary wrapper
    objects are created using built-in constructors String , Number and Boolean . They provide
    the methods and disappear.

    These objects are created invisibly to us and most engines optimize them out, but the
    specification describes it exactly this way. Methods of these objects also reside in prototypes,
    available as String.prototype , Number.prototype and Boolean.prototype 

    Warning: Values 'null' and 'undefined' have no object wrappers.
    Special values null and undefined stand apart. They have no object wrappers, so
    methods and properties are not available for them. And there are no corresponding
    prototypes either.
*/

// Changing native prototypes
/*
    Native prototypes can be modified. For instance, if we add a method to String.prototype , it
    becomes available to all strings.

    During the process of development, we may have ideas for new built-in methods we’d like to
    have, and we may be tempted to add them to native prototypes. But that is generally a bad idea.

    Warning:
    Prototypes are global, so it’s easy to get a conflict. If two libraries add a method
    String.prototype.show , then one of them will be overwriting the method of the other.
*/
String.prototype.show = function () {
  console.log(this);
};
"BOOM!".show(); // BOOM!

/*
    In modern programming, there is only one case where modifying native prototypes is
    approved. That’s polyfilling.

    Polyfilling is a term for making a substitute for a method that exists in the JavaScript specification,
    but is not yet supported by a particular JavaScript engine.

    We may then implement it manually and populate the built-in prototype with it
*/
if (!String.prototype.repeat) {
  // if there's no such method
  // add it to the prototype
  String.prototype.repeat = function (n) {
    // repeat the string n times
    // actually, the code should be a little bit more complex than that
    // (the full algorithm is in the specification)
    // but even an imperfect polyfill is often considered good enough
    return new Array(n + 1).join(this);
  };
}
console.log("La".repeat(3)); // LaLaLa

// Borrowing from prototypes
/*
    Some methods of native prototypes are often borrowed.

    For instance, if we’re making an array-like object, we may want to copy some Array methods to
    it.

    It works because the internal algorithm of the built-in join method only cares about the correct
    indexes and the length property. It doesn’t check if the object is indeed an array. Many built-in
    methods are like that.

    Another possibility is to inherit by setting obj.__proto__ to Array.prototype , so all
    Array methods are automatically available in obj.

    But that’s impossible if obj already inherits from another object. Remember, we only can inherit
    from one object at a time.

    Borrowing methods is flexible, it allows to mix functionalities from different objects if needed.
*/

let obj2 = {
  0: "Hello",
  1: "world!",
  2: "Test",
  length: 3,
};

obj2.join = Array.prototype.join;

console.log(obj2.join(",")); // Hello,world!
