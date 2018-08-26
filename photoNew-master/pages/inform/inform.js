const app = getApp();
const apiurl = 'https://friend-guess.playonwechat.com/';
import tips from '../../utils/tips.js';
Page({

  data: {
    userInfo: wx.getStorageSync('userInfo'),
    url: 'https://friend-guess.playonwechat.com/assets/images/result/40741d60add2279916d8783b3d6667f9.jpg?1513410944?0.5924372259162527'
  },
  onLoad: function (options) {
    console.log(options);
      this.setData({
        pw_id: options.pw_id,
        type: options.type,
        name: options.name,
        temp_id: options.temp_id
      })
  },
  onReady: function () {
  
  },
  onShow: function () {
    wx.showToast({
      title: '加载中',
      icon: 'loading'
    })
    let that = this;
    app.getAuth(function () {
      wx.request({
        url: app.data.apiurl2 + "photo/comment-detail?sign=" + wx.getStorageSync('sign') + '&operator_id=' + app.data.kid,
        data:{
          pw_id: that.data.pw_id
        },
        header: {
          'content-type': 'application/json'
        },
        method: "GET",
        success: function (res) {
          console.log("照片墙详情:", res);
          var status = res.data.status;
          if (status == 1) {
            that.setData({
              info: res.data.data.info,
              comment_list: res.data.data.comment_list
            })
          } else {
            that.setData({
              allList: false,
              comment_list: false
            })
            tips.alert(res.data.msg);
            setTimeout(function(){
              wx.switchTab({
                url: '../square/square',
              })
            },2000)
            
          }
          wx.hideLoading()
        }
      })

    })
  },
  writeTap(){
    wx.navigateTo({
      url: '../comment/comment?pw_id=' + this.data.pw_id + '&type=' + this.data.type+'&name='+this.data.name
    })
  },
  // 预览图片
  prewimg: function (e) { //图片预览
    let url = e.currentTarget.dataset.url;
    //console.log(url);
    wx.previewImage({
      current: url, // 当前显示图片的http链接
      urls: [url] // 需要预览的图片http链接列表
    })
  },
  // 制作照片
  production(e){
      let that = this;
      let type = e.currentTarget.dataset.type;
      if (type=='h5'){
        wx.switchTab({
          url: '../templatePhoto/templatePhoto',
        })
      } else{
        wx.switchTab({
          url: '../templatePhoto/templatePhoto',
        })
      }
  },
  seeH5(e){
    //console.log(e);
    let that = this;
    wx.navigateTo({
      url: '../seephoto/seephoto?pw_id=' + that.data.pw_id + '&temp_id=' + that.data.temp_id,
    })
  },
  // 点赞照片墙
  zanTap(e) {
    let that = this;
    let info = that.data.info;
    wx.request({
      url: app.data.apiurl2 + "photo/thumb?sign=" + wx.getStorageSync('sign') + '&operator_id=' + app.data.kid,
      data: {
        type: e.currentTarget.dataset.type,
        object_id: e.currentTarget.dataset.object_id
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        console.log("点赞result:", res);
        var status = res.data.status;
        if (status == 1) {
          if (res.data.data.flag == true) {
            let thumb_count = parseInt(info.thumb_count);
            //console.log(typeof (thumb_count));
            info.thumb_count = thumb_count + 1
            tips.success('点赞成功！')
          } else {
            tips.alert('点过赞了哦！')
          }
          that.setData({
            info
          })
        } else {
          tips.alert(res.data.msg);
        }

      }
    })
  },
  // 评论点赞
  zanTap1(e){
    console.log(11111)
    let that = this;
    let comment_list = that.data.comment_list;
    let zanIndex = e.currentTarget.dataset.index;
    wx.request({
      url: app.data.apiurl2 + "photo/thumb?sign=" + wx.getStorageSync('sign') + '&operator_id=' + app.data.kid,
      data: {
        type: e.currentTarget.dataset.type,
        object_id: e.currentTarget.dataset.object_id
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        console.log("评论点赞result:", res);
        var status = res.data.status;
        if (status == 1) {
          for (let i = 0; i < comment_list.length; i++) {
            if (i == zanIndex) {
              let thumb_count = parseInt(comment_list[zanIndex].thumb_count);
              console.log(thumb_count,i);
              comment_list[zanIndex].thumb_count = thumb_count + 1
            }
          }
          that.setData({
            comment_list
          })
          tips.success('点赞成功！')
        } else {
          tips.alert(res.data.msg);
        }

      }
    })
  }

})