// F.prototype
/*
    Remember, new objects can be created with a constructor function, like 'new F()'.

    If 'F.prototype' is an object, then the 'new' operator uses it to set '[[Prototype]]' for the
    new object.

    Information:
    JavaScript had prototypal inheritance from the beginning. It was one of the core features of
    the language.

    But in the old times, there was no direct access to it. The only thing that worked reliably was a
    "prototype" property of the constructor function, described in this chapter. So there are
    many scripts that still use it.

    /////////////

    'F.prototype' here means a regular property named "property" on "F". It
    sounds something similar to the term "prototype", but here we really mean a regular property with
    this name.

    Setting 'Rabbit.prototype = animal' literally states the following: 'When a 'new Rabbit' is
    created, assign its '[[Prototype]]' to 'animal'.
*/

let animal = {
  eats: true,
};

function Rabbit(name) {
  this.name = name;
}

Rabbit.prototype = animal;
let rabbit = new Rabbit("White Rabbit"); // rabbit.__proto__ == animal
console.log(rabbit.eats); // true

/*
    Information: 'F.prototype' only used at 'new F' time

    'F.prototype' property is only used when 'new F' is called, it assings '[[Prototype]]'
    of the new object.

    If, after the creation, 'F.prototype' property changes (F.prototype = <another object>),
    then new objects created by 'new F' will have another object as '[[Prototype]]', but
    already existing objects keep the old one.
*/

// Default F.prototype, contructor property
/*
    Every function has the "prototype" property even if we don't supply it.

    The default "prototype" is an object with the only property "constructor" that points back
    to the function itself.
*/
function Rabbit2() {}

// by default:
// Rabbit.prototype = { constructor: Rabbit }
console.log(Rabbit2.prototype.constructor == Rabbit2); // true

let rabbit2 = new Rabbit2(); // inherits from {constructor: Rabbit}
console.log(rabbit2.constructor == Rabbit2); // true (from prototype)
/*
    We can use constructor property to create a new object using the same constructor as the
    existing one.
*/
function Dog(name) {
  this.name = name;
  console.log(name);
}

let dog = new Dog("White Rabbit");
let dog2 = new rabbit.constructor("Black Rabbit");

console.log(dog);
console.log(dog2);
console.log(dog2.constructor);
/*
    That’s handy when we have an object, don’t know which constructor was used for it (e.g. it comes
    from a 3rd party library), and we need to create another one of the same kind.

    But probably the most important thing about "constructor" is that JavaScript itself does not ensure
    the right "constructor" value.

    Yes, it exists in the default "prototype" for functions, but that’s all. What happens with it later
    – is totally on us.

    In particular, if we replace the default prototype as a whole, then there will be no
    "constructor" in it.
*/
function Cat() {}
Cat.prototype = {
  jumps: true,
};

let cat = new Cat();
console.log(cat.constructor === Cat); // false

/*
    So, to keep the right "constructor" we can choose to add/remove properties to the default
    "prototype" instead of overwriting it as a whole:
*/
Cat.prototype.jumps = true;
// Or add it manually
Cat.prototype = {
  jumps: true,
  constructor: Cat,
};
