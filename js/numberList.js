/*
 * 给列表编号的一个程序
 */
const readline = require('readline')
import _ from 'lodash'

const rl = readline.createInterface({ input: process.stdin })
rl.on('line', line => {
  console.log(`> ${line}`)
})

