// Classes
// Class basic syntax

/*
    In practice, we often need to create many objects of the same kind.

    As we already know from the chapter 'objects/new', new function can help
    with that.

    But in the modern JavaScript, there's a more advanced "class" construct, that introduces great
    new features which are useful for object-oriented programming.

    // Basic Syntax:
    class MyClass {
        // class methods
        constructor() { ... }
        method1() { ... }
        method2() { ... }
        method3() { ... }
        ...
    }

    The 'contrcutor()' method is called automatically by 'new', so we can initialize the object
    there.

    When a new User('John') is called:
    1. A new object is created.
    2. The contructor runs with the given argument and assigns it to 'this.name'
*/
class User {
  constructor(name) {
    this.name = name;
  }
  sayHi() {
    console.log(this.name);
  }
}

// Usage:
let user = new User("John");
user.sayHi();
/*
    !Warning: No comma between class methods.

    A common pitfall for novice developers is to put a comma between class methods, which
    would resoult in a syntax arror.

    The notation here is not to be confused with object literals. Within the class, no commas are
    required.
*/

// What is a class
/*
    A class is a kind of function.

    class User {
        constructor(name) { this.name = name; }
        sayHi() { console.log(this.name); }
    }

    // proof: User is a function
    console.log(typeof User); // function
*/

/*
    What 'class User {...}' construct really does is:
    1. Creates a function named 'User', that becomes the result of the class declaration. The
    function code is taken from the 'constructor' method (assumed empty if we don't write such
    method).

    2. Stores class methods, such as 'sayHi', in 'User.prototype'.

    After 'new User' object is created, when we call its method, it's taken from the prototypem, just as
    described in the chapter 'prototypes/f.prototype'. So the object has access to class methods.
*/

// class is a function
console.log(typeof User); // function

// ...or, more precisely, the constructor method
console.log(User === User.prototype.constructor); // true

// The methods are in User.prototype, e.g:
console.log(User.prototype.sayHi); // the code of the sayHi method

// there are exactly two methods in the prototype
console.log(Object.getOwnPropertyNames(User.prototype)); // constructor, sayHi

/////////////////////////////
// Not just a syntactic sugar
/////////////////////////////
/*
    Sometimes people say that class is a “syntactic sugar” (syntax that is designed to make things
    easier to read, but doesn’t introduce anything new), because we could actually declare the same
    thing without using the class keyword at all.
*/

// rewriting class User in pure functions

// 1. Create constructor function
function User2(name) {
  this.name = name;
}

// a function prototype has "constructor" property by default,
// so we don't need to create it.

// 2. Add the method to prototype
User2.prototype.sayHi = function () {
  console.log(this.name);
};

// Usage:
let user2 = new User2("John");
user2.sayHi(); // John

/*
    The result of this definition is about the same. So, there are indeed reasons why class can be
    considered a syntactic sugar to define a constructor together with its prototype methods.

    Still, there are important differences.

    1. First, a function created by 'class' is labelled by a special internal property.
    [[isClassConstructor]]: true. So it's not entirely the same as creating it manually.

    The language checks for that property so in a varierty of places. For example, unlike a regular
    function, it must be called with 'new'.

    2. Class methods are non-enumerable. A class definition sets 'enumerable' flag to 'false' for
    all methods in the "prototype".

    That's good, because if we 'for..in' over and object, we usually don't want its class methods.

    3. Classes always 'use strict'. All code inside the class construct is automatically in strict
    mode.

    The 'class' syntax brings many other features and there are other differences.
*/
