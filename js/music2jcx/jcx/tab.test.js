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
});
