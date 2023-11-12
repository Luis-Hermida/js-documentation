/*
    //////////
    // Dynamic Imports
    //////////

    Export and import statements that we covered in previous chapters are called "static". The syntax
    is very simple and strict.

    First, we can't dynamically generate any parameters of 'import'.
    The module path must be a primitive string, can't be a funciton call.

    `
    import ... from getModuleName(); // Error, only from "string" is allowed
    `

    Second, we can't import conditionally or at run-time:

    `
    if(...) {
        import ...; // Error, not allowed!
    }
    {
        import ...; // Error, we can't put import in any block
    }
    `

    That's because 'import/export' aim to provide a backbone for the code structure. That's a 
    good thing, as code structure can be analyzed, modules can be gathered and bundled into one
    file by special tools, unused exports can be removed ("tree-shaking"). That's possible only
    because the structure of imports/exports is simple and fixed.
*/

/*
    The import() expression

    The 'import(module)' expression loads the module and returns a promise that resolves into a
    module object that contains all its exports. It can be called from any place in the code.

    We can use it dynamically in any place of the code:

    `
    let modulePath = prompt("Which module to load?");
    import(modulePath)
        .then(obj => <module object>)
        .catch(err => <loading error, e.g. if no such module>)
    `

    We can also call it inside an async function:

    `
    let {hi, bye} = await import('./say.js');
    hi();
    bye();
    `

    And like this for default module object:

    `
    let obj = await import('./say.js');
    let say = obj.default;
    // or, in one line: let {default: say} = await import('./say.js');
    say();
    `
*/
/*
    Information: Please note:

    Dynamic imports work in regular scripts, they don't require 'script type="module"'
*/
/*
    Information: Please note:

    Although 'import()' looks like a function call, it's a special syntax that just happens to use
    parentheses (similar to 'super()').

    So we can't copy 'import' to a variable or use 'call/apply' with it. It's not a function.
*/
