export class Int {
  constructor(v = 0) {
    this.value = v
  }
}

export class UInt32 extends Int {
  dump() {
    const buf = new Buffer(4)
    buf.writeUInt32LE(this.value)
    return buf
  }
}

export class UInt8 extends Int {
  dump() {
    const buf = new Buffer(1)
    buf.writeUInt8(this.value)
    return buf
  }
}

