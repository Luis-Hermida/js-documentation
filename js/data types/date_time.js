let now, date;
// Date and Time
// Is a new built-in object that stores date, time and methods for date/time management

// Creation using new Date()
// Without arguments it creates a Date for the current date and time
now = new Date();
console.log(now);

// Creation  using new Date(milliseconds)
let Jan01_1970 = new Date(0);
console.log(Jan01_1970); //  01.01.1970 UTC+0
// now add 24 hours
let Jan02_1970 = new Date(24 * 3600 * 1000);
console.log(Jan02_1970); // 02.01.1970 UTC+0
// All dates before 01.01.1970 use negative timestamps
let Dec31_1969 = new Date(-24 * 3600 * 1000);
console.log(Dec31_1969);

// Creation using new Date(datestring)
// If there's a single argument and it's a string then it's parsed automatically.
// Same as Date.parse
date = new Date("2017-01-26");
console.log(date);
// The time is not set, so it's assumed to be midnight GMT and
// is adjusted according to the timezone the code is run in
// So the result could be
// Thu Jan 26 2017 11:00:00 GMT+1100 (Australian Eastern Daylight Time)
// or
// Wed Jan 25 2017 16:00:00 GMT-0800 (Pacific Standard Time)

// Creation using new Date(year, month, date, hours, minutes, seconds, ms)
// Year and moth are required.
// Year should have 4 digits, 2 digits are also accepted but not recomended
// Month count starts with 0 for Jan and 11 for Dec
// Date paremeter is the day of the month. 1 is default
// hours, minutes, seconds, ms are self explanatory. 0 is default
new Date(2011, 0, 1, 0, 0, 0, 0); // 1 Jan 2011, 00:00:00
new Date(2011, 0, 1); // the same, hours etc are 0 by default

// Access date components
date = new Date();
console.log(date.getFullYear()); // Get the year 4 digits
console.log(date.getMonth()); // Get the month from 0 to 11
console.log(date.getDate()); // Get the day of the month from 1 to 31
console.log(date.getHours());
console.log(date.getMinutes());
console.log(date.getSeconds());
console.log(date.getMilliseconds());
console.log(date.getDay()); // Get the day of the week from 0 (Sunday) to 6 (Saturday)
// All of the methods above returns a value relative to the local timezone
// To get another time zone you can add it to the method liek this:
console.log(date.getUTCHours());
console.log(date.getTime()); // Returns the timestamp for the date
console.log(date.getTimezoneOffset()); // Returns difference between UTC and local time zone.

// Setting date components
// setFullYear(year, [month], [date])
// setMonth(month, [date])
// setDate(date)
// setHours(hour, [min], [sec], [ms])
// setMinutes(min, [sec], [ms])
// setSeconds(sec, [ms])
// setMilliseconds(ms)
// setTime(milliseconds)  (sets the whole date by milliseconds since 01.01.1970 UTC)
// The setTime method doesn't have a UTC-variant
let today = new Date();
today.setHours(0);
console.log(today); // still today, but the hour is changed to 0
today.setHours(0, 0, 0, 0);
console.log(today); // still today, now 00:00:00 sharp.

// Autocorrection
// We can set out-of-range values, and it will auto-adjust itself.
date = new Date(2013, 0, 32); // 32 Jan 2013
console.log(date); // 1st Feb 2013!
// Out-of range components are distributed automatically.
date = new Date(2016, 1, 28);
date.setDate(date.getDate() + 2);
console.log(date); // 1 Mar 2016
// We can also use 0 and negative values
date = new Date(2016, 0, 2); // 2 Jan 2016
date.setDate(1); // set day 1 of month
date.setDate(0); // min day is 1, so the last day of the previous month is assumed
console.log(date); // 31 Dec 2015

// Date to number
// When Date is converted to a number it becomes a timestamp same as date.getTime()
date = new Date();
console.log(+date); // the number of milliseconds, same as date.getTime()
// Dates can be subtracted and their result is ther difference in ms.
// Can be used for time measurements
let start = new Date(); // start measuring time
// do the job
for (let i = 0; i < 100000; i++) {
  let doSomething = i * i * i;
}
let end = new Date(); // end measuring time
console.log(`The loop took ${end - start} ms`);

// Date.now() it returns the current timestamp
// It's semantically equivalent to new Date().getTime()
//It is used mostly for convenience or when performance matters
start = Date.now(); // milliseconds count from 1 Jan 1970
// do the job
for (let i = 0; i < 100000; i++) {
  let doSomething = i * i * i;
}
end = Date.now(); // done
console.log(`The loop took ${end - start} ms`); // subtract numbers, not dates

// Date.parse from a tring
// The method Date.parse(str) can read a date from a string using this format
// YYYY-MM-DDTHH:mm:ss.sssZ
// - YYYY-MM-DD – is the date: year-month-day
// - The character "T" is used as the delimiter
// - HH:mm:ss.sss – is the time: hours, minutes, seconds and milliseconds.
// - The optional 'Z' part denotes the time zone in the format +-hh:mm
ms = Date.parse("2012-01-26T13:51:50.417-07:00");
console.log(ms); // 1327611110417 (timestamp)
// We can instantly create a new Date object from the timestamp:
date = new Date(Date.parse("2012-01-26T13:51:50.417-07:00"));
console.log(date);

// Benchmarking - Performance measurements
// we have date1 and date2, which function faster returns their difference in ms?
function diffSubtract(date1, date2) {
  return date2 - date1;
}

// or
function diffGetTime(date1, date2) {
  return date2.getTime() - date1.getTime();
}

function bench(f) {
  let date1 = new Date(0);
  let date2 = new Date();
  let start = Date.now();
  for (let i = 0; i < 100000; i++) f(date1, date2);
  return Date.now() - start;
}

console.log("Time of diffSubtract: " + bench(diffSubtract) + "ms");
console.log("Time of diffGetTime: " + bench(diffGetTime) + "ms");

// For more reliable benchmarking, the whole pack of benchmarks should be rerun
// multiple times

let time1 = 0;
let time2 = 0;
// run bench(diffSubtract) and bench(diffGetTime) each 10 times alternating
/* for (let i = 0; i < 10; i++) {
  time1 += bench(diffSubtract);
  time2 += bench(diffGetTime);
} */

// Modern JavaScript engines start applying advanced optimizations only to "hot code" that
// executes many times (no need to optimize rarely execuded things). So, in the example above, first
// executions are not well-optimized. We want to add a heat-up run:
// added for "heating up" prior to the main loop
bench(diffSubtract);
bench(diffGetTime);

// now benchmark
for (let i = 0; i < 10; i++) {
  time1 += bench(diffSubtract);
  time2 += bench(diffGetTime);
}

console.log("Total time for diffSubtract: " + time1);
console.log("Total time for diffGetTime: " + time2);

// Warning
/*
  Modern JavaScript engines perform many optimizations. They may tweak results of "aritificial
  tests" compared to "normal usage", especially when we benchmark something very small,
  such as how an operator works, or a built-in function. So if you seriously want to understand
  performance, then study how the JavaScript engine works. And then you probably
  won't need microbenmarks at all.

  (http://mrale.ph/)
*/
