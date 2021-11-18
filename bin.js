#!/usr/bin/env node
const { program } = require('./src')

const run = async(args) => {
  // args.splice(0, 2)
  try {
    await program.parse(args)
  } catch(err) {
    console.log(`${err.message}`)
  }
  process.exit()
}

run(process.argv)
