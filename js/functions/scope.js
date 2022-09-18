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
