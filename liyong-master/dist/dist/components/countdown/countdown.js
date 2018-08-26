Component({
  properties: {
    seconds: {
      type: Number,
      value: 0
    },
    format: {
      type: String, // h m s
      value: 'd天 h:m:s'
    },
    style: {
      type: Number,
      value: 1
    }
  },

  data: {
    _days: 0,
    _hours: '00',
    _minutes: '00',
    _seconds: '00',

    displayString: '',
    interval: null
  },

  ready () {
    this._computed()
    const interval = setInterval(() => {
      console.log('countdown')
      const { seconds } = this.data
      if (seconds <= 1) {
        this.triggerEvent('over')
        return clearInterval(interval)
      }
      this.setData({ interval, seconds: seconds - 1 })
      this._computed()
    }, 1000)
  },

  detached () {
    const { interval } = this.data
    clearInterval(interval)
    this.setData({ interval: null })
  },

  methods: {
    _computed () {
      const { seconds, format } = this.data
      let { _days, _hours, _minutes, _seconds } = this.data

      if (seconds < 60) {
        _seconds = String(seconds % 60).padStart(2, '0')
      } else if (seconds < 3600) {
        _minutes = String(~~(seconds / 60)).padStart(2, '0')
        _seconds = String(seconds % 60).padStart(2, '0')
      } else if (seconds < 86400) {
        _hours = String(~~(seconds % 86400 / 3600)).padStart(2, '0')
        _minutes = String(~~(seconds % 3600 / 60)).padStart(2, '0')
        _seconds = String(seconds % 60).padStart(2, '0')
      } else {
        _days = String(~~(seconds / 86400))
        _hours = String(~~(seconds % 86400 / 3600)).padStart(2, '0')
        _minutes = String(~~(seconds % 3600 / 60)).padStart(2, '0')
        _seconds = String(seconds % 60).padStart(2, '0')
      }

      let displayString
      if (_days > 0) {
        displayString = format.replace(/d/, _days)
      } else {
        displayString = format
      }
      displayString = displayString
        .replace(/h/, _hours)
        .replace(/m/, _minutes)
        .replace(/s/, _seconds)

      this.setData({ _days, _hours, _minutes, _seconds, displayString })
    }
  }
})

