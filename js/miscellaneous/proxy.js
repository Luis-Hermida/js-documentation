/*
    //////////
    // Proxy
    //////////

    A 'proxy' object wraps another object and intercepts operations, like reading/writing properties
    and others, optionally handling them on its own, or transparently allowing the object to handle
    them.

    Proxies are used in many libraries and in some frameworks. And it has many practical applications.
*/
/*
    Syntax:
    `let proxy = new Proxy(target, handler)`

    - 'target' - is an object to wrap
    - 'handler' - proxy configuration: an objects with "traps", methods that intercept operatoins.
    e.g. 'get' trap for reading a property of 'target', 'set' trap for writing a property into
    'target', and so on.

    For 'proxy' operations, if there's a correspoinding trap in 'handler', then it runs,
    and the proxy has a change to handle it, otherwise the operation is performed on 'target'.

    Proxy without any traps:
*/
let target = {};
let proxy = new Proxy(target, {}); // empty handler

proxy.test = 5; // writing to proxy (1)
console.log(target.test); // 5, the property appeared in target!
console.log(proxy.test); // 5, we can read it from proxy too (2)

for (let key in proxy) console.log(key); // test, iteration works (3)
/*
    As there are not traps, all operations on 'proxy' are forwarded to 'target'.

    1. A writing operation 'proxy.test=' sets the value on 'target'.
    2. A reading operation 'proxy.test=' retunrs the value from 'target'.
    3. Iteration over 'proxy' returns values from 'target'.

    As we can see, without any traps, 'proxy' is a transparent wrapper around 'target'.

    'Proxy' is a special "exotic object". It doesn't have own properties. With an empty 'handler' it
    transparently forwards operations to 'target'.

    To activate more capabilities, we have to add traps.

    For most operations on objects, there's so-called "internal method" in the JavaScript
    specification that describes how it works at the lowest level. For instance '[[Get]]', the internal
    method to read a property, '[[Set]]', the internal method to write a property, and so on. These
    methods are only used in the specification, we can't call them directly by name.

    Proxy traps intercept invocations of these methods. They are listed in the 'Proxy specification'
    and in the table below.

    For every internal method, there's a trap in this table: the name of the method that we can add to
    the 'handler' parameter of 'new Proxy' to intercept the operation:

    Internal Method         // Handler Method           // Triggers when…
    [[Get]]                 // get                      // reading a property
    [[Set]]                 // set                      // writing to a property
    [[HasProperty]]         // has                      // in operator
    [[Delete]]              // deleteProperty           // delete operator
    [[Call]]                // apply                    // function call
    [[Construct]]           // construct                // new operator
    [[GetPrototypeOf]]      // getPrototypeOf           // Object.getPrototypeOf
    [[SetPrototypeOf]]      // setPrototypeOf           // Object.setPrototypeOf
    [[IsExtensible]]        // isExtensible             // Object.isExtensible
    [[PreventExtensions]]   // preventExtensions        // Object.preventExtensions
    [[DefineOwnProperty]]   // defineProperty           // Object.defineProperty, Object.defineProperties
    [[GetOwnProperty]]      // getOwnPropertyDescriptor // Object.getOwnPropertyDescriptor, for..in, Object.keys/values/entries
    [[OwnPropertyKeys]]     // ownKeys                  // Object.getOwnPropertyNames, Object.getOwnPropertySymbols, for..in,
                                                           Object.keys/values/entries
*/
/*
    Warning: Invariants

    JavaScript enforces some invariants - conditions that must be fulfilled by internal methods
    and traps.

    Most of them are for return values:
    - [[Set]] must return 'true' if the value was written, otherwise 'false'.
    - [[Delete]] must return 'true' if the value was deleted sucessfully, otherwise 'false'.
    ...and so on.

    There are some other invariants, like:
    - '[[GetPrototypeOf]]', applied to the proxy object must return the same value as
    '[[GetPrototypeOf]]' applied to the proxy object's target object. In other words,
    reading a prototype of a proxy must always return the prototype of the target object.

    Traps can intercept these operations, but they must follow those rules.

    Invariants ensure correct and consistent behavior of language features. The full invariants list
    is in the specification (https://tc39.es/ecma262/#sec-proxy-object-internal-methods-and-internal-slots)
    You probably won't violate them if you're not doing something weird.
*/
