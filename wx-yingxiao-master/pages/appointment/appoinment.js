// pages/appointment/appoinment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderCurrent:'-1',
    stateCurrent:'-1',
    dateCurrent:'-1',
    timeCurrent:'-1',
    statesList:[
      {name:'拍片',code:'1'},
      { name: '选片', code: '3' },
      { name: '看设计', code: '6' },
      { name: '取件', code: '7' },
    ],
    states:{
      name:['拍片','选片','看设计','取件']
    },
    order:[
      {name:'订单1',state:'1'},
      { name: '订单2', state: '1' },
      { name: '订单3', state: '6' },
      { name: '订单4', state: '5' },
      { name: '订单5', state: '3' },
      { name: '订单6', state: '3' },
      { name: '订单7', state: '6' },
      { name: '订单8', state: '1' },
    ],
    timeTab:[
      {time:'09:00-10:00',mumber:'4'},
      { time: '10:00-11:00', mumber: '5' },
      { time: '11:00-12:00', mumber: '2' },
      { time: '13:00-14:00', mumber: '1' },
      { time: '15:00-16:00', mumber: '8' },
      { time: '16:00-17:00', mumber: '10' },
      { time: '17:00-18:00', mumber: '3' },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var that = this;

    if(e.order_sn!=undefined){
      console.log(e.order_sn);
      var current = e.order_sn;
      that.setData({
        orderCurrent: current,
      })
      var stateCurrent = that.data.order[current].state;
      var item = {
        name: [],
        code: []
      }
      this.data.statesList.forEach(function (val, index) {
        if (val.code > stateCurrent) {
          item.name.push(val.name)
          item.code.push(val.code)
        }
      })
      this.setData({
        states: item
      })
    }
    var orderName = [];
    that.data.order.forEach(function(val,index){
      orderName.push(val.name)
    })
    that.setData({
      orderName:orderName,
    })
  },

  checkOrder:function(e){
    var current = e.detail.value;
    var stateCurrent = this.data.order[current].state;
    var item = {
      name:[],
      code:[]
    }
    this.data.statesList.forEach(function(val,index){
      if(val.code>stateCurrent){
        item.name.push(val.name)
        item.code.push(val.code)
      }
    })
    this.setData({
      orderCurrent:current,
      states:item
    })
  },
  checkStates:function(e){
    console.log(e);
    var stateCurrent = e.detail.value;
    this.setData({
      stateCurrent:stateCurrent,
    })
  },
  checkDate:function(e){
    this.setData({
      date:e.detail.value,
      dateCurrent:'1',
      none:'none'
    })
  },
  subTime:function(e){
    var timeCurrent = e.currentTarget.dataset.index;
    this.setData({
      timeCurrent:timeCurrent,
    })
  },
  appointment:function(){
    var that = this;
    var order = that.data.order[that.data.orderCurrent].name;
    var item = that.data.states.code[that.data.stateCurrent];
    var date = that.data.date;
    var time = that.data.timeTab[that.data.timeCurrent].time;

    wx.navigateTo({
      url: '/pages/success/success?from=预约&to=index',
    })
  }
})