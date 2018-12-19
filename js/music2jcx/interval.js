/*
 * 计算音程的函数
 * 使用自定义的格式，如1. 5'等
 */

export function note2number(note) {
  let res = +(note[0])
  const tail = note.slice(1)
  if ( tail.length ) {
    res += ((tail[0] === '.') ? -12 : 12)*tail.length
  } 
  return res
}

export default function interval(a, b) {
  return note2number(a) - note2number(b)
}
