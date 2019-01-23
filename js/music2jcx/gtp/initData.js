/*
 * gtp的初始数据
 */
import _ from 'lodash'
import {repeat} from 'ramda'

// 返回Buffer类型
function dump(obj) {
  if ( obj instanceof Buffer ) {
    return obj
  } 
  if ( _.isArray(obj) ) {
    let ret = Buffer.from('')
    for (const item of obj) {
      ret = Buffer.concat([ret, dump(item)])
    }
    return ret
  } if ( _.isString(obj) ) {
    return Buffer.from(obj)
  } 
  else {
    return obj.dump()
  }
}

function buf_from_uint32(i) { // 使用little indian
  const buf = new Buffer(4)
  buf.writeUInt32LE(i)
  return buf
}

function buf_from_uint8(i) {
  const buf = new Buffer(1)
  buf.writeUInt8(i)
  return buf
}

class Data {
  constructor(v) {
    this.value = v
  }
}

class Int {
  constructor(v = 0) {
    this.value = v
  }
}

class ArrayData {
  constructor(v = []) {
    this.value = v
  }
}

class ObjectData {
  constructor(v = {}) {
    _.assign(this, v)
  }
}

class UInt32 extends Int {
  dump() {
    const buf = new Buffer(4)
    buf.writeUInt32LE(this.value)
    return buf
  }
}

class UInt8 extends Int {
  dump() {
    const buf = new Buffer(1)
    buf.writeUInt8(this.value)
    return buf
  }
}

class StringData {
  constructor(v = '') {
    this.value = v
  }
}

class String1 extends StringData { // string类型1，结构有点晦涩，似乎是短字符串类型
  /*
   * 字符串的长度用一个4字节的unsigned来存储，采用小端存储
   */
  dump(){
    const bstr = Buffer.from(this.value)
    const blen = buf_from_uint8(bstr.length)
    const bsize = buf_from_uint32(bstr.length +1 )
    return Buffer.concat([bsize, blen, bstr])
  }
}

class String2 extends StringData { // string类型2，似乎是长字符串类型
  dump() {
    const {value} = this
    return dump([
      new UInt32(value.length),
      value,
    ])
  }
}

class StringMax { // 有最大长度限制的字符串
  constructor(str, max) {
    this.value = str
    this.max = max
  }

  dump() {
    const buf = Buffer.alloc(this.max + 1) 
    let l = 0
    l = buf.write(this.value, 1)
    buf.writeUInt8(l)
    return buf
  }
}

class Version extends StringMax {
  constructor(v) {
    super(v, 30)
  }
}

class Title extends String1 { }
class Subtitle extends String1 { }
class Artist extends String1 { }
class Album extends String1 { }
class LyricsAuthor extends String1 { }
class MusicAuthor extends String1 { }
class Copyright extends String1 { }
class Tab extends String1 { }
class Instructions extends String1 { }

class Comments extends ArrayData {
  dump(){
    const {value} = this // 数组类型

    return dump([
      new UInt32(value.length),
      _.map(value, v=>new String2(v)),
    ])
  }
}

class Lyrics extends Data {
  dump() {
    return dump([
      new UInt32(),
      repeat([
        new UInt32(1),
        new String2(),
      ], 5),
    ])
  }
}

class PageSetup extends Data {
  dump() {
    return dump([
      Buffer.from(
        // 跳过的内容，不知道是什么东西，49 bytes
        [100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 210, 0, 0, 0, 41, 1, 0, 0, 10, 0, 0, 0, 10, 0, 0, 0, 15, 0, 0, 0, 10, 0, 0, 0, 100, 0, 0, 0, 255, 1]
      ),

      // 类似%TITLE%这些相关设置，先不管
      Buffer.from([
        8,0,0,0,7,37,84,73,84,76,69,37,11,0,0,0,10,37,83,85,66,84,73,84,76,69,37,9,0,0,0,8,37,65,82,84,73,83,84,37,8,0,0,0,7,37,65,76,66,85,77,37,17,0,0,0,16,87,111,114,100,115,32,98,121,32,37,87,79,82,68,83,37,17,0,0,0,16,77,117,115,105,99,32,98,121,32,37,77,85,83,73,67,37,30,0,0,0,29,87,111,114,100,115,32,38,32,77,117,115,105,99,32,98,121,32,37,87,79,82,68,83,77,85,83,73,67,37,22,0,0,0,21,67,111,112,121,114,105,103,104,116,32,37,67,79,80,89,82,73,71,72,84,37,54,0,0,0,53,65,108,108,32,82,105,103,104,116,115,32,82,101,115,101,114,118,101,100,32,45,32,73,110,116,101,114,110,97,116,105,111,110,97,108,32,67,111,112,121,114,105,103,104,116,32,83,101,99,117,114,101,100,13,0,0,0,12,80,97,103,101,32,37,78,37,47,37,80,37,9,0,0,0,8,77,111,100,101,114,97,116,101
      ])
    ])
  }
}

class Tempo extends UInt32 { }
class Capo extends UInt32 {}

class KeySign extends UInt32 {}
class Octave extends UInt8 {}
// class Flags extends UInt8 {}
class BeatFlags extends UInt8 {}
class BeatStringFlags extends UInt8 {}
class NoteFlags extends UInt8 {} 

class MeasureCount extends UInt32 { }
class TrackCount extends UInt32 { }
class BeatCount extends UInt32 { }

class MeasureHeader extends ObjectData {
  dump() {
    const {
      beat_count, // 每小节几拍
      beat_unit, // 以几分音符为一拍
      key_sign, // 调号
      // triplet_feel, // 三连音节拍，先写死
      // repeat_open, // 重复记号开始，先不处理
    } = this

    let load = []

    const BEAT_COUNT = 0x01
    const BEAT_UNIT = 0x02 
    const KEY_SIGN = 0x40

    let flags = 0

    if ( beat_count ) {
      flags |= BEAT_COUNT
      load.push(new UInt8(beat_count))
    } 
    if ( beat_unit ) {
      flags |= BEAT_UNIT
      load.push(new UInt8(beat_unit))
    } 
    if ( key_sign !== undefined ) {
      flags |= KEY_SIGN 
      load.push(new UInt8(key_sign))
      load.push(new UInt8(0))
    } 
    if ( beat_count || beat_unit ) {
      load.push(Buffer.from([3,3,0,0]))
    } 
    load.push(Buffer.from([0])) // if ((flags & 0x10) === 0) 

    load.push(new UInt8(0)) // triplet_feel

    load.push(Buffer.from([0])) // 补空位，现在还不知道是在前面补还是后面

    load.unshift(new UInt8(flags))

    // flags占一字节
    // 如果有指定节拍，共占两字节，第一小节必有
    // 可能有调号
    return dump(load)
  }
}

class Channels {
  dump(){
    return Buffer.from([
      25,0,0,0,13,8,0,0,0,0,0,0,25,0,0,0,13,8,0,0,0,0,0,0,25,0,0,0,13,8,0,0,0,0,0,0,25,0,0,0,13,8,0,0,0,0,0,0,25,0,0,0,13,8,0,0,0,0,0,0,25,0,0,0,13,8,0,0,0,0,0,0,25,0,0,0,13,8,0,0,0,0,0,0,25,0,0,0,13,8,0,0,0,0,0,0,25,0,0,0,13,8,0,0,0,0,0,0,0,0,0,0,13,8,0,0,0,0,0,0,25,0,0,0,13,8,0,0,0,0,0,0,25,0,0,0,13,8,0,0,0,0,0,0,25,0,0,0,13,8,0,0,0,0,0,0,25,0,0,0,13,8,0,0,0,0,0,0,25,0,0,0,13,8,0,0,0,0,0,0,25,0,0,0,13,8,0,0,0,0,0,0,25,0,0,0,13,8,0,0,0,0,0,0,25,0,0,0,13,8,0,0,0,0,0,0,25,0,0,0,13,8,0,0,0,0,0,0,25,0,0,0,13,8,0,0,0,0,0,0,25,0,0,0,13,8,0,0,0,0,0,0,25,0,0,0,13,8,0,0,0,0,0,0,25,0,0,0,13,8,0,0,0,0,0,0,25,0,0,0,13,8,0,0,0,0,0,0,25,0,0,0,13,8,0,0,0,0,0,0,0,0,0,0,13,8,0,0,0,0,0,0,25,0,0,0,13,8,0,0,0,0,0,0,25,0,0,0,13,8,0,0,0,0,0,0,25,0,0,0,13,8,0,0,0,0,0,0,25,0,0,0,13,8,0,0,0,0,0,0,25,0,0,0,13,8,0,0,0,0,0,0,25,0,0,0,13,8,0,0,0,0,0,0,25,0,0,0,13,8,0,0,0,0,0,0,25,0,0,0,13,8,0,0,0,0,0,0,25,0,0,0,13,8,0,0,0,0,0,0,25,0,0,0,13,8,0,0,0,0,0,0,25,0,0,0,13,8,0,0,0,0,0,0,25,0,0,0,13,8,0,0,0,0,0,0,25,0,0,0,13,8,0,0,0,0,0,0,25,0,0,0,13,8,0,0,0,0,0,0,25,0,0,0,13,8,0,0,0,0,0,0,0,0,0,0,13,8,0,0,0,0,0,0,25,0,0,0,13,8,0,0,0,0,0,0,25,0,0,0,13,8,0,0,0,0,0,0,25,0,0,0,13,8,0,0,0,0,0,0,25,0,0,0,13,8,0,0,0,0,0,0,25,0,0,0,13,8,0,0,0,0,0,0,25,0,0,0,13,8,0,0,0,0,0,0,25,0,0,0,13,8,0,0,0,0,0,0,25,0,0,0,13,8,0,0,0,0,0,0,25,0,0,0,13,8,0,0,0,0,0,0,25,0,0,0,13,8,0,0,0,0,0,0,25,0,0,0,13,8,0,0,0,0,0,0,25,0,0,0,13,8,0,0,0,0,0,0,25,0,0,0,13,8,0,0,0,0,0,0,25,0,0,0,13,8,0,0,0,0,0,0,25,0,0,0,13,8,0,0,0,0,0,0,0,0,0,0,13,8,0,0,0,0,0,0,25,0,0,0,13,8,0,0,0,0,0,0,25,0,0,0,13,8,0,0,0,0,0,0,25,0,0,0,13,8,0,0,0,0,0,0,25,0,0,0,13,8,0,0,0,0,0,0,25,0,0,0,13,8,0,0,0,0,0,0,25,0,0,0,13,8,0,0,0,0,0,0,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,0,0,0,0
    ])
  }
}

class TrackName extends StringMax {
  constructor(v) {
    super(v, 40)
  }
}

class Tuning extends ArrayData {
  dump() {
    const {value} = this
    return dump([
      new UInt32(value.length),
      Buffer.from(Uint32Array.from(this.value).buffer),
      new UInt32(0xffffffff),
    ])
  }
}

class NoteType extends UInt8 {}
class NoteFret extends UInt8 {}

// class Beat extends ObjectData {
//   dump(){
//     let flags = 0
//     let load = []
//     load.push(new UInt8(flags)) // 暂时考虑flags都为0的情况
//   }
// }

const emptyVoice = Buffer.from([0,0,0])
const emptyMeasureVoice = [ // 第二声部
  new BeatCount(1),
  [ // 一个beat
    new BeatFlags(0x40), 
    emptyVoice,
    Buffer.from([0]),
    new UInt8(), 
  ], 
]

const version = new Version('FICHIER GUITAR PRO v5.10')

const initData = [
  version,
  new Title(),
  new Subtitle(),
  new Artist(),
  new Album(),
  new LyricsAuthor(),
  new MusicAuthor(),
  new Copyright(),
  new Tab(),
  new Instructions(),
  new Comments(),
  new Lyrics(),
  new PageSetup(),
  new Tempo(90),
  Buffer.from([0]),
  new KeySign(),
  new Octave(),
  new Channels(),
]

export default initData

