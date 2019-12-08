class Timing {
  constructor () {
    this.marks = new Map()
  }
  mark (name) {
    this.marks.set(name, performance ? performance.now() : Date.now())
  }
  duration (start, end) {
    return this.marks.get(end) - this.marks.get(start)
  }
}

export default Timing
