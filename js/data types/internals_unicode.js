// Surrogate pairs
// All frequently used characters have 2-byte codes.
// But 2 bytes only allow 65536 combinations and that’s not enough for every possible symbol

console.log("𝒳".length); // 2, MATHEMATICAL SCRIPT CAPITAL X
console.log("😂".length); // 2, FACE WITH TEARS OF JOY
console.log("𩷶".length); // 2, a rare Chinese hieroglyph

// String.fromCodePoint and str.codePointAt
console.log("𝒳".charCodeAt(0).toString(16)); // d835, between 0xd800 and 0xdbff
console.log("𝒳".charCodeAt(1).toString(16)); // dcb3, between 0xdc00 and 0xdfff

// Composite characters
console.log("S\u0307"); // Ṡ code \u0307 "dot above"
console.log("S\u0307\u0323"); // Ṩ code \u0323 "dow below"

// An issue with composite characters
let s1 = "S\u0307\u0323"; // Ṩ, S + dot above + dot below
let s2 = "S\u0323\u0307"; // Ṩ, S + dot below + dot above
console.log(s1 == s2);
// Solution with normalize() // returns the Unicode Normalization Form of the string
console.log("S\u0307\u0323".normalize() == "S\u0323\u0307".normalize()); // true
console.log("S\u0307\u0323".normalize() == "\u1e68"); // true // same character
