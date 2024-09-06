/*
    Walking the DOM

    The DOM allow us to do anything with elements and their contents, but first we need to reach
    the corresponding DOM object.

    All operations on the DOM start with the 'document' object. That's the main "enty point" to
    DOM. From it we can access any node.

    We can travel to document.body to document.documentElement to document and for each individual
    element we can see them in more detail.
*/

/*
    //////////////////////////////////
    On top: documentElement and body
    //////////////////////////////////

    The topmost tree nodes are available directrly as 'document' properties:

    '<html> = document.documentElement'
    The topmost document node is 'document.documentElement'. That's the DOM node of the '<html>' tag.

    '<body> = document.body'
    Another widely used DOM node is the '<body>' element as 'document.body'.

    '<head> = document.head'
    The '<head>' tag is available as document.head
*/
/*
    !Warning 'document.body' can be 'null'.

    A script cannot access an element that doesn't exist at the moment of running.

    In particular, if a script is inside '<head>', then 'document.body' is unavailable,
    because the browser did not read it yet.

    So, in the example below the first 'alert' shows 'null':

    <html>
    <head>
        <script>
            alert( "From HEAD: " + document.body ); // null, there's no <body> yet
        </script>
    </head>

    <body>
        <script>
            alert( "From BODY: " + document.body ); // HTMLBodyElement, now it exists
        </script>
    </body>
    </html>
*/
/*
    Information: In the DOM world 'null' means "doesn't exist"

    In the DOM, the 'null' value means "doesn't exist" or "no such node".
*/


/*
    //////////////////////////////////
    Children: childNodes, firstChild, lastChild
    //////////////////////////////////

    There are 2 terms that we'll use from now on:

    - Child nodes (or children): elements that are direct children. In other words, they
    are nested exactly in the given one. For instance <head> and <body> are children of
    the <html> element. This list all child nodes, including text nodes.

    - Descendants - all elements that are nested in the given one, including children,
    their children and so on.

    We also have the properties 'firstChild' and 'lastChild' give fast access to the first and last
    children

    There’s also a special function 'elem.hasChildNodes()' to check whether there
    are any child nodes.
*/

/*
    //////////////////////////////////
    DOM collections
    //////////////////////////////////

    As we can see, 'childNodes' looks like an array. But actually it's not an array, but rather a
    collection a special array-like iterable object.

    - We can use 'for..of' to iterate over it, that's because it's iterable (provides the 'Symbol.iterator'
    property, as required).

    `
    for (let node of document.body.childNodes) {
        alert(node); // shows all nodes from the collection
    }
    `

    - Array methods won't work, because it's not an array, the first thing is nice. The second is tolerable,
    because we can use 'Array.from' to create a "real" array from the collection, if we want array methods:


    `
    alert(document.body.childNodes.filter); // undefined (there's no filter method!)
    alert( Array.from(document.body.childNodes).filter ); // function
    `
*/
/*
    Warning: DOM collections are read-only

    DOM collections, and even more - all navigation properties listed in this chapter
    are read-only.

    We can't replace a child by something else by assigning 'childNodes[i] = '...''

    Changing DOM needs other methods. We'll see them in the next chapter.
*/
/*
    Warning: DOM collections are live

    Almost all DOM collections with minor exceptions are live, In other words, they
    reflect the current state of DOM.

    If we keep a reference to 'elem.childNodes', and add/remove nodes into DOM,
    then they appear in the collection automatically.
*/
/*
    Warning: Don’t use 'for..in' to loop over collections

    Collections are iterable using 'for..of'. Sometimes people try to use 'for..in'
    for that.

    Please, don't. The 'for..in' loop iterates over all enumerable properties. And
    collections have some "extra" rarely used properties that we usually don't want
    to get:

    `
    <body>
        <script>
            // shows 0, 1, length, item, values and more.
            for (let prop in document.body.childNodes) alert(prop);
        </script>
    </body>
    `
*/