// new.target
// Inside a function, we can check whether it was called with new or without it, using a special new.target property.

function User() {
  console.log(new.target);
}

// without "new":
User(); // undefined

// with "new":
new User(); // function User { ... }

// That can be used inside the function to know whether it was called with new , “in constructor
// mode”, or without it, “in regular mode”
function User(name) {
  if (!new.target) {
    // if you run me without new
    return new User(name); // ...I will add new for you
  }
  this.name = name;
}
let john = User("John"); // redirects call to new User
alert(john.name); // John
