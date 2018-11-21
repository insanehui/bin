/*
 * 给列表编号的一个程序
 */
const readline = require('readline')
const argv = require('yargs').argv

import _ from 'lodash'

const name = (argv._[0] || '>')+' ' // 编号的名字，自动加个空格

// 通过name得到其正则表达式
function name2exp(name) {
  // TODO: 这里要注意正则表达式转义
  let str = name.replace(/\d+/, '\\d+')
  str = '^' + str
  return new RegExp(str)
}

// 找到name里的第一个数字
let count = +(_.get(/\d+/.exec(name), '0'))
const name_exp = name2exp(name)
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
  const check_indent = check_indent_exp.exec(line)
  if ( check_indent ) {
    const content = check_indent[1]
    const new_name = name.replace(/\d+/, count)
    if ( name_exp.test(content) ) { // 如果已经有name形式的前缀
      // 采用替换
      const new_content = content.replace(name_exp, new_name)
      console.log(`${indent}${new_content}`)
    } 
    else {
      console.log(`${indent}${new_name}${content}`)
    }
    count++
  } 
  else {
    console.log(line)
  }
})
