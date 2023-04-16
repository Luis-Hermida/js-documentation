//////////
// Promise API
//////////
// There are 6 static methods in the 'Promise' class.

/////////////////////////////////
/*
    Promise.all

    Let's say we want many promises to execute in parallel and wait until all of them are ready.

    For instance, download several URLs in parallel and process the content once they are all done.

    Syntax:
    let promise = Promise.all(iterable);

    'Promise.all' takes an iterable (usually, an array of promises) and returns a new promise.

    The new promise resolves when all listed promises are resolved, and the array of their results
    becomes its result.

    For instance, the Promise.all below settles after 3 seconds, and then its result is an array
    [1, 2, 3]:
*/

Promise.all([
  new Promise((resolve) => setTimeout(() => resolve(1), 3000)), // 1
  new Promise((resolve) => setTimeout(() => resolve(2), 2000)), // 2
  new Promise((resolve) => setTimeout(() => resolve(3), 1000)), // 3
]).then(console.log); // 1,2,3 when promises are ready: each promise contributes an array member

/*
    The order of the resulting array members is the same as in its source promises.
    Even though the frist promise takes the longest time to resolve, it's still first in the array
    of results.

    A common trick is to map an array of job data into an array of promises, and then wrap that into
    'Promise.all'.

    For instance, if we have an array of URL's we can fetch them all like this:

    let urls = [
      "https://api.github.com/users/iliakan",
      "https://api.github.com/users/remy",
      "https://api.github.com/users/jeresig",
    ];

    // map every url to the promise of the fetch
    let requests = urls.map((url) => fetch(url));

    // Promise.all waits until all jobs are resolved
    Promise.all(requests).then((responses) =>
      responses.forEach((response) =>
        console.log(`${response.url}: ${response.status}`)
      )
    );


    If any of the promises is rejected, the promise returned by 'Promise.all' immediately
    rejects with that error.

    Here the second promise in 2 seconds. That leands to an immediate rejection of 'Promise.all',
    so '.catch' executes: the rejection error becomes the outcome of the entire 'Promise.all'.
*/
Promise.all([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
  new Promise((resolve, reject) =>
    setTimeout(() => reject(new Error("Whoops!")), 2000)
  ),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000)),
]).catch(console.log); // Error: Whoops!

/*
    Warning: In case of an error, other promises are ignored.

    If one promise rejects, 'Promise.all' immediately rejects, completely forgetting about the
    other ones in the list. Their results are ignored.

    For example, if there are multiple 'fetch' calls, like in the example above, and one fails, the
    others will still continue to execute, but 'Promise.all' won't watch them anymore. They will
    probably settle, but their results will be ignored.

    'Promise.all' does nothing to cancel them, as there's no concept of "cancellation" in
    promises. 'AbortController' can helppp with that but it's not part of the Promise API.
*/

/*
    Information: 'Promise.all(iterable)' allows non-promise "regular" values in 'iterable

    Normally, 'Promise.all(...)' accepts an iterable (in most cases an array) of promises.
    But if any of those objects is not a promise, it's passed to the resulting array "as is".

    For instance, here the results are '[1, 2, 3]'.

    Promise.all([
        new Promise((resolve, reject) => {
            setTimeout(() => resolve(1), 1000)
        }),
        2,
        3
    ]).then(console.log); // 1, 2, 3

    So we are able to pass ready values to 'Promise.all' where convenient.
*/

/////////////////////////////////
/*
    Promise.allSettled

    Warning: This is a recent addition to the language. Old browsers may need polyfills.

    'Promise.allSettled' just waits for all promises to settle, regardless of the result. The
    resulting array has:

    '{status:"fulfilled", value:result}' for successful responses,
    '{status:"rejected", reason:error}' for errors.

    So for each promise we get its status and 'value/error'.
*/

let urls = [
  "https://api.github.com/users/iliakan",
  "https://api.github.com/users/remy",
  "https://no-such-url",
];
Promise.allSettled(urls.map((url) => fetch(url))).then((results) => {
  // (*)
  results.forEach((result, num) => {
    if (result.status == "fulfilled") {
      console.log(`${urls[num]}: ${result.value.status}`);
    }
    if (result.status == "rejected") {
      console.log(`${urls[num]}: ${result.reason}`);
    }
  });
});

/*
    Results: 
    [
        {status: 'fulfilled', value: ...response...},
        {status: 'fulfilled', value: ...response...},
        {status: 'rejected', reason: ...error object...}
    ]
*/

/*
    Promise.allSettled Polyfill

    In this coide, 'promises.map' takes input values, turns them into promises (just in case a non-
    promise was passed) with 'p => Promise.resolve(p)', and then adds '.then' handler to every one.

    That handler turns a sucessful result 'value' into '{status:'fulfilled', value}', and an
    error 'reason' into '{status:'rejected', reason}'. That's exactly the format of 
    'Promose.allSettled'.

    Now we can use 'Promise.allSettled' to get the results of all given promises, even if some of
    them are rejected.
*/
if (!Promise.allSettled) {
  const rejectHandler = (reason) => ({ status: "rejected", reason });
  const resolveHandler = (value) => ({ status: "fulfilled", value });

  Promise.allSettled = function (promises) {
    const convertedPromises = promises.map((p) =>
      Promise.resolve(p).then(resolveHandler, rejectHandler)
    );

    return Promise.all(convertedPromises);
  };
}

/////////////////////////////////
/*
    Promise.race

    Similar to 'Promise.all', but waits only for the first settled promise
    and gets its results (or error).

    Syntax:
    let promise = Promise.race(iterable);

    The first promise here was the fastest, so it became the reuslt. After the first settled
    promise "wins the race", al further results/errors are ignored.

*/

Promise.race([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
  new Promise((resolve, reject) =>
    setTimeout(() => reject(new Error("Whoops!")), 2000)
  ),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000)),
]).then(console.log); // 1
