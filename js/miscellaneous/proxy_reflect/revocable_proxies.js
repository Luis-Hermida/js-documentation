/*
    //////////
    // Revocable proxies
    //////////

    A revocable proxy is a proxy that can be disabled.

    Let's say we have a resource, and would like to close access to it at any moment.

    What we can do is wrap it into a revocable proxy, without any traps. Such a proxy will forward
    operations to object, and we can disable it at any moment.

    Syntax: 
    let {proxy, revoke} = Proxy.revocable(target, handler)

    The call returns an object with the 'proxy' and 'revoke' function to disable it.

*/
let object = {
  data: "Valuable data",
};
let { proxy, revoke } = Proxy.revocable(object, {});

// pass the proxy somewhere instead of object...
console.log(proxy.data); // Valuable data

// later in our code
revoke();

// the proxy isn't working any more (revoked)
// console.log(proxy.data); // Error

/*
    A call to 'revoke()' removes all internal references to the target object from the proxy, so they
    are no longer connected.

    Initially, 'revoke' is separate from 'proxy', so that we can pass 'proxy' around while leaving
    'revoke' in the current scope.

    We can also bind 'revoke' method to proxy by setting 'proxy.revoke = revoke'.

    Another option is to create a 'WeakMap' that has a 'proxy' as the key and the corresponding
    'revoke' as the value, that allows to easily find 'revoke' for a proxy.
*/
let revokes = new WeakMap();

let objectMap = {
  data: "Valuable data",
};

let { proxy: proxyMap, revoke: revokeMap } = Proxy.revocable(objectMap, {});
revokes.set(proxyMap, revokeMap);

revokeMap = revokes.get(proxyMap);
revokeMap();
// console.log(proxyMap.data); // Error (revoked)
