import convert from './music2jcx.js'

describe('music2jcx', () => {
  it('简单分解', () => {
    const para = [
`title : 简单分解
timeSign : 4/4
tracks : 
  - name: guitar
    jcx: [tab]
=================
<guitar> 1 2 3 1
`,
    ]
    const hope = `
    `

    const fact = convert(...para)
    console.log(`=======\n${fact}`)
    // expect(fact).toEqual(hope)
  })
});
