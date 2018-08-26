// pages/gwc/gwc.js
var app = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gwcData: [],
    count: 0,
    pay: [],
    arr: [],
    token: "",
    offon: true,
    payData: [],
    addressInfo: {},
    path: "",
    hiddenLoading: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCode()
    var that = this
    setTimeout(function () {
      that.setData({
        hiddenLoading: true,
      })
    }, 5000)

  },

  // 增加
  addNum: function (e) {
    this.data.count = 0
    var that = this
    for (var i = 0; i < this.data.gwcData.length; i++) {
      console.log(e.currentTarget.dataset.id + '----' + this.data.gwcData[i].goods_spu_id)
      if (e.currentTarget.dataset.id == this.data.gwcData[i].goods_spu_id) {
        this.data.gwcData[i].number++
        if (this.data.gwcData[i].number > e.currentTarget.dataset.stock) {
          this.data.gwcData[i].number = e.currentTarget.dataset.stock
          wx.showModal({
            title: '提示',
            content: '商品太热门，商家已经没有那么多啦！',
          })
        }
        this.addRem(e.currentTarget.dataset.id, this.data.gwcData[i].number)
      }
    }
    for (var i = 0; i < this.data.arr.length; i++) {
      for (var j = 0; j < this.data.gwcData.length; j++) {
        if (Number(this.data.arr[i]) == this.data.gwcData[j].goods_spu_id) {
          this.data.gwcData[j].type = "success"
          this.data.count += this.data.gwcData[j].number * Number(this.data.gwcData[j].price)
        }
      }
    }
    var data = []
    for (var i = 0; i < this.data.arr.length; i++) {
      for (var j = 0; j < this.data.gwcData.length; j++) {
        if (Number(this.data.arr[i]) == this.data.gwcData[j].goods_spu_id) {
          data.push(this.data.gwcData[j])
        }
      }
    }
    this.setData({
      gwcData: this.data.gwcData,
      count: (this.data.count).toFixed(2),
      payData: data
    })
  },
  // 增加减少
  addRem: function (id, num) {
    var that = this
    var count = 0
    var arr = []
    wx.request({
      url: app.url + 'mcart', //仅为示例，并非真实的接口地址
      data: { applet_id: app.v, "number": num, goods_spu_id: id },
      header: {
        'content-type': 'application/json',
        "token": this.data.token
        // 默认值
      },
      method: "post",
      success: function (res) {
        if (res.data == "success") {
        }
      }
    })
  },
  // 删除数组
  rmoveArr: function () {
    Array.prototype.remove = function (obj) {
      for (var i = 0; i < this.length; i++) {
        var temp = this[i];
        if (!isNaN(obj)) {
          temp = i;
        }
        if (temp == obj) {
          for (var j = i; j < this.length; j++) {
            this[j] = this[j + 1];
          }
          this.length = this.length - 1;
        }
      }
    }
  },
  goPay: function () {
    wx.navigateTo({
      url: '/pages/myCenter/pay/pay',
    })
    // var that = this
    // console.log(that.data.payData)
    // if (that.data.payData.length > 0) {
    //   wx.setStorage({
    //     key: 'order_list',
    //     data: that.data.payData,
    //   })
    //   wx.navigateTo({
    //     url: '/pages/myCentter/pay/pay',
    //   })
    // } else {
    //   wx.showModal({
    //     title: '提示',
    //     content: '请您选择需要结算的商品',
    //   })
    // }
    // wx.getStorage({
    //   key: 'editAddress',
    //   success: function (res) {
    //     that.setData({
    //       addressInfo: res.data,
    //       path: res.data.provinceName + res.data.cityName + res.data.countyName + res.data.detailInfo + res.data.postalCode + res.data.userName+ res.data.telNumber
    //     })
    //     console.log(that.data.addressInfo)
    //     console.log(that.data.path)
    //     if (that.data.addressInfo){
    //       wx.request({
    //         url: app.url + 'order',
    //         method: 'post',
    //         header: { 'content-type': 'application/json', "token": that.data.token },
    //         data: { products: that.data.payData, address: that.data.addressInfo, path: that.data.path},
    //         success: function (res) {
    //           if (res.statusCode == 200) {
    //             console.log(res.data.order_id)
    //             wx.setStorage({
    //               key: 'odd',
    //               data: res.data,
    //             })
    //             wx.navigateTo({
    //               url: '/pages/pay/pay',
    //             })
    //           }
    //         }
    //       })
    //     }else{
    //         wx.navigateTo({
    //           url: '/pages/add/add',
    //         })
    //     }
    //   },
    //   fail:function(){
    //     wx.showModal({
    //       title: '提示',
    //       content: '您还没有填写收货地址',
    //       success: function (res) {
    //         if (res.confirm) {
    //           wx.navigateTo({
    //             url: '/pages/add/add',
    //           })
    //         }
    //       }
    //     })
    //   }
    // })


    // wx.showModal({
    //   title: '提示',
    //   content: '系统维护中...',
    // })
  },
  delNum: function (e) {
    this.data.count = 0
    for (var i = 0; i < this.data.gwcData.length; i++) {

      if (e.currentTarget.dataset.id == this.data.gwcData[i].goods_spu_id) {
        if (this.data.gwcData[i].number < 2) {
          this.data.gwcData[i].number = 1
          break
        }
        this.data.gwcData[i].number--
        this.addRem(e.currentTarget.dataset.id, this.data.gwcData[i].number)
      }

    }
    for (var i = 0; i < this.data.arr.length; i++) {

      for (var j = 0; j < this.data.gwcData.length; j++) {

        if (Number(this.data.arr[i]) == this.data.gwcData[j].goods_spu_id) {
          this.data.gwcData[j].type = "success"
          this.data.count += this.data.gwcData[j].number * Number(this.data.gwcData[j].price)
        }
      }
    }
    var data = []
    for (var i = 0; i < this.data.arr.length; i++) {
      for (var j = 0; j < this.data.gwcData.length; j++) {
        if (Number(this.data.arr[i]) == this.data.gwcData[j].goods_spu_id) {
          data.push(this.data.gwcData[j])

        }
      }
    }
    this.setData({
      gwcData: this.data.gwcData,
      count: (this.data.count).toFixed(2),
      payData: data
    })
  },
  checkboxChange: function (e) {
    console.log(e.detail.value)
    var arr = e.detail.value
    for (var i = 0; i < this.data.gwcData.length; i++) {
      this.data.gwcData[i].type = ""
      this.data.count = 0
    }
    for (var i = 0; i < arr.length; i++) {
      for (var j = 0; j < this.data.gwcData.length; j++) {
        if (Number(arr[i]) == this.data.gwcData[j].goods_spu_id) {
          this.data.gwcData[j].type = "success"
          this.data.count += this.data.gwcData[j].number * Number(this.data.gwcData[j].price)
        }
      }
    }
    var data = []
    for (var i = 0; i < arr.length; i++) {
      for (var j = 0; j < this.data.gwcData.length; j++) {
        if (Number(arr[i]) == this.data.gwcData[j].goods_spu_id) {
          data.push(this.data.gwcData[j])
        }
      }
    }
    this.setData({
      gwcData: this.data.gwcData,
      pay: e.detail.value,
      count: (this.data.count).toFixed(2),
      arr: arr,
      payData: data
    })

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  getCode: function () {
    var that = this
    wx.getUserInfo({
      lang: 'zh_CN',
      success: function (res) {
        var userInfo = res.userInfo
        var nickName = userInfo.nickName
        var avatarUrl = userInfo.avatarUrl
        var gender = userInfo.gender //性别 0：未知、1：男、2：女
        var province = userInfo.province
        var city = userInfo.city
        var country = userInfo.country
        that.setData({
          userData: res.userInfo
        })
        // 判断是否授权
        wx.login({
          success: function (res) {
            that.setData({
              code: res.code
            })
            console.log("code:" + res.code)
            if (res.code) {
              // 获取openId
              wx.request({
                url: app.url + 'token/user',
                data: {
                  code: res.code,
                  applet_id: app.v,
                  avatarUrl: that.data.userData.avatarUrl,
                  nickname: that.data.userData.nickName,
                  city: that.data.userData.city,
                  gender: that.data.userData.gender,
                  country: that.data.userData.country,
                  province: that.data.userData.province
                },
                method: 'POST',
                header: { 'content-type': 'application/json' },
                success: function (openIdRes) {
                  that.setData({
                    token: openIdRes.data.token
                  })
                  that.getData(openIdRes.data.token)

                },
                fail: function (error) {
                  console.info("获取用户openId失败");
                }
              })
            }

          }
        });
      },
      // fail: function (error) {
      //   console.log("失败")

      // }
    })
  },

  removee: function (e) {
    var that = this
    wx.showModal({
      title: '提示',
      content: '您确定要删除吗？',
      success: function (res) {
        var count = 0
        if (res.confirm) {
          that.addRem(e.currentTarget.dataset.id, 0)

          that.rmoveArr()
          that.data.gwcData.remove(e.currentTarget.dataset.idnex)
          that.data.arr.remove(e.currentTarget.dataset.idnex)
          console.log(that.data.gwcData)
          for (var i = 0; i < that.data.arr.length; i++) {
            for (var j = 0; j < that.data.gwcData.length; j++) {
              if (Number(that.data.arr[i]) == that.data.gwcData[j].goods_spu_id) {
                count += that.data.gwcData[j].number * that.data.gwcData[j].price
              }
            }
          }
          var data = []
          var list = []
          for (var i = 0; i < that.data.arr.length; i++) {
            for (var j = 0; j < that.data.gwcData.length; j++) {
              if (Number(that.data.arr[i]) == that.data.gwcData[j].goods_spu_id) {
                data.push(that.data.gwcData[j])
                list.push(that.data.gwcData[j])
              }
            }
          }
          that.setData({
            gwcData: that.data.gwcData,
            count: count.toFixed(2),
            payData: data
          })
        }

      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  getData: function (token) {

    var that = this
    that.rmoveArr()
    var count = 0
    var arr = []
    wx.request({
      url: app.url + 'mcart/list', //仅为示例，并非真实的接口地址
      data: { applet_id: app.v },
      header: {
        'content-type': 'application/json',
        "token": token
        // 默认值
      },
      method: "post",
      success: function (res) {
        var data = []
        var len = res.data.length
        for (var i = 0; i < len; i++) {
          if (res.data[i].stock != 0) {
            data.push(res.data[i])
          }
        }
        for (var i = 0; i < data.length; i++) {
          count += data[i].number * Number(data[i].price)
          arr.push(data[i].goods_spu_id)
          if (data[i].number > data[i].stock) {
            data[i].number = data[i].stock
          }
        }
        that.setData({
          gwcData: that.imageUrl(data),
          payData: that.imageUrl(data),
          count: count.toFixed(2),
          hiddenLoading: true,
          arr: arr
        })

      }
    })
  },
  // 加图片链接
  imageUrl: function (arr) {
    for (var i = 0; i < arr.length; i++) {
      arr[i].image = app.imgurl + arr[i].image
      console.log(app.url + arr[i].image)
      arr[i].type = "success"
    }
    return arr
  },
  shop: function () {
    wx.navigateTo({
      url: '/pages/all_Product/all_Product',
    })
  },
  msg: function (e) {
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '/pages/msg/msg?id=' + e.currentTarget.dataset.id,
    })
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
    var that = this
    wx.showNavigationBarLoading() //在标题栏中显示加载
    setTimeout(function () {
      that.onLoad()
      // 隐藏导航栏loading
      wx.hideNavigationBarLoading()
      //停止下拉刷新
      wx.stopPullDownRefresh()

    }, 1500);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})