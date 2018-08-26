// pages/zhuangfa2/zhuangfa2.js
const app = getApp();
const common = require('../../common.js');
const apiurl = 'https://friend-guess.playonwechat.com/';
let sign = wx.getStorageSync('sign');
import tips from '../../utils/tips.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  onLoad: function (options) {
    console.log("options",options);
    //let scene = decodeURIComponent(options.scene);
    if (options.scene == 1044) {
      console.log("1044")
      let shareTicket = options.shareTicket;
      this.setData({
        shareTicket: shareTicket
      })
    }else{
      console.log("缓存")
      let shareTicket = wx.getStorageSync('shareTicket');
      console.log("shareTicket:", shareTicket)
      this.setData({
        shareTicket: shareTicket
      })
    }

    if (options.share_gid){
      this.setData({
        share_gid: share_gid
      })
    }
    let userInfo = wx.getStorageSync('userInfo');
    this.setData({
      name: options.name,
      userInfo: userInfo
    })
    
    
  },

  onShow: function () {
    let that = this;
    app.getAuth(function () {
        let userInfo = wx.getStorageSync('userInfo');
        let mid = wx.getStorageSync('mid');
        let sign = wx.getStorageSync('sign');
        that.setData({
          mid: mid
        })
        // wx.showLoading({
        //   title: '加载中',
        // });
        // 获取群id
        //if (that.data.shareTicket) {
          wx.getShareInfo({
            shareTicket: wx.getStorageSync('shareTicket'),
            complete(res) {
              console.log("getShareInfo",res);
              console.log("链接", `${apiurl}birth/get-gid?sign=${sign}&operator_id=${app.data.kid}&encryptedData=${res.encryptedData} & iv=${res.iv}`)
              wx.request({
                url: apiurl + "birth/get-gid?sign=" + sign + '&operator_id=' + app.data.kid,
                data: {
                  encryptedData: res.encryptedData,
                  iv: res.iv
                },
                header: {
                  'content-type': 'application/json'
                },
                method: "GET",
                success: function (res) {
                  
                  console.log("获取群id:", res);
                  var status = res.data.status;
                  if (status == 1) {
                    tips.success("群id",res.data.data);
                    that.setData({
                      g_id: res.data.data
                    })
                    // 是否是群组会员
                    wx.request({
                      url: apiurl + "birth/is-group-member?sign=" + sign + '&operator_id=' + app.data.kid,
                      data: {
                        g_id: res.data.data,
                        mid: that.data.mid
                      },
                      header: {
                        'content-type': 'application/json'
                      },
                      method: "GET",
                      success: function (res) {
                        console.log("是否是群组会员:", res);
                        var status = res.data.status;
                        if (status == 1) {
                          that.setData({
                            group: res.data.data.flag
                          })
                          // 不是群组会员group
                          console.log('that.data.group:', that.data.group)
                          if (that.data.group == false) {
                            wx.request({
                              url: apiurl + "birth/get-edit-friend-detail?sign=" + sign + '&operator_id=' + app.data.kid,
                              data: {
                                mf_id: 0
                              },
                              header: {
                                'content-type': 'application/json'
                              },
                              method: "GET",
                              success: function (res) {
                                console.log("获取个人信息:", res);
                                var status = res.data.status;
                                if (status == 1) {
                                  that.setData({
                                    myself: res.data.data,
                                    birth_day: res.data.data.birth_day,
                                    birth_month: res.data.data.birth_month,
                                    birth_year: res.data.data.birth_year,
                                    phone: res.data.data.phone,
                                  })
                                } else {
                                  console.log(res.data.msg)
                                  tips.error(res.data.msg)
                                }
                              }
                            })
                          } else if (that.data.group == true) {
                            console.log("g_id:", that.data.g_id);
                            wx.navigateTo({
                              url: '../qunadd/qunadd?g_id=' + that.data.g_id
                            })
                          }
                        } else {
                          tips.error(res.data.msg)
                        }
                      }
                    })
                   
                  } else {
                    console.log(res.data.msg)
                    tips.error(res.data.msg)
                  }
                }
              })
            }
          })
          
       // }
        
        
    });
    wx.hideLoading()
  },
  // 手机号
  bindPhoneInput(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  // 生日
  bindDateChange: function (e) {
    console.log(e.detail.value);
    let date = e.detail.value;
    var strs = new Array(); //定义一数组 
    strs = date.split("-"); //字符分割 
    this.setData({
      birth_year: strs[0],
      birth_month: strs[1],
      birth_day: strs[2]
    })
  },
  // 确定告诉他
  sendShare() {
    let that = this;
    let sign = wx.getStorageSync('sign');
    //加入指定群
    if (that.data.share_gid){
      wx.getShareInfo({
        shareTicket: that.data.shareTicket,
        complete(res) {
          console.log(res);
          wx.request({
            url: apiurl + "birth/save-group-relation?sign=" + sign + '&operator_id=' + app.data.kid,
            data: {
              encryptedData: res.encryptedData,
              iv: res.iv,
              g_id: that.data.share_gid
            },
            header: {
              'content-type': 'application/json'
            },
            method: "GET",
            success: function (res) {
              console.log("加入群id:", res);
              var status = res.data.status;
              if (status == 1) {
                tips.success('加入群成功');
                wx.navigateTo({
                  url: '../qunadd/qunadd?g_id=' + that.data.g_id
                })
              } else {
                tips.error(res.data.msg)
              }
            }
          })
        }
      })
    }else{
        //加入当前分享群
        wx.getShareInfo({
          shareTicket: that.data.shareTicket,
          complete(res) {
            console.log(res);
            wx.request({
              url: apiurl + "birth/save-group-relation?sign=" + sign + '&operator_id=' + app.data.kid,
              data: {
                encryptedData: res.encryptedData,
                iv: res.iv
              },
              header: {
                'content-type': 'application/json'
              },
              method: "GET",
              success: function (res) {
                console.log("加入群id:", res);
                var status = res.data.status;
                if (status == 1) {
                  tips.success('加入群成功');
                  wx.navigateTo({
                    url: '../qunadd/qunadd?g_id=' + that.data.g_id
                  })
                } else {
                  tips.error(res.data.msg)
                }
              }
            })
          }
        })
    }
  
  } 

})