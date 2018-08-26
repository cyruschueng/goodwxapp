// pages/createactivity/createactivity.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // files: [],
    countries: [],
    contryinfo: [],
    countryIndex: "",
    date: "",
    time: "",
    address: "",
    isAgree: true,
    tempFilePaths: '',
    realname: "",
    activityInfo: '',
    activityID: 0,
    imgsrc: '',
    beginDay: '',
    delimg: app.globalData.imgpath + 'del.png',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    var _this=this;
    var country = Array();
    wx.request({
      url: app.globalData.url + 'apiXiaoyouList',
      data: { openid: app.globalData.openid },
      method: 'POST',
      success: function (res) {
        for (var i = 0; i < res.data.length; i++) {
          country.push(res.data[i].info[0].name);
        }
        _this.setData({
          countries: country,
          contryinfo: res.data
        })
        if (options != '') {
          _this.setData({
            activityID: options.id
          })
          var info = {
            openid: app.globalData.openid,
            id: options.id
          }
          wx.request({
            url: app.globalData.url + 'apiActivityDetail',
            data: info,
            method: 'POST',
            success: function (res2) {
              for (var i = 0; i < res.data.length; i++) {
                if (res2.data.xiaoyou_id == res.data[i].info[0].id) {
                  _this.setData({
                    countryIndex: i
                  })
                  break;
                }
              }
              _this.setData({
                activityInfo: res2.data,
                address: res2.data.address,
                date: res2.data.date,
                time: res2.data.time,
                realname: res2.data.address
              })
              var realname = res2.data.address;
              if (realname != undefined && realname != '') {
                if (realname.length > 10) {
                  realname = realname.substring(0, 10) + '...';
                }
                _this.setData({
                  address: realname
                })
              }
              // if (res2.data.imgsrc != '' && res2.data.imgsrc != null && res2.data.imgsrc != undefined){
              //   _this.setData({
              //     files: [app.globalData.acimg + res2.data.imgsrc]
              //   })
              // }
            }
          })
        }
      },
      fail: function (res) {
      }
    })
    var myDate = new Date();
    var beginDay = myDate.getFullYear() + '-' + (myDate.getMonth() + 1) + '-' + myDate.getDate();
    _this.setData({
      beginDay: beginDay
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
  // chooseImage: function (e) {
  //   var that = this;
  //   wx.chooseImage({
  //     count: 1,
  //     sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
  //     sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
  //     success: function (res) {
  //       // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
  //       that.setData({
  //         files: that.data.files.concat(res.tempFilePaths[0])
  //       });
  //       wx.uploadFile({
  //         url: app.globalData.url + 'saveImg',//仅为示例，非真实的接口地址
  //         filePath: that.data.files[0],
  //         name: 'file',
  //         success: function (res) {
  //           var data = res.data;
  //           if(data){
  //             var imgs = JSON.parse(data);
  //             that.setData({
  //               imgsrc: imgs.imgsrc,
  //             });
  //           }
  //           //do something
  //         }
  //       })
  //     }
  //   })
  // },
  // previewImage: function (e) {
  //   // wx.previewImage({
  //   //   current: e.currentTarget.id, // 当前显示图片的http链接
  //   //   urls: this.data.files // 需要预览的图片http链接列表
  //   // })
  //   //获取当前图片的下标
  //   var index = e.currentTarget.dataset.index;
  //   //所有图片
  //   var files = this.data.files;

  //   wx.previewImage({
  //     //当前显示图片
  //     current: files[index],
  //     //所有图片
  //     urls: files
  //   })
  // },
  // // 删除图片
  // deleteImg: function (e) {
  //   var files = this.data.files;
  //   var index = e.currentTarget.dataset.index;
  //   files.splice(index, 1);
  //   this.setData({
  //     files: files
  //   });
  // }, 
  bindCountryChange: function (e) {
    this.setData({
      countryIndex: e.detail.value
    })
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    this.setData({
      time: e.detail.value
    })
  },
  openMap: function () {
    var thistest = this;
    wx.getLocation({
      type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function (res) {
        // success
        // wx.openLocation({
        //   latitude: res.latitude, // 纬度，范围为-90~90，负数表示南纬
        //   longitude: res.longitude, // 经度，范围为-180~180，负数表示西经
        //   scale: 28, // 缩放比例          
        // })
        wx.chooseLocation({
          success: function (res) {
            var realname = res.name;
            thistest.setData({
              realname: realname
            })
            if (realname != undefined && realname != '') {
              if (realname.length > 10) {
                realname = res.name.substring(0, 10) + '...';
              }
              thistest.setData({
                address: realname
              })
            }
          },
        })
      }
    })
  },
  bindAgreeChange: function (e) {
    this.setData({
      isAgree: !!e.detail.value.length
    });
  },
  formSubmit: function (e) {
    if (!this.data.isAgree) {
      wx.showModal({
        title: '',
        content: '您还没有阅读并同意相关条款',
        showCancel: false,
        confirmText: '知道了'
      })
      return
    }
    var acinfo = e.detail.value;
    if (acinfo.actitle == '') {
      wx.showModal({
        title: '',
        content: '您还没有输入活动标题',
        showCancel: false,
        confirmText: '知道了'
      })
      return
    }
    if (acinfo.acinfos == '') {
      wx.showModal({
        title: '',
        content: '您还没有输入活动介绍',
        showCancel: false,
        confirmText: '知道了'
      })
      return
    }
    if (acinfo.herd == '' || acinfo.herd == null) {
      wx.showModal({
        title: '',
        content: '您还没有关联校友会',
        showCancel: false,
        confirmText: '知道了'
      })
      return
    }
    if (acinfo.date == '') {
      wx.showModal({
        title: '',
        content: '您还没有选择活动日期',
        showCancel: false,
        confirmText: '知道了'
      })
      return
    }
    if (acinfo.time == '') {
      wx.showModal({
        title: '',
        content: '您还没有选择活动时间',
        showCancel: false,
        confirmText: '知道了'
      })
      return
    }
    // if (this.data.files.length == 0) {
    //   wx.showModal({
    //     title: '',
    //     content: '您还没有添加图片',
    //     showCancel: false,
    //     confirmText: '知道了'
    //   })
    //   return
    // }
    if (this.data.address == "" || this.data.address == undefined || this.data.address == null) {
      wx.showModal({
        title: '',
        content: '您还没有选择活动地址',
        showCancel: false,
        confirmText: '知道了'
      })
      return
    }
    var requestData = {
      id: this.data.activityID,
      title: acinfo.actitle,
      content: acinfo.acinfos,
      address: this.data.realname,
      xiaoyou_id: acinfo.herd,
      date: acinfo.date,
      time: acinfo.time,
      openid: app.globalData.openid
      // imgsrc: this.data.imgsrc
    }
    wx.showLoading({
      title: '数据加载中',
      mask: true
    });
    wx.request({
      url: app.globalData.url + 'apiAddActivity',
      data: requestData,
      method: 'POST',
      success: function (res) {
        wx.hideLoading();
        wx.showToast({
          title: '保存成功',
          icon: 'success',
          duration: 2000,
          mask: true
        })
        wx.switchTab({
          url: '../activitylist/activitylist',
          success: function (res) {
          },
          fail: function (res) {
          }
        })
      },
      fail: function (res) {
        wx.hideLoading();
        wx.showToast({
          title: '保存失败',
          duration: 2000,
          mask: true
        })
      }
    })
  },
})