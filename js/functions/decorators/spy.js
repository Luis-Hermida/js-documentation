/*
    Decorator spy(func) that should return a wrapper that saves all calls to function in its
    calls property.

    Every call is saved as an array of arguments.

    That decorator is sometimes useful for unit-testing.
*/
function work(a, b) {
  console.log(a + b); // work is an arbitrary function or method
}

// Wrapping
work = spy(work);

// Decorator
function spy(func) {
  function wrapper(...args) {
    // using ...args instead of arguments to store "real" array in wrapper.calls
    wrapper.calls.push(args);
    return func.apply(null, args);
  }

  wrapper.calls = [];

  return wrapper;
}

work(1, 2); // 3
work(4, 5); // 9

for (let args of work.calls) {
  console.log("call: " + args.join()); // "call:1,2", "call:4,5"
}
