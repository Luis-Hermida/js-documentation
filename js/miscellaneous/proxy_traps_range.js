/*
    //////////
    // “In range” with “has” trap
    //////////

    We have this range object:

    let range = {
        start: 1,
        end: 10
    };

    We'd like to use the 'in' operator to check that a number is in 'range'.

    The 'has' trap intercepts 'in' calls.

    Syntax: 'has(target, property)'
    - 'target' – is the target object, passed as the first argument to new Proxy ,
    - 'property' – property name
*/
let range = {
  start: 1,
  end: 10,
};

range = new Proxy(range, {
  has(target, prop) {
    return prop >= target.start && prop <= target.end;
  },
});
console.log(5 in range); // true
console.log(50 in range); // false
