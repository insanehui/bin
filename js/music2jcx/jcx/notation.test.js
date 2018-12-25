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

  it('升降号', () => {
    const para = [
      "1. 2 b3' #4'"
    ]
    const hope = `C,D_E'^F'|`
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

  it('-后面紧跟()', () => {
    const para = [
      "0-(12)"
    ]
    const hope = `Z2C/2D/2|`
    const fact = parse(...para)
    expect(fact).toEqual(hope)
  })

  it('逢5的bug', () => {
    const para = [
      "1----"
    ]
    const hope = `C-C4|`
    const fact = parse(...para)
    expect(fact).toEqual(hope)
  })

  it('逢7的bug', () => {
    const para = [
      "1------6"
    ]
    const hope = `C-C6A|`
    const fact = parse(...para)
    expect(fact).toEqual(hope)
  })

  it('逢15的bug', () => {
    const para = [
      "(43)-------"
    ]
    const hope = `F/2E/2-E-E6|`
    const fact = parse(...para)
    expect(fact).toEqual(hope)
  })

});

