/*
    Try...catch...finally

    The 'try...catch' contruct may have one more code clause 'finally'.
    It runs in all cases:
    - after 'try', if there were no errors.
    - after 'catch', if there were errors.

    try {
        ... try to execute the code ...
    } catch (err) {
        ... handle errors ...
    } finally {
        ... execute always ...
    }

    Here finally guarantees that the time will be measured correctly in both situations – in case
    of a successful execution of fib and in case of an error in it.

    You can check by running the code with entering 35 into prompt – it executes normally,
    finally after try . And then enter -1 – there will be an immediate error, and the execution
    will take 0ms . Both measurements are done correctly.

    In other words, the function may finish with return or throw , that doesn’t matter. The
    finally clause executes in both cases.
*/

let num = 35;
let diff, result;

function fib(n) {
  if (n < 0 || Math.trunc(n) != n) {
    throw new Error("Must not be negative, and also an integer.");
  }
  return n <= 1 ? n : fib(n - 1) + fib(n - 2);
}

let start = Date.now();
try {
  result = fib(num);
} catch (err) {
  result = 0;
} finally {
  diff = Date.now() - start;
}

console.log(result || "error occurred");
console.log(`execution took ${diff}ms`);

/*
    Information: Variables are local inside try...catch...finally

    Please note that result and diff variables in the code above are declared before
    try...catch.

    Otherwise, if we declared let in try block, it would only be visible inside of it
*/

/*
    Information: finally and return

    The finally clause works for any exit from try...catch . That includes an explicit
    return.

    In the example below, there’s a return in try . In this case, finally is executed just
    before the control returns to the outer code.
*/
function func() {
  try {
    return 1;
  } catch (err) {
    /* ... */
  } finally {
    console.log("finally");
  }
}
console.log(func()); // first works console.log from finally, and then this one

/*
    Information: try...finally

    The 'try...finally' construct, without catch clause, is also useful. We apply it when we
    don’t want to handle errors here (let them fall through), but want to be sure that processes
    that we started are finalized

    function func() {
    // start doing something that needs completion (like measurements)
        try {
            // ...
        } finally {
            // complete that thing even if all dies
        }
    }
*/
