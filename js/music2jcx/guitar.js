/*
 * 跟吉他相关的库
 */
import interval from './interval.js'

// 吉他标准调弦
const tuning = [
  null,
  '3',
  '7.',
  '5.',
  '2.',
  '6..',
  '3..',
]

// 在吉他上找到音的位置
export function findNote(note) {
  // 找到第一根比note低音的弦，然后找位置
  for(let i = 1; i<tuning.length; i++) {
    const fret = interval(note, tuning[i]) 
    if ( fret >= 0 ) {
      return {
        string : i,
        fret,
      }
    }
  }
}

