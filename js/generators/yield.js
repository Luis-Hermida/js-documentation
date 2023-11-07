//////////
// Yield
//////////
/*
    Until this moment, generators were similar to iterable objects, with a special syntax to generate
    values. But in fact they are much more powerful and flexible.

    That's because 'yield' is a 2-way street; if not only returns the result of the outside, but also
    can pass the value inside the generator.

    To do so, we should call 'generator.next(arg)', with an argument. That egument becomes
    the result of 'yield'.
*/

// Example
function* gen() {
  // Pass a question to the outer code and wait for an answer
  let result = yield "2 + 2 = ?"; // (*)
  console.log(result);
}

let generator = gen();
let question = generator.next().value; // <-- yield returns the value
// generator.next(4); // --> pass the result into the generatorf // 4
/*
    1. The first call to 'generator.next()' should be always made without an argument (the
    argument is ignored if passed). It starts the execution and returns the result of the first 'yield'
    '2+2=?'. At this point the generator pauses the execution, while staying on the line '(*)'.

    2. Then, as hown at the picture above, the result of 'yield' gets into the 'question' variable in
    the calling code.

    3. On 'generator.next(4)', the generator resumes, and '4' gets in as the result; 
    'let result = 4'.

    Please note, the outer code does not have to immediately call 'next(4)'. It may take time.
    That's not a problem: the genrator will wait.
*/
// resume the generator after some time
setTimeout(() => generator.next(4), 1000);

// Example with more calls
/*
    As we can see, unlike regular functions, a generator and calling code can exchange results
    by passing values in 'next/yield'.

    To make things more obvious, here's another example, with more calls:
*/

function* gen2() {
  let ask1 = yield "2 + 2 = ?";
  console.log(ask1); // 4

  let ask2 = yield "3 * 3 = ?";
  console.log(ask2); // 9
}

let generator2 = gen2();
console.log(generator2.next().value); // "2 + 2 = ?"
console.log(generator2.next(4).value); // "3 * 3 = ?"
console.log(generator2.next(9).done); // true

/*
    1. The first '.next()' start the execution... It reaches the first 'yield'.
    
    2. The result is returned to outer code.

    3. The second '.next(4)' passes '4' back to the generator as the result of the first 'yield', and
    resumes the execution.

    4. It reaches the second 'yield', that becomes the result of the generator call.

    5. The third 'next(9)' passes '9' into the generator as the result of the second 'yield' nad
    resumes the execution that reaches the end of the function, so 'done: true'.

    It's like a 'ping-pong' game. Each 'next(value)' (excluding the first one) passes a value into
    the generator, that becomes the result of the current 'yield', and then gets back the result of the
    next 'yield'.
*/
