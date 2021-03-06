# editor2

Launch an editor in your Node.js application.

(A promised-based interface for
[`editor`](https://www.npmjs.com/package/editor)).

## Installing

```
npm i editor2
```

## Example

```js
const editor = require('editor2')

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
```

## API

### `editor(file, opts={})`

Open file in an editor. `editor` uses this ordering to select the
editor:

1. `opts.editor`
1. `process.env.VISUAL`
1. `process.env.EDITOR`
1. `notepad` on Windows, `vim` on all other operating systems

If the editor exists with a non-zero exit code, `editor` throws an
`Error` with `.code` set to the exit code.

If a signal terminates the editor, `editor` throws an `Error` with
`.signal` set to the signal.

## License

[MIT](LICENSE)
