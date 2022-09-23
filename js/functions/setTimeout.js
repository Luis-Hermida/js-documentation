// setTimeout - Allow us to run a function once after the interval of time.
/* 
    Syntax: 
    let timerId = setTimeout(func|code, [delay], [arg1], [arg2], ...)

    - func|code. Function or a string of code to execute. Usually that's a function. For historial
    reasons, a tring of code can be passed, but that's not recommended.

    - delay. The delay before run in miliseconds, default is 0.

    - arg1, arg2 ... Arguments for the function,
*/
function sayHi(phrase, who) {
  console.log(phrase + ", " + who);
}
setTimeout(sayHi, 1000, "Hello", "John"); // Hello, John=
/*
    Information: Pass a function, but don't run it.

    // wrong!
    setTimeout(sayHi(), 1000);

    'setTimeout' expects a reference to a function. And here 'sayHi()' runs the function,
    and the result of its execution is passed to 'setTimeout'. In our case the result of 'sayHi()'
    is undefined (because the function returns nothing), so nothing is scheduled.
*/

/*
    Canceling with clearTimeout

    A call to 'setTimeout' returns a "timer identifier" 'timerId' that we can use to cancel the
    execution.

    Syntax:
    let timerId = setTimeout(...);
    clearTimeout(timerId);

    As we can see from alert output, in a browser the timer identifier is a number. In other
    environments, this can be something else. For instance, Node.js returns a timer object with
    additional methods.

    Again, there is no universal specification for these methods, so that’s fine.
*/
let timerId = setTimeout(() => console.log("never happens"), 1000);
console.log(timerId); // timer identifier
clearTimeout(timerId);
console.log(timerId); // same identifier (doesn't become null after canceling)
