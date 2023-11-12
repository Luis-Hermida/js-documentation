/*
    //////////
    // Re-export
    //////////

    “Re-export” syntax 'export ... from ... allows' to import things and immediately export
    them (possibly under another name),

    export {sayHi} from './say.js'; // re-export sayHi
    export {default as User} from './user.js'; // re-export default
*/
/*
    Practical use:

    Imagine, we’re writing a “package”: a folder with a lot of modules, with some of the functionality
    exported outside (tools like NPM allow us to publish and distribute such packages, but we don’t
    have to use them), and many modules are just “helpers”, for internal use in other package
    modules.

    File structure:
    auth/
        index.js
        user.js
        helpers.js
        tests/
            login.js
        providers/
            github.js
            facebook.js

    And we would like to expose the package funcitonality via single entry point.

    In other words, a person who whould like to use our package, should import only from the
    "main file" 'auth/index.js'

    Like this:
    import {login, logout} from 'auth/index.js'

    The "main file", 'auth.index.js' exports all the funcitoanlity that we'd like to provide in our
    package.

    The idea is that outsiders, other programmers who use our package, should not meddle with its
    internal structure, search for files inside our package folder. We export only what's necessary in
    'auth/index.js' and keep the rest hidden.

    As the actual exported functionality is scattered among the package, we can import it into
    'auth/index.js' and export from it:

    ``
    //  auth/index.js

    // import login/logout and immediately export them
    import {login, logout} from './helpers.js';
    export {login, logout};

    // import default as User and export it
    import User from './user.js';
    export {User};
    ``

    Now users of our package can 'import {login} from "auth.index.js"

    We can also use the shorter notation for such a import-export:
    ``
    //  auth/index.js

    // re-export login/logout
    export {login, logout} from './helpers.js';

    // re-export the default export as User
    export {default as User} from './user.js';
    ``
*/
/*
    //////////
    // Re-exporting default
    ////////// 

    Let's say we have 'user.js' with the 'export default class User' and would like to
    re-export it, we can notice a couple of issues:

    1. export User from './user.js' won’t work. That would lead to a syntax error.
    To re-export the default export, we have to write 'export {default as User}'

    2. 'export * from' './user.js' re-exports only named exports, but ignores the default
    one.

    If we would like to re-export both named and default exports, we need 2 statements:
    export * from './user.js'; // to re-export named exports
    export {default} from './user.js'; // to re-export the default export
*/
