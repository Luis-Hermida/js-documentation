console.log("Script evaludated");

export let admin = {
  name: "John",
};

export let config = {};

export function sayHi() {
  console.log(`Ready to serve, ${config.user}!`);
}

export function printMeta() {
  console.log(import.meta);
}

export function printMeta2() {
  console.log(import.meta);
}

export { printMeta2 as meta2 };

export default class User {
  constructor(name) {
    this.name = name;
  }
}
