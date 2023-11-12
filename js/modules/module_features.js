//////////
// Modules Features
//////////
/*
    Modules have core features, valid for both browser and server-side JS.
*/

/*
    //////////
    // Always "use strict"
    //////////

    Modules always work in strict mode. E.g. assigning to an undeclared variable will give an error.

    a = 5; // error
*/

/*
    //////////
    // Module-level scope
    //////////

    Each module has its own top-level scope. In other words, top-level variables and functions from a
    module are not seen in other scripts.

    In the example below, 2 scripts are imported, and 'hello.js' tries to use 'user' variable
    declared in 'user.js'. It fails because it's a separate module (Error can be seen on the console).
    (https://plnkr.co/edit/A8fzm5IUtGywWX2R?p=preview)

    Modules should 'export' what they want to be accessible from outside and 'import' what they need.
    - 'user.js' should export the 'user' variable.
    - 'hello.js' should import it from 'user.js' module.

    In other words, with modules we use import/export instead of relying on global variables.

    In the browser, independent top-level scope also exists for each '<script type="module">'.

    script type="module">
        // The variable is only visible in this module script
        let user = "John";
    </script>

    <script type="module">
        console.log(user); // Error: user is not defined
    </script>
*/
/*
    Information: Please note:
    
    In the browser, we can make a variable window-level global by explicitly assigning it to a
    'window' property e.g. 'window.user = "John"'.

    Then all scripts will see it, both modules and no modules.

    That said, making global variables is not a good idea.
*/

/*
    //////////
    // A module code is evaluated only the first time when imported
    //////////

    If the same module is imported into multiple other modules, its code is executed only once, upon
    the first import. Then its exports are given to all further importers.

    The one-time evaluation has important consequences, that we should be aware of.

    For example:
    - First, if executing a module code brings side-effects, like showing a message, then importing it
    multiple times will trigger it only once - the first time:

    //  sample_module_features.js
    console.log("Module is evaluated!");

    The second import shows nothing, because the module has already been evaluated.

    There's a rule: top-level module code should be used for initialization, creation of module-specific
    internal data strcutures. If we need to make something callable multiple times - we should export it
    as a function.
*/
// 1 call to sample_module_features.js
import "./modules_scripts/sample_module_features.js"; // Will print "Module is evaluated!"

// 2 call to sample_module_features.js
import "./modules_scripts/sample_module_features.js"; // (Nothing)

/* 
    Deeper example of module code being evaluated, exporting an object.

    //  sample_module_features.js
    export let admin = {
        name: "John"
    };

    If this module is imported from multiple files, the module is only evaluated the first time, 'admin'
    object is created, and then passed to all futher importers.

    Both imports reference the same admin object, changes made in 1 will be visible on 2.

    As you can see, when the first import changes the 'name' property in the imported 'admin', the second
    one can see the new 'admin.name'

    That's because the module is executed only once. Exports are generated, and then they are shared
    between importers, so if something changes the 'admin' object, other importers will see that.
*/
import { admin } from "./modules_scripts/sample_module_features.js";
admin.name = "Luis";

import { admin as admin2 } from "./modules_scripts/sample_module_features.js";
console.log(admin2);

/*
    That behavior allow us to configure modules.

    In other words, a module can provide a generic functionality that needs a setup. E.g.
    authentication needs credentials. Then it can export a configuration object expecting the outer
    code to assign it.

    Here's a classic pattern:
    - 1. A module exports some means of configuration, e.g. a configuration object.

    - 2. On the first import we initialize it, write to its properties, The top-level application script may
    do that.

    - 3. Further imports use the module with it's configuration.

    Example: 

    //  sample_module_features.js
    export let config = { };
    
    export function sayHi() {
        console.log(`Ready to serve, ${config.user}!`);
    }

    Here, 'sample_module_features.js' exports the config object (initially empty).

    Then we can import the 'config' object from it and set a 'config.user', so futher calls on 'sayHi'
    will correctly shows the 'config.user'.
*/

import { config } from "./modules_scripts/sample_module_features.js";
config.user = "Pepe";

import { sayHi } from "./modules_scripts/sample_module_features.js";
sayHi();

/*
    //////////
    // import.meta
    //////////

    The object 'import.meta' contains the information about the current module.

    Its content depends on the environment. In the browser, it contains the URL for the scripts or a
    current webpage URL if inside a HTML
*/
import { printMeta } from "./modules_scripts/sample_module_features.js";
printMeta();

/*
    //////////
    // In a module, "this" is undefined
    //////////

    That's kind of a minor feature, but for completeness we should review it.

    In a module, top-level 'this' is undefined.

    Compare it to non-module scripts, where 'this' is a global object:

    <script>
        console.log(this); // window
    </script>

    <script type="module">
        console.log(this); // undefined
    </script>
*/
