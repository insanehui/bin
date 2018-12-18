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

  xit('bar', () => {
    const para = [
      "0 0 (5.5.) | 6. 5. 1 | 7. - (5.5.)"
    ]
    const hope = `zzg,/2g,/2|a,g,c|b,2g,/2g,/2|`
    const fact = parse(...para)
    expect(fact).toEqual(hope)
  })

});

