import parse from './notation.js'

describe('parse', () => {
  it('high and low', () => {
    const para = [
      "1. 2 3' 4'"
    ]
    const hope = `C,DE'F'|`
    const fact = parse(...para)
    expect(fact).toEqual(hope)
  })

  it('跨小节连音线', () => {
    // 标注琴弦的位置
    const para = [
      "1 2 3 4 | - 5 6 7"
    ]
    const hope = `CDEF|-FGAB|`
    const fact = parse(...para)
    expect(fact).toEqual(hope)
  })

  it('生日歌简谱', () => {
    const para = [
      "0 0 (5.5.) | 6. 5. 1 | 7. - (5.5.) | 6. 5. 2 | 1 - (5.5.) | 5 3 1 | 7. 6. (44) | 3 1 2 | 1 - -"
    ]
    const hope = `ZZG,/2G,/2|A,G,C|B,2G,/2G,/2|A,G,D|C2G,/2G,/2|GEC|B,A,F/2F/2|ECD|C3|`
    const fact = parse(...para)
    expect(fact).toEqual(hope)
  })

  xit('at string', () => {
    // 标注琴弦的位置
    const para = [
      "0 0 (5.@g 5.) | 6. 5. 1@g | 7. - (5.5.)"
    ]
    const hope = ``
    const fact = parse(...para)
    expect(fact).toEqual(hope)
  })

  xit('carcassi', () => {
    // 标注琴弦的位置
    const para = [
      "[73] 5 1' 5 | 1 5 5' 5 | [5'2] 5 4' 5 "
    ]
    const hope = ``
    const fact = parse(...para)
    expect(fact).toEqual(hope)
  })

});

