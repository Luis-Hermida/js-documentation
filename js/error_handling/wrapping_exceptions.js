//////////
// Wrapping exceptions
//////////
/*
    We’d like to be “one level above all that”. We just want to know if there
    was a “data reading error” – why exactly it happened is often irrelevant (the error message
    describes it). Or, even better, we’d like to have a way to get the error details, but only if we need
    to.

    1. We’ll make a new class ReadError to represent a generic “data reading” error.
    
    2. The function readUser will catch data reading errors that occur inside it, such as
    ValidationError and SyntaxError , and generate a ReadError instead.

    3. The ReadError object will keep the reference to the original error in its cause property.

    Then the code that calls readUser will only have to check for ReadError , not for every kind
    of data reading errors. And if it needs more details of an error, it can check its cause property.
*/

class ReadError extends Error {
  constructor(message, cause) {
    super(message);
    this.cause = cause;
    this.name = "ReadError";
  }
}
class ValidationError extends Error {
  /*...*/
}
class PropertyRequiredError extends ValidationError {
  /* ... */
}

function validateUser(user) {
  if (!user.age) {
    throw new PropertyRequiredError("age");
  }
  if (!user.name) {
    throw new PropertyRequiredError("name");
  }
}

function readUser(json) {
  let user;

  try {
    user = JSON.parse(json);
  } catch (err) {
    if (err instanceof SyntaxError) {
      throw new ReadError("Syntax Error", err);
    } else {
      throw err;
    }
  }

  try {
    validateUser(user);
  } catch (err) {
    if (err instanceof ValidationError) {
      throw new ReadError("Validation Error", err);
    } else {
      throw err;
    }
  }
}

try {
  readUser("{bad json}");
} catch (e) {
  if (e instanceof ReadError) {
    console.log(e);
    // Original error: SyntaxError: Unexpected token b in JSON at position 1
    console.log("Original error: " + e.cause);
  } else {
    throw e;
  }
}

/*
    In the code above, readUser works exactly as described – catches syntax and validation errors
    and throws ReadError errors instead (unknown errors are rethrown as usual).
    So the outer code checks instanceof ReadError and that’s it. No need to list all possible
    error types.

    The approach is called “wrapping exceptions”, because we take “low level” exceptions and “wrap”
    them into ReadError that is more abstract. It is widely used in object-oriented programming.
*/
