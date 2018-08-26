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
    show:'red',
    pay:'false',
    moneyList:[
      {
        num:'1.01',
        title:'生日快乐'
      }, {
        num: '5.20',
        title: '	我爱你'
      }, {
        num: '6.66',
        title: '万事如意'
      }, {
        num: '16.80',
        title: '一路发财'
      }, {
        num: '100',
        title: '长命百岁'
      }, {
        num: '666',
        title: '一路大顺'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    let userInfo = wx.getStorageSync('userInfo');
    this.setData({
      mf_id: options.mf_id,
      name: options.name,
      userInfo: userInfo
    })
  },
  
  nowhongbaovalue(e) {
    this.setData({
      money: e.detail.value
    })
  },
  change(e){
    console.log(e);
    let that = this;
    that.setData({
       money: e.currentTarget.dataset.value,
       now: e.currentTarget.dataset.now
    })
  },
  sendBtn(){
    this.setData({
      pay: true
    })
  },
  close(){
    this.setData({
      pay: false
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
    let that = this;
    let sign = wx.getStorageSync('sign');
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      url: apiurl + "birth/bless-birth-detail?sign=" + sign + '&operator_id=' + app.data.kid,
      data:{
        mf_id: that.data.mf_id
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        console.log("送生日祝福:", res);
        var status = res.data.status;
        if (status == 1) {
          that.setData({
            informAll:res.data.data,
            total_wish_count: res.data.data.total_wish_count //点赞
          })
        } else {
          console.log(res.data.msg)
        }
      }
    })
    wx.hideLoading()
  },
// 切换
  tabnav(e){
    let that = this;
    that.setData({
      show: e.currentTarget.dataset.show
    })

  },
  // 点赞
  zan(){
    let that = this;
    let sign = wx.getStorageSync('sign');
    let total_wish_count = that.data.total_wish_count;
    if (total_wish_count == null){
      that.setData({
        total_wish_count: 0
      })
    }
    wx.request({
      url: apiurl + "birth/thumb?sign=" + sign + '&operator_id=' + app.data.kid,
      data: {
        mf_id: that.data.mf_id
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        console.log("送生日祝福:", res);
        var status = res.data.status;
        if (status == 1) {
          console.log(res.data.data);
          that.setData({
            total_wish_count: parseInt(that.data.total_wish_count)+1
          })
        } else {
          console.log(res.data.msg)
        }
      }
    })
  },
  //sendRed发红包
  sendRed(e){
    let that = this;
    let sign = wx.getStorageSync('sign');
    if (!that.data.money){
        tips.alert("请输入红包金额");
    }
    wx.request({
      url: apiurl + "birth/sent-red?sign=" + sign + '&operator_id=' + app.data.kid,
      data: {
        mf_id: that.data.mf_id,
        money: that.data.money
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        console.log("送生日祝福:", res);
        var status = res.data.status;
        if (status == 1) {
          // 调用支付
          wx.requestPayment({
            timeStamp: res.data.data.timeStamp,
            nonceStr: res.data.data.nonceStr,
            package: res.data.data.package,
            signType: res.data.data.signType,
            paySign: res.data.data.paySign,
            success: function (res) {
              console.log(res);
              tips.success('红包发送成功');
            },
            fail: function (res) {
              tips.error('支付失败！');
            }
          })
        } else {
         // console.log(res.data.msg);
          tips.error(res.data.msg);
        }
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    let that = this;
    return {
      title: '送生日祝福',
      path: '/pages/blessing/blessing?mf_id=' + that.data.mf_id + '&name=' + that.data.name,
      success: function (res) {
        console.log(res);
        // 转发成功
        wx.request({
          url: apiurl + "birth/save-share-friend-info?sign=" + sign + '&operator_id=' + app.data.kid,
          data: {
            mf_id: that.data.mf_id
          },
          header: {
            'content-type': 'application/json'
          },
          method: "GET",
          success: function (res) {
            console.log("修改群昵称:", res);
            var status = res.data.status;
            if (status == 1) {
              tips.success('修改群昵称成功')
            } else {
              tips.alert(res.data.msg);
            }
          }
        })
      },
      fail: function (res) {
        console.log(res);
        // 转发失败
      }
    }
  }
})