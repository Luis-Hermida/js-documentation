let user = {
    name: "John"
};

function wrap(target) {
    return new Proxy(target, {
        get(target, prop, receiver) {
            // return Reflect.get(target, prop, receiver); Will return 'undefined' and no error will be thrown
            if (prop in target) {
                return Reflect.get(target, prop, receiver);
            } else {
                return `Property doesn't exist: "${prop}"`
                // throw new ReferenceError(`Property doesn't exist: "${prop}"`) // To avoid noise on logs
            }
        }
    });
}

user = wrap(user);
console.log(user.name); // John
console.log(user.age); // ReferenceError: Property doesn't exist: "age"