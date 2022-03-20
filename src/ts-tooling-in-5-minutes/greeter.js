/**
 * In this file, we used a `.ts` extension
 * We can run `tsc greeter.ts` in command to produce javascript file
 */
// # Classes
var Student = /** @class */ (function () {
    function Student(firstName, middileInitial, lastName) {
        this.firstName = firstName;
        this.middileInitial = middileInitial;
        this.lastName = lastName;
        this.fullName = "".concat(firstName, " ").concat(middileInitial, " ").concat(lastName);
    }
    Student.prototype.sayHi = function () {
        console.log("I'm ".concat(this.fullName));
    };
    return Student;
}());
// type annotaion
function greeter(person) {
    return "Hello, ".concat(person.firstName, " ").concat(person.lastName);
}
// let user = "Jane User"
// let user = [0, 1, 2]
// let user = {
//     firstName: "Jame",
//     lastName: "User"
// }
var user = new Student("Jame", "M.", "User");
// TypeScript can offer static analysis based on both 
// the structure of your code and the type annotaions you provide.
document.body.textContent = greeter(user);
