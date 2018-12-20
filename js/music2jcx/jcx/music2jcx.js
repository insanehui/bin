/*
 * 将一个完整的music文件转成jcx格式
 */

import parseFile from '../musicFile/main.js'

function makeHeader(obj) {
  let res = ''
  const table = {
    title : 'T',
    timeSign : 'M',
    tempo : 'Q',
    key : 'K',
    artist : 'C',
  }
  const {header} = obj
  for(const key in header) {
    if ( key in table ) {
      res += `${table[key]}: ${header[key]}\n`
    } 
  }
  return res
}

function makeTracks(obj) {
  return '...'
}

export default function convert(music) {
  const obj = parseFile(music)
  const header = makeHeader(obj)
  const tracks = makeTracks(obj)

  return `%MUSE2
${header}
${tracks}
  `
}
