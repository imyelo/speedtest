class Timing {
  constructor () {
    this.marks = new Map()
  }
  now () {
    return performance ? performance.now() : Date.now()
  }
  mark (name) {
    this.marks.set(name, this.now())
  }
  duration (start, end) {
    if (!end) {
      return this.now() - this.marks.get(start)
    }
    return this.marks.get(end) - this.marks.get(start)
  }
}

export default Timing
