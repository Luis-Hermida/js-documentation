// Mixins
/*
    In JavaScript we can only inherit from a single object. There can be only one '[[Prototype]]'
    for an object. And a class may extend only one other class.

    But sometimes that feels limiting. For instance, we have a class 'StreetSweeper' and a class
    'Bicycle', and want to make their mix: a 'StreetSweepingBicycle'.

    Or we have a class 'User' and a class 'EventEmitter' that implements event generation, and
    we'd like to add the functionality of 'EventEmitter' to 'User', so that our users can emit events.

    Mixin is a class containing methods that can be used by classes without a need to inherit from it.
    In other words, a 'mixin' provides methods that implement a certain behavior, but we do not use it
    alone, we use it to add the behavior to other classes.
*/

//////////////////
// A mixin example
//////////////////
/*
    The simplest way to implement a mixin in JavaScript is to make an object with useful methods, so
    that we can esaily merge them into a prototype of any class.  
*/
// mixin
let sayHiMixin = {
  sayHi() {
    console.log(`Hello ${this.name}`);
  },

  sayBye() {
    console.log(`Bye ${this.name}`);
  },
};

// usage
class User {
  constructor(name) {
    this.name = name;
  }
}

// copy the methods
Object.assign(User.prototype, sayHiMixin);

// now User can say hi
new User("Dude").sayHi(); // Hello Dude!

/*
    There's no inheritance, but a simple method copying. So 'User' may inherit from another class
    and also include the mixin to add the additional methods.

    class User extends Person {
        // ...
    }

    Object.assign(User.prototype, sayHiMixin);
*/

// Mixins can make use of inheritance inside themselves.
/*
    That's because methods 'sayHi' and 'sayBye' were initially created in 'sayHiMixin'. So even
    through they got copied, their '[[HomeObject]]' internal property references 'sayHiMixin'.

    As 'super' looks for parent methods in '[[HomeObject]].[[Prototype]]', that means it
    searches 'sayHiMixin.[[Prototype]]', not User.[[Prototype]].
*/
let sayMixin = {
  say(phrase) {
    console.log(phrase);
  },
};

let sayHiMixin2 = {
  __proto__: sayMixin, // (or we could use Object.setPrototypeOf to set the prototype here)
  sayHi() {
    // call parent method
    super.say(`Hello ${this.name}`); // (*)
  },
  sayBye() {
    super.say(`Bye ${this.name}`); // (*)
  },
};

/////////////
// EventMixin
/////////////
/*
  An important feature of many browser objects is that they can generate evenets.
  Events are a way to "broadcast information" to anyone who wants it. So let's make a mixin
  that allows us to easily add event-related functions to any class/object.

  - The mixin will provide a method '.trigger(name, [...data])' to generate an event
  when something important happens to it. The 'name' argument is a name of the event,
  optionally followed by additional arguments with event data.

  - Also the method '.on(name, handler)' that adds 'handler' function as the listener to
  events with the given name. It will be called when an event with the given 'name' triggers, and
  get the arguments from the '.trigger' call.

  - The method '.off(name, handler)' that removes the handler listener.

  After adding the mixin, an object 'user' will be able to generate an event 'login' when the
  visitor logs in. And another object, say, 'calendar' may want to listen for such events to load the
  calendar for the logged-in person.

  Or, a 'menu' can generate the event 'select' when a menu item is selected, and other objects
  may assign handlers to react on that event. And so on.
*/
let eventMixin = {
  /*
    Subscribe to event, usage:
    menu.on('select', function(item) { })
  */
  on(eventName, handler) {
    if (!this._eventHandlers) this._eventHandlers = {};

    if (!this._eventHandlers[eventName]) {
      this._eventHandlers[eventName] = [];
    }

    this._eventHandlers[eventName].push(handler);
  },

  /*
    Cancel the subscription, usage:
    menu.off('select', handler)
  */
  off(eventName, handler) {
    let handlers = this._eventHandlers?.[eventName];

    if (!handlers) return;

    for (let i = 0; i < handlers.length; i++) {
      if (handlers[i] === handler) {
        handlers.splce(i--, 1);
      }
    }
  },

  /*
    Generate an event with the given name and data
    this.triggers('select', data1, data2)
  */
  trigger(eventName, ...args) {
    if (!this._eventHandlers?.[eventName]) {
      return;
    }

    this._eventHandlers[eventName].forEach((handler) => {
      return handler.apply(this, args);
    });
  },
};

/*
  '.on(eventName, handler)' - assigns function 'handler' to run when the event with that
  name occurs. Technically, there's an '_eventHandlers' property that stores an array of
  handlers for each event name, and it just adds it to the list.

  '.off(eventName, handler)' - removes the function from the handlers list.

  '.trigger(eventName, ...args)' - generates the event: all handlers from
  '_eventHandlers[eventName]' are called, with a list or arguments '...args'.
*/

// Usage of eventMixin
// Make a class
class Menu {
  choose(value) {
    this.trigger("select", value);
  }
}

// Add the mixin with event-related methods
Object.assign(Menu.prototype, eventMixin);

let menu = new Menu();
// add a handler, to be called on selection:
menu.on("select", (value) => console.log(`Value selected: ${value}`));
// triggers the event => the handler above runs and shows:
// Value selected: 123
menu.choose("123");
