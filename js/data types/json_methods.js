let student, json, room, meetup;
// JSON.stringify Creation
/*
    The JSON (JavaSacript Object Notation) is a general format to represent values and objects. It
    is describred as in RFC 4627 standard. Initially it was made for JavaScript, but many other
    languages have libraries to handle it as well. So it's easy to use JSON for data exchange when
    the client uses JavaScript and the server is writtern on whatever.

    JavaScript provides methods
    - JSON.stringify to converts objects into JSON.
    - JSON.parse to convert JSON back into an object.

    For instance, here we JSON.stringify a student:
*/
student = {
  name: "John",
  age: 30,
  isAdmin: false,
  courses: ["html", "css", "js"],
  wife: null,
};

json = JSON.stringify(student);

console.log(typeof json); // string
/* 
    Please note that a JSON-encoded object has several important differences from the object literal:
    - Strings use double quotes. No single quotes or backticks in JSON.
    - Object property names are double-quoted also.

    JSON-encoded object:
    {
        "name": "John",
        "age": 30,
        "isAdmin": false,
        "courses": ["html", "css", "js"],
        "wife": null
    }

    JSON.stringify can be applied to primities as well.
    - Objects { ... }
    - Arrays [ ... ]
    - Primitives:
        - strings
        - numbers
        - boolean
        - null

    JSON is data-only languague-independent specification, so some JavaScript specific object
    properties are skipped by JSON.stringify:
    - Function properties (methods).
    - Symbol keys and values.
    - Properties that store undefined.

    let user = {
        sayHi() { // ignored
        console.log("Hello");
        },
        [Symbol("id")]: 123, // ignored
        something: undefined // ignored
    };

    For JSON.stringify there's an important limitation - there must not be circular references

    let room = {
        number: 23
    };

    let meetup = {
        title: "Conference",
        participants: ["john", "ann"]
    };

    meetup.place = room; // meetup references room
    room.occupiedBy = meetup; // room references meetup
    JSON.stringify(meetup); // Error: Converting circular structure to JSON
*/

// JSON.stringify Excluding and transforming
/*
    The full syntax of JSON.stringify is:
    JSON.stringify(value, [replacer, space])
    - value: The value to encode
    - replacer: Array of properties to encode or a mapping function 'function(key, value)'.
    - space: Amount of space to use for formatting.

    Most of the time, JSON.stringify is used with the first arugment only. But if we need to fine-
    tune the replacement process, like to filter out circular references, we can use the second
    argument.

    If we pass an array of properties to it, only these properties will be encoded.
*/
room = {
  number: 23,
};

meetup = {
  title: "Conference",
  participants: [{ name: "John" }, { name: "Alice" }],
  place: room, // meetup references room
};

// Replacer
room.occupiedBy = meetup; // room references meetup
// Here we are being to strict. The property list is applied to the whole object structure. So the
// objects in 'participants' are empty, because 'name' is not in the list.
console.log(JSON.stringify(meetup, ["title", "participants"]));
// {"title":"Conference","participants":[{},{}]}

// Let's include every property except for 'room.occupiedBy' that causes the circular reference:
console.log(
  JSON.stringify(meetup, ["title", "participants", "place", "name", "number"])
);

// For better readability we can use a function insed of an array as the 'replacer'.
// The function will be called for every '(key, value)' pair and should return the "replaced" value,
// which will be used insted of the original one. Or 'undefined' if the value is to be skipped.
console.log(
  JSON.stringify(meetup, function replacer(key, value) {
    console.log(`${key}: ${value}`);
    return key == "occupiedBy" ? undefined : value;
  })
);

// Space
/*
  The third argument of JSON.stringify is the number of spaces to use for pretty formatting.

  Previously, all stringified objects had no indents and extra spaces. That's fine if we want to send
  an object over a network. The 'space' argument is used exclusively for a nice output.

  Here 'space = 2' tells JavaScript to show nested objects on multiple lines, with indentation of 2
  spaces inside an object:

  /* two-space indents:
{
    "name": "John",
    "age": 25,
    "roles": {
        "isAdmin": false,
        "isEditor": true
    }
}

for JSON.stringify(user, null, 4) the result would be more indented:
{
        "name": "John",
        "age": 25,
        "roles": {
                "isAdmin": false,
                "isEditor": true
            }
        }
*/

// Custom "toJSON"
/*
    Like 'toString' for string conversion, an object may provide method 'toJSON' for to-JSON
    conversion. 'JSON.stringify' automatically calls it if available.
*/
room = {
  number: 23,
};
meetup = {
  title: "Conference",
  date: new Date(Date.UTC(2017, 0, 1)),
  room,
};
console.log(JSON.stringify(meetup));
/*
    {
    "title":"Conference",
    "date":"2017-01-01T00:00:00.000Z", // (1)
    "room": {"number":23} // (2)
    }
*/

/*
    Here we can see that 'date' became a string. That's because all dates have a built-in
    'toJSON' method which returns such kind of string.

    Now let's add a custom 'toJSON' for our object 'room'
*/
room = {
  number: 23,
  toJSON() {
    return this.number;
  },
};

meetup = {
  title: "Conference",
  room,
};
console.log(JSON.stringify(room)); // 23
console.log(JSON.stringify(meetup));
/*
    {
    "title":"Conference",
    "room": 23
    }
*/
// As we can see, 'toJSON' is used both for the direct call JSON.stringify(room) and when
// 'roo' is nested in another encoded object.

// JSON.parse
// To decode a JSON-string, we need another method named JSON.parse
// let value = JSON.parse(str, [reviver]);
// str - JSON-string to parse.
// reviver - optional function(key, value) that will be called for each '(key, value)' pair and can
// transform the value
userData =
  '{ "name": "John", "age": 35, "isAdmin": false, "friends": [0,1,2,3] }';
user = JSON.parse(userData);
console.log(user.friends[1]); // 1

/*
    Common JSON mistakes
    let json = `{
    name: "John",                     // mistake: property name without quotes
    "surname": 'Smith',               // mistake: single quotes in value (must be double)
    'isAdmin': false                  // mistake: single quotes in key (must be double)
    "birthday": new Date(2000, 2, 3), // mistake: no "new" is allowed, only bare values
    "friends": [0,1,2,3]              // here all fine
    }`;
*/

/*
    Reviver
    The value of meetup.date is a string, not a Date object. How could JSON.parse know that
    it should transform that string into a Date.

    Let’s pass to JSON.parse the reviving function as the second argument, that returns all values
    “as is”, but date will become a Date
*/
str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';
meetup = JSON.parse(str, function (key, value) {
  if (key == "date") return new Date(value);
  return value;
});

console.log(meetup.date.getDate());

// It works for nested objects as well
schedule = `{
    "meetups": [
    {"title":"Conference","date":"2017-11-30T12:00:00.000Z"},
    {"title":"Birthday","date":"2017-04-18T12:00:00.000Z"}
    ]
    }`;

schedule = JSON.parse(schedule, function (key, value) {
  if (key == "date") return new Date(value);
  return value;
});

console.log(schedule.meetups[1].date.getDate()); // works!
