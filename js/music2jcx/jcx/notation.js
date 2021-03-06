/*
 * 将音乐格式转为jcx的简谱或五线谱
 */
import parseMusic from '../musicFile/bar.js'
import jcxNote from './jcxNote.js'
import handleMuseBug from './museDurationBug.js'

global.lastNote = '1'

function name_duration(name, duration) {

  const ds = handleMuseBug(duration)
  const names = ds.map(d => {
    d = d.toFraction()
    if ( /^1$|^1\//.test(d) ) { // 省掉不必要的1
      d = d.slice(1)
    } 
    return name + d
  })
  const isZ = name.toLowerCase() === 'z'
  return names.join(isZ ? '' : '-')
}

// 将collapse后的seq转成jcx的简谱格式（一小节）
function seq2JcxScore(seq) {
  /*
   * 会读取或者修改global.lastNote。因为要处理跨小节的连音线
   */
  let output = ''
  for(const i in seq) {
    let {note, duration} = seq[i]
    // 如果第一个就是连音线
    // eslint-disable-next-line
    if ( i === '0' && note == '-' ) {
      output += '-'
      note = global.lastNote
    } 
    global.lastNote = note
    const name = jcxNote(note)
    
    output += name_duration(name, duration)
  }
  return output
}

function parseBar(score) {
  const seq = parseMusic(score)
  const res = seq2JcxScore(seq) + '|'
  return res
}

// parseBar('- - (5.5.) 1')

export default function parse(score) {
  return score.split('|').map(parseBar).join('')
}
