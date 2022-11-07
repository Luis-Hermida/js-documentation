/*
    There are 2 kinds of object properties.

    The first kind is data properties. We alread y know how to work with them. All properties that
    we've been using until now were data properties.

    The second type of property is something new. It's an accessor property. They are essentially
    function that execute on getting and setting a value, but look like regular properties to an
    external code.
    
*/

// Getters and setters
/*
    Accessor properties are represented by "getter" and "setter" methods. In an object literal they are
    denoted by 'get' and 'set'

    let obj = {
        get propName() {
            // getter, the code executed on getting obj.propName
        },

        set propName(value) {
            // setter, the code executed on setting obj.propName = value
        }
    };

    The getter works when 'obj.propName' is read, the setter - when it is assigned.

    For instance, we have a 'user' object with 'name' and 'surname':

    let user = {
        name: 'John',
        surname: 'Smith'
    }

    Now we want to add a 'fullName' property, that should be 'John Smith'. Of course we
    don't want to copy-past existing information. so we can implement it as an accessor:

    let user = {
      name: "John",
      surname: "Smith",

      get fullName() {
        return `${this.name} ${this.surname}`;
      },
    };

    console.log(user.fullName); // John Smith

    From the outside, an accessor property looks like a regular one. That's the idea of accessor
    properties. We don't call 'user.fullName' as a function, we read it normally; the getter runs 
    behind the scenes.

    If we try to change the fullName property we will get an error because the property only has a
    getter.
*/

let user = {
  name: "John",
  surname: "Smith",

  get fullName() {
    return `${this.name} ${this.surname}`;
  },

  set fullName(value) {
    [this.name, this.surname] = value.split(" ");
  },
};

// set fullName is executed with the given value.
user.fullName = "Alice Cooper";
console.log(user.name); // Alice
console.log(user.surname); // Cooper
console.log(user.fullName); // Alice Cooper

// Accessor .descriptors
/*
    Descriptors for accessor properties are different from those for data properties.

    For accessor properties, there is no 'value' or 'writable', but instead there are 'get' and 'set'
    functions.

    get – a function without arguments, that works when a property is read,
    set – a function with one argument, that is called when the property is set,
    enumerable – same as for data properties,
    configurable – same as for data properties

    To add an accessor property:

    Object.defineProperty(user, 'fullName', {
        get() {
            return `${this.name} ${this.surname}`;
        },

        set(value) {
            [this.name, this.surname] = value.split(" ");
        }
    });

    If we try to supply both get and value in the same descriptor, there will be an error.
*/

// Smarter getters/setters
/*
    Getters/setters can be used as wrappers over "real" property values to gain more control over
    operations with them.

    For instance, if we want to forbid too short names for 'user', we can have a setter 'name' and
    keep the value in a separate property '_name':
*/
let user = {
  get name() {
    return this._name;
  },

  set name(value) {
    if (value.length < 4) {
      console.log("Name is too short, need at least 4 characters");
      return;
    }
    this._name = value;
  },
};

user.name = "Pete";
console.log(user.name); // Pete
user.name = ""; // Name is too short...

// Using for compatibility
/*
    One of the great uses of accessors is that they allow to take control over a "regular" data property
    at any moment by replacing it with a getter and a setter and tweak its behavior.

    Imagine we started implementing user objects using data properties 'name' and 'age':
*/
function User(name, age) {
  this.name = name;
  this.birthday = age;

  // age is calculated from the current date and birthday
  Object.defineProperty(this, "age", {
    get() {
      let todayYear = new Date().getFullYear();
      return todayYear - this.birthday.getFullYear();
    },
  });
}
