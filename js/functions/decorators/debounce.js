/*
    The result of debounce(f, ms) decorator is a wrapper that suspends calls to f until there’s
    ms milliseconds of inactivity (no calls, “cooldown period”), then invokes f once with the latest
    arguments.

    A call to debounce returns a wrapper. When called, it schedules the original function
    call after given ms and cancels the previous such timeout.
*/

function f(x) {
  console.log(x);
}

// create wrappers
let f1000 = debounce(f, 1000);
let f1500 = debounce(f, 1500);

function debounce(func, ms) {
  let timeout;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, arguments), ms);
  };
}

f1000("test"); // shows "test" after 1000ms
f1500("test"); // shows "test" after 1500ms
