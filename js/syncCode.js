/*
 * 用来同步代码的一个工具
 * 只能同步一个文件，或者一个目录
 */
const fs = require('fs-extra')
const path = require('path')
const p = path.resolve

import {args} from './utils/node/args.js'
import {need} from './utils/node/cmd_line.js'
import {stat} from './utils/node/fs.js'

const {_:[src, dist, exclude]} = args()

function filter(content) {
  // 删除掉多行的注释
  return content.replace(/\/\*[\s\S]*?\*\//mg, '')
}

// 同步单个函数
function syncFile(src, dist) {
  if ( fs.existsSync(dist) && fs.statSync(src).ctimeMs <=  fs.statSync(dist).ctimeMs) {
    // 没有更新，不用同步
    return
  } 

  let content = fs.readFileSync(src)
  if ( src.endsWith('.js') ) {
    content = filter(content.toString())
  } 

  fs.ensureFileSync(dist)
  fs.writeFileSync(dist, content)
  console.log(`${src} -> ${dist}`)
}

// 主函数
function main(src, dist, exclude) {
  if ( exclude && new RegExp(exclude).test(src) ) {
    return
  } 

  if ( stat.isDirectory(src) ) {
    const files = fs.readdirSync(src)
    for (const file of files) {
      main(p(src, file), p(dist, file), exclude)
    }
  } 
  else {
    syncFile(src, dist)
  }
}

process.on('uncaughtException', e=>{
  if ( e.code === 'ENOENT' ) {
    need(false, `${e.path} not exist`)
  } 
  else {
    console.log('e', e)
  }
})

main(src, dist, exclude)

