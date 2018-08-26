//index.js
//获取应用实例
var app = getApp()
var utils = require('../../utils/util.js')
var common = require('../../utils/common.js')
import { $wuxDialog } from '../../wux/wux'
var api = require('../../api.js')
let windowSize={};
var Zan = require('../../zanui/index');
var tapLock=false
var price=0
var id

Page(Object.assign({}, Zan.Toast, {
    data: {
        empty:utils.emptyDeatails(),
        showModalStatus: false,
        isAndroid:app.globalData.system_info.platform=='android',
        info:{},
        userInfo: {},
        showButton:true
    },
    editInfo:function () {
        if(tapLock){
            tapLock = false;
            return
        }else{
            wx.navigateTo({
                url: "/pages/info/info"
            })
        }
    },
    onUnload:function () {
      var hasPay = wx.getStorageSync('pay'+id)
      if(price&&!hasPay){
        utils.removeCircle();
      }
    },
    popup:function(){
        var that  = this;
        tapLock = true
        wx.showActionSheet({
            itemList: ['加图文', '加转发','加广告','截图','清空'],
            success: function(res) {
                  if(!common.checkPay(id,price,'开通VIP，才能使用这个功能哦',that,$wuxDialog,function () {
                      wx.setStorageSync('pay'+id,1);
                      api.templatePay('template',id);
                    })
                  ){
                    return;
                  }
                if(res.tapIndex==0){
                    utils.setDetailIndex();
                    wx.navigateTo({
                        url: "/pages/detailAdd/detailAdd"
                    })
                }else if(res.tapIndex==1){
                    utils.setDetailIndex();
                    wx.navigateTo({
                        url: "/pages/detailLinkAdd/detailLinkAdd"
                    })
                }else if(res.tapIndex==2){
                    utils.setDetailIndex();
                    wx.navigateTo({
                        url: "/pages/detailADAdd/detailADAdd"
                    })
                }else if(res.tapIndex==3){
                  wx.showModal({
                    title: '提示',
                    content: '请用手机系统自带的截屏功能哦',
                    showCancel:false,
                    confirmText:'知道了'
                  })
                }else if(res.tapIndex==4){
                    wx.showModal({
                        title: '提示',
                        content: '要删除本条内容吗？',
                        confirmText:'删除',
                        success: function(res) {
                            if (res.confirm) {
                                utils.removeCircle();
                                that.setData({
                                    info:{},
                                    empty:true,
                                    details:[]
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
    onShow: function (options) {
        let that = this
        this.data.info = wx.getStorageSync('info')
        if(utils.isEmptyObject(this.data.info)){this.data.info = {};}
          this.setData({
            info:this.data.info
          })
        windowSize={"windowWidth":app.globalData.system_info.windowWidth,"windowHeight":app.globalData.system_info.windowHeight,"pixelRatio":app.globalData.system_info.pixelRatio}
        that.data.details = utils.getDetails();

        var isEmpty = utils.emptyDeatails()

        that.setData({
            empty:isEmpty,
            padding:'padding: 0 25rpx 0 100rpx;',
            details:that.data.details,
            oneSize:Math.ceil(windowSize.windowWidth*0.48*windowSize.pixelRatio),
            twoSize:Math.ceil(windowSize.windowWidth * 0.21*windowSize.pixelRatio),
            pixelRatio:windowSize.pixelRatio,
            threeSize:Math.ceil(windowSize.windowWidth * 0.21*windowSize.pixelRatio)
        })

        if(!isEmpty && !wx.getStorageSync('has_show_circle_guide')){
            this.openGuide();
        }

      if(!wx.getStorageSync('has_show_circle_confirm')) {
        wx.showModal({
          title: '提示',
          content: '制作完成后，请用手机截屏来保存图片',
          showCancel: false,
          confirmText: '知道了',
          success: function(res) {
            wx.setStorageSync('has_show_circle_confirm',1)
          }
        })
      }
    },
    openGuide: function () {
        wx.setStorageSync('has_show_circle_guide',1)
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
    operateLike:function (e) {
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
                    console.log(parseInt(e.currentTarget.id))
                    wx.setStorageSync('current_detail_index',parseInt(e.currentTarget.id))
                    wx.navigateTo({
                        url: "/pages/likesAdd/likesAdd"
                    })
                }else if(res.tapIndex==1){
                    wx.showModal({
                        title: '提示',
                        content: '要清除所有点赞么？',
                        confirmText:'删除',
                        success: function(res) {
                            if (res.confirm) {
                                that.data.details[e.currentTarget.id].likes = "";
                                wx.setStorageSync("details", that.data.details);
                                that.setData({
                                    details:that.data.details,
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
        let that = this
        if(tapLock){
            tapLock = false;
            return
        }
        wx.showActionSheet({
            itemList: ['回复TA', '修改这条评论','删除这条评论'],
            success: function(res) {
              if(!common.checkPay(id,price,'开通VIP，才能使用这个功能哦',that,$wuxDialog,function () {
                  wx.setStorageSync('pay'+id,1);
                  api.templatePay('template',id);
                })
              ){
                return;
              }
                if(res.tapIndex==1){
                    wx.setStorageSync('current_detail_index',parseInt(e.currentTarget.dataset.index))
                    wx.setStorageSync('current_comment_index',parseInt(e.currentTarget.id))
                    wx.navigateTo({
                        url: "/pages/commentAdd/commentAdd"
                    })
                }else if(res.tapIndex==2){
                    console.log(e.currentTarget.id)

                    wx.showModal({
                        title: '提示',
                        content: '要删除这条评论么？',
                        confirmText:'删除',
                        success: function(res) {
                            if (res.confirm) {

                                var _details = utils.getDetails();
                                var detail = _details[parseInt(e.currentTarget.dataset.index)]
                                console.log(detail)
                                if(utils.isEmptyObject(detail.comments)){
                                    detail.comments = [];
                                }else{
                                    detail.comments.splice(parseInt(e.currentTarget.id), 1);
                                }

                                _details[parseInt(e.currentTarget.dataset.index)] = detail
                                //utils.saveDetail(detail)
                                wx.setStorageSync("details", _details)
                                that.setData({
                                    details:_details
                                })
                            } else if (res.cancel) {
                            }
                        }
                    })
                }else if(res.tapIndex==0) {
                    wx.setStorageSync('current_detail_index',parseInt(e.currentTarget.dataset.index))

                    var detail = utils.getDetail()

                    if(utils.isEmptyObject(detail.comments)){detail.comments = [];}

                    wx.setStorageSync('current_comment_index',detail.comments.length)
                    wx.navigateTo({
                        url: "/pages/commentAdd/commentAdd?fname="+e.currentTarget.dataset.fname
                    })
                }
            },
            fail: function(res) {
            }
        })
    },
    operate:function (e) {
        var that  = this;
        if(tapLock){
            tapLock = false;
            return
        }
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
                    wx.setStorageSync('current_detail_index',parseInt(e.currentTarget.id))
                    wx.navigateTo({
                        url: "/pages/likesAdd/likesAdd"
                    })
                }else if(res.tapIndex==1){
                    wx.setStorageSync('current_detail_index',parseInt(e.currentTarget.id))

                    var detail = utils.getDetail()
                    if(utils.isEmptyObject(detail.comments)){detail.comments = [];}

                    wx.setStorageSync('current_comment_index',detail.comments.length)
                    wx.navigateTo({
                        url: "/pages/commentAdd/commentAdd"
                    })
                }
            },
            fail: function(res) {
            }
        })
    },
    popupEdit:function (e) {
        var that  = this;
        if(tapLock){
            tapLock = false;
            return
        }
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
                    wx.setStorageSync('current_detail_index',parseInt(e.currentTarget.id))
                    if(!utils.isEmptyObject(that.data.details[e.currentTarget.id].link)&&that.data.details[e.currentTarget.id].link.content){
                        wx.navigateTo({
                            url: "/pages/detailLinkAdd/detailLinkAdd"
                        })
                    }else if(!utils.isEmptyObject(that.data.details[e.currentTarget.id].ad)&&that.data.details[e.currentTarget.id].ad.content){
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
                                that.data.details[e.currentTarget.id] = null
                                //that.data.details.splice(e.currentTarget.id, 1);
                                wx.setStorageSync("details", that.data.details);
                                that.setData({
                                    empty:utils.emptyDeatails(),
                                    details:that.data.details
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
                  url: '/pages/screenShot/screenShot?cat=1&id='+id
                })
              } else if (res.cancel) {
              }
            }
          })
        })
      }
    }
}));
