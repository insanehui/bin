import convert from './music2jcx.js'

describe('music2jcx', () => {
  xit('简单分解', () => {
    const para = [
`
title : 简单分解
timeSign : 4/4
tracks : 
  - name: guitar
    jcx: tab
    beat: 1/8
=================
<guitar> "C"53231323
`,
    ]
    const hope = `
    `
    const fact = convert(...para)
    expect(fact).toEqual(hope)
  })
});