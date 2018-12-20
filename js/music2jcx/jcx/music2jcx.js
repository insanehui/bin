/*
 * 将一个完整的music文件转成jcx格式
 */
import _ from 'lodash'
import wash from '../../utils/modash/arsonWash.js'

import parseFile from '../musicFile/main.js'
import {firstor} from '../../utils/modash.js'
import notation from '../jcx/notation.js'
import tab from '../jcx/tab.js'

// 调整一下obj，方便读取数据
function refineObj(obj) {
  // 之所以要用arson的wash是因为obj里有交叉引用的结构
  obj = wash(obj)
  for (const track of obj.header.tracks) {
    const {jcx} = track
    track.jcx = _.map(jcx, v=>{
      if ( (typeof v) === 'string' ) {
        return {
          type : v,
        }
      } 
      else {
        return v
      }
    })
  }
  return obj
}

function makeHeader(obj) {
  let res = ''
  /*
   * 由于jcx要求头部要有顺序，所以用数组作数据结构
   */
  let {header} = obj
  let {timeSign, beat} = header
  if (!beat)  { // 如果没有节拍，根据timeSign来生成
    beat = '1' + (timeSign ? timeSign.slice(1) : '/4')
    header = {
      ...header,
      beat,
    }
  } 

  const table = [
    ['title', 'T'],
    ['timeSign', 'M'],
    ['beat','L'], // 单位长度是多少
    ['tempo','Q'],
    ['artist','C'],
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
  for(const key in tracks) {
    const {name, lines} = tracks[key]
    // 先读取jcx的配置
    const jcx = obj.header.tracksObj[name].jcx
    for(const i in jcx) {
      const {type, translate} = jcx[i]
      const parse = (type === 'jianpu' ? notation : tab)
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
          res += parse(line, {translate})
        }
        res += '\n'
      }
    }
  }
  return res
}

export default function convert(music) {
  let obj = parseFile(music)
  obj = refineObj(obj)

  const header = makeHeader(obj)
  const trackMeta = makeTrackMeta(obj)
  const tracks = makeTracks(obj)

  return `%MUSE2
${header}
${trackMeta}
${tracks}
  `
}
