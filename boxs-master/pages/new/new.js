const app = getApp()
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
  
  },
  onShow: function () {
     let that = this;
     let sign = wx.getStorageSync('sign');
  },
  bindKeyInput(e){
    this.setData({
      name: e.detail.value
    })
  },
  add(){
    let that = this;
    let sign = wx.getStorageSync('sign');
    if (!that.data.name) {
      tips.alert("请输入类别名称");
      return false;
    }
    // 添加行李箱
    wx.request({
      url: apiurl + "luggage/append-luggage?sign=" + sign + '&operator_id=' + app.data.kid,
      data: {
        name: that.data.name,
        desc:'',
        color:''
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function (res) {
        console.log("添加行李箱", res);
        let status = res.data.status;
        if (status == 1) {
          console.log(1);
          that.setData({
            luggageList: res.data.data
          })
          tips.success('添加行李箱成功！');
          //setTimeout(function(){
              wx.switchTab({
                url: '../index/index',
              })
          //},20)
      
        } else {
          tips.alert(res.data.msg);
        }
      }
    })
  }
})