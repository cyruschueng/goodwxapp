Page({

  data: {
    checkedIndex:0
  },

  openTap: function (e) {
    this.setData({
      checkedIndex : Number(e.currentTarget.dataset.index)
    })
  }
  

  
})