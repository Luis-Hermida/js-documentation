/*
    //////////
    // Using "eval"
    //////////

    The reason that 'eval' is using sparingly is because a long time ago JavaScript was a much weaker language,
    many things could only be done with 'eval'.

    Right now there's almost no reason to use 'eval'. If someone is using it, there's a good chance they
    can replace it with a modern language construct or a Module.

    It ability to access outer variables has side effects.

    Code minifiers (tools used before JS gets to production, to compress it) rename local variables
    into shorter ones (like a , b etc) to make the code smaller. That’s usually safe, but not if eval
    is used, as local variables may be accessed from eval’ed code string. So minifiers don’t do that
    renaming for all variables potentially visible from eval . That negatively affects code
    compression ratio.

    Using outer local variables inside 'eval' is also considered a bad programming practice, as it
    makes maintaining the code more difficult.

    We can be safe from such problems by 2 ways:
*/

/*
    If eval'ed code doesn't use outer variables, please call 'eval' as 'window.eval(...)'

    This way the code is executed on the global scope
*/
let x = 1;
{
  let x = 5;
  // window.eval("console.log(x)"); // 1 (global variable)
}

/*
    If eval'ed code needs local variables, change 'eval' to 'new Function' and pass them as
    arguments.

    The 'new Function' construct, creates a function from a string, also in the global scope. So
    it can see local variables. But it's so much clearer to pass them as arguments.
*/
let f = new Function("a", "console.log(a)");
f(5); // 5
