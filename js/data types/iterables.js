let range, str, arrayLike, arr;

// Symbol.iterator
// To make an object iterable
range = {
  from: 1,
  to: 5,

  // 1. call to for..of initially calls this
  // 2. Onward, for..of works only with the iterator object below, asking it for next values
  [Symbol.iterator]() {
    this.current = this.from;
    return this;
  },

  // 3. next() is called on each iteration by the for..of loop
  next() {
    // 4. it should return the value as an object {done:.., value :...}
    if (this.current <= this.to) {
      return { done: false, value: this.current++ };
    } else {
      return { done: true };
    }
  },
};
// now it works!
for (let num of range) {
  console.log(num); // 1, then 2, 3, 4, 5
}

// String is iterable
str = "𝒳😂";
for (let char of str) {
  console.log(char); // 𝒳, and then 😂
}

// Calling an iterator explicitly
// It gives us more control over the process than for..of
str = "Hello";
// does the same as
// for (let char of str) console.log(char);
let iterator = str[Symbol.iterator]();
while (true) {
  let result = iterator.next();
  if (result.done) break;
  console.log(result.value); // outputs characters one by one
}

// Iterables and array-likes
// Iterables are objects that implement the Symbol.iterator method, as described above.
// Array-likes are objects that have indexes and length , so they look like arrays.
arrayLike = {
  // has indexes and length => array-like
  0: "Hello",
  1: "World",
  length: 2,
};
// Error (no Symbol.iterator)
// for (let item of arrayLike) {}

// Array.from
// Takes an iterable or an array-like value and makes a real Array object from it.
arrayLike = {
  0: "Hello",
  1: "World",
  length: 2,
};
arr = Array.from(arrayLike);
console.log(arr.pop()); // World (method works)

// Array from has an optional "mapping" as a second argument
arr = Array.from(range, (num) => num * num);
console.log(arr);

// Unlike split Array.from relies on the iterable nature of the string just like for..of
function sliceString(str, start, end) {
  return Array.from(str).slice(start, end).join("");
}

str = "𝒳😂𩷶";
console.log(sliceString(str, 1, 3)); // 😂𩷶
// the native method does not support surrogate pairs
console.log(str.slice(1, 3)); // garbage (two pieces from different surrogate pairs)
