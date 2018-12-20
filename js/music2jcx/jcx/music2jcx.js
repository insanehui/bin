/*
 * 将一个完整的music文件转成jcx格式
 */

import parseFile from '../musicFile/main.js'
import {firstor} from '../../utils/modash.js'

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

function makeTrackMeta(obj) {
  const {header:{tracks}} = obj
  let res = ''

  const first = firstor()

  for (let {name, jcx} of tracks) {
    // if ( !jcx ) {
    //   jcx = ['tab', 'jianpu'] // 默认六线谱 + 简谱
    // } 
    for(const i in jcx) {
      const type = jcx[i]
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
  for(const key in tracks) {
    const {name, lines} = tracks[key]
    // 先读取jcx的配置
    const jcx = obj.header.tracksObj[name]
  }
}

export default function convert(music) {
  const obj = parseFile(music)
  const header = makeHeader(obj)
  const trackMeta = makeTrackMeta(obj)
  const tracks = makeTracks(obj)

  return `%MUSE2
${header}
${trackMeta}
${tracks}
  `
}
