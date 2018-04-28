const editor = require('..')

async function main (file) {
  await editor(file)
  console.log('Done editing')
}

main('/tmp/editor2.txt')
  .catch(err => {
    console.error(err)
    if (err.code) process.exit(err.code)
    if (err.signal) process.kill(err.signal)
  })
