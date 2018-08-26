var api = require('../../api.js')
var util = require('../../utils/util.js')
var config = require('../../utils/config.js')
var wc = require('../../utils/wcache.js')
var Zan = require('../../zanui/index');
var type

Page(Object.assign({}, Zan.Toast, {
    data: {
      list: [
        {
          background: "#f5fef1",
          iconBackground: "#a1dc84",
          appid:'wxe65b20a8a91ac1f4',
          preview:'http://pics.maiyizhi.cn/xiaojietu1_ma.jpg',
          color: "#5da639",
          url: "",
          event: "navigate",
          type: "tap",
          pic: "http://icons.maiyizhi.cn/xiaojietu1_icon.png",
          name: "截图器",
          desc: "朋友圈、微信对话截图，微商截图"
        },
        {
          background: "#fcf0f5",
          iconBackground: "#f089ac",
          appid:'wxf222b478fe10dbe0',
          preview:'http://pics.maiyizhi.cn/xiaozhuangx1_ma.jpg',
          color: "#eb3e6f",
          url: "",
          event: "navigate",
          type: "tap",
          pic: "http://icons.maiyizhi.cn/xiaozhuangx1_icon.png",
          name: "小装X",
          desc: "一键生成各种装逼图"
        }
      ]
    },
  navigate:function (e) {
    if(wx.navigateToMiniProgram){
      wx.navigateToMiniProgram({
        appId: e.currentTarget.dataset.appid
      })
    }else{
      util.previewSingalPic(e.currentTarget.dataset.preview)
    }
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
        }else if(type=='vipsuccess'){
          wx.setNavigationBarTitle({
            title: '购买成功'
          });
        }else if(type=='contactvip'){
          wx.setNavigationBarTitle({
            title: '联系客服'
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
    buy:function () {
      var that = this;
      wx.showActionSheet({
        itemList: ['终身永久VIP（128元）', '包年VIP（68元）', '包月VIP（28元）','联系客服购买'],
        success: function(res) {
          if(res.tapIndex==3){
            wx.navigateTo({
              url: "/pages/about/about?type=contactvip"
            })
          }else{
            api.login(function (_user) {
              var vipPrice = [128,68,28];
              var vipLost = [50*365*24*3600,365*24*3600,31*24*3600];
              var _id = res.tapIndex
              api.vippay(_user.openid,vipPrice[_id],'购买VIP',function (res) {
                console.log(res)
                wx.hideToast()
                wx.hideNavigationBarLoading();

                wx.requestPayment({
                  'timeStamp': res.timeStamp,
                  'nonceStr': res.nonceStr,
                  'package': res.package,
                  'signType': res.signType,
                  'paySign': res.paySign,
                  'success': function (re) {
                    console.log(vipLost[_id])
                    wc.put('isVip', 1,vipLost[_id])
                    wx.redirectTo({
                      url: "/pages/about/about?type=vipsuccess"
                    })
                  },
                  'fail': function (res) {
                    that.showZanToast('支付失败，请稍后再试');
                  }
                })
              })
            },function () {
            },'必须授权登录之后才能操作呢，是否重新授权登录？')
          }
        },
        fail: function(res) {
          that.showZanToast('支付失败，请稍后再试');
        }
      })
    },
    switchTab:function(event){
        var url = event.target.dataset.url;
            wx.switchTab({
                url: url
            })
    },
}));
