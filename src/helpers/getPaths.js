const { existsSync, lstatSync, readdirSync } = require('fs'),
  { basename, extname, join, resolve } = require('path')

// types: swift, json, js, py
const whitelist = [ '.css', '.csv', '.ejs', '.env', '.gitignore', '.haml', '.html', '.java', '.js', '.json', '.paw', '.plist', '.py', '.rake', '.scss', '.sh', '.sql', '.stl', '.swift', '.ts', '.tsx', '.txt', '.xib', '.xml', '.yaml', '.yml'  ]

const getFiles = (base, options, counter) => {
  try {
    base = resolve(base)
    const recursive = options && options.recursive
    const ignore = options && options.ignore || []
    let paths = []
    if (!lstatSync(base).isDirectory()) {
      if (counter) counter.up()
      return existsSync(base) ? [ base ] : []
    }
    let items = readdirSync(base)
    for (let item of items) {
      const ext = extname(item)
      if (ignore.includes(item)
        || ignore.includes(`*${ext}`)
        // some basic skips
        || item === 'node_modules'
        || item === 'Carthage'
        || item === '.git'
        || item === 'package-lock.json'
        || item === '.DS_Store'
        || item === 'Dockerfile'
        || item === 'LICENSE'
        || item === 'Test'
      ) continue
      item = join(base, item)
      const isDir = lstatSync(item).isDirectory()
      if (recursive && isDir) {
        const sub = getFiles(item, options, counter)
        paths.push(...sub)
      } else if (!isDir) {
        if (counter) counter.up()
        if (whitelist.includes(ext)) paths.push(item)
      }
    }
    return paths
  } catch (err) {
    process.stdout.clearLine()
    console.log(`error getting items in ${base}: ${err.message}`)
    return []
  }
}

module.exports = getFiles
