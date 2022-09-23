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

// Nested setTimeout
// There are 2 ways of running something regularly.
// One is setInterval . The other one is a nested setTimeout , like this:

/* instead of:
let timerId = setInterval(() => alert('tick'), 2000);
*/

timerId = setTimeout(function tick() {
  console.log("tick");
  timerId = setTimeout(tick, 2000);
}, 2000);

/*
    The 'setTimeout' above schedules the next call right at the end of the current one.

    The nested 'setTimeout' is a more flexible method than 'setInterval'. This way the next call
    may be scheduled differently, depending on the results of the current one.

    For instance, we need to write a service that sends a request to the server every 5 seconds
    asking for data, but in case the server is overloaded, it should increase the interval.

    let delay = 5000;
    let timerId = setTimeout(function request() {
    ...send request...
    if (request failed due to server overload) {
    // increase the interval to the next run
    delay *= 2;
    }
    timerId = setTimeout(request, delay);
    }, delay);
*/

/*
    Nested 'setTimeout' allows to set the delay between the executions more precisely than
    'setInterval'.

    Let's compare two code fragments.
*/

const textFunction = function func(schedulingType, value) {
  console.log(`${schedulingType} - ${value}`);
};

let i = 1;
setInterval(function () {
  textFunction("interval", i++);
}, 100);

let j = 1;
setTimeout(function run() {
  textFunction("nested timeout", j++);
  setTimeout(run, 100);
}, 100);

/*
    With the setInterval: 

    The real delay between 'func' calls for 'setInterval' is less that in the code because
    'func' execution "consumes" a part of the interval.
    
    It's possible that 'func' execution turns out to be longer than we expected and takes more than
    100 ms.

    If that's the case the engine waits for 'func' to complete, then checks the scheduler and if the
    time is up, runs it again immediately and the calls will happen without a pause at all.
*/
/*
    With nested setTimeout:

    It guarantees the fixed delay because the call is planned at the end of the previous one.
*/
/*
    Information: Garbage collection and setInterval/setTimeout callback.

    When a function is passed in 'setInterval/setTimeout', an internal reference is created
    to it and saved in the scheduler. It prevents the function from being garbage collected, even if
    there are no other references to it.

    // the function stays in memory until the scheduler calls it
    setTimeout(function() {...}, 100);

    For 'setInterval' the function stays in memory until 'clearInterval' is called.

    There's a side effect. A function references the outer lexical environment, so, while it lives,
    outer variables live too. They may take much more memory than the function itself. So when 
    we don't need the scheduled function anymore, it's better to cancel it, even if it's very small.
*/

// Zero delay setTimeout
/*
    There's a special use case: 'setTimeout(func, 0), or just 'setTimeout(func)'.

    This schedules the execution of 'func' as soon as possible. But the scheduler will invoke it only
    after the currently executing script is complete.

    So the function is scheduled to run "right after" the current script.

    setTimeout(() => console.log("World"));
    console.log("Hello") // Will be printed first.

    The first line "puts the call into calendar after 0ms". But the scheduler will only "check the
    calendar" after the current script is complete, so "Hello" is first, and "World" after it.

    Information: Zero delay is in fact not zero (in a browser)

    In the browser, there's a limitation of how often nested timers can run. The HTML5
    standard says "after five nested timers, the interval is forced to be at least 4
    milliseconds."

    Let's demonstrate what it means with the example below. The 'setTimeout' call in it re-
    schedules itsefl with zero delay. Each call remembers the real time from the previous one in
    the 'times' array.
*/
let start = Date.now();
let times = [];
setTimeout(function run() {
  times.push(Date.now() - start); // remember delay from the previous call
  if (start + 100 < Date.now()) alert(times); // show the delays after 100ms
  else setTimeout(run); // else re-schedule
});
// an example of the output:
// 1,1,1,1,9,15,20,24,30,35,40,45,50,55,59,64,70,75,80,85,90,95,100
/*
    First timers run immediately, and then we see 9, 15, 20, 24... . The 4+ ms obligatory
    delay between invocations come into play.

    The similar thing happens if we use 'setInterval' instead of 'setTimeout':
    'setInterval(f)' runs 'f' few times with zero-delay, and afterwards with 4+ ms delay.

    That limitation comes from ancient times and many scripts rely on it, so it exists for
    historical reasons.

    For server-side JavaScript, that limitation doesn't exist, and there exist other ways to
    schedule an immediate asynchronous job, like setImmediate for Node.js. So this behavior is
    browser specific.
*/
