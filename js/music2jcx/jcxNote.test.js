import jcxNote from './jcxNote.js'

it('low', () => {
  const para = [
  "1.."
]
  const hope = `C,,`
  const fact = jcxNote(...para)
  expect(fact).toEqual(hope)
})

it('high', () => {
  const para = [
  "6'"
]
  const hope = `A'`
  const fact = jcxNote(...para)
  expect(fact).toEqual(hope)
})

