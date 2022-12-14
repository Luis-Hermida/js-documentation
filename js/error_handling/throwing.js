//////////
// Trowing
//////////
/*
    What if 'json' is syntactically correct, but doesn't have a required 'name' property.

    let json = '{ "age": 30 }'; // incomplete data
    try {
        let user = JSON.parse(json); // <-- no errors
        console.log( user.name ); // no name!
    } catch (err) {
        console.log( "doesn't execute" );
    }

    Here 'JSON.parse' runs normally, but the absence of 'name' is actually an error for us.

    /////////////////
    To unify error handling, we'll use the 'throw' operator.
    Syntaax: throw <error object>

    Technically, we can use anything as an error object. That may be even a primitive, like a number
    or a string, but it's better to use objects, preferably with 'name' and 'message' properties (to stay
    somewhat compatible with built-in errors).

    JavaScript has many built-in constructors for standard errors: 'Error', 'SyntaxError',
    'ReferenceError', 'TypeError' and others. We can use them to create error objects as well.

    let error = new Error(message);
    // or
    let error = new SyntaxError(message);
    let error = new ReferenceError(message)
    ...

    For built-in errors (not for any objects, just for errors), the 'name' property is exactly the name of
    the constructor. And 'message' is taken from the argument.

    let error = new Error("Things happen o_O");
    console.log(error.name); // Error
    console.log(error.message); // Things happen o_O
*/
try {
  JSON.parse("{ bad json o_O }");
} catch (err) {
  console.log(err.name); // SyntaxError
  console.log(err.message); // Unexpected token b in JSON at position 2
}

/*
    In our case the absence of 'name' is an error, as users must have a 'name'.

    The 'throw' operator generates a 'SyntaxError' with the given 'message', the
    same way as JavaScript would generate it itself. The execution of 'try' immediately stops and
    the control flow jumps into 'catch'

    Now 'catch' became a single place for all error handling.
*/
let json = '{ "age": 30}'; // incomplete data

try {
  let user = JSON.parse(json); // <-- no errors

  if (!user.name) {
    throw new SyntaxError("Incomplete data: no name"); // (*)
  }

  console.log(user.name);
} catch (err) {
  console.log("JSON Error: " + err.message); // JSON Error: Incomplete data: no name
}

/////////////
// Rethrowing
/////////////
/*
    It's possible thata another unexpected error occurs within the 'try {...}' block.

    let json = '{ "age": 30 }'; // incomplete data
    try {
        user = JSON.parse(json); // <-- forgot to put "let" before user
        // ...
    } catch (err) {
        console.log("JSON Error: " + err); // JSON Error: ReferenceError: user is not defined
        // (no JSON Error actually)
    }

    In this case, 'try...catch' is plaaced to catch "incorrect data" errors. But by its nature, 'catch'
    gets all erros from 'try'. Here it gets an unexpected error, but still show the same error message.

    To avoid such problems we can employ the "rethrowing technique".
    Catch should only proccess errors that it knows and "rethrow" all others.

    The "rethrowing technique" can be explained in more detail as:
    1. Catch gets all errors.
    2. In the 'catch(err) {  }' block we analyze the error object 'err'.
    3. If we don't know how to handle it. we do 'throw err'.

    • We can also check the erroy type using the instanfeof operator:
    
    try {} catch (err) {
    if (err instanceof ReferenceError) {
    console.log('ReferenceError'); // "ReferenceError" for accessing an undefined variable
    }

    • We can also get the error class name from 'err.name' property. All native errors have it. Another
    option is to read 'err.constructor.name'.
*/
/*
    Here we use rethrowing so that 'catch' only handles 'SyntaxError'

    The error throwing on the else inside the 'catch' block. "falls out" of 'try...catch' and can be
    either caugth by an outer 'try...catch' contruct (if it exists), or it kills the script.

    So the 'catch' block actually handles only errors that it knows how to deal with and "skips" all
    others.

    The example below demonstrates how such erros can be caught by one more level of 'try...catch'.
*/
try {
  let user = JSON.parse(json);

  if (!user.name) {
    throw new SyntaxError("Incomplete data: no name");
  }

  blabla(); // unexpected error
  console.log(user.name);
} catch (err) {
  if (err instanceof SyntaxError) {
    console.log("JSON Error: " + err.message);
  } else {
    throw err; // rethrow (*)
  }
}

// Catching those errors by one more level of 'try...catch'.
function readData() {
  try {
    // ...
    blabla(); // error!
  } catch (err) {
    // ...
    if (!(err instanceof SyntaxError)) {
      throw err; // rethrow (don't know how to deal with it)
    }
  }
}

try {
  readData();
} catch (err) {
  console.log("External catch got: " + err); // caught it!
}
