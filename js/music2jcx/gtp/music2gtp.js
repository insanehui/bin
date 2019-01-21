/*
 * music文件转成gtp格式，buffer类型
 */
// import _ from 'lodash'
import parseFile from '../musicParser/main.js'

export default function convert(music) {
  let obj = parseFile(music)
  console.log(JSON.stringify(obj, null, '  '))
  console.log('obj', obj)
}
