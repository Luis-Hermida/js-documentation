// Should work
console.log("Hola");
console.log("Hola");

// Should work with semicolon insertion
console.log("Hola");
console.log("Hola");

// Semicolon insertion doesn't work here
// The sign plus marks it as an incomplete expression
console.log(3 + 1 + 2);

// Cases when automatic_semicolon_insertion fails
console.log("Hello");
[1, 2].forEach(console.log);

// Error
console.log("Hello")[(1, 2)].forEach(console.log);

// Seen as
// alert("Hello")[1, 2].forEach(alert);
