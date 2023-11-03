//////////
// Async & Await
//////////
/*
    There's a special syntax to work with promises in a more confortable fashion, called
    "async/await", it's surprisingly esasy to understand and use.
*/

// Async
/*
    The 'async' keyword can ber placed before a function like this:

    async function f() {
        return 1;
    }

    The word "async" before a functions means one simple thing; a function always returns a promise.
    Other values are wrapped in a resolved promise automatically.

    For instance, this function returns a resolved promise with the result of '1'

    'Async' ensures that the functions returns a promise, and weraps non-promises in it.
*/

async function f() {
  return 1;
}

f().then((value) => {
  console.log(value); // 1
});

// Returning explicitly a promise, will result on the same result

async function f2() {
  return Promise.resolve(1);
}
f2().then(console.log); // 1

// Await
/*
    Syntax:
    // works only inside async functions
    let value = await promise;

    The keyword 'await' makes JavaScript wait until that promise settles and returns it result.

    The function execution "pauses" at the line (*) and resumes when the promise settles, with
    'result' becoming its result. So the code above shows "done!" in one second.

    Let's emphasize "await" literally suspends the function execution until the promise settles, and
    then resumes it with the promise result. That doesn't cost any CPU resources, because the
    JavaScript engine can do other jobs in the meantime.

    It's just a more elegant syntax of getting the promise result than 'promise.then'. And it's
    easier to read and write.
*/

async function f3() {
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("done!"), 1000);
  });

  let result = await promise; // wait until the promise resolves (*)
  console.log(result); // "done!"
}
f3();

/*
    Warning: Can't use 'await' on regular functions

    If we try to use 'await' in a non-async function, there would be a syntax error:

    We may get this error if we forget to put async before a function. As stated earlier, await
    only works inside an async function

    function f() {
        let promise = Promise.resolve(1);
        let result = await promise; // Syntax error
    }
*/

/*
    Information: Modern browsers allow top-level 'await' in modules

    In modern browsers, 'await' on top level works just fine, when we're inside a module.

    For instance:
    // we assume this code runs at top level, inside a module
    let response = await fetch('/article/promise-chaining/user.json');
    let user = await response.json();
    console.log(user);

    If we're not using modules, or older browsers must be supported, there's a universal
    recipe: werapping inot an anonymous async function.

    Like this:
    (async () => {
        let response = await fetch('/article/promise-chaining/user.json');
        let user = await response.json();
        ...
    })();
*/

/*
    Information: 'await' accepts "thenables"

    Like 'promise.then', 'await' allow us to use thenable objects (those with a callable 'then'
    method). The idea is that a third-party object may not be a promise, but promise-compatible:
    if it supports '.then', that's enough to use it with 'await'.

    If 'await' gets a non-promise object with '.then', it calls that method providing the built-in
    functions 'resolve' and 'reject' arguments (just as it does for a regular 'Promise' executor).
    Then 'await' waits until one of them is called (in the example below it happens in the line (*))
    and then proceeds with the result.
*/
class Thenable {
  constructor(num) {
    this.num = num;
  }
  then(resolve, reject) {
    alert(resolve);
    // resolve with this.num*2 after 1000ms
    setTimeout(() => resolve(this.num * 2), 1000); // (*)
  }
}

async function f4() {
  // waits for 1 second, then result becomes 2
  let result = await new Thenable(1);
  alert(result);
}
f4();

/*
    Information: Async class methods

    To declare an async class method, just prepend it with 'async':

    The meaning is the same: it ensures that the return value is a promise and enables 'await'.
*/

class Waiter {
  async wait() {
    return await Promise.resolve(1);
  }
}
new Waiter().wait().then(console.log); // 1 (this is the same as (result => console.log(result)))
