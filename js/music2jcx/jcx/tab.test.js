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

  it('h, s, p', () => {
    const para = [
      '"C"53 (3h6.@3)2 2@2121'
    ]
    const hope = `"C"excxcx/2-H-c2/2bxb3axbxax|`
    const fact = parse(...para)
    expect(fact).toEqual(hope)
  })

  it('多声部+和弦外音', () => {
    const para = [
      '"Am"[5 5.@3]'
    ]
    const hope = `"Am"[exc0]|`
    const fact = parse(...para)
    expect(fact).toEqual(hope)
  })

  it('扫弦连接', () => {
    const para = [
      '"F"[123]^- [123]^[123]v _[123]^[123]v [123]^[123]v'
    ]
    const hope = `"F"V[ax*2bx*2cx*2]V[axbxcx]U[axbxcx]-V[axbxcx]U[axbxcx]V[axbxcx]U[axbxcx]|`
    const fact = parse(...para)
    expect(fact).toEqual(hope)
  })

  it('扫弦简写', () => {
    const para = [
      '"F"[123]^- ^v _^v ^v'
    ]
    const hope = `"F"V[ax*2bx*2cx*2]V[axbxcx]U[axbxcx]-V[axbxcx]U[axbxcx]V[axbxcx]U[axbxcx]|`
    const fact = parse(...para)
    expect(fact).toEqual(hope)
  })

  it('扫弦', () => {
    const para = [
      '"Em"[6543]^-[1234]^([1234]^[1234]v)'
    ]
    const hope = `"Em"V[fx*2ex*2dx*2cx*2]V[axbxcxdx]V[ax/2bx/2cx/2dx/2]U[ax/2bx/2cx/2dx/2]|`
    const fact = parse(...para)
    expect(fact).toEqual(hope)
  })

});
