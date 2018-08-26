var app = getApp()
var WxParse = require('../../wxParse/wxParse.js');
Page({
  data: {
    opq:0,
    imgUrl: [],
    current: 0,
    array:['100*200','150*200','200*200'],
    flag:0,
    num:1,
    guige:'请选择商品规格',
    changeBar:1,
    GoodsList:[],//产品详情
    uli:[],
    sgli:[]
  },
  navToPayfor: function (){
    var that = this
    var li = that.data.GoodsList
    var sgli = that.data.sgli
    var value= ''
    for(var i=0;i<sgli.length;i++){
      value = value + ' ' + sgli[i].value
    }
    var lis = [{
      buypron: that.data.num, icon: that.data.GoodsList.icon, integral: that.data.GoodsList.integral, integralprice: that.data.GoodsList.integralprice, isdelete: 0, proid: that.data.GoodsList.msgId, proname: that.data.GoodsList.msgcontent, prostandard: that.data.GoodsList.prostandard, 
      sellprice: that.data.GoodsList.sellprice}]
    wx.navigateTo({
      url: '/pages/payfor/payfor?ol=0&types=1&sum=' + parseFloat(that.data.num) * parseFloat(that.data.GoodsList.sellprice) + '&count=' + that.data.num + '&list=' + JSON.stringify(lis)+'&gui='+value,
    })
  },
  changeBar: function () {
    if(this.data.changeBar == 1){
      this.setData({
        changeBar:2
      })
    }else{
      this.setData({
        changeBar: 1
      })
    }
    
  },
  numinput: function (e) {
    if (e.detail.value <= this.data.GoodsList.storecount){
      this.setData({
        num: e.detail.value
      })
    }else{
      wx.showToast({
        title: '数量超过了库存',
      })
      this.setData({
        num: 1
      })
    }
  },
  oncollection:function(e) {
    var that = this
    var date = new Date();
    
    wx.request({
      url: app.url + 'WxUserMsgL/insertget',
      method:'post',
      header:{
        'content-type': 'application/x-www-form-urlencoded'
      },
      data:{
        proid:that.data.GoodsList.msgId,
        openid:app.globalData.openid,
        addtime: date.getFullYear()+"-"+date.getMonth()+"-"+date.getDay(),
        isdelete:0
      },
      success:function(res){
        console.log(res)
        if(res.data.code == 100){
          wx.showToast({
            title: '收藏成功',
            icon:'success',
            duration:2000
          })
        }else{
          wx.showToast({
            title: '已收藏',
            image:'/img/60.png',
            duration:2000
          })
        }
      }
    })
  },
  addToCart: function() {
    var that = this
    wx.showModal({
      title: '确定要添加到购物车？',
      content: '',
      success: function (res) {
        if(res.confirm){
          wx.request({
            url: app.url + 'WxUserBuy/gwinsert',
            method:'get',
            data:{
              openid:app.globalData.openid,
              proid: that.data.GoodsList.msgId,
              addtime:"2017",
              isdelete:0,
              buypron:that.data.num
            },
            success: function (res) {
              console.log(res)
              if(res.data.code == 100){
                wx.showToast({
                  title: '添加购物车成功',
                  icon: 'success',
                  duration: 2000
                })
              }
            }
          })
        }
      }
    })
  },
  bindNumAdd:function(){
    var that = this
    if (that.data.num < that.data.GoodsList.storecount){
      this.setData({
        num: parseInt(that.data.num) + 1
      })
    }
  },
  bindNumRef: function () {
    var that = this
    if (that.data.num<=1){
      this.setData({
        num: 1
      })
    }else{
      this.setData({
        num: that.data.num - 1
      })
    }
  },
  makecall: function () {
    wx.makePhoneCall({
      phoneNumber: '17775556666',
    })
  },
  navToEvaluateshow: function () {
    wx.navigateTo({
      url: '/pages/evaluateshow/evaluateshow',
    })
  },
  bindGuiChange:function(e){
    var that = this
    console.log(e.currentTarget.dataset.index)
    var pli = that.data.sgli
    pli[e.currentTarget.dataset.index].value = pli[e.currentTarget.dataset.index].list[that.data.flag]
    this.setData({
      sgli:pli
    })
  },
  onShareAppMessage: function () {
    var that = this
    return {
      title: that.data.GoodsList.msgcontent,
      path: '/page/goods/goods?id=' + that.data.GoodsList.msgId,
      success: function (res) {
      },
      fail: function (res) {
      }
    }
  },
  onLoad: function (options) {
    var that = this
    app.load(that)
    app.getUserInfo();
    wx.request({
      url: app.url + 'ShowIndexPro/showMsg',
      data:{
        msgId: options.id
      },
      method:'POST',
      header: { 'content-type':'application/x-www-form-urlencoded'},
      success:function(res){
        console.log(res)
        that.setData({
          opq: 1
        })
        var li = []
        var sd = res.data.prostandard.split('#')
        console.log(sd)
        for(var i=0;i<sd.length;i++){
          var pli = {};
          pli.flag = 0
          pli.value = '请选择' + sd[i].substring(0, sd[i].indexOf('/'))
          pli.name = sd[i].substring(0, sd[i].indexOf('/'))
          pli.list = sd[i].substring(sd[i].indexOf('/')+1, sd[i].length).split(' ')
          li.push(pli)
        }
        console.log('56565656565656')
        console.log(li)
        console.log(li[0].name)
        that.setData({
          sgli:li
        })
        console.log(1111)
        var inp = parseFloat(app.globalData.integral)/100
        if (inp < parseFloat(res.data.integralprice)){
          res.data.integralprice = 0
        }
        console.log(that.data.sgli)
        var article = res.data.promsgcontent
        WxParse.wxParse('article', 'html', article, that, 5);
        var cicon = res.data.cicon.split('#');
        that.setData({
          GoodsList:res.data,
          imgUrl: cicon
        })
        wx.request({
          url: app.url + 'WxUserLMsg/select?lmsgId=' + res.data.msgId + '&limit=1&pageIndex=1',
          method: 'POST',
          header: { 'content-type': 'application/x-www-form-urlencoded' },
          success: function (res) {
            console.log('评价')
            console.log(res)
            that.setData({
              uli: res.data.rows
            })
          }
        })
      }
    });
    
    
  },
  navToEvaluateshow: function (e) {
    var that = this
    console.log(e)
    wx.navigateTo({
      url: '/pages/evaluateshow/evaluateshow?no=' + that.data.GoodsList.msgId,
    })
  },
  imgChange: function (e) {
    console.log(e)
    this.setData({
      current: e.detail.current
    })
  },
  preview: function (e) {
    var that = this
    console.log(that.data.imgUrl)
    wx.previewImage({
      current: that.data.current,
      urls: that.data.imgUrl,
    })
  },
})