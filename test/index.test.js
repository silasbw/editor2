/* eslint-env mocha */
const { expect } = require('chai')
const proxyquire = require('proxyquire')

function editor2 (editorMock, ...args) {
  const e = proxyquire('..', {
    'editor': editorMock
  })
  return e(...args)
}

describe('index.js', () => {
  it('rejects non-zero exit codes', async () => {
    const code = 1
    try {
      await editor2((_, cb) => cb(code), 'test')
      expect('Unreachable').to.equal(false)
    } catch (err) {
      expect(err.code).is.equal(code)
    }
  })

  it('rejects signal terminations', async () => {
    const signal = 9
    try {
      await editor2((_, cb) => cb(null, signal), 'test')
      expect('Unreachable').to.equal(false)
    } catch (err) {
      expect(err.signal).is.equal(signal)
    }
  })

  it('resolves', async () => {
    await editor2((_, cb) => cb(null, null), 'test')
  })
})
