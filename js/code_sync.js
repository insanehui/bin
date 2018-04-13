/*
 * 用来同步代码的一个工具
 * 只能同步一个文件，或者一个目录
 */
const fs = require('fs-extra')
const path = require('path')
const d = path.resolve.bind(null, __dirname)

import {args} from './utils/node/args.js'
import {need} from './utils/node/cmd_line.js'
import {stat} from './utils/node/fs.js'

const {_:[src,dist]} = args()

// 同步单个函数
function syncFile(src, dist) {
  const content = fs.readFileSync(src, 'utf8')
  if ( fs.existsSync(dist) && fs.statSync(src).ctimeMs <=  fs.statSync(dist).ctimeMs) {
    // 没有更新，不用同步
    return
  } 

  fs.ensureFileSync(dist)
  fs.writeFileSync(dist, content)
  console.log(`${src} -> ${dist}`)
}

// 主函数
function main(src, dist) {
  if ( stat.isDirectory(src) ) {
    const files = fs.readdirSync(src)
    for (const file of files) {
      main(d(src, file), d(dist, file))
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

main(src, dist)

