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
