/*
 * music文件的整体解析
 */
import yaml from 'js-yaml'

function groupTracks(score) {
  return score
}

export default function parse(file) {
  // 先分成两部分，按 ==========（三个以上） 区分
  const [a, b] = file.split(/===+\n/)
  const header = yaml.load(a)
  const tracks = groupTracks(b)

  return {
    header,
    tracks,
  }
}
