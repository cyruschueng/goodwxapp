var common=require('../../common/common.js')
var app = getApp()
Page({
  data:{
    time:'',
    shiborData:[],
    src:'',
    showLoading:true,
    isShow:false
  },
  onLoad:function(){
    this.shiborData()
  },
  //转发
  onShareAppMessage:function(res){
    return {
      title: '最新shibor利率',
      path: `/page/shibor/shibor`,
      success: res=> {},
      fail:res=>{}
    }
  },
  shiborData:function(){
    wx.request({
      method:'GET',
      url: common.getRequestUrl+'/dtk/search/shibor',
      header:{
        'content-type': 'application/x-www-form-urlencoded'
      },
      success:res=>{
        this.setData({
          showLoading:false,
          isShow:true
        })
        if(res.data.code!=='OK'){
          wx.showToast({
            title:res.data.msg,
            image:"../../image/warn.png",
            duration:2000
          })
        }else{
          var data=res.data.shibor
          for(let i=0;i<data.length;i++){
            if(data[i].value>0){
              data[i].vary='../../image/up.png'
            }else if (data[i].value==0){
              data[i].vary='../../image/unbiased.png'
            } else{
              data[i].vary='../../image/down.png'
            }
            data[i].value=Math.abs(data[i].value)
          }

          this.setData({
            time:res.data.date,
            shiborData:data
          })
        }
      }
    })
  }
})
