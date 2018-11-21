// const getStdin = require('get-stdin');

// // 读取整个stdin
// getStdin().then(score => {
//   score_bars = score.split('|')
// });

const noteTable = {
  '1' : 'c',
  '2' : 'd',
  '3' : 'e',
  '4' : 'f',
  '5' : 'g',
  '6' : 'a',
  '7' : 'b',
}

let i = 0
const score = '1 ( (23) (4 (56)) )'
// const score = '1 (12) 3 (34)'

function score2tree() {
  let notes = []
  while(1) {
    const c = score[i] // 当前字符

    // 越界直接返回
    if ( c === undefined ) {
      return notes
    } 

    if ( /\s/.test(c) ) {
      i++
    } 
    else if ( c==='(' ) {
      i++
      notes.push(score2tree())
    } 
    else if ( c===')' ) {
      i++
      return notes
    } 
    else if ( /\d/.test(c) ) {
      i++
      notes.push(c)
    } 
    else {
      i++
    }
  }
}

const tree = score2tree()
console.log('tree', tree)

function tree2jianpu(tree, cx=4) {
  let output = ''
  const x = cx / tree.length
  for (const item of tree) {
    if ( typeof item === 'string' ) {
      output += noteTable[item]
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

const jianpu = tree2jianpu(tree)
console.log('jianpu', jianpu)
