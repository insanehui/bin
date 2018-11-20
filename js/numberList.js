/*
 * 给列表编号的一个程序
 */
const readline = require('readline')
const argv = require('yargs').argv

import _ from 'lodash'

const indent = argv._[0] || '' // 表示缩进

const rl = readline.createInterface({ input: process.stdin })
rl.on('line', line => {
  console.log(`${indent} ${line}`)
})
