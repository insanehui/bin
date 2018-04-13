/*
 * 用来同步代码的一个工具
 * 只能同步一个文件，或者一个目录
 */
const fs = require('fs-extra')
import {args} from './utils/node/args.js'
import {need} from './utils/node/cmd_line.js'
import {stat} from './utils/node/fs.js'

const {_:[src,dist]} = args()

// 同步单个函数
function syncFile(src, dist) {
  const content = fs.readFileSync(src, 'utf8')
  fs.ensureFileSync(dist)
  fs.writeFileSync(dist, content)
  console.log(`${src} -> ${dist}`)
}

// 主函数
function main(src, dist) {
  if ( stat.isDirectory(src) ) {
    need(stat.isDirectory(dist), 'dir only -> dir')
  } 
}

process.on('uncaughtException', e=>{
  if ( e.code === 'ENOENT' ) {
    need(false, `${e.path} not exist`)
  } 
})

// main(src, dist)
syncFile(src, dist)

