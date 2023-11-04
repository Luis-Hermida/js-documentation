//////////
// Async & Await - Error Handling
//////////
/*
  If a promise resolves normally, then 'await promise' returns the result. But in the case of
  a rejection, it throws the error, just as if there were a throw statement at the line.

  This code is similar:

  async function f() {
    await Promise.reject(new Error("Whoops!"));
  }

  async function f() {
    throw new Error("Whoops!");
  }

  In real situations, the promise may take some time before it rejects. In that case there will be a
  delay before await throws an error.
*/

// We can catch that error using try..catch , the same way as a regular throw:
async function f() {
  try {
    let response = await fetch("http://no-such-url");
  } catch (err) {
    console.log(err); // TypeError: failed to fetch
  }
}
f();

// We can also wrap multiple lines
async function f2() {
  try {
    let response = await fetch("/no-user-here");
    let user = await response.json();
  } catch (err) {
    // catches errors both in fetch and response.json
    console.log(err);
  }
}
f2();

/*
  If we forget to add .catch there, then we get an unhandled promise error (viewable in the
  console). We can catch such errors using a global unhandledrejection event handler

  If we don't have a 'try...catch', then the promise generated by the call of the async function
  f() becomes rejected. We can append '.catch' to handle it:
*/
async function f3() {
  let response = await fetch("http://no-such-url");
}
// f() becomes a rejected promise
f3().catch(console.log); // TypeError: failed to fetch // (*)

/*
    Information: 'async/await' and 'promise.then/catch'

    When we use 'async/await' we rarely need '.then', because 'await' handles the waiting
    for us. And we can use a regular 'try...catch' instead of '.catch'. That's usually (but no
    always) more convenient.

    But at the top level of the code, when we're outside any 'async' function, we're syntactically
    unable to use 'await', so it's a normal practice to add '.then/catch' to handle the final
    result or falling-through error, like in the line (*) in the example above.
*/

/*
    Information: 'async/await' works well with 'Promise.all'

    When we need to wait for multiple promises, we can wrap then in 'Promise.all' and then
    'await':

    // wait for the array of results
    let results = await Promise.all([
      fetch(url1),
      fetch(url2),
      ...
    ]);

    In the case of an error, it propagates as usual, from the failed promise to 'Promise.all',
    and then becomes an exception that we can catch using 'try...catch' around the call.
*/
