import {parse} from './parse.js'

it('parse', () => {
  const para = [
  "1 ( (23) (4 (56)) ) | 1 (12) 3 (34)"
]
  const hope = `c2d/2e/2f/2g/4a/4|cc/2d/2ee/2f/2|`
  const fact = parse(...para)
  expect(fact).toEqual(hope)
})