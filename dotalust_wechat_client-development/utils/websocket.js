const VSN = "1.0.0"
const WEBSOCKET_STATES = {
  connecting: 0,
  open: 1,
  closing: 2,
  closed: 3
}
const DEFAULT_TIMEOUT = 10000
const WS_CLOSE_NORMAL = 1000
const CHANNEL_STATES = {
  closed: "closed",
  errored: "errored",
  joined: "joined",
  joining: "joining",
  leaving: "leaving",
}
const CHANNEL_EVENTS = {
  close: "phx_close",
  error: "phx_error",
  join: "phx_join",
  reply: "phx_reply",
  leave: "phx_leave"
}

class Timer {
  constructor(callback, timerCalc) {
    this.callback = callback
    this.timerCalc = timerCalc
    this.timer = null
    this.tries = 0
  }

  reset() {
    this.tries = 0
    clearTimeout(this.timer)
  }

  /**
   * Cancels any previous scheduleTimeout and schedules callback
   */
  scheduleTimeout() {
    clearTimeout(this.timer)

    this.timer = setTimeout(() => {
      this.tries = this.tries + 1
      this.callback()
    }, this.timerCalc(this.tries + 1))
  }
}

class Push {
  constructor(channel, event, payload, timeout) {
    this.channel = channel
    this.event = event
    this.payload = payload || {}
    this.receivedResp = null
    this.timeout = timeout
    this.timeoutTimer = null
    this.recHooks = []
    this.sent = false
  }

  /**
   *
   * @param {number} timeout
   */
  resend(timeout) {
    this.timeout = timeout
    this.cancelRefEvent()
    this.ref = null
    this.refEvent = null
    this.receivedResp = null
    this.sent = false
    this.send()
  }

  /**
   *
   */
  send() {
    if (this.hasReceived("timeout")) {
      return
    }
    this.startTimeout()
    this.sent = true
    this.channel.socket.push({
      topic: this.channel.topic,
      event: this.event,
      payload: this.payload,
      ref: this.ref
    })
  }

  /**
   *
   * @param {*} status
   * @param {*} callback
   */
  receive(status, callback) {
    if (this.hasReceived(status)) {
      callback(this.receivedResp.response)
    }

    this.recHooks.push({
      status,
      callback
    })
    return this
  }

  // private

  matchReceive({
    status,
    response,
    ref
  }) {
    this.recHooks.filter(h => h.status === status)
      .forEach(h => h.callback(response))
  }

  cancelRefEvent() {
    if (!this.refEvent) {
      return
    }
    this.channel.off(this.refEvent)
  }

  cancelTimeout() {
    clearTimeout(this.timeoutTimer)
    this.timeoutTimer = null
  }

  startTimeout() {
    if (this.timeoutTimer) {
      return
    }
    this.ref = this.channel.socket.makeRef()
    this.refEvent = this.channel.replyEventName(this.ref)

    this.channel.on(this.refEvent, payload => {
      this.cancelRefEvent()
      this.cancelTimeout()
      this.receivedResp = payload
      this.matchReceive(payload)
    })

    this.timeoutTimer = setTimeout(() => {
      this.trigger("timeout", {})
    }, this.timeout)
  }

  hasReceived(status) {
    return this.receivedResp && this.receivedResp.status === status
  }

  trigger(status, response) {
    this.channel.trigger(this.refEvent, {
      status,
      response
    })
  }
}

export class Channel {
  constructor(topic, params, socket) {
    this.state = CHANNEL_STATES.closed
    this.topic = topic
    this.params = params || {}
    this.socket = socket
    this.bindings = []
    this.timeout = this.socket.timeout
    this.joinedOnce = false
    this.joinPush = new Push(this, CHANNEL_EVENTS.join, this.params, this.timeout)
    this.pushBuffer = []
    this.rejoinTimer = new Timer(
      () => this.rejoinUntilConnected(),
      this.socket.reconnectAfterMs
    )
    this.joinPush.receive("ok", () => {
      this.state = CHANNEL_STATES.joined
      this.rejoinTimer.reset()

      this.pushBuffer.forEach(pushEvent => pushEvent.send())
      this.pushBuffer = []
    })
    this.onClose(() => {
      this.rejoinTimer.reset()
      this.state = CHANNEL_STATES.closed
      this.socket.remove(this)
    })
    this.onError(reason => {
      if (this.isLeaving() || this.isClosed()) {
        return
      }
      this.state = CHANNEL_STATES.errored
      this.rejoinTimer.scheduleTimeout()
    })
    this.joinPush.receive("timeout", () => {
      if (!this.isJoining()) {
        return
      }
      this.state = CHANNEL_STATES.errored

      this.rejoinTimer.scheduleTimeout()
    })
    this.on(CHANNEL_EVENTS.reply, (payload, ref) => {

      this.trigger(this.replyEventName(ref), payload)
    })
  }

  rejoinUntilConnected() {
    this.rejoinTimer.scheduleTimeout()

    if (this.socket.isConnected()) {
      this.rejoin()
    }
  }

  join(timeout = this.timeout) {
    if (this.joinedOnce) {
      throw (`tried to join multiple times. 'join' can only be called a single time per channel instance`)
    } else {
      this.joinedOnce = true
      this.rejoin(timeout)
      return this.joinPush
    }
  }

  onClose(callback) {
    this.on(CHANNEL_EVENTS.close, callback)
  }

  onError(callback) {
    this.on(CHANNEL_EVENTS.error, reason => callback(reason))
  }

  on(event, callback) {
    this.bindings.push({
      event,
      callback
    })
  }

  off(event) {
    this.bindings = this.bindings.filter(bind => bind.event !== event)
  }

  canPush() {
    return this.socket.isConnected() && this.isJoined()
  }

  push(event, payload, timeout = this.timeout) {
    if (!this.joinedOnce) {
      throw (`tried to push '${event}' to '${this.topic}' before joining. Use channel.join() before pushing events`)
    }
    let pushEvent = new Push(this, event, payload, timeout)

    if (this.canPush()) {
      pushEvent.send()
    } else {
      pushEvent.startTimeout()
      this.pushBuffer.push(pushEvent)
    }

    return pushEvent
  }

  leave(timeout = this.timeout) {
    this.state = CHANNEL_STATES.leaving
    let onClose = () => {
      this.trigger(CHANNEL_EVENTS.close, "leave", this.joinRef())
    }
    let leavePush = new Push(this, CHANNEL_EVENTS.leave, {}, timeout)
    leavePush.receive("ok", () => onClose())
      .receive("timeout", () => onClose())
    leavePush.send()
    if (!this.canPush()) {
      leavePush.trigger("ok", {})
    }

    return leavePush
  }

  /**
   * Overridable message hook
   *
   * Receives all events for specialized message handling
   * before dispatching to the channel callbacks.
   *
   * Must return the payload, modified or unmodified
   */
  onMessage(event, payload, ref) {
    return payload
  }

  // private

  isMember(topic) {
    return this.topic === topic
  }

  joinRef() {
    return this.joinPush.ref
  }

  sendJoin(timeout) {
    this.state = CHANNEL_STATES.joining

    this.joinPush.resend(timeout)
  }

  rejoin(timeout = this.timeout) {
    if (this.isLeaving()) {
      return
    }
    this.sendJoin(timeout)
  }

  trigger(event, payload, ref) {
    let {
      close,
      error,
      leave,
      join
    } = CHANNEL_EVENTS
    if (ref && [close, error, leave, join].indexOf(event) >= 0 && ref !== this.joinRef()) {
      return
    }

    let handledPayload = this.onMessage(event, payload, ref)
    if (payload && !handledPayload) {
      throw ("channel onMessage callbacks must return the payload, modified or unmodified")
    }

    this.bindings.filter(bind => bind.event === event)
      .map(bind => bind.callback(handledPayload, ref))
  }

  replyEventName(ref) {
    return `chan_reply_${ref}`
  }

  isClosed() {
    return this.state === CHANNEL_STATES.closed
  }

  isErrored() {
    return this.state === CHANNEL_STATES.errored
  }

  isJoined() {
    return this.state === CHANNEL_STATES.joined
  }

  isJoining() {
    return this.state === CHANNEL_STATES.joining
  }

  isLeaving() {
    return this.state === CHANNEL_STATES.leaving
  }
}

export class Websocket {
  constructor(endPoint, opts = {}) {
    this.state = WEBSOCKET_STATES.closed
    this.endPoint = `${endPoint}/websocket`
    this.callbacks = {
      connectSocketSuccess: [],
      connectSocketFail: [],
      connectSocketComplete: [],

      onSocketOpen: [],

      onSocketError: [],

      sendSocketMessageSuccess: [],
      sendSocketMessageFail: [],
      sendSocketMessageComplete: [],

      onSocketMessage: [],

      onSocketClose: []
    }
    this.channels = []
    this.sendBuffer = []
    this.ref = 0
    this.timeout = opts.timeout || DEFAULT_TIMEOUT
    this.heartbeatTimer = null
    this.pendingHeartbeatRef = null
    this.heartbeatIntervalMs = opts.heartbeatIntervalMs || 30000
    this.reconnectAfterMs = opts.reconnectAfterMs || function (tries) {
      return [1000, 2000, 5000, 10000][tries - 1] || 10000
    }

    this.params = opts.params || {}
    this.reconnectTimer = null
  }

  setupReconnectTimer() {
    this.reconnectTimer = new Timer(() => {
      this.connect()
    }, this.reconnectAfterMs)
  }

  connect() {
    if (this.isConnected()) {
      return
    }

    let websocket = this
    websocket.setupReconnectTimer()

    websocket.state = WEBSOCKET_STATES.connecting
    wx.connectSocket({
      url: this.endPoint,
      method: "GET",
      success(response) {
        websocket.state = WEBSOCKET_STATES.open

        websocket.fireCallbacks("connectSocketSuccess", response)
      },
      fail(response) {
        websocket.state = WEBSOCKET_STATES.closed

        websocket.fireCallbacks("connectSocketFail", response)
      },
      complete(response) {
        websocket.fireCallbacks("connectSocketComplete", response)
      }
    })

    wx.onSocketOpen((response) => {
      websocket.flushSendBuffer()
      websocket.reconnectTimer.reset()

      clearInterval(websocket.heartbeatTimer)
      websocket.heartbeatTimer = setInterval(() => websocket.sendHeartbeat(), websocket.heartbeatIntervalMs)

      websocket.fireCallbacks("onSocketOpen", response)
    })

    wx.onSocketMessage((response) => {
      let {
        topic,
        event,
        payload,
        ref
      } = JSON.parse(response.data)

      if (ref && ref === this.pendingHeartbeatRef) {
        this.pendingHeartbeatRef = null
      }

      this.channels.filter(channel => channel.isMember(topic))
        .forEach(channel => channel.trigger(event, payload, ref))

      websocket.fireCallbacks("onSocketMessage", response)
    })

    wx.onSocketError((response) => {
      websocket.state = WEBSOCKET_STATES.closing

      websocket.triggerChannelsError()
      websocket.fireCallbacks("onSocketError", response)
    })

    wx.onSocketClose((response) => {
      websocket.state = WEBSOCKET_STATES.closed

      websocket.triggerChannelsError()
      clearInterval(this.heartbeatTimer)
      this.reconnectTimer && this.reconnectTimer.scheduleTimeout()
      websocket.fireCallbacks("onSocketClose", response)
    })
  }

  disconnect(opts = {}, callback) {
    this.reconnectTimer = null

    wx.closeSocket(opts)

    callback && callback()
  }

  push(data) {
    let {
      topic,
      event,
      payload,
      ref
    } = data
    let websocket = this

    let callback = () => {
      wx.sendSocketMessage({
        data: JSON.stringify(data),
        success(response) {
          websocket.fireCallbacks("sendSocketMessageSuccess", response)
        },
        fail(response) {
          websocket.fireCallbacks("sendSocketMessageFail", response)
        },
        complete(response) {
          websocket.fireCallbacks("sendSocketMessageComplete", response)
        }
      })
    }

    if (this.isConnected()) {
      callback()
    } else {
      this.sendBuffer.push(callback)
    }
  }

  // Channels
  remove(channel) {
    this.channels = this.channels.filter(c => c.joinRef() !== channel.joinRef())
  }

  addChannel(topic, channelParams = {}) {
    let channel = new Channel(topic, channelParams, this)
    this.channels.push(channel)
    return channel
  }

  triggerChannelsError() {
    this.channels.forEach(channel => channel.trigger(CHANNEL_EVENTS.error))
  }

  // Heartbeat
  sendHeartbeat() {
    let websocket = this

    if (this.pendingHeartbeatRef) {
      this.pendingHeartbeatRef = null

      wx.closeSocket({
        reason: 'hearbeat timeout',
        success(response) {
          websocket.fireCallbacks("closeSocketComplete", response)
        },
        fail(response) {
          websocket.fireCallbacks("closeSocketFail", response)
        },
        complete(response) {
          websocket.fireCallbacks("closeSocketComplete", response)
        }
      })

      return
    }

    this.pendingHeartbeatRef = this.makeRef()
    this.push({
      topic: "phoenix",
      event: "heartbeat",
      payload: {},
      ref: this.pendingHeartbeatRef
    })
  }

  flushSendBuffer() {
    if (this.isConnected() && this.sendBuffer.length > 0) {
      this.sendBuffer.forEach(callback => callback())

      this.sendBuffer = []
    }
  }

  isConnected() {
    return this.state === WEBSOCKET_STATES.open
  }

  addCallbacks(event, callback) {
    if (this.callbacks[event]) {
      this.callbacks[event].push(callback)
    }
  }

  fireCallbacks(event, ...args) {
    this.callbacks[event].forEach(func => func(...args))
  }

  makeRef() {
    let newRef = this.ref + 1
    if (newRef === this.ref) {
      this.ref = 0
    } else {
      this.ref = newRef
    }

    return this.ref.toString()
  }
}
