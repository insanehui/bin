/*
 * music文件的整体解析
 */
import yaml from 'js-yaml'

function groupTracks(score) {
  const tracks = {}
  // 按行拆分
  const lines = score.split('\n')
  for (const line of lines) {
    // 如果是曲谱音轨
    const trackPre = /^<(\S+)>/
    const regExec = trackPre.exec(line)
    if ( regExec ) { // 是个音轨
      const name = regExec[1]
      if ( !tracks[name] ) {
        tracks[name] = {
          name,
          lines : []
        }
      } 
      const score = line.replace(trackPre, '')
      tracks[name].lines.push(score)
    } 
  }
  return tracks
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
