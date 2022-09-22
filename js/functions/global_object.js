/*
    Global object

    The global object provides variables and functions that are available anywhere. By default, those
    that are built into the language or the enviroment.

    In a browser it is named 'window', for Node.js it is 'global', for other environments it may have
    another name.

    Recently, 'globalThis' was added to the language, as a standardized name for a global object,
    that should be supported across all environments. It's supported in all major browsers.

    We'll use 'window' here, assuming that our environment is a browser. If your script may run in
    other environments, it's better to use 'globalThis' instead.

    All properties of the global object can be accessed directly:
    alert("Hello");
    // is the same as
    window.alert("Hello");

    In a browser, global functions and variables declared with 'var' become the property of the
    global object:
    var gVar = 5;
    alert(window.gVar); // 5 (became a property of the global object)

    The same effect have function declarations (statements with 'function' keyword in the main
    code flow, not function expressions). This behavior exists for compatibility reasons. Modern
    scripts use JavaScript Modules where such a thing doesn't happen.

    If a value is so important that you'd like to make it available globally, write it directly as a property:
    // make current user information global, to let all scripts access it
    window.currentUser = {
    name: "John"
    };

    // somewhere else in code
    alert(currentUser.name); // John

    // or, if we have a local variable with the name "currentUser"
    // get it from window explicitly (safe!)
    alert(window.currentUser.name); // John

    That said, using global variables is generally discouraged. There should be as few global
    variables as possible. The code design where a function gets "input" variables and produces
    certain "outcome" is clearer, less prone to errors and easier to test than if it uses outer or global
    variables.
*/

/*
    Using for polyfills

    We use the global object to test for support of modern language features.

    For instance, test if a built-in 'Promise' exists:
    if (!window.Promise) {
    alert("Your browser is really old!");
    }

    If there's none, we can create "polyfills" add functions that are not supported by the
    environment, but exist in the modern standard.
    if (!window.Promise) {
    window.Promise = ... // custom implementation of the modern language feature
    }
*/
