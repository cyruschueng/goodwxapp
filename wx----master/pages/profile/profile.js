var app=getApp();
Page({
  data: {
    userInfo:null,
    changeNum:0,
    hasChanged:0,
    nToy:0,
    showMask:'none'
  },
  bShow(){
      if(this.data.showMask=='none'){
          this.setData({
              showMask:'block'
          })
      }else{
          this.setData({
              showMask:'none'
          })
      }
  },
  onShareAppMessage:function(res) {
        var that=this;
        var name=this.data.userInfo.nickName;
        console.log(name)
        return {
            title: `${name}邀请您快来答题赢奖品哦！！`,
            path: '/pages/profile/profile?id=123',
            success: function(res) {
                var shareTickets = res.shareTickets;
                if (shareTickets.length == 0) {
                    return false;
                }
                wx.getShareInfo({
                    shareTicket: shareTickets[0],
                    success: function(res){
                        var encryptedData = res.encryptedData;
                        var iv = res.iv;
                        console.log(res);
                        app.globalData.changeNum+=1;
                        that.setData({
                            changeNum:app.globalData.changeNum
                        })
                    }
                })
                wx.showToast({
                    title: '转发成功',
                    icon: 'success',
                    duration: 1000
                });
            },
            fail: function(res) {
                wx.showToast({
                    title: '要转发到群才可以哦',
                    icon: 'none',
                    duration: 2000
                })
            }
        }
    },
  onLoad: function () {
      wx.showShareMenu({
          withShareTicket:true
      })
  },
  onShow: function () {
      this.setData({
          userInfo:app.globalData.userInfo,
          changeNum:app.globalData.changeNum,
          hasChanged:app.globalData.hasChanged,
          nToy:app.globalData.nToy
      })
  }
})