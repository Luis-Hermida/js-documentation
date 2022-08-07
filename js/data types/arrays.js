let arr;
let fruits;

// Arrays
// Help us to create an ordered collection

// Declaration
arr = new Array();
arr = [];

// Array elements are numbered
fruits = ["Apple", "Orange", "Plum"];
console.log(fruits[0]); // Apple
console.log(fruits[1]); // Orange
console.log(fruits[2]); // Plum

// We can replace or add a new element
fruits[2] = "Pear"; // now ["Apple", "Orange", "Pear"]
fruits[3] = "Lemon"; // now ["Apple", "Orange", "Pear", "Lemon"]

// An array can store elements of any type
arr = [
  "Apple",
  { name: "John" },
  true,
  function () {
    console.log("hello");
  },
];
// get the object at index 1 and then show its name
console.log(arr[1].name); // John
// get the function at index 3 and run it
arr[3](); // hello

// Get last elements with "at"
fruits = ["Apple", "Orange", "Plum"];
// same as fruits[fruits.length-1]
console.log(fruits.at(-1)); // Plum

// Methods pop/push, shift/unshift
// Queue
// push appends an element to the end.
// shift get an element from the beginning, advancing the queue, so that the 2nd element becomes the 1st

// Stack
// push adds an element to the end.
// pop takes an element from the end.

// pop
// Extracts the last element of the array and returns it:
fruits = ["Apple", "Orange", "Pear"];
fruits.pop(); // ["Apple", "Orange"]

// push
// Append the element to the end of the array
fruits.push("Pear"); // ["Apple", "Orange", "Pear"]

// shift
// Extracts the first element of the array and returns it
fruits.shift(); // ["Orange", "Pear"]

// unshift
// Add the element to the beginning of the array
fruits.unshift("Apple"); // ["Apple", "Orange", "Pear"]

// unshift and push can add multiple elements at once
fruits.push("Orange", "Peach");
fruits.unshift("Pineapple", "Lemon");

// Array internals
// An array is a special kind of object. The square brackets used to access a property arr[0]
// actually come from the object syntax.

// Arrays are copied by reference
fruits = ["Banana"];
arr = fruits; // copy by reference (two variables reference the same array)
console.log(arr === fruits); // true
arr.push("Pear"); // modify the array by reference
console.log(fruits); // Banana, Pear - 2 items now

// Missuse of arrays by treating it as a regular object
let fruits = []; // make an array
fruits[99999] = 5; // assign a property with the index far greater than its length
fruits.age = 25; // create a property with an arbitrary name
//The engine will see that we’re working with the array as with a regular object. Array-specific
// optimizations are not suited for such cases and will be turned off, their benefits disappear

// Methods push/pop run fast, while shift/unshift are slow
// It’s not enough to take and remove the element with the number 0 . Other elements need to be renumbered as well.
fruits.pop(); // take 1 element from the end

// Array frm of loops
// for..of
// Doesn’t give access to the number of the current element, just its value
for (let fruit of fruits) {
  console.log(fruit);
}

// for..in
// for..in iterates over all properties, not only the numeric ones
for (let key in arr) {
  console.log(arr[key]); // Apple, Orange, Pear
}

// length property
// It updates automatically when we modify the array and it's the greatest numeric index plus one
fruits = [];
fruits[123] = "Apple";
console.log(fruits.length); // 124
// length is writable
arr = [1, 2, 3, 4, 5];
arr.length = 2; // truncate to 2 elements
console.log(arr); // [1, 2]
arr.length = 5; // return length back
console.log(arr[3]); // undefined: the values do not return

// Best and simple way to clear an array
arr.length = 0;

// newArray()
let arr = new Array("Apple", "Pear", "etc");
// Tricky feature with it
// it creates an array without items, but with the given length
let arr = new Array(2); // will it create an array of [2] ?
console.log(arr[0]); // undefined! no elements.
console.log(arr.length); // length 2

// Multidimensional arrays
let matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];
console.log(matrix[1][1]); // 5, the central element

// toStrings
// Arrays have their own implementation of toString method that returns a comma-separated list of elements
console.log(arr); // 1,2,3
console.log(String(arr) === "1,2,3"); // true

// Arrays can't be compared with ==
// == objects will only be true if they share the reference.
console.log([] == []); // false
console.log([0] == [0]); // false
console.log(0 == []); // true - [] gets converted to an empty string ''
