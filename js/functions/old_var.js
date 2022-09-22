// The old 'var
// This section is for understanding old scripts.
// That's not how we write new code.

/*
    The 'var' declaration is similar to 'let'. Most of the time we can replace 'let' by 'var' or
    vice-verse and expect things to work.

    But internally 'var' is a very different beast, that originates from very old times. It's generally not
    used in modern scripts, but still lurks on the old ones.

    If you don't plan on meeting such scripts you may even ekip this chapter or postpone it.

    On the other hand, it's important to understand differences when migrating old scripts from 'var'
    to 'let', to avoid odd errors
*/

/*
    'var' has no block scope

    Variables, declared with 'var', are either function-scoped or global-scoped. They are visible
    through blocks.

    As 'var' ignores code blocks, we've got a global variable 'test'.
*/
if (true) {
  var test = true; // use "var" instead of "let"
}
console.log(test); // true, the variable lives after if

// If we used 'let test' instead of 'var test', then the variable would only visle inside if.
if (true) {
  let test = true; // use "let"
}
// console.log(test); // ReferenceError: test is not defined

// The same thing for loops: 'var' cannot be block or loop-local:
for (var i = 0; i < 10; i++) {
  var one = 1;
  // ...
}
console.log(i); // 10, "i" is visible after loop, it's a global variable
console.log(one); // 1, "one" is visible after loop, it's a global variable

// If a code block is inside a function, then 'var' becomes a funciton-level variable:
function sayHi() {
  if (true) {
    var phrase = "Hello";
  }
  console.log(phrase); // works
}
sayHi();
// console.log(phrase); // ReferenceError: phrase is not defined

// As we can see, 'var' pierces through 'if', 'for' or other code blocks. That's becuase a long time
// ago in JavaScript, blocks had no Lexical Environments, and 'var' is a remnant of that.

/*
    "var" tolerates redeclarations

    If we declare the same variable with 'let' twice in the same scope, that's an arror:

    let user;
    let user; // SyntaxError: 'user' has already been declared

    With 'var', we can redeclare a variable any number of times. If we use 'var' with an already-
    declared variable, it's just ignored
*/
var user = "Pete";
var user = "John"; // this "var" does nothing (already declared)
// ...it doesn't trigger an error
console.log(user); // John

/*
    "var" variables can be declared below their use

    'var' declarations are processed when the function starts (or script starts for globals).

    In other words, 'var' variables are defined from the beginning of the function, no matter where
    the definition is (assuming that the definition is not in the nested function).
*/
// Valid
function sayHi() {
  phrase = "Hello";
  console.log(phrase);
  var phrase;
}
sayHi();

// Also valid (code blocks are ignored for 'var')
function sayHi() {
  phrase = "Hello"; // (*)
  if (false) {
    var phrase;
  }
  console.log(phrase);
}
sayHi();
/*
    People also call usch behavior "hoisting" (raising), because all 'var' are "hoisted" to the top
    of the function.

    So in the example above, 'if (false)' branch never executes, but that doesn't matter. The
    'var' inside it is processed in the beginning of the function, so at the moment the variable
    exists.
*/

/*
    Declarations are hoisted, but assignemtns are not.

    Because all 'var' declarations are processed at the funciton start, we can reference them at any
    place. But variables are undefined until the assigments.
*/
function sayHi() {
  console.log(phrase); // undefined
  var phrase; // declaration works at the start...
  phrase = "Hello"; // ...assignment - when the execution reaches it.
}
sayHi();

/*
    IIFE - (Immediately-invoked function expressions).

    In the past, as there was only 'var' and it has no block-level visibility, programmers invented a
    way to emulate it. What they did was called IIFE.

    That's not something we should use nowadays, but you can find them in old scripts.
*/
(function () {
  var message = "Hello";
  alert(message); // Hello
})();
/*
    Here, a Function Expression is created and immediately called. So the code executes right away
    and has its own private variables.

    The Funciton Expression is wrapped with parenthesis (funciton {...}), because when
    JavaScript engine encounters "function" in the main code, it understands it as the start of a 
    function declaration. But a Function Declaration must have a name, so this kind of code will give
    an error:

    // Tries to declare and immediately call a function
    function() { // <-- SyntaxError: Function statements require a function name
    var message = "Hello";
    alert(message); // Hello
    }();

    // Even with a name JavaScript does not allow Function Declarations to be called immediately:
    // syntax error because of parentheses below
    function go() {
    (); // <-- can't call Function Declaration immediately

    So, the parentheses around the function is a trick to show JavaScript that the funciton is created
    in the context of another expression, and hence it's a Function Expression: it needs no name and
    can be called immediately.
*/
// Ways to create IIFE
(function () {
  alert("Parentheses around the function");
})();

(function () {
  alert("Parentheses around the whole thing");
})();

!(function () {
  alert("Bitwise NOT operator starts the expression");
})();

+(function () {
  alert("Unary plus starts the expression");
})();
