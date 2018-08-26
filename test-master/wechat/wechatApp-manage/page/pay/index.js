var app = getApp()
Page({

  data: {
    moneyType: '0',   //结算金额类型(0-已原价结算；1-已优惠价结算)
    payMethod: '7', //支付方式，2-现金支付，2-网银支付，7-微信扫码支付，8-支付宝扫码支付
    codeImgUrl:'', //收款码地址
    discount: '',  //折扣点数，比如打9折，则填写90
    specialMoney: '', //减免金额
    actualMoney: '', //实付金额
    totalMoney:'', //原价
    billMoney: '', //优惠价
    deskId: ''   //餐桌id
  },
  
  onLoad: function (options) {
    console.log(options)
    this.setData({
      deskId: options.deskId
    })
    
  },

  onShow: function () {
    this.settleOrder()
  },

  input_discoun(e){
    this.setData({
      discount: e.detail.value
    })
    this.comput_actualMoney()
  },

  input_specialMoney(e) {
    this.setData({
      specialMoney: e.detail.value
    })
    this.comput_actualMoney()
  },

  changeMoneyType(e){
    this.setData({
      moneyType: e.currentTarget.dataset.index
    })
    this.comput_actualMoney()
  },

  changePayMethod(e) {
    this.setData({
      payMethod: e.currentTarget.dataset.index
    })
  },

  //获取原价，折扣价

  settleOrder(){

    var subdata = {};
    subdata.deskId = this.data.deskId

    app.commonAjax('/shop/manage/order/settleOrder', [], subdata, (res) => {

      if(res.data.code == 0){

        var data = res.data.data;

        this.setData({
          billMoney: data.billMoney,
          discount: data.discount == 100 ? "" : data.discount/10,
          specialMoney: data.specialMoney == 0 ? "" : data.specialMoney,
          actualMoney: data.actualMoney,
          totalMoney: data.totalMoney
        })
        this.comput_actualMoney()
      }

    }, app, 'post')
  },


  //计算金额
  comput_actualMoney(){

    var money;

    var all_money = this.data.moneyType === "0" ? this.data.totalMoney : this.data.billMoney  

    console.log(all_money)

    money = ((all_money) * (this.data.discount ? this.data.discount : 10)) / 10 - this.data.specialMoney

    // this.discountMoney = ((all_money) * (this.data.discount ? this.data.discount : 10)) / 10

    money = money < 0 ? 0 : money

    console.log(money)
    // if (money<0){
    //   wx.showToast({
    //     title: '减免金额有误',
    //     image: '/image/i/x.png',
    //     duration: 2000
    //   })
    // }
    this.setData({
      actualMoney: money.toFixed(0)
    })

  },

  //去收款，生成收款二维码
  get_money(){

    

    if (this.data.specialMoney){

      var allm = (this.data.moneyType === "0" ? this.data.totalMoney : this.data.billMoney) * (((this.data.discount ? this.data.discount : 10)) / 10) - (this.data.specialMoney) 
      console.log(allm)
      if (allm<0){
        wx.showToast({
          title: '减免金额过高',
          image: '/image/i/x.png',
          duration: 2000
        })
      }else{
        this.VerifyAmount()
      }

    } else {

      this.VerifyAmount()
      
    }


  },

  //判断金额
  VerifyAmount(){
    var reg = /^(([0-9]|10)(.([0-9]|10)|))$/; //判断0-10数
    var reg2 = /^[0-9]+(\.[0-9]{1,2})?$/; //判断金额

    if ((reg.test(this.data.discount) && this.data.discount >= 1 && this.data.discount <= 10) || this.data.discount == '') {

      if (reg2.test(this.data.specialMoney) || this.data.specialMoney == '') {
        this.sub_money()
      } else {
        wx.showToast({
          title: '减免金额错误',
          image: '/image/i/x.png',
          duration: 2000
        })
      }


    } else {
      wx.showToast({
        title: '折扣输入错误',
        image: '/image/i/x.png',
        duration: 2000
      })
    }
  },

  //提交收款
  sub_money(){

    this.setData({
      codeImgUrl: ''
    })

    var subdata = {};
    subdata.deskId = this.data.deskId
    subdata.moneyType = this.data.moneyType
    subdata.payMethod = this.data.payMethod
    subdata.actualMoney = this.data.actualMoney

    if (this.data.discount == ''){
      subdata.discount = 100
    }else{
      subdata.discount = this.data.discount * 10
    }

    if (this.data.specialMoney == ''){
      subdata.specialMoney = 0
    } else{
      subdata.specialMoney = this.data.specialMoney
    }

    app.commonAjax('/shop/manage/order/finishOrder', [], subdata, (res) => {

      

      if (res.data.code == 0) {

        var url = res.data.data.codeImgUrl

        this.setData({
          codeImgUrl: res.data.data.codeImgUrl,
          res_actualMoney: res.data.data.actualMoney
        })

        wx.setStorageSync('codeImgUrl', res.data.data.codeImgUrl)

        wx.redirectTo({
          url: '/page/pay/payQrcode/index?actualMoney=' + res.data.data.actualMoney + '&payId=' + res.data.data.payId ,
        })
      }else{
        wx.showToast({
          title: res.data.message,
          image: '/image/i/x.png',
          duration: 2000
        })
      }

    }, app, 'post')
  }

})