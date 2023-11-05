//////////
// Generators
//////////
/*
    JavaScript generators are just ways to make iterators. They use the yield keyword to 
    yield execution control back to the calling function and can then resume execution once 
    the next() function is called again.

    Generators can return ("yield") multiple values, one after anothjer, on-demand. They work great
    with iterables, allowing to create data streams with ease.
*/

// Generator Functions
/*  
    To create a generator, we need a special syntax contruct: 'funciton*', so-called "generator
    function"

    function* generateSequence() {
        yield 1;
        yield 2;
        return 3;
    }

    Generator functions behave differently from regular ones. When such function is called, it doesn't
    run its code. Instead it retunrs a special object, called "generator object", to manage the execution.
*/
function* generateSequence() {
  yield 1;
  yield 2;
  return 3;
}

// "generator function" creates "generator object"
let generator = generateSequence();
console.log(generator); // [object Generator]

/*
    We can see that the function code execution hasn't started yet.

    The main method of a generator is 'next()'. When called it runs the execution until the nearest
    'yield<value>' statement ('value' can be omitted, then it's 'undefined'). Then the function
    execution pauses, and the yielded 'value' is returned to the outer code.

    The result of 'next()' is always an object with 2 properties
    - 'value': the yielded value.
    - 'done' : 'true' if the function code has finished, otherwise 'false'.

    For instance, here we create the generator and get its first yielded value:
*/
let one = generator.next();
console.log(JSON.stringify(one)); // {value: 1, done: false}

/*
    Let call 'generator.nexT()' again. It resumes the code execution and returns the next
    'yield':
*/
let two = generator.next();
console.log(JSON.stringify(two)); // {value: 2, done: false}

/*
    And if we call it a third time, the execution reaches the 'return' statement that finishes the
    function.

    Now the generator is done. Whe should see it from 'done:true' and process 'value:3' as the
    final result.

    New calls to 'generator.next()' don't make sense anymore. If we do them, they return the same
    object '{done: true}'.
*/
let three = generator.next();
console.log(JSON.stringify(three)); // {value: 2, done: false}

/*
    Information: function* f(...) or function *f(...)

    Both syntaxes are correct.

    But usually the first syntax is preferred, as the star '*' donotes that it's a generator function, it
    describes the kind, not the name, so it should stick with the 'function' keyword.
*/
