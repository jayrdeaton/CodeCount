let { writeFile } = require('fs'),
  { promisify } = require('util')

writeFile = promisify(writeFile)

module.exports = async (dir, data, pretty) => {
  const space = pretty === false ? 0 : 2
  await writeFile(dir, JSON.stringify(data, null, space))
  return data
}
