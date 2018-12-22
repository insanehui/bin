/*
 * 解释music类型文件. 转成一个序列的格式
 * 目前暂时先处理一个小节. 后面看看怎么扩展
 */
import _ from 'lodash'
import {fraction} from 'mathjs'
import text2struct from './text2struct.js'

function expandPatterns(text, patterns) {
  _.each(patterns, (v, k) => {
    text = text.replace(RegExp('%'+k+'\\b', 'g'), v)
  })
  return text
}

// 将树状的数据结构平铺成序列的格式
function structFlattern(tree, len = fraction(tree.length)) {
  /*
   * 最终得到一个音符 + 时值组成的数组. 
   * 注意：这里默认写死1/4为一拍！！，后面再想扩展
   */
  let res = []
  const duration = len.div(tree.length)
  for (const item of tree) {
    // 如果是一串音符
    if ( Array.isArray(item) ) {
      res = [...res, ...structFlattern(item, duration)]
    } 
    else { // 一个音符
      res.push({
        ...item,
        duration,
      })
    }
  }
  return res
}

// 将有连音线的序列合并
function seqCollapse(seq) {
  const res = []
  for(const i in seq) {
    const item = seq[i]
    const {note, duration} = item
    // eslint-disable-next-line
    if ( note != '-' || i === '0') { // 注：这里要用 '0' 而不是 0！否则条件会不成立
      /*
       * 如果第一个就是延音线，还是先插入
       */
      res.push(item)
    } 
    else {
      const lastNote = res[res.length-1]
      lastNote.duration = lastNote.duration.add(duration)
    }
  }
  return res
}

export default function parse(str, opt = {}) {
  const {beat, patterns} = opt
  str = expandPatterns(str, patterns)

  let res = text2struct(str, opt)
  // console.log('res', res)
  if ( !res.length ) {
    return []
  } 

  let dura
  if ( beat ) {
    dura = fraction(beat).div('1/4').mul(res.length)
  } 

  res = structFlattern(res, dura)
  res = seqCollapse(res)
  return res
}
