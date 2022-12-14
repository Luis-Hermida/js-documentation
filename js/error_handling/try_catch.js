// Error handling
/*
    Usually, a script 'dies' in case of an error, printing it to the console.

    But there's a syntax construct 'try...catch' that allows us to "catch" errors so the script can,
    instead of dying, do something more reasonable.

    The "try..catch" syntax

    try {
        // code...
    } catch (err) {
        // error handling
    }

    1. First, the code in try {...} is executed.

    2. If there were no errors, then catch (err) is ignored: the execution reaches the end of
    try and goes on, skipping catch.

    3. If an error occurs, then the try execution is stopped, and control flows to the beginning of
    catch (err) . The err variable (we can use any name for it) will contain an error object
    with details about what happened.
*/
// Without errors
try {
  console.log("Start of try runs"); // (1) <--
  // ...no errors here
  console.log("End of try runs"); // (2) <--
} catch (err) {
  console.log("Catch is ignored, because there are no errors"); // (3)
}

// With errors
try {
  console.log("Start of try runs"); // (1) <--
  lalala;
  console.log("End of try runs"); // (2)
} catch (err) {
  console.log("Error has occurred!"); // (3) <--
}

/*
    Warning: 'try...catch' only works for runtime erros

    For 'try...catch' to work, the code must be runnable. In other words, it should be valid
    JavaScript.

    It won't work if the code is syntactically wrong, for instance it has unmatches curly braces

    try {
        {{{{{{{{{{{{
    } catch (err) {
        console.log("The engine can't understand this code, it's invalid");
    }

    The JavaScript engine first reads the code, and then runs it. The errors that occur on the
    reading phase are called "parse-time" errors and are unrecoverable.
    That's because the engine can't understand the code.

    So, 'try...catch' can only handle errors that occur in valid code. Such errors are called
    "runtime errors" or sometimes "exceptions".
*/

/*
    Warning: 'try...catch' works synchronously

    If an exception happens in "scheduled" code, like in 'setTimeout', then 'try...catch'
    won't catch it:

    That’s because the function itself is executed later, when the engine has already left the
    try...catch construct.

    To catch an exception inside a scheduled function, try...catch must be inside that
    function

    // This will kill the script.
    try {
      setTimeout(function () {
        noSuchVariable; // script will die here
      }, 1000);
    } catch (err) {
      console.log("won't work");
    }
*/

///////////////
// Error object
///////////////
/*
    When a error occurs, JavaScript generates an object containing the details about it. The object
    is then passed as an argument to 'catch'.

    try {
        // ...
    } catch (err) { // <-- the "error object", could use another word instead of err
        // ...
    }

    For all built-in errors, the error object has two main properties:

    'name' - Error name. For instance, for an undefined variable that's "ReferenceError".

    'message' - Textual message about error details.

    There are other non-standard properties available in most environment. One of most widely
    used and supported is:
    'stack' - Current call stack: a string with information about the sequence of nested calls that led
    to the error. Used for debugging purposes.
*/
try {
  lalala; // error, variable is not defined!
} catch (err) {
  console.log(err.name); // ReferenceError
  console.log(err.message); // lalala is not defined
  console.log(err.stack); // ReferenceError: lalala is not defined at (...call stack)
  // Can also show an error as a whole
  // The error is converted to string as "name: message"
  console.log(err); // ReferenceError: lalala is not defined
}

///////////////////////////
// Optional "catch" binding
///////////////////////////
/*
    This is a recent addition to the language. Old browsers may need polyfills.

    If we don't need error details, 'catch' may omit it:

    try {
        // ...
    } catch { // <-- without (err)
        // ...
    }
*/

//////////////////////
// Using "try...catch"
//////////////////////
/*
    JavaScript supports the 'JSON.parse(str)' method to read JSON-encoded values.

    Usually it's used to decode data received over the network, from the server or anaother source
    and we receive it and call 'JSON.parse' like this:

    let json = '{"name":"John", "age": 30}'; // data from the server
    let user = JSON.parse(json); // convert the text representation to JS object
    
    // now user is an object with properties from the string
    console.log( user.name ); // John
    console.log( user.age ); // 30

    If 'json' is malformed, 'JSON.parse' generates an error, so the script "dies".

    Here we use the 'catch' block only to show the message, but we can do much more: send a
    new network request suggest ana alternative to the visitor, send information aabout the error
    to a logging facility.
*/
let json = "{ bad json }";

try {
  let user = JSON.parse(json); // <-- when an error occurs...
  console.log(user.name); // doesn't work
} catch (err) {
  // ...the execution jumps here
  console.log(
    "Our apologies, the data has errors, we'll try to request it one more time."
  );
  console.log(err.name);
  console.log(err.message);
}
