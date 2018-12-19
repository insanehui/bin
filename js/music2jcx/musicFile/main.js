/*
 * music文件的整体解析
 */
import yaml from 'js-yaml'

export default function parse(file) {
  // 先分成两部分，按 ==========（三个以上） 区分
  const parts = file.split(/===+\n/)
  const header = yaml.load(parts[0])

  return {
    header,
    score : parts[1],
  }
}
