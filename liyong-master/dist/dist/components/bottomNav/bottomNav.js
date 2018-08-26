Component({
  properties: {
    active: {
      type: String, // ['home', 'discover', 'mine']
      value: 'home'
    }
  },

  methods: {
    gotoNav (event) {
      const { active } = this.data
      const { name } = event.currentTarget.dataset
      if (active == name) return

      switch (name) {
        case 'home':
          return wx.redirectTo({ url: '/pages/explore/selection/selection' })
        case 'discover':
          return wx.redirectTo({ url: '/pages/discover/afterSaleShow/afterSaleShow' })
        case 'mine':
          return wx.redirectTo({ url: '/pages/mine/index/index' })
      }
    }
  }
})
