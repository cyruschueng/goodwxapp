const app = getApp()
const apiurl = 'https://friend-guess.playonwechat.com/';
import tips from '../../utils/tips.js';
const common = require('../../common.js');
Page({
  data: {
    music: false,
    num: Math.random(),
    userInfo: wx.getStorageSync('userInfo'),
    now:1,
    show:false,
    newName: '朋友照片墙',
    dataUrl: wx.getStorageSync('dataUrl'),
    music_play: wx.getStorageSync('music_play')
  },
  onLoad: function (options) {
    this.setData({
      userInfo: wx.getStorageSync('userInfo')
    })
  },
  onShow: function () {
    wx.showLoading({
      title: '加载中',
    })
    let that = this;
    let sign = wx.getStorageSync('sign');
    that.setData({
      userInfo: wx.getStorageSync('userInfo'),
      show: false,
      music_play: wx.getStorageSync('music_play'),
      now: 1,
    })
    app.getAuth(function () {
      // 请求 
      wx.request({
        url: app.data.apiurl3 + "photo/photo-wall-list?sign=" + sign + '&operator_id=' + app.data.kid,
        data: {
          type: 'image'
        },
        header: {
          'content-type': 'application/json'
        },
        method: "GET",
        success: function (res) {
          console.log("照片墙列表:", res);
          var status = res.data.status;
          if (status == 1) {
            let photosList = res.data.data;
            for (let i = 0; i < photosList.length;i++){
              photosList[i].add_time = photosList[i].add_time.split("-");
            }
            console.log(photosList);
            that.setData({
              photosList
            })
            let _photosList = that.data.photosList;
            console.log("_photosList:", _photosList);
            for (let i = 0; i < _photosList.length; i++) {
              _photosList[i].day = _photosList[i].add_time[2].substring(0, 2);
            }
            that.setData({
              photosList: _photosList
            })
            console.log(that.data.photosList);
            wx.hideLoading()
          } else {
            tips.alert(res.data.msg)
          }
        }
      })
      //获取用户信息
      wx.request({
        url: app.data.apiurl + "photo/user-info?sign=" + sign + '&operator_id=' + app.data.kid,
        header: {
          'content-type': 'application/json'
        },
        method: "GET",
        success: function (res) {
          console.log("用户信息:", res);
          var status = res.data.status;
          if (status == 1) {
            that.setData({
              member_number: res.data.data.member_number,
              photo_fans_count: res.data.data.photo_fans_count
            })
            //wx.hideLoading()
          } else {
            tips.alert(res.data.msg)
          }
        }
      })
      //背景图  
      wx.request({
        url: app.data.apiurl2 + "photo/get-user-bg?sign=" + sign + '&operator_id=' + app.data.kid,
        header: {
          'content-type': 'application/json'
        },
        method: "GET",
        success: function (res) {
          console.log("背景图:", res);
          var status = res.data.status;
          if (status == 1) {
            that.setData({
              bgImg: res.data.data.bg
            })
          } else {
            console.log(res.data.msg)
          }
        }
      })
    })
  },
  bindPlay() {
    var that = this;
    let music_play = that.data.music_play;
    if (music_play == true) {
      console.log(1);
      wx.pauseBackgroundAudio();//暂停
      app.data.music_play = false;
      wx.setStorageSync('music_play', false)
      that.setData({
        music_play: false
      })
    } else {
      console.log(2);
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
  //编辑
  editTap(e){
    let that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        var tempFilePaths = res.tempFilePaths;
        console.log(tempFilePaths);
        tips.loading('上传中');
        tips.loaded(); //消失
        that.setData({
          dialog: true
        })
        for (let i = 0; i < tempFilePaths.length; i++) {
          wx.uploadFile({
            url: apiurl + "api/upload-image?sign=" + wx.getStorageSync('sign') + ' & operator_id=' + app.data.kid,
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
                //更换背景图  
                wx.request({
                  url: app.data.apiurl2 + "photo/change-user-bg?sign=" + wx.getStorageSync('sign') + '&operator_id=' + app.data.kid,
                  data:{
                    picture: that.data.url
                  },
                  header: {
                    'content-type': 'application/json'
                  },
                  method: "GET",
                  success: function (res) {
                    console.log("改变背景图:", res);
                    var status = res.data.status;
                    if (status == 1) {
                      that.setData({
                        bgImg: that.data.picture
                      })
                      tips.success('上传成功！')
                    } else {
                      tips.alert(res.data.msg)
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
  // 音乐列表
  musicList: function (e) {
    console.log(e);
    this.setData({
      music: true,
      _pw_id: e.currentTarget.dataset.pw_id,
      index: e.currentTarget.dataset.index
    })
  },
  checkMusic(e) {
    wx.showLoading({
      title: '加载中',
    })
    console.log(e);
    let music_id = e.currentTarget.dataset.music_id;
    let that = this;
    let sign = wx.getStorageSync('sign');
    wx.request({
      url: apiurl + "photo/edit-music?sign=" + sign + '&operator_id=' + app.data.kid,
      data: {
        music_id: music_id,
        pw_id: that.data._pw_id
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {

        var status = res.data.status;
        if (status == 1) {
          console.log("修改背景:", res);
          that.setData({
            music: false,
            newMusicurl: e.currentTarget.dataset.url,
            newMusicname: e.currentTarget.dataset.name,
            newMusicsinger: e.currentTarget.dataset.singer
          })
          tips.success('修改背景音乐成功！');
          let photosList = that.data.photosList;
          console.log(photosList);
          for (let i = 0; i < photosList.length; i++) {
            photosList[that.data.index].music_info.url = e.currentTarget.dataset.url
            photosList[that.data.index].music_info.name = e.currentTarget.dataset.name
            photosList[that.data.index].music_info.singer = e.currentTarget.dataset.singer
            console.log(that.data.index);
          }
          that.setData({
            photosList
          })
          //console.log("new:", that.data.photosList)

        } else {
          tips.alert(res.data.msg);
        }

      }
    })
  },
  cancel() {
    this.setData({
      music: false
    })
  },
  navbar(e){
    let that = this;
    let form_id=e.detail.formId;
    let type ='';
    that.setData({
       now:e.currentTarget.dataset.now
    })
    if (e.currentTarget.dataset.now==2){
      type = 'h5'
    }else{
      type = 'image'
    }
    wx.request({
      url: app.data.apiurl3 + "photo/photo-wall-list?sign=" +wx.getStorageSync('sign') + '&operator_id=' + app.data.kid,
      data: {
        type: type
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        //console.log("照片墙列表:", res);
        var status = res.data.status;
        if (status == 1) {
          let photosList = res.data.data;
          for (let i = 0; i < photosList.length; i++) {
            photosList[i].add_time = photosList[i].add_time.split("-");
          }
          console.log(photosList);
          that.setData({
            photosList
          })
          let _photosList = that.data.photosList;
          console.log("_photosList:", _photosList);
          for (let i = 0; i < _photosList.length; i++) {
            _photosList[i].day = _photosList[i].add_time[2].substring(0, 2);
          }
          that.setData({
            photosList: _photosList
          })
          console.log(that.data.photosList);
          wx.hideLoading()
          wx.hideLoading()
        } else {
          that.setData({
            photosList: false
          })
          tips.alert(res.data.msg)
        }
      }
    }),
    // 保存formid
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

  },
  // 删除
  dels(e) {
    wx.showLoading({
      title: '加载中',
    })
    let that = this;
    let sign = wx.getStorageSync('sign');
    console.log(e.currentTarget.dataset.pw_id);
    let photoIndex = e.currentTarget.dataset.photoindex;
    let photosList = that.data.photosList;
    // 请求 
    wx.request({
      url: app.data.apiurl + "photo/del-photo-wall?sign=" + sign + '&operator_id=' + app.data.kid,
      data: {
        pw_id: e.currentTarget.dataset.pw_id
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        console.log("删除照片墙:", res);
        var status = res.data.status;
        if (status == 1) {
          tips.success('照片墙删除成功!');
          photosList.splice(photoIndex, 1)
          that.setData({
            photosList
          })
        } else {
          tips.alert(res.data.msg)
        }
        wx.hideLoading()
      }
    })
  },
  seeTap(e) {
    console.log(e)
    let pw_id = e.currentTarget.dataset.pw_id;
    let bgMusic = e.currentTarget.dataset.musicurl;
    console.log('musicUrl:', e.currentTarget.dataset.musicurl)
    app.data.dataUrl = e.currentTarget.dataset.musicurl;
    wx.playBackgroundAudio({ //播放
      dataUrl: e.currentTarget.dataset.musicurl
    })
    wx.showLoading({
      title: '加载中',
    })
    let that = this;
    let sign = wx.getStorageSync('sign');
    wx.setStorageSync('pw_id', pw_id);
    wx.setStorageSync('bgMusic', e.currentTarget.dataset.musicurl);
    wx.setStorageSync('nameMusic', e.currentTarget.dataset.nameMusic);
    // temp_id: options.temp_id,pw_id: options.pw_id
    wx.navigateTo({
      url: '../templateInform/templateInform?pw_id=' + e.currentTarget.dataset.pw_id,
    })
  },
  seeTap1(e) {
    console.log(e)
    let pw_id = e.currentTarget.dataset.pw_id;
    let bgMusic = e.currentTarget.dataset.musicurl;
    console.log('musicUrl:', e.currentTarget.dataset.musicurl)
    app.data.dataUrl = e.currentTarget.dataset.musicurl;
    wx.playBackgroundAudio({ //播放
      dataUrl: e.currentTarget.dataset.musicurl
    })
    wx.showLoading({
      title: '加载中',
    })
    let that = this;
    let sign = wx.getStorageSync('sign');
    wx.setStorageSync('pw_id', pw_id);
    wx.setStorageSync('bgMusic', e.currentTarget.dataset.musicurl);
    wx.setStorageSync('nameMusic', e.currentTarget.dataset.nameMusic);
    // temp_id: options.temp_id,pw_id: options.pw_id
    wx.navigateTo({
      url: '../albumInform/albumInform?pw_id=' + e.currentTarget.dataset.pw_id,
    })
  },
  // 新增相册
  newPhotos(e){
    wx.switchTab({
      url: '../templatePhoto/templatePhoto',
    })
  },
  setName(e) {
    let that = this;
    let sign = wx.getStorageSync('sign');
    let id = e.currentTarget.dataset.pw_id;
    // 请求 
    wx.request({
      url: apiurl + "photo/edit-pname?sign=" + sign + '&operator_id=' + app.data.kid,
      data: {
        pw_id: id,
        name: e.detail.value
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        console.log("编辑照片墙名称:", res);
        var status = res.data.status;
        if (status == 1) {
          tips.success('编辑成功');

        } else {
          tips.alert(res.data.msg);
        }
        wx.hideLoading()
      }
    })
  }

})
 