/*
 * music文件转成gtp格式，buffer类型
 */
// import _ from 'lodash'
import parseFile from '../musicParser/main.js'
import initData from './initData.js'
import makeTracks from './tracks.js'

export default function convert(music) {
  let obj = parseFile(music)
  const res = [...initData, ...makeTracks(obj)]

  console.log(JSON.stringify(obj, null, '  '))
  console.log('obj', obj)
  return res
}
