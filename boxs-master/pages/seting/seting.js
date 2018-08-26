// pages/seting/seting.js
const app = getApp()
const apiurl = 'https://friend-guess.playonwechat.com/';
let sign = wx.getStorageSync('sign');
import tips from '../../utils/tips.js'
Page({
  data: {
      imgList:[
        {
          color:'#8a8a8a',
          url:'../image/box1.png'
        }, {
          color: '#d2504e',
          url: '../image/box2.png'
        }, {
          color: '#dd9b51',
          url: '../image/box3.png'
        }, {
          color: '#f4d256',
          url: '../image/box4.png'
        }, {
          color: '#92d472',
          url: '../image/box5.png'
        }, {
          color: '#5baef2',
          url: '../image/box6.png'
        }, {
          color: '#c874e6',
          url: '../image/box7.png'
        },
      ],
      desc:'',
      color:'1',
  },
  onLoad: function (options) {
    console.log("options:", options);
    console.log(`options.desc ,${options} ${typeof(options.desc)}`)
    if (options.desc ='undefined'){
      this.setData({
         desc: ''
      })
    }else{
      this.setData({
        desc: options.desc
      })
    }
    this.setData({
      lu_id: options.lu_id,
      name: options.name
    })
  },
  onShow: function () {
  
  },
  nameInput(e){
    this.setData({
      name:e.detail.value
    })
  },
  descInput(e){
    this.setData({
      desc: e.detail.value
    })
  },
  checkColor(e){
    let colorIndex = e.currentTarget.dataset.index;
    this.setData({
      color: colorIndex
    })
  },
  saveTap(){
    let that = this;
    let sign = wx.getStorageSync('sign');
    // 行李箱列表
    wx.request({
      url: apiurl + "luggage/edit-luggage?sign=" + sign + '&operator_id=' + app.data.kid,
      data:{
         lu_id: that.data.lu_id,
         name: that.data.name,
         desc: that.data.desc,
         color: that.data.color
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function (res) {
        console.log("行李箱列表：", res);
        let status = res.data.status;
        if (status == 1) {
          tips.success("修改成功");
          setTimeout(function(){
            wx.switchTab({
              url: '../index/index'
            })
          },1000)
        } else {
          tips.alert(res.data.msg)
        }
      }
    })
  }
})