// Private and protected properties and methods

//////////////////////////////////
// Internal and external interface
//////////////////////////////////
/*
    In object-oriented programming, properties and methods are split into two groups:
    - Internal interface - methods and properties, accessible from other methods of the class, but
    not from the outside.
    - External interface - methods and properties, accessible also from outside the class.

    In JavaScript, there are 2 types of object fields (properties and methods):
    - Public: accessible from anywhere. They comprise the external interface. Until now we were
    only using public properties and methods.
    - Private: accessible only from inside the class. These are for the internal interface.

    In many other languages there also exist "protected" fields: accessible only from inside the class 
    and those extending it (like private, but plus access from inheriting classses). They are also useful
    for the internal interface. They are in a sense more widespread than private ones, because we
    usually want inheriting classes to gain access to them.

    Protected fields are not implemented in JavaScript on the laguage level, but in practice they are
    very convenient, so they are emulated.
*/

/*
    // Protecting "waterAmount"

    class CoffeeMachine {
      waterAmount = 0; // the amount of water inside
      constructor(power) {
        this.power = power;
        console.log(`Created a coffee-machine, power: ${power}`);
      }
    }

    // create the coffee machine
    let coffeeMachine = new CoffeeMachine(100);

    // add water
    coffeeMachine.waterAmount = 200;

    Right now the properties 'waterAmount' and 'power' are public. We can easily get/set them
    from the outside to any value.

    Let's change 'waterAmount' property to protected to have more control over it. For instance, we
    don't want anyone to set it below zero.

    Protected properties are usually prefixed with an underscore. It's not enforces but there's a well-know
    convention between programmers that such properties and methods should not be accessed from the outside.
*/
class CoffeeMachine {
  _waterAmount = 0;

  set waterAmount(value) {
    if (value < 0) {
      value = 0;
    }
    this._waterAmount = value;
  }

  get waterAmount() {
    return this._waterAmount;
  }

  constructor(power) {
    this._power = power;
  }
}

// create the coffee machine
let coffeeMachine = new CoffeeMachine(100);

// add water
coffeeMachine.waterAmount = -10; // _waterAmount will become 0, not -10

////////////////////
// Read-only "power"
////////////////////
/*
  For 'power' property, let's make it read-only. It sometimes happends that a property must be set at
  creation time only, and then never modified.

  // Proper Getter/Setter
  class CoffeeMachine {
    _waterAmount = 0;

    setWaterAmount(value) {
      if (value < 0) value = 0;
      this._waterAmount = value;
    }

    getWaterAmount() {
      return this._waterAmount;
    }
  }

  new CoffeeMachine().setWaterAmount(100);

  That looks a bit longer, but functions are more flexible. They can accept multiple arguments

  On the other hand, get/set syntax is shorter, so ultimately there's no stric rule.
*/
/*
  Information: Protected fields are inherited.

  If we inherit 'class MegaMachine extends CoffeeMachine', then nothing prevents us
  from accessing 'this._waterAmount' or 'this._power' from the methods of the new
  class.

  So protected fields are naturally inheritable, Unlike private ones.
*/

////////////////////////
// Private '#waterLimit'
////////////////////////
/*
  This is a recent addition to the language. Not supported in JavaScript engines or supported
  partially yet, it requires polyfilling.

  There's a finished JavaScript proposal, almost in the standard, that provides language-level
  support for private properties and methods.

  Privates shoul start with '#'. They are only accessible from inside the class.

  For instance, here's a private '#waterLimit' property and the water-checking private method
  '#fixWaterAmount'

  On the language level, '#' is a special sign that the field is private. We can't access it frm outside
  or from inheriting classes.

  Private fuields do not conflict with public ones. We can have both private '#waterAmount' and
  public 'waterAmount' fields at the same time.
*/
class CoffeeMachine2 {
  #waterLimit = 200;

  #fixWaterAmount(value) {
    if (value < 0) return 0;
    if (value > this.#waterLimit) return this.#waterLimit;
  }

  setWaterAmount(value) {
    this.#waterLimit = this.#fixWaterAmount(value);
  }
}

let coffeeMachine = new CoffeeMachine2();
// can't access privates from outside of the class
// coffeeMachine.#fixWaterAmount(123); // Error
// coffeeMachine.#waterLimit = 1000; // Error

// Make an accessor for '#waterAmount'
class CoffeeMachine3 {
  #waterAmount = 0;

  get waterAmount() {
    return this.#waterAmount;
  }

  set waterAmount(value) {
    if (value < 0) value = 0;
    this.#waterAmount = value;
  }
}

let machine = new CoffeeMachine3();
machine.waterAmount = 100;
// console.log(machine.#waterAmount); // Error

/*
  Unlike protected ones, private fields are enforced by the language itself. That's a good thing.

  But if we inherit from 'CoffeeMachine', then we'll have no direct access to '#waterAmount'.
  We'll need to rely on 'waterAmount' getter/settern
*/
class MegaCoffeeMachine extends CoffeeMachine {
  method() {
    // console.log(this.#waterAmount); // Error: can only access from CoffeeMachine
  }
}

/*
  Warning: Private fields are not available as this[name]

  Private fields are special.

  As we know, usually we can access fields using 'this[name]':

  With private fields that's impossible: 'this['#name']' doesn't work. That's a syntax
  limitation to ensure privacy.
*/

class User {
  sayHi() {
    let fieldName = "name";
    console.log(`Hello, ${this[fieldName]}`);
  }
}
