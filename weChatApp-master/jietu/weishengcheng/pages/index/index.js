var app = getApp();
var api = require('../../api.js')
var config = require('../../utils/config.js')
var util = require('../../utils/util.js')
var eleWidth=302;
import { $wuxNotification } from '../../wux/wux'
import { $wuxDialog } from '../../wux/wux'
var tips_name='has_show_tiaozhuan_tip'

Page({
  data: {
    showDialog: false,
    name:config.config.app_name,
    lists: [
      {
        title: '微信截图',
        list: [
          {
            background: "#8FA0FB",
            url: "/pages/selectTemplate/selectTemplate?type=4",
            type: "link",
            hot:1,
            pic: "http://icons.maiyizhi.cn/weixindanliao_icon.png",
            name: "微信单聊"
          },
          {
            background: "#8FA0FB",
            url: "/pages/selectTemplate/selectTemplate?type=3",
            type: "link",
            pic: "http://icons.maiyizhi.cn/weixinqunliao_icon.png",
            name: "微信群聊"
          },
          {
            background: "#FFD36B",
            url: "/pages/selectTemplate/selectTemplate?type=2",
            type: "link",
            pic: "http://icons.maiyizhi.cn/pengyouquanshouye_icon.png",
            name: "朋友圈首页"
          },
          {
            background: "#FFD36B",
            url: "/pages/selectTemplate/selectTemplate?type=1",
            type: "link",
            pic: "http://icons.maiyizhi.cn/xiangqingye_icon.png",
            name: "朋友圈详情页"
          },
          {
            background: "#8FA0FB",
            url: "/pages/zhuangx/edit/edit?scene=5a0060a17727bcc67a8b45e9",
            type: "link",
            pic: "http://icons.maiyizhi.cn/weixinqianbao_icon.png",
            name: "微信钱包"
          },
          {
            background: "#8FA0FB",
            url: "/pages/zhuangx/edit/edit?scene=5a0060a17727bcc67a8b4602",
            type: "link",
            pic: "http://icons.maiyizhi.cn/weixinhongbao_icon.png",
            name: "微信红包"
          },
          {
            background: "#8FA0FB",
            url: "/pages/zhuangx/edit/edit?scene=5a0060a17727bcc67a8b45ea",
            type: "link",
            pic: "http://icons.maiyizhi.cn/weixinlingqian_icon.png",
            name: "微信零钱"
          },
          {
            background: "#8FA0FB",
            url: "/pages/zhuangx/edit/edit?scene=5a0060a27727bcc67a8b465d",
            type: "link",
            pic: "http://icons.maiyizhi.cn/weixinzhuanzhang_icon.png",
            name: "微信转账"
          },
          {
            background: "#8FA0FB",
            url: "/pages/zhuangx/edit/edit?scene=5a20182f7727bc667b8b45d4",
            type: "link",
            pic: "http://icons.maiyizhi.cn/weixintixian_icon.png",
            name: "微信提现"
          },
          {
            background: "#8FA0FB",
            url: "/pages/zhuangx/edit/edit?scene=5a1bdcc77727bcc63c8b4593",
            type: "link",
            pic: "http://icons.maiyizhi.cn/weixinjiaoyijilu_icon.png",
            name: "微信交易记录"
          },
          {
            background: "#8FA0FB",
            url: "/pages/zhuangx/edit/edit?scene=5a221c857727bc3d358b4628",
            type: "link",
            pic: "http://icons.maiyizhi.cn/weixinjiahaoyou_icon.png",
            name: "微信朋友添加"
          },
          {
            background: "#8FA0FB",
            url: "/pages/zhuangx/edit/edit?scene=5a0060a17727bcc67a8b45fb",
            type: "link",
            pic: "http://icons.maiyizhi.cn/weixinyuyinshipin_icon.png",
            name: "语音视频聊天"
          },
          {
            background: "#8FA0FB",
            url: "/pages/zhuangx/edit/edit?scene=5a6ea7db7727bc767f8b458e",
            type: "link",
            pic: "http://icons.maiyizhi.cn/weixinhaoyoushu_icon.png",
            name: "微信好友数量"
          },
          {
            background: "#8FA0FB",
            url: "/pages/zhuangx/edit/edit?scene=5a6dd2687727bce2598b5162",
            type: "link",
            pic: "http://icons.maiyizhi.cn/shipinfengmian_icon.png",
            name: "微信视频封面图"
          }
        ]
      },
      {
        title: '支付宝截图',
        list: [
          {
            background: "#8FA0FB",
            url: "/pages/zhuangx/edit/edit?scene=5a0060a17727bcc67a8b45ed",
            type: "link",
            pic: "http://icons.maiyizhi.cn/zhifubaoyue_icon.png",
            name: "支付宝余额"
          },
          {
            background: "#8FA0FB",
            url: "/pages/zhuangx/edit/edit?scene=5a0060a17727bcc67a8b45ee",
            type: "link",
            pic: "http://icons.maiyizhi.cn/zhifubaohuabei_icon.png",
            name: "支付宝花呗"
          },
          {
            background: "#8FA0FB",
            url: "/pages/zhuangx/edit/edit?scene=5a23934d7727bc81668b4598",
            type: "link",
            pic: "http://icons.maiyizhi.cn/zhifubaozhuanzhang_icon.png",
            name: "支付宝转账"
          },
          {
            background: "#8FA0FB",
            url: "/pages/zhuangx/edit/edit?scene=5a22b10a7727bcfe208b45d3",
            type: "link",
            pic: "http://icons.maiyizhi.cn/zhifubaohongbao_icon.png",
            name: "支付宝红包"
          },
          {
            background: "#8FA0FB",
            url: "/pages/zhuangx/edit/edit?scene=5a0060a27727bcc67a8b4624",
            type: "link",
            pic: "http://icons.maiyizhi.cn/zhifubaozongzichan_icon.png",
            name: "支付宝总资产"
          },
          {
            background: "#8FA0FB",
            url: "/pages/zhuangx/edit/edit?scene=5a22ba347727bca41d8b45ff",
            type: "link",
            pic: "http://icons.maiyizhi.cn/zhifubaoqianbao_icon.png",
            name: "支付宝提现"
          }
        ]
      },
      {
        title: '其它截图',
        list: [
          {
            background: "#F99BBC",
            url: "/pages/zhuangx/edit/edit?scene=5a2230bd7727bcc4328b4570",
            type: "link",
            pic: "http://icons.maiyizhi.cn/qqhongbao_icon.png",
            name: "QQ红包"
          },
          {
            background: "#F99BBC",
            url: "/pages/zhuangx/edit/edit?scene=5a22a60c7727bcce4f8b4575",
            type: "link",
            pic: "http://icons.maiyizhi.cn/qqtixian_icon.png",
            name: "QQ提现"
          },
          {
            background: "#F99BBC",
            url: "/pages/zhuangx/edit/edit?scene=5a0060a27727bcc67a8b466e",
            type: "link",
            pic: "http://icons.maiyizhi.cn/qqqianbao_icon.png",
            name: "QQ钱包"
          },
          {
            background: "#F99BBC",
            url: "/pages/zhuangx/edit/edit?scene=5a0060a17727bcc67a8b45f9",
            type: "link",
            pic: "http://icons.maiyizhi.cn/laidianxianshi_icon.png",
            name: "来电显示"
          },
            {
                background: "#F99BBC",
                url: "/pages/zhuangx/edit/edit?scene=5a73133b7727bca2048b4fe8",
                type: "link",
                pic: "http://icons.maiyizhi.cn/weibofensishu_icon.png",
                name: "微博粉丝数"
            }
        ]
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
            if(res.is_verify){
                that.setData({
                    lists: [
                      {
                        title: '',
                        list:[
                          {
                            background: "#f5878a",
                            url: "/pages/woshishui/woshishui",
                            type: "link",
                            pic: "http://icons.maiyizhi.cn/womenshishei_icon.png",
                            name: "我们是谁"
                          },
                          {
                            background: "#71B1F9",
                            url: "/pages/facture/index/index",
                            type: "link",
                            pic: "http://icons.maiyizhi.cn/touxiang_icon.png",
                            name: "头像制作"
                          }
                        ]
                      }
                    ]
                })
            }
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
  openGuide: function () {
    wx.setStorageSync('has_show_mianze_guide',1)
    this.guide("open")
  },
  close: function () {
    this.guide("close")
  },
  guide: function (currentStatu) {
    /* 动画部分 */
    // 第1步：创建动画实例
    var animation = wx.createAnimation({
      duration: 200,  //动画时长
      timingFunction: "linear", //线性
      delay: 0  //0则不延迟
    });

    // 第2步：这个动画实例赋给当前的动画实例
    this.animation = animation;

    // 第3步：执行第一组动画
    animation.opacity(0).rotateX(-100).step();

    // 第4步：导出动画对象赋给数据对象储存
    this.setData({
      animationData: animation.export()
    })

    // 第5步：设置定时器到指定时候后，执行第二组动画
    setTimeout(function () {
      // 执行第二组动画
      animation.opacity(1).rotateX(0).step();
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象
      this.setData({
        animationData: animation
      })

      //关闭
      if (currentStatu == "close") {
        this.setData(
          {
            showModalStatus: false
          }
        );
      }
    }.bind(this), 200)

    // 显示
    if (currentStatu == "open") {
      this.setData(
        {
          showModalStatus: true
        }
      );
    }
  },
  onLoad: function (options) {
      if(options.scene){
        wx.navigateTo({
            url: "/pages/dashangtu/view/view?id="+options.scene
        })
      }
      this.initPage();
    if(!wx.getStorageSync('has_show_mianze_guide')){
      this.openGuide();
    }
  }
})
