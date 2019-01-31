/*
 * 生成gtp的tracks的数据
 */
import _ from 'lodash'
import {UInt32, UInt8} from './types.js'

class MeasureCount extends UInt32 { }
class TrackCount extends UInt32 { }

class ObjectData {
  constructor(v = {}) {
    _.assign(this, v)
  }
}

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

export default function makeTracks() {
  return [
    new MeasureCount(2),
    new TrackCount(1),
    [ // measure header
      new MeasureHeader({
        beat_count : 6,
        beat_unit : 8,
        key_sign: 0,
      }),
      new MeasureHeader(),
    ],
    [ // track，暂只处理一个track
      new UInt8(8),
      new TrackName('track1'),
      new Tuning([64, 59, 55, 50, 45, 40]),
      [
        new UInt32(1), 
        [ // 好像是跟track相关的
          new UInt32(1), new UInt32(2),
        ],
        new UInt32(24), 
      ],
      new Capo(2),
      Buffer.from([0xff, 0, 0, 0]), // 颜色

      // 未知
      Buffer.from( [67, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100, 0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 255, 3, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 0, 0, 0, 0]),

      new String1('Acoustic - Default'),
      new String1('Acoustic Tones'),

      new UInt8(),
      [ // 所有小节
        [ // 第一小节
          [ // 第一声部
            new BeatCount(5), // beat数
            /*
             * 0x40 1弦
             * 0x20 2弦
             * 0x10 3弦
             * 0x08 4弦 ？
             * 0x04 5弦
             */
            [ // 一个beat
              new BeatFlags(), // 目前写死为0
              new UInt8(), // 音符时值, 0为4分音符
              new BeatStringFlags(0x44), // 弹哪几根弦，这里表示弹5、1弦
              [ // 音符列表，顺序由高音弦到低音弦
                [ // 一个音符
                  new NoteFlags(0x20), new NoteType(1), new NoteFret(3),
                  Buffer.from([0]),
                ], 
                [ 
                  new NoteFlags(0x20), new NoteType(1), new NoteFret(3),
                  Buffer.from([0]),
                ], 
              ],

              Buffer.from([0]),

              new UInt8(), 
            ], 
            [ // 一个beat
              new BeatFlags(), 
              new UInt8(1), 
              new BeatStringFlags(0x10), // 3弦
              [ // 音符列表
                [ // 一个音符
                  new NoteFlags(0x20), new NoteType(1), new NoteFret(0),
                  Buffer.from([0]),
                ], 
              ],

              Buffer.from([0]),
              new UInt8(), 
            ], 
            [ // 一个beat
              new BeatFlags(), 
              new UInt8(1), 
              new BeatStringFlags(0x40), // 1弦
              [ // 音符列表
                [ // 一个音符
                  new NoteFlags(0x20), new NoteType(1), new NoteFret(3),
                  Buffer.from([0]),
                ], 
              ],

              Buffer.from([0]),
              new UInt8(), 
            ], 
            [ // 一个beat
              new BeatFlags(), 
              new UInt8(1), 
              new BeatStringFlags(0x40), // 1弦
              [ // 音符列表
                [ // 一个音符
                  new NoteFlags(0x20), new NoteType(1), new NoteFret(0),
                  Buffer.from([0]),
                ], 
              ],

              Buffer.from([0]),
              new UInt8(), 
            ], 
            [ // 一个beat
              new BeatFlags(), 
              new UInt8(1), 
              new BeatStringFlags(0x40), // 1弦
              [ // 音符列表
                [ // 一个音符
                  new NoteFlags(0x20), new NoteType(1), new NoteFret(3),
                  Buffer.from([0]),
                ], 
              ],

              Buffer.from([0]),
              new UInt8(), 
            ], 
          ],
          emptyMeasureVoice, 
        ],
        new UInt8(),
        [ // 第2小节
          [ // 第一声部
            new BeatCount(4), // beat数
            [ // 一个beat
              new BeatFlags(), // 目前写死为0
              new UInt8(), // 音符时值, 0为4分音符
              new BeatStringFlags(0x44), // 弹哪几根弦，这里表示弹5、1弦
              [ // 音符列表
                [ // 一个音符
                  new NoteFlags(0x20), new NoteType(1), new NoteFret(5),
                  Buffer.from([0]),
                ], 
                [ 
                  new NoteFlags(0x20), new NoteType(1), new NoteFret(0),
                  Buffer.from([0]),
                ], 
              ],
              Buffer.from([0]),
              new UInt8(), 
            ], 
            [ // 一个beat
              new BeatFlags(), // 目前写死为0
              new UInt8(1), // 音符时值, 0为4分音符
              new BeatStringFlags(0x40), // 弹哪几根弦，这里表示弹5、1弦
              [ // 音符列表
                [ // 一个音符
                  new NoteFlags(0x20), new NoteType(1), new NoteFret(5),
                  Buffer.from([0]),
                ], 
              ],
              Buffer.from([0]),
              new UInt8(), 
            ], 
            [ // 一个beat
              new BeatFlags(), // 目前写死为0
              new UInt8(), // 音符时值, 0为4分音符
              new BeatStringFlags(0x20), 
              [ // 音符列表
                [ // 一个音符
                  new NoteFlags(0x20), new NoteType(1), new NoteFret(5),
                  Buffer.from([0]),
                ], 
              ],
              Buffer.from([0]),
              new UInt8(), 
            ], 
            [ // 一个beat
              new BeatFlags(), // 目前写死为0
              new UInt8(1), // 音符时值, 0为4分音符
              new BeatStringFlags(0x20), 
              [ // 音符列表
                [ // 一个音符
                  new NoteFlags(0x20), new NoteType(1), new NoteFret(3),
                  Buffer.from([0]),
                ], 
              ],
              Buffer.from([0]),
              new UInt8(), 
            ], 
          ],
          emptyMeasureVoice, 
        ],
      ],
    ],
  ]
}
