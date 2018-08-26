
Page({
	data: {
    currentIndex:1,
    total:6,
    info:[{title:'接车开单',addition:'车辆到店后，接车员手机开单填写客户信息',tip:'开单效率高：车牌识别，车架号拍照'},
          {title:'客户扫码',addition:'生成订单二维码，展示给客户扫码和确认',tip:'客户绑定快：现场扫码，绑定客户'},
          {title:'车辆检查',addition:'施工员检查车况，出据检查报告',tip:'检车更灵活：检查项目可定制，异常拍照免争议'},
          {title:'在线报价',addition:'根据检查结果和客户要求，填写报价单',tip:'报价更省心：维修费用明细，一键送达客户'},
          {title:'客户确认',addition:'报价完成后，系统立即提醒客户确认',tip:'使用体验好：客户远程确认，及时安排施工'},
          {title:'售后服务',addition:'服务完成后，售后跟进提升客户满意度',tip:'客户更满意：售后咨询，保养提醒'}
    ],
    status:false
	},
	onLoad: function() {
		var self = this
		wx.setNavigationBarTitle({
			title: '接车单使用指南'
		});
	},
	onShow:function(){

	},
  nextStep:function(){
     if(this.data.currentIndex==this.data.total){
        this.setData({
           currentIndex:1,
           status:true
        })
     }else{
       this.setData({
           currentIndex:++this.data.currentIndex
       })
     }
  },
  prevStep:function(){
      this.setData({
          currentIndex:--this.data.currentIndex
      })
  },
  teachAgain:function(){
    this.setData({
        status:false
    })
  },
  toGarageList:function(){
     if(wx.getStorageSync('token')){
       wx.switchTab({
          url: '/src/containers/orderList/orderList'
       })
     }else{
       wx.navigateTo({
   			url: '/src/containers/toJoin/toJoin'
   		})
     }

  },
  _copy:function(){
    wx.setClipboardData({
        data:'pahqx03',
        success:function(){
           wx.showToast({
              title:'复制成功'
           })
        },
        fail:function(){
          wx.showToast({
             title:'该微信版本不支持，请升级微信'
          })
        }
    })
  }

});
