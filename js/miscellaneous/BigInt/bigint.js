/*
    BigInt

    'BigInt' is a special numeric type that provides support for integers of aritrary length.

    A bigint is created by appending 'n' to the end of an integer literal or by calling the function
    'BigInt' that creates bigints from strings, nunmbers etc.


*/
/*
    !Warning: A recent addition

    This is a recent addition to the language. You can find the current state of support at
    https://caniuse.com/bigint
*/
const bigint = 1234567890123456789012345678901234567890n;
const sameBigint = BigInt("1234567890123456789012345678901234567890");
const bigintFromNumber = BigInt(10); // same as 10n

/*
    Math operators

    'BigInt' can mostly be used like a regular number but we can't mix bigints and regular 
    numbers, to do that we should explicitly convert them if needed: using either 'BigInt()'
    or 'Number()'

    We should also be careful when doing conversion operations because they are silent, they
    never give errors but if the bigint is too huge it won't fit the number type and the extra bits
    will be cut off.
*/
let bigint2 = 1n;
let number = 2;
// number to bigint
console.log(bigint2 + BigInt(number)); // 3
// bigint to number
console.log(Number(bigint2) + number); // 3

/*
    !Information: The unary plus is not supported on bigInts.

    The unuary plus operator '+value' is a well-known way to convert 'value' to a number.

    In order to avoid confusiuon, it's not supported on bigInts.

    We should use 'Number()' to convert a bigInt to a number.
*/

/*
    Comparisons

    Comparisons, such as '<' or '>' work with bigInts and numbers just fine.

    Please note though, as numbers and bigInts belong to different types, they can be
    equal '==', but not strctly equal '==='.

    When inside 'if' or other boolean operations, bigInts behave like numbers.

    For instance, in 'if', bigInt '0n' is falsy, other values are truthy, boolean operators
    such as || , && also work with bigInts similar to numbers.
*/
console.log(2n > 1n); // true
console.log(2n > 1); // true

console.log(1 == 1n); // true
console.log(1 === 1n); // false

if (0n) {
    // never executes
    console.log('AAAAAAAAAAAAAAAAAAAAAAAAAA')
}

console.log(1n || 2); // 1 (1n is considered truthy)
console.log(0n || 2); // 2 (0n is considered falsy)

/*
    Polyfills

    Polyfilling bigInts ais tricky. The reason is that many JavaScript operators, such as '+', '-' behave
    differently with bigInts compared to regular numbers.

    For example a division of bigInts always returns a bigInt (rounded if necessary).

    To emulate such behavior, a polyfill would need to analyze the code and replace all such operators with
    it's functions. But this will cost a lot of performance.

    There's not a well known polyfill for this.

    The best approach is a proposed library called JSBI https://github.com/GoogleChromeLabs/jsbi.

    JSBI works with numbers as with bigints internally, emulates them closely following the
    specification, so the code will be “bigint-ready”.

    We can use such JSBI code “as is” for engines that don’t support bigints and for those that do
    support – the polyfill will convert the calls to native bigints
*/