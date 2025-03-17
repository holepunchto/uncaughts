const process = require('process')
const test = require('brittle')
const rrp = require('resolve-reject-promise')
const uncaughts = require('.')

test('on-off flow', t => {
  t.plan(5)

  const handler = () => {
    t.pass('Correctly registered unhandled rejection handler')
    t.is(process.listenerCount('uncaughtException'), 1)
    t.is(process.listenerCount('unhandledRejection'), 1)

    uncaughts.off(handler)

    t.is(process.listenerCount('uncaughtException'), 0, 'removed uncaughtException handler')
    t.is(process.listenerCount('unhandledRejection'), 0, 'removed unhandledRejection handler')
  }

  uncaughts.on(handler)

  const { reject } = rrp()
  reject(new Error('I trigger an unandled rejection'))
})

test('once flow', t => {
  t.plan(3)

  const handler = () => {
    t.pass('Correctly registered unhandled rejection handler')
    t.is(process.listenerCount('uncaughtException'), 0, 'removed uncaughtException handler')
    t.is(process.listenerCount('unhandledRejection'), 0, 'removed unhandledRejection handler')

    uncaughts.off(handler)
  }

  uncaughts.once(handler)

  const { reject } = rrp()
  reject(new Error('I trigger an unandled rejection'))
})
