const { copyFileSync, existsSync, lstatSync, mkdirSync, readdirSync, rmdirSync } = require('fs'),
  { basename, extname, resolve } = require('path'),
  cosmetic = require('cosmetic'),
  { spinner } = require('../constants'),
  { commaString, getPaths, readFile, writeFile } = require('../helpers'),
  { Counter } = require('../models')

// types: swift, json, js, py

module.exports = async ({ ignore, paths, recursive }) => {
  const counter = new Counter({ onChange: (count) => process.stdout.write(`getting files ${count}\r`) })
  if (!ignore) ignore = []
  ignore = ignore.reduce((a, i) => a.includes(`*${extname(i)}`) ? a : [...a, `*${extname(i)}`], [])
  if (!paths) paths = ['.']
  paths = paths.reduce((a, i) => [...a, ...getPaths(i, { ignore, recursive }, counter)], [])
  counter.count = 0
  counter.onChange = (count) => process.stdout.write(`checking files ${count} / ${paths.length}\r`)
  const totals = {}
  for (let path of paths) {
    let ext = extname(path)
    if (!ext) continue
    if (!totals[ext]) totals[ext] = 0
    const total = await readFile(path)
    totals[ext] += total
    counter.up()
  }
  process.stdout.clearLine()
  for (const key of Object.keys(totals).sort()) {
    console.log(`${key}: ${cosmetic.cyan(commaString(totals[key]))}`)
  }
  console.log(`total ${cosmetic.cyan(commaString(Object.keys(totals).reduce((a, i) => a += totals[i], 0)))} in ${cosmetic.cyan(paths.length)} files`)
}
