const editor = require('editor')

module.exports = function (...args) {
  return new Promise((resolve, reject) => {
    editor(...args, (code, signal) => {
      if (code) {
        const err = new Error(`Non-zero exit code: ${code}`)
        err.code = code
        return reject(err)
      }
      if (signal) {
        const err = new Error(`Exited with signal: ${signal}`)
        err.signal = signal
        return reject(err)
      }
      resolve()
    })
  })
}
