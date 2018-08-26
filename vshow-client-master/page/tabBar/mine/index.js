const app = getApp();
let { editAvatarUrl, staticHostUrl } = require('../../../config.js');
const imgRootDir = '/page/common/resources/kindMine';
let { NetUploadFile, showTips } = require('../../../utils/util');
Page({
  data: {
    defaultAvatarUrl: `${imgRootDir}/defalt_avatar.png`,
    userInfo: null,
    bgPic: `${imgRootDir}/mine_bg.jpg`,
    targetName: 'avatarUrl', //唯一的裁剪图片生成的key app.globalData.avatarUrl
    mineList: [{
      id: 1,
      name: '更多功能',
      bgColor: '#fe6a6a',
      url: '/page/mine/pages/extrafns/extrafns',
      icon: `${imgRootDir}/wwx_cy.png`
    }, {
      id: 2,
      name: '在线客服',
      bgColor: '#ffa648',
      url: '',  //./page / leaveword / index
      icon: `${imgRootDir}/wwx_sy.png`
      }, {
        id: 3,
        name: '',
        bgColor: '#6cacf4',
        url: '',
        icon: `${imgRootDir}/wwx_zp.png`
      }, {
        id: 4,
        name: '关于微V秀',
        bgColor: '#b4e087',
        url: '/page/mine/pages/aboutus/index',
        icon: `${imgRootDir}/wwx_fx.png`
      }]
  },

  updateAvatar(avatarUrl){
    let self = this;
    wx.showLoading({
      title: '上传中...',
      mask: true
    });
    NetUploadFile({
      url: editAvatarUrl,
      name: 'avatarUrl',
      filePath: avatarUrl,
      success(res) {
        //console.log(res);
        let { statusCode, data } = res;
        //console.log(data);
        if (-statusCode === -200) { //上传成功
          app.globalData.userInfo.avatarUrl = staticHostUrl + data;
          self.setData({
            'userInfo.avatarUrl': app.globalData.userInfo.avatarUrl
          });
          showTips('上传头像成功');

        } else {  //上传失败
          showTips('上传失败,稍后重试');
        }
      },
      fail(res) {
        showTips('网络错误,稍后重试');
        pageCtx.setData({
          disabled: false,
          btnText: '上传头像'
        });
      }
    });
    
    
  },

  onLoad(){
    let self = this;
    self.getUserInfo();
    wx.getStorage({
      key: 'bgPicPath',
      success: function(res) {
        let bgPicPath = res.data;
        self.setData({ bgPic: bgPicPath });
      },
    })

    //创建animation
    let animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'linear',
      delay: 500,
      transformOrigin: '50% 50% 0'
    });
    
  },

  onLogin(e){
    let self = this;
    //console.log(e);
    if (e.detail.userInfo){
      app.globalData.userInfo = e.detail.userInfo;
      self.setData({
        userInfo: app.globalData.userInfo
      });
    }
  },

  previewAvatar(){
    if(this.data.userInfo.avatarUrl){
      wx.previewImage({
        urls: [this.data.userInfo.avatarUrl]
      })
    }
  },

  getUserInfo(){
    let self = this;
    app.getWeixinUserInfo(userInfo => {
      self.setData({
        userInfo
      });
    });
  },

  tapAvatar(){
    if(!app.globalData.userInfo) return console.error('未登录');
    let { targetName } = this.data;
    wx.showModal({
      title: '是否上传头像',
      success(res){
        if(res.confirm){  //确定替换
          wx.chooseImage({
            count: 1,
            sizeType: ['compressed'],
            success(res) { //res.tempFilePaths
              wx.navigateTo({
                url: `/page/common/wecropper/index?oriImgUrl=${res.tempFilePaths[0]}&hasUploadBtn=&createBtnText=上传头像&targetName=${targetName}`
              })
            },
          })
        }
      }
    })
  },

  onShow(){
    let { targetName } =this.data;
    if (app.globalData[targetName]){  //如果存在，则说明上传图片已裁剪完毕，开始上传， 上传完毕，请清除
      this.updateAvatar(app.globalData[targetName]);
      delete app.globalData[targetName];
    }
  },

  replaceBgPic(){
    let self = this;
    wx.showModal({
      title: '更换背景图片',
      success(res){
        if(res.confirm){
          wx.chooseImage({
            count: 1,
            success: function (res) {
              let bgPicPath = res.tempFilePaths[0];
              wx.getStorage({
                key: 'bgPicPath',
                success: function(res) {
                  wx.removeSavedFile({
                    filePath: res.data,
                    complete(res){
                      console.log(res);
                    }
                  })
                },
              })

              wx.saveFile({
                tempFilePath: bgPicPath,
                success(res){
                  let savePath = res.savedFilePath;
                  wx.setStorage({
                    key: 'bgPicPath',
                    data: savePath,
                  })
                  self.setData({ bgPic: savePath });
                }
              })
              
              
            }
          })
        }else if(res.cancel){
          console.log('取消更换');
        }
      }
    })
    
  },

  onShareAppMessage() {
    return {
      title: '一起走进美图的海洋吧'
    }
  }
})