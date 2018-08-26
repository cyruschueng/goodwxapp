//index.js
//获取应用实例
var app = getApp()
var utils = require('../../../../utils/util.js')
var api = require('../../../../api.js')
var upload = require('../../../../utils/upload.js')
var Zan = require('../../../../zanui/index');
var weixin = {}
var user={}
var addType

Page(Object.assign({}, Zan.Toast, {
  data: {
  },
  onLoad: function (options) {
    addType = options.addType;
  },
  onShow: function (options) {
    var that = this
    console.log("qunliao1")
      weixin  = wx.getStorageSync('weixin');
      if(utils.isEmptyObject(weixin)){weixin = {};}
      if(utils.isEmptyObject(weixin.qunliao)){weixin.qunliao = {};}
      if(utils.isEmptyObject(weixin.qunliao.users)){weixin.qunliao.users = [];}
      if(utils.isEmptyObject(weixin.qunliao.bg)){weixin.qunliao.bg = {};}
      api.login(function (_user) {
          user = _user
          console.log("user123123")
          console.log(user)
          if(utils.isEmptyObject(weixin.qunliao.users)){
              weixin.qunliao.users = [{"avatar":user.avatar,"name":user.user_name}];
          }
          wx.setStorageSync("weixin", weixin);
              that.setData({
                  weixin:weixin
             })
      },function () {
          wx.setStorageSync("weixin", weixin);
          that.setData({
              weixin:weixin
          })
      },'必须授权登录之后才能操作呢，是否重新授权登录？')
  },
    afterchoose: function (localPics) {
        var that = this
        for (var i=0;i<localPics.length;i++)
        {
            weixin.qunliao.users.push({"avatar":'http://icons.maiyizhi.cn/uploading.png',"name":''})
        }
        this.setData({
            weixin:weixin
        });
        this.setData({ disabled: true });
        wx.setStorageSync("weixin", weixin);
        this.startUpload(localPics);
    },
    startUpload: function (localPics) {
        var that = this;
        if(localPics.length) {
            upload.uploadSingleB({path: localPics[0], state: 1}, function (pic) {
                if(pic){
                    console.log(weixin.qunliao.users.length)
                    weixin.qunliao.users[weixin.qunliao.users.length-localPics.length] = {"avatar":pic.url+'?imageView2/1/w/150/h/150',"name":''}
                    localPics = localPics.splice(1, localPics.length)
                    that.onUploadComplete(localPics);
                    if (!localPics.length) {
                        that.setData({disabled: false});
                    }
                }else{
                    that.showZanToast('上传失败，请稍后再试呢');
                }
            });
        }
    },
    onUploadComplete: function (localPics) {
        this.setData({
            weixin:weixin
        });
        wx.setStorageSync("weixin", weixin);
        if(localPics.length){
            this.startUpload(localPics);
        }
    },
    chooseImage: function (e) {
        var that = this;

        wx.showActionSheet({
            itemList: ['选择系统人物', '从相册选择','选择我自己','随机来一个'],
            success: function(res) {
                if(res.tapIndex==1){
                    wx.chooseImage({
                        sizeType: ['original', 'compressed'],
                        sourceType: ['album', 'camera'],
                        count:10,
                        success: function (res) {
                            that.afterchoose(res.tempFilePaths)
                        }
                    })
                }else if(res.tapIndex==0){
                    wx.navigateTo({
                        url: "/pages/selectUser/selectUser?from=weixin-qunliao"
                    })
                }else if(res.tapIndex==2){
                  api.login(function (user) {
                    var _user = {"avatar":user.avatar,"name":user.user_name}
                    //weixin.qunliao.users.push(_user)
                    weixin.qunliao.users.splice(0, 0, _user);

                    wx.setStorageSync('temp_jietu_select_user', _user);

                    that.setData({
                      weixin: weixin
                    })
                    wx.setStorageSync("weixin", weixin);
                  },function () {

                  },'必须授权登录之后才能操作呢，是否重新授权登录？')
                }else if(res.tapIndex==3){
                    wx.showNavigationBarLoading();
                    wx.showToast({
                        title: 'Loading……',
                        duration:2000,
                        icon: 'loading'
                    })
                    api.random(function(res) {
                        console.log(res)
                        var _user = {"avatar":res.user.avatar,"name":res.user.name}
                        weixin.qunliao.users.push(_user)

                        wx.setStorageSync('temp_jietu_select_user', _user);

                        that.setData({
                            weixin: weixin
                        })
                        wx.setStorageSync("weixin", weixin);
                        wx.hideToast()
                        wx.hideNavigationBarLoading();
                    });
                }
            },
            fail: function(res) {
            }
        })
    },
    deleteImage: function(e){
        let that  = this;
        wx.showModal({
            title: '提示',
            content: '要删除这个成员吗？',
            confirmText:'删除',
            success: function(res) {
                if (res.confirm) {
                    for(var i=0; i<weixin.qunliao.users.length; i++) {
                        if(weixin.qunliao.users[i].avatar == e.currentTarget.id) {
                            // if(weixin.qunliao.users[i].avatar == user.avatar){
                            //     that.showZanToast('不能删除自己呢');
                            //     return
                            // }else{
                                weixin.qunliao.users.splice(i, 1);
                                wx.setStorageSync("weixin", weixin);
                                that.setData({
                                    weixin: weixin
                                });
                            //}
                            break;
                        }
                    }
                } else if (res.cancel) {

                }
            }
        })
    },
    deleteBg: function(e){

        weixin.qunliao.bg={};
        wx.setStorageSync("weixin", weixin);
        this.setData({
            weixin: weixin
        });


    },
    chooseBg: function (e) {
        var that = this;
        wx.chooseImage({
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            count:1,
            success: function (res) {
                weixin.qunliao.bg.url = 'http://icons.maiyizhi.cn/uploading.png'
                that.setData({
                    weixin: weixin
                });
                that.setData({ disabled: true });

                upload.uploadSingleB({path: res.tempFilePaths[0], state: 1}, function (pic) {
                    console.log(pic)
                    if(pic){
                        weixin.qunliao.bg = {'url':pic.url,'width':pic.width,'height':pic.height}
                        that.setData({
                            weixin: weixin
                        });
                        wx.setStorageSync("weixin", weixin);
                    }else{
                        that.showZanToast('上传失败，请稍后再试呢');
                    }
                    that.setData({ disabled: false });
                });
            }
        })

    },
    bindName:function (e) {
        console.log(e)
        weixin.qunliao.users[e.target.dataset.index].name = e.detail.value
        wx.setStorageSync("weixin", weixin);
    },
    formSubmit: function (e) {
        var that = this
        var name = e.detail.value.name;
        var counts = e.detail.value.counts;
        if(!name){name='群聊'}
        if(!counts){counts='10'}
        console.log(weixin)
        weixin.qunliao.name = name

        weixin.qunliao.counts = counts
        if(utils.isEmptyObject(weixin.qunliao.users)){
            that.showZanToast('发言成员不能为空哦');
            return
        }
        for(var i=0; i<weixin.qunliao.users.length; i++) {
            if(weixin.qunliao.users[i].avatar == "") {
                that.showZanToast('成员头像上传失败');
                return
            }
            if(weixin.qunliao.users[i].name == "") {
                that.showZanToast('请输入成员昵称');
                return
            }
        }
        wx.setStorageSync("weixin", weixin);
        if(!wx.getStorageSync('temp_jietu_select_user')) {
            wx.setStorageSync('temp_jietu_select_user', weixin.qunliao.users[weixin.qunliao.users.length - 1]);
        }

        if (addType == "textAdd") {
          wx.redirectTo({
            url: "/pages/jietu/textAdd/textAdd?app=weixin&type=qunliao"
          })
        } else if (addType == "picAdd") {
          wx.redirectTo({
            url: "/pages/jietu/picAdd/picAdd?app=weixin&type=qunliao"
          })
        } else if (addType == "voiceAdd") {
          wx.redirectTo({
            url: "/pages/jietu/voiceAdd/voiceAdd?app=weixin&type=qunliao"
          })
        } else if (addType == "hongbaoAdd") {
          wx.redirectTo({
            url: "/pages/jietu/hongbaoAdd/hongbaoAdd?app=weixin&type=qunliao"
          })
        } else if (addType == "zhuanzhangAdd") {
          wx.redirectTo({
            url: "/pages/jietu/zhuanzhangAdd/zhuanzhangAdd?app=weixin&type=qunliao"
          })
        } else if (addType == "videoAdd") {
          wx.redirectTo({
            url: "/pages/jietu/videoAdd/videoAdd?app=weixin&type=qunliao"
          })
        } else if (addType == "urlAdd") {
          wx.redirectTo({
            url: "/pages/jietu/urlAdd/urlAdd?app=weixin&type=qunliao"
          })
        }else{
          wx.navigateBack();
        }
    }
}));
