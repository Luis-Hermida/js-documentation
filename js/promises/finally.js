//////////
// Cleanup: finally
//////////
/*
    Just like there's a 'finally' clause in a regular 'try {...} catch {...}', there's
    'finally' in promises.

    The call '.finally(f)' is similar to '.then(f, f)' in the sense that 'f' runs always, when the
    promise is settled: be it resolve or reject.

    The idea of 'finally' is to set up a handler for performing cleanup/finalizing after the preivous
    operations are complete.

    E.g. stopping loading indicators, closing no longer needed connections, etc.

    The code may look like this:

    new Promise((resolve, reject) => {
        do something that takes time, and then call resolve or maybe reject
    })
        // runs when the promise is settled, doesn't matter successfully or not
        .finally(() => stop loading indicator)
        // so the loading indicator is always stopped before we go on
        .then(result => show result, err => show error)

    Please note that 'finally(f)' isn't exactly an alias of 'then(f, f)' through.

    There are important differences:

    /////////////////////////////////
    1. A 'finally' handler has no arguments. In 'finally' we don't know whether the promise is
    sueccessful or not. That's all right, as our task is usually to perform "general" finalizing
    procedures.

    Please take a look at the example above: as you can see, the 'finally' handler has no
    arguments, and the promise outcome is handled by the next handler.

    /////////////////////////////////
    2. A 'finally' handler "passes through" the result or error to the next suitable handler.

    new Promise((resolve, reject) => {
        setTimeout(() => resolve("value"), 2000);
    })
    .finally(() => console.log("Promise ready")) // triggers first
    .then(result => console.log(result)); // <-- .then shows "value"

    As you can see, the 'value' returned by the first promise is passed though 'finally' to the
    next 'then'.

    That's very convenient, because 'finally' is not meant to process a promise result. As said,
    it's a place to do generic cleanup, no matter what the outcome was.

    And here's an example of an error, for us to see how it's passed through 'finally' to 'catch':

    new Promise((resolve, reject) => {
        throw new Error("error");
    })
    .finally(() => alert("Promise ready")) // triggers first
    .catch(err => alert(err)); // <-- .catch shows the error

    /////////////////////////////////
    3. A 'finally' handler also shouldn't return anything. If it does, the returned value is silently
    ignored.

    The only exception to this rule is when a 'finally' handler throws and error. Then this error
    goes to the next handlerm instead of any previous outcome.
*/
/*
    To summarize:

    - A 'finally' handler doesn't get the outcome of the previous handler (it has no arguments).
    This outcome is passed through instead, to the next suitable handler.

    - If a 'finally' handler returns something, it's ignored.

    - When 'finally' throws and error, then the execution goes to the nearest error handler.
*/
/*
    Information: We can attach handlers to settled promises

    If a promise is pending, '.then/.catch/.finally' handlers wait for its outcome.
    Sometimes, it might be that a promise is already settled when we add a handler to it.

    In such case, these handlers just run immediately:

    // the promise becomes resolved immediately upon creation
    let promise = new Promise(resolve => resolve("done!"));

    promise.then(console.log) // 'done!'

    Note that this makes promises powerful. Promises are flexible. We can add handlers any time;
    if the result is already there, they just execute.
*/
