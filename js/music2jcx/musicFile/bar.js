/*
 * 解释music类型文件. 转成一个序列的格式
 * 目前暂时先处理一个小节. 后面看看怎么扩展
 */
import {fraction} from 'mathjs'
import text2struct from './text2struct.js'


// 将树状的数据结构平铺成序列的格式
function structFlattern(tree, len = fraction(tree.length)) {
  /*
   * 最终得到一个音符 + 时值组成的数组
   */
  let res = []
  const duration = len.div(tree.length)
  for (const item of tree) {
    if ( typeof item === 'string' ) { // 这是一个音符
      res.push({
        note : item,
        duration,
      })
    } 
    // 如果是一串音符
    else if ( Array.isArray(item) ) {
      res = [...res, ...structFlattern(item, duration)]
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
    if ( note !== '-' || i === '0') { // 注：这里要用 '0' 而不是 0！否则条件会不成立
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

export default function parse(str) {
  let res = text2struct(str)
  res = structFlattern(res)
  res = seqCollapse(res)
  return res
}
