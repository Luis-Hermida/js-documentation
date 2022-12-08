// Class inheritance
/*
    Class inheritance is a way for one class to extend another class.

    So we can create a new functionality on top of the existing.
*/

////////////////////
// "extends" keyword
////////////////////
class Animal {
  type = "animal";

  constructor(name) {
    console.log(this.type);
    this.speed = 0;
    this.name = name;
  }

  run(speed) {
    this.speed = speed;
    console.log(`${this.name} runs with speed ${this.speed}.`);
  }

  stop() {
    this.speed = 0;
    console.log(`${this.name} stands still.`);
  }
}

let animal = new Animal("My animal");
/*
    We want to create another 'class Rabbit'.

    As rabbits are animals, 'Rabbit' class should be based on 'Animal', have access to animal
    methods, so that rabbits can do what "generic" animals can do.

    The syntax to extend another class is: 'class Child extends Parent'.

    Object of 'Rabbit' class have access both to 'Rabbit' methods, such as 'hide',
    and also to 'Animal' methods, such as 'run'.

    Internally, 'extends' keyword works using the good old prototype mechanics. It sets
    'Rabbit.prototype.[[Prototype]]' to 'Animal.prototype'. So if a method is not found in
    'Rabbit.prototype', JavaScript takes it from 'Animal.prototype'.

           prototype
    Animal --------->  Animal.prototype
                            |
           prototype        |
    Rabbit ---------> Rabbit.prototype
                            |
                            |
                        new Rabbit

    As we can recall from the chapter 'prototypes/native', JavaScript itself uses prototypal inheritance
    for built-in objects. E.g. 'Date.property.[[Prototype]]' is 'Object.prototype'. That's
    why dates have access to generic object methods.
*/
class Rabbit extends Animal {
  hide() {
    console.log(`${this.name} hides!`);
  }
}

let rabbit = new Rabbit("White Rabbit");
rabbit.run(5); // White Rabbit runs with speed 5.
rabbit.hide(); // White Rabbit hides!

/*
    Information: Any expression is allowed after 'extends'

    Class syntax allows to specify not just a class, but any expression after 'extends'.

    For instance, a function call that generates the parent class.

    Here 'class User' inherits from the result of 'f("Hello").

    Thay may be useful for advanced programming patterns when we use functions to generate
    classes depending on many conditions and can inherit from them.
*/
function f(phrase) {
  return class {
    sayHi() {
      console.log(phrase);
    }
  };
}

class User extends f("Hello") {}
new User().sayHi(); // Hello

//////////////////////
// Overriding a method
//////////////////////
/*
    By default, all methods that are not specified in 'class Rabbit' are taken directly
    "as in" from 'class Animal'.

    But if we specify our own method in 'Rabbit', such as 'stop()' then it will be used instead:

    class Rabbit extends Animal {
        stop() {
            // ...now this will be used for rabbit.stop()
            // instead of stop() from class Animal
        }
    }

    Usually, however, we don't want to totally replace a parent method, but rather to build on top of it
    to tweak or extend its functionality. We do something in our method, but call the parent method
    before/after it or in the process.

    Classes provide "super" keyword for that.
    - 'super.method(...) to call a parent method.
    - 'super(...) to call a parent constructor (inside our constructor only).
*/
class Rabbit2 extends Animal {
  hide() {
    console.log(`${this.name} hides!`);
  }

  stop() {
    super.stop(); // call parent stop
    this.hide(); // and then hide
  }
}

let rabbit2 = new Rabbit2("White Rabbit");
rabbit2.run(5); // White Rabbit runs with speed 5.
rabbit2.stop(); // White Rabbit stands still. White Rabbit hides!
/*
    Information: Arrow functions have no 'super'

    As mentioned in the chapter 'function/arrow_function', arrow functions do not have
    'super'.

    If accessed, it's taken from the outer function. For instance:

    class Rabbit extends Animal {
        stop() {
            setTimeout(() => super.stop(), 1000); // call parent stop after 1sec
        }
    }

    The 'super' in the arrow function is the same as in 'stop()', so it works as intended. If we
    specified a "regular" function here, there would be an error:

    // Unexpected super
    setTimeout(function() { super.stop() }, 1000);
*/

/////////////////////////
// Overrriding contructor
/////////////////////////
/*
    Until now, 'Rabbit didn't have its own 'contructor'.

    According to the specification, if a class extends another class and has no 'contructor',
    then the following "empty" 'contructor is generated:

    class Rabbit extends Animal {
        // generated for extending classes without own constructors
        constructor(...args) {
            super(...args);
        }
    }

    As we can see, it basically calls the parent 'contructor' passing it all the arguments. That
    happens if we don't write a contructor of our own.

    Now let's add a custom constructor to 'Rabbit'. It will specify the 'earLength' in addition to
    'name':
*/

class Rabbit3 extends Animal {
  constructor(name, earLength) {
    this.speed = 0;
    this.name = name;
    this.earLength = earLength;
  }

  hide() {
    console.log(`${this.name} hides!`);
  }

  stop() {
    super.stop(); // call parent stop
    this.hide(); // and then hide
  }
}

// Doesn't work !!!
// let rabbit3 = new Rabbit3("White Rabbit", 10); // Error: this is not defined.

/*
    Constructors in inheriting classes must call 'super(...)', and (!) do it before using
    'this'.

    In JavaScript, there's a distinction between a constructor function of an inheriting class (so-called
    "derived constructor") and other functions. A derived contructor has a special internal property
    [[ContructorKind]]: "derived". That's a special internal label.

    That label affects its behavior with 'new'.
    - When a regular function is executed with 'new', it creates an empty object and assigns it to
    'this'.
    - But when a derived constructor runs, it doesn't do this. It expects the parent constructor to do
    this job.

    So a derived constructor must call super in order to execute its parent (base) constructor,
    otherwise the object for this won’t be created. And we’ll get an error.

    For the Rabbit constructor to work, it needs to call super() before using this , like here
*/
class Rabbit4 extends Animal {
  constructor(name, earLength) {
    super(name);
    this.earLength = earLength;
  }
}

let rabbit4 = new Rabbit4("White Rabbit", 10);
console.log(rabbit4.name); // White Rabbit
console.log(rabbit4.earLength); // 10

//////////////////////////
// Overriding class fields
//////////////////////////

/*
    We can override not onle methods, but also class fields.

    Although, there's a tricky behavior when we access an overriden field in parent constructor,
    quite different from most other programming languages.

    Here, class 'Rabbit' extends 'Animal' and overrides the 'name' field with its own value.

    There's no own contructor in 'Rabbit', so 'Animal' contructor is called.

    What's interesting is that in both cases: 'new Animal()' and 'new Rabbit()' and shows 'animal',

    In other words, the parent constructor always uses its own field value, not the overriden
    one.
*/
class Rabbit5 extends Animal {
  type = "rabbit";
}
new Animal(); // animal
new Rabbit(); // animal

/*
    Instead of having 'this.name' field we call 'this.showName()' method.

    Note that the output is different and that's what we naturally expect. When the parent
    constructor is called in the derived class, it uses the overriden method. But for class
    fields it's not so, the parent constructor always uses the parent field.

    The reason for the difference is because of the field initialization order. The
    class field is initialized:
    - Before constructor for the base class (that doesn't extent anything)
    - Immediately after 'super()' for the derived class

    In our case, 'Rabbit' is the derived class. There's no 'contructor()' in it. As said previously,
    that's the same as if there was an empty constructor with only 'super(...args)'.

    So, 'new Rabbit()' calls 'super()', thus executing the parent constructor, and (per the rule for
    derived classes) only after that is class fields are initialized. At the time of the parent constructor
    execution, there are no 'Rabbit' class field yet, that's why 'Animal' fields are used.

    This suble difference between fields and methods is specific to JavaScript.

    This behavior only reveals itself if an overriden field is used in the parent constructor.
    
    If it becomes a problem, one can fix it by using methods or getters/setters instead of fields.
*/
class Animal2 {
  showName() {
    // instead of this.name = 'animal'
    console.log("animal");
  }
  constructor() {
    this.showName(); // instead of console.log(this.name);
  }
}
class Rabbit6 extends Animal2 {
  showName() {
    console.log("rabbit");
  }
}
new Animal2(); // animal
new Rabbit6(); // rabbit
