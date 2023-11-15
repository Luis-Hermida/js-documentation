import { createRequire } from "module";
const require = createRequire(import.meta.url);
let _ = require("lodash");
/*
    //////////
    // Use Currying
    //////////

    One benefit for instance, we have the logging function 'log(date, importance, message)' that
    formats and outputs the information. In real projects such functions have many useful features.  
*/

function log(date, importance, message) {
  console.log(
    `[${date.getHours()}:${date.getMinutes()}] [${importance}] ${message}`
  );
}

let logFunction = _.curry(log);

logFunction(new Date())("DEBUG")("some debug");

let logNow = logFunction(new Date());
logNow("INFO", "message"); // [HH:mm] INFO message

/*
    Now logNow is log with fixed first argument, in other words “partially applied function” or
    “partial” for short.

    We didn’t lose anything after currying: log is still callable normally.

    We can easily generate partial functions such as for today’s logs
*/
let debugNow = logNow("DEBUG");
debugNow("message"); // [HH:mm] DEBUG message
