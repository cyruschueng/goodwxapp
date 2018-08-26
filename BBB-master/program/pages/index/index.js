const util = require('../../utils/util.js')
let COIN;
//index.js
Page({
  data: {
    motto: '',
    coinName: ''
  },
  onShareAppMessage: function (res) {
    return {
      title: '币比比',
      path: '/pages/index/index',
      success(res) {
        var shareTicket = res.shareTickets[0] // 获取 shareTicket
        console.log(`shareTicket${shareTicket}`) // 你可以选择将这段代码取消注释，让 shareTicket 在控制台输出
        wx.getShareInfo({
          shareTicket: shareTicket,
          complete(res) {
            console.log(res) // 输出加密后的 openGId 信息
          }
        })
      }
    } 
  },
  getDate: function (date) {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    let time = ''
    if(month.length === 1 && day.lenth === 1) {
      time = year + '-' + month + '-' + day
    } else {
      time = year + '-0' + month + '-0' + day
    }
    return time
  },
 onLoad:function(){
    COIN = wx.getStorageSync('coin')
   wx.showShareMenu({
     withShareTicket: true //要求小程序返回分享目标信息
   })
   this.setData({
     coinName: COIN
   })
 },
  jumpResult:function(event){
   let type = event.currentTarget.dataset['type'],
        openid = wx.getStorageSync('openid');
   if(type == 1){
     util.requestPost(`main/loss/${openid}/${COIN}`,{},function(response){
       if(response.ok == true){
         wx.showToast({
           title: '投票成功',
           icon: 'succes',
           duration: 1000,
           mask: true
         });
         wx.setStorageSync('hasClick', true);
         wx.redirectTo({
           url: "/pages/voteresult/voteresult"
         })
       } else {
         wx.showToast({
           title: '该币种未被收录',
           icon: 'loading',
           duration: 1000,
           mask: true
         });
       }
     });
   }else if(type == 2){
     util.requestPost(`main/gain/${openid}/${COIN}`, {}, function (response) {
       if (response.ok == true) {
         wx.showToast({
           title: '投票成功',
           icon: 'succes',
           duration: 1000,
           mask: true
         }); 
         wx.setStorageSync('hasClick', true);
         wx.redirectTo({
           url: "/pages/voteresult/voteresult?checked=true"
         })
       }else{
         wx.showToast({
           title: '该币种未被收录',
           icon:'loading',
           duration: 1000,
           mask: true
         }); 
       }
     });
   }else{
     
     console.error('type error...');
   }
   
  }
})
