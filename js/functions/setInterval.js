// setInterval - Allow us to run a function repeatedly, starting after the interval of time, thenm
// repeating continuosly at that interval.
/* 
    Syntax: 
    let timerId = setTimeout(func|code, [delay], [arg1], [arg2], ...)

    - func|code. Function or a string of code to execute. Usually that's a function. For historial
    reasons, a tring of code can be passed, but that's not recommended.

    - delay. The delay before run in miliseconds, default is 0.

    - arg1, arg2 ... Arguments for the function,
*/
// repeat with the interval of 2 seconds
let timerId = setInterval(() => console.log("tick"), 2000);

// after 5 seconds clear
setTimeout(() => {
  clearInterval(timerId);
  console.log("stop");
}, 5000);

/*
    Information: Time goes on while 'alert' is shown

    In most browsers, including Chrome and Firefox the internal timer continues "ticking" while
    showing 'alert/confirm/prompt'.

    So if you run the code above and don't dismiss the 'alert' window for some time, then the
    next 'next' will be shown immediately as you do it. The actual interval between alerts will be
    shorter than 2 seconds.
*/
