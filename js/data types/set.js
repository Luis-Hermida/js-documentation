let set, john, pete, mary;
// Objects are used for storing keyed collections.
// Arrays are used for storing ordered collections.

// Set
// Is a special set of values (no keys) where each value may occur only once.
// Methods
// new Set(iterable) - creates the set and if an iterable object is provided, copies values from it into the set.
// set.add(value) - add a value, returns the set itself.
// set.delete(value) - removes the value. returns true if value existed, otherwise false.
// set.has(value) - returns true if the value exist, otherwise false.
// set.clear() - removes everything from the set.
// set.size - it is the element count.

// The main feature is that repeated calls of set.add(value) with the same value don’t do anything.
set = new Set();
john = { name: "John" };
pete = { name: "Pete" };
mary = { name: "Mary" };
// visits, some users come multiple times
set.add(john);
set.add(pete);
set.add(mary);
set.add(john); // again
set.add(mary); // again

// set keeps only unique values
console.log(set.size); // 3
for (let user of set) {
  console.log(user.name); // John (then Pete and Mary)
}

// Iteration
// We can use for..of or forEach
set = new Set(["oranges", "apples", "bananas"]);
for (let value of set) console.log(value);
// the same with forEach:
set.forEach((value, valueAgain, set) => {
  console.log(value);
});
