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
      var that = this;
      weixin  = wx.getStorageSync('weixin');
      if(utils.isEmptyObject(weixin)){weixin = {};}
      if(utils.isEmptyObject(weixin.danliao)){weixin.danliao = {};}
      if(utils.isEmptyObject(weixin.danliao.users)){weixin.danliao.users = [];}
      if(utils.isEmptyObject(weixin.danliao.bg)){weixin.danliao.bg = {};}
      if(weixin.danliao.users.length>=2){
          this.setData({
              show_add:false
          })
      }else{
          this.setData({
              show_add:true
          })
      }

      api.login(function (_user) {
          console.log(weixin.danliao.users)
          user = _user
          if(utils.isEmptyObject(weixin.danliao.users)){
              weixin.danliao.users = [{"avatar":user.avatar,"name":user.user_name}];
          }
          that.init();
      },function () {
          console.log(weixin.danliao.users)
          that.init();
      },'必须授权登录之后才能操作呢，是否重新授权登录？')

  },
    init:function () {
      console.log('init')
        wx.setStorageSync("weixin", weixin);
        this.setData({
            weixin:weixin
        })
    },
    afterchoose: function (localPic) {
        var that = this

        weixin.danliao.users.push({"avatar":'http://icons.maiyizhi.cn/uploading.png',"name":''})

        this.setData({
            weixin:weixin
        });
        this.setData({ disabled: true });
        wx.setStorageSync("weixin", weixin);
        //this.startUpload(localPics);
        upload.uploadSingleB({path: localPic, state: 1}, function (pic) {
            if(pic){
                weixin.danliao.users[weixin.danliao.users.length-1] = {"avatar":pic.url+'?imageView2/1/w/150/h/150',"name":''}
                that.setData({
                    weixin:weixin
                });
                wx.setStorageSync("weixin", weixin);
            }else{
                that.showZanToast('上传失败，请稍后再试呢');
            }
            that.setData({ disabled: false });
            if(weixin.danliao.users.length>=2){
                that.setData({
                    show_add:false
                })
            }else{
                that.setData({
                    show_add:true
                })
            }
        });
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
                        count:1,
                        success: function (res) {
                            that.afterchoose(res.tempFilePaths[0])
                        }
                    })
                }else if(res.tapIndex==0){
                    wx.navigateTo({
                        url: "/pages/selectUser/selectUser?from=weixin-danliao"
                    })
                }else if(res.tapIndex==2){
                  api.login(function (user) {
                    var _user = {"avatar":user.avatar,"name":user.user_name}
                    //weixin.danliao.users.push(_user)
                    weixin.danliao.users.splice(0, 0, _user);

                    wx.setStorageSync('temp_jietu_select_user', _user);
                    if(weixin.danliao.users.length>=2){
                      that.setData({
                        show_add:false
                      })
                    }else{
                      that.setData({
                        show_add:true
                      })
                    }
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
                        weixin.danliao.users.push(_user)
                        wx.setStorageSync('temp_jietu_select_user', _user);
                        that.setData({
                            weixin: weixin
                        })
                        if(weixin.danliao.users.length>=2){
                            that.setData({
                                show_add:false
                            })
                        }else{
                            that.setData({
                                show_add:true
                            })
                        }
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
                    for(var i=0; i<weixin.danliao.users.length; i++) {
                        if(weixin.danliao.users[i].avatar == e.currentTarget.id) {
                            /*if(weixin.danliao.users[i].avatar == user.avatar){
                                that.showZanToast('不能删除自己呢');
                                return
                            }else{*/
                                weixin.danliao.users.splice(i, 1);
                                wx.setStorageSync("weixin", weixin);
                                that.setData({
                                    weixin: weixin
                                });
                                if(weixin.danliao.users.length>=2){
                                    that.setData({
                                        show_add:false
                                    })
                                }else{
                                    that.setData({
                                        show_add:true
                                    })
                                }
                            //}
                            break;
                        }
                    }
                } else if (res.cancel) {

                }
            }
        })
    },
    bindName:function (e) {
        console.log(e)
        weixin.danliao.users[e.target.dataset.index].name = e.detail.value
        wx.setStorageSync("weixin", weixin);
    },
    deleteBg: function(e){

        weixin.danliao.bg={};
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
                weixin.danliao.bg.url = 'http://icons.maiyizhi.cn/uploading.png'
                that.setData({
                    weixin: weixin
                });
                that.setData({ disabled: true });

                upload.uploadSingleB({path: res.tempFilePaths[0], state: 1}, function (pic) {
                    console.log(pic)
                    if(pic){
                        weixin.danliao.bg = {'url':pic.url,'width':pic.width,'height':pic.height}
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
    formSubmit: function (e) {
        var that = this

        if(utils.isEmptyObject(weixin.danliao.users)){
            that.showZanToast('聊天成员不能为空哦');
            return
        }
        for(var i=0; i<weixin.danliao.users.length; i++) {
            if(weixin.danliao.users[i].avatar == "") {
                that.showZanToast('成员头像上传失败');
                return
            }
            if(weixin.danliao.users[i].name == "") {
                that.showZanToast('请输入成员昵称');
                return
            }
        }
        wx.setStorageSync("weixin", weixin);
        if(!wx.getStorageSync('temp_jietu_select_user')){
          wx.setStorageSync('temp_jietu_select_user', weixin.danliao.users[weixin.danliao.users.length-1]);
        }

        if (addType == "textAdd") {
          wx.redirectTo({
            url: "/pages/jietu/textAdd/textAdd?app=weixin&type=danliao"
          })
        } else if (addType == "picAdd") {
          wx.redirectTo({
            url: "/pages/jietu/picAdd/picAdd?app=weixin&type=danliao"
          })
        } else if (addType == "voiceAdd") {
          wx.redirectTo({
            url: "/pages/jietu/voiceAdd/voiceAdd?app=weixin&type=danliao"
          })
        } else if (addType == "hongbaoAdd") {
          wx.redirectTo({
            url: "/pages/jietu/hongbaoAdd/hongbaoAdd?app=weixin&type=danliao"
          })
        } else if (addType == "zhuanzhangAdd") {
          wx.redirectTo({
            url: "/pages/jietu/zhuanzhangAdd/zhuanzhangAdd?app=weixin&type=danliao"
          })
        } else if (addType == "videoAdd") {
          wx.redirectTo({
            url: "/pages/jietu/videoAdd/videoAdd?app=weixin&type=danliao"
          })
        } else if (addType == "urlAdd") {
          wx.redirectTo({
            url: "/pages/jietu/urlAdd/urlAdd?app=weixin&type=danliao"
          })
        }else{
          wx.navigateBack();
        }
    }
}));
