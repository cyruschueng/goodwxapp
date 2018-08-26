let app = getApp()

Page(Object.assign(app.page,{
  data: {},
  onLoad() {
    this.setData({
      strokeWidth: 6,
      backgroundColor:"#ccc",
      activeColor:"#10AEFF",
      strokeWidth:2
    })
  }
}))
