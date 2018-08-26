Page({
  data: {
    msg: ''
  },

  onLoad (options) {
    const { msg } = options
    // request:fail
    setTimeout(() => {
      this.setData({
        msg
      })
    }, 0)
  }
})
