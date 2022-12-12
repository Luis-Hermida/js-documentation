// Extending built-in classes
/*
    Built-in classes like Array, Map and others are extendable also.
    
    Please note a very interesting thing. Build-in methods like 'filter', 'map' and others - reutnr
    new objects of exactly that inherited type 'PowerArray'. Their internal implementation uses the
    object's 'constructor' property for that.


*/
// add one more method to it (can do more)
class PowerArray extends Array {
  isEmpty() {
    return this.length === 0;
  }
}

let arr = new PowerArray(1, 2, 5, 10, 50);
console.log(arr.isEmpty()); // false

let filteredArr = arr.filter((item) => item >= 10);
console.log(filteredArr); // 10, 50
console.log(filteredArr.isEmpty()); // false

/*
    When 'arr.filter()' is called, it internally creates the new array of results using exactly
    'arr.contructor', not basic 'Array'. That allow us to keep using 'PowerArray' methods.

    Even more, we can customize that behavior.

    We can add a special static getter 'Symbol.species' to the class. If it exists, it should return
    the constructor that JavaScript will use internally to create new entities in 'map', 'filter' and
    so on.

    If we'd like built-in methods like 'map' or 'filter' to return regular arrays, we can return 'Array'
    in 'Symbol.species'.
*/

class PowerArray2 extends Array {
  isEmpty() {
    return this.length === 0;
  }

  // built-in methods will use this as the constructor
  static get [Symbol.species]() {
    return Array;
  }
}
let arr2 = new PowerArray2(1, 2, 5, 10, 50);
console.log(arr2.isEmpty()); // false

// filter creates new array using arr.constructor[Symbol.species] as constructor
let filteredArr2 = arr2.filter((item) => item >= 10);
// filteredArr is not PowerArray, but Array
// console.log(filteredArr2.isEmpty()); // Error: filteredArr.isEmpty is not a function

/////////////////////////////////////
// No static inheritance in built-ins
/////////////////////////////////////
/*
    Built-in objects have their own static methods, for instance 'Object.keys', 'Array.isArray'.

    As we already know, native classes extend each other. For instance. 'Array' extends 'Object'.

    Normally, when one class extends another, both static and non-static methods are inherited. That
    was thoroughly explained on 'classes/static'.

    But built-in classes are an expection. They don't inherit statics from each other.

    For example, both 'Array' and 'Date' inherit from 'Object', so their instances have methods
    from 'Object.prototype'. But 'Array[[Prototype]]' doesn't reference 'Object', so there's no
    'Array.keys()' or 'Date.keys()' static method.

    There’s no link between Date and Object. They are independent, only
    Date.prototype inherits from Object.prototype .

    That’s an important difference of inheritance between built-in objects compared to what we get
    with extends
*/
