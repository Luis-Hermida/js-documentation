/*
    DOM Tree

    The backbone of an HTML document is tags.

    According to the Document Object Model (DOM), every HTML tag is an object. Nested
    tags are "children" of the enclosing one. The text inside a tag is an object as well.

    All these objects are accessible using JavaScript, and we can use them to modify the
    page.

    For example, 'document.body' is the object representing the '<body>' tag.

    Running this code will make the '<body>' red for 3 seconds

    ``
    document.body.style.background = 'red'; // make the background red
    setTimeout(() => document.body.style.background = '', 3000); // return back
    ``

    Here we used 'styled.background' to change the background color of the 'document.body',
    but there are many other properties, such as:

    - 'innerHTML' - HTML contents of the node.
    - 'offsetWidth' - the node width in pixels.
*/

/*
    An example of the DOM

    Example living under './dom_example.html'

    The DOM represents HTML as a tree structure of tags somethings like this:

    //////////////////
    // HTML
    //////////////////
    |
    | ///////////
    | // HEAD  //
    | ///////////
    | | // #text `↵ ␣ ␣`
    | | // TITLE
    | | |
    | | // #text `About elk`
    | | // #text `↵`
    |
    | // #text `↵`
    |
    | ///////////
    | // Body  //
    | ///////////
    | |
    | | // #text `↵ ␣ ␣ The truth about elk. ↵`

    Every tree node is an object.

    Tags are 'element nodes' and form the tree structure: <html> is at the root,
    then '<head>' and '<body>' are its children.

    The text inside elements forms 'text nodes', labelled as '#text'. A text node contains
    only a string. It may not have children and is always a leaf of the tree.

    For instance, the '<title>' tag has the text "About elk" it has newlines and spaces which are
    valid characters like letters and digits. They form text nodes and become a part of the DOM. So,
    for instance, in the example above the '<head>' tag contains some spaces before '<title>', and that text
    becomes a '#text' node even if it only have spaces and newlines.

    There are only two top-level exlusions:
    1. Spaces and newlines before '<head>' are ignored for historical reasons.
    2. If we put something after '</body>' , then that is automatically moved inside the
    body , at the end, as the HTML spec requires that all content must be inside
    '<body>'. So there can’t be any spaces after '</body>'.

    In other cases everything's straightforward - if there are spaces (just like any
    character) in the documentm then they become text nodes in the DOM, and if we remove them
    then there won't be any. Like in the example above:

    ``<html><head><title>About elk</title></head><body>The truth about elk.</body></html>``
*/
/*
    Information: Spaces at string start/end and space-only text nodes are usually hidden in tools.

    Browser tools that work with the DOM usually don't show spaces at the start/end of the text and
    empty text nodes (line-breaks) between tags.

    Developer tools save screen space this way.

    On further DOM pictures we'll sometimes omit them when they are irrelevant.
    Such spaces usually don't affect how the document is displayed.
*/