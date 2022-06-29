// Cloning
let user = {
  name: "John",
  lastName: "Pepe",
  age: 30,
};

// Manually
let clone = {}; // the new empty object
// let's copy all user properties into it
for (let key in user) {
  clone[key] = user[key];
}
// now clone is a fully independent object with the same content
clone.name = "Pete"; // changed the data in it
console.log(user.name); // still John in the original object

// Object assign
let permissions1 = { canView: true, lastName: "" };
let permissions2 = { canEdit: true };
Object.assign(user, permissions1, permissions2);

// If the copied property name already exists, it gets overwritten
console.log(user); // { name: "John", canView: true, canEdit: true, lastName: "" }

// To new object
const clone = Object.assign({}, user);
// Const objects can be modified
close.name = "Clone";
