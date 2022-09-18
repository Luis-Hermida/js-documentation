/*
    Recursion is a programming patter that is useful in situations when a task can be naturally split
    into several tasks of the same kind, but simpler. Or when a task can be simplified into an easy
    action plus a simpler variant of the same task. Or, as we'll see soon, to deal with certain data
    structures.

    When a function solves a task, in the process it can call many other functions. A partical case of 
    this is when a function call itself. That's called recursion.

    The maximal number of nested calls (including the first one) is called recursion depth.
    The maximal recursion depth is limited by JavaScript engine. We can rely on it being 10000,
    some engines allow more, but 100,000 is probably out of limit for the mmajority of them.
*/

/*  Two ways of thinking
    Let's write a funciton 'pow(x, n)' that raises 'x' to a natural
    power of 'n', Multiply 'x' by itself 'n' times.
*/
// Iterative thinking: the 'for' loop
function pow(x, n) {
  let result = 1;
  // multiply result by x n times in the loop
  for (let i = 0; i < n; i++) {
    result *= x;
  }
  return result;
}
console.log(pow(2, 3)); // 8

// Recursive thinking: simplify the task and call self
function pow(x, n) {
  if (n == 1) {
    return x;
  } else {
    return x * pow(x, n - 1);
  }
}
console.log(pow(2, 3)); // 8

/*
    Recursion is usually shorter
    A recursive solution is usually shorter than an iterative one.

    Here we can rewrite the same using the conditional operator '?' insted of 'if' to make
    'pow(x, n)' more terse and still very readable:

    function pow(x, n) {
        return (n == 1) ? x : (x * pow(x, n - 1));
    }
*/

// The execution context and stack
/*
    The execution context (https://tc39.github.io/ecma262/#sec-execution-contexts) is a 
    internal data structure that contains details about the execution of a function:
    where the control flow is now, the current variables, the value of 'this' and
    few other internal details:

    One function has exactly one execution context associated with it.

    When a function makes a nested call, the following happens:
    - The current function is paused.
    - The execution context associated with it is remembered in a special data structure called
    execution context slack
    - The nested call executes
    - After it ends, the old execution context is retrieved from the slack, and the outer function is
    resumed from where it stopped.

    In pow(2, 3) the recursion depth is equals as N so 3.
    Contexts take memory so a loop-based algorithm is more memory-saving.

    Any recursion can be rewritten as a loop. The loop variant usually can be made more
    effective.
*/

// Recursive traversals
/*
Either it’s a “simple” department with an array of people – then we can sum the salaries in a
simple loop.

Or it’s an object with N subdepartments – then we can make N recursive calls to get the sum
for each of the subdeps and combine the results.

We can easily see the principle: for an object {...} subcalls are made, while arrays [...]
are the “leaves” of the recursion tree, they give immediate result.
*/

let company = {
  sales: [
    { name: "John", salary: 1000 },
    { name: "Alice", salary: 1600 },
  ],
  development: {
    sites: [
      { name: "Peter", salary: 2000 },
      { name: "Alex", salary: 1800 },
    ],
    internals: [{ name: "Jack", salary: 1300 }],
  },
};

function sumSalaries(department) {
  if (Array.isArray(department)) {
    // case (1)
    return department.reduce((prev, current) => prev + current.salary, 0); // sum the array
  } else {
    // case (2)
    let sum = 0;
    for (let subdep of Object.values(department)) {
      sum += sumSalaries(subdep); // recursively call for subdepartments, sum the results
    }
    return sum;
  }
}

console.log(sumSalaries(company)); // 7700

// Recursive structures
/*
    A recursive data structure is a structure that replicates itself in parts.
    
    LinkedList
    is a linear collection of data elements whose order is not given by their physical
    placement in memory. Instead, each element points to the next. It is a data structure
    consisting of a collection of nodes which together represent a sequence.

    We want to store an ordered list of objects and array would be the natural choice.
    But with arrays the "delete element" and "insert element" operations are expensive
    for example 'arr.unshift()' has to renumber all elements to make room for a new 'obj'.
    Same with 'arr.shift()'
*/

let list = { value: 1 };
list.next = { value: 2 };
list.next.next = { value: 3 };
list.next.next.next = { value: 4 };
list.next.next.next.next = null;

// It can be easily split into multiple parts and joined back
// Split
let secondList = list.next.next;
list.next.next = null;
// Join
list.next.next = secondList;

// Prepend new value
list = { value: "new item", next: list };

// Remove a value from the middle
list.next = list.next.next;

/*
    - More about linked lists

    The main drawback is that we can't easily access an element by its number. In an array that's
    easy: 'arr[n]' is a direct reference. But in the list we need to start from the first item and go
    'next' 'N' times to get the Nth element.

    But we don't always need such operations. For instance, when we need a queue or even a
    deque - the ordered structure must allow very fast adding/removing elements from both
    ends, but access to its middle is not needed

    - Lists can be enhanced:
        - We can add property 'prev' in addition to 'next' to refrence the previous element
        to move back easily.
        - We can also add a variable named 'tail' referencing the last element of the list (and
          update it when adding/removing elements from the end).
        - And in general it may vary according to our needs.
*/
