Component({
  properties: {
    self: {
      type: Boolean,
      value: false
    },
    canSign: {
      type: Boolean,
      value: false
    },
    vip: {
      type: Boolean,
      value: false
    },
    index: {
      type: Number
    },
    avatar: {
      type: String
    },
    nickname: {
      type: String,
      value: 'nickname'
    },
    signTimes: {
      type: Number
    },
    prizeTimes: {
      type: Number
    }
  },

  methods: {
    sign () {
      this.triggerEvent('sign')
    }
  }
})
