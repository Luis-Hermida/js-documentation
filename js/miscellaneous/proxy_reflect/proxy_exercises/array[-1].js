let array = [1, 2, 3];

array = new Proxy(array, {
    get(target, prop, receiver) {
        if (prop < 0) {
            // even if we access it like arr[1]
            // prop is a string, so need to convert it to number
            prop = +prop + target.length;
        } else if (prop < target.length) {
            return target[prop]
        } else {
            return 'wtf man out of scope'
        }
        return Reflect.get(target, prop);
    }
});

console.log(array[-1]); // 3
console.log(array[-2]); // 2
console.log(array[-3]); // 1
console.log(array[0]); // 1
console.log(array[3]); // 'out of scope'