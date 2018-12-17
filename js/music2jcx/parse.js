const noteTable = {
  '1' : 'c',
  '2' : 'd',
  '3' : 'e',
  '4' : 'f',
  '5' : 'g',
  '6' : 'a',
  '7' : 'b',
  '0' : 'z',
}

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

export function parse(score) {
  let res = ''
  const bars = score.split('|')
  for (const bar of bars) {
    const stream = [...bar]
    function bar2tree() {
      let notes = []
      while(1) {
        const c = stream.shift() // 当前字符

        // 越界直接返回
        if ( c === undefined ) {
          return notes
        } 

        if ( /\s/.test(c) ) {
          continue
        } 

        if ( c==='(' ) {
          notes.push(bar2tree())
          continue
        } 
        if ( c===')' ) {
          return notes
        } 
        // 找到音符
        if ( /\d/.test(c) ) {
          notes.push(c)
          continue
        } 
      }
    }
    const tree = bar2tree()
    res += tree2jianpu(tree) + '|'
  }
  return res
}

