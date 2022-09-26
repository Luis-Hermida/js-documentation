function f(x) {
  console.log(x);
}

// create wrappers
let f1000 = delay(f, 1000);
let f1500 = delay(f, 1500);

function delay(f, ms) {
  return function () {
    setTimeout(() => f.apply(this, arguments), ms);
  };
}

f1000("test"); // shows "test" after 1000ms
f1500("test"); // shows "test" after 1500ms
