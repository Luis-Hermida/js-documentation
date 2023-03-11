//////////
// Promises chaining
//////////
/*
    We have a sequence of asynchronous tasks to be performed one after another, with promises we
    have a few alternatives to do that.

    Result being pass through the chain of '.then' handlers:
*/
new Promise(function (resolve, reject) {
  setTimeout(() => resolve(1), 1000); // (*)
})
  .then(function (result) {
    // (**)
    console.log(result); // 1
    return result * 2;
  })
  .then(function (result) {
    // (***)
    console.log(result); // 2
    return result * 2;
  })
  .then(function (result) {
    console.log(result); // 4
    return result * 2;
  });

/*
    The flow is:

    1. The initial promise resolves in 1 second.

    2. Then the '.then' handler is called '(**)', which in turn creates a new promise (resolved with
    '2' value).

    3. The next 'then (***)' gets the result of the previous one, processes it (doubles) and passes
    it to the next handler.

    The whole thing works, because every call to a '.then' returns a new promise. so that we can
    call the next '.then' on it.

    When a handler returns a value, it becomes the result of that promise, so the next '.then' is
    called with it.
*/

/*
    A classic error: we can add many '.then' to a single promise. This is not chaining.

    new Promise(function (resolve, reject) {
        setTimeout(() => resolve(1), 1000); // (*)
    })

    promise.then(function(result) {
        console.log(result); // 1
        return result * 2;
    });

    promise.then(function(result) {
        console.log(result); // 1
        return result * 2;
    });
    
    promise.then(function(result) {
        console.log(result); // 1
        return result * 2;
    });

    What we did here is just several handlers to one promise. They don't pass the result to each
    other; instead they process it independently.

    All '.then' on the same promise get the same result - the result of that promise. So in the code
    above all 'console.log' show the same '1'.
*/

/* 
    Returning Promises

    A handler, used in '.then(handler)' may create and return a promise.

    Here the first '.then' shows '1' and returns 'new Promise' in the line (*). After one
    second it resolves, and the result (the argument of 'resolve', here it's 'result * 2') is paased
    on to the handler of the second '.then'. That handler is in the line (**), it shows '2' and does
    the same thing.

    So the output is the same as in the previous example 1 > 2 > 4, but now with 1 second delay
    between 'console.log' calls.

    Returning promises allows us to build chains of asynchronous actions.
*/

new Promise(function (resolve, reject) {
  setTimeout(() => resolve(1), 1000);
})
  .then(function (result) {
    console.log(result); // 1
    return new Promise((resolve, reject) => {
      // (*)
      setTimeout(() => resolve(result * 2), 1000);
    });
  })
  .then(function (result) {
    // (**)

    console.log(result); // 2
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(result * 2), 1000);
    });
  })
  .then(function (result) {
    console.log(result); // 4
  });

/*
    Here each 'loadScript' call return a promise, and then the next '.then' runs when it resolves.
    Then it initiates the loading of the next script. So scripts are loaded one after another.

    We can add more asynchronous actions to the chain. Please note that the code is still "flat" -- it
    grows down, not to te right. There are no signs of the "pyramid of doom"
    Example:
*/
loadScript("/article/promise-chaining/one.js")
  .then(function (script) {
    return loadScript("/article/promise-chaining/two.js");
  })
  .then(function (script) {
    return loadScript("/article/promise-chaining/three.js");
  })
  .then(function (script) {
    // use functions declared in scripts
    // to show that they indeed loaded
    one();
    two();
    three();
  });

/*
    Information: Thenables

    To be precise, a handler may return not exactly a promise, but a so-called "thenable" object -
    an arbitrary object that has a method '.then'. It will be treated the same way as a promise.

    The idea is that 3rd-party libraries may implement "promise-compatible" objects of their own.
    They can have an extended set of methods, but also be compatible with native promises,
    because they implement '.then'.

    class Thenable {
        constructor(num) {
            this.num = num;
    }
    then(resolve, reject) {
        console.log(resolve); // function() { native code }
        // resolve with this.num*2 after the 1 second
        setTimeout(() => resolve(this.num * 2), 1000); // (**)
        }
    }

    new Promise(resolve => resolve(1))
    .then(result => {
        return new Thenable(result); // (*)
    })
    .then(console.log); // shows 2 after 1000ms

    JavaScript checks the object returned by the '.then' handler in the line (*): if it has a callable 
    method named 'then', then it calls that method providing native functions 'resolve',
    'reject' as rguments (similar to an executor) and waits until one of them is called. In the
    example above 'resolve(2)' is called after 1 second (**). Then the result is passed
    further down the chain.

    This feature allows us to integrate custom objects with promise chains withtout having to
    inherit from 'Promise'.
*/
