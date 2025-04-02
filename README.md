# Uncaughts

Cleanly register uncaughtException and unhandledRejection handlers, using a single handler for both.

## Install

`npm i uncaughts`

## Usage

```
const uncaughts = require('uncaughts')

const handler = () => {
  console.log('I run when an uncaught exception or unhandled rejection triggers')
}

uncaughts.on(handler)

// ... (uncaughts/unhandleds do not bubble up, but the handler runs instead)

// Remove the handler. Uncaughts/unhandleds will bubble up again
uncaughts.off(handler)
```

This module also exposes `uncaughts.once`, which removes the handlers after it triggered once (just like Node's `Events.once(...)`).
