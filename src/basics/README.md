# The basics

## Intro

Each and every value in JavaScript has a set of behaviours you can observe from running different operations.

## Static type-checking

A static type-checker will help us find bugs before our code runs.

<em>Static types systems</em> describe the shapes and behaviors of what our values will be when we run our programs.

A type-checker like TypeScript uses that information and tell us when things might be going off the rails.

```JavaScript
const message = "hello!";

message(); // This expression is not callable.
```

## Non-exception Failures

## Types for Tooling

The type-checker has information to check things like whether we're accessing the right properties on varaibles and other properties. Once it has that information, it can also start <em>suggesting</em> which properties you minght want to use.

## `tsc`, the TypeScript compiler

## Emitting with Errors

## Explicit Types

## Erased Types

## Downleveling

TypeScript has the ability to rewrite code form newer versions of ECMAScript to older ones such as ECMAScript 3 or ECMAScript5.

This process of moving from a newer or "higher" version of ECMAScript down to an older or "lower" one is sometimes called <em>downleveling</em>

By default TypeScript targets ES3, an extremely old version of ECMAScript. We could have chosen something a little bit more recent by using the `target` option.

Running with `--target es2015` changes TypeScript to target ECMAScript 2015.

## Strictness

TypeScript has several type-checking strictness flags that can be turned on or off.

The `strict` flag in the CLI, or `"strict": true` in a `tsconfig.json` toggles them all on simultaneously, but we can opt out of them individually.

The two bigges ones you should know about are `noImplicitAny` and `strictNullChecks`

## `noImplicitAny`

Turning on the `noImplicitAny` flag will issue an error on any variables whose type is implicitly inferred as `any`

## `strictNullChecks`

By default, values like `null` and `undefined` are assignable to any other type. This can make writing some code easier, but forgetting to handle `null` and `undefined` is the cause of countless bugs in the world!

The `strictNullChecks` flag makes handling `null` and `undefined` more explicit, and <em>spares</em> us from worrying about whether we <em>forgot</em> to handle `null` and `undefined`.

## Union Types

<strong>TypeScript's type system allows you to build new types out of exsiting ones using a large variety of operators.</strong>

### Defining a Union Type

The first way to combine types you might see is a union type. A union type is a type formed from two or more other types, representing values that may be any one of those types. We refer to each of these types as the union’s members.

```javascript
function printId(id: number | string) {
  console.log("Your ID is " + id)
}
// OK
printId(101)
// OK
printId("202")
// ERROR
printId({ myID: 22 })
//Argument of type '{ myID: number; }' is not assignable to parameter of type 'string | number'.
```

### Working with Union Types

If you have a value of a union type, how do you work with it?

TypeScript will only allow an operation if it is valid for <em>every</em> member of the union. For example, if you have the union `string | number`, you can't use methods are only availabe on `string`:

```javascript
function printId(id: number | string) {
  console.log(id.toUpperCase())
  // Porperty 'toUpperCase' does not exist on type 'number | string'.
  // Porperty 'toUpperCase' does not exist on type 'number'.
}
```

The solution is to <em>narrow</em> the union with code, the same as you would in JavaScript without type annotaions.

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
}
```

Another example is to use a function like `Array.isArray`:

```javascript
function welcomePeople(x: string[] | string) {
  if (Array.isArray(x)) {
    // Here: 'x' is 'string[]'
    console.log("Hello, " + x.join(" and "))
  } else {
    // Here: 'x' is 'string'
    console.log("Welcome lone travler " + x)
  }
}
```

Notice that in the else branch, we don’t need to do anything special - if `x` wasn’t a `string[]`, then it must have been a `string.`

If every member in a union has a property in common, you can use that property without narrowing:

```javascript
// Return type is inferred as number[] | string
function getFirstThree(x: number[] | string) {
  return x.slice(0, 3)
}
```
