Component({
  properties: {
    text: {
      type: String,
      value: ''
    },
    url: {
      type: String,
      value: ''
    }
  },

  methods: {
    tap () {
      const { url } = this.data
      console.log(url)
      // note: url is start with `http` or `https`
      if (/^http(s?):\/\/(.+)$/.test(url)) {
        wx.navigateTo({
          url: `/pages/webView/webView?url=${url}`
        })
      }
    }
  }
})
