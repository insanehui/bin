/*
 * 将一个完整的music文件转成jcx格式
 */
import _ from 'lodash'

import parseFile from '../musicFile/main.js'
import {firstor} from '../../utils/modash.js'
import notation from '../jcx/notation.js'
import toTab from '../jcx/tab.js'

function makeHeader(obj) {
  let res = ''
  /*
   * 由于jcx要求头部要有顺序，所以用数组作数据结构
   */
  let {header} = obj
  let {timeSign, beat} = header

  // 处理缺省值
  if (!beat)  { // 如果没有节拍，根据timeSign来生成
    beat = '1' + (timeSign ? timeSign.slice(1) : '/4')
    header = {
      ...header,
      beat,
    }
  } 
  if ( !header.key ) {
    header.key = 'C'
  } 

  const table = [
    ['title', 'T'], // 出现在谱面正上方
    ['info', 'I'],  // 出现在谱面左上角
    ['timeSign', 'M'],
    ['beat','L'], // 单位长度是多少
    ['tempo','Q'],
    ['artist','C'], // 谱面右上角
    ['key','K'],
  ]
  for (const [name, key] of table) {
    let values = header[name]
    if ( !values ) {
      continue
    } 
    if ( !Array.isArray(values) ) {
      values = [values]
    } 
    for (const v of values) {
      res += `${key}: ${v}\n`
    }
  }
  return res
}

function makeCustomChords(obj) {
  const chords = _.get(obj, 'header.customChords')
  let res = ''
  _.each(chords, (definition, name) => {
    res += `%%gchord ${name}=${definition}\n`
  })
  return res
}

function makeTrackMeta(obj) {
  const {header:{tracks}} = obj
  let res = ''

  const first = firstor()

  for (let {name, jcx} of tracks) {
    // if ( !jcx ) {
    //   jcx = ['tab', 'jianpu'] // 默认六线谱 + 简谱
    // } 
    for(const i in jcx) {
      const {type} = jcx[i]
      /*
       * 先暂时把一些配置写死，因为它们只是用来播放的
       */
      res += `V:${name}${i} style=${type} ${first()?'bracket=10':''}\n`
    }
  }
  return res
}

function makeTracks(obj) {
  const {tracks} = obj 
  let res = ''
  const {patterns, tracksObj} = obj.header

  for(const key in tracks) {
    const {name, lines} = tracks[key]
    // 先读取jcx的配置
    const {jcx, beat} = tracksObj[name]
    for(const i in jcx) {
      const {type, translate} = jcx[i]
      const parse = (type === 'jianpu' ? notation : toTab)
      res += `[V:${name}${i}]\n`
      for (const line of lines) {
        if ( line.startsWith('w:') ) {
          if ( type === 'jianpu' ) {
            res += line
          } 
          else {
            continue
          }
        } 
        else {
          res += parse(line, {translate, beat, patterns})
        }
        res += '\n'
      }
    }
  }
  return res
}

export default function convert(music) {
  let obj = parseFile(music)

  const header = makeHeader(obj)
  const customChords = makeCustomChords(obj)
  const trackMeta = makeTrackMeta(obj)
  const tracks = makeTracks(obj)

  return `%MUSE2
${header}
${customChords}
${trackMeta}
${tracks}
  `
}
