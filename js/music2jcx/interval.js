/*
 * 计算音程的函数
 * 使用自定义的格式，如1. 5', #4. 等，可以处理升降号
 */

const scale = {
  '1' : 0,
  '#1' : 1,
  'b2' : 1,
  '2' : 2,
  '#2' : 3,
  'b3' : 3,
  '3' : 4,
  '4' : 5,
  '#4' : 6,
  'b5' : 6,
  '5' : 7,
  '#5' : 8,
  'b6' : 8,
  '6' : 9,
  '#6' : 10,
  'b7' : 10,
  '7' : 11,
}

export function note2number(note) {
  const name = /^[#b]?\d/.exec(note)[0]

  let res = scale[name]
  const tail = note.slice(name.length)
  if ( tail.length ) {
    res += ((tail[0] === '.') ? -12 : 12)*tail.length
  } 
  return res
}

export default function interval(a, b) {
  return note2number(a) - note2number(b)
}
