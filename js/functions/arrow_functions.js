// Arrow Functions
/*
    Arrow functioons are not just a "shorthand" for writing small stuff. They have some very specific
    and useful feaatures.

    JavaScript is full of situations where we need to write a small function that's executed somewhere
    else.

    arr.forEach(func) – func is executed by forEach for every array item.
    setTimeout(func) – func is executed by the built-in scheduler.

    It's in the very spirit of JavaScript to create a function and pass it somewhere, and in such functions
    we usually don't want to leave the current context. That's where the arrow functions come in handy.
*/

/*
    Arrow functions have no "this"

    If this is accessed in an arrow function it's going to be taken from the outside.

    Use case - We can use it to iterate inside an object method.
    Here in 'forEach', the arrow function is used, so 'this.title' in it is exactly the same as in
    the outer method 'showList'. That is 'group.title'
*/
let group = {
  title: "Our Group",
  students: ["John", "Pete", "Alice"],

  showList() {
    this.students.forEach((student) =>
      console.log(this.title + ": " + student)
    );
  },
};
group.showList();
/*
    With a 'regular' function, there would be an error because 'forEach' functions with 'this=undefined'
    by default, so the attempt to access 'undefined.title' is made.
*/
group = {
  title: "Our Group",
  students: ["John", "Pete", "Alice"],
  showList() {
    this.students.forEach(function (student) {
      // Error: Cannot read property 'title' of undefined
      console.log(this.title + ": " + student);
    });
  },
};

/*
    Warning: Arrow functions can't run with 'new'
    Not having 'this' naturally means another limitation: arrow functions can't be used as
    constructors. They can't be called with 'new'.
*/
/*
    Information: Arrow functions VS bind.
    There's a subtle difference between an arrow function and a regular function called with
    '.bind(this)':

    - '.bind(this)' creates a "bound version" of the function.
    - The arrow doesn't create any binding. The function simply doesn't have 'this'. The
    lookup of 'this' is made exactly the same way as a regular variable search: in the outer
    lexical environment.
*/

/*
    Arrows have no "arguments" keyword.

    Arrow functions also have no 'arguments' variable.
    
    That's great for decorators, when we need to forward a call with the current 'this' and 
    'arguments'
*/
