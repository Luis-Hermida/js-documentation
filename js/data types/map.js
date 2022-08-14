let map, john, recipeMap, obj, visitsCountMap;
// Objects are used for storing keyed collections.
// Arrays are used for storing ordered collections.

// Map
// Is a collection of keyed data items, like an object. But map allows keys of any type
// Methods
// new Map() - creates the map
// map.set(key, value) - stores the value by the key
// map.get(key) - returns the value by the key or undefined it key doesn't exist
// map.has(key) - return true if key exist, false otherwise
// map.delete(key) - removes the value by key
// map.clear() - removes everything from the map
// map.size return the current element count
map = new Map();
map.set("1", "str1"); // a string key
map.set(1, "num1"); // a numeric key
map.set(true, "bool1"); // a boolean key
// remember the regular Object? it would convert keys to string
// Map keeps the type, so these two are different:
console.log(map.get(1)); // 'num1'
console.log(map.get("1")); // 'str1'
console.log(map.size); // 3

// Using map[key] will treat the map as a plain JS object with all of his limitantions

// Objects as a keys
john = { name: "John" };
// for every user, let's store ther visits count
visitsCountMap = new Map();
visitsCountMap.set(john, 123);
console.log(visitsCountMap.get(john)); // 123

// Comparation
// Map uses the algorithm SameValueZero https://tc39.github.io/ecma262/#sec-samevaluezero
// It's almost the same as strict equiality === but in this case NaN would be equals to NaN.

// Chaining - every set calls return the map itself
map.set("1", "str1").set(1, "num1").set(true, "bool1");

// Iteration
// Insertion order is used, the iteration goes in the same order as the values were inserted.
// Methods
// map.keys() - return a iterable for keys
// map.values() - return an iterable for values
// map.entries() - return an iterable for entries [key, value] default for..of behavior
recipeMap = new Map([
  ["cucumber", 500],
  ["tomatoes", 350],
  ["onion", 50],
]);

// iterate over keys (vegetables)
for (let vegetable of recipeMap.keys()) {
  console.log(vegetable); // cucumber, tomatoes, onion
}
// iterate over values (amounts)
for (let amount of recipeMap.values()) {
  console.log(amount); // 500, 350, 50
}
// iterate over [key, value] entries
for (let entry of recipeMap) {
  // the same as of recipeMap.entries()
  console.log(entry); // cucumber,500 (and so on)
}

// Object.entries - Map from Object
obj = {
  name: "John",
  age: 30,
};
map = new Map(Object.entries(obj));

// Object.fromEntries = Object from Map
let prices = Object.fromEntries([
  ["banana", 1],
  ["orange", 2],
  ["meat", 4],
]);
// now prices = { banana: 1, orange: 2, meat: 4 }
console.log(prices.orange); // 2
