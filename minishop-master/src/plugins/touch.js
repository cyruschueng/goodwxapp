import Event from '../modules/event/index'

class Touch extends Event {
  constructor () {
    super()
    this.touch = null
    this.lastTimestamp = Date.now()
    this.spend = 0
    this.x1 = this.y1 = this.x2 = this.y2 = undefined
  }

  touchStart (e) {
    this.lastTimestamp = Date.now()
    const touch = e.touches[0]
    this.touch = touch
    this.x2 = this.x1 = touch.pageX
    this.y2 = this.y1 = touch.pageY
    this.emit('touch:start', {
      x1: this.x1,
      y1: this.y1,
      e: e,
      timestamp: this.lastTimestamp
    })
  }

  touchMove (e) {
    this.spend = Date.now() - this.lastTimestamp
    const touch = e.touches[0]
    let yrange = 0
    let xrange = 0
    if (this.y2) {
      yrange = this.y2 - touch.pageY
      xrange = this.x2 - touch.pageX
    }

    this.x2 = touch.pageX
    this.y2 = touch.pageY

    this.emit('touch:move', {
      x1: this.x1,
      y1: this.y1,
      x2: this.x2,
      y2: this.y2,
      e: e,
      toUp: yrange > 0,
      toLeft: xrange > 0,
      xrange: xrange,
      yrange: yrange,
      dir: swipeDirection(this.x1, this.x2, this.y1, this.y2),
      spend: this.spend
    })
  }

  touchEnd (e) {
    this.spend = Date.now() - this.lastTimestamp
    this.emit('touch:end', {
      x1: this.x1,
      y1: this.y1,
      x2: this.x2,
      y2: this.y2,
      dir: swipeDirection(this.x1, this.x2, this.y1, this.y2),
      e: e,
      spend: this.spend
    })
  }

  touchCancel () {
    this.emit('touch:cancel', {
      x1: this.x1,
      y1: this.y1,
      x2: this.x2,
      y2: this.y2,
      dir: swipeDirection(this.x1, this.x2, this.y1, this.y2),
      spend: this.spend
    })
    this.spend = 0
    this.touch = null
    this.x1 = this.y1 = this.x2 = this.y2 = undefined
  }

  destroy () {
    this._events = {}
  }
}

function swipeDirection (x1, x2, y1, y2) {
  return Math.abs(x1 - x2) >=
  Math.abs(y1 - y2) ? (x1 - x2 > 0 ? 'left' : 'right') : (y1 - y2 > 0 ? 'up' : 'down')
}

export default Touch
