//////////
// Async Generators
//////////
/*
    For most practical applications, when we'd like to make an object that asynchronously generates
    a sequence of values, we can use an asynchronous generator.

    The syntax is simple: prepend 'function*' with 'async'. That makes the generator
    asyncrhonous.
    
    As the generator is asynchronous, we can use await inside it, rely on promises, perform
    network requests and so on

    And then use 'for await (...)' to iterate over it, like this:
*/
async function* generateSequence(start, end) {
  for (let i = start; i <= end; i++) {
    // Wow, can use await!
    await new Promise((resolve) => setTimeout(resolve, 1000));
    yield i;
  }
}

(async () => {
  let generator = generateSequence(1, 5);
  for await (let value of generator) {
    console.log(value); // 1, then 2, then 3, then 4, then 5 (with delay between)
  }
})();

/*
    Information: Under-the-hood difference

    Technically, if you're an advanced reader who rememebers the details about generators,
    there's an internal difference.

    For async generators, the 'generator.next()' method is asyncrhonous, it returns promises.

    In a regular generator we'd use 'result = generator.next()' to get values. In a async
    generator, we should 'await', like this:

    `result = await generator.next(); // result = {value: ..., done: true/false}`

    That's why async generators work with 'for await...of'.
*/

// Async iterable range
/*
    Regular generators can be used as 'Symbol.iterator' to make the iteration code shorter.

    Similar to that, async generators can be used as 'Symbol.asyncIterator' to implement the
    asynchronous iteration.

    For instance, we can make the 'range' object generate values asynchronously, once per second,
    by replacing synchronous 'Symbol.iterator' with asynchronous 'Symbol.asyncIteration'.
*/
let range = {
  from: 1,
  to: 5,
  // this line is same as [Symbol.asyncIterator]: async function*() {
  async *[Symbol.asyncIterator]() {
    for (let value = this.from; value <= this.to; value++) {
      // make a pause between values, wait for something
      await new Promise((resolve) => setTimeout(resolve, 1000));
      yield value;
    }
  },
};

(async () => {
  for await (let value of range) {
    console.log(value); // 1, then 2, then 3, then 4, then 5
  }
})();

/*
    Information: Please note:

    Technically, we can add both 'Symbol.iterator' and 'Symbol.asyncIterator' to the
    object, so it's both synchronously (for..of) and asynchronously (for await..of)
    iterable.

    Don't do it.
*/
