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
