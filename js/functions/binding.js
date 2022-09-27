// Function Binding
/*
    Loosing "this"

    We've already seen examples of losing 'this'. Once a method is passed somewhere separately
    from the object - 'this' is lost.

    let user = {
        firstName: "John",
        sayHi() {
            console.log(`Hello, ${this.firstName}!`);
        }
    };
    
    setTimeout(user.sayHi, 1000); // Hello, undefined!

    As we can see, the output shows not "John" as 'this.firstName', but 'undefined'.
    That's because 'setTimeout' got the function 'user.sayHi', separately from the object.
*/

/*
    Loosing "this" solution with a Wrapper.

    let user = {
        firstName: "John",
        sayHi() {
            console.log(`Hello, ${this.firstName}!`);
        }
    };

    setTimeout(function() {
        user.sayHi(); // Hello, John!
    }, 1000);
    OR
    setTimeout(() => user.sayHi(), 1000); // Hello, John!

    Now it works, because it receives 'user' from the outer lexical environment, and then calls the
    method normally.

    One vulnerability with this approach is that the user value can change before the 'setTimeout'
    triggers.
*/

/*
    Loosing "this" solution with bind

    Syntax: let boundFunc = func.bind(context);

    The result of 'func.bind(context)' is a special function-like "exotic object", that is callable as
    function and transparently passed the call to 'func' setting 'this=context'.
*/
// Here 'func.bind(user)'as a "bound variant" of 'func', with fixed 'this=user'
let user = {
  firstName: "John",
};
function func() {
  console.log(this.firstName);
}
let funcUser = func.bind(user);
funcUser(); // John

// All arguments are passed to the original 'func' as is
let user2 = {
  firstName: "John",
};
function func2(phrase) {
  console.log(phrase + ", " + this.firstName);
}
// bind this to user
funcUser2 = func2.bind(user2);
funcUser2("Hello"); // Hello, John (argument "Hello" is passed, and this=user)

// With an object method
let user3 = {
  firstName: "Juan",
  sayHi() {
    console.log(`Hello, ${this.firstName}!`);
  },
};

let sayHi = user3.sayHi.bind(user); // (*)
// can run it without an object
sayHi(); // Hello, John!
setTimeout(sayHi, 1000); // Hello, John!
// even if the value of user changes within 1 second
// sayHi uses the pre-bound value which is reference to the old user object
user3 = {
  sayHi() {
    console.log("Another user in setTimeout!");
  },
};

/*
    Information: Convenience method 'bindAll'

    If an object has many methods and we plan to actively pass it around, then we could bind
    them in a loop.

    for (let key in user) {
        if (typeof user[key] == 'function') {
            user[key] = user[key].bind(user);
        }
    }  
*/

// Partial Functions
/*
    We can bind not only 'this', but also arguments. That's rarely done, but sometimes can be
    handy.

    Full syntax of 'bind':
    let bound = func.bind(context, [arg1], [arg2], ...)

    It allows to bind context as 'this' and starting arguments of the function.

    For example:
*/
// We have a multiplication function mul(a, b)
function mul(a, b) {
  return a * b;
}

// Let's use 'bind' to create a function 'double' on its base:
let double = mul.bind(null, 2);
console.log(double(3)); // = mul(2, 3) = 6
console.log(double(4)); // = mul(2, 4) = 8
console.log(double(5)); // = mul(2, 5) = 10
/*
    The call to 'mul.bind(null, 2)' creates a new function 'double' that passes calls to 'mul'
    fixing 'null' as the context and '2' as the first arguments. Further arguments are passed "as is".

    That's called partial function application - we can create a new function by fixing some parameters
    of the existing one.

    Partial function application is useful when we have a very generic function and want a less
    universal variant of it for convenience
*/

// Going partial without context
/*
    What if we'd like to fix some arguments, but not the context.

    The native 'bind' doesn't allow that. We can't just omit the context and jump to arguments.
    
    Fortunately, a funciton 'partial' for binding only arguments can be easily implemented.
*/
function partial(func, ...argsBound) {
  return function (...args) {
    // (*)
    return func.call(this, ...argsBound, ...args);
  };
}

// Usage:
let user4 = {
  firstName: "John",
  say(time, phrase) {
    console.log(`[${time}] ${this.firstName}: ${phrase}!`);
  },
};

// add a partial method with fixed time
user4.sayNow = partial(
  user4.say,
  new Date().getHours() + ":" + new Date().getMinutes()
);

user4.sayNow("Hello");
// Something like:
// [10:00] John: Hello!

/*
    The result of 'partial(func[arg1, arg2...])' call is a wrapper that calls 'func'
    with:

    - Same this as it gets (for user.sayNow call it’s user )
    - Then gives it ...argsBound – arguments from the partial call ( "10:00" )
    - Then gives it ...args – arguments given to the wrapper ( "Hello" )
*/
