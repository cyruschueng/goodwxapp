var api = require('../../api.js')
var util = require('../../utils/util.js')
var config = require('../../utils/config.js')
var type

Page({
    data: {
    },
    onShow: function () {
    },
    onLoad:function(options){
        type=options.type

        this.setData({
            type:type,
            tuijian:wx.getStorageSync('tuijian')
        });
        if(type=='tixian'){
            wx.setNavigationBarTitle({
                title: '提现'
            });
        }else if(type=='share_success'){
            wx.setNavigationBarTitle({
                title: '分享成功'
            });
        }else if(type=='vip'){
          wx.setNavigationBarTitle({
            title: 'VIP会员'
          });
        }else if(type=='tuijian'){
          wx.setNavigationBarTitle({
            title: '精品小程序推荐'
          });
        }else if(type=='video_help'){
            wx.setNavigationBarTitle({
                title: '视频说明'
            });
        }else if(type=='video_help_woshishui'){
            wx.setNavigationBarTitle({
                title: '视频说明'
            });
        }else if(type=='help'){
            wx.setNavigationBarTitle({
                title: '使用说明'
            });
        }
    },
    onReady: function () {
    },
    tiaozhuan:function (e) {
        console.log(e.currentTarget.dataset.id);
        if(wx.navigateToMiniProgram){
          wx.navigateToMiniProgram({
            appId: e.currentTarget.dataset.id,
          })
        }else{
            util.previewSingalPic('http://pics.maiyizhi.cn/xcxm_jietuwang_1.jpg')
        }
    },
    switchTab:function(event){
        var url = event.target.dataset.url;
            wx.switchTab({
                url: url
            })
    },
})
