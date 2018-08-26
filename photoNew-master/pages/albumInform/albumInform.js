const app = getApp();
const apiurl = 'https://friend-guess.playonwechat.com/';
import tips from '../../utils/tips.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    checkboxs: 1,
    finish:false,
    dataUrl: wx.getStorageSync('dataUrl'),
    music_play: wx.getStorageSync('music_play'),
    button:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("options：",options);
    this.setData({
      pw_id: options.pw_id
    })
    if (options.ewm){
      this.setData({
         ewm: options.ewm
      })
    }
  },
  onShow: function () {
    console.log('music_play',wx.getStorageSync('music_play'));
    if (wx.getStorageSync('music_play')==false){
      wx.pauseBackgroundAudio();//暂停
    }
    wx.showLoading({
      title: '加载中',
    })
    let that = this;
    // 判断照片信息
    wx.request({
      url: app.data.apiurl3 + "photo/photo-wall-detail?sign=" + wx.getStorageSync('sign') + '&operator_id=' + app.data.kid,
      data: {
        pw_id: that.data.pw_id
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        console.log("照片墙信息:", res);
        var status = res.data.status;
        if (status == 1) {
          that.setData({
            thumb: res.data.data.pic + '?' + that.data.num,
            temp_id: res.data.data.temp_id,
            self: res.data.data.self,
            music_play: wx.getStorageSync('music_play')
          })
          wx.request({
            url: app.data.apiurl + "photo/template-info?sign=" + wx.getStorageSync('sign') + '&operator_id=' + app.data.kid,
            data: {
              temp_id: that.data.temp_id
            },
            header: {
              'content-type': 'application/json'
            },
            method: "GET",
            success: function (res) {
              console.log("模板详情:", res);
              var status = res.data.status;
              console.log(JSON.parse(res.data.status));
              if (status == 1) {
                that.setData({
                  photoInform: res.data.data,
                  source_effect: res.data.data.source_effect,
                  photo_count: res.data.data.photo_count
                })
                wx.hideLoading()
              } else {
                tips.alert(res.data.msg);
              }
            },
          })   
        } else {
          tips.alert(res.data.msg)
        }  
      }
    })
    wx.request({
      url: app.data.apiurl + "photo/is-full?sign=" + wx.getStorageSync('sign') + '&operator_id=' + app.data.kid,
      data: {
        pw_id: that.data.pw_id
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        console.log("照片墙是否已满:", res);
        var status = res.data.status;
        if (status == 1) {
          that.setData({
            finish: res.data.data.flag
          })
        } else {
          console.log(res.data.msg);
        }
      }
    })
    
  },
  // 管理相册
  management() {
    wx.navigateTo({
      url: '../setting/setting?pw_id=' + this.data.pw_id
    })
  },
  // 音乐
  bindPlay() {
    var that = this;
    let music_play = that.data.music_play;
    if (music_play == true) {
      console.log('music1');
      wx.pauseBackgroundAudio();//暂停
      app.data.music_play = false;
      wx.setStorageSync('music_play', false)
      that.setData({
        music_play: false
      })
    } else {
      console.log('music2');
      wx.playBackgroundAudio({ //播放
        dataUrl: app.data.dataUrl
      })
      app.data.music_play = true;
      wx.setStorageSync('music_play', true)
      that.setData({
        music_play: true
      })
    }
  },
  // 分享好友
  friends() {
    wx.showToast({
      title: '海报生成中...',
      icon: 'loading'
    })
    let that = this;
    let sign = wx.getStorageSync('sign');
    wx.request({
      url: app.data.apiurl3 + "photo/share?sign=" + sign + '&operator_id=' + app.data.kid,
      data: {
        pw_id: that.data.pw_id
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        console.log("好友拼图照片:", res);
        console.log("海报:", res.data);
        var status = res.data.status;
        if (status == 1) {
          that.setData({
            friendsImg: res.data
          })
          let friendsImg = res.data.data;
          console.log("friendsImg:", res.data.data);
          let friendsImgs = friendsImg.split();
          console.log(friendsImg)
          console.log(friendsImgs)
          wx.previewImage({
            current: friendsImg, // 当前显示图片的http链接
            urls: friendsImgs // 需要预览的图片http链接列表
          })
        } else {
          console.log(res.data.msg);
        }
        wx.hideLoading()
      }
    })
  },
  // 是否同意展示
  Change: function (e) {
    console.log(e);
    let that = this;
    console.log('checkbox发生change事件，携带value值为：', e.currentTarget.dataset.check);
    if (e.currentTarget.dataset.check == 1) {
      that.setData({
        checkboxs: 1
      })
    } else {
      that.setData({
        checkboxs: 0
      })
    }
    
  },
  // 查看照片集
  savePhoto(e){
      let that = this;
      console.log(that.data.temp_id,that.data.ewm)
      if (that.data.temp_id && that.data.ewm==1){
        wx.navigateTo({
          url: '../seephoto/seephoto?pw_id=' + that.data.pw_id + '&temp_id=' + that.data.temp_id,
        })
      }else{
        wx.request({
          url: app.data.apiurl2 + "photo/create-image?sign=" + wx.getStorageSync('sign') + '&operator_id=' + app.data.kid,
          data: {
            pw_id: that.data.pw_id,
            is_show: that.data.checkboxs
          },
          header: {
            'content-type': 'application/json'
          },
          method: "GET",
          success: function (res) {
            console.log("图片照片墙:", res);
            var status = res.data.status;
            if (status == 1) {
              console.log(res);
              if (that.data.finish) {
                wx.pauseBackgroundAudio();//暂停
                app.data.music_play = false;
                that.setData({
                  music_play: false
                })
                wx.navigateTo({
                  url: '../seephoto/seephoto?pw_id=' + that.data.pw_id + '&temp_id=' + that.data.temp_id,
                })
              } else {
                tips.alert('请先填满照片集！')
              }
            } else {
              tips.alert(res.data.msg)
            }
          }
        })
      }
      
  },
  //我也要玩
  myplay(){
    wx.switchTab({
      url: '../templatePhoto/templatePhoto',
    })
  },
  upPhoto(e){
    let that = this;
    let form_id = e.detail.formId;
    // 上传 
    wx.chooseImage({
      count: that.data.photo_count, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log("选择相册", res);
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        console.log(tempFilePaths);
        tips.loading('上传中');
        tips.loaded(); //消失
        that.setData({
          dialog: true
        })
        console.log(app.data.apiurl1 + "api/upload-image?sign=" + wx.getStorageSync('sign') + ' & operator_id=' + app.data.kid);
        console.log('length:', tempFilePaths.length)
        for (let i = 0; i < tempFilePaths.length;i++){
          console.log('image:',tempFilePaths[i])
          wx.uploadFile({
            url: app.data.apiurl1 + "api/upload-image?sign=" + wx.getStorageSync('sign') + ' & operator_id=' + app.data.kid,
            filePath: tempFilePaths[i],
            name: 'image',
            formData: {
              'user': 'test'
            },
            success: function (res) {
              console.log('上传图片成功', res);
              let data = JSON.parse(res.data);
              if (data.status == 1) {
                that.setData({
                  url: data.data
                })
                // 上传form
                wx.request({
                  url: app.data.apiurl1 + "api/save-form?sign=" + wx.getStorageSync('sign') + '&operator_id=' + app.data.kid,
                  data: {
                    form_id: form_id
                  },
                  header: {
                    'content-type': 'application/json'
                  },
                  method: "GET",
                  success: function (res) {
                  }
                })
                // 添加图片
                wx.request({
                  url: app.data.apiurl2 + "photo/append-photo?sign=" + wx.getStorageSync('sign') + '&operator_id=' + app.data.kid,
                  data: {
                    pw_id: that.data.pw_id,
                    picture: data.data
                  },
                  header: {
                    'content-type': 'application/json'
                  },
                  method: "GET",
                  success: function (res) {
                    let status = res.data.status;
                    if (status == 1) {
                      console.log('上传成功！')
                      tips.alert('上传成功！')
                      wx.request({
                        url: app.data.apiurl + "photo/is-full?sign=" + wx.getStorageSync('sign') + '&operator_id=' + app.data.kid,
                        data: {
                          pw_id: that.data.pw_id
                        },
                        header: {
                          'content-type': 'application/json'
                        },
                        method: "GET",
                        success: function (res) {
                          console.log("照片墙是否已满:", res);
                          var status = res.data.status;
                          if (status == 1) {
                            that.setData({
                              finish: res.data.data.flag
                            })
                          } else {
                            console.log(res.data.msg);
                          }
                          
                        }
                      })
                    } else {
                      wx.showToast({
                        title: res.data.msg,
                        icon: 'loading'
                      })
                    }

                  }
                })
              } else {
                tips.alert(res.data.msg)
              }
            }
          })
        }
      }
    })
  },
  onShareAppMessage: function () {
    let that = this;
    console.log(that.data.pw_id);
    // 获取照片墙pwid
    return {
      title: "快来一起制作照片墙",
      path: '/pages/albumInform/albumInform?pw_id=' + that.data.pw_id,
      success: function (res) {
        console.log(res);
        console.log('/pages/albumInform/albumInform?pw_id=' + that.data.pw_id);
        // 转发成功
      },
      fail: function (res) {
        console.log(res);
        // 转发失败
      }
    }
  }
})