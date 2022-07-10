/*
The main concept of memory management in JavaScript is reachability.
Simply put, “reachable” values are those that are accessible or usable somehow. They are
guaranteed to be stored in memory.

http://jayconrod.com/posts/55/a-tour-of-v8-garbage-collection
*/

// One reference
// user has a reference to the object
let user = { name: "John" };

// If the value of user is overwritten, the reference is lost
user = null;
// Now John becomes unreachable. There’s no way to access it, no references to it. Garbage
// collector will junk the data and free the memory.

// Two references
user = { name: "John" };
admin = user;
user = null;
// Reference still exists on admin

// Interlinked objects
function marry(man, woman) {
  woman.husband = man;
  man.wife = woman;

  return {
    father: man,
    mother: woman,
  };
}

let family = marry(
  {
    name: "John",
  },
  {
    name: "Ann",
  }
);

delete family.father;
// /It’s not enough to delete only one of these two references, because all objects would still be reachable.
delete family.mother.husband;
// Reference to family mother reference still exists.

// Unreachability
family = null;
