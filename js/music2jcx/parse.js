import jcxNote from './jcxNote.js'

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
      lastNote.duration += duration
    }
  }
  return res
}

global.lastNote = '1'

// 将collapse后的seq转成jcx的简谱格式（一小节）
function seq2JcxScore(seq) {
  /*
   * 会读取或者修改global.lastNote。因为要处理跨小节的连音线
   */
  let output = ''
  for(const i in seq) {
    let {note, duration} = seq[i]
    // 如果第一个就是连音线
    if ( i === '0' && note === '-' ) {
      output += '-'
      note = global.lastNote
    } 
    global.lastNote = note
    output += jcxNote(note)
    if ( duration<1 ) {
      output += `/${1/duration}`
    } 
    else if(duration>1) {
      output += duration
    }
  }
  return output
}

function parseBar(score) {
  let res = text2struct([...score])
  res = structFlattern(res)
  res = seqCollapse(res)
  res = seq2JcxScore(res)
  res += '|'
  return res
}

// parseBar('- - (5.5.) 1')

export function parse(score) {
  return score.split('|').map(parseBar).join('')
}
