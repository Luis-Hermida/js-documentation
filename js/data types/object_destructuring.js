let options, title, width, height;
// The destructuring assignment also works with objects:
// Synxtax: let {var1, var2} = {var1:…, var2:…}

// We need a existing object on the right side and the left
// side contains an object-like "pattern" for correspoinding
// properties.
options = {
  title: "Menu",
  width: 100,
  height: 200,
};
// Order doens't matter
// And we have to wrap everything in parentheses to assign it to an existing variable
({ title2, width, height } = options);
console.log(title2); // UNdefined
console.log(width); // 100
console.log(height); // 200

// If we want to assign a property to a variable but with a different name
// we can add a colon for example storing width in a variable named 'w'
({ width: w, height: h } = options);
console.log(w);
console.log(h);

// We can also use default values
options = {
  title: "Menu",
};
// We can combine both colon and equality
({ width: w = 100, height = 200, title } = options);
console.log(title); // Menu
console.log(w); // 100
console.log(height); // 200

// The rest patter '...'
options = {
  title: "Menu",
  height: 200,
  width: 100,
};
// title = property named title
// rest = object with the rest of properties
({ title, ...rest } = options);
// now title="Menu", rest={height: 200, width: 100}
console.log(rest.height); // 200
console.log(rest.width); // 100

// Nested object to destructure
options = {
  // Nested object
  size: {
    width: 100,
    height: 200,
  },
  // Nested Array
  items: ["Cake", "Donut"],
  extra: true,
};

// Nested destructuring
({
  size: { width, height }, // Nested object
  items: [item1, item2], // Nested Array
  title = "Menu", // Default value
} = options);

console.log(title); // Menu
console.log(width); // 100
console.log(height); // 200
console.log(item1); // Cake
console.log(item2); // Donut

// Smart function paremeters
function showMenu(title = "Untitled", width = 200, height = 100, items = []) {}
// When a fucntion has many parameters, specially optional ones it can be a
// problem to remember the order of arguments and just calling it can be ugly
showMenu("My Menu", undefined, undefined, ["Item1", "Item2"]);
// But we can use destructuring to make it more readable with all of its full syntax
options = {
  title: "My menu",
  items: ["Item1", "Item2"],
};
showMenu(options);
// One downside is that when calling a function that destructures it expects a value even an
// empty one
showMenu({}); // ok, all values are default
// showMenu(); // this would give an error

// We can fix this by adding a default value for the whole object of parameters
function showMenu({ title = "Menu", width = 100, height = 200 } = {}) {
  console.log(`${title} ${width} ${height}`);
}
showMenu(); // Menu 100 200
