/*
    //////////
    // Advanced Curry Implementation
    //////////

    In case you’d like to get in to the details, here’s the “advanced” curry implementation for multi-
    argument functions that we could use.
*/
function curry(func) {
  return function curried(...args) {
    if (args.length >= func.length) {
      return func.apply(this, args);
    } else {
      return function (...args2) {
        return curried.apply(this, args.concat(args2));
      };
    }
  };
}

function sum(a, b, c) {
  return a + b + c;
}
let curriedSum = curry(sum);

console.log(curriedSum(1, 2, 3)); // 6, still callable normally
console.log(curriedSum(1)(2, 3)); // 6, currying of 1st arg
console.log(curriedSum(1)(2)(3)); // 6, full currying

/*
    The new 'curry' may look complicated, but it's easy to understand.

    1. 'If' is passed 'args' count is the same or more than the original function then we pass the call
    using 'func.apply'.

    2. Otherwise, get a partial: we don't call 'func' just yet. Instead, another wrapper is returned that
    will re-apply 'curried' providing previous arguments togethers with the new one.
*/

/*
    Information: Fixed-length functions only

    The currying requires the function to have a fixed number of arguments.

    A function that uses rest parameters, such as 'f(...args)', can't be curried.

*/

/*
    Information: A little more than currying

    By definition, currying should convert 'sum(a,b,c)' into 'sum(a)(b)(c)'.

    But most implementations of currying in JavaScript are advanced, as described: they also
    keep the function callable in the multi-argument variant.
*/
