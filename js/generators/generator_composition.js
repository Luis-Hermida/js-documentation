//////////
// Generators Composition
//////////
/*
    Generator composition is a special feature of generators that allows to transparently "embed"
    generators in each other.

    For instance, if we have a function that generates a sequence of numbers:

    function* generateSequence(start, end) {
        for (let i = start; i <= end; i++) yield i;
    }

    Now we'd like to reuse it to generate a more complex sequence:
    - first, digits '0...9' (with character codes 48...57),
    - followed by uppercase alphabet letters 'A...Z' (character codes 65...90)
    - followed by uppercase alphabet letters 'a...z' (character codes 97...122)

    In a regular function, to combine results from multiple other functions, we call them, store the
    results, and then join at the end.

    For generators, there's a special 'yield*' syntax to "embed" (compose) one generator into
    another.

    Example of a composed generator:

*/
function* generateSequence(start, end) {
  for (let i = start; i <= end; i++) yield i;
}

function* generatePasswordCodes() {
  // 0..9
  yield* generateSequence(48, 57);

  // A..Z
  yield* generateSequence(65, 90);

  // a..z
  yield* generateSequence(97, 122);
}

let str = "";

for (let code of generatePasswordCodes()) {
  str += String.fromCharCode(code);
}

console.log(str); // 0..9A..Za..z
/*
    The 'yield*' directive delegates the execution to another generator. This term means that
    'yield* gen' iterates over the generator 'gen' and transparently forwards its yields outside. As
    if the values were yielded by the outer generator.

    A generator composition is a natural way to insert a flow of one generator into another. It doesn’t
    use extra memory to store intermediate results.

    The result is the same as if we inlined the code from nested generators:
*/

function* generatePasswordCodes2() {
  // 0..9
  // yield* generateSequence(48, 57);
  for (let i = 48; i <= 57; i++) yield i;

  // A..Z
  // yield* generateSequence(65, 90);
  for (let i = 65; i <= 90; i++) yield i;

  // a..z
  // yield* generateSequence(97, 122);
  for (let i = 97; i <= 122; i++) yield i;
}

let str2 = "";

for (let code of generatePasswordCodes2()) {
  str2 += String.fromCharCode(code);
}

console.log(str2); // 0..9A..Za..z
