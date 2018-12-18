import {parse} from './parse.js'

describe('parse', () => {
  xit('normal', () => {
    const para = [
      "1 ( (23) (4 (56)) ) | 1 (12) 3 (34)"
    ]
    const hope = `c2d/2e/2f/2g/4a/4|cc/2d/2ee/2f/2|`
    const fact = parse(...para)
    expect(fact).toEqual(hope)
  })

  it('high and low', () => {
    const para = [
      "1. 2 3' 4'"
    ]
    const hope = `c,de'f'|`
    const fact = parse(...para)
    expect(fact).toEqual(hope)
  })

  xit('跨小节连音线', () => {
    // 标注琴弦的位置
    const para = [
      "1 2 3 4 | - 5 6 7"
    ]
    const hope = ``
    const fact = parse(...para)
    expect(fact).toEqual(hope)
  })

  xit('bar', () => {
    const para = [
      "0 0 (5.5.) | 6. 5. 1 | 7. - (5.5.)"
    ]
    const hope = `zzg,/2g,/2|a,g,c|b,2g,/2g,/2|`
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

