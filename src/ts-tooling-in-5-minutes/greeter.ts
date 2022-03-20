/**
 * In this file, we used a `.ts` extension
 * We can run `tsc greeter.ts` in command to produce javascript file
 */

// # Interfaces
interface Person {
    firstName: string
    lastName: string
}

// # Classes
class Student {
    fullName: string
    constructor(
        public firstName: string,
        public middileInitial: string,
        public lastName: string
    ) {
        this.fullName = `${firstName} ${middileInitial} ${lastName}`
    }

    sayHi() {
        console.log(`I'm ${this.fullName}`)
    }
}

// type annotaion
function greeter(person: Person) {
    return `Hello, ${person.firstName} ${person.lastName}`
}

// let user = "Jane User"
// let user = [0, 1, 2]
// let user = {
//     firstName: "Jame",
//     lastName: "User"
// }
let user = new Student("Jame", "M.", "User")

// TypeScript can offer static analysis based on both 
// the structure of your code and the type annotaions you provide.
document.body.textContent = greeter(user)


