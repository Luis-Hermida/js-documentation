//////////
// Consumers: then, catch
//////////
/*
    A promise object serves as a link between the executor and the consuming functions, which
    will receive the result or error. Consuming functions can be registered using the methods
    '.then' and '.catch'.
*/
/*
    then

    The most importan and funcamental one is '.then'.

    The syntax is:

    promise.then(
        function(result) { handle a successful result },
        function(error) { handle an error }
    );

    The first argument of '.then' is a function that runs when the promise is resolved and receives
    the result.

    The second argument of '.then' is a function that runs when the promise is rejected and receives
    the error.

    If we're interesed only in successful completions, then we can provide only one function
    argument to '.then'.
*/
// Successfully resolved promise.
let promise = new Promise(function (resolve, reject) {
  setTimeout(() => resolve("done!"), 1000);
});
// resolve runs the first function in .then
promise.then(
  (result) => console.log(result), // shows "done!" after 1 second
  (error) => console.log(error) // doesn't run
);

// Rejected promise.
let promise2 = new Promise(function (resolve, reject) {
  setTimeout(() => reject(new Error("Whoops!")), 1000);
});

// reject runs the second function in .then
promise2.then(
  (result) => console.log(result), // doesn't run
  (error) => console.log(error) // shows "Error: Whoops!" after 1 second
);

/*
    catch

    If we're interesed only in errors, then we can use 'null' as the first argument:
    '.then(null, errorHandlingFunction)'. Or we can use '.catch(errorHandlingFunction), which
    is exactly the same:

    let promise = new Promise((resolve, reject) => {
        setTimeout(() => reject(new Error("Whoops!")), 1000);
    });

    // .catch(f) is the same as promise.then(null, f)
    promise.catch(console.log); // shows "Error: Whoops!" after 1 second

    The call '.catch(f)' is a complete  analog of '.then(null, f), it's just a shorthand.
*/
