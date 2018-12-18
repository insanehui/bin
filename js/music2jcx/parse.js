import jcxNote from './jcxNote.js'

function tree2jianpu(tree, beats = tree.length) {
  let output = ''
  const x = beats / tree.length
  for (const item of tree) {
    if ( typeof item === 'string' ) {
      output += jcxNote(item)
      if ( x<1 ) {
        output += `/${1/x}`
      } 
      else if(x>1) {
        output += x
      }
    } 
    else if ( Array.isArray(item) ) {
      output += tree2jianpu(item, x)
    } 
  }
  return output
}

// 将一个音符系列转成结构化的数据（这里的struct也就是之前说的tree）
function text2struct(text) {
  /*
   * text是数组
   * 递归。遇到序列尾或者 ) 即结束
   */
  let notes = []
  let note = null // 当前音符
  let state = 'blank'
  while(1) {
    const c = text.shift() // 当前字符

    // 越界直接返回
    if ( c === undefined || c === ')' ) {
      if ( state === 'note' ) {
        notes.push(note)
      } 
      return notes
    } 
    if ( /\s/.test(c) ) {
      if ( state === 'note' ) {
        notes.push(note)
      } 
      state = 'blank'
      continue
    } 

    if ( c==='(' ) {
      notes.push(text2struct(text))
      state = 'blank'
    } 
    else if ( /[\d-]/.test(c) ) { // 找到音符, - 也暂时代表音符
      if ( state === 'note' ) {
        notes.push(note)
      } 
      note = c
      state = 'note'
    } 
    else {
      note += c
    } 
  }
}

// global.lastNote = 'c'

// 将有连音线的序列合并
function seqCollapse(seq) {
  const res = []
  for(const i in seq) {
    const item = seq[i]
    const {note, duration} = item
    if ( note !== '-' || i === 0) {
      /*
       * 如果第一个就是延音线，还是先插入
       */
      res.push(item)
    } 
    else {
      const lastNote = res[res.length-1]
      lastNote.duration += duration
    }
  }
  return res
}

// 将树状的数据结构平铺成序列的格式
function structFlattern(tree, len = tree.length) {
  /*
   * 最终得到一个音符 + 时值组成的数组
   */
  let res = []
  const duration = len / tree.length
  for (const item of tree) {
    if ( typeof item === 'string' ) { // 这是一个音符
      res.push({
        note : jcxNote(item),
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

function parse2(score) {
  let res = text2struct([...score])
  res = structFlattern(res)
  res = seqCollapse(res)
  console.log('res', res)
  return res
}

const a = parse2(' 6. - (-5.) 5.')

export function parse(score) {
  let res = ''
  const bars = score.split('|')
  for (const bar of bars) {
    const text = [...bar]
    const tree = text2struct(text)
    res += tree2jianpu(tree) + '|'
  }
  return res
}
