//////////
// Promise
//////////
/*
    A “producing code” that does something and takes time. For instance, some code that loads
    the data over a network.

    A “consuming code” that wants the result of the “producing code” once it’s ready. Many
    functions may need that result.

    A promise is a special JavaScript object that links the “producing code” and the “consuming
    code” together. In terms of our analogy: this is the “subscription list”. The “producing code”
    takes whatever time it needs to produce the promised result, and the “promise” makes that
    result available to all of the subscribed code when it’s ready.

    The constructor syntax for a promise object:

    let promise = new Promise(function(resolve, reject) {
        // executor (the producing code, "singer")
    });

    The function passed to 'new Promise' is called the executor. When 'new Promise' is created,
    the executor runs atutomatically. It contains the producing code which should eventually produce
    the result.

    It's arguments 'resolve' and 'reject' are callbacks provided by JavaScript itself. Our code is
    only inside the executor.

    When the executor obtains the result, be it soon or late, doesn't matter, it should call one of these
    callbacks:

    - 'resolve(value)' - If the job is finished successfully, with result 'value'.
    - 'reject(error)' - If an error has ocurred, 'error' is the error object.

    So to summarize: the executor runs automatically and attempts to perform a job. When it is
    finished with the attempt, it calls 'resolve' if it was successful or 'reject' If there was an error.

    The 'promise' object returned by the 'new Promise' contructor has there internal properties:

    - 'state' - initially 'pending', then changes to ehither 'fullfilled' when 'resolve' is
    called or 'rejected' when 'reject' is called.

    - 'result' - initially 'undefined', then changes to 'value' when 'resolve(value)' is
    called or 'error' when 'reject(error)' is called.

    So the executor eventually moves 'promise' to one of these states:

    state: "pending" ----- resolve(value) ---->  state: "fulfilled"
    result undefined                             result: value
                    \
                     \----- resolve(value) ----> state: "rejected"
                                                 result: error

    Here's an example of a promise constructor and a simple executor function with "producing code"
    that takes time (via 'setTimeout'):
*/

let promise = new Promise(function (resolve, reject) {
  // the function is executed automatically when the promise is constructed
  // after 1 second signal that the job is done with the result "done"
  setTimeout(() => resolve("done"), 1000);
});

/*
    We can see 2 things by running the code above:

    1. The executor is called automatically and immediately (by 'new Promise').

    2. The executor receives 2 arguments: 'resolve' and 'reject'. These functions are
    pre-defined byt the JavaScript engine, so we don't need to create them. We should only call one
    of them when ready.

    After one second of "processing", the executor calls 'resolve("done")' to produce the result.
    This changes the state of the 'promise' object:

    {
        state: "fulfilled",
        result: "done",
    }
*/

let promise2 = new Promise(function (resolve, reject) {
  // after 1 second signal that the job is finished with an error
  setTimeout(() => reject(new Error("Whoops!")), 1000);
});
/*
    After one second  of "processing" the executor calls 'reject(new Error("Whoops!")); to produce
    the result.
    This changes the state of the 'promise' object:

    {
        state: "rejected",
        result: error,
    }

    To summarize, the executor should perform a job (usually something that takes time) and then
    call 'resolve' or 'reject' to change the state of the corresponding promise object.

    A promise that is either resolved or rejected is  called "settled", as opposed to an initially
    "pending" promise.
*/

/////////////////////////////////
/*
    Information: There can be only a single result or an error.

    The executor should call only one 'resolve' or one 'reject'. Any state change is final.
    All further calls of 'resolve' and 'reject' are ignored:

    let promise = new Promise(function(resolve, reject) {
        resolve("done");
        reject(new Error("...")); // ignored
        setTimeout(() => resolve("...")); // ignored
    });

    The idea is taht a job done by the executor may have only one result or an error.

    Also, 'resolve/reject' expect only one argument (or none) and will ignore additional
    arguments.
*/

/////////////////////////////////
/*
    Information: Reject with 'Error' objects.

    In case something goes wrong, the executor should call 'reject'. That can be done with any
    type of argument (just like 'resolve'). But it is recommended to use 'Error' objects (or
    objects that inherit form 'Error').
*/

/////////////////////////////////
/*
    Information: Immediately calling 'resolve/reject'.

    In practice, an executor usually does something asynchronously and calls
    'resolve/reject' after some time, but it doesn't have to. We also can call 'resolve' or
    'reject' immediately, like this:

    let promise = new Promise(function(resolve, reject) {
        // not taking our time to do the job
        resolve(123); // immediately give the result: 123
    });

    For instance, this might happen when we start to do a job but then see that everything has
    already been completed and cached.
*/

/////////////////////////////////
/*
    Information:  The 'state' and 'result' are internal.

    The properties 'state' and 'result' of the Promise object are internal. We can't directly
    access them. We can use the methods '.then/.catch/.finally' for that.
*/
