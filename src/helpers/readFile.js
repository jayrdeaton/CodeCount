let { createReadStream } = require('fs')

module.exports = (path) => new Promise((resolve, reject) => {
  let count = 0
  createReadStream(path)
  .on('data', (chunk) => {
    for (let i = 0; i < chunk.length; ++i)
      if (chunk[i] == 10) count++
  })
  .on('error', (err) => {
    console.log('error!', err, path)
  })
  .on('end', () => {
    resolve(count)
  })
})
