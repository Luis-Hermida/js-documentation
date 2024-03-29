// Super: internals, [[HomeObject]]
/*
    Let's getr a little deeper under the good of 'super'. We'll see some interesting things along the
    way.

    First to say, from all that we've learning till now, it's impossible for 'super' to work at all.

    When an object method runs, it gets the current object as 'this'. If we call 'super.method()' then,
    the engine needs to get the 'method' from the prototype of the current object.

    The task may seem simple, but it isn't. The engine knows the current object 'this', so it could
    get the parent 'method' as 'this.__proto__.method'. Unfortunately, such a "naive" solution
    won't work.

    In the example, 'rabbit.__proto__ = animal'. Now let's try: in 'rabbit.eat()' we'll call
    'animal.eat()', using 'this.__proto__'.
*/
let animal = {
  name: "Animal",
  eat() {
    console.log(`${this.name} eats.`);
  },
};

let rabbit = {
  __proto__: animal,
  name: "Rabbit",
  eat() {
    // that's how super.eat() could presumably work
    this.__proto__.eat.call(this); // (*)
  },
};

rabbit.eat(); // Rabbit eats.
/*
    At the line '(*)' we take 'eat' from the prototype ('animal') and call it in the context of the
    current object. Please note that '.call(this)' is important here, because a simple
    'this.__proto__.eat()' would execute parent 'eat' in the context of the prototype, not the
    current object.

    And in the code above it actually works as intented.

    Now let's one more object to the chain.
*/
let longEar = {
  __proto__: rabbit,
  eat() {
    // ...do something with long ears and call parent (rabbit) method
    this.__proto__.eat.call(this); // (**)
  },
};

try {
  // longEar.eat(); // Error: Maximum call stack size exceeded
} catch (err) {
  console.log(err);
}
/*
    The code doesn't work anymore. We can see the error trying to call 'longEar.eat()'.

    It may be not that obvious, but if we trace 'longEar.eat()' call, then we can see why. In both
    lines (*) and (**) the vlaue of 'this' is the current object ('longEar'). That's essential: all
    object methods get the current object as 'this', not a prototype or something.

    So, in both lines (*) and (**) the value of 'this.__proto__' is exactly the same:
    'rabbit'. They both call 'rabbit.eat' without going up the chain in the endless loop.

    1. Inside 'longEar.eat()' it calls 'rabbit.eat' proving it with 'this=longEar'

        // inside longEar.eat() we have this = longEar
        this.__proto__.eat.call(this)

        // becomes
        longEar.__proto__.eat.call(this)

        // that is
        rabbit.eat.call(this);

    2. Then in the line of 'rabbit.eat()', we'd like to pass the call even higher in the chain, but
    'this=longEar', so 'this.__proto__.eat' is again 'rabbit.eat'.

        // inside rabbit.eat() we also have this = longEar
        this.__proto__.eat.call(this) // (*)

        // becomes
        longEar.__proto__.eat.call(this)

        // or (again)
        rabbit.eat.call(this);

    3. So rabbit.eat calls itself in the endless loop, because it can’t ascend any further.

    This problem can't be solved by using 'this' alone.

    [[HomeObject]], When a function is specified as a class or object method, its [[HomeObject]]
    property becomes that object.

    Then 'super' uses it to resolve the parent prototype and its methods.

    It works as intented, due to [[HomeObject]] mechanics. A method such as 'longEar.eat',
    knows its [[HomeObject]] and takes the parent method from its prototype. Without any use
    of 'this'.
*/

let animal2 = {
  name: "Animal",
  eat() {
    // animal.eat.[[HomeObject]] == animal
    console.log(`${this.name} eats.`);
  },
};

let rabbit2 = {
  __proto__: animal2,
  name: "Rabbit",
  eat() {
    // rabbit.eat.[[HomeObject]] == rabbit
    super.eat();
  },
};

let longEar2 = {
  __proto__: rabbit2,
  name: "Long Ear",
  eat() {
    // longEar.eat.[[HomeObject]] == longEar
    super.eat();
  },
};

// works correctly
longEar2.eat(); // Long Ear eats.

///////////////////////
// Methods are not free
///////////////////////

/*
  As we've known before, generally functions are "free", not bound to objects in JavaScript. So they
  can be copied between objects and called with another 'this'.

  The very existence of [[HomeObject]] violates that principle. because methods remember
  their objects. [[HomeObject]] can't be changed, so this bond is forever.

  The only place in the language where [[HomeObject]] is used - is 'super'. So if a method
  doesn't user 'super' we still can consider it free and copy between objects. But with
  'super' things may go wrong.
*/

let animal3 = {
  sayHi() {
    console.log(`I'm an animal`);
  },
};
// rabbit inherits from animal
let rabbit3 = {
  __proto__: animal3,
  sayHi() {
    super.sayHi();
  },
};

let plant = {
  sayHi() {
    console.log("I'm a plant");
  },
};

// tree inherits from plant
let tree = {
  __proto__: plant,
  sayHi: rabbit3.sayHi,
};

tree.sayHi(); // I'm an animal

/*
  A call to 'tree.sayHi()' show "I'm an animal".

  The reason is:
  - In the objet tree, the method 'tree.sayHi' was copied from 'rabbit'. Maybe we just wanted
  to avoid code duplication.

  - Its [[HomeObject]] is 'rabbit', as it was created in 'rabbit'. There's no way to change
  [[HomeObject]].

  - The code of 'tree.sayHi()' has 'super.sayHi()' inside. It goest up from 'rabbit' and 
  takes the method from 'animal'. 
*/

///////////////////////////////////
// Methods, not function properties
///////////////////////////////////
/*
  [[HomeObject]] is defined for methods both in classes and in plain objects. But for objects,
  methods must be specified exactly as 'method()', not as "method: function()".

  The difference may be non-essential for us, but it's important for JavaScript.

  In the example below a non-method syntax is used for comparasion. [[HomeObject]] property
  is not set and the inheritance doesn't work.
*/

let animal4 = {
  eat: function () {
    // intentionally writing like this instead of eat() {...
    // ...
  },
};
let rabbit4 = {
  __proto__: animal4,
  eat: function () {
    // super.eat(); // SyntaxError: 'super' keyword unexpected here
  },
};
