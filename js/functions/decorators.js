/*
    Decorator - Is a wrapper around a function that alters its behavior.

    Decorators can be seen as "features" or "aspects" that can be added to a function.
*/

// Transparent caching
/*
    If the function is called often, we may want to cache (remember) the results to avoid spending
    extra-time on recalculations.
*/
function slow(x) {
  // there can be a heavy CPU-intensive job here
  console.log(`Called with ${x}`);
  return x;
}

function cachingDecorator(func) {
  let cache = new Map();

  return function (x) {
    if (cache.has(x)) {
      // if there's such key in cache
      return cache.get(x); // read the result from it
    }
    let result = func(x); // otherwise call func
    cache.set(x, result); // and cache (remember) the result
    return result;
  };
}

slow = cachingDecorator(slow);
console.log(slow(1)); // slow(1) is cached and the result returned
console.log("Again: " + slow(1)); // slow(1) result returned from cache
console.log(slow(2)); // slow(2) is cached and the result returned
console.log("Again: " + slow(2)); // slow(2) result returned from cache
/*
    Here 'cachingDecorator' is a decorator, a special function that takes another
    function and alters its behavior.

    The idea is that we can call 'cachingDecorator' for any function, and it will return the caching
    wrapper. That's great, because we can have many functions that could use such a feature, and
    all we need to do is to apply 'cachingDecorator' to them.

    By separating caching from the main function code we also keep the main code simpler.

    From the outside code, the wrapped 'slow' function still does the same. It just got a caching
    aspect added to its behavior.

    Benefits:
    - It's reusable.
    - Caching logic is separate, it didn't increase the complexity of 'slow'.
    - We can combine multiple decorators.
*/

// func.call
/*
    The caching decorator mentioned before is not suited to work with object methods.
*/
let worker = {
  someMethod() {
    return 1;
  },

  slow(x) {
    // scary CPU-heavy task here
    console.log("Called with " + x);
    return x * this.someMethod(); // (*)
  },
};

// same code as before
function cachingDecorator(func) {
  let cache = new Map();

  return function (x) {
    if (cache.has(x)) {
      return cache.get(x);
    }
    // let result = func(x); // (**)
    cache.set(x, result);
    return result;
  };
}

console.log(worker.slow(1)); // the original method works
worker.slow = cachingDecorator(worker.slow); // now make it caching
console.log(worker.slow(2)); // Whoops! Error: Cannot read property 'someMethod' of undefined
/*
    It fails because we are passing the original function as func(x) and when called like 
    that, the function gets 'this = undefined'.

    There's a special built-in funciton method 'func.call(context, ...args)' that allows to call a
    function explicitly setthing 'this'.

    The first argument is 'this', and the next are the arguments.

    function say(phrase) {
    console.log(this.name + ': ' + phrase);
    }

    let user = { name: "John" };
    let admin = { name: "Admin" };

    // user becomes this, and "Hello" becomes the first argument
    say.call( user, "Hello" ); // John: Hello
    say.call( admin, "Hello" ); // Admin: Hello
*/
// same code as before
function cachingDecorator(func) {
  let cache = new Map();

  return function (x) {
    if (cache.has(x)) {
      return cache.get(x);
    }
    let result = func.call(this, x); // (**)
    cache.set(x, result);
    return result;
  };
}

worker.slow = cachingDecorator(worker.slow); // now make it caching
console.log(worker.slow(2)); // works
console.log(worker.slow(2)); // works, doesn't call the original (cached)

// Going multi-argument
/*
    Currently 'cachingDecorator' only works with single-argument functions.

    Previously, for a single argument 'x' whe could just 'cache.set(x, result)' to save the result
    and 'cache.get(x)' to retrieve it. But now we need to remember the result for a combination of arguments
    '(min, max)'. The native 'Map' takes single value only as the key.

    let worker = {
        slow(min, max) {
            return min + max; // scary CPU-hogger is assumed
        }
    };

    // should remember same-argument calls
    worker.slow = cachingDecorator(worker.slow);

    Possible solutions:
    
    1. Implement a new (or third-party) map-like data strcuture that is more versatile and allows
    multi-keys.

    2. Use nested maps: 'cache.set(min)' will be a 'Map' that stores the pair '(max, result)'.
    So we can get 'result' as 'cache.get(min).get(max)'.

    3. Join two values into one. In our particular case we can just use a string "min, max" as the
    'Map' key. For flexibility, we can allow to provide a hashing function for the decorator, that
    knows how to make one value from many.

    We will continue with option No 3.
*/
worker = {
  slow(min, max) {
    console.log(`Called with ${min}, ${max}`);
    return min + max;
  },
};

function cachingDecoratorWithHash(func, hash) {
  // console.log(this); // Global object
  let cache = new Map();
  return function () {
    // console.log(this); // Worker object with slow function
    let key = hash(arguments); // Calling hash function to get a single key.
    if (cache.has(key)) {
      return cache.get(key);
    }
    let result = func.call(this, ...arguments); // Passing all arguments to 'this' (worker.slow)
    cache.set(key, result);
    return result;
  };
}

worker.slow = cachingDecoratorWithHash(worker.slow, hash);
console.log(worker.slow(3, 5)); // works
console.log("Again " + worker.slow(3, 5)); // same (cached)

function hash(args) {
  return args[0] + "," + args[1];
}
/*
    Now it works with any number of arguments, (though the has function would also need to be
    adjusted to allow any number of arguments)
*/

// func.apply
/*
    The only syntax difference between 'call' and 'apply' is that 'call' expects a list of
    arguments, while 'apply' takes an array-like object with them.

    func.call(context, ...args);
    func.apply(context, args);

    - A difference between those calls is that the spread syntax allows to pass iterable 'args'
    as the list to 'call'
    - The 'apply' accepts only array-like 'args'

    And for objects that are both iterable and array-like, such as a real array, we can use any of
    them, but 'apply' will probably be faster, because most JavaScript engines internally optimize it
    better.

    Passing all arguments along with the context to another function is called call forwarding.

    let wrapper = function() {
        return func.apply(this, arguments);
    };
*/

// Borrowing a method
/*
    We can improve the hashing function as for now it only works with 2 arguments. It would
    be better if it could glue any number of 'args'.

    function hash() {
        console.log( arguments.join() ); // Error: arguments.join is not a function
    }
    hash(1, 2);
    
    Because arguments is an iterable object and array-like but not a real array we can't use an
    array method to join those arguments.

    But we can use:
*/
function hash() {
  console.log([].join.call(arguments)); // 1,2
}
hash(1, 2);
/*
    This is called method borrowing

    We take (borrow) a join method from a regular array ([].join) and use '[].join.call' to
    run it in the context of 'arguments'

    Technically it takes 'this' and joins 'this[0]' , 'this[1]' ...etc together. It's intentionally
    written in a way that allows any array-like 'this'
*/

// Decorators and function properties
/*
    It is generally safe to replace a function or a method with a decorated one, expect for one litte
    thing. If the original function had properties on it, like 'func.calledCount' or whaterver, then
    the decorated one will not provide them. Because that is a wrapper. So one needs to be careful if one
    uses them.

    Some decorators may provide their own properties. E.g. a decorator may count how many times
    a function was invoked and how much time it took, and expose this information via wrapper
    properties.

    There exists a way to create decorators that keep access to function properties, but this requires
    using a special 'Proxy' object to wrap a function. We'll discuss it later in the article Proxy and
    Reflect.
*/
