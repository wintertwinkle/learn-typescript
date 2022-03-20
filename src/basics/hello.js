// Greets the world.
console.log("Hello world!");
// This is an industrial-grade general purpose greeter function"
// LOL, are you kidding me?
// add type annoations on {person} and {date}
function greet(person, date) {
    console.log("Hello ".concat(person, ", today is ").concat(date));
}
/**
 * TypeScript will telling us we forgot to pass an argument
 * to the `greet` function.
 *
 * Even we've only written standard JavaScript, and yet
 * type-checking was still able to find problems with our code.
 */
// greet("wintertwinkle");
// Argument of type 'string' is not assignable to parameter of type 'Date'.
// greet("wintertwinkle", Date())
greet("wintertwinkle", new Date());
