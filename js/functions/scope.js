// Code block
// If a variable is declared inside a code block '{...}', it's only visible inside that block.
{
  // do some job with local variables that should not be seen outside
  let message = "Hello"; // only visible in this block
  console.log(message); // Hello
}
// console.log(message); // Error: message is not defined

// We can use this to isolate a piece of code that does it own task, with variables, taht only belong
// to it:
{
  // show message
  let message = "Hello";
  console.log(message);
}
{
  // show another message
  let message = "Goodbye";
  console.log(message);
}

/*
    Information - Without separate blocks there would be an error, if we use 'let' with the existing
    variable name:

    // let message = "Goodbye"; // Error: variable already declared 
*/

// For 'if', 'for', 'while' and so on, variables declared in {...} are also only visible inside
if (true) {
  let phrase = "Hello!";
  console.log(phrase); // Hello!
}
// console.log(phrase); // Error, no such variable!

// Nested functions
/*
    A function is called "nested" when it's created inside another function.

    For example in the nested fucntion 'getFullName()' is made for convenience. It can access the outer
    variables and so can return the full name. Nested functions are quite common in JavaScript.

    A nested function can be returned: either as a property of a new object or as a result by itself.
    It can then be used somewhere else. No matter where, it still has access to the same outer variables.
*/

function sayHiBye(firstName, lastName) {
  // Helper nested function to use below
  function getFullName() {
    return firstName + " " + lastName;
  }

  console.log("Hello, " + getFullName());
  console.log("Bye, " + getFullName());
}

/*
    Despite being simple, slightly modified variants of that code have practical uses, for instance, as
    a 'random number generator' to generate random values for automated tests.
*/

// Lexical Environment
// How does this work?
function makeCounter() {
  let count = 0;
  return function () {
    return count++;
  };
}
let counter = makeCounter();
console.log(counter()); // 0
console.log(counter()); // 1
console.log(counter()); // 2

// Lexical Environment - Step 1. Variables

/*
    In JavaScript every running funciton, code block '{...}', and the script as a whole have an
    internal (hidden) associated object known as the 'Lexical Environment'

    And it consists of two parts:

    1. Environment Record - an object that stores all local variables as its properties (and some
        other information like the value of 'this')
    2. A reference to the outer lexical environment, the one associated with the outer code.

    A "variable" is just a property of the special internal object, 'Environment Record'. "To
    get or change a variable" means "to get or change a property of that object".
*/

// In this simple code without functions, there is only one Lexical Environment:
phrase = "Hello"; // Lexical Environment - {phrase: 'Hello'} -> outer: null

/*
    This is the so-called global Lexical Environment, associated with the whole script.

    On the example above, the first 'object' means the Environment Record (variable store) and the arrow
    means the outer reference. The global Lexical Environment has no outer reference, that's why the 
    arrow points to 'null'.

    As the code starts executing and goes on, the Lexical Environment changues
*/

// Example:
// Execution start // Lexical Environment - {phrase: uninitialized} -> outer: null
phrase; // Lexical Environment - {phrase: undefined} -> outer: null
phrase = "Hello"; // Lexical Environment - {phrase: 'Hello'} -> outer: null
phrase = "Bye"; // Lexical Environment - {phrase: 'Bye'} -> outer: null

/*
    1. When the script starts, the Lexical Environment is pre-populated with all declared variables.
        - Initially, they are in the "Uninitialized" state. That's a special internal state, it means
        that the engine knows about the variable, but it cannot be referenced until it has been declared.
        It's almost the same as if the variable didn't exist.
    
    2. Then 'let phrase' definition appears. There's no assignment yet, so its value is
    'undefined'. We can use the variable from this point forward.

    3. 'phrase' is assigned a value.

    4. 'phrase' changes the value.
*/

/*
    Remember:
    
    - A variable is a property of a special internal object, associated with the currently executing
    block/funciton/script.
    - Working with variables is actually working with the properties of that object.

    Information: 'Lexical Environment' is a specification object: it only exist "theoretically" in
    the language specification to describre how things work. We can't get this object in our code
    and manipulate it directly.

    JavaScript engines also may optimize it, discard variables that are unsued to save memory
    and perform other internal tricks, as long as the visible behavior remains as described.
*/

// Lexical Environment - Step 2. Function Declarations
// A function is also a value, like a variable.
/*
    The difference is that a Function Declaration is instantly fulle initialized.

    When a Lexical Environment is created, a Function Declaration immediately becomes a ready-to-use
    function (unlike 'let' that is unusuable till the declaration).

    That's why we can create a use function, declared as Function Declaration, even before the declaration
    itself.

    Naturally, this behavior only applies to Function Declarations, not Function Expressions where we
    assign a function to a variable, such as 'let say = function(name)'

    Here's the initial state of the global Lexical Environment when we add a function.
*/
phrase = "Hello"; // Lexical Environment - {phrase: uninitialized, say: function} -> outer: null

function say(name) {
  console.log(`${phrase}, ${name}`);
}

// Lexical Environment - Step 3. Inner and outer Lexical Environment
/*
    When a funciton runs, at the beginning of the call, a new Lexical Environment is created
    automatically to store local variables and parameters of the call.

    For instance, for 'say('John)', it looks like this (the execution is at the line, labelled with an
    arrow):
*/

phrase = "Hello";

function say(name) {
  console.log(`${phrase}, ${name}`); // Lexical Environment - {name: 'John'} ->
  //  outer: {say: function, phrase: 'Hello'} -> outer: null
}
say("John");

/*
    During the function call we have 2 Lexical Environments: the inner one (for the function call)
    and the outer one (global):

    - The inner Lexical Environment corresponds to the current execution of 'say'. It has a single
    property 'name', the function argument.

    - The outer Lexical Environment is the global Lexical Environment. It has the 'phrase' variable
    and the function itself and has a reference to the outer one.

    When the code wants to access a variable - the inner Lexical Environment is searched
    first, then the outer one, so on until the global one.

    If a variable is not found anywhere, that's an error in strict mode (without 'use strict', an
    assgnment to a non-existing variable creates a new global variable, for compatibility with old
    code).
*/

// Lexical Environment - Step 4. Inner and outer Lexical Environment
// In this example
function makeCounter() {
  let count = 0;
  return function () {
    return count++;
  };
}
counter = makeCounter();

/*
    At the beginning of each 'makeCounter()' call, a new Lexical Environment object is created, to
    store variables for this 'makeCounter' run.

    What's different is that, during the execution of 'makeCounter()', a tiny nested function is
    created of only one line: 'return count++'.

    All functions remember the Lexical Environment in which they were made. Technically, there's no
    magic here: all functions have the hidden property named '[[Environment]]', that keeps the
    reference to the Lexical Environment where the function was created.

    So, 'counter. [[Environment]] has the reference to '{count: 0}' Lexical Environment
    That's how the function remembers where it was created, no matter where it's called. The
    [[Environment]] reference is set once and forever at function creation time.

    Later when 'counter()' is called, a new Lexical Environment is created for the call, and its
    outer Lexical Environment reference is taken from 'counter.[[Environment]]:

    Now when the code inside 'counter()' looks for 'count' variable, it first searches its own
    Lexical Environment (empty, as there are no local variables there), then the Lexical Environment
    of the outer 'makeCounter() call, where it finds and changes it.
    A variable is updated in the Lexical Environment where it lives.
*/
function makeCounter() {
  let count = 0;

  return function () {
    // Lexical Environment - {<empty>} ->
    // outer: {count: 0} ->
    // outer: {makeCounter: function, counter: function} -> outer: null
    return count++;
  };
}
counter = makeCounter();

// After a call
counter();
/* 
function makeCounter() {
  let count = 0;

  return function () {
    // Lexical Environment - {<empty>} ->
    // Modified Here: outer: {count: 1} -> 
    // outer: {makeCounter: function, counter: function} -> outer: null
    return count++;
  };
}
*/

/*
    Information: Closure

    A closure is a function that remembers its outer variables and can access them. In some
    languages, that's not possible, or a function should be written in a special way to make it
    happen. But as explained above, in JavaScript, all functions are naturally closures (With
    the exception of the "new Function" syntax).

    That is: they automatically remember where they were created sugin a hidden
    [[environment]] property, and then their code can access outer variables.
*/
