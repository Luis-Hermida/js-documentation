let firstName,
  surname,
  title,
  arr,
  user,
  guest,
  admin,
  name,
  name1,
  name2,
  rest,
  a,
  b,
  c,
  one,
  two,
  three;
// Destructuring
// Objects allows us to create single entity that stores data items
// Arrays allow us to gather data items into an ordered list

// Destructuring assignment is a special syntax that allos us to "unpack"
// arrays or bojects into a nunch of variables.
// It also works with complex functions that have a lot of parameters.

// Array destructuring
arr = ["John", "Smith"];
// sets firstName = arr[0]
// and surname = arr[1]w3e
[firstName, surname] = arr;
console.log(firstName); // John
console.log(surname); // Smith

// Destructuring doesn't mean destructive it copies the items into variables

// We can ignore elements by using commas
[firstName, , title] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];
console.log(title); // Consul

// Works with any iterable on the right side and it works with any iterable
[a, b, c] = "abc"; // ["a", "b", "c"]
[one, two, three] = new Set([1, 2, 3]);
// It works because its a kind of syntax sugar for calling for..of over the value to the right

// We can also use any assignables on the left sice
user = {};
[user.name, user.surname] = "John Smith".split(" ");
console.log(user.name); // John
console.log(user.surname); // Smith

// Looping with .entries()
user = {
  name: "John",
  age: 30,
};
// loop over keys-and-values
for (let [key, value] of Object.entries(user)) {
  console.log(`${key}:${value}`); // name:John, then age:30
}

// Looping with maps
user = new Map();
user.set("name", "John");
user.set("age", "30");
// Map iterates as [key, value] pairs, very convenient for destructuring
for (let [key, value] of user) {
  console.log(`${key}:${value}`); // name:John, then age:30
}

// Swap variables trick
guest = "Jane";
admin = "Pete";
// Let's swap the values: make guest=Pete, admin=Jane
[guest, admin] = [admin, guest];
console.log(`${guest} ${admin}`); // Pete Jane (successfully swapped!

// The rest '...'
// Usually if the array is longer than the list of the left, the extra items are omitted
// We can also gather those extra items using three dots
[name1, name2, ...rest] = [
  "Julius",
  "Caesar",
  "Consul",
  "of the Roman Republic",
];
// rest is array of items, starting from the 3rd one
console.log(rest[0]); // Consul
console.log(rest[1]); // of the Roman Republic
console.log(rest.length); // 2

// Default values if the oposite is true the variables of the left are considered undefined
[firstName, surname] = [];
console.log(firstName); // undefined
console.log(surname); // undefined
// But we can use a default value to replace the missing one
[name = "Guest", surname = "Anonymous"] = ["Julius"];
console.log(name); // Julius (from array)
console.log(surname); // Anonymous (default used)
