/*
    The "new Function" syntax
*/

/*
    Syntax

    let func = new Function ([arg1, arg2, ...argN], functionBody);
    The function is created with the arguments 'arg1...argN' and the given 'functionBody'.
*/
let sum = new Function("a", "b", "return a + b");
console.log(sum(1, 2)); // 3

// Without arguments
let sayHi = new Function('console.log("Hello")');
sayHi(); // Hello

/*
    The major difference from other ways we've seen is that the function is created literally from a
    string, that is passed at run time.

    All previous declarations require us, programmers , to write the function code in the script.

    But 'new Function' allows to turn any string into a function. For example, we can receive a new
    function from a server and then execute it:
*/
// ... receive the code from a server dynamically
let str = 'console.log("Goodbye")';
let func = new Function(str);
func();

// It is used in very specific cases, like when we receive code from a server, or to dynamically
// compile a function from a template, in complex web-applications

/*
    Closure

    When a function is created using 'new Function', its '[[Environment]]' is set to
    reference not the current Lexical Environment, but the global one.

    So, such function doesn't have access to outer variables, only to the global ones.
*/
// new Function
function getNewFunc() {
  let value = "test";
  let func = new Function("console.log(value)");
  return func;
}
// getNewFunc()(); // error: value is not defined

// Regular behavior
function getRegularFunc() {
  let value = "test";
  let func = function () {
    console.log(value);
  };
  return func;
}
getRegularFunc()(); // "test", from the Lexical Environment of getFunc

/*
    This special feature of 'new Function' looks strange, but appears very useful in practice.

    Imagine that we must create a function from a string. The code of that function is not know at
    the time of writing the script (that's why we don't use regular functions), but will be known in the
    process of execution. We may receive it from the server or from another source.

    Our new function needs to interact with the main script.

    The problem is that before JavaScript is published to production, it's compressed using a minifier
    - a special program that shrinks code by removing extra comments, spaces and - what's
    important, renames local variables into shorter ones.

    For instance, if a function has 'let userName', minifier replaces it with 'let a' (or another
    letter if this one is occupied), and does it everywhere. That's usualy a safe thing to do, because
    the variable is local, nothing outside the function can access it. And inside the function, minifier
    replaces every mention of it. Minifiers are smart, they analyze the code structure, so they don't
    break anything. They're not just a dumb find-and-replace.

    So if 'new Function' had access to outer variables, it would be unable to find renamed
    'userName'.

    If 'new Function' had access to outer variables, it would have problems with minifiers.

    To pass something to a function, created as 'new Function', we should use its arguments.
*/
