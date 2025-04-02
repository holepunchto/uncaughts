let isBare = false
try {
  isBare = !!Bare.platform // eslint-disable-line no-undef
} catch {} // not Bare

const process = isBare ? Bare : require('process') // eslint-disable-line no-undef
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

test('once flow', async t => {
  if (isBare) {
    t.comment('the once flow is odd on bare, due to an interaction with brittle, so skipping this test')
    t.pass('once flow on bare is not tested')
    return
  }
  // TODO: either debug on Bare, or skip this test on Bare
  t.plan(3)

  const handler = () => {
    t.pass('Correctly registered unhandled rejection handler')
    t.is(process.listenerCount('uncaughtException'), 0, 'removed uncaughtException handler')
    t.is(process.listenerCount('unhandledRejection'), 0, 'removed unhandledRejection handler')
  }

  uncaughts.once(handler)

  const { reject } = rrp()
  reject(new Error('I once trigger an unandled rejection'))
})
