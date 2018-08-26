Component({
  properties: {
    index: {
      type: Number
    },
    finished: {
      type: Boolean,
      value: false
    },
    current: {
      type: Boolean,
      value: false
    },
    type: {
      type: String, // 'coin' or 'ticket' 金币 和 奖券
      value: 'coin'
    },
    coinAmount: {
      type: Number,
      // value: 0
    },
    large: {
      type: Boolean,
      value: false
    }
  }
})
