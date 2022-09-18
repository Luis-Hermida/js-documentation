// Rest parameters
// A function can be called with any number of arguments, no matter how it is defined.
function sum(a, b) {
  return a + b;
}

console.log(sum(1, 2, 3, 4, 5, 6, 7));

/*
    The will be no error because of "excessive" arguments. But of course in the result only the first
    two ill be counted.

    The rest of the parameters can be included in the function definition by using three dots '...'
    followed by the name of the array that will contain them. The dots literally mean "gather the
    remaining paramets into an array"
    
    The rest parameters gather all remaining arguments, so the following doesn't make sense
    and causes an error:

    function f(arg1, ...rest, arg2) { // arg2 after ...rest ?!
        // error
    }
    The '...rest' must always be last.

    For instance, to gather all arguments into array 'args':
*/

function sumAll(...args) {
  // args is the name for the array
  let sum = 0;
  for (let arg of args) sum += arg;
  return sum;
}
console.log(sumAll(1)); // 1
console.log(sumAll(1, 2)); // 3
console.log(sumAll(1, 2, 3)); // 6

/*
    We can choose to get the first parameters as variables, and gather only the rest.
*/
function showName(firstName, lastName, ...titles) {
  console.log(firstName + " " + lastName); // Julius Caesar
  // the rest go into titles array
  // i.e. titles = ["Consul", "Imperator"]
  console.log(titles[0]); // Consul
  console.log(titles[1]); // Imperator
  console.log(titles.length); // 2
}
showName("Julius", "Caesar", "Consul", "Imperator");
showName("Julius", "Caesar");

// The "arguments" variable
// There is also a special array-like object named 'arguments' that contains all arguments by their
// index.
function showName() {
  console.log(arguments.length);
  console.log(arguments[0]);
  console.log(arguments[1]);
  // it's iterable
  // for(let arg of arguments) console.log(arg);
}
// shows: 2, Julius, Caesar
showName("Julius", "Caesar");
// shows: 1, Ilya, undefined (no second argument)
showName("Ilya");

/*
    In old times, rest parameters didn't exist in the language, and using 'arguments' was the only
    way to get all arguments of the function. And it still works, we can find it in the old code.

    But the downside is that although 'arguments' is both array-like and iterable, it's not an array. It
    doesn't support array methods, so we can't call 'arguments.map()' and it always contains all arguments.

    Information: Arrow functions doesn't have "arguments".
*/
