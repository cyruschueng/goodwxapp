
Page({
    onLoad: function(options) {
        var data= {
          "appId": options.appid
        };
        if(options.path){
          data.path=options.path
        }
        wx.navigateToMiniProgram(data)
    }
})