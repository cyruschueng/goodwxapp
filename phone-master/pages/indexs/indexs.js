const app = getApp();
const apiurl = 'https://friend-guess.playonwechat.com/';
let sign = wx.getStorageSync('sign');
import tips from '../../utils/tips.js';

Page({
  data: {
    move: true,
    position: 1,//照片位置
    pw_id: 0 //默认自己的
  },
  onLoad: function (options) {
    this.setData({
      music_play: wx.getStorageSync('music_play')
    })
    console.log("options:", options);
    if (options.pw_id) {
      this.setData({
        pw_id: options.pw_id
      })
    }
  },
  onShow: function () {
    console.log('onshow');
    let that = this;
    console.log('music_play', wx.getStorageSync('music_play'))

    wx.showToast({
      title: '加载中',
      icon: 'loading',
      music_play: wx.getStorageSync('music_play')
    })
    // });
    if (!that.data.pw_id){
      that.setData({
        pw_id: 0
      })
    }else{
      that.setData({
          pw_id: that.data.pw_id
      })
    }
    app.getAuth(function () {
      let userInfo = wx.getStorageSync('userInfo');
      let sign = wx.getStorageSync('sign');
      setTimeout(function () {
        that.setData({
          move: false, //动态效果
        })
      }, 200)

      // 请求数据
      wx.request({
        url: apiurl + "photo/photo-wall-detail?sign=" + sign + '&operator_id=' + app.data.kid,
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
            let photos = res.data.data.photos;
            let datas = [];
            for (let i = 0; i < 27; i++) {
              if (photos[i]) {
                datas.push(photos[i]);
              } else {
                datas.push({ 'photo_url': 'https://gcdn.playonwechat.com/photo/bg.jpg', 'position': i + 1 })
              }
            }

            that.setData({
              photos: datas,
              self: res.data.data.self
            })
            // console.log(that.data.photos);

          } else {
            tips.alert(res.data.msg);
          }
          wx.hideLoading()
        }
      })
    })
  },
  //事件处理函数
  prewImg: function (e) {
    let that = this;
    let picture = e.currentTarget.dataset.picture;
    let pictures = picture.split();
    // console.log('picture:', picture, typeof(picture))
    // console.log('pictures:', pictures, typeof(pictures))
    wx.previewImage({
      current: picture, // 当前显示图片的http链接
      urls: pictures // 需要预览的图片http链接列表
    })
  },
  bindPlay: function () {
    var that = this;
    let music_play = app.data.music_play;
    if (music_play == true) {
      wx.pauseBackgroundAudio();//暂停
      app.data.music_play = false;
      that.setData({
        music_play: false
      })
    } else {
      wx.playBackgroundAudio({ //播放
        dataUrl: app.data.dataUrl
      })
      app.data.music_play = true;
      that.setData({
        music_play: true
      })
    }
    wx.setStorageSync('music_play', that.data.music_play)
  },
  management() {
    wx.navigateTo({
      url: '../setting/setting'
    })
  },
  upPhoto() {

    let that = this;
    let sign = wx.getStorageSync('sign');
    let photos = that.data.photos;
    let length = photos.length;
    let arr = [];//当前上传的位置
    // 背景音乐
    // wx.pauseBackgroundAudio();//暂停
    // app.data.music_play = false;
    // that.setData({
    //   music_play: false
    // })
    console.log("length:", length);
    if (length = 27) {  //不足27张，已拼完有删除掉的
      console.log('已拼完');
      for (let i = 0; i < length; i++) {
        //console.log(photos[i].photo_url);
        if (photos[i].photo_url == 'https://gcdn.playonwechat.com/photo/bg.jpg') {
          arr.push(photos[i].position);
          //console.log('position:', photos[i].position);
          that.setData({
            position: arr[0]
          })
        }
      }
    } else { //未拼完
      console.log('未拼完');
      for (let i = 0; i < length; i++) {
        if (photos[i].photo_url == 'https://gcdn.playonwechat.com/photo/bg.jpg') {
          arr.push(photos[i].position);
          //console.log('position:', photos[i].position)
          that.setData({
            position: arr[0]
          })
        }
      }
    }

    //console.log('arr:',arr);
    wx.showLoading({
      title: '加载中'
    });
    // 上传 
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log("选择相册", res);
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        tips.loading('上传中');
        tips.loaded(); //消失
        that.setData({
          dialog: true
        })
        console.log(apiurl + "api/upload-image?sign=" + sign + ' & operator_id=' + app.data.kid);
        wx.uploadFile({
          url: apiurl + "api/upload-image?sign=" + sign + ' & operator_id=' + app.data.kid,
          filePath: tempFilePaths[0],
          name: 'image',
          formData: {
            'user': 'test'
          },
          success: function (res) {
            console.log('上传图片成功', res);
            let data = JSON.parse(res.data);
            if (data.status == 1) {
              that.setData({
                picture: data.data
              })
              wx.request({
                url: apiurl + "photo/append-photo?sign=" + sign + '&operator_id=' + app.data.kid,
                data: {
                  pw_id: that.data.pw_id,
                  picture: that.data.picture,
                  position: that.data.position
                },
                header: {
                  'content-type': 'application/json'
                },
                method: "GET",
                success: function (res) {
                  console.log("添加照片:", res);
                  let status = res.data.status;
                  if (status == 1) {
                    console.log('上传成功！')
                    // wx.playBackgroundAudio({ //播放
                    //   dataUrl: app.data.dataUrl
                    // })
                    app.data.music_play = true;
                    that.setData({
                      music_play: true
                    })

                  } else {
                    tips.alert(res.data.msg);
                  }

                }
              })

              // 添加照片
            } else {
              tips.alert(res.data.msg)
            }
          }
        })
      }
    })
    wx.hideLoading()
  },
  mySelf() {
    let that = this;
    console.log('mySelf');
    that.setData({
      pw_id: 0
    })
    wx.request({
      url: apiurl + "photo/photo-wall-detail?sign=" + sign + '&operator_id=' + app.data.kid,
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
          let photos = res.data.data.photos;
          let datas = [];
          for (let i = 0; i < 27; i++) {

            if (photos[i]) {
              datas.push(photos[i]);
            } else {
              datas.push({ 'photo_url': 'https://gcdn.playonwechat.com/photo/bg.jpg', 'position': i + 1 })
            }
          }
          that.setData({
            photos: datas,
            self: res.data.data.self
          })
          console.log(that.data.photos);

        } else {
          tips.alert(res.data.msg);
        }
        wx.hideLoading()
      }
    })
  },
  // 生成图片墙
  produce() {
    wx.showToast({
      title: '加载中',
      icon: 'loading'
    })
    let that = this;
    let sign = wx.getStorageSync('sign');
    wx.request({
      url: apiurl + "photo/create-image?sign=" + sign + '&operator_id=' + app.data.kid,
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        console.log("生成图片墙:", res);
        var status = res.data.status;
        if (status == 1) {
          console.log('poster:', res.data.data);
          let poster = res.data.data;
          let posters = poster.split();
          wx.previewImage({
            current: poster, // 当前显示图片的http链接
            urls: posters // 需要预览的图片http链接列表
          })
          wx.hideLoading()
        } else {
          tips.alert(res.data.msg);
        }

      }
    })
  },
  onShareAppMessage: function () {
    let that = this;
    console.log(that.data.pw_id);
    // 获取照片墙pwid
    wx.request({
      url: apiurl + "photo/pw?sign=" + sign + '&operator_id=' + app.data.kid,
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        console.log("照片墙pwid:", res);
        var status = res.data.status;
        if (status == 1) {
          that.setData({
            pw_id: res.data.data
          })

        } else {
          console.log(res.data.msg);
        }
        wx.hideLoading()
      }

    })
    return {
      title: "快来一起制作照片墙",
      path: '/pages/index/index?pw_id=' + that.data.pw_id,
      success: function (res) {
        console.log(res);
        console.log('/pages/index/index?pw_id=' + that.data.pw_id);
        // 转发成功
      },
      fail: function (res) {
        console.log(res);
        // 转发失败
      }
    }


  }
})
