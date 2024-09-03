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

/*
    Autocorrection

    If the browsers encounters malformed HTML, it automatically corrects it when making
    the DOM.

    For instance, the top tag is always '<html>'. Even if it doesn't exist in the document, it
    will exist in the DOM, because the browser will create it. The same goes for '<body>'.

    As an example, if the HTML file is the single word "Hello", the browser will werap it into
    '<html>' and '<body>', and add the required '<head>', and the DOM will be:

    ``
        HTML
            HEAD
            BODY
            #tet "Hello"
    ``

    While generating the DOM, browsers automatically process errors in the document, close tags and so
    on.

    A document with unclosed tags, will become a normal DOM as the browsers reads tags and restores
    the missing parts.
*/
/*
    !Warning: Tables always have '<tbody>'

    An interesting "special case" is tables. By DOM specification they must have '<tbody>' tag,
    but HTML text amy omit it. Then the browser creates '<tbody>' in the DOM automatically.

    <table id="table"><tr><td>1</td></tr></table>

    And the DOM will be

    ``
    TABLE
        TBODY
            TR
                TD
                    #text 1
    ``
*/


/*
    Other node types

    There are some other node types besides elements and text nodes like comments.

    We may think, why is there a comment being added to the DOM, but it respects the rule of
    'if something's in HTML, then it also must be in the DOM tree'.

    Everything in HTML, even comments, becomes a part of the DOM.
    
    Even the '<!DOCTYPE...>' directive at the very beginning of HTML is also a DOM
    node. It’s in the DOM tree right before '<html>'. Few people know about that. We are
    not going to touch that node, we even don’t draw it on diagrams, but it’s there.

    The 'document' object that represents the whole document is, formally, a DOM node
    as well.

    There are 12 node types https://dom.spec.whatwg.org/#node. In practice we usually work with 4 of them:
    1. document – the “entry point” into DOM.
    2. element nodes – HTML-tags, the tree building blocks.
    3. text nodes – contain text.
    4. comments – sometimes we can put information there, it won’t be shown, but JS can
    read it from the DOM.
*/