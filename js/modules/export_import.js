//////////
// Export and Import
//////////

/*
    //////////
    // Export before declarations
    //////////

    We can label any declaration as exported by placing 'export' before it, be it a variable, function
    or a class.

    Here all of the exports are valid:
*/
// export an array
export let months = ["Jan", "Feb", "Mar"];

// export a constant
export const MODULES_BECAME_STANDARD_YEAR = 2015;

// export a class
export class User {
  constructor(name) {
    this.name = name;
  }
} // no ; at the end

export function sayHi(user) {
  console.log(`Hello, ${user}!`);
} // no ; at the end

/*
    Information: No semicolons after export class/function.

    Please note that 'export' before a class or a function does not make it a 'function
    expresion'. It's still a function declaration, even though exported.

    Most JavaScript style guide don't recommend semicolons after function and class
    declarations.

    That's why there's no need for a semicolon at the end of 'export class' and 'export
    function.
*/

/*
    //////////
    // Export apart from declarations
    //////////

    We can declare first and export separately:
*/
function sayHi2(user) {
  console.log(`Hello, ${user}!`);
}
function sayBye2(user) {
  console.log(`Bye, ${user}!`);
}
export { sayHi2, sayBye2 }; // a list of exported variables

/*
    //////////
    // Import * // Import all 
    //////////

    Usually, we put a list of what to import in curly braces 'import {...}', like this:

    import { printMeta } from "./modules_scripts/sample_module_features.js";

    But if there's a lot to import, we can import everything as an object using
    'import * as <obj>', like:
*/
import * as Sample from "./modules_scripts/sample_module_features.js";
Sample.printMeta();

/*
    At first, sight, "import everything" seems such a cool thing, short to write, a couplpe of reasons 
    we should explicitly list what we need to import are:

    1. Explicitly listing what to import gives shorter names e.g. 'printMeta()' instead of
    'Sample.printMeta()'.

    2. Explicitly list of imports gives a better overview of the code structure: what is used and where. It
    makes code support and refactoring easier.
*/
/*
    Information: Don't be afraid to import too much

    Modern build tools, such as 'webpack' and others, bundle modules together and optimize
    them to speedup loading. They also removed unused imports.

    For instance, if you 'import * as library' from a huge code, and only use a few methods,
    the unused ones will not be included in the optimized bundle.
*/

/*
    //////////
    // Import 'as'
    //////////

    We can also use 'as' to import under different names.

    For instance, we can import 'printMeta' in a local variable called 'meta' for brevity.
*/
import { printMeta as meta } from "./modules_scripts/sample_module_features.js";
meta();

/*
    //////////
    // Export 'as'
    //////////

    A similar syntax exists for export, we can also use 'as' to export under different names.

    For instance, we can import 'printMeta' in a local variable called 'meta' for brevity.
*/
import { meta2 } from "./modules_scripts/sample_module_features.js";
