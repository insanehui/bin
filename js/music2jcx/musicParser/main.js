/*
 * music文件的整体解析
 */
import parseHeader from './header.js'
import parseTracks from './tracks.js'

export default function parse(file = '') {
  // 先分成两部分，按 ==========（三个以上） 区分
  const [a, b] = file.split(/===+\n/)
  const header = parseHeader(a)
  const tracks = parseTracks(b)

  return {
    header,
    tracks,
  }
}
