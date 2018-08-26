var app = getApp()
Page({
  data: {
    shopId: '',
    busname: '',
    memberId: '',
    active_tab:"false",//选中的tab状态
    tab: [
      {
        text: '待使用',
        num: 'false'
      },
      {
        text: '已使用',
        num: 'true'
      },
      {
        text: '已过期',
        num: 'wan'
      }
    ],
    showMiniUserCards:['11'],//显示的优惠券列表
    MiniUserCards: ''  //优惠券列表
  },
  onLoad(options){
    this.setData({
      cardType: options.cardType
    })
    wx.setNavigationBarTitle({
      title: '我的' + (options.cardType == '1' ? "代金券" : "") + (options.cardType == '0' ? "优惠券" : "") + (options.cardType == 'DISCOUNT' ? "折扣券" : ""),
    })
    wx.showLoading({
      title: '加载中',
    })
  },
  onShow() {
    this.getMiniUserCards()
  },

  //获取优惠券列表
  getMiniUserCards() {
    app.commonAjax('/miniapp/cat/couponLink/getMiniUserCards', ['bizId', 'memberId'], { cardType: this.data.cardType }, (res) => {

      if (res.data.code == 0) {

        this.setData({
          MiniUserCards: res.data.data
        })
        wx.hideLoading()
        this.expire()
        this.change_MiniUserCards()
        

      }

    }, app.globalData, 'post')
  },
  change_active_tab(e) {
    this.setData({
      active_tab: e.currentTarget.dataset.index
    })

    this.change_MiniUserCards()

    

  },
  //标记过期的
  expire(){
    var myDate = new Date();
    var Month = myDate.getMonth() + 1;
    var str = myDate.getFullYear().toString() + '-' + (Month < 10 ? "0" + Month : Month).toString() + '-' + (myDate.getDate() < 10 ? "0" + myDate.getDate() : myDate.getDate()).toString();
    str = str.split('-').join('')

    this.data.MiniUserCards.forEach((item, index) => {
      if (parseInt(item.endTime.split('-').join('')) < parseInt(str)) {
        item.isUse = 'wan'
      }
    })

    this.setData({
      MiniUserCards: this.data.MiniUserCards
    })

    var t1=0,t2=0,t3=0;

    this.data.MiniUserCards.forEach((item, index) => {
      if (item.isUse.toString() == 'false') {
        t1++
      }
      if (item.isUse.toString() == 'true') {
        t2++
      }
      if (item.isUse.toString() == 'wan') {
        t3++
      }
    })

    this.data.tab[0].t = t1
    this.data.tab[1].t = t2
    this.data.tab[2].t = t3

    this.setData({
      tab: this.data.tab
    })

  },
  //筛选
  change_MiniUserCards(){

    var newdata = [];

    this.data.MiniUserCards.forEach((item, index) => {

      if (item.isUse.toString() == this.data.active_tab) {
        newdata.push(item)
      }

    })


    this.setData({
      showMiniUserCards: newdata
    })
    
    
  }
  
  
  
})