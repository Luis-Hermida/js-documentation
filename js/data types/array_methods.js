let arr, removed, arrayLike;
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

// ---------
// Iterate over elements
// ---------

// ---------
// Transform the array
// ---------

// ---------
// Additionally
// ---------
