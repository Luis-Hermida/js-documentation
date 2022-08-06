// Primitives
// Is a value of a primitive type.
// There are 7 primitive types: string , number , bigint , boolean , symbol , null and undefined .

// Objects
// Is capable of storing multiple values as properties.
// Can be created with {} , for instance: {name: "John", age: 30} . There are other kinds
// of objects in JavaScript: functions, for example, are objects.

// Objects can store functions as its properties.
let john = {
  name: "John",
  sayHi: function () {
    console.log("Hi buddy!");
  },
};

john.sayHi(); // Hi buddy!

// Primitive as an object
// The “object wrappers” are different for each primitive type and are called: String , Number ,
// Boolean , Symbol and BigInt . Thus, they provide different sets of methods.

// The special primitives null and undefined are exceptions. They don't have "wrapper objects"

let str = "Hello";
alert(str.toUpperCase()); // HELLO

let n = 1.23456;
alert(n.toFixed(2)); // 1.23
