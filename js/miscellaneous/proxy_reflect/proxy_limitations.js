/*
    //////////
    // Proxy limitations
    //////////

    Proxies provide an unique way to alter or tweak the behavior of the existing objects at the lowest
    level. Still, it's not pefect. There are limitations.

    // Internal Slots

    Many built-in objects, for example 'Map', 'Set', 'Date', 'Promise' and others make use of
    so-called "internal slots".

    These are like properties, but reserved for internal, specification-only purposes. For instance
    'Map' stores items in the internal slot '[[MapData]]'. Built-in methods access them directly, not via
    '[[Get]]/[[Set]]' internal methods. So 'Proxy' can't intercept that.

    The issue here is that after a built-in object like that gets proxied, the proxy doesn't have these
    internal slots, so any built-in methods will fail.

    `
    let map = new Map();
    let proxy = new Proxy(map, {});
    proxy.set('test', 1); // Error
    `

    Internally, a 'Map' stores all data in its '[[MapData]]' internal slot. The proxy doesn't have such slot,
    so the built-in method 'Map.prototype.set', it tries to access the internal property 'this.[[MapData]]',
    but because 'this=proxy', can't find it in the 'proxy' and just fails.

*/
let map = new Map();

let proxy = new Proxy(map, {
  get(target, prop, receiver) {
    let value = Reflect.get(...arguments);
    return typeof value == "function" ? value.bind(target) : value;
  },
});

proxy.set("test", 1);
console.log(proxy.get("test")); // 1 (works!)

/*
    // Private Fields

    Private fields are implemented using internal slots, so JavaScript doesn't use
    '[[Get]]/[[Set]]' when accessing them.

    If we call a method that returns a private variable the value of 'this' is the proxied 'user', 
    and it doesn't have the slot with private fields.

    We can use binding to make it work, but it will have some drawbacks, it exposes the original
    object to the method, allowing to be passed further and breaking the proxy.

*/

class User {
  #name = "Guest";
  getName() {
    return this.#name;
  }
}

let user = new User();

user = new Proxy(user, {
  get(target, prop, receiver) {
    let value = Reflect.get(...arguments);
    return typeof value == "function" ? value.bind(target) : value;
  },
});

console.log(user.getName()); // Guest
