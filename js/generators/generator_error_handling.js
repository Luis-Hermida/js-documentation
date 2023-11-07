//////////
// Generators Error Handling
//////////
/*
    Generator .throw

    To pass an error into a 'yield', we should call 'generator.throw(err)'. In that case, the
    'err' is thrown in the line with that 'yield'.

    The error, thrown into the generator at line '(2)' leads to an exception in line '(1)' with 'yield'.
    In the example below, 'try...catch' catches it and shows it.

    If we don't catch it, then just like any exception, it "falls out" the generator into the calling code.

    The current line of the calling code is the line with 'generator.throw', labeled as '(2)'. So we
    can catch it here
*/

function* generate() {
  let result = yield "2 + 2 = ?"; // Error in this line
}

let generator = generate();
let question = generator.next().value;

try {
  generator.throw(new Error("The answer is not found in my database"));
} catch (e) {
  console.log(e); // shows the error
}

console.log("Script Finished");

/*
    Generator .return

    'generator.return(value)' finishes the generator execution and return the given 'value'.

    If we again use 'generator.return()' in a completed generator, it will return that value again.

    We often don't use it, as most of the time we want to get all returning values, but it can be useful
    when we want to stop generator in a specific condition.
*/

function* gen() {
  yield 1;
  yield 2;
  yield 3;
}

const g = gen();

g.next(); // { value: 1, done: false }
g.return("foo"); // { value: "foo", done: true }
g.next(); // { value: undefined, done: true }
