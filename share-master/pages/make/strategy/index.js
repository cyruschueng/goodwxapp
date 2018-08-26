const App = getApp()

Page({
  data: {
    
  },
  onLoad() {
  	
  },
  makelink(e) {
    App.WxService.switchTab('/pages/index/index')
  },
})