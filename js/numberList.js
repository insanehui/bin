/*
 * 给列表编号的一个程序
 */
const readline = require('readline')
const argv = require('yargs').argv

import _ from 'lodash'

const name = argv._[0] || '' // 编号的名字

// 找到name里的第一个数字
let count = +(/\d+/.exec(name)[0])

let indent = null // 用来保存缩进

const rl = readline.createInterface({ input: process.stdin })
rl.on('line', line => {
  // 根据第一行设置一下indent
  if (indent === null) {
    const exp = /(\s*)(.*)$/
    indent = exp.exec(line)[1]
  } 

  // 判断是不是指定的indent
  const check_indent_exp = new RegExp('^' + indent + '($|\\S.*)')
  const res = check_indent_exp.exec(line)
  if ( res && res.length ) {
    const content = res[1]
    const new_name = name.replace(/\d+/, count)
    count++
    console.log(`${indent}${new_name} ${content}`)
  } 
  else {
    console.log(line)
  }
})
