// pages/daiqukuaidi/daiqukuaidi.js
var util = require('../../../utils/util.js')
var app = getApp()
var that;
Page({

  data: {
      id:0,
      name:'请选择',
      tel:'',
      address:'收货地址',
      addressid:0,
      selectPerson:true,
      selectArea:false,
      kuaidi:'圆通快递',
      click:true,
      bz:'',
      guige:'',
      total:0,
      index:0,
      array:['无','中通快递','圆通快递','韵达快递','百世汇通','顺丰速运','申通快递','天天快递','EMS','平邮'],
      style:'',
      btncss:'fabudingdan_btn'
  },
  selectCusInfo:function(){
   wx.navigateTo({
      url: '/pages/mine/contactList/contactList?type=1',
    })
  },
  total:function(e){
    var value = e.detail.value
    var pos = e.detail.cursor
    if(!isNaN(e.detail.value))
    {
      that.setData({
              total:e.detail.value
            });
       
    }else{
       return {
      value: '',
      cursor: pos
    }
    }
  },
  bz:function(e){
       that.setData({
         bz:e.detail.value
       })
  },
  guige:function(e){
      that.setData({
         guige:e.detail.value
       })
  },
  onLoad: function (options) {
    that=this;
    that.setData({
      id:options.id
    })
    wx.request({
       url: app.globalData.IP+"wx/shopdetail.do",
      data: {id:options.id},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
          if(res.data.status=='off')
				  {
              var time1=res.data.time1;
					  var time2=res.data.time2;
					  var time3=res.data.time3;
					  var time4=res.data.time4;
					  var time5=res.data.time5;
					  var time6=res.data.time6;
					  var print='不在预定时间段内\t';
					  print+=time1+"-"+res.data.time2+",";
					  if(time3!=time4)
					   print+=time3+"-"+res.data.time4+",";
					     if(time5!=time6)
					    print+=time5+"-"+res.data.time6+"";
						wx.showModal({
								title: '提示',
								content: print,
                showCancel:false,
								success: function(res) {
						   if (res.confirm) {
							  wx.navigateBack({
							  delta: 1, // 回退前 delta(默认为1) 页面
							})
						}else{
							wx.navigateBack({
							  delta: 1, // 回退前 delta(默认为1) 页面
							})
						} 
						}
						})
				  }
      },
    })
    wx.showLoading({
      mask:true,
      title: '加载中',
    })
    wx.request({
      url: app.globalData.IP+"wx/myorder.do",
      data: {id:app.globalData.ID},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        if(res.data.length>0)
        {
            that.setData({
               name:res.data[0].addressname,
               tel:res.data[0].addressphone,
               address:res.data[0].addressdetail,
               addressid:res.data[0].addressid
            })

        }
        wx.hideLoading()
      },
    })
  },
  bindPickerChange:function(e){
      this.setData({
      index: e.detail.value
    })
    if(that.data.index!=0)
    {
          that.setData({
            style:'color:#333333'
          })
    }else{
      that.setData({
            style:''
          })
    }

   /* var selectPerson = this.data.selectPerson;
    if(selectPerson == true){
     this.setData({
     selectArea:true,
     selectPerson:false,
  })
    }else{
     this.setData({
     selectArea:false,
     selectPerson:true,
  })
    }
    this.setData({
      click:!this.data.click})*/
  } ,
  //点击切换
  mySelect:function(e){
   this.setData({
     kuaidi:e.target.dataset.me,
     selectPerson:true,
     selectArea:false,
     click:!this.data.click
   })
  },
  fb:function(){
      var that=this;
      if(this.data.tel=="")
      {
        wx.showToast({
          title:'请选择地址',
          duration:2000
        })
      }else if(that.data.bz==''){
         wx.showToast({
          title:'请填写快递信息',
          duration:2000
        })
      }else if(that.data.total==''){
         wx.showToast({
          title:'请填写金额',
          duration:2000
        })
        
      }else if(that.data.index==0){
         wx.showToast({
          title:'请选择快递公司',
          duration:2000
        })
      }else{
        if (that.data.btncss =='fabudingdan_btn')
        {
        that.setData({
          btncss:'fabudingdan_btn2'
        })
        wx.request({
          url: app.globalData.IP+"wx/kddq.do",
          data: {
             addressname:that.data.name,
             addressphone:that.data.tel,
             addressdetail:that.data.address,
             kuaidi:that.data.array[that.data.index],
             bz:that.data.bz,
             guige:that.data.guige,
             totalprice:that.data.total,
             shopid:that.data.id,
             userid:app.globalData.ID  
          },
          method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          header:{'content-type':'application/x-www-form-urlencoded'},
          success: function(res){
           
            that.data.oid=res.data.oid;
            wx.requestPayment({
              timeStamp: res.data.time,
              nonceStr: res.data.nonceStr,
              package: 'prepay_id=' + res.data.prepay_id,
              signType: 'MD5',
              paySign: res.data.paySign,
              success: function (res) {
                // success
				 wx.redirectTo({
                      url: "/pages/order/orderDetail/orderDetail?value=1&id=" + that.data.oid
                    })
                /*wx.request({
                  url: app.globalData.IP + "wx/paysuccess.do",
                  data: { id: that.data.oid },
                  method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                  // header: {}, // 设置请求的 header
                  success: function (res) {
                   
                  },
                }),*/
				
              },fail:function(){
					 wx.redirectTo({
                      url: "/pages/order/orderDetail/orderDetail?value=1&id=" + that.data.oid
                    })
				         }

            })
          },
        })

        }
      }
  }
})

