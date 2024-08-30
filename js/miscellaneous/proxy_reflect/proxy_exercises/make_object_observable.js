/*
An object returned by makeObservable is just like the original one, but also
has the method observe(handler) that sets handler function to be called on any property
change.

Whenever a property changes, handler(key, value) is called with the name and value of
the property
*/

let handlers = Symbol('handlers');
function makeObservable(target) {
    // 1. Initialize handlers store
    target[handlers] = [];

    // Store the handler function in array for future calls
    target.observe = function (handler) {
        this[handlers].push(handler);
    };

    // 2. Create a proxy to handle changes
    return new Proxy(target, {
        set(target, property, value, receiver) {
            let success = Reflect.set(...arguments); // forward the operation to object
            if (success) { // if there were no error while setting the property
                // call all handlers
                target[handlers].forEach(handler => handler(property, value));
            }
            return success;
        }
    });
}

let user = {};
user = makeObservable(user);

user.observe((key, value) => {
    console.log(`SET ${key}=${value}`);
});

user.name = "John";