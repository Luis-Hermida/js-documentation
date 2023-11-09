//////////
// Modules
//////////
/*
    As our application grows bigger, we want to split it into multiple files, so called "modules". A
    module may contain a class or a library of functions for a specific purpose.

    For a long time, JavaScript existed without a language-level module syntax. That wansn't a
    problem, because initially scripts were small and simple, so there was no need.

    But eventually scripts became more and more complex, so the community inveted a variety of
    ways to organize code into modules, special libraries to load modules on demand.

    AMD  – one of the most ancient module systems, initially implemented by the library
    require.js . (https://en.wikipedia.org/wiki/Asynchronous_module_definition)

    CommonJS  – the module system created for Node.js server.
    (https://wiki.commonjs.org/wiki/Modules/1.1)

    UMD  – one more module system, suggested as a universal one, compatible with AMD and
    CommonJS.
    (https://github.com/umdjs/umd)

    Now all of these are slowly becoming part of history, but we can still find them in old scripts.

    The language-level module system appeared in the standard in 2015, gradually evolved since
    then, and is now supported byt all major browsers and in Node.js. So we'll study the modern
    JavaScript modules from now on.
*/

// What is a module?
/*
    A module is just a file. One script is one module.

    Modules can load each other and use special directives 'export' and 'import' to interchange
    functionality, call functions of one module from another one:

    - 'export' keyword labels variables and functions that should be accessible from outside the
    current module.

    - 'import' keyword allows to import the functionality from another modules.

    //  sayHi.js - export example
    export function sayHi(user) {
      console.log(`Hello, ${user}!`);
    }

    //  main.js - import example
    import { sayHi } from "./sayHi.js";

    console.log(sayHi); // function...
    sayHi("John"); // Hello, John!

    The 'import' directive loads the module by path './sayHi.js' relative to the current file, and
    assigns exported functions 'sayHi' to the corresponding variable.

    In the browser the modules support a special keywords and features, but first we must tell the
    browser that a script should be treated as a module, by using the attribute '<script type="module">'.

    The browser automatically fetches and evaluates the imported module (and its imports if needed) and then
    runs the script.
*/

/*
    Warning: Modules only work via HTTP(s), not locally

    If you try to open a web-page locally, via 'file://' protocol, you'll find that
    'import/export' directives don't work. Use a local web-server, such as 'static-server' or
    use the "live service" capability of your editor, such as VS Code Live Server Extension to
    test modules.
*/
