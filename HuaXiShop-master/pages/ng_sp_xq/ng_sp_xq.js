// pages/ng_sp_xq/ng_sp_xq.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dl_AccountData: {},//群主信息
    dl_pic: "",//分享人头像
    dl_name: "",//分享人昵称
    dailiInfo: "",
    GuestUserData: {},
    GuestOpenId: "",//openId
    openGId: "",//群id
    shareTickets: "",
    sp_xq: {},//商品详情
    productId: "",//商品的ID
    dl_AccountId: 0,//分享人AccountId
    shareAccountId: 0,
    imgageDomainUrl: "",
    bannerImg: '',//轮播图
    Name: '',//收货人姓名
    Province: '',//省
    City: '',//市
    Area: '',//区
    Address: '',//详细地址
    Phone: '',//收货人手机号


  },
  /**
     * 生命周期函数--监听页面显示
     */
  onShow: function () {
    var that = this
    wx.showShareMenu({
      withShareTicket: true,
      success: function (res) {
      }
    })
    app.getUserInfo();
    if (app.globalData.GuestUserData) {
      console.log("AAAAA:")
      console.log(app.globalData.GuestUserData)
      that.setData({
        GuestUserData: app.globalData.GuestUserData,
        productId: app.globalData.productId,
        dl_pic: app.globalData.dl_pic,
        dl_name: app.globalData.dl_name,
        dl_AccountId: app.globalData.dl_AccountId,
        userInfo: app.globalData.userInfo,
        dl_AccountData: app.globalData.dl_AccountData,
        imgageDomainUrl: app.globalData.ImgageDomainUrl,
        GuestOpenId: app.globalData.openId,
      })
      that.getGuest_AccountData();
      that.getNeiGouProductInfo()
      if (app.globalData.scene == 1044) {
        that.getOpenGid();
      }
    } else {
      app.appCallback = res => {//用户信息返回后调用
        console.log("B:" + res.data.ds[0])
        console.log(app.globalData.GuestUserData)
        that.setData({
          GuestUserData: app.globalData.GuestUserData,
          userInfo: app.globalData.userInfo,
          productId: app.globalData.productId,
          dl_pic: app.globalData.dl_pic,
          dl_name: app.globalData.dl_name,
          dl_AccountId: app.globalData.dl_AccountId,
          dl_AccountData: app.globalData.dl_AccountData,
          ImgageDomainUrl: app.globalData.ImgageDomainUrl,
          GuestOpenId: app.globalData.openId,
        });
        that.getGuest_AccountData();
        that.getNeiGouProductInfo()
        if (app.globalData.scene == 1044) {
          that.getOpenGid();
        }

      }
    }


  },
  /**获取用户信息*/
  getGuest_AccountData() {
    var that = this;
    console.log("aaaaaaaaaa")
    console.log(that.data.GuestUserData.ds[0].UserId)
    wx.request({
      url: 'https://df2018.reane.cn/scweb/server/lingshou.ashx?',
      method: "GET",
      data: {
        Command: "getGuest_AccountData",
        UserId: that.data.GuestUserData.ds[0].UserId,
      },
      success: function (res) {
        console.log("打开用户信息")
        console.log(res)
        if (res.data.ds) {
          console.log("他现在有shareAccountId")
          that.setData({
            shareAccountId: res.data.ds[0].AccountId
          })

        } else {
          console.log("他的shareAccountId是0")
          that.setData({
            shareAccountId: 0
          })
        }
      }
    })
  },
  /**获取代理信息*/
  /**获取商品详情 */
  getNeiGouProductInfo() {
    var that = this;
    console.log("ProductId:" + that.data.productId)
    wx.request({
      url: 'https://df2018.reane.cn/scweb/server/neigou.ashx?',
      method: "GET",
      data: {
        Command: "getNeiGouProductInfo",
        AccountId: that.data.dl_AccountId,
        ProductId: that.data.productId,
      },
      success: function (res) {
        console.log("内购商品详情:")
        console.log(res)
        if (res.data.ds != undefined) {
          that.setData({
            sp_xq: res.data.ds[0],
            bannerImg: res.data.ds[0].ProductPhotoPic
          })
          console.log(that.data.bannerImg)
        }
        that.getUserLatestOrderAddress();
      }
    })
  },
  /**获取商品详情 */
  //获取群id
  getOpenGid() {
    var that = this
    console.log("hahahahahahahahahah" + app.globalData.appshareTicket)
    // clearInterval(app_show); 
    // console.log("++++++++++++" + shareTickets)
    wx.getShareInfo({
      shareTicket: app.globalData.appshareTicket,
      success: function (res) {
        console.log("hahahahahahahahahah")
        console.log(res)
        wx.request({
          url: "https://df2018.reane.cn/common/user.ashx?",
          method: "GET",
          data: {
            Command: "getShareInfo_encryptedData",
            jscode: app.globalData.code,
            encryptedData: res.encryptedData,
            iv: res.iv,
            session_key: app.globalData.session_key,
            tag: "sc"
          },
          header: {
            "content-type": "application/json"
          },
          success: function (res) {
            console.log("群ID：")
            console.log(res.data)
            that.setData({
              openGId: res.data.openGId
            })
            that.postAddQunShareRecord()
          }
        })
      }
    })

  },
  //获取群id

  /*  添加群分享浏览记录*/
  postAddQunShareRecord() {
    var that = this;
    console.log(that.data.dl_AccountId + '---' + that.data.productId + '---' + that.data.shareAccountId + '---' + that.data.openGId + '---' + that.data.GuestUserData.ds[0].UserId)
    wx.request({
      url: 'https://df2018.reane.cn/scweb/server/neigou.ashx?',
      data: {
        Command: "postAddQunShareRecord",
        AccountId: that.data.dl_AccountId,
        ProductId: that.data.productId,
        ShareAccountId: that.data.shareAccountId,
        QunId: that.data.openGId,
        UserId: that.data.GuestUserData.ds[0].UserId,
      },
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.log("添加成功！！！")
        console.log(res)
      },
      complete: function (res) {
        console.log(res)
      }
    })
  },
  /*  添加群分享浏览记录*/
  //立即购买
  buy_shop() {
    this.setData({
      payShop: true
    });
  },
  //立即支付
  //关闭购买
  payClose: function () {
    this.setData({
      payShop: false
    });
  },
  //立即支付
  lj_pay() {
    var that = this
    if (that.data.Address == '') {
      wx.showToast({
        icon: "none",
        title: '请选择收货地址',
      });
      return false;
    } else {
      that.postAddLingShouOrder_NeiGou();
    }

  },
  /**内购商品下单 */
  postAddLingShouOrder_NeiGou() {
    var that = this;
    wx.request({
      url: 'https://df2018.reane.cn/scweb/server/wxpay.ashx?',
      data: {
        Command: "postAddLingShouOrder_NeiGou",
        AccountId: that.data.dl_AccountId,
        ProductId: that.data.productId,
        ShareAccountId: that.data.shareAccountId,
        QunId: that.data.openGId,
        GuestOpenId: that.data.GuestOpenId,
        UserId: that.data.GuestUserData.ds[0].UserId,
        UserName: that.data.Name,
        UserPhone: that.data.Phone,
        Province: that.data.Province,
        City: that.data.City,
        Area: that.data.Area,
        Address: that.data.Address,
        BuyCount: 1,
      },
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.log("")
        console.log(res)
        wx.requestPayment({
          timeStamp: res.data.timeStamp,
          nonceStr: res.data.nonceStr,
          package: res.data.package,
          signType: res.data.signType,
          paySign: res.data.paySign,
          success: function (res) {
            console.log("支付成功!!!!")
            console.log(res)
          }, fail: function (res) {
            console.log("支付失败!!!!")
            console.log(res)
          }
        })
      }
    })
  },
  /**内购商品下单 */

  //收货地址
  pay_Address: function () {
    var that = this
    if (wx.chooseAddress) {
      wx.chooseAddress({
        success: function (res) {
          console.log("收货地址")
          console.log(res)
          that.setData({
            Name: res.userName,
            Province: res.provinceName,
            City: res.cityName,
            Area: res.countyName,
            Address: res.detailInfo,
            Phone: res.telNumber,
          });
        },
        fail: function (err) {
          console.log(JSON.stringify(err))
        }
      })
    } else {
      console.log('当前微信版本不支持chooseAddress');
    }
  },

  //获取最近一次收货地址
  getUserLatestOrderAddress: function () {
    var that = this;
    wx.request({
      url: 'https://df2018.reane.cn/scweb/server/lingshou.ashx',
      method: "GET",
      data: {
        Command: "getUserLatestOrderAddress",
        UserId: that.data.GuestUserData.ds[0].UserId,
      },
      header: {
        "content-type": "application/json"
      },
      success: function (res) {
        console.log("最近一次收货地址:")
        console.log(res)
        if (res.data.ds != undefined) {
          that.setData({
            Name: res.data.ds[0].UserName,
            Province: res.data.ds[0].Province,
            City: res.data.ds[0].City,
            Area: res.data.ds[0].Area,
            Address: res.data.ds[0].Address,
            Phone: res.data.ds[0].UserPhone,
          })
        }
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
    dl_AccountData

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    var that = this
    return {
      title: "快来看看啊",
      desc: '最具人气的小程序开发联盟!',
      path: '/pages/ng_sp_xq/ng_sp_xq?productId=' + that.data.productId + '&dl_pic=' + that.data.dl_pic + '&dl_name=' + that.data.dl_name + '&dl_AccountId=' + that.data.dl_AccountId + '&shareAccountId' + that.data.shareAccountId,
      success: function (res) {

      }
    }
  },
})