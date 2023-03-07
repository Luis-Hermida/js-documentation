//////////
// Nested Callbacks
//////////
/*
    To add multiple callbacks for example if we would want to load 2 scripts instead of 1
    the natural solution would be to put the second 'loadScript' inside the callback.

    loadScript('/my/script.js', function(script) {
        console.log(`Cool, the ${script.src} is loaded, let's load one more`);
        loadScript('/my/script2.js', function(script) {
        console.log(`Cool, the second script is loaded`);
        });
    });

    After the outer loadScript is complete, the callback initiates the inner one

    And what if we want to load 3 scripts instead of 2?

    loadScript('/my/script.js', function(script) {
        loadScript('/my/script2.js', function(script) {
            loadScript('/my/script3.js', function(script) {
                // ...continue after all scripts are loaded
            });
        });
    });

    So every new action is inside a callback. That's fine for a few actions, but not good for many,
    we'll see other variants soon.

    At first glance, it looks like a viable, approach to asychronous coding. And indeed it is. For one or
    maybe two nested calls it looks fine.

    As calls become more nested, the code becomes deeper and increasingly more difficult to
    manage, especially if we have real code instead of '...' that may include more loops, conditional
    statements and so on.

    That's sometimes called "callback hell" or "pyramid of doom".

    We can try to alleviate the problem by making every action a standalone function, like this:
*/
loadScript("1.js", step1);

function step1(error, script) {
  if (error) {
    handleError(error);
  } else {
    // ...
    loadScript("2.js", step2);
  }
}

function step2(error, script) {
  if (error) {
    handleError(error);
  } else {
    // ...
    loadScript("3.js", step3);
  }
}

function step3(error, script) {
  if (error) {
    handleError(error);
  } else {
    // ...continue after all scripts are loaded (*)
  }
}
/*
    It does the same thing, and there's no deep nesting now because we made every action a
    separate top-level function.

    It works. but the code looks like a torn apart spreadsheet. It's difficult to read, and you probably
    noticed that one needs to eye-jump between pieces while reading it. That's incovenient,
    specially if the reader is not familiar with the code and doesn't know where to eye-jump.

    Also, the functions name 'step' are all of single use, they are creaded only to avoid the
    "pyramid of doom". No one is going to reuse them outside of the action chain. So there's a bit of
    namespace cluttering here.

    Another way to avoid such pyrtamids is to use "promises", described in the next chapter.
*/
