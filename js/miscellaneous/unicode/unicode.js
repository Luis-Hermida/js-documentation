/*
    Unicode

    As we already know, JavaScript strings are based on 'Unicode', each character is represented
    by a byte sequence of 1-4 bytes.

    JavaScript allows us to insert a character into a string by specifying its hexadecimal Unicode
    cod with one of these three notations:

    '\xxx'

    - 'XX' must be two hexadecimal digits with a value between '00' and 'FF', then '\xxx' is the
    character whose Unicode code is 'XX'.

    Because the '\xxx' notation supports only 2 hexadecimal digits, it can be used only for the first
    256 Unicode characters.

    These first 256 characters include the Latin alphabet, most baseic syntax characters, and some
    others. For example '\x7A' is the same as "z" (Unicode 'U+007A).
*/

console.log("\x7A"); // z
console.log("\xA9"); // ©, the copyright symbol

/*
    \uXXXX XXXX must be exactly 4 hex digits with the value between 0000 and FFFF , then
    \uXXXX is the character whose Unicode code is XXXX.

    Characters with Unicode values greater than U+FFFF can also be represented with this
    notation, but in this case, we will need to use a so called surrogate pair.

    X…XXXXXX must be a hexadecimal value of 1 to 6 bytes between 0 and 10FFFF (the
    highest code point defined by Unicode). This notation allows us to easily represent all existing
    Unicode characters.
*/
console.log("\u00A9"); // ©, the same as \xA9, using the 4-digit hex notation
console.log("\u044F"); // я, the Cyrillic alphabet letter
console.log("\u2191"); // ↑, the arrow up symbol

console.log("\u{20331}"); // 佫, a rare Chinese character (long Unicode)
console.log("\u{1F60D}"); // 😍, a smiling face symbol (another long Unicode)

/*
    Surrogate pairs

    All frequently used characters have 2-byte codes (4 hex digits). Letters in most European
    languages, numbers, and the basic unified CJK ideographic sets (CJK - from Chinese, Japanese
    and Korean writing systems), have a 2-byte representation.

    Initially, JavaScript was based on UTF-16 encoding that only allowed 2 bytes per character. But 2
    bytes only allow 65536 combinations and that's not enough for every possible symbol of Unicode.

    So rare/extra symbols that require more than 2 bytes are encoded with a pair of 2-byte characters
    called "surrogate pair".

    That's because surrogate pairs did not exist at the time when JavaScript was created, and thus are
    not correctly processed by the language.

    We actually hava single symbol in each of the strings above, but the 'lenght' property shows a length
    of '2'.

    Getting a symbol can also be tricky, because most language features treat surrogate pairs as 2 characters.

    This pieces of a surrogate pair have no meaning without each other. So the logs in the example below actually
    displays garbage.

    Technically, surrogate pairs are also detectable by their codes: if a character has the code in the
    interval of '0xd800..0xdbff', then it's the first part of the surrogate pair. The next character
    must have the code in the interval of '0xdc00..0xdfff'. These intervals are reserved
    exclusively for surrogate pairs by the standard.
*/

console.log('H'.length); // 1, MATHEMATICAL SCRIPT CAPITAL X
console.log('𝒳'.length); // 2, MATHEMATICAL SCRIPT CAPITAL X
console.log('😂'.length); // 2, FACE WITH TEARS OF JOY
console.log('𩷶'.length); // 2, a rare Chinese character

//

console.log('𝒳'[0]); // shows strange symbols...
console.log('𝒳'[1]); // ...pieces of the surrogate pair

/*
    The methods String.fromCodePoint and str.codePointAt were added in JavaScript to
    deal with surrogate pairs.

    They are essentially the same as String.fromCharCode and str.charCodeAt, but they treat
    surrogate pairs correctly.
*/

// charCodeAt is not surrogate-pair aware, so it gives codes for the 1st part of 𝒳:
console.log('𝒳'.charCodeAt(0).toString(16)); // d835
console.log('𝒳'.charCodeAt(1).toString(16)); // dcb3

// codePointAt is surrogate-pair aware
console.log('𝒳'.codePointAt(0).toString(16)); // 1d4b3, reads both parts of the surrogate pair

/*
    !Warning Splitting strings at an arbitrary point is dangerous

    We can't just split a string at an arbitrary position, e.g. take 'str.slice(0, 4)' and expect
    it to be a valaid string:

    In the example below we can see a garbage character in the output.

    Just be aware of it if you intend to reliably work with surrogate pairs. May not be a big
    problem, but at least you should understand what happens.
*/

console.log('hi 😂'.slice(0, 4)); // hi [?]
console.log('hi 😂'.slice(0, 5)); // hi 😂

/*
    Diacritial marks and normalization

    In many languages, there are symbols that are composed of the base character with a mark
    above/under it.

    For instance, the letter a can be the base character for these characters: àáâäãåā.

    Most common “composite” characters have their own code in the Unicode table. But not all of
    them, because there are too many possible combinations.

    To support arbitrary compositions, the Unicode standard allows us to use several Unicode
    characters: the base character followed by one or many “mark” characters that “decorate” it.

    For instance, if we have S followed by the special “dot above” character (code \u0307 ), it is
    shown as Ṡ.

    If we need an additional mark above the letter (or below it) – no problem, just add the necessary
    mark character.

    For instance, if we append a character “dot below” (code \u0323 ), then we’ll have “S with dots
    above and below”: Ṩ 

    This provides great flexibility, but also an interesting problem: 2 characters may visually be the
    same, but they are represented with different Unicode compositions

    To solve this, there exists a "Unicode normalization" algorithm that brings each string to the single
    "normal" form.

    It seems weirds that joining a sequence of 3 characters return one '\u1e68 (S with two dots)'
    In reality, this is not alwasys the case. The reason is that the symbol 'Ṩ' is common enough, so it
    was it own place on the Unicode main table.

    For more information about normalization rules and varies chec the Appendix of the Unicode standards:
    https://www.unicode.org/reports/tr15/
*/
console.log('S\u0307'); // Ṡ
console.log('S\u0307\u0323'); // Ṩ

let s1 = 'S\u0307\u0323'; // Ṩ, S + dot above + dot below
let s2 = 'S\u0323\u0307'; // Ṩ, S + dot below + dot above
console.log(`s1: ${s1}, s2: ${s2}`);
console.log(s1 == s2); // false though the characters look identical (?!)

console.log("S\u0307\u0323".normalize() == "S\u0323\u0307".normalize()); // true
