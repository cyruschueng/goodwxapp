// pages/list/list.js
const date = new Date()
const years = []
const months = []
const days = [];
const app = getApp();
for (let i = 1990; i <= date.getFullYear(); i++) {
  years.push(i)
}

for (let i = 1; i <= 12; i++) {
  months.push(i)
}

for (let i = 1; i <= 31; i++) {
  days.push(i)
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    _date:0,
    _state: 0,
    years: years,
    year: date.getFullYear(),
    months: months,
    month: date.getMonth() + 1,
    days: days,
    day: date.getDate() ,
    value: [9999, 1, 1],
    stateArr:['全部','待付款','已付款','已生效','作废无效','已过期'],
    state: ['全部'],
    detailAerr:[
      {'title':'本月已付','num':'20单'},
      {'title':'已付合计','num':'￥24000'},
      { 'title':'待付款','num': '1单' },
      {'title':'理赔中','num': '0单' }
      ],
    personArr:[
      { 'wsbNum': 'WSB1000010001', 'ZAorder': '众安保险订单号:WSB1000013001', 'ZAbail': '众安保险保单号 :W1140_EC105010001', 'carNum': '粤AJ22310g挂-234532', 'date': '2017-04-12 16:00', 'payDate': '支付时间:2017-04-11 17:00', 'money': '￥100', 'payState': '已付款', 'payClass': 'green', 'changeState': '订单完成待生效', 'orderPerson':'下单人: 陈三'},
      { 'wsbNum': 'WSB1000010002', 'carNum': '粤BJ562310g挂-234532', 'date': '2017-04-12 16:00', 'payDate': '支付时间:2017-04-12 09:00', 'money': '￥50', 'payState': '待付款', 'payClass': 'red', 'changeState': '订单完成已生效', 'orderPerson': '下单人: 江纯' },
      { 'wsbNum': 'WSB1000010003', 'carNum': '粤AK45310g挂-239832', 'date': '2017-04-12 16:00', 'payDate': '支付时间:2017-04-19 17:00', 'money': '￥200', 'payState': '已付款', 'payClass': 'green', 'changeState': '订单完成待生效', 'orderPerson': '下单人: 廖燕敏' }
    ],
    _show:false
  },
  //点击时间
  clickDate:function(e){
    this.setData({
      _date:1
    })
  },
  //选中时间
  bindChange: function (e) {
    const val = e.detail.value;
    this.setData({
      year: this.data.years[val[0]],
      month: this.data.months[val[1]],
      day: this.data.days[val[2]],
    })
  },
  //点击时间的取消
  closeDate:function(e){
    this.setData({
      year: date.getFullYear(),
      month:date.getMonth()+1 ,
      day: date.getDate(),
      _date:0
    })
  },
  //点击时间的确定
  rightDate:function(e){
    this.setData({
      _date: 0
    })
  },

  //点击状态
  clickState: function (e) {
    this.setData({
      _state: 1
    })
  },

  //选中状态
  bindState:function(e){
    const val = e.detail.value;
    this.setData({
      state: this.data.stateArr[val[0]]
    })
  },
  //点击状态的取消
  closeState: function (e) {
    this.setData({
      state: '全部',
      _state: 0
    })
  },
  //点击状态的确定
  rightState: function (e) {
    this.setData({
      _state: 0
    })
  },


  //点击详情查看
  viewDetail:function(e){
    console.log(e.currentTarget.dataset.index);
    wx.navigateTo({
      url: '../view/view',
    })
  },
  //点击详情作废
  cancelDetail:function(e){
    let delId= '';
    delId = e.currentTarget.dataset.index
    this.setData({
      _show:true,
      delId: delId
    })
 

  },
  //取消
  modelClose:function(e){
    console.log(e.currentTarget.dataset.cindex);
    this.setData({
      _show: false
    })
  },
  //确定
  modelConfirm: function (e) {
    this.setData({
      _show: false
    })
    if(this.data.delId== 1){
          console.log('删除第二个')
    }
  },

  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let payTypeName = app.globalData.payTypeName;
    console.log(payTypeName)
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