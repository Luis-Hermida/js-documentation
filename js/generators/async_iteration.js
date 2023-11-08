//////////
// Async Iterables
//////////
/*
    Asynchronous iteration is needded when values come asynchronously: after 'setTimeout' or
    another kind of delay.

    The most common case is that the object needs to make a network request to deliver the next
    value.

    To make an object iterable asynchronously:
    1. Use 'Symbol.asyncIterator' instead of 'Symbol.iterator'.
    2. The 'next()' method should return a promise (to be fulfilled with the next value).
        - The 'async' keyword handles it, we can simply make 'async next()'.
    3. To iterate over such an object, we should use a 'for await (let item of iterable)' loop.

    As a starting example, let's make an iterable 'range' object that will return values
    asynchronously, one per second.
*/

let range = {
  from: 1,
  to: 5,

  [Symbol.asyncIterator]() {
    // (1)
    return {
      current: this.from,
      last: this.to,
      async next() {
        // (2)
        // note: we can use "await" inside the async next:
        await new Promise((resolve) => setTimeout(resolve, 1000)); // (3)
        if (this.current <= this.last) {
          return { done: false, value: this.current++ };
        } else {
          return { done: true };
        }
      },
    };
  },
};

(async () => {
  for await (let value of range) {
    // (4)
    console.log(value); // 1,2,3,4,5
  }
})();

/*
    1. To make an object asynchronously iterable, it must have a method 'Symbol.asyncIterator'. '(1)'

    2. The method must return the object with 'next()' method returning a promise '(2)'.

    3. The 'next()' method doesn't have to be 'async', it may be a regular method returning a
    promise, but 'async' allows us to use 'await', so that's convenient. Here we just delay for a
    second '(3)'.

    4. To iterate, we use 'for await(let value of range)' '(4)', namely add "await" after
    "for". It calls 'range[Symbol.asyncIterator]()' once, and then its 'next()' for values.

    Differences between Iterators and Async Iterators.
                                        - Iterators         - Async Iterators
    Object method to provide iterator:  - Symbol.iterator   - Symbol.asyncIterator
    'next()' return value is:           - any value         - Promise
    to loop, use                        - for..of           - for await..of  
*/

/*
    Warning: The spread syntax '...' doesn't work asynchronously

    Features taht require regular, synchronous iterators, don't work with asynchronous ones.

    For instance, a spread syntax won't work:

    `console.log( [...range] ); // Error, no Symbol.iterator`

    That's normal, as it expects to find 'Symbol.iterator', not 'Symbol.asyncIterator'.

    It's also the case for 'for..of': the syntax without 'await' needs 'Symbol.iterator'.
*/
