# Babel 7 Async Iteration Bug
This repo is created to demonstrate a bug in the Babel 7 async iteration plugin.

## How to run the example

First clone locally.

Then install the dependencies:

`npm i`

Then you can either use babel node to run the example: `npm start`

Or you can build using `npm run build` and then run the built file via `npm start:dist`

## Problem

Below is the contents of `src/index.js` file:

```js
import '@babel/polyfill'; // Don't copy this line if you are going to run it in Chrome

async function* inner() {
  const ids = [0, 1, 2, 3];
  for await (const id of ids) {
    yield id;
  }
}

async function* wrapper() {
  yield* inner();
  console.log('done');
}

const run = async() => {
  for await (const id of wrapper()) {
    console.log(id);
    break;
  }
};

run();
```

### What is expected
If you run the above code in the Chrome console, you get:
```js
0
```

### What happens using Babel
When you use Babel, you get:
```js
0
'done'
```

When `for await` is used on a generator that uses `yield*`
to delegate to another generator and we attempt to `break` out of the loop,
the iteration stops but the code after `yield*` still runs which is why we get `done`.
This is wrong and the native implementation in v8 doesn't have this problem.
