// pages/recharge/recharge.js
var app = getApp()
var color,sucmoney
var money = 0
var b = 0
var yajinid = 0
Page({
  /**
   * 页面的初始数据
   */
  data: {
    mymondy:0,
    disabled:false,
    curNav:1,
    curIndex:0,
    cart:[],
    cartTotal:0,
    lockhidden:true,
    yajinhidden:true,
    sucmoney:424,
    color:'limegreen',
    nocancel:false,
    yajinmodaltitle:"押金充值",
    yajinmodaltxt:"去充值",
    yajinmoney:0,
    yajintxt:"您是否确定充值押金299元？押金充值后可以在摩拜单车App全额退款",
    navList:[{
      id:1,
      chongzhi:'充￥300',
      song:'送￥124',
      money:"424"
    },
    {
        id: 2,
        chongzhi: '充￥100',
        song: '送￥50',
        money: "150"
      },
      {
        id: 3,
        chongzhi: '充￥50',
        song: '送￥20',
        money: "70"
      },
      {
        id: 4,
        chongzhi: '充￥20',
        song: '送￥5',
        money: "25"
      },
      {
        id: 5,
        chongzhi: '充￥10',
        song: '',
        money: "10"
    }],
  },
  //充值金额分类渲染模块
  selectNav(event){
    let id=event.target.dataset.id,
    index = parseInt(event.target.dataset.index);
    b = parseInt(event.target.dataset.money);
    self = this;
    this.setData({
      curNav:id,
      curIndex:index,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    b = 424;
    this.setData({
      myMoney:money,
    })
  },
  //去充值功能模块
  gobalance:function(event){
    money += b;
    this.setData({
      lockhidden:false,
      mymoney:money,
      sucmoney:b,
    })
  },
  confirm:function(){
    this.setData({
      lockhidden:true
    });
  },
  //押金功能模块
  yajin:function(event){
    this.setData({
      yajinhidden:false
    });
  },
  yajincancel:function(event){
    this.setData({
      yajinhidden:true
    });
  },
  yajinconfirm:function(event){
    if(yajinid == 0){
      yajinid = 1;
      this.setData({
        nocancel:true,
        yajintxt:"您已成功充值押金299元",
        yajinmodaltitle:'充值成功',
        yajinmodaltxt:"完成"
      });
    } else {
      yajinid = 0;
      this.setData({
        nocancel:false,
        yajinhidden:true,
        yajinmoney:299
      })
    }
    this.setData({
      nocancel:true,
    });
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