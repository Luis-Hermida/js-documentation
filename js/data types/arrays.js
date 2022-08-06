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
