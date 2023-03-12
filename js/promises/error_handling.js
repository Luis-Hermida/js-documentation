//////////
// Error handling
//////////
/*
    Promise chains are great at error handling. Whe na promise rejects, the control jumps to the
    closest rejection handler.

    For instance, in the code below URL to 'fetch' is wrong and '.catch' handles
    the error:

    fetch('https://no-such-server.blabla') // rejects
        .then(response => response.json())
        .catch(err => console.log(err)) // TypeError: failed to fetch (the text may vary)

    As you can see, the '.catch' doesn't have to be immediate. It may appear after one or maybe
    several '.then'.

    Or maybe, everything is all right with the site, but the response is not valid JSON. The easiest
    way to catch all erros is to append '.catch' to the end of chain.

    Normally, such '.catch' doesn't trigger at all. But if any of the promises above rejects then
    it would catch it.
*/
fetch("/article/promise-chaining/user.json")
  .then((response) => response.json())
  .then((user) => fetch(`https://api.github.com/users/${user.name}`))
  .then((response) => response.json())
  .then(
    (githubUser) =>
      new Promise((resolve, reject) => {
        let img = document.createElement("img");
        img.src = githubUser.avatar_url;
        img.className = "promise-avatar-example";
        document.body.append(img);
        setTimeout(() => {
          img.remove();
          resolve(githubUser);
        }, 3000);
      })
  )
  .catch((error) => console.log(error.message));

/*
    ///////////////////////////
    Implicit try..catch

    The code of a promise executor and promise handlers has an "invisible 'try..catch'" around it.
    If an exception happens, it gets caught and treated as a rejection.

    new Promise((resolve, reject) => {
    throw new Error("Whoops!");
    }).catch(console.log); // Error: Whoops!

    Same as:

    new Promise((resolve, reject) => {
    reject(new Error("Whoops!"));
    }).catch(console.log); // Error: Whoops!

    The "invisible 'try..catch'" around the executor automatically catches the error and turns it
    into rejected promise.

    This happends not only in the executor function, but in its handlers as well. If we 'throw' inside a
    '.then' handler, that means a rejected promise, so the control jumps to the nearest error handler.

    This happens for all error, not just those caused by the 'throw' statement. For example, a
    programming error.
*/
// Caused by throw statement
new Promise((resolve, reject) => {
  resolve("ok");
})
  .then((result) => {
    throw new Error("Whoops!"); // rejects the promise
  })
  .catch(console.log); // Error: Whoops!

// Programming error
new Promise((resolve, reject) => {
  resolve("ok");
})
  .then((result) => {
    blabla(); // no such function
  })
  .catch(console.log); // ReferenceError: blabla is not define

/*
    ///////////////////////////
    Rethrowing

    As we already noticed, '.catch' at the end of the chain is similar to 'try..catch'. We may
    have as many '.then' handlers as we want, and then use a single '.catch' at the end to handle
    errors in all of them.

    In a regular 'try..catch' we can analyze the error and maybe rethrow it if it can't be handled.
    The same thing is possible for promises.

    If we 'throw' inside '.catch', then the control goes to the next closest error handler. And if we
    handle the error and finish normally, then in continues to the next closest successful '.then'
    handler.

    Here the '.catch' successfully handles the error:
*/
// the execution: catch -> then
new Promise((resolve, reject) => {
  throw new Error("Whoops!");
})
  .catch(function (error) {
    console.log("The error is handled, continue normally");
  })
  .then(() => console.log("Next successful handler runs"));

/*
    Here the handler (*) catches the error and just can't handle it, so it throws it again

    The execution jumps from the first .catch (*) to the next one (**) down the chain.
*/
// the execution: catch -> catch
new Promise((resolve, reject) => {
  throw new Error("Whoops!");
})
  .catch(function (error) {
    // (*)
    if (error instanceof URIError) {
      // handle it
    } else {
      console.log("Can't handle such error");
      throw error; // throwing this or another error jumps to the next catch
    }
  })
  .then(function () {
    /* doesn't run here */
  })
  .catch((error) => {
    // (**)
    console.log(`The unknown error has occurred: ${error}`);
    // don't return anything => execution goes the normal way
  });

/*
    ///////////////////////////
    Unhandled rejections

    What happens when an error is not handled? For instance, we forgot to append '.catch' to the
    end of the chain, like here:

    new Promise(function() {
        noSuchFunction(); // Error here (no such function)
    })
    .then(() => {
        // successful promise handlers, one or more
    }); // without .catch at the end!

    In case of an error, the promise becomes rejected, and the execution should jump to the closest
    rejection handler. But there is none. So the error gets "stuck". There's no code to handle it.

    In practice, just like with regular unhandled errors in code, it means that something has gone
    terribly wrong.

    What happens whe na regular error occurs and is not caught by 'try..catch'? The script dies
    with a message in the console. A similar thing happens with unhandled promise rejections.

    The JavaScript engine tracks such rejections and generates a goblar error in that case. You can
    see it in the console if you run the example above.

    In the browser we can catch such errors using the event 'unhandledrejection':
*/
window.addEventListener("unhandledrejection", function (event) {
  // the event object has two special properties:`
  console.log(event.promise); // [object Promise] - the promise that generated the error
  console.log(event.reason); // Error: Whoops! - the unhandled error object
});
new Promise(function () {
  throw new Error("Whoops!");
}); // no catch to handle the error
/*
    The event is part of the HTML standard (https://html.spec.whatwg.org/multipage/webappapis.html#unhandled-promise-rejections)

    If an error occurs, and there's no '.catch', the 'unhandledrejection' handler triggers, and
    gets the 'event' object with the information about the error, so we can do something.

    Usually such errors are unrecoverable, so our best way out is to inform the user about the
    problem and probably report the incident to the server.

    In non-browser environments like Node.js there are other ways to track unhandled errors.
*/
