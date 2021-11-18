const { command, middleware, option } = require('termkit'),
  { codeCount } = require('../actions'),
  { version } = require('../../package.json')

const program = command('codecount', '[paths...]')
  .version(version)
  .description('a cli for counting lines of code')
  .options([
    option('i', 'ignore', '[types...]', 'ignore files or file types'),
    option('r', 'recursive', null, 'scan folders recursively')
  ])
  .action(codeCount)

module.exports = program
