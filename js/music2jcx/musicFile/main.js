/*
 * music文件的整体解析
 */

export default function parse(file) {
  // 先分成两部分，按 ==========（三个以上） 区分
  const parts = file.split(/===+\n/)
  return parts
}
