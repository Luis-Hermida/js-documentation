// Break Directive

let sum = 0;
while (true) {
  let value = +prompt("Enter a number", "");
  if (!value) break; // (*)
  sum += value;
}
console.log("Sum: " + sum);

// Continue Directive

// It doesn’t stop the whole loop. Instead,
// it stops the current iteration and forces the loop to start a new one

for (let i = 0; i < 10; i++) {
  // if true, skip the remaining part of the body
  if (i % 2 == 0) continue;
  console.log(i);
}

// Usage of labels with Break and Continue
// break outer looks upwards for the label named outer and breaks out of that loop.
// And it has to be a code block where we put our directive label.

outer: for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    let input = prompt(`Value at coords (${i},${j})`, "");
    // if an empty string or canceled, then break out of both loops
    if (!input) break outer; // (*)
  }
}
console.log("Done!");
