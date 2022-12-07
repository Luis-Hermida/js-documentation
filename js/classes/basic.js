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

///////////////////
// Class Expression
///////////////////
/*
    Just like functions, classes can be defined inside another expression, passed around, returned,
    assigned, etc.

    Example of class expression:
    let User = class {
        sayHi() {
            console.log("Hello");
        }
    };


    Similar to Named Function Expressions, class epxressions may have a name. If a class expression
    has a name, it's visible inside the class only.
*/
// "Named Class Expression"
// (no such term in the spec, but that's similar to Named Function Expression)
let User3 = class MyClass {
  sayHi() {
    console.log(MyClass); // MyClass name is visible only inside the class
  }
};

new User3().sayHi(); // works, shows MyClass definition
//console.log(MyClass); // error, MyClass name isn't visible outside of the class

// We can even make classes dynamically "on-demand", like this:
function makeClass(phrase) {
  // declare a class and return it
  return class {
    sayHi() {
      console.log(phrase);
    }
  };
}
// Create a new class
let User4 = makeClass("Hello");
new User4().sayHi(); // Hello

//////////////////////
// Getters and Setters
//////////////////////
// Just like literal objects, classes may include getters/setters, computed properties etc.

class User5 {
  constructor(name) {
    // invokes the setter
    this.name = name;
  }

  get name() {
    return this._name;
  }

  set name(value) {
    if (value.length < 4) {
      console.log("Value is too short.");
      return;
    }
    this._name = `${value} - User5`;
  }
}

let user5 = new User5("John");
console.log(user5.name);

/////////////////
// Computed names
/////////////////

class User6 {
  ["say" + "Hi"]() {
    console.log("Hello");
  }
}

new User6().sayHi();

///////////////
// Class fields
///////////////
/*
    Old browser may need a polyfill - class fields are a recent addition to the language.

    "Class fields" is a syntax that allows to add any properties.

    We just write " = " in the declaration, and that’s it.

    The important difference of class fields is that they are set on individual objects, not
    User.prototype
*/

class User7 {
  name = "John";

  sayHi() {
    console.log(`Hello ${this.name}!`);
  }
}

let user7 = new User7();
user7.sayHi(); // Hello, John.
console.log(User7.prototype.name); // undefined

//////////////////////////////////
// Bound methods with class fields
//////////////////////////////////
/*
    As demostrated in the chapter 'functions/binding' functions in JavaScript have a dynamic this.
    It depends on the context of the call.

    So if an object is passed around and called in another context, 'this' won't be a
    reference to its object any more.  
*/

class Button {
  constructor(value) {
    this.value = value;
  }
  click() {
    console.log(this.value);
  }
}

let button = new Button("hello");
setTimeout(button.click, 1000); // undefined

/*
    As discussed in 'functions/binding' there are 2 approaches to fix losing this.
    1. Pass a wrapper-function, such a 'setTimeout(() => button.click(), 1000)'.
    2. Bind the method to object, e.g. in the constructor


    The class field click = () => {...} is created on a per-object basis, there’s a separate
    function for each Button object, with this inside it referencing that object. We can pass
    button.click around anywhere, and the value of this will always be correct.
*/

class Button2 {
  constructor(value) {
    this.value = value;
  }
  click = () => {
    console.log(this.value);
  };
}
let button2 = new Button2("hello");
setTimeout(button2.click, 1000); // hello
