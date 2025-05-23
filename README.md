# Uncaughts

Cleanly register uncaughtException and unhandledRejection handlers, using a single handler for both.

Supports Node.js and [Bare](https://github.com/holepunchto/bare).

## Install

`npm i uncaughts`

## Usage

```js
const uncaughts = require('uncaughts')

const handler = () => {
  console.log('I run when an uncaught exception or unhandled rejection triggers')
}

uncaughts.on(handler)

// ... (uncaughts/unhandleds do not bubble up, but the handler runs instead)

// Remove the handler. Uncaughts/unhandleds will bubble up again
uncaughts.off(handler)
```

This module also exposes `uncaughts.once`, which removes the handlers after it triggered once (just like Node's `Events.once(...)`). However, using this API is not recommended, since it rarely makes sense to only handle one unhandled rejection or uncaught exception. Furthermore, there can be subtle differences in behaviour between Node.js and Bare.
