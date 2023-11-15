/*
    //////////
    // Currying
    //////////

    Currying is and advanced technique of working with functions. It's used not only in JavaScript,
    but in other languages as well.

    Currying is a transformation of functions that translates a function from callable as 'f(a, b, c)'
    into callable as 'f(a)(b)(c)'.

    Currying doesn't call a function. It transforms it.

    We'll create a helper function 'curry(f)' that performs currying for a 2 argument 'f'. In other words
    'curry(f)' for 2 argument 'f(a,b)' translates it into a function that runs as 'f(a)(b)':
*/

function curry(f) {
  // curry(f) does the currying transform
  return function (a) {
    return function (b) {
      return f(a, b);
    };
  };
}

// usage
function sum(a, b) {
  return a + b;
}

let curriedSum = curry(sum);
console.log(curriedSum(1)(2)); // 3

/*
    As you can see, the implementation is straightforward: it's just 2 wrappers.

    The result of 'curry(func)' is a wrapper 'function(a)'

    When it is called like 'curriedSum(1)', the argument is saved in the Lexical Environment,
    and a new wrapper is returned 'function(b)'

    Then this wrapper is called with 2 as an argument, and it passes the call to the original 'sum'
*/
