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
