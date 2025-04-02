// Bare accesses the uncaughtexception and unhandledRejection handlers
// through the global 'Bare', rather than through process
let isBare = false
try {
  isBare = !!Bare.platform // eslint-disable-line no-undef
} catch {} // not Bare

const process = isBare ? Bare : require('process') // eslint-disable-line no-undef

function on (handler) {
  process.on('uncaughtException', handler)
  process.on('unhandledRejection', handler)
}

function off (handler) {
  process.off('uncaughtException', handler)
  process.off('unhandledRejection', handler)
}

function once (handler) {
  // Cleanup the other one that did not trigger
  // Note: there is no guarantee that both do not trigger
  // (this can happen if both trigger within the same tick)
  let cleanupPostUnhandledRejection = null
  const cleanupPostUncaughtException = () => {
    process.off('unhandledRejection', handler)
    process.off('unhandledRejection', cleanupPostUnhandledRejection)
  }
  cleanupPostUnhandledRejection = () => {
    process.off('uncaughtException', handler)
    process.off('uncaughtException', cleanupPostUncaughtException)
  }

  process.once('uncaughtException', cleanupPostUncaughtException)
  process.once('unhandledRejection', cleanupPostUnhandledRejection)

  process.once('uncaughtException', handler)
  process.once('unhandledRejection', handler)
}

module.exports = {
  on,
  off,
  once
}
