// Class inheritance
/*
    Class inheritance is a way for one class to extend another class.

    So we can create a new functionality on top of the existing.
*/

////////////////////
// "extends" keyword
////////////////////
class Animal {
  constructor(name) {
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