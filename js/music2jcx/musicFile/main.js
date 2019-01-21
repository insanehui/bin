/*
 * music文件的整体解析
 */
import yaml from 'js-yaml'
import _ from 'lodash'

import wash from '../../utils/modash/arsonWash.js'

function groupTracks(score) {
  const tracks = {}
  // 按行拆分
  const lines = score.split('\n')
  let lastTrack = null // 保留上一个音轨. 用于收集歌词. 这里沿用了jcx的形式
  for (const line of lines) {
    // 如果是曲谱音轨
    const trackPre = /^<(\S+)>/
    const trackExec = trackPre.exec(line)
    const lyricsPre = /^w:/ // 注：前面的冒号可有可无
    if ( trackExec ) { // 是个音轨
      const name = trackExec[1]
      if ( !tracks[name] ) {
        tracks[name] = {
          name,
          lines : []
        }
      } 
      const score = line.replace(trackPre, '')
      tracks[name].lines.push(score)
      lastTrack = name
    } 
    else if ( lyricsPre.test(line) ) {
      tracks[lastTrack].lines.push(line) 
    } 
  }
  return tracks
}

function parseHeader(a) {
  const header = yaml.load(a)
  const {tracks} = header
  header.tracksObj = _.mapKeys(tracks, v=>v.name)
  return header
}

// 调整一下obj，方便读取数据
function refineObj(obj) {
  // 之所以要用arson的wash是因为obj里有交叉引用的结构
  obj = wash(obj)
  for (const track of obj.header.tracks) {
    const {jcx} = track
    if ( typeof jcx === 'string' ) {
      track.jcx = [jcx]
    } 
    track.jcx = _.map(track.jcx, v=>{
      if ( (typeof v) === 'string' ) {
        return {
          type : v,
        }
      } 
      else {
        return v
      }
    })
  }
  return obj
}

export default function parse(file) {
  // 先分成两部分，按 ==========（三个以上） 区分
  const [a, b] = file.split(/===+\n/)
  const header = parseHeader(a)
  const tracks = groupTracks(b)

  return refineObj({
    header,
    tracks,
  })
}
