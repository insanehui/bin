/*
 * 将音符格式转为jcx的吉他谱
 */
import _ from 'lodash'
import fromBar from '../musicFile/bar.js'
import fret from './fret.js'
import handleMuseBug from './museDurationBug.js'

global.lastNote = '1'
let lastChord = null

const gtString = {
  1 : 'a',
  2 : 'b',
  3 : 'c',
  4 : 'd',
  5 : 'e',
  6 : 'f',
}

function simplifyDuration(d) {
  d =d.toFraction()
  if ( d !== '1' ) {
    return `*${d}`
  } 
  return ''
}

function getPrefix(note) {
  let res = ''
  if ( note.arpeggio ) {
    res = 'B' + res
  } 
  else if ( note.downStroke ) {
    res = 'V' + res
  } 
  else if ( note.upStroke ) {
    res = 'U' + res
  } 

  if ( note.slide ) {
    res = '-S-' + res
  } 
  else if ( note.hammerOn ) {
    res = '-H-' + res
  } 
  else if ( note.pullOff ) {
    res = '-P-' + res
  } 

  if ( note.tie ) {
    res = '-' + res
  } 

  return res
}

// 修正版的name + duration
function nameWithDuration(name, dura) {
  const ds = handleMuseBug(dura)
  const names = ds.map(du => {
    // 省掉不必要的1
    if ( du.n === 1 ) {
      if ( du.d === 1 ) {
        return name
      } 
      return `${name}/${du.d}`
    } 
    else {
      return `${name}*${du}`
    }
  })

  const isZ = name.toLowerCase() === 'z'
  return names.join(isZ ? '' : '-')
}

function item2text(item, opt) {
  let {note, duration} = item
  // duration = simplifyDuration(duration)

  let text = _.map(note.notes, n => {
    let name
    if ( n === '0' ) {
      name = 'z'
    } 
    else if ( lastChord && !n.includes('@') ) {
      name = `${gtString[n]}x`
    } 
    else {
      name = fret(n, opt) 
    }

    return nameWithDuration(name, duration)

    // // TODO: 后面用handleMuseBug来重写这段逻辑
    // /*
    //  * ! muse好像对7处理有个bug，所以逢7就得拆开来显示. 但没有测试
    //  */
    // if ( duration === '*7' ) {
    //   return `${name}*6${name==='z'?'':'-'}${name}`
    // } 
    // else {
    //   return name + duration
    // }
  }).join('')

  if ( note.size > 1 ) {
    text = `[${text}]`
  } 
  text = getPrefix(note) + text
  return text
}

function seq2tab(seq, opt) {
  let output = ''
  for(const i in seq) {
    let {note} = seq[i]
    const {chord} = note
    if ( chord ) { // 如果是和弦，打上和弦状态标记
      if ( chord !== '=' ) {
        lastChord = chord
        output += `"${chord}"`
      } 
      else {
        lastChord = null
      }
    } 

    // 如果第一个就是连音线
    // eslint-disable-next-line
    if ( i === '0' && note == '-' ) {
      output += '-'
      note = global.lastNote
    } 
    // eslint-disable-next-line
    else if ( note == '_PREVIOUS_' ) {
      note.notes = global.lastNote.notes
    } 
    global.lastNote = note

    output += item2text(seq[i], opt)
  }
  return output
}

function parseBar(score, opt) {
  const seq = fromBar(score, opt)
  // console.log('seq', seq)
  if ( !seq.length ) {
    return ''
  } 
  const res = seq2tab(seq, opt) + '|'
  return res
}

export default function parse(score, opt) {
  return score.split('|').map(x=>parseBar(x, opt)).join('')
}
