// pages/login/index.js
var app = getApp()
var utilMd5 = require('../../utils/md5.js');
var timestamp = new Date().getTime();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    VerifyCode: "获取验证码",
    asd: false
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
  //获取手机号码
  phone: function (e){
    console.log(e.detail.value)
    var phonenum = e.detail.value;
    this.setData({
      phonenum: phonenum
    })
  },
  //获取验证码
  blurTel: function (e) {
    console.log(e.detail.value)
    var linkTel = e.detail.value;
    this.setData({
      linkTel: linkTel
    })
  },
  //获取验证码事件
  setVerify: function(){
    var linkTel = this.data.linkTel;
    var phonenum = this.data.phonenum;
    
    console.log(phonenum);
    console.log(timestamp)
    console.log(utilMd5.hexMD5("user_id=" + 0 + "|timestamp=" + timestamp + "|token=8ef548cc6db933283d0c55aa5f47c5f1|owner_id=1008"))
    var total_micro_second = 60 * 1000;
    //验证码倒计时
    count_down(this, total_micro_second);
    this.setData({
      asd: true
    })
    // wx.showModal({
    //   title: '提示',
    //   content: '发送验证码成功！',
    //   showCancel: false
    // })
    wx.request({
      
      url: 'https://qiyingli.cn/share/api_and/sendsms',
      method: 'POST',
      data: {
        'uuid': '1283728273828',
        'phone': phonenum
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        userid: "0",
        ownerid: "1008",
        timestamp: timestamp,
        sign: utilMd5.hexMD5("user_id=" + 0 + "|timestamp=" + timestamp + "|token=8ef548cc6db933283d0c55aa5f47c5f1|owner_id=1008")
      },
      
      success: function (res) {
        console.log(res)
      // console.log(res.data.status)
      // console.log(timestamp)
        console.log(res.data.data.order_id)
        app.globalData.orderId = res.data.data.order_id;
        if (res.data.status == "1") {
          wx.showModal({
            title: '提示',
            content: '发送验证码成功！',
            showCancel: false
          })
        }
      },
      fail: function (res) {
        console.log("error res=")
        console.log(res.data)
      }
    });
  },
  //登录按钮事件
  listenerLogin: function(){
    var linkTel = this.data.linkTel;
    var phonenum = this.data.phonenum;
    console.log(linkTel)
    console.log(app.globalData.orderId)
    wx.request({
      url: 'https://qiyingli.cn/share/api_and/login',
      method: 'POST',
      data: {
        'phone': phonenum,
        'order_id': app.globalData.orderId,
        'code': linkTel,
        'from_uid': '100293',
        'uuid': '1283728273828',
        'channel': 'wandoujia',
        'device_type': 'HTC-G7',
        'os_version': '4.0.3',
        'version': '10000'
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        userid: "0",
        ownerid: "1008",
        timestamp: timestamp,
        sign: utilMd5.hexMD5("user_id=" + 0 + "|timestamp=" + timestamp + "|token=8ef548cc6db933283d0c55aa5f47c5f1|owner_id=1008")
      },
      success: function (res) {
        console.log(res)
        if (res.data.status == "1"){
          wx.setStorage({
            key: 'userInfo',
            data: {
              userInfo: {
                avatarUrl: res.data.data.userico,
                nickName: res.data.data.nickname,
                user_id: res.data.data.user_id,
                user_phone: res.data.data.user_phone,
                check_idcard: res.data.data.check_idcard,
                check_admin: res.data.data.check_admin,
                state: res.data.data.state,
                token: res.data.data.token,
                sex: res.data.data.sex,
                birthday: res.data.data.birthday,
                playtimes: res.data.data.playtimes,
                money: res.data.data.money,
                givemoney: res.data.data.givemoney,
                deposit: res.data.data.deposit,
                deposit_state: res.data.data.deposit_state,
                card_count: res.data.data.card_count,
                credit: res.data.data.credit,
                customer_id: res.data.data.customer_id,
                invite_code: res.data.data.invite_code
              },
              bType: "warn",
              actionText: "退出登录"
            },
            success: function(res){
              console.log("存储成功")
              wx.redirectTo({
                url: '../my/index',
              })
            }
          })
        }
      },
      fail: function (res) {
        console.log("error res=")
        console.log(res.data)
      }
    })
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
/* 毫秒级倒计时 */
function count_down(that, total_micro_second) {
  if (total_micro_second <= 0) {
    that.setData({
      VerifyCode: "重新发送",
      asd: false
    });
    // timeout则跳出递归
    return;
  }
  // 渲染倒计时时钟
  that.setData({
    VerifyCode: date_format(total_micro_second) + " 秒"
  });
  setTimeout(function () {
    // 放在最后--
    total_micro_second -= 10;
    count_down(that, total_micro_second);
  }, 10)
}
// 时间格式化输出，如03:25:19 86。每10ms都会调用一次
function date_format(micro_second) {
  // 秒数
  var second = Math.floor(micro_second / 1000);
  // 小时位
  var hr = Math.floor(second / 3600);
  // 分钟位
  var min = fill_zero_prefix(Math.floor((second - hr * 3600) / 60));
  // 秒位
  var sec = fill_zero_prefix((second - hr * 3600 - min * 60));// equal to => var sec = second % 60;
  // 毫秒位，保留2位
  var micro_sec = fill_zero_prefix(Math.floor((micro_second % 1000) / 10));
  return sec;
}
// 位数不足补零
function fill_zero_prefix(num) {
  return num < 10 ? "0" + num : num
}