//index.js
//获取应用实例
var app = getApp()
var utils = require('../../utils/util.js')
var common = require('../../utils/common.js')
let windowSize={};
var api = require('../../api.js')
var Zan = require('../../zanui/index');
import { $wuxDialog } from '../../wux/wux'
var tapLock=false
var price=0
var id

Page(Object.assign({}, Zan.Toast, {
    data: {
        detail:{},
        isAndroid:app.globalData.system_info.platform=='android',
        showModalStatus: false,
    },
    onShow: function (options) {
        let that = this
        wx.setStorageSync('current_detail_index',99)
        windowSize=app.globalData.system_info
        that.data.detail = utils.getDetail()
console.log(that.data.detail)
          that.setData({
            padding:'padding: 0 25rpx 0 15rpx;',
            oneSize:Math.ceil(windowSize.windowWidth*0.48*windowSize.pixelRatio),
            twoSize:Math.ceil(windowSize.windowWidth * 0.21*windowSize.pixelRatio),
            pixelRatio:windowSize.pixelRatio,
            detail:that.data.detail,
            threeSize:Math.ceil(windowSize.windowWidth * 0.21*windowSize.pixelRatio)
          })
        if(!utils.isEmptyObject(that.data.detail) && !wx.getStorageSync('has_show_detail_guide')){
            this.openGuide();
        }
      if(!wx.getStorageSync('has_show_detail_confirm')) {
        wx.showModal({
          title: '提示',
          content: '制作完成后，请用手机截屏来保存图片',
          showCancel: false,
          confirmText: '知道了',
          success: function(res) {
            wx.setStorageSync('has_show_detail_confirm',1)
          }
        })
      }
    },
  onUnload:function () {
    var hasPay = wx.getStorageSync('pay'+id)
    if(price&&!hasPay){
      utils.saveDetail({})
    }
  },
    openGuide: function () {
        wx.setStorageSync('has_show_detail_guide',1)
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
    operateLike:function () {
        let that = this
        if(tapLock){
            tapLock = false;
            return
        }
        wx.showActionSheet({
            itemList: ['修改点赞', '清除点赞'],
            success: function(res) {
              if(!common.checkPay(id,price,'开通VIP，才能使用这个功能哦',that,$wuxDialog,function () {
                  wx.setStorageSync('pay'+id,1);
                  api.templatePay('template',id);
                })
              ){
                return;
              }
                if(res.tapIndex==0){
                    wx.navigateTo({
                        url: "/pages/likeAdd/likeAdd"
                    })
                }else if(res.tapIndex==1){
                    wx.showModal({
                        title: '提示',
                        content: '要清除所有点赞么？',
                        confirmText:'删除',
                        success: function(res) {
                            if (res.confirm) {
                                that.data.detail.likes = [];
                                utils.saveDetail(that.data.detail)
                                //wx.setStorageSync("detail", that.data.detail)
                                that.setData({
                                    detail:that.data.detail,
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
    operateComment:function (e) {
        if(tapLock){
            tapLock = false;
            return
        }
        console.log(e)
        let that = this
        wx.showActionSheet({
            itemList: ['回复TA','修改这条评论','删除这条评论'],
            success: function(res) {
              if(!common.checkPay(id,price,'开通VIP，才能使用这个功能哦',that,$wuxDialog,function () {
                  wx.setStorageSync('pay'+id,1);
                  api.templatePay('template',id);
                })
              ){
                return;
              }
                if(res.tapIndex==1){
                    wx.setStorageSync('current_comment_index',parseInt(e.currentTarget.id))
                    wx.navigateTo({
                        url: "/pages/commentAdd/commentAdd"
                    })
                }else if(res.tapIndex==2){
                    wx.showModal({
                        title: '提示',
                        content: '要删除这条评论么？',
                        confirmText:'删除',
                        success: function(res) {
                            if (res.confirm) {
                                if(utils.isEmptyObject(that.data.detail.comments)){
                                    that.data.detail.comments = [];
                                }else{
                                    that.data.detail.comments.splice(parseInt(e.currentTarget.id), 1);
                                }
                                utils.saveDetail(that.data.detail)
                                //wx.setStorageSync("detail", that.data.detail)
                                that.setData({
                                    detail:that.data.detail,
                                })
                            } else if (res.cancel) {
                            }
                        }
                    })
                }else if(res.tapIndex==0) {

                    if(utils.isEmptyObject(that.data.detail.comments)){that.data.detail.comments = [];}

                    wx.setStorageSync('current_comment_index',that.data.detail.comments.length)
                    wx.navigateTo({
                        url: "/pages/commentAdd/commentAdd?fname="+e.currentTarget.dataset.fname
                    })
                }
            },
            fail: function(res) {
            }
        })
    },
    operate:function () {
        if(tapLock){
            tapLock = false;
            return
        }
        var that  = this;
        wx.showActionSheet({
            itemList: ['赞', '评论'],
            success: function(res) {
              if(!common.checkPay(id,price,'开通VIP，才能使用这个功能哦',that,$wuxDialog,function () {
                  wx.setStorageSync('pay'+id,1);
                  api.templatePay('template',id);
                })
              ){
                return;
              }
                if(res.tapIndex==0){
                    wx.navigateTo({
                        url: "/pages/likeAdd/likeAdd"
                    })
                }else if(res.tapIndex==1){
                    //that.data.detail = wx.getStorageSync('detail')
                    //if(!that.data.detail){that.data.detail = {};}
                    if(utils.isEmptyObject(that.data.detail.comments)){that.data.detail.comments = [];}

                    wx.setStorageSync('current_comment_index',that.data.detail.comments.length)
                    wx.navigateTo({
                        url: "/pages/commentAdd/commentAdd"
                    })
                }
            },
            fail: function(res) {
            }
        })
    },
    popupEdit:function () {
        if(tapLock){
            tapLock = false;
            return
        }
        var that  = this;
        wx.showActionSheet({
            itemList: ['修改本条内容', '删除本条内容'],
            success: function(res) {
              if(!common.checkPay(id,price,'开通VIP，才能使用这个功能哦',that,$wuxDialog,function () {
                  wx.setStorageSync('pay'+id,1);
                  api.templatePay('template',id);
                })
              ){
                return;
              }
                if(res.tapIndex==0){
                    if(!utils.isEmptyObject(that.data.detail.link)&&that.data.detail.link.content){
                        wx.navigateTo({
                            url: "/pages/detailLinkAdd/detailLinkAdd"
                        })
                    }else if(!utils.isEmptyObject(that.data.detail.ad)&&that.data.detail.ad.content){
                        wx.navigateTo({
                            url: "/pages/detailADAdd/detailADAdd"
                        })
                    }else{
                        wx.navigateTo({
                            url: "/pages/detailAdd/detailAdd"
                        })
                    }

                }else if(res.tapIndex==1){
                    wx.showModal({
                        title: '提示',
                        content: '要删除本条内容吗？',
                        confirmText:'删除',
                        success: function(res) {
                            if (res.confirm) {
                                //wx.removeStorageSync('detail')
                                utils.saveDetail({})
                                that.setData({
                                    detail:{}
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
    popupAdd:function () {
        var that  = this;
        tapLock = true
        if(utils.isEmptyObject(that.data.detail) || !that.data.detail.content){
            wx.showActionSheet({
                itemList: ['加图文', '加转发','加广告'],
                success: function(res) {
                  if(!common.checkPay(id,price,'开通VIP，才能使用这个功能哦',that,$wuxDialog,function () {
                      wx.setStorageSync('pay'+id,1);
                      api.templatePay('template',id);
                    })
                  ){
                    return;
                  }
                    if(res.tapIndex==0){
                        wx.navigateTo({
                            url: "/pages/detailAdd/detailAdd"
                        })
                    }else if(res.tapIndex==1){
                        wx.navigateTo({
                            url: "/pages/detailLinkAdd/detailLinkAdd"
                        })
                    }else if(res.tapIndex==2){
                        wx.navigateTo({
                            url: "/pages/detailADAdd/detailADAdd"
                        })
                    }
                },
                fail: function(res) {
                }
            })
        }else{
          wx.showActionSheet({
            itemList: ['清空','截图'],
            success: function(res) {
              if(res.tapIndex==0){
                wx.showModal({
                  title: '提示',
                  content: '要删除本条内容吗？',
                  confirmText:'删除',
                  success: function(res) {
                    if (res.confirm) {
                      utils.saveDetail({});
                      that.setData({
                        detail:{}
                      })
                    } else if (res.cancel) {
                    }
                  }
                })
              }else if(res.tapIndex==1){
                wx.showModal({
                  title: '提示',
                  content: '请用手机系统自带的截屏功能哦',
                  showCancel:false,
                  confirmText:'知道了'
                })
              }
            },
            fail: function(res) {
            }
          })
        }
    },
    onLoad: function (options) {
      price = parseInt(options.price);
      id = options.id;
      var that = this;
      if (wx.onUserCaptureScreen) {
        wx.onUserCaptureScreen(function (res) {
          wx.showModal({
            title: '提示',
            content: '截图需要优化处理下，这样会更逼真哦',
            confirmText: '去处理',
            success: function (res) {
              if (res.confirm) {
                let cat;
                if (utils.isEmptyObject(that.data.detail.files)) {
                  cat = 2
                } else {
                  cat = 5
                }
                wx.navigateTo({
                  url: '/pages/screenShot/screenShot?cat=' + cat+'&id='+id
                })
              } else if (res.cancel) {
              }
            }
          })
        })
      }
    },
}));
