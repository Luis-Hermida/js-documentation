// DOM specification    - https://dom.spec.whatwg.org/
// CSSOM specification  - https://www.w3.org/TR/cssom-1/
// HTML specification   - https://html.spec.whatwg.org/ Other option: https://developer.mozilla.org/en-US/

/*
    Browser Environment, Specs

    The JavaScript language was initially created for web browsers. Since then, it has
    evolved into a language with many uses and platforms.

    A platform may be a browser, or a web-server or another host, or even a "smart"
    coffee machine. If it can run JavaScript. Each of these provides platform-specific
    functionality. This is called a 'host environment'.

    A host environment provides its own objects and functions in addition to the language
    core. Web browsers give a means to control web pages. Node.js provides server-side
    features, and so on.

    Example of JavaScipt running in a web browser.

    ////////////
    // window // ----- Javascript -> // Object // -> // Array // -> // Function //
    ////////////
        |  BOM   \ Dom
        |         \
        |          \\ Document \\
        |            
        | // Navigator      //             
        | // Screen         //             
        | // Location       //             
        | // Frames         //             
        | // History        //             
        | // XMLHttpRequest //             
*/

/*
    Object 'window'

    This object has 2 roles:

    1. It's a global object for JavaScript code, as described in the chapter 'Global Object'
    under js\functions\global_object.js

    2. It represents the "browser window" and provides methods to control it.

    We can use it as a global object

    ``
        function sayHi() {
            console.log("Hello");
        }

        // global functions are methods of the global object:
        window.sayHi();
    ``

    Another example is we can use it to get the window dimensions:
    ``
        console.log(window.innerHeight); // inner window height
    ``
*/

/*
    DOM (Document Object Model)

    The DOM, represents all page content as objects that can be modified.

    The 'document' object is the main "entry point" to the page. We can change or create
    anything on the page by using it.

    ``
    // change the background color to red
    document.body.style.background = "red";

    // change it back after 1 second
    setTimeout(() => document.body.style.background = "", 1000);
    ``

    Here, we used 'document.body.style', but there's much more. Properties and methods are
    described in the 'DOM Living Standard' https://dom.spec.whatwg.org/
*/
/*
    Information: DOM is not only for browsers

    The DOM specification explains the structure of a document and provides objects
    to manipulate it. There are non-browser instruments that use DOM too.

    For instance, server-side scripts that download HTML pages and process them
    can also use the DOM. They may only support a part of the specification though.
*/
/*
    Information: CSSOM for styling

    There's also a separate specification, 'CSS Object Model (CSSOM) for CSS
    rules and stylesheets, that explains how they are represented as objects, and how
    to read them and write them.

    The CSSOM is used together with the DOM when we modify style rules for the
    document. In practice though, the CSSOM, is rarely required, because we rarely
    need to modify CSS rules from JavaScript (usually we just add/remove CSS classes,
    but we don't modify their CSS rules). But it's possible.
*/

/*
    BOM (Browser Object Model)

    The Browser Object Model (BOM) represents additional objects provided by the
    browser (host environment) for working with everything except the document.

    For example
    - The navigator https://developer.mozilla.org/en-US/docs/Web/API/Window/navigator object
    provides hackground information about the browser and the operating system. There are many
    properties, but the 2 most widely know are 'navigator.userAgent' which returns information about
    the current browser, and 'navigator.platform' which returns information about the platform and
    can help to differentiate between OS's

    - The location object https://developer.mozilla.org/en-US/docs/Web/API/Window/location allows
    us to read the current URL and can redirect the browser to a new one.

    ``
    console.log(location.href); // shows current URL
    if (confirm("Go to Wikipedia?")) {
        location.href = "https://wikipedia.org"; // redirect the browser to another URL
    }
    ``

    The functions 'alert/confirm/promt' are also part of the BOM: they are not directly related to
    the document, but represent pure browser methods for communicating with the user.
*/
/*
    Information: Specifications: The BOM is a part of the general 'HTML specification'.
    https://html.spec.whatwg.org/ 

    Yes, you heard that right. The HTML spec at https://html.spec.whatwg.org/ is not only about
    the HTML language, but also covers a bunch of objects, methods, and browser-specific DOM extensions.
    That's "HTML in broad terms". Also some parts have additional specs listed at https://spec.whatwg.org/
*/