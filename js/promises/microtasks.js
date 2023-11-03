//////////
// Microtasks
//////////
/*
    Promise handles '.then / .catch / .finally' are always asynchronous.

    Even when a Promise is immediately resolved, the code on the lines below
    '.then / .catch / .finally' will still execute before these handlers.
*/
let promise = Promise.resolve();
promise.then(() => console.log("promise done!"));
console.log("code finished"); // this console.log shows first

/*
    Microtasks queue

    Asynchronous tasks need proper management. For that, the ECMA standard specifies an internal
    queue 'PromiseJobs', more often referred to as the "microtask queue" (V8 term).

    As stated in the specification:

    - The queue is first-in-first-out enqueued first are run first.
    - Execution of a task in initiated only when nothing else is running.

    Or, to put it more simply, when a promise is ready, its '.then / .catch / .finally' handlers are
    pun into the queue; they are not executed yet. When the JavaScript engine becomes free from the
    current code, it takes a stask from the queue and executes it.

    Promise handlers always go through this internal queue.

    If there's a chain with multiple '.then / .catch / .finally', then every one of them is executed
    asynchronosly. That is, it first gets queued, then executed when the current code is complete
    and previously queued handlers are finished. 
*/
Promise.resolve()
  .then(() => console.log("promise done!"))
  .then(() => console.log("code finished"));

/*
    Unhandled rejection

    Remember the 'unhandledrejection' event?

    Now we can see exactly hos JavaScript finds out that there was an unhandled rejection.

    An "unhandled rejeciton" occurs when a promise error is not handled at the end of the
    microtask queue.

    Normally, if we expect and error, we add '.catch' to the promise chain to handle it:
*/
let promise2 = Promise.reject(new Error("Promise Failed!"));
promise2.catch((err) => console.log("caught"));
// doesn't run: error handled
window.addEventListener("unhandledrejection", (event) =>
  console.log(event.reason)
);

/*
    But if we forget to add '.catch', then, after the microtask queue is empty, the engine triggers the
    event:
*/
let promise3 = Promise.reject(new Error("Promise Failed!"));
// Promise Failed!
window.addEventListener("unhandledrejection", (event) =>
  console.log(event.reason)
);

/*
    What if we handle the error later?
*/
let promise4 = Promise.reject(new Error("Promise Failed!"));
setTimeout(() => promise4.catch((err) => console.log("caught")), 1000);
// Error: Promise Failed!
window.addEventListener("unhandledrejection", (event) =>
  console.log(event.reason)
);
/*
    Now, if we run it, we'll see 'Promise Failed!' first and the 'caught'.

    If we didn't know about the microtasks queue, we could wonder: "Why did
    'unhandledrejection'" handler run? We did catch and handle the error!".

    But now we understand that 'unhandledrejeciton' is generated when the microtask queue is
    complete: the engine examines promises and, if any of them is in the "rejected" state, then the
    event triggers.

    In the example above, '.catch' added by 'setTimeout' also triggets. But it does so later, after
    'unhandledrejection' has already ocurred, so it doesn't change anything.
*/
