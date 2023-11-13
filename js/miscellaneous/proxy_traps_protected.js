/*
    //////////
    // Protected properties with “deleteProperty” and other traps
    //////////

    There's a widespread convention that properties and methods prefixed by an underscore '_' are
    internal and they shouldn't be accessed from outside the object.

    Let's use proxies to prvent any access to properties starting with '_'.

    We'll use the traps:
    - 'get' to throw an error when reading such property
    - 'set' to throw an error when writing
    - 'deleteProperty' to throw an error when deleting
    - 'ownKeys' to exclude properties starting with _ from 'for..in' and methods like
    'Object.keys'
*/

let user = {
  name: "John",
  _password: "***",

  checkPassword(value) {
    return value === this._password;
  },
};

user = new Proxy(user, {
  get(target, prop) {
    if (prop.startsWith("_")) {
      throw new Error("Access denied");
    }
    let value = target[prop];
    return typeof value === "function" ? value.bind(target) : value; // (*)
  },

  // to intercept property writing
  set(target, prop, val) {
    if (prop.startsWith("_")) {
      throw new Error("Access denied");
    } else {
      target[prop] = val;
      return true;
    }
  },

  // to intercept property deletion
  deleteProperty(target, prop) {
    if (prop.startsWith("_")) {
      throw new Error("Access denied");
    } else {
      delete target[prop];
      return true;
    }
  },

  ownKeys(target) {
    // to intercept property list
    return Object.keys(target).filter((key) => !key.startsWith("_"));
  },
});

// "get" doesn't allow to read _password
try {
  console.log(user._password); // Error: Access denied
} catch (e) {
  console.log(e.message);
}

// "set" doesn't allow to write _password
try {
  user._password = "test"; // Error: Access denied
} catch (e) {
  console.log(e.message);
}

// "deleteProperty" doesn't allow to delete _password
try {
  delete user._password; // Error: Access denied
} catch (e) {
  console.log(e.message);
}

// "ownKeys" filters out _password
for (let key in user) console.log(key); // name

/*
    Note that on (*) in the get we can see:

    `
    get(target, prop) {
        if (...) {...};

        let value = target[prop];
        return (typeof value === 'function') ? value.bind(target) : value; // (*)
    }
    `

    We are calling 'value.bind(target)', to be able to pass the object with the '_password' to ther methods
    like 'user.checkPassword()'.
*/
console.log(user.checkPassword("***")); // true
console.log(user.checkPassword("123")); // false

/*
    A call to 'user.checkPassword()' gets a proxied 'user' as 'this' (the object before
    dot becomes 'this'), so when it tries to access 'this._password', the 'get' trap activates
    (it triggers on any property read) and throws an error.

    So we bing the context of object methods to the original object, 'target' in the line (*). Then
    their future calls will use 'target' as 'this' without any traps.

    That solution usually works, but isn't ideal, as a method may pass the unproxied object
    somewhere else, and then we'll get messed up: where's the original object, and where's the
    proxied one.

    Besides, an object may be proxied multiple times (multiple proxies may add different "tweaks" to
    the object), and if we pass an unwrapped object to a method, there may be unexpected consequenses. 
*/

/*
    Information: Private properties of a class

    Modern JavaScript engines natively support private properties in classes, profixed with '#'.
    No proxies required.

    But such properties have their own issues. Private in particular they are not inherited.
*/
