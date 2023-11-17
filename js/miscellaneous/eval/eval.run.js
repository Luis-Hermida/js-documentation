/*
    //////////
    // Eval: run a code string
    //////////

    The built-in 'eval' function allows to execute a string of code.

    Syntax:
    let result = eval(code);
*/
let code = 'console.log("Hello")';
eval(code); // Hello

/*
    A string of code may be long, contain line breaks, functions declarations, variables an so on.

    The result of the eval is the result of the last statement.
*/
let value_1 = eval("1+1");
console.log(value_1); // 2

let value_2 = eval("let i = 0; ++i");
console.log(value_2); // 1

/*
    The eval'ed code is executed in the current lexical environment, so it can see outer variables:
*/
let a = 1;

function f() {
  let a = 2;
  eval("console.log(a)"); // 2
}

f();

/*
    It can change outer variables as well:
*/
let x = 5;
eval("x = 10");
console.log(x); // 10, value modified

/*
    In strict mode, 'eval' has its own lexical environment. So functions and variables, declared inside
    eval, are not visible outside, without 'use sctrict', 'eval' doesn't have its own lexical environment, so
    we would see 'X' and 'f()' outside.
*/
// reminder: 'use strict' is enabled in runnable examples by default
eval("let x = 5; function f() {}");
console.log(typeof x); // undefined (no such variable) if strict mode
// function f is also not visible
