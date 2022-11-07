/*
    Property flags and descriptors

    As we know, objects can store properties.

    Until now, a property was a simple "key-value" pair to us. But an object property is actually a
    more flexible and powerful thing.
*/

// Property Flags
/*
    Object properties, besides a 'value', have three special attributes called flags:
    - writable - If true, the value can be changed, otherwise it's read-only.
    - enumerable - If true, then listed in loops, otherwise not listed.
    - configurable - If true, the property can be deleted and these attributes can be modified,
    otherwise not.

    By default all of the flags are 'true'.

    To get those flags we have to use the method 'Object.getOwnPropertyDescriptor' to query the full
    information about a property

    let descriptor = Object.getOwnPropertyDescriptor(obj, propertyName);
*/
let user = {
  name: "John",
};

let descriptor = Object.getOwnPropertyDescriptor(user, "name");
console.log(JSON.stringify(descriptor, null, 2));
/* property descriptor:
    {
        "value": "John",
        "writable": true,
        "enumerable": true,
        "configurable": true
    }
*/

// To change the flags.
// We use 'Object.defineProperty'
// Object.defineProperty(obj, propertyName, descriptor)
user = {};
Object.defineProperty(user, "name", {
  value: "John",
});
descriptor = Object.getOwnPropertyDescriptor(user, "name");
console.log(JSON.stringify(descriptor, null, 2));
/*
    {
        "value": "John",
        "writable": false,
        "enumerable": false,
        "configurable": false
    }
*/
