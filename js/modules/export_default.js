/*
    //////////
    // Export Default
    //////////

    In practice, there are mainly 2 kinds of modules.
    1. Modules that contain a library, pack of functions.
    2. Modules that declare a single entity, e.g. a module.

    Mostly, the second approach is preferred, so that every "thing" resides in its own module.

    Naturally, that requires a lot of files, as everything wants its own module, but that's not a problem
    at all. Actually, code navigation becomes easier if files are well-named and structured into folders.

    Modules provide a special 'export default' ("the default export") syntax to make the "one
    thing per module" look better.
    They may be only one 'export default' per file.

    //  sample_module_features.js
    export default class User { // just add "default"
        constructor(name) {
            this.name = name;
        }
    }
*/
import User from "./modules_scripts/sample_module_features";
new User("John");

/*
    Imports without curly braces look nicer. A common mistake when starting to use modules is to
    forget curly braces at all. So remember, 'import' needs curly braces for named exports and it
    doesn't need it for the default one.

    export class User {...}         ----- requires ----- import { User } from "..."
    export default class User {...} ----- requires ----- import User from "...."

    Technically, we may have both default and named exports in a single module, but in practice
    people usually don't mix them. A module has either named exports or the default one.

    As there may be at most one default export per file, the exported entity may have no name.

    // no class name
    export default class { 
        constructor() { ... }
    }

    // no function name
    export default function(user) { 
        console.log(`Hello, ${user}!`);
    }

    // export a single value, without making a variable
    export default ['Jan', 'Feb', 'Mar','Apr', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    Not giving it a name is fine, because there is only one 'export default' per file, so 'import'
    without curly braces knows what to import.

    Without 'default', such an export would give an error:
    
    export class { // Error! (non-default export needs a name)
        constructor() {}
    }
*/

/*
    //////////
    // The "default" name
    //////////

    In some situations the 'default' keyword is used to reference the default export.

    For instance, to export a function separately from its definition:
    `
    function sayHi(user) {
      console.log(`Hello, ${user}!`);
    }

    // same as if we added "export default" before the function
    export { sayHi as default };
    `

    Another situation, for example if 'user.js' exports one main "default thing", and a few
    named ones:
    `
    //  user.js
    export default class User {
      constructor(name) {
        this.name = name;
      }
    }

    export function sayHi(user) {
      console.log(`Hello, ${user}!`);
    }

    // Here's how to import the default export along with a named one:
    //  main.js
    import {default as User, sayHi} from './user.js';
    `

    Another situation, if importing everything '*' as an object, then the 'default' property is exactly
    the default import:
    `
    //  main.js
    import * as user from './user.js';
    let User = user.default; // the default export
    new User('John');
    `
*/

/*
    //////////
    // A word against default exports
    //////////

    Named exports are explicit. They exactly name what they import, so we have that information
    from them; that's a good thing.

    Named exports force us to use exactly the right name to import:
    import {User} from './user.js';
    // import {MyUser} won't work, the name must be {User}

    While for a default export, we always choose the name when importing:
    import User from './user.js'; // works
    import MyUser from './user.js'; // works too
    // could be import Anything... and it'll still work

    So team members may use different names to import the same thing, and that's not good.

    Usually to avoid that and keep the code consistent, there's a rule that imported variables should
    correspond to file names:
    import User from './user.js';
    import LoginForm from './loginForm.js';
    import func from '/path/to/func.js';

    Still, some teams consider it a serious drawback of default exports. So they prefer to always use
    named exports. Even if only a single thing is exported, it's still exported under a name, without
    'default'.
*/
