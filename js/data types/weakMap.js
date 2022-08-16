let weakMap, obj;
// WeakMap
// All keys must be objects, not primitive values

weakMap = new WeakMap();
obj = {};
weakMap.set(obj, "ok"); // works fine (object key)
// can't use a string as the key
// weakMap.set("test", "Whoops"); // Error, because "test" is not an object

john = { name: "John" };
weakMap = new WeakMap();
weakMap.set(john, "...");
john = null; // overwrite the reference
// john is removed from memory!

// WeakMap doesn't support iteration methods keys(), values() or entries()
// only get(key), set(key, value), delete(key) and has(key)

// Main application of WeakMap is additional data storage
// We put the data to a WeakMap , using the object as the key, and when the object is garbage
// collected, that data will automatically disappear as well
weakMap.set(john, "secret documents");
// If John dies, secret documents will be destroyed automatically

// For instance, we have code that keeps a visit count for users. The information is stored in a map:
// a user object is the key and the visit count is the value. When a user leaves (its object gets
// garbage collected), we don’t want to store their visit count anymore.

// Caching
// We can store (“cache”) results from a function, so that future calls on the same object can reuse it.
let cache = new WeakMap();
// calculate and remember the result
function process(obj) {
  if (!cache.has(obj)) {
    let result = /* calculate the result for */ obj;
    cache.set(obj, result);
  }
  return cache.get(obj);
}
obj = { number: 1 };
let result1 = process(obj);
let result2 = process(obj);
obj = null;
// Can't get cache.size, as it's a WeakMap,
// but it's 0 or soon be 0
// When obj gets garbage collected, cached data will be removed as well
