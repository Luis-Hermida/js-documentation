//////////
// Browser Modules Features
//////////
/*
    There are several browser-specific differences of scripts with 'type="module"' compared
    to regular ones.
*/

/*
    //////////
    // Module Scripts are deferred
    //////////

    Module scrips are always deferred, same effect as the 'defer' attribute for both external
    and inline scripts.

    In other words:
    - downloading external module scripts '<script type="module" src="...">' doesn't
    block HTML processing, they load in parallel with other resources.

    - module scripts wait until the HTML document is fully ready (even if they are tiny and load faster
    than HTML), and then run.

    - relative order of scripts is maintained: scripts that go first in the document, execute first.

    As a side effect, module scripts always "see" the fully loaded HTML-page, including HTML
    elements, for example:
*/
/* 
    `
    <script type="module">
        console.log(typeof button); // object: the script can 'see' the button below
        // as modules are deferred, the script runs after the whole page is loaded
    </script>

    Regular script below:
    <script>
        console.log(typeof button); // button is undefined, the script can't see elements below
        // regular scripts run immediately, before the rest of the page is processed
    </script>

    <button id="button">Button</button>
    `
*/
/*
    Note that the second script actually runs before the first, So we'll see 'undefined' first, and
    then 'object'.

    That's because modules are deferred, so we wait for the document to be processed. The regular
    script runs immediately, so we see its outputs first.

    When using modules, we should be aware that the HTML page shows up as it loads, and
    JavaScript modules run after that, so the user may see the page before the JavaScript
    application is ready. Some functionality may not work yet. We should put "loading indicators", or
    ensure that the visitor won't be confused by that.
*/

/*
    //////////
    // Async works on inline scripts
    //////////

    For non-module scripts, the 'async' attribute only works on external scripts. Async scriptps run
    immediately when ready, independently of other scripts or the HTML document.

    For module scripts, it works on inline scripts as well.

    For example the script below has 'async', so it doesn't wait for anything.

    It performs the import (fetches './analytics.js') and runs when ready, even if the HTML
    document is not finished yet, or if other scripts are still pending.

    That's good for functionality that doesn't depend on anything.
*/
/* 
    `
    <!-- all dependencies are fetched (analytics.js), and the script runs -->
    <!-- doesn't wait for the document or other <script> tags -->
    <script async type="module">
        import {counter} from './analytics.js';
        counter.count();
    </script>
    `
*/

/*
    //////////
    // External Scripts
    //////////

    Exter scriptps that have 'type="module"' are different in 2 aspects:

    1. External scripts with the same 'src' only run once:
    `
        <!-- the script my.js is fetched and executed only once -->
        <script type="module" src="my.js"></script>
        <script type="module" src="my.js"></script>
    `

    2. External scripts that are fetched from another origin require 'CORS' headers,
    in other words, if a module script is fetched from another origin, the remove server
    must supply a header 'Access-Control-Allow-Origin' allowing the fetch.
    
    This ensures better security by default.
    `
        <!-- another-site.com must supply Access-Control-Allow-Origin -->
        <!-- otherwise, the script won't execute -->
        <script type="module" src="http://another-site.com/their.js"></script>
    `
*/

/*
    //////////
    // No "bare" modules allowed
    //////////

    In the browser, 'import' must be get either a relative or absolute URL. Modules without any path
    are called "bare" modules. Such modules aren't allowd in 'import'.

    Certain environments, like Node.js or bundle tools allow bare modules, without any path, as they
    have their own ways for finding modules and hooks to fine-tune them. But not browsers.
*/
import { sayHi } from "./modules_scripts/sample_module_features"; // Error, "bare" module // (incomplete path)
// the module must have a path, e.g. './sayHi.js' or wherever the module is
// console.log(sayHi());

/*
    //////////
    // Compatibility, "nomodule"
    //////////

    Old browsers do not understand 'type="module"'. Scripts of an unknown type are just ignored.
    For them, it's possible to provide a fallback using the 'nomodule' attribute:

    `   
        <script type="module">
            console.log("Runs in modern browsers");
        </script>

        <script nomodule>
            console.log("Modern browsers know both type=module and nomodule, so skip this")
            console.log("Old browsers ignore script with unknown type=module, but execute this.");
        </script>
    `
*/
