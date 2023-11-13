/*
    //////////
    // Wrapping functions: "apply"
    //////////

    We can wrap a proxy around a function as well.

    The 'apply(target, thisArg, args)' trap handles calling a proxy as a function:
    - 'target' is the target object (function is an object in JavaScript),
    - 'thisArg' is the value of this .
    - 'args' is a list of arguments.

    In this example we are going to proxy this previousm implemented function:
    `
    function delay(f, ms) {
        // return a wrapper that passes the call to f after the timeout
        return function() { // (*)
        setTimeout(() => f.apply(this, arguments), ms);
    };

    }
    function sayHi(user) {
        console.log(`Hello, ${user}!`);
    }

    // after this wrapping, calls to sayHi will be delayed for 3 seconds
    sayHi = delay(sayHi, 3000);
    sayHi("John"); // Hello, John! (after 3 seconds)
    `

    This function has a wrapper function (*) that performs the call after the timeout.

    But a wrapper function doesn't forward property read/write operations or anything else. After the
    wrapping, the access is lost to properties of the original functions, such as 'name' or 'length'.

    console.log(sayHi.length); // 1 (function length is the arguments count in its declaration)
    sayHi = delay(sayHi, 3000);
    console.log(sayHi.length); // 0 (in the wrapper declaration, there are zero arguments)

    With a 'Proxy' we can forward everything to the target object.

    The result will be the same, but now not only calls, but all operations on the proxy are forwarded to the
    original function. So we can use 'sayHi()' after the wrapper function.
*/
function delay(f, ms) {
  return new Proxy(f, {
    apply(target, thisArg, args) {
      setTimeout(() => target.apply(thisArg, args), ms);
    },
  });
}

function sayHi(user) {
  console.log(`Hello, ${user}!`);
}

sayHi = delay(sayHi, 3000);
console.log(sayHi.length); // 1 (*) proxy forwards "get length" operation to the target
sayHi("John"); // Hello, John! (after 3 seconds)
