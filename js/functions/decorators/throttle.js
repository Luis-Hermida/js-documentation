/*
    'debounce' runs the function once after the “cooldown” period. Good for processing the final
    result.

    'throttle' runs it not more often than given ms time. Good for regular updates that shouldn’t
    be very often.
*/

function f(a) {
  console.log(a);
}

// f1000 passes calls to f at maximum once per 1000 ms
let f1000 = throttle(f, 1000);

function throttle(func, ms) {
  let isThrottled = false,
    savedArgs,
    savedThis;

  function wrapper() {
    if (isThrottled) {
      // (2)
      savedArgs = arguments;
      savedThis = this;
      return;
    }

    isThrottled = true;
    func.apply(this, arguments); // (1)
    setTimeout(function () {
      isThrottled = false; // (3)
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, ms);
  }
  return wrapper;
}
/*
    1. During the first call, the wrapper just runs func and sets the cooldown state ( isThrottled = true )
    
    2. In this state all calls are memorized in savedArgs/savedThis . Please note that
    both the context and the arguments are equally important and should be memorized.
    We need them simultaneously to reproduce the call.
    
    3. After ms milliseconds pass, setTimeout triggers. The cooldown state is removed
    ( isThrottled = false ) and, if we had ignored calls, wrapper is executed with
    the last memorized arguments and context.
    
    The 3rd step runs not func , but wrapper , because we not only need to execute
    func , but once again enter the cooldown state and setup the timeout to reset it.
*/

f1000(1); // shows 1
f1000(2); // (throttling, 1000ms not out yet)
f1000(3); // (throttling, 1000ms not out yet)
// when 1000 ms time out...
// ...outputs 3, intermediate value 2 was ignored
