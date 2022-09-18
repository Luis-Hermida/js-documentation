let arr, arr1, arr2, merged, str, arrCopy;
// Spread syntax
// When '...arr' is used in the function call, it "expands" an iterable object 'arr' into the list of
// arguments

// Math.max
arr = [3, 5, 1];
console.log(Math.max(...arr)); // 5 (spread turns array into a list of arguments)

// We can also pass multiple iterables
arr1 = [1, -2, 3, 4];
arr2 = [8, 3, -8, 1];
console.log(Math.max(...arr1, ...arr2)); // 8

// And combine them with normal values
console.log(Math.max(...arr1, ...arr2, 25)); // 25

// It can be used to merge values
merged = [0, ...arr, 2, ...arr2];

// It works on any iterable
str = "Hello";
console.log([...str]); // H,e,l,l,o

/*
    The spread syntax internally uses iterators to gather elements, the same ways as 'for..of' does.

    So, for a tring, 'for..of' returns characters and '...str' becomes
    H,e,l,l,o. The list of characters passed to array initializer '[...str]'

    We could/can use 'Array.from' becuase in converts an iterable into an array and it tends to be
    universal because 'Array.from' operates on both array-likes and iterables while the spread
    syntax only works with iterables.
*/

// Copy an array/object
/*
    We can also clone using the spread syntax for arrays and objects.

    This way of copying an object is much shorter than 'let objCopy = Object.assign({},
    obj)' or for an array 'let arrCopy = Object.assign([], arr)' so we prefer to use it
    whenever we can.
*/
// Arrays
arr = [1, 2, 3];
arrCopy = [...arr]; // spread the array into a list of parameters
// then put the result into a new array
// do the arrays have the same contents?
console.log(JSON.stringify(arr) === JSON.stringify(arrCopy)); // true
// are the arrays equal?
console.log(arr === arrCopy); // false (not same reference)
// modifying our initial array does not modify the copy:
arr.push(4);
console.log(arr); // 1, 2, 3, 4
console.log(arrCopy); // 1, 2, 3

// Objects
let obj = { a: 1, b: 2, c: 3 };
let objCopy = { ...obj }; // spread the object into a list of parameters
// then return the result in a new object
// do the objects have the same contents?
console.log(JSON.stringify(obj) === JSON.stringify(objCopy)); // true
// are the objects equal?
console.log(obj === objCopy); // false (not same reference)
// modifying our initial object does not modify the copy:
obj.d = 4;
console.log(JSON.stringify(obj)); // {"a":1,"b":2,"c":3,"d":4}
console.log(JSON.stringify(objCopy)); // {"a":1,"b":2,"c":3}
