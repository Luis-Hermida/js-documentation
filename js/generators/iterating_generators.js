//////////
// Generators are iterable
//////////
/*
    As you probably already guessed looking at the 'next()' method, generators are iterable.

    We can loop over their values using 'for..of'.

    function* generateSequence() {
        yield 1;
        yield 2;
        return 3;
    }

    !! Note: the example above shows 1 , then 2 , and that’s all. It doesn’t show 3
    let generator = generateSequence();

    for(let value of generator) {
        console.log(value); // 1, then 2
    }

    If we want all results to be shown by for..of , we must return them with yield
*/

function* generateSequence() {
  yield 1;
  yield 2;
  yield 3;
}
let sequence = [0, ...generateSequence()];
console.log(sequence); // 0, 1, 2, 3

// Because generators are iterable, we can call all related functionality, e.g spread syntax '...'.
function* generateSequence() {
  yield 1;
  yield 2;
  yield 3;
}
let sequence2 = [0, ...generateSequence()];
console.log(sequence2); // 0, 1, 2, 3

// Range function with generators
let range = {
  from: 1,
  to: 5,

  *[Symbol.iterator]() {
    // a shorthand for [Symbol.iterator]: function*()
    for (let value = this.from; value <= this.to; value++) {
      yield value;
    }
  },
};
console.log([...range]); // 1,2,3,4,5

/*
    This works, because 'range[Symbol.iterator]()' now returns a generator, and generator
    methods are exactly what 'for...of' expects:
    - it has a '.next()' method
    - that returns values in the form '{value: ..., done: true/false}'

    That’s not a coincidence, of course. Generators were added to JavaScript language with iterators
    in mind, to implement them easily.

    The variant with a generator is much more concise than the original iterable code of range , and
    keeps the same functionality
*/

/*
    Information: Generators may generate values forever

    In the examples above we generated finite sequences, but we can also make a generator that
    yields values forever. For instance, an unending sequence of pseudo-random numbers.

    That surely would require a 'break' or 'return' in the 'for...of' over such generator.
    Otherwise, the loop would repeat forever and hang
*/
