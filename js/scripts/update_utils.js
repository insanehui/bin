/*
 * 同步utils
 */
const path = require('path')
const d = path.resolve.bind(null, __dirname)
const _ = require('lodash')
const chalk = require('chalk')
const shell = require('shelljs')

function copy(from, to, list) {
  for (const file of list) {
    console.log(`processing ${file}...`)
    shell.exec(`sync-code ${d(from, file)} ${d(to, file)}`)
  }
}

function main() {
  const _src_ = 'C:/Users/guanghui/js_utils'

  copy(_src_, '../utils', [
    'modash.js',
  ])

  console.log(chalk.cyan('premake done'))
}

main()

