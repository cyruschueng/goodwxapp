//index.js
//获取应用实例
var app = getApp()
var utils = require('../../../../utils/util.js')
var common = require('../../../../utils/common.js')
var api = require('../../../../api.js')
var tapLock=false
var Zan = require('../../../../zanui/index');
import { $wuxDialog } from '../../../../wux/wux'
var weixin = {}
var price=0
var id

Page(Object.assign({}, Zan.Toast, {
    data: {
        list:{},
        showModalStatus: false,
        isAndroid:app.globalData.system_info.platform=='android',
        showDialog: false
    },
  onUnload:function () {
    var hasPay = wx.getStorageSync('pay'+id)
    if(price&&!hasPay){
      weixin.danliao = {}
      wx.setStorageSync('weixin',weixin)
    }
  },
    toggleDialog:function(){
        var that  = this;
        tapLock = true
        this.setData({
            showDialog: !this.data.showDialog
        });
    },
    itemClick:function (e) {
        var that = this
        var index = parseInt(e.currentTarget.dataset.index)
      if(!common.checkPay(id,price,'开通VIP，才能使用这个功能哦',that,$wuxDialog,function () {
          wx.setStorageSync('pay'+id,1);
          api.templatePay('template',id);
        })
      ){
        return;
      }
        if(index==0){
            this.toggleDialog();
            wx.navigateTo({
                url: "/pages/jietu/weixin/danliaoshezhi/danliaoshezhi"
            })
        }else if(index==1){
            this.toggleDialog();
            utils.setDuihuaIndex('weixin','danliao')
            wx.navigateTo({
                url: "/pages/jietu/textAdd/textAdd?app=weixin&type=danliao"
            })
        }else if(index==2){
            this.toggleDialog();
            utils.setDuihuaIndex('weixin','danliao')
            wx.navigateTo({
                url: "/pages/jietu/picAdd/picAdd?app=weixin&type=danliao"
            })
        }else if(index==3){
            this.toggleDialog();
            utils.setDuihuaIndex('weixin','danliao')
            wx.navigateTo({
                url: "/pages/jietu/voiceAdd/voiceAdd?app=weixin&type=danliao"
            })
        }else if(index==4){
            this.toggleDialog();
            utils.setDuihuaIndex('weixin','danliao')
            wx.navigateTo({
                url: "/pages/jietu/hongbaoAdd/hongbaoAdd?app=weixin&type=danliao"
            })
        }else if(index==5){
            this.toggleDialog();
            utils.setDuihuaIndex('weixin','danliao')
            wx.navigateTo({
                url: "/pages/jietu/zhuanzhangAdd/zhuanzhangAdd?app=weixin&type=danliao"
            })
        }else if(index==7){
          /*this.toggleDialog();
          wx.navigateTo({
            url: "/pages/selectTemplate/selectTemplate?type=4"
          })*/
          this.toggleDialog();
          wx.showModal({
            title: '提示',
            content: '请用手机系统自带的截屏功能哦',
            showCancel:false,
            confirmText:'知道了'
          })
        }else if(index==8){
            this.toggleDialog();
            utils.setDuihuaIndex('weixin','danliao')
            wx.navigateTo({
                url: "/pages/jietu/timeAdd/timeAdd?app=weixin&type=danliao"
            })
        }else if(index==9){
            this.toggleDialog();
            utils.setDuihuaIndex('weixin','danliao')
            wx.navigateTo({
                url: "/pages/jietu/messageAdd/messageAdd?app=weixin&type=danliao"
            })
        }else if(index==10){
            this.toggleDialog();
            utils.setDuihuaIndex('weixin','danliao')
            wx.navigateTo({
                url: "/pages/jietu/videoAdd/videoAdd?app=weixin&type=danliao"
            })
        }else if(index==11){
            this.toggleDialog();
            utils.setDuihuaIndex('weixin','danliao')
            wx.navigateTo({
                url: "/pages/jietu/urlAdd/urlAdd?app=weixin&type=danliao"
            })
        }else if(index==6){
            this.toggleDialog();
            wx.showModal({
                title: '提示',
                content: '要删除聊天内容吗？',
                confirmText:'删除',
                success: function(res) {
                    if (res.confirm) {
                        weixin.danliao = {}
                        wx.setStorageSync('weixin',weixin)
                        that.setData({
                            list:[]
                        })
                    } else if (res.cancel) {
                    }
                }
            })
        }
    },
    onShow: function (options) {
        let that = this
        weixin  = wx.getStorageSync('weixin');
        app.globalData.system_info = wx.getSystemInfoSync()
        if(utils.isEmptyObject(weixin)){weixin = {};}
        if(utils.isEmptyObject(weixin.danliao)){weixin.danliao = {};}
        if(utils.isEmptyObject(weixin.danliao.users)){weixin.danliao.users = [];}
        if(utils.isEmptyObject(weixin.danliao.list)){weixin.danliao.list = [];}

        api.login(function (_user) {
            if(weixin.danliao.users[0]){
                that.setData({
                    name:weixin.danliao.users[0].name,
                })
            }
        },function () {
            if(weixin.danliao.users[0]){
                that.setData({
                    name:weixin.danliao.users[0].name,
                })
            }
        },'必须授权登录之后才能操作呢，是否重新授权登录？')

        for(var i in weixin.danliao.list) {
            if(!utils.isEmptyObject(weixin.danliao.list[i])&&weixin.danliao.list[i].time){
                weixin.danliao.list[i].time = utils.formateDateTime(weixin.danliao.list[i].time)
            }
        }
        if(!utils.isEmptyObject(weixin.danliao.bg) && !utils.isEmptyObject(weixin.danliao.list)){
            that.setData({
                bg:weixin.danliao.bg.url+'?imageMogr2/thumbnail/!'+app.globalData.system_info.windowWidth+'x'+app.globalData.system_info.windowHeight+'r|imageMogr2/gravity/Center/crop/'+app.globalData.system_info.windowWidth+'x'+app.globalData.system_info.windowHeight
            })
        }else{
            that.setData({
                bg:''
            })
        }
        that.setData({
            list:weixin.danliao.list,
            system:app.globalData.system_info
        })
        if(!utils.isEmptyObject(that.data.list) && !wx.getStorageSync('has_show_jietu_danliao_guide')){
            this.openGuide();
        }

      if(!wx.getStorageSync('has_show_jietu_danliao_confirm')) {
        wx.showModal({
          title: '提示',
          content: '制作完成后，请用手机截屏来保存图片',
          showCancel: false,
          confirmText: '知道了',
          success: function(res) {
            wx.setStorageSync('has_show_jietu_danliao_confirm',1)
          }
        })
      }

        wx.setNavigationBarTitle({
            title: weixin.danliao.users[1]?weixin.danliao.users[1].name:'待设置'
        });
    },
    openGuide: function () {
        wx.setStorageSync('has_show_jietu_danliao_guide',1)
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
    onShareAppMessage: function () {
        return {
            title: '生成微信群聊、微信单聊、QQ群聊、QQ单聊等页面',
            path: "/pages/index/index"
        }
    },
    operateMessage:function (e) {
        let that = this
        if(tapLock){
            tapLock = false;
            return
         }
        wx.showActionSheet({
            itemList: ['修改这条消息','删除这条消息'],
            success: function(res) {
              if(!common.checkPay(id,price,'开通VIP，才能使用这个功能哦',that,$wuxDialog,function () {
                  wx.setStorageSync('pay'+id,1);
                  api.templatePay('template',id);
                })
              ){
                return;
              }
                var _app  = wx.getStorageSync('weixin');

                var _index = parseInt(e.currentTarget.dataset.index)
                var _item = _app['danliao'].list[_index]
                console.log(_item)
                console.log(_index)
                if(res.tapIndex==0){
                    wx.setStorageSync('current_weixin_danliao_index',_index)
                    if(!utils.isEmptyObject(_item)&&_item.content){
                        wx.navigateTo({
                            url: "/pages/jietu/textAdd/textAdd?app=weixin&type=danliao"
                        })
                    }else if(!utils.isEmptyObject(_item)&&_item.pic){
                        wx.navigateTo({
                            url: "/pages/jietu/picAdd/picAdd?app=weixin&type=danliao"
                        })
                    }else if(!utils.isEmptyObject(_item)&&_item.voice_length){
                        wx.navigateTo({
                            url: "/pages/jietu/voiceAdd/voiceAdd?app=weixin&type=danliao"
                        })
                    }else if(!utils.isEmptyObject(_item)&&(_item.zhuanzhang_price || _item.shouqian_price)){
                        wx.navigateTo({
                            url: "/pages/jietu/zhuanzhangAdd/zhuanzhangAdd?app=weixin&type=danliao"
                        })
                    }else if(!utils.isEmptyObject(_item)&&_item.hongbao_price){
                        wx.navigateTo({
                            url: "/pages/jietu/hongbaoAdd/hongbaoAdd?app=weixin&type=danliao"
                        })
                    }else if(!utils.isEmptyObject(_item)&&_item.time){
                        wx.navigateTo({
                            url: "/pages/jietu/timeAdd/timeAdd?app=weixin&type=danliao"
                        })
                    }else if(!utils.isEmptyObject(_item)&&_item.is_video){
                        wx.navigateTo({
                            url: "/pages/jietu/videoAdd/videoAdd?app=weixin&type=danliao"
                        })
                    }else if(!utils.isEmptyObject(_item)&&_item.message){
                        wx.navigateTo({
                            url: "/pages/jietu/messageAdd/messageAdd?app=weixin&type=danliao"
                        })
                    }else if(!utils.isEmptyObject(_item)&&_item.linkTitle){
                        wx.navigateTo({
                            url: "/pages/jietu/urlAdd/urlAdd?app=weixin&type=danliao"
                        })
                    }else{
                      wx.navigateTo({
                        url: "/pages/jietu/textAdd/textAdd?app=weixin&type=danliao"
                      })
                    }
                }else if(res.tapIndex==1){
                    console.log(e.currentTarget.dataset.index)

                    wx.showModal({
                        title: '提示',
                        content: '要删除这条消息么？',
                        confirmText:'删除',
                        success: function(res) {
                            if (res.confirm) {

                                _app['danliao'].list.splice(parseInt(e.currentTarget.dataset.index), 1);
                                wx.setStorageSync("weixin", _app)
                                that.setData({
                                    list:_app.danliao.list,
                                })
                            } else if (res.cancel) {
                            }
                        }
                    })
                }
            },
            fail: function(res) {
            }
        })
    },
    onLoad: function (options) {
      price = parseInt(options.price);
      id = options.id;
      if (wx.onUserCaptureScreen) {
        wx.onUserCaptureScreen(function (res) {
          wx.showModal({
            title: '提示',
            content: '截图需要优化处理下，这样会更逼真哦',
            confirmText: '去处理',
            success: function (res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '/pages/screenShot/screenShot?cat=3&title=' + (weixin.danliao.users[1] ? weixin.danliao.users[1].name : '待设置')+'&id='+id
                })
              } else if (res.cancel) {
              }
            }
          })
        })
      }
    }
}));
