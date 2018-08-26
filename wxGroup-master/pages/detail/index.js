var app = getApp();
Page({
    data: {
        groupId: ''
    },
    onLoad(options){
        this.setData({
            groupId: options.groupWxId
        });
    },
    getIn(){
        wx.request({
          url: 'https://group.mrourou.com/wx/group',
          header: {
            'content-type': 'application/json', // 默认值
            'wx-group-token': app.globalData.token
          },
          method: 'POST',
          data: {
            openGId: this.data.groupId
          },
          success: res => {
            //判断群主跟机器人是否为好友
            if (!res.isFriend) {
              //让群主拉机器人进群
              wx.showModal({
                title: '提示',
                content: '您和机器人还不是好友，请先加为好友',
                success: function (res) {
                  if (res.confirm) {
                    console.log('用户点击确定')
                    wx.navigateTo({
                      url: '/pages/robot/index'
                    })


                  } else if (res.cancel) {
                    console.log('用户点击取消')
                  }
                }
              })

            }
          }
        })
    }
    
    
  
})