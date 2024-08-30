/*
    !Warning In-depth language feature

    This article covers an advanced topic, to understand certain edge-cases better.

    It’s not important. Many experienced developers live fine without knowing it. Read on if you
    want to know how things work under the hood
*/
/*
    Reference Type

    A dynamically evaluated method call can lose 'this'.

    On the last line in the line above there's a conditional operator that chooses either 'user.hi' or 'user.bye'. In
    this case the result is 'user.hi'.

    The call results in an error, because the value of "this" inside the call becomes 'undefined'.

    A better look of why is this happening we can look it separately.

    let user = {
        name: "John",
        hi() { console.log(this.name); }
    };

    // split getting and calling the method in two lines
    let hi = user.hi;
    hi(); // Error, because this is undefined
*/

let user = {
    name: "John",
    hi() { console.log(this.name); },
    bye() { console.log("Bye"); }
};
user.hi(); // works
console.log(user.name); // John

// now let's call user.hi or user.bye depending on the name
(user.name == "John1" ? user.hi : user.bye)(); // Works
// (user.name == "John" ? user.hi : user.bye)(); // Fails :(

/*
    To make user.hi() calls work, JavaScript uses a trick – the dot '.' returns not a
    function, but a value of the special Reference Type https://tc39.es/ecma262/#sec-reference-specification-type

    The Reference Type is a "specification type". We can't explicitly use it, but it is used internally by
    the language.

    The value of Reference Type is a three-value combination, where:
    - 'base' is the object.
    - 'name' is the property name.
    - 'scrict' is true if 'use strict is in effect.

    The result of a property access user.hi is not a function, but a value of Reference Type. For
    user.hi in strict mode it is:
    (user, "hi", true)

    When parentheses '()' are called on the Reference Type, they receive the full information about
    the object and its method, and can set the right 'this'.

    Reference Type is a special 'intermediary' internal type, with the purpose to pass information from
    dot '.' to calling the parentheses '()'.

    Any other operation like assignment 'hi = user.hi' discards the reference type as a whole,
    takes the value of 'user.hi' (a function) and passes it on. So any further operation "loses"
    'this'.

    So as the result, the value of 'this' is only passed the right way if the function is called directly
    using a dot 'obj.method()' or square brackets 'obj['method']()' syntax. We can also solve this problems
    in various ways for example with 'func.bind()' file:///C:/Users/Luis/Documents/js.pdf#solution-2-bind
*/
(user.name == "John" ? user.hi.bind(user) : user.bye.bind(user))(); // Works

