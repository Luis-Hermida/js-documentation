//////////
// Callbacks
//////////
/*
    Warning: We use browser methods in examples here

    To demonstrate the use of callbacks, promises and other abstract concepts, we'll be using
    some browser methods: specifically, loading scripts and performing simplle document
    manipulations.
*/
/*
    Many functions are provided by JavaScript host environments that allow you to schedule
    asynchronous actions. In other words, actions that we initiate now, but they finish later.

    For instance, one such function is the 'setTimeout' function.

    ///////////////////////////////

    Take a look at the function 'loadScript(src)', that loads a script with the given 'scr':

    function loadScript(src) {
        // creates a <script> tag and append it to the page
        // this causes the script with given src to start loading and run when complete
        let script = document.createElement('script');
        script.src = src;
        document.head.append(script);
    }

    It inserts into the document a new, dynamically created, tag '<script src="..."></script>'
    with the given 'src'. The browser automatically starts loading it and executes when complete.

    We can use the function like this:

    // load and execute the script at the given path
    loadScript('/my/script.js');

    The script is executed "asynchronously", as it starts loading now, but runs later, when the function
    has already finished.

    If there's any code below 'loadScript(...)', it doesn't wait until the script loading finishes.

    Let's say we need to use the new script as soon as it loads. It declares new functions, and we
    want to run them.

    But if we do that immediately after the 'loadScript(...)' call, that wouldn't work.

    loadScript('/my/script.js'); // the script has "function newFunction() {...}"
    newFunction(); // no such function!

    Naturally, the browser probably didn't have time to load the script. As of now, the 'loadScript'
    function doesn't provide a way to track the load completion. The script loads and eventually runs,
    that's all. But we'd like to know when it happens, to use new functions and variables from that 
    script.

    ///////////////////////////////

    Let's add a 'callback' function as a second argument to 'loadScript' that should execute
    when the script loads:

    function loadScript(src, callback) {
        let script = document.createElement('script');
        script.src = src;
        script.onload = () => callback(script);
        document.head.append(script);
    }

    The 'onload' basically executes a function after the script is loaded and executed.

    // Usage
    loadScript('/my/script.js', function() {
        // the callback runs after the script is loaded
        newFunction(); // so now it works
        ...
    });
*/

// Not going to work. document is not in this environment.
function loadScript(src, callback) {
  let script = document.createElement("script");
  script.src = src;
  script.onload = () => callback(script);
  document.head.append(script);
}

loadScript(
  "https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js",
  (script) => {
    console.log(`Cool, the script ${script.src} is loaded`);
    console.log(_); // _ is a function declared in the loaded script
  }
);

//////////
// Handling Errors
//////////
/*
    In the example above we didn't consider erros. What if the script loading fails?


    function loadScript(src, callback) {
        let script = document.createElement('script');
        script.src = src;

        script.onload = () => callback(null, script);
        script.onerror = () => callback(new Error(`Script load error for ${src}`));

        document.head.append(script);
    }

    // Usage
    loadScript('/my/script.js', function(error, script) {
        if (error) {
            // handle error
        } else {
            // script loaded successfully
        }
    });

    Once again, the recipe that we used for 'loadScript' is actually quite common. It's called the
    "error-first callback" style.

    The convention is:

    1. The first argument of the 'callback' is reserved for an error if it occurs. Then
    'callback(err)' is called.

    2. The second argument (and the next ones if needed) are for a successful result. Then
    'callback(null, result1, result2 ....) is called.

    So the single callback function is used both for reporting errors and passing back results.
*/
