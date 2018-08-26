// pages/getjianli/getjianli.js
var token;
var name;
var qiyechakan;
var jianlishu;
var app = getApp()
Page({
  data:{
    userInfo:{},
    info:{},
    look:0,
    phone:0,
  },
  formsubmit: function (e) {
    console.log(e.detail.formId);
    var session_id = wx.getStorageSync('session_id');
    var openid = wx.getStorageSync('wxopenid');
    wx.request({
      url: 'https://www.mcmchw.com/index.php?m=Home&c=Modenews&a=moreFormId',
      data: {
        'openid': openid,
        'formId': e.detail.formId
      },
      method: 'post',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': 'PHPSESSID=' + session_id + '; path=/'
      },
      success: function (e) {
        console.log(e);
      }
    })
  },
  onLoad:function(options){
    var that = this;
    // 页面初始化 options为页面跳转所带来的参数
    token = options.token;
    var session_id = wx.getStorageSync('session_id')
    var openid = wx.getStorageSync('wxopenid')
    // 加载数据
    wx.showToast({
        title: '简历加载中…',
        icon: 'loading',
        duration: 10000
    });
    // 获取数据
      wx.request({
        url: 'https://www.mcmchw.com/index.php?m=Home&c=Mcmc&a=getjializhengbiao', //真实的接口地址
          data: {
              'token':token,
              'openid':openid
          },
          header: {
              'content-type': 'application/json',
              'Cookie':'PHPSESSID='+session_id+'; path=/'
          },
          success: function(res) {
              // console.log(res.data)
              name = res.data.name;
              if (res.data.jianlishu){
                jianlishu = jianlishu = res.data.jianlishu;
              }else{
                jianlishu=0;
              }
              
              qiyechakan= res.data.qiyechakan,
			  
              that.setData({
                info:res.data,
                look :res.data.qiyechakan,
                phone:res.data.phone
              })
              // 隐藏提示
              wx.hideToast()
          },
          // 接口调用失败
          fail:function(){

          },
          complete:function(){
          }
      })

  },
  callphone:function(e){
    var that = this;
    var session_id = wx.getStorageSync('session_id')
    var openid = wx.getStorageSync('wxopenid')
		if(that.data.look == 0){
			      wx.showModal({
              title: '下载方式 : -6金币',
				  confirmText:'立即下载',
				  confirmColor:'#3CC51F',
          content: '剩余金币 : '+jianlishu,
				  success: function(res) {
					if (res.confirm) {
					  // console.log('用户点击确定')
					  var session_id = wx.getStorageSync('session_id')
					  // 获取数据
					  wx.request({
              url: 'https://www.mcmchw.com/index.php?m=Home&c=Mcmc&a=callphonezhubiao', //真实的接口地址
						  data: {
							'token':token,
						  },
						  method:'post',
						  header: {
							  'Content-Type': 'application/x-www-form-urlencoded',
							  'Cookie':'PHPSESSID='+session_id+'; path=/'
						  },
						  success: function(res) {
							// console.log(res.data)
							// 0,说明企业金币不够了
              console.log(res);
							if(res.data.status == 0){
							  wx.showModal({
								title: '提示',
								confirmText:'去充值',
								content: '您的可用金币不足',
								confirmColor:'#3CC51F',
								
								success: function(res) {
								  if (res.confirm) {
									// console.log('用户点击确定')
									wx.navigateTo({
									  url: '../pay/pay'
									})
								  }
								}
							  })
							}else{
							  
                wx.showToast({
                  title: '下载成功',
                  icon: 'success',
                  duration: 1500,
                  success:function(){
                      that.setData({
                        phone:res.data.phone,
                        look:1
                      })
                  }
                })
                //发送模板消息
                wx.request({
                  url: 'https://www.mcmchw.com/index.php?m=Home&c=Modenews&a=sendMessage',
                  method: 'post',
                  data: {
                    openid: res.data.openid,
                    template_id: 'KKqXeBf047vOwGnQkeVKzkXp2COvvXmgWbHGYVosB2U',
                    code: 2,
                    name: res.data.name,
                    haoma: res.data.haoma,
                    time: res.data.time,
                  },
                  header: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Cookie': 'PHPSESSID=' + session_id + '; path=/'
                  },
                  success: function (e) {

                    console.log(e);
                  }
                })

							}
						  },
						  // 接口调用失败
						  fail:function(){

						  },
						  complete:function(){
						  }
					  })
					}
				  }
				})
		}else{
      wx.makePhoneCall({
        phoneNumber: e.currentTarget.dataset.id    //
      })
    }
    
    
    
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})