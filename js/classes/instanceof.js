// Class checking - instanceof
/*
    The 'instanceof' operator allows to check whether an object belongs to a certain class. It also
    takes inheritance into account.

    Such a check may be necessary in many cases. For example, it can be used for building a
    polymorphic function, the one that treats arguments differently depending on ther type.

*/

//////////////////////////
// The instanceof operator
//////////////////////////
/*
    Syntax: obj instanceof Class

    It returns 'true' if 'obj' belongs to the 'Class' or a class inheriting from it.
*/
class Rabbit {}
let rabbit = new Rabbit();
// is it an object of Rabbit class?
console.log(rabbit instanceof Rabbit); // true

// It also works with constructor functions.
// instead of class
function Cat() {}
console.log(new Cat() instanceof Cat); // true

// And built-in classes
let arr = [1, 2, 3];
console.log(arr instanceof Array); // true
console.log(arr instanceof Object); // true

/*
    Please note that 'arr' also belongs to the 'Object' class. That's because 'Array' prototypically
    inherits from 'Object'.

    Normally, 'instanceof' examines the prototype chain for the check. We can also set a custom
    logic in the static method 'Symbol.hasInstance'.

    The algorithm of 'obj instanceof Class' works roughly as follows:
*/

/*
    1. If there's a static method 'Symbol.hasInstance', then just call it:
    'Class[Symbol.hasInstance](obj)'. It should return either 'true' or 'false', and we're
    done. That's how we can customize the behavior of 'instanceof'
*/
// setup instanceOf check that assumes that
// anything with canEat property is an animal
class Animal {
  static [Symbol.hasInstance](obj) {
    if (obj.canEat) return true;
  }
}
let obj = { canEat: true };
console.log(obj instanceof Animal); // true: Animal[Symbol.hasInstance](obj) is called

/*
    2. Most classes do not have 'Symbol.hasInstance'. In that case the standard logic is used:
    'obj instanceOf Class' checks whether 'Class.prototype' is equal to one of the
    prototypes in the 'obj' prototype chain.

    obj.__proto__ === Class.prototype?
    obj.__proto__.__proto__ === Class.prototype?
    obj.__proto__.__proto__.__proto__ === Class.prototype?

    // if any answer is true, return true
    // otherwise, if we reached the end of the chain, return false
*/
class Animal2 {}
class Rabbit2 extends Animal2 {}
let rabbit2 = new Rabbit2();
console.log(rabbit2 instanceof Animal2); // true
// rabbit.__proto__ === Animal.prototype (no match)
// rabbit.__proto__.__proto__ === Animal.prototype (match!)

/*
    By the way, there's also a method 'objA.isPrototypeOf(objB)', that returns 'true' if 'objA' is
    somewhere in the chain of prototypes for 'objB'. So the test of 'obj instanceof Class' can
    be rephrased as 'Class.prototype.isPrototype(obj)'.

    'Class' constructor itself doesn't participate in the check. Only the chain of prototypes
    and 'Class.prototype' matters.

    'That can lead to interesting consequences when a 'prototype' property is changed after the
    object is created.
*/
function Dog() {}
let dog = new Dog();

// Changed prototype
Dog.prototype = {};

// Not a dog anymore
console.log(dog instanceof Dog); // false

/////////////////////////////////////////
// Object.prototype.toString for the type
/////////////////////////////////////////
let obj2 = {};
console.log(obj2); // [object Object]
console.log(obj2.toString()); // [object Object]

/*
    We already know that plain objects are converted to string as '[object Object]'
    
    That's their implementation of 'toString'. But there's a hidden feature that makes 'toString'
    actually much more powerful than that. We can use it as an extend 'typeof' and an
    alternative for 'instanceof'.

    By specification, the built-in 'toString' can be extracted from the object and executed in the
    context of any other value. And its result depends on that value.

    For a number, it will be [object Number]
    For a boolean, it will be [object Boolean]
    For null : [object Null]
    For undefined : [object Undefined]
    For arrays: [object Array]
*/
// copy toString method into a variable for convenience
let objectToString = Object.prototype.toString;

console.log(objectToString.call(123)); // [object Number]
console.log(objectToString.call(null)); // [object Null]
console.log(objectToString.call(console.log)); // [object Function]

/////////////////////
// Symbol.toStringTab
/////////////////////
/*
    The behavior of Object 'toString' can be customized using a special object property
    'Symbol.toStringTag'.
*/
let user = {
  [Symbol.toStringTag]: "User123",
};
console.log({}.toString.call(user)); // [object User123]

// For most environment-specific objects, there is such a property.
// toStringTag for the environment-specific object and class:
console.log(window[Symbol.toStringTag]); // Window
console.log(XMLHttpRequest.prototype[Symbol.toStringTag]); // XMLHttpRequest

console.log({}.toString.call(window)); // [object Window]
console.log({}.toString.call(new XMLHttpRequest())); // [object XMLHttpRequest]

/*
    As you can see, the result is exactly 'Symbol.toStringTag' (if exist), wrapped into
    '[object ...]'

    At the end we have "typeof on steroids" that not only works for primitive data types, but also
    for built-in objects and even can be customized.

    We can use '{}.toString.call' instead of 'instanceof' for built-in objects when we want to
    get the type as a string rather than just to check.
*/
