let arr, removed, arrayLike, users, army, soldiers;
// ---------
// Add a remove elements
// ---------

// arr.push(...items) – adds items to the end,
// arr.pop() – extracts an item from the end,
// arr.shift() – extracts an item from the beginning,
// arr.unshift(...items) – adds items to the beginning.

// splice
// The arr.splice  method is a swiss army knife for arrays. It can do everything: insert, remove and replace elements.
// arr.splice(start[, deleteCount, elem1, ..., elemN])

// It modifies arr from the index~start then it removes the number~deleteCount of elements and
// inserts elem1 to elemN at their place.
arr = ["I", "study", "JavaScript", "right", "now"];
removed = arr.splice(0, 3, "Let's", "dance");
console.log(arr); // ["Let's", "dance", "right", "now"]

// it returns the removed elements
console.log(removed); // "I", "study" <-- array of removed elements

// splice method is also able to insert the elements without any removals. For that we need to set deleteCount to 0
arr.splice(2, 0, "complex", "language");
console.log(arr); // ["Let's", "complex", "complex", "dance", "right", "now"]

// splice works with negative indexes
arr = [1, 2, 5];
arr.splice(-1, 0, 3, 4);
console.log(arr); // 1,2,3,4,5

// slice
// It returns a new array copying to it all items from index start to end (not including end )
// arr.slice([start], [end])
arr = ["t", "e", "s", "t"];
console.log(arr.slice(1, 3)); // e,s (copy from 1 to 3)
console.log(arr.slice(-2)); // s,t (copy from -2 till the end

// concat
// It creates a new array that includes values from other arrays and additional items.
// arr.concat(arg1, arg2...) // It accepts any number of arguments – either arrays or values
arr = [1, 2];
console.log(arr.concat([3, 4])); // 1,2,3,4
console.log(arr.concat([3, 4], [5, 6])); // 1,2,3,4,5,6
console.log(arr.concat([3, 4], 5, 6)); // 1,2,3,4,5,6

// It can add other objects as a whole
arrayLike = {
  0: "something",
  length: 1,
};
console.log(arr.concat(arrayLike)); // 1,2,[object Object]

// If an array-like object has Symbol.isConcatSpreadable then it's treated as an array.
arrayLike = {
  0: "something",
  1: "else",
  [Symbol.isConcatSpreadable]: true,
  length: 2,
};
console.log(arr.concat(arrayLike)); // 1,2,something,else

// ---------
// Search among elements
// ---------

// indexOf/lastIndexOf and includes
// arr.indexOf(item, from) – looks for item starting from index from , and returns the index where it was found, otherwise -1
// arr.lastIndexOf(item, from) – same, but looks for from right to left
// arr.includes(item, from) – looks for item starting from index from , returns true if found.
arr = [1, 0, false];
console.log(arr.indexOf(0)); // 1
console.log(arr.indexOf(false)); // 2
console.log(arr.indexOf(null)); // -1
console.log(arr.includes(1, 1)); // false

// find and findIndex
// let us find a single element with an specific condition
// arr.find(function(item, index, array) {
// if true is returned, item is returned and iteration is stopped
// for falsy scenario returns undefined
// });

// item is the element.
// index is its index.
// array is the array itself.

// If it returns true , the search is stopped, the item is returned. If nothing found, undefined is returned
users = [
  { id: 1, name: "John" },
  { id: 2, name: "Pete" },
  { id: 1, name: "Mary" },
];
let user = users.find((item) => item.id == 1);
console.log(user.name); // John

// arr.findIndex  method is essentially the same, but it returns the index where the element
// was found instead of the element itself and -1 is returned when nothing is found

// filter
// Similar as find but it let us find multiple elements
// The syntax is also similar to find , but filter returns an array of all matching elements
users = [
  { id: 1, name: "John" },
  { id: 2, name: "Pete" },
  { id: 3, name: "Mary" },
];
// returns array of the first two users
let someUsers = users.filter((item) => item.id < 3);
console.log(someUsers.length); // 2

// ---------
// Iterate over elements
// ---------

// forEach allows to run a function for every element of the array
// arr.forEach(function(item, index, array) {
// ... do something with item
// });
["Bilbo", "Gandalf", "Nazgul"].forEach((item, index, array) => {
  console.log(`${item} is at index ${index} in ${array}`);
});

// ---------
// Transform the array
// ---------

// map calls the function for each element of the array and returns the array of results
// let result = arr.map(function (item, index, array) {
//   // returns the new value instead of item
// });
let lengths = ["Bilbo", "Gandalf", "Nazgul"].map((item) => item.length);
console.log(lengths); // 5,7,6

// arr.sort() sorts the array in place, changing its element order
arr = [1, 2, 5];
arr.sort();
console.log(arr); // 1, 15, 2 - Items are sorted as strings by default.

// Own sorting
function compare(a, b) {
  if (a > b) return 1; // if the first value is greater than the second
  if (a == b) return 0; // if values are equal
  if (a < b) return -1; // if the first value is less than the second
}
arr = [1, 2, 15];
arr.sort(compareNumeric);
console.log(arr); // 1, 2, 15
// !! Use localeCompare for strings

// reverse
arr = [1, 2, 3, 4, 5];
aarr.reverse();
console.log(arr); // 5,4,3,2,1

// split and join
// split
names = "Bilbo, Gandalf, Nazgul";
arr = names.split(", ");
for (let name of arr) {
  console.log(`A message to ${name}.`); // A message to Bilbo (and other names)
}
// second argument
arr = "Bilbo, Gandalf, Nazgul, Saruman".split(", ", 2);
alert(arr); // Bilbo,
// empty string
str = "test";
alert(str.split("")); // t,e,s,t

// join
arr = ["Bilbo", "Gandalf", "Nazgul"];
str = arr.join(";"); // glue the array into a string using ;
alert(str); // Bilbo;Gandalf;Nazgul

// reduce and reduceRight
// They are used to calculate a single value based on the array
// let value = arr.reduce(function(accumulator, item, index, array) {
//   // ...
// }, [initial]);
/*
  accumulator – is the result of the previous function call, equals initial the first time (if
  initial is provided).
  item – is the current array item.
  index – is its position.
  array – is the array
*/
arr = [1, 2, 3, 4, 5];
let result = arr.reduce((sum, current) => sum + current, 0);
alert(result); // 15

// ---------
// Additionally
// ---------

// Array.isArray
// Arrays do not form a separate language type. They are based on objects
console.log(typeof {}); // object
console.log(typeof []); // object

console.log(Array.isArray({})); // false
console.log(Array.isArray([])); // true

// thisArg
// Almost array methods that call functions except for sort can accept an additional parameter thisArg
// arr.find(func, thisArg);
// arr.filter(func, thisArg);
// arr.map(func, thisArg);

army = {
  minAge: 18,
  maxAge: 27,
  canJoin(user) {
    return user.age >= this.minAge && user.age < this.maxAge;
  },
};

users = [{ age: 16 }, { age: 20 }, { age: 23 }, { age: 30 }];

// find users, for who army.canJoin returns true
soldiers = users.filter(army.canJoin, army);

// Without thisArg of army
// it will run the army.canJoin as a standalone function and fail on this because this=undefined
// let soldiers = users.filter(army.canJoin);

console.log(soldiers.length); // 2
console.log(soldiers[0].age); // 20
console.log(soldiers[1].age); // 23
