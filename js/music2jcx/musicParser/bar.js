/*
 * 处理music格式里的一个小节
 */
import _ from 'lodash'
import {fraction} from 'mathjs'
// import {fraction} from 'mathjs'
// import parseText from './parseText.js'

// 读一个音符
function readNote(str) {
  const [a, b] = /^\s*(-|[b#]?\d[.']?)/.exec(str)
  return [b, str.slice(_.size(a))]
}

// 读取多声部
function readChorus(str) {
  let notes = []
  while(1){
    str = _.trim(str)
    if (str.startsWith(']')) {
      return [notes, str.slice(1)]
    } 
    else {
      let [note, res] = readNote(str)
      str = res
      notes.push(note)
    }
  }
}

// 收集每个音，"-"也算
function collectBeats(str) {
  const beats = []
  while(1){
    str = _.trim(str)
    if ( !str ) {
      return [beats, '']
    } 
    if ( str.startsWith(')') ) {
      return [beats, str.slice(1)]
    } 

    if ( str.startsWith('(') ) {
      let [a, res] = collectBeats(str.slice(1))
      beats.push(a)
      str = res
    } 
    else if ( str.startsWith('[') ) {
      let [notes, res] = readChorus(str.slice(1))
      beats.push({notes})
      str = res
    } 
    else {
      let [note, res] = readNote(str)
      str = res
      beats.push({notes:[note]})
    }
  }
}

// 将音符的树形结构flattern，并简化数据结构: 数组只表示chorus
function flattern(obj, len = fraction(obj.length)) {
  /*
   * 最终得到一个音符 + 时值组成的数组. 
   * 注意：这里默认写死1/4为一拍！！，后面再扩展
   */
  let res = []
  const duration = len.div(obj.length)
  for (const item of obj) {
    // 如果是一串音符
    if ( Array.isArray(item) ) {
      res = [...res, ...flattern(item, duration)]
    } 
    else { // 一个音符
      res.push({
        notes:item.notes,
        duration,
      })
    }
  }
  return res
}

// 将有连音线的序列合并
function collapse(seq) {
  const res = []
  for(const i in seq) {
    const item = seq[i]
    const {notes, duration} = item
    if ( notes[0] !== '-' 
      || i === '0' // 如果第一个就是延音线，还是先插入, 注：这里要用 '0' 而不是 0！否则条件会不成立
    ) { 
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
  let [beats] = collectBeats(str)
  beats = flattern(beats)
  beats = collapse(beats)
  return beats
}
