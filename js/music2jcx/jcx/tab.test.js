import parse from './tab.js'

describe('tab', () => {
  it('取消和弦', () => {
    const para = [
      '"Am"5323=561'
    ]
    const hope = `"Am"excxbxcxa3a5b1|`
    const fact = parse(...para)
    expect(fact).toEqual(hope)
  })

  it('扫弦', () => {
    const para = [
      '"Em"[6543]^-[1234]^([1234]^[1234]v)'
    ]
    const hope = `"Em"V[fx*2ex*2dx*2cx*2]V[axbxcxdx]V[ax*1/2bx*1/2cx*1/2dx*1/2]U[ax*1/2bx*1/2cx*1/2dx*1/2]|`
    const fact = parse(...para)
    expect(fact).toEqual(hope)
  })

});
