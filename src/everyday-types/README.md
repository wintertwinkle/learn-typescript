# Everyday Types Note

## The primitives: `string`, `number` and `boolean`

JavaScript has three very commonly used primitives: `string`, `number`, and `boolean`.

## Arrays

To specify the type of an array like `[1, 2, 3]`, you can use the syntax `number[]` (`Array<number>` means the same thing)

## `any`

TypeScript also has a special type, `any`, that you can use whenever you don’t want a particular value to cause typechecking errors.

## `noImplicitAny`

When you don’t specify a type, and TypeScript can’t infer it from context, the compiler will typically default to `any`.

You usually want to avoid this, though, because `any` isn’t type-checked. Use the compiler flag `noImplicitAny` to flag any implicit `any` as an error.

## Type Annotations on Variables

When you declare a variable using `const`, `var`, or `let`, you can optionally add a type annotation to explicitly specify the type of the variable:

```javascript
let myName: string = "Alice"
```

In most cases, though, this isn’t needed. Wherever possible, TypeScript tries to automatically infer the types in your code. For example, the type of a variable is inferred based on the type of its initializer:

```javascript
// No type annotation needed -- 'myName' inferred as type 'string'
let myName = "Alice"
```

## Functions

Functions are the primary means of passing data around in JavaScript. TypeScript allows you to specify the types of both the input and output values of functions.

### Parameter Type Annotations

When you declare a function, you can add type annotations after each parameter to declare what types of parameters the function accepts. Parameter type annotations go after the parameter name:

```javascript
// Paramenter type annotation
function greet(name: string) {
  console.log("hello" + name.toUpperCase() + "!")
}
```

When a paramter has a type annotaion, arguments to that function will be checked:

```javascript
// Would be a runtime error if executed!
greet(42)
// Argument of type 'number' is not assignable to parameter of type 'string'.
```

### Return Type Annotations

You can also add return type annotations. Return type annotations appear after the parameter list:

```javascript
function getFavoriteNumber(): number {
  return 26
}
```

Much like variable type annotations, you usually don’t need a return type annotation because TypeScript will infer the function’s return type based on its return statements.

## Anonymous

Anonymous functions are a little bit different from function declarations. When a function appears in a place where TypeScript can determine how it’s going to be called, the parameters of that function are automatically given types.

Here’s an example:

```javascript
// No type annotations here, but TypeScript can spot the bug
const names = ["Alice", "Bob", "Eve"]

// Contextual typing for function
names.forEach(function (s) {
  console.log(s.toUppercase())
  //Property 'toUppercase' does not exist on type 'string'. Did you mean 'toUpperCase'?
})

// Contextual typing also applies to arrow functions
names.forEach((s) => {
  console.log(s.toUppercase())
  //Property 'toUppercase' does not exist on type 'string'. Did you mean 'toUpperCase'?
})
```

This process is called contextual typing because the context that the function occurred within informs what type it should have.

## Object Types

Apart from primitives, the most common sort of type you’ll encounter is an object type. This refers to any JavaScript value with properties, which is almost all of them! <strong>To define an object type, we simply list its properties and their types.</strong>

For example, here’s a function that takes a point-like object:

```javascript
// The parameter's type annotation is an object type
function printCoord(pt: { x: number, y: number }) {
  console.log("The coordinate's x value is " + pt.x)
  console.log("The coordinate's y value is " + pt.y)
}
printCoord({ x: 3, y: 7 })
```

### Optional Properties

Object types can aslo specify that some or all of their properties are <em>optional</em>. To do this, add a `?` after the property:

```javascript
function printName(obj: { first: string, last?: string }) {
  // ...
}
// Both OK
printName({ first: "Bob" })
printName({ first: "Alice", last: "Bob" })
```

In JavaScript, if you access a property that doesn't exist, you'll get the value `undefined` rather than a runtime error. Because of this, when you <em>read</em> from an optional property, you'll have to check for `undefined` before using it.

```javascript
function printName(obj: { first: string, last?: string }) {
  // Error - might crash if 'obj.last' wasn't provided!
  console.log(obj.last.toUpperCase()) // ojb.last is possibly 'undefined'

  if (obj.last !== undefined) {
    // OK
    console.log(obj.last.toUpperCase())
  }

  // A safe alternative using modern JavaScript syntax
  console.log(obj.last?.toUpperCase())
}
```

## Union Types

TypeScript’s type system allows you to build new types out of existing ones using a large variety of operators.

### Defining a Union Type

The first way to combine types you might see is a `union` type. A union type is a type formed from two or more other types, representing values that may be any one of those types. We refer to each of these types as the union’s members.

```javascript
function printId(id: number | string) {
  console.log("Your ID is: " + id)
}
// OK
printId(21)
// OK
printId("202")
// Error
printId({ myID: 442 })
```

### Working with Union Types

It’s easy to provide a value matching a union type - simply provide a type matching any of the union’s members.

If you have a value of a union type, how do you work with it?

TypeScript will only allow an operation if it is valid for every member of the union.

For example, if you have the union `string | number`, you can’t use methods that are only available on string:

```javascript
function printId(id: number | string) {
  // Error:
  // Property 'toUpperCase' does not exist on type 'string | number'.
  // Property 'toUpperCase' does not exist on type 'number'.
  console.log(id.toUpperCase())
}
```

The solution is to `narrow` the union with code, the same as you would in JavaScript without type annotations. `Narrowing` occurs when TypeScript can deduce a more specific type for a value based on the structure of the code.

For example, TypeScript knows that only a `string` value will have a typeof value `"string"`:

```javascript
function printId(id: number | string) {
  if (typeof id === "string") {
    // In this branch, id is of type 'string'
    console.log(id.toUpperCase())
  } else {
    // Here, id is of type 'number'
    console.log(id)
  }
```

Another example is to use a function like `Array.isArray`:

```javascript
function welcomePeople(x: string[] | string) {
  if (Array.isArray(x)) {
    // In this branch, 'x' is of type 'string[]'
    console.log("Hello, " + x.join("and"))
  } else {
    // Here, 'x' is 'string'
    console.log("hello, " + x)
  }
}
```

Notice that in the else branch, we don’t need to do anything special - if `x` wasn’t a `string[]`, then it must have been a `string`.

Sometimes you’ll have a `union` where **all the members have something in common**. For example, both `arrays` and `strings` have a `slice` method.

If every member in a union has a property in common, you can use that property without narrowing:

```javascript
// Return type is inffered as number[] | string
function getFirstThree(x: number[] | string) {
  return x.slice(0, 3)
}
```

## Type Aliases

We’ve been using object types and union types by writing them directly in type annotations. This is convenient, but it’s common to want to use the same type more than once and refer to it by a single name.

A _type alias_ is exactly that - a name for any type. The syntax for a type alias is:

```javascript
type point = {
  x: number,
  y: numer,
}
// Exactly the same as the earlier example
function printCoord(pt: point) {
  console.log("The coordinate's x value is " + pt.x)
  console.log("The coordinate's y value is " + pt.y)
}

printCoord({ x: 100, y: 100 })
```

You can actually use a type alias to give a name to any type at all, not just an object type. For example, a type alias can name a union type:

```javascript
type ID = number | string
```

## Interfaces

An _interface declaration_ is another way to name an object type:

```javascript
interface Point {
  x: number;
  y: number;
}

function printCoord(pt: point) {
  console.log("The coordinate's x value is " + pt.x)
  console.log("The coordinate's y value is " + pt.y)
}

printCoord({ x: 100, y: 100 })
```

Just like when we used a type alias above, the example works just as if we had used an anonymous object type. TypeScript is only concerned with the structure of the value we passed to `printCoord` - it only cares that it has the expected properties. Being concerned only with the structure and capabilities of types is why we call TypeScript a structurally typed type system.

### Differences Between Type Aliases ans Interfaces

Type aliases and interfaces are very similar, and in many cases you can choose between them freely. Almost all features of an interface are available in type.

The **key distinction** is that a type cannot be re-opened to add new properties vs an interface which is always extendable.

please read [document](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces)

## Type Assertions (类型断言)

Sometimes you will have information about the type of a value that TypeScript can’t know about.

For example, if you’re using `document.getElementById`, TypeScript only knows that this will return some kind of `HTMLElement`, but you might know that your page will always have an `HTMLCanvasElement` with a given ID.

In this situation, you can use a `type assertion` to specify a more specific type:

```javascript
const myCanvas = document.getElmentById("main_canvas") as HTMLCanvasElement
```

Like a type annotation, type assertions are removed by the compiler and won’t affect the runtime behavior of your code.

You can also use the angle-bracket syntax (except if the code is in a `.tsx` file), which is equivalent:

```javascript
const myCanvas = <HTMLCanvasElement>document.getElmentById("main_canvas")
```

TypeScript only allows type assertions which convert to a more specific or less specific version of a type. This rule prevents “impossible” coercions like:

```javascript
// Error: Conversion of type 'string' to type 'number' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
const x = "hello" as number;
```

Sometimes this rule can be too conservative and will disallow more complex coercions that might be valid.

If this happens, you can use two assertions, first to `any` (or `unknown`, which we’ll introduce later), then to the desired type:

```javascript
const a = (expr as any) as T
```
