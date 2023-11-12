//////////
// Build tools
//////////
/*
    In real-life, browser modules are rarely used in their "raw" form. Usually, we bundle them together
    with a special tool such as 'Webpack' and deploy it to the production server.

    One benefit of using bundlers - they give more control over how modules are resolved,
    allowing bare modules and such more, like CCS/HTML modules.

    Build tools do the following:

    1. Take a "main" module, the one intended to be put in '<script type="module>" in HTML.

    2. Analyze its dependencies: imports and then imports of imports etc.

    3. Build a single file with all modules (or multiple files, that's tunable), replacing navite 'import'
    calls with bundlers functions, so that it works. "Special" module types like HTML/CSS modules are
    also supported.

    4. The process, other transformations and optimizations may be applied:
        - Removes unreachable code.
        - Removes unused exports ("tree-shaking").
        - Removes Development-specific statements like 'console' and 'debugger'
        - Modern, bleeding-edge JavaScript syntax may be transformed to older one with
        similar functionality using 'Babel'.
        - It minifies the resulting file(s).

    If we use bundle tools, then as scripts are bundled together into a single file or fewer files,
    'import/export' statements inside those scripts are replaced by special bundler functions. So
    the resulting "bundled" script doesn't ccontain any 'import/export', and it doesn't require the
    'type="module", so we can put is a regular script:

    `
    <!-- Assuming we got bundle.js from a tool like Webpack -->
    <script src="bundle.js"></script>
    `

    Navive bundles, are also usable.
*/
