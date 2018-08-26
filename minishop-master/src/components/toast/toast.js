export default {
  data () {
    return {
      toast: {
        show: false,
        title: '出错了',
        duration: 1500,
        mask: true
      }
    }
  },

  openToast (options) {
    const toast = this.data.toast
    if (typeof options === 'string') {
      toast.title = options
    } else {
      for (let key in options) {
        toast[key] = options[key]
      }
    }
    toast.show = true
    this.setData({
      toast
    })
    setTimeout(() => {
      this.setData({
        'toast.show': false
      })
    }, this.data.toast.duration)
  }
}
