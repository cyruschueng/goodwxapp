// ======选择信用卡====pages/add/add.js

const date = new Date()
const days = []

for (let i = 1; i <= 30; i++) {
  days.push(i)
}

var urlData = require('../../utils/util.js');
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:"",  //姓名
    ID:"",    //身份证号
    card: '',  //银行卡号
    valueBankName: '',  //开户银行
    tele: "",  //电话号码
    index:0,
    index1:0,
    index2:0,
    provinces: [], //省
    citys: [], //市
    countys: [], //区
    detail:'',  //详细地址
    Code:[],    //
    Code1:[],
    Code2:[],
    proID:"",
    cityID:"",
    countysID:"",
    focus:false,
    focus1:false,
    focus2:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //获取省
    var str = {
      'OperationType': '10004'
    }
    wx.request({
      url: app.globalData.url,
      data: str,
      method: 'POST',
      header: { "content-type": "application/json" },
      success: function (res) {
        console.log(res)
        if (that.data.provinces) {
          for (var i = 0; i < res.data.data.length; i++) {
            that.data.provinces.push(res.data.data[i].Name)
            that.data.Code.push(res.data.data[i].Code)
          }
          console.log(that.data.provinces)
          console.log(that.data.Code)
          that.setData({
            provinces: that.data.provinces,
            Code: that.data.Code
          })

          //获取市
          var str = {
            'OperationType': '10005',
            "PCode": that.data.Code[that.data.index]
          }

          console.log(that.data.Code[that.data.index])

          wx.request({
            url: app.globalData.url,
            data: str,
            method: 'POST',
            header: { "content-type": "application/json" },
            success: function (res) {
              console.log(res.data.data )
              if (that.data.provinces) {
                for (var i = 0; i < res.data.data.length; i++) {
                  that.data.citys.push(res.data.data[i].Name)
                  that.data.Code1.push(res.data.data[i].Code)
                }
                console.log(that.data.citys)
                console.log(that.data.Code1)
                that.setData({
                  citys: that.data.citys,
                  Code1: that.data.Code1
                })

                //获取区
                var str = {
                  'OperationType': '10006',
                  "PCode": that.data.Code1[that.data.index1]
                }

                console.log(that.data.Code1[that.data.index1])
                wx.request({
                  url: app.globalData.url,
                  data: str,
                  method: 'POST',
                  header: { "content-type": "application/json" },
                  success: function (res) {
                    console.log(res)
                    if (that.data.countys) {
                      for (var i = 0; i < res.data.data.length; i++) {
                        that.data.countys.push(res.data.data[i].Name)
                        that.data.Code2.push(res.data.data[i].Code)
                      }
                      console.log(that.data.Code2)
                      console.log(that.data.countys)
                      that.setData({
                        countys: that.data.countys,
                        Code2:that.data.Code2
                      })
                    }
                  }
                })
              }
            }
          })
        }
      }
    })
  },

  //获取实名
  getName:function(e){
    this.setData({
      name: e.detail.value
    })
  },
  firm:function(){
    this.setData({
      focus:true
    })
  },
  firm1: function () {
    this.setData({
      focus1: true
    })
  },
  firm2: function () {
    this.setData({
      focus2: true
    })
  },
  nameLength:function(e){
    var that = this;
    if (that.data.name.length >= 2 && that.data.name.length<=8){

    }else{
      wx.showModal({
        title: '提示',
        content: '姓名最小两位，最大8位，请确认后再输入！！！',
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
  //获取身份证号
  ID: function (e) {
    this.setData({
      ID: e.detail.value
    })
  },

  //获取银行卡号
  card: function (e) {
    this.setData({
      card: e.detail.value
    })
  },

  //获取电话号码
  tele: function (e) {
    this.setData({
      tele: e.detail.value
    })
  },

  //详细地址
  bindDetail:function(e){
    this.setData({
      detail: e.detail.value
    })
  },
  
  //根据卡号查询银行
  blur: function () {
    var that = this;
    urlData.queryBank(that, that.data.card, that.data.valueBankName, that.data.acctType)
    if (wx.getStorageSync("depositBank")=="贷记卡"){
      wx.showModal({
        title: '请输入储蓄卡号！',
        // content: '请输入储蓄卡号！',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            that.setData({
              card:"",
              valueBankName:""
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
    }else{

    }
  },

  //点击选择所属区域
  bindPickerChange1: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var that = this;

    var str = {
      'OperationType': '10004'
    }
    wx.request({
      url: app.globalData.url,
      data: str,
      method: 'POST',
      header: { "content-type": "application/json" },
      success: function (res) {
        if (that.data.provinces) {
          console.log("手动获取省")
          for (var i = 0; i < res.data.data.length; i++) {
            that.data.provinces.push(res.data.data[i].Name)
            that.data.Code.push(res.data.data[i].Code)
          }

          that.setData({
            provinces: that.data.provinces,
            Code: that.data.Code
          })
          //归空
          that.data.Code1 = [];
          that.data.citys = [];

          var str = {
            'OperationType': '10005',
            "PCode": that.data.Code[that.data.index]
          }
          wx.request({
           
            url: app.globalData.url,
            data: str,
            method: 'POST',
            header: { "content-type": "application/json" },
            success: function (res) {
              console.log("手动获取市")
              console.log(res)
              if (that.data.provinces) {
                for (var i = 0; i < res.data.data.length; i++) {
                  that.data.citys.push(res.data.data[i].Name)
                  that.data.Code1.push(res.data.data[i].Code)
                }
                that.setData({
                  citys: that.data.citys,
                  Code1: that.data.Code1
                })

                that.data.countys = [];
                var str = {
                  'OperationType': '10006',
                  "PCode": that.data.Code1[that.data.index1]
                }
                wx.request({
                  url: app.globalData.url,
                  data: str,
                  method: 'POST',
                  header: { "content-type": "application/json" },
                  success: function (res) {
                    console.log("手动获取区")
                    console.log(res)
                    if (that.data.countys) {
                      for (var i = 0; i < res.data.data.length; i++) {
                        that.data.countys.push(res.data.data[i].Name)
                        that.data.Code2.push(res.data.data[i].Code)
                      }

                      that.setData({
                        countys: that.data.countys,
                        Code2:that.data.Code2
                      })
                    }
                  }
                })
              }
            }
          })
        }
      }
    })
    that.setData({
      index: e.detail.value,
    })
  },

  bindPickerChange2: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var that = this;
    that.setData({
      index1: e.detail.value,
    })

    var str = {
      'OperationType': '10005',
      "PCode": that.data.Code[that.data.index]
    }
    wx.request({

      url: app.globalData.url,
      data: str,
      method: 'POST',
      header: { "content-type": "application/json" },
      success: function (res) {
        console.log("手动获取市")
        console.log(res)
        if (that.data.provinces) {
          for (var i = 0; i < res.data.data.length; i++) {
            that.data.citys.push(res.data.data[i].Name)
            that.data.Code1.push(res.data.data[i].Code)
          }
          that.setData({
            citys: that.data.citys,
            Code1: that.data.Code1
          })

          that.data.countys = [];
          var str = {
            'OperationType': '10006',
            "PCode": that.data.Code1[that.data.index1]
          }
          wx.request({
            url: app.globalData.url,
            data: str,
            method: 'POST',
            header: { "content-type": "application/json" },
            success: function (res) {
              console.log("手动获取区")
              console.log(res)
              if (that.data.countys) {
                for (var i = 0; i < res.data.data.length; i++) {
                  that.data.countys.push(res.data.data[i].Name)
                  that.data.Code2.push(res.data.data[i].Code)
                }

                that.setData({
                  countys: that.data.countys,
                  Code2: that.data.Code2
                })
              }
            }
          })
        }
      }
    })
  },

  bindPickerChange3: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var that = this;
    that.setData({
      index2: e.detail.value,
    })
  },

  //提交//绑定基本信息---实名认证
  formSubmit: function () {
    var that = this;
    if (that.data.acctType == "借记卡") {
      if (that.data.name && that.data.tele && that.data.ID && that.data.card && that.data.tele && that.data.valueBankName && that.data.provinces[that.data.index] && that.data.citys[that.data.index1] && that.data.countys[that.data.index2] && that.data.detail) {

        urlData.BindBasicInformation(that, wx.getStorageSync('uid'), that.data.provinces, that.data.index, that.data.citys, that.data.index1, that.data.countys, that.data.index2, that.data.detail, that.data.ID, that.data.name, that.data.valueBankName, that.data.card, that.data.Code, that.data.Code1, that.data.Code2,that.data.tele)
      } else {
        wx.showToast({
          title: '请填写完整信息',
          image: "../../images/icon/f.png",
          duration: 1000,
          mask: true,
        })
      } 
    } else {
      wx.showModal({
        title: '提示',
        content: "实名认证的银行卡必须为储蓄卡！！！",
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