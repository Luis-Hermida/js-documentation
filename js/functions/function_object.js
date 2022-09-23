/*
    Function Object,

    In JavaScript, functions are objects, a good way to imagine functions is as callable "action objects".
    We can not only call them, but also treat them as objects: add/remove properties, pass by reference etc.
*/

/*
    The "name" property

    Function objects contain some useable properties, a function's name is accessible as the "name" property:
*/

function sayHi() {
  console.log("Hi");
}
console.log(sayHi.name); // sayHi

// Can also assign the correct name to a function even if it's creaated without one
sayHi = undefined;
sayHi = function () {
  console.log("Hi");
};
console.log(sayHi.name); // sayHi (there's a name!)

// It also works if the assignment is done via a default value
function f(sayHi = function () {}) {
  console.log(sayHi.name); // sayHi (works!)
}
f();

// In the specification, this feature is called a "contextual name". If the function doesn't provide
// one, then in an assignment it is figured out from the context.

// Object methods have names too
let user = {
  sayHi() {
    // ...
  },
  sayBye: function () {
    // ...
  },
};
console.log(user.sayHi.name); // sayHi
console.log(user.sayBye.name); // sayBye

// There's no magic though. There are cases when there's no way to figure out the right name. In
// that case, the name property is empty.
// function created inside array
let arr = [function () {}];
console.log(arr[0].name); // <empty string>
// the engine has no way to set up the right name, so there is none

// In practice, however, most functions do have a name.

/*
    The "length" property

    There is another built-in property "length" that returns the number of function parameters, for
    instance:

    function f1(a) {}
    function f2(a, b) {}
    function many(a, b, ...more) {}
    console.log(f1.length); // 1
    console.log(f2.length); // 2
    console.log(many.length); // 2 // rest parameters are not counted.

    The 'length' property is sometimes used for 'introspection' in functions that operate on other
    functions.

    For instance, in the code below the 'ask' function accepts a 'question' to ask and an arbitrary
    number of 'handler' functions to call.

    Once a user provides their answer, the function calls the handlers. We can pass two kinds of
    handlers:
    - A zero-argument function, which is only called when the user gives a positive answer.
    - A function with arguments, which is called in either case and returns an answer.

    To call 'handler' the right way, we examine the 'handler.length' property.

    The idea is that we have a simple, no-arguments handler syntax for positive cases (most frequent
    variant), but are able to support universal handlers as well:
*/

function ask(question, ...handlers) {
  // let isYes = confirm(question);
  let isYes = true;
  for (let handler of handlers) {
    if (handler.length == 0) {
      if (isYes) handler();
    } else {
      handler(isYes);
    }
  }
}
// for positive answer, both handlers are called
// for negative answer, only the second one
ask(
  "Question?",
  () => console.log("You said yes"),
  (result) => console.log(result)
);
/*
    This is a particular case of so-called polymorphism - treating arguments differrently depending
    on their type or, in our case depending on the 'length'. 
*/

/*
    Custom Properties

    We can also add properties of our own.
    Here we add the 'counter' property to track the total calls count:
*/
function sayHello() {
  console.log("Hi");
  // let's count how many times we run
  sayHello.counter++;
}
sayHello.counter = 0; // initial value
sayHello(); // Hi
sayHello(); // Hi

console.log(`Called ${sayHello.counter} times`);
console.log(`Called ${sayHello.counter} times`);
/*
    A property is not a variable

    A property assigned to a function like 'sayHi.counter = 0' doesn't define a local
    variable 'counter' inside it. In other words, a property 'counter' and a variable 'let
    count' are two unrelated things.

    We can treat a function as an object, store properties in it, but that has no effect on its
    execution. Variables are not function properties and vice verse. These are just parallel worlds.

    Function properties can replace closures sometimes. For instancem we can rewrite the counter 
    function example using a function property:

    function makeCounter() {
    let count = 0;
    return function() {
    return count++;
    };
    }

    let counter = makeCounter();
    console.log( counter() ); // 0
    console.log( counter() ); // 1
    console.log( counter() ); // 2
*/
function makeCounter() {
  // instead of:
  // let count = 0
  function counter() {
    return counter.count++;
  }
  counter.count = 0;
  return counter;
}
let counter = makeCounter();
console.log(counter()); // 0
console.log(counter()); // 1

// The 'count' is now stored in the function directly, not in its outer Lexical Environment.
// The main difference is that the value of 'count' lives in an outer variable, then external code is
// unable to access it. Only nested functions may modify it. And if it's bound to a function, then such
// a thing is possible.
function makeCounter() {
  function counter() {
    return counter.count++;
  }
  counter.count = 0;
  return counter;
}
counter = makeCounter();
counter.count = 10;
console.log(counter()); // 10
// The choice of implementation depends on our aims.

/*
    Named Function Expression or NFE, is a term for Function Expressions that have a name.
*/
// Ordinary Function Expression:
sayHi = function (who) {
  console.log(`Hello, ${who}`);
};

// Add a name to it
sayHi = function func(who) {
  console.log(`Hello, ${who}`);
};

/*
    'func' has to special things
    - It allows the function to reference itsefl internally.
    - It is not visible outside of the function.

    For instance, the function sayHi below calls itself again with "Guest" if no who is provided
*/
sayHi = function func(who) {
  if (who) {
    console.log(`Hello, ${who}`);
  } else {
    func("Guest"); // use func to re-call itself
  }
};
sayHi(); // Hello, Guest

// The problem with that code is that 'sayHi' may change in the outer code. If the function gets
// assigned to another variable instead, the code will start to give errors:
sayHi = function (who) {
  if (who) {
    console.log(`Hello, ${who}`);
  } else {
    // sayHi("Guest"); // Error: sayHi is not a function
  }
};
let welcome = sayHi;
sayHi = null;
// welcome(); // Error, the nested sayHi call doesn't work any more!

// This happens because the function takes 'sayHi' from its outer lexical environment. There's no
// local 'sayHi', so the outer variable is used.

/*
    Information: The "internal name" feature described here is only available for Function Expressions, not for
    Function declarations. For Function Declarations, there is no syntax for adding an "internal" name.
*/
