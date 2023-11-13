/*
    //////////
    // Reflect
    //////////

    'Reflect' is a built-in object that simplifies the creaton of 'Proxy'.

    It was said previously that internal methods, such as [[Get]], [[Set]] and other are
    specification-only, they can be called directly.

    The 'Reflect' object makes that somewhat possible. Its methods are minimal wrappers around
    the internal methods.

    Some examples:
    Operation           // Reflect call                      // Internal method
    obj[prop]           // Reflect.get(obj, prop)            // [[Get]]
    obj[prop] = value   // Reflect.set(obj, prop, value)     // [[Set]]
    delete obj[prop]    // Reflect.deleteProperty(obj, prop) // [[Delete]]
    new F(value         // Reflect.construct(F, value)       // [[Construct]
*/

let emptyUser = {};
Reflect.set(emptyUser, "name", "John");
console.log(emptyUser.name); // John

/*
    In particular, 'Reflect' allow us to call operators ('new', 'delete', ...) as functions
    ('Reflect.construct', 'Reflect.deleteProperty', ...).

    For every internal method, trappable by 'Proxy', there's a corresponding method in
    'Reflect', with the same name and arguments as the 'Proxy' trap.

    So we can use 'Reflect' to forward an operation to the original object.

    In this example, both traps 'get' and 'set' transparently (as if they didn't exist) forward
    reading/writing operations to the object.

    Here:
    1. 'Reflect.get' reads an object property.
    2. 'Reflect.set' writes an object property and returns 'true' if sucessful, 'false' otherwise.

    That's it everything simple: if a trap wants to forward the call to the object, it's enough to call
    'Reflect.<method>' with the same arguments.

    In most cases we can do the same without 'Reflect', for instance, reading a property
    'Reflect.get(target, prop, receiver)' can be replaced by 'target[prop]'.
*/
let user = {
  name: "John",
};

user = new Proxy(user, {
  get(target, prop, receiver) {
    console.log(`GET ${prop}`);
    return Reflect.get(target, prop, receiver); // (1)
  },
  set(target, prop, val, receiver) {
    console.log(`SET ${prop}=${val}`);
    return Reflect.set(target, prop, val, receiver); // (2)
  },
});

let name = user.name; // shows "GET name"
user.name = "Pete"; // shows "SET name=Pete"
