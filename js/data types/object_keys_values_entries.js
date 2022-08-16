// keys() values() and entries() are supported for Maps, Sets and Arrays
// Plain objects also support similar methods, but with a differrent syntax
obj = {
  Hola: "Adios",
  1: 1,
};

console.log(Object.keys(obj)); // returns an array of keys.
console.log(Object.values(obj)); // returns an array of values.
console.log(Object.entries(obj)); // returns an array of [key, value] pairs

// Those examples will ignore all Symbol properties, but we can use
// Object.getOwnPropertySymbols to get the symbolics keys or
// Reflect.ownKeys(obj) that returns all keys

// Transforming objects
// To use methis like map and filters athat works on arrayLike objects we can use
// Object.entries followed by Object.fromEntries
let prices = {
  banana: 1,
  orange: 2,
  meat: 4,
};

let doublePrices = Object.fromEntries(
  // convert prices to array, map each key/value pair into another pair
  // and then fromEntries gives back the object
  Object.entries(prices).map((entry) => [entry[0], entry[1] * 2])
);

console.log(doublePrices.meat); // 8
