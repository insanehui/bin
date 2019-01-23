/*
 * 生成gtp的tracks的数据
 */

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
