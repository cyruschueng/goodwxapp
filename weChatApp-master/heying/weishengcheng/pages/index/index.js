var app = getApp();
var api = require('../../api.js')
var config = require('../../utils/config.js')
var util = require('../../utils/util.js')
var eleWidth=302;
import { $wuxNotification } from '../../wux/wux'
var tips_name='has_show_tiaozhuan_tip'

Page({
  data: {
    showDialog: false,
    name:config.config.app_name,
    list: [
      {
        background: "#66E5E4",
        url: "/pages/facture/index/index",
        type: "link",
        pic: "http://icons.maiyizhi.cn/touxiangdashi_icon_2.png",
        name: "头像制作"
      },
      {
        background: "#81e5ae",
        type: "link",
        url: "/pages/zhuangx/list/list?type=2",
        pic: "http://avatars.maiyizhi.cn/renlianshibie_1.png",
        name: "换脸"
      },
      {
        background: "#bd87f5",
        url: "/pages/datoutie/edit/edit",
        type: "link",
        pic: "http://icons.maiyizhi.cn/datout.png",
        name: "大头贴"
      },
      {
        background: "#ffc09d",
        url: "/pages/decoration/edit/edit",
        type: "link",
        pic: "http://icons.maiyizhi.cn/bianzhuang_icon.png",
        name: "人脸变妆"
      },
      {
        background: "#99dbff",
        url: "/pages/cosmetic/edit/edit",
        type: "link",
        pic: "http://icons.maiyizhi.cn/meizhuang_icon.png",
        name: "人脸美妆"
      },
      {
        background: "#ff9999",
        url: "/pages/peopleFilter/edit/edit",
        type: "link",
        pic: "http://icons.maiyizhi.cn/lvjing.png",
        name: "人脸滤镜"
      },
      {
        background: "#fff",
        url: "/pages/tuijian/tuijian",
        type: "link",
        pic: "",
        name: ""
      },
      {
        background: "#f174ff",
        url: "/pages/tuijian/tuijian",
        type: "link",
        hot:1,
        pic: "http://icons.maiyizhi.cn/gengduohaowan_icon.png",
        name: "更多好玩..."
      },{
        background: "#fff",
        url: "/pages/tuijian/tuijian",
        type: "link",
        pic: "",
        name: ""
      }

    ]
  },
  go_tuijian:function (e) {
    if(wx.navigateToMiniProgram){
      wx.navigateToMiniProgram({
        appId: 'wxab0b8413a26e53cf',
        path: e.currentTarget.dataset.url,
      })
    }else{
      util.previewSingalPic('http://pics.maiyizhi.cn/xcxm_zhizuoqi.jpg')
    }
  },
    swipeUrl:function (e) {
        if(e.target.dataset.url=='/pages/share/share'){
            wx.switchTab({
                url: e.target.dataset.url
            })
        }else{if(e.target.dataset.appid){
          wx.navigateToMiniProgram({
            appId: e.target.dataset.appid,
            path:e.target.dataset.url
          })
        }else {
          wx.navigateTo({
            url: e.target.dataset.url
          })
        }
        }
    },
    onShareAppMessage: function () {
        return {
          title: '做个头像、趣味换脸、大头贴、变妆、美妆、圣诞帽、圣诞头像',
          path: "/pages/index/index"
        }
    },
    itemClick:function () {
        this.toggleDialog()
    },
    menu:function(e){
        console.log(e)
        var that  = this;
        wx.showActionSheet({
            itemList: ['生成红包照片','生成红包视频'],
            success: function(res) {
                if(res.tapIndex==1){
                    wx.navigateTo({
                        url: "/pages/dashangtu/index/index?type=video"
                    })
                }else if(res.tapIndex==0){
                    wx.navigateTo({
                        url: "/pages/dashangtu/index/index?type=pic"
                    })
                }
            }
        })
    },
  pyqMenu:function(e){
    var that  = this;
    wx.showActionSheet({
      itemList: ['朋友圈详情页','朋友圈首页'],
      success: function(res) {
        if(res.tapIndex==1){
          if(that.data.name == 'jietuwang'){
            if(wx.navigateToMiniProgram){
              wx.navigateToMiniProgram({
                appId: 'wxab0b8413a26e53cf',
                path: "/pages/selectTemplate/selectTemplate?type=2"
              })
            }else{
              util.previewSingalPic('http://pics.maiyizhi.cn/xcxm_zhizuoqi.jpg')
            }
          }else{
            wx.navigateTo({
              url: "/pages/selectTemplate/selectTemplate?type=2"
            })
          }
        }else if(res.tapIndex==0){
          if(that.data.name == 'jietuwang'){
            if(wx.navigateToMiniProgram){
              wx.navigateToMiniProgram({
                appId: 'wxab0b8413a26e53cf',
                path: "/pages/selectTemplate/selectTemplate?type=1"
              })
            }else{
              util.previewSingalPic('http://pics.maiyizhi.cn/xcxm_zhizuoqi.jpg')
            }
          }else{
            wx.navigateTo({
              url: "/pages/selectTemplate/selectTemplate?type=1"
            })
          }
        }
      }
    })
  },
  liaotianMenu:function(e){
    var that  = this;
    wx.showActionSheet({
      itemList: ['微信单聊','微信群聊'],
      success: function(res) {
        if(res.tapIndex==0){
          if(that.data.name == 'jietuwang'){
            if(wx.navigateToMiniProgram){
              wx.navigateToMiniProgram({
                appId: 'wxab0b8413a26e53cf',
                //path: "/pages/jietu/weixin/danliao/danliao"
                path: "/pages/selectTemplate/selectTemplate?type=4"
              })
            }else{
              util.previewSingalPic('http://pics.maiyizhi.cn/xcxm_zhizuoqi.jpg')
            }
          }else{
            wx.navigateTo({
              //url: "/pages/jietu/weixin/danliao/danliao"
              url:"/pages/selectTemplate/selectTemplate?type=4"
            })
          }
        }else if(res.tapIndex==1){
          if(that.data.name == 'jietuwang'){
            if(wx.navigateToMiniProgram){
              wx.navigateToMiniProgram({
                appId: 'wxab0b8413a26e53cf',
                //path: "/pages/jietu/weixin/qunliao/qunliao"
                path: "/pages/selectTemplate/selectTemplate?type=3"
              })
            }else{
              util.previewSingalPic('http://pics.maiyizhi.cn/xcxm_zhizuoqi.jpg')
            }
          }else {
            wx.navigateTo({
              //url: "/pages/jietu/weixin/qunliao/qunliao"
              url:"/pages/selectTemplate/selectTemplate?type=3"
            })
          }
        }
      }
    })
  },
  showNotification:function() {
    var that = this
    api.tiaozhuan('zhizuoqi_index',function(res) {
      util.tiaozhuan ($wuxNotification,that,res,tips_name);
    },function(re){
    });

  },
    initPage:function () {
        var that = this

        api.init(function(res) {
            that.setData({
                slide: res.slide,
              is_verify:res.is_verify
            })
          if(res.showTiaozhuan &&wx.getStorageSync(tips_name)<4){
              console.log('show tiaozhuan')
              that.showNotification()
          }
            wx.setStorageSync('tuijian',res.tuijian);
            wx.setStorageSync('is_verify',res.is_verify);
        },function(re){

        });
    },
  onShow:function () {
  },
  onLoad: function (options) {
      if(options.scene){
        wx.navigateTo({
            url: "/pages/dashangtu/view/view?id="+options.scene
        })
      }
      this.initPage();
  }
})
