/*
    When JavaScript prepares to run the script, it first looks for
    global Function Declarations in it and creates the functions.
    We can think of it as an “initialization stage”.

    And after all Function Declarations are processed, the code is executed.
    So it has access to these functions.
*/

// Function declaration

sayHi("John"); // Hello, John

function sayHi(name) {
  alert(`Hello, ${name}`);
}

// Function expression

sayHi("John"); // error!

let sayHi = function (name) {
  // (*) no magic any more
  alert(`Hello, ${name}`);
};
