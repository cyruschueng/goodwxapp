//index.js
//获取应用实例
var app = getApp()
var utils = require('../../../../utils/util.js')
var common = require('../../../../utils/common.js')
var api = require('../../../../api.js')
var weixin = {}
var tapLock=false
var Zan = require('../../../../zanui/index');
import { $wuxDialog } from '../../../../wux/wux'
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
      weixin.qunliao = {}
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
        var index = parseInt(e.currentTarget.dataset.index)
        var that = this
      if(!common.checkPay(id,price,'开通VIP，才能使用这个功能哦',that,$wuxDialog,function () {
          wx.setStorageSync('pay'+id,1);
          api.templatePay('template',id);
        })
      ){
        return;
      }
        if(index==0){
            wx.navigateTo({
                url: "/pages/jietu/weixin/qunliaoshezhi/qunliaoshezhi"
            })
        }else if(index==1){
            utils.setDuihuaIndex('weixin','qunliao')
            wx.navigateTo({
                url: "/pages/jietu/textAdd/textAdd?app=weixin&type=qunliao"
            })
        }else if(index==2){
            utils.setDuihuaIndex('weixin','qunliao')
            wx.navigateTo({
                url: "/pages/jietu/picAdd/picAdd?app=weixin&type=qunliao"
            })
        }else if(index==3){
            utils.setDuihuaIndex('weixin','qunliao')
            wx.navigateTo({
                url: "/pages/jietu/voiceAdd/voiceAdd?app=weixin&type=qunliao"
            })
        }else if(index==4){
            utils.setDuihuaIndex('weixin','qunliao')
            wx.navigateTo({
                url: "/pages/jietu/hongbaoAdd/hongbaoAdd?app=weixin&type=qunliao"
            })
        }else if(index==5){
          /*wx.navigateTo({
            url: "/pages/selectTemplate/selectTemplate?type=3"
          })*/
          wx.showModal({
            title: '提示',
            content: '请用手机系统自带的截屏功能哦',
            showCancel:false,
            confirmText:'知道了'
          })
        }else if(index==8){
            utils.setDuihuaIndex('weixin','qunliao')
            wx.navigateTo({
                url: "/pages/jietu/timeAdd/timeAdd?app=weixin&type=qunliao"
            })
        }else if(index==9){
            utils.setDuihuaIndex('weixin','qunliao')
            wx.navigateTo({
                url: "/pages/jietu/messageAdd/messageAdd?app=weixin&type=qunliao"
            })
        }else if(index==10){
            utils.setDuihuaIndex('weixin','qunliao')
            wx.navigateTo({
                url: "/pages/jietu/videoAdd/videoAdd?app=weixin&type=qunliao"
            })
        } else if(index==11){
            utils.setDuihuaIndex('weixin','qunliao')
            wx.navigateTo({
                url: "/pages/jietu/urlAdd/urlAdd?app=weixin&type=qunliao"
            })
        } else if(index==6){
            wx.showModal({
                title: '提示',
                content: '要删除群聊内容吗？',
                confirmText:'删除',
                success: function(res) {
                    if (res.confirm) {
                        weixin.qunliao = {}
                        wx.setStorageSync('weixin',weixin)
                        that.setData({
                            list:[]
                        })
                    } else if (res.cancel) {
                    }
                }
            })
        }
        this.toggleDialog();
    },
    onShow: function (options) {
        let that = this
        app.globalData.system_info = wx.getSystemInfoSync()
        weixin  = wx.getStorageSync('weixin');
        if(utils.isEmptyObject(weixin)){weixin = {};}
        if(utils.isEmptyObject(weixin.qunliao)){weixin.qunliao = {};}
        if(utils.isEmptyObject(weixin.qunliao.users)){weixin.qunliao.users = [];}
        if(utils.isEmptyObject(weixin.qunliao.list)){weixin.qunliao.list = [];}

        api.login(function (_user) {
            if(weixin.qunliao.users[0]){
                that.setData({
                    name:weixin.qunliao.users[0].name,
                })
            }
        },function () {
            if(weixin.qunliao.users[0]){
                that.setData({
                    name:weixin.qunliao.users[0].name,
                })
            }
        },'必须授权登录之后才能操作呢，是否重新授权登录？')


        for(var i in weixin.qunliao.list) {
            if(!utils.isEmptyObject(weixin.qunliao.list[i])&&weixin.qunliao.list[i].time){
                weixin.qunliao.list[i].time = utils.formateDateTime(weixin.qunliao.list[i].time)
            }
        }
        console.log(weixin.qunliao.bg)
        if(!utils.isEmptyObject(weixin.qunliao.bg) && !utils.isEmptyObject(weixin.qunliao.list)){
            that.setData({
                bg:weixin.qunliao.bg.url+'?imageMogr2/thumbnail/!'+app.globalData.system_info.windowWidth+'x'+app.globalData.system_info.windowHeight+'r|imageMogr2/gravity/Center/crop/'+app.globalData.system_info.windowWidth+'x'+app.globalData.system_info.windowHeight
            })
        }else{
            that.setData({
                bg:''
            })
        }

        that.setData({
            list:weixin.qunliao.list,
            system:app.globalData.system_info
        })
        if(!utils.isEmptyObject(that.data.list) && !wx.getStorageSync('has_show_jietu_qunliao_guide')){
            this.openGuide();
        }

      if(!wx.getStorageSync('has_show_jietu_qunliao_confirm')) {
        wx.showModal({
          title: '提示',
          content: '制作完成后，请用手机截屏来保存图片',
          showCancel: false,
          confirmText: '知道了',
          success: function(res) {
            wx.setStorageSync('has_show_jietu_qunliao_confirm',1)
          }
        })
      }

        wx.setNavigationBarTitle({
            title: weixin.qunliao.name?(weixin.qunliao.name+' ('+weixin.qunliao.counts+')'):'群聊'
        });
    },
    openGuide: function () {
        wx.setStorageSync('has_show_jietu_qunliao_guide',1)
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
        if(tapLock){
            tapLock = false;
            return
        }
        let that = this
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
                var _item = _app['qunliao'].list[_index]
                console.log(_item)
                console.log(_index)
                if(res.tapIndex==0){
                    wx.setStorageSync('current_weixin_qunliao_index',_index)
                    if(!utils.isEmptyObject(_item)&&_item.content){
                        wx.navigateTo({
                            url: "/pages/jietu/textAdd/textAdd?app=weixin&type=qunliao"
                        })
                    }else if(!utils.isEmptyObject(_item)&&_item.pic){
                        wx.navigateTo({
                            url: "/pages/jietu/picAdd/picAdd?app=weixin&type=qunliao"
                        })
                    }else if(!utils.isEmptyObject(_item)&&_item.voice_length){
                        wx.navigateTo({
                            url: "/pages/jietu/voiceAdd/voiceAdd?app=weixin&type=qunliao"
                        })
                    }else if(!utils.isEmptyObject(_item)&&_item.hongbao_price){
                        wx.navigateTo({
                            url: "/pages/jietu/hongbaoAdd/hongbaoAdd?app=weixin&type=qunliao"
                        })
                    }else if(!utils.isEmptyObject(_item)&&_item.time){
                        wx.navigateTo({
                            url: "/pages/jietu/timeAdd/timeAdd?app=weixin&type=qunliao"
                        })
                    }else if(!utils.isEmptyObject(_item)&&_item.is_video){
                        wx.navigateTo({
                            url: "/pages/jietu/videoAdd/videoAdd?app=weixin&type=qunliao"
                        })
                    } else if(!utils.isEmptyObject(_item)&&_item.message){
                        wx.navigateTo({
                            url: "/pages/jietu/messageAdd/messageAdd?app=weixin&type=qunliao"
                        })
                    }else if(!utils.isEmptyObject(_item)&&_item.linkTitle){
                        wx.navigateTo({
                            url: "/pages/jietu/linkTitleAdd/linkTitleAdd?app=weixin&type=qunliao"
                        })
                    }else{
                      wx.navigateTo({
                        url: "/pages/jietu/textAdd/textAdd?app=weixin&type=qunliao"
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

                                _app['qunliao'].list.splice(parseInt(e.currentTarget.dataset.index), 1);
                                wx.setStorageSync("weixin", _app)
                                that.setData({
                                    list:_app.qunliao.list,
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
                  url: '/pages/screenShot/screenShot?cat=4&title=' + (weixin.qunliao.name ? (weixin.qunliao.name + ' (' + weixin.qunliao.counts + ')') : '群聊')+'&id='+id
                })
              } else if (res.cancel) {
              }
            }
          })
        })
      }
    }
}));
