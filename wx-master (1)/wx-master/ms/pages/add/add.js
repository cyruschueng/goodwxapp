// ======选择信用卡====pages/add/add.js

const date = new Date()
const days = []

for (let i = 1; i <= 30; i++) {
  days.push(i)
}

var app = getApp();
var urlData = require('../../utils/util.js');
var util = require('../../utils/animation.js');

//10045扣款短信
var debit_msg = function (that) {
  var str = {
    "OperationType": "10045",
    "order_id": that.data.addCardMsg.orderID,
    "ISRepeat": true
  }
  wx.request({
    url: app.globalData.url,
    data: str,
    method: 'POST',
    header: { "content-type": "application/json" },
    success: function (res) {
      console.log(10002)
      console.log(res)
      if (res.data.CODE == "00") {
        wx.showToast({
          title: res.data.MESSAGE,
          image: "../../images/icon/s.png",
          duration: 1000,
          mask: true,
        })
      } else {
        wx.showToast({
          title: res.data.MESSAGE,
          image: "../../images/icon/f.png",
          duration: 1000,
          mask: true,
        })
      }
    }
  })
}

Page({
  /**
   * 页面的初始数据
   */
  data: {
    card: '',  //银行卡号
    valueBankName: '',  //开户银行
    arr: [],    //账单日
    arr1: [],    //还款日
    tele: "",
    cvn: '',
    index: 0,
    index1: 0,
    date: "",
    // addCardMsg:"",
    getBtnText: "发送验证码",
    //弹窗参数
    cvn: '',
    date: "",
    disa: false,
    dis: true,
    next_disa: false,   //next状态
    code: '',
    acctType: "01",
    showModalStatus: false,
    addCardMsg: "",  //添加信用卡返回的信息
    wallets_password_flag: false,

    popup_state: false,  //请求后状态的返回弹窗

    tips_content: "",//请求后返回的提示语

    choose: "", //选择付款方式

    show: false, //判断是否银行返送扣款验证码。

    show1: true,  //默认先显示选择支付方式

    Code: "",   //银行扣款验证码

    msg_disable: true   //判断是否输入扣款验证码

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.fetchData();
  },
  //还款日和账单日选择
  fetchData: function () {
    this.setData({
      arr: days,
      arr1: days
    })
  },

  tele: function (e) {
    this.setData({
      tele: e.detail.value
    })
  },

  cvn: function (e) {
    this.setData({
      cvn: e.detail.value
    })
  },

  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },

  bindPickerChange1: function (e) {
    this.setData({
      index1: e.detail.value
    })
  },

  date: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  /*获取信用卡号*/
  getCard: function (e) {
    this.setData({
      card: e.detail.value
    })
    //查询开户银行
    if (this.data.card.length >= 16 && this.data.card.length <= 19) {
      var that = this;
      //查询开户银行
      urlData.queryBank(that, that.data.card, that.data.valueBankName, that.data.acctType)
      console.log(that.data.acctType)
      if (that.data.valueBankName == "农业银行" || that.data.valueBankName == "招商银行" || that.data.valueBankName == "交通银行" || that.data.valueBankName == "中信银行" || that.data.valueBankName == "华夏银行") {
        wx.showModal({
          title: '提示',
          content: '暂不支持此信用卡，请选择除农业银行，招商银行，交通银行，中信银行，华夏银行之外的其他银行信用卡。',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
              that.setData({
                card: "",
                valueBankName: ""
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
              that.setData({
                card: "",
                valueBankName: ""
              })
            }
          }
        })
      }
    }
  },

  //下一步
  next: function (e) {
    var that = this;
    if (wx.getStorageSync("depositBank") == "贷记卡") {
      wx.showModal({
        title: '',
        content: '添加信用卡会扣款10元，其中2元用于信用卡鉴权，剩余8元会返回到钱包！！！',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            if (that.data.card && that.data.tele && that.data.arr[that.data.index] && that.data.arr1[that.data.index1] && that.data.valueBankName) {
              that.setData({
                showModalStatus: true,
                wallets_password_flag: true,
                next_disa: true
              })
              var currentStatu = e.currentTarget.dataset.statu;
              util.util(that, currentStatu)
              console.log(currentStatu)

            } else {
              wx.showToast({
                title: '请输入完整信息',
                image: '../../images/icon/f.png',
                duration: 500
              })
            }
          } else if (res.cancel) {
            console.log('用户点击取消')
            wx.switchTab({
              url: '../index/index',
            })
          }
        }
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '必须是信用卡',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }

  },


  //发送验证码：
  sendCode: function () {
    var that = this;
    //发送验证码
    urlData.sendCode(that, that.data.tele, that.data.disa, that.data.getBtnText)
  },
  //点击确认
  sure: function (e) {
    console.log("点击确认")
    var that = this;
    that.setData({
      dis: true
    })
    if (that.data.cvn && that.data.date && that.data.code) {
      console.log(10002)
      //验证验证码
      var str = {
        "OperationType": "10002",
        "mobile": that.data.tele,
        "code": that.data.code,
      }

      wx.request({
        url: app.globalData.url,
        data: str,
        method: 'POST',
        header: { "content-type": "application/json" },
        success: function (res) {
          console.log(10002)
          console.log(res)
          if (res.data.CODE == '00') {
            //动画关闭
            var currentStatu = e.currentTarget.dataset.statu;
            util.util(that, currentStatu)
            //添加信用卡
            var str = {
              "OperationType": "10021",
              "uid": wx.getStorageSync("uid"),
              "acctNo": that.data.card,
              "acctType": that.data.acctType,
              "phoneNo": that.data.tele,
              "cvn2": that.data.cvn,
              "expDate": that.data.date,
              "zd_date": that.data.arr[that.data.index],
              "hk_date": that.data.arr1[that.data.index1],
              "bankName": that.data.valueBankName
            };
            console.log(that.data.card);
            console.log(that.data.acctType);
            console.log(that.data.tele);
            console.log(that.data.cvn);
            console.log(that.data.date);
            console.log(that.data.arr[that.data.index]);
            console.log(that.data.arr1[that.data.index1]);
            console.log(that.data.valueBankName);
            var reg = /^(\d{16}|\d{19})$/;
            var bool = (reg.test(that.data.card));
            if (bool) {
              //发起请求*
              wx.request({
                url: app.globalData.url,
                data: str,
                method: 'POST',
                header: { "content-type": "application/json" },
                success: function (res) {

                  console.log(10021)
                  console.log(res)
                  if (res.data.CODE == '00') {
                    that.setData({
                      showModalStatus: false,
                      wallets_password_flag: false,
                      // show: true,
                      addCardMsg: res.data
                    })
                    if (res.data.IsSms == true) {
                      //发送扣款验证码
                      debit_msg(that);
                      that.setData({
                        show: true
                      })

                    } else {
                      //
                      wx.showToast({
                        title: '扣款成功',
                        image: "../../images/icon/s.png",
                        mask: true,
                        duration: 1000
                      })
                      setTimeout(function () {
                        wx.redirectTo({
                          url: '../card/card',
                        })
                      }, 1000)

                      wx.setStorageSync("addCardMsg", res.data);  //缓存新添加信用卡的信息
                    }

                  } else {
                    wx.showModal({
                      title: "提示",
                      content: res.data.MESSAGE,
                      success: function (res) {
                        if (res.confirm) {
                          console.log('用户点击确定')
                        } else if (res.cancel) {
                          console.log('用户点击取消')
                        }
                      }
                    })
                  }
                }
              })
            } else {
              wx.showToast({
                title: '请输入正确卡号',
                image: "../../images/icon/f.png",
                duration: 1500,
                mask: true,
              })
            }

          } else {
            wx.showModal({
              title: '提示',
              content: res.data.MESSAGE,
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                  that.setData({
                    code: "",
                    dis: true
                  })
                } else if (res.cancel) {
                  console.log('用户点击取消')
                  that.setData({
                    code: "",
                    dis: true
                  })
                }
              }
            })
          }
        }
      })
    }
  },

  //获取验证码的值
  getCode: function (e) {
    this.setData({
      code: e.detail.value
    })
    if (this.data.code.length == 6) {
      if (this.data.cvn && this.data.date) {
        this.setData({
          dis: false
        })
      }
    }

  },


  //扣款获取验证码的值
  CODE: function (e) {

    this.setData({
      Code: e.detail.value
    })

    if (this.data.Code.length == 6) {
      this.setData({
        msg_disable: false
      })
    }
  },

  //确认添加扣款：
  msg_sure: function () {

    var that = this;
    that.setData({
      show: false
    })

    //10044 扣款手续费
    var str = {
      "OperationType": "10044",
      "uid": wx.getStorageSync("uid"),
      "orderNo": that.data.addCardMsg.orderID,
      "smsCode": that.data.Code,
      "cardID": that.data.card,
      // "BO_ID": "",//借款订单号
      "PayType": 0
    }

    wx.request({
      url: app.globalData.url,
      data: str,
      method: 'POST',
      header: { "content-type": "application/json" },
      success: function (res) {
        console.log(10044)
        console.log(res)
        if (res.data.CODE == "00") {

          //显示成功后的信息
          wx.showModal({
            // title: res.data.MESSAGE,
            content: res.data.MESSAGE,
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
                wx.redirectTo({
                  url: '../card/card'
                })
                wx.setStorageSync("addBackCard", "addBackCard")

              } else if (res.cancel) {
                console.log('用户点击取消')
                wx.redirectTo({
                  url: '../card/card'
                })
                wx.setStorageSync("addBackCard", "addBackCard")
              }
            }
          })
        } else {
          wx.showModal({
            title: res.data.MESSAGE,
            content: "点击确定重新发送",
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
                //从新发送扣款短信
                debit_msg(that)
                that.setData({
                  show: true,
                  Code: "",
                  msg_disable: true
                })

              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
      }
    })
    // }
  },

  //取消扣款：
  msg_cancel: function () {
    this.setData({
      show: false,
      code: ""
    })
  },



  //点击取消信用卡
  cancel: function () {
    this.setData({
      showModalStatus: false,
      code: "",
      dis: true
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})