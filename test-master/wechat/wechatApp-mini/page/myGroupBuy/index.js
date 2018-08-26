var createQrCode = require('../takeoutpay/cart/submit/wxqrcode.js')
var app = getApp()
Page({

  data: {
    codeJson:'',
    active_index:'',
    code:''
  },

  
  onLoad: function (options) {

  },



  change_active_index(e){
    
    if (e.currentTarget.dataset.index == this.data.active_index){
      this.setData({
        active_index: ''
      })
    }else{
      this.setData({
        active_index: e.currentTarget.dataset.index
      })
    }

    
  },

  
  onShow: function () {

    this.getGroupPurchase()
    var codeJson={}

  },


  //获取代金券
  getGroupPurchase(){
    app.commonAjax('/miniapp/cat/groupPurchase/memberGroupPurchase', ['bizId','memberId'], { }, (res) => {

      var GroupPurchase = res.data.data

      if (res.data.code == 0) {
        


        GroupPurchase.forEach((item,index)=>{

          var outItem = item

          outItem.codeJson = []
    
          outItem.packnoList.forEach((item2,index2)=>{
    
            outItem.codeJson[index2]={ 'str': item2 }
            outItem.codeJson[index2].qrcode = createQrCode.createQrCodeImg((item2).toString(), { 'size': 100 });

          })
        })

        this.setData({
          GroupPurchase: GroupPurchase
        })


      }

    }, app.globalData, 'get')
  }

})