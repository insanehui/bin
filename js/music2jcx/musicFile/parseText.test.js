import parse from './parseText.js'

describe('parseText', () => {
  it('基础', () => {
    const para = [
      "123"
    ]
    const hope = [
      {
        "notes": [
          "1"
        ]
      },
      {
        "notes": [
          "2"
        ]
      },
      {
        "notes": [
          "3"
        ]
      }
    ]
    const fact = parse(...para)
    expect(fact).toEqual(hope)
  })
});
