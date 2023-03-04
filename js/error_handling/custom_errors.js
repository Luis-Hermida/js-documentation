//////////
// Custom Errors
//////////
/*
    We often need our own error classes to reflect specific things that may go wrong. 
    For errors in network operations we may need HttpError , for
    database operations DbError , for searching operations NotFoundError and so on.

    Our errors should support basic error properties like 'message', 'name' amd preferably 'stack'.
    But they also may have other properties like a 'statusCode'.

    JavaScript allows to use throw with any argument, so technically our custom error classes
    don’t need to inherit from Error . But if we inherit, then it becomes possible to use obj
    instanceof Error to identify error objects. So it’s better to inherit from it.


    /////////////////////
    Extending Error

    As an example, let’s consider a function readUser(json) that should read JSON with user
    data.

    Internally, we’ll use JSON.parse . If it receives malformed json , then it throws
    SyntaxError. But even if json is syntactically correct, that doesn’t mean that it’s a valid
    user. It may miss the necessary data. For instance, it may not have name and age
    properties that are essential for our users.

    Our function readUser(json) will not only read JSON, but check (“validate”) the data. If there
    are no required fields, or the format is wrong, then that’s an error. And that’s not a
    SyntaxError , because the data is syntactically correct, but another kind of error. We’ll call it
    ValidationError and create a class for it. An error of that kind should also carry the
    information about the offending field.
*/

// We can avoid code by making our own “basic error” class that assigns
// 'this.name = this.constructor.name'. And then inherit all our custom errors from it.
class MyError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}

class ValidationError extends MyError {
  //   constructor(message) {
  //     super(message); // (1)
  //     this.name = "ValidationError"; // (2)
  //   }
}

// Usage
function readUser(json) {
  let user = JSON.parse(json);
  if (!user.age) {
    throw new ValidationError("No field: age");
  }
  if (!user.name) {
    throw new ValidationError("No field: name");
  }
  return user;
}

// Working example with try..catch
try {
  let user = readUser('{ "age": 25 }');
} catch (err) {
  if (err instanceof ValidationError) {
    console.log("Invalid data: " + err.message); // Invalid data: No field: name
  } else if (err instanceof SyntaxError) {
    // (*)
    console.log("JSON Syntax Error: " + err.message);
  } else {
    throw err; // unknown error, rethrow it (**)
  }
}

/*
    Please take a look at how we use instanceof to check for the specific error type in the line (*)
    We could also look at err.name.

    The instanceof version is much better, because in the future we are going to extend
    ValidationError , make subtypes of it, like PropertyRequiredError. And
    instanceof check will continue to work for new inheriting classes. So that’s future-proof.

    Also it’s important that if catch meets an unknown error, then it rethrows it in the line (**) .
    The catch block only knows how to handle validation and syntax errors, other kinds (caused by
    a typo in the code or other unknown reasons) should fall through
*/

//////////
// Further inheritance
//////////
/*
    The ValidationError class is very generic. Many things may go wrong. The property may
    be absent or it may be in a wrong format (like a string value for age instead of a number). Let’s
    make a more concrete class PropertyRequiredError , exactly for absent properties. It will
    carry additional information about the property that’s missing.
*/

class PropertyRequiredError extends ValidationError {
  constructor(property) {
    super("No property: " + property);
    this.name = "PropertyRequiredError";
    this.property = property;
  }
}

// Usage
function readUserPropertyRequired(json) {
  let user = JSON.parse(json);
  if (!user.age) {
    throw new PropertyRequiredError("age");
  }
  if (!user.name) {
    throw new PropertyRequiredError("name");
  }
  return user;
}

try {
  let user = readUserPropertyRequired('{ "age": 25 }');
} catch (err) {
  if (err instanceof ValidationError) {
    console.log("Invalid data: " + err.message); // Invalid data: No property: name
    console.log(err.name); // PropertyRequiredError
    console.log(err.property); // name
  } else if (err instanceof SyntaxError) {
    console.log("JSON Syntax Error: " + err.message);
  } else {
    throw err; // unknown error, rethrow it
  }
}
