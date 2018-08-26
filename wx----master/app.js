App({
    globalData:{
      userInfo:null,
      changeNum:1,
      hasChanged:0,
      nToy:0,
      postData:null,
      openId:0
    },
    onShow(opt){
      console.log(opt.scene);
    },
    onLaunch(){
        var that=this;
        wx.getStorage({
            key:'userData',
            success:function(res){
                that.globalData=res.data;
            }
        })
        wx.login({
            success:function (res){
                wx.request({
                    url: 'https://xcx3.zhuozhida.cn/getUser.php',
                    data: {
                        code:res.code
                    },
                    header: {
                        'content-type': 'application/json'
                    },
                    success: function(res) {
                        that.globalData.openId=res.data.openid
                    }
                })
            }
        });
        wx.getUserInfo({
            success: function(res) {
                that.globalData.userInfo = res.userInfo
            }
        });
    }
})