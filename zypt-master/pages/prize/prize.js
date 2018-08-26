// 抽中产品列表
var app = getApp();
var util = require('../t.js');
Page({
  data: {
    rule_list_content:"",
    ismodal:false,
    modaltitle:'',
    prize:'',
    modalcontent:'',
    indexs:0,
    pageNum:'',
    totalNam:''
  },
  onShareAppMessage: function () {
    return {
      title:'我的奖品',
      path: '/pages/game/game',
      success: function (res) {
        console.log(1)
      },
      fail: function (res) {
        console.log("失败")
      }
    }
  },
  onLoad () {
    var that=this;
    wx.request({//服务器上面自动修改文字
      url: app.globalData.apiBase + "/index.php/weixin/prizeText.html",
      method: 'GET',
      dataType: 'json',
      success: function(res) {
        that.setData({ prizeText:res.data})
      },
      
    })
    var info = wx.getStorageSync('flag');
    if (info != 3) {
      util.islogin();//判断是否是登录状态
    } else{
      load(this)//加载数据
    }
   
  },
  onPullDownRefresh () {//下拉刷新
    var info = wx.getStorageSync('flag');
    if (info != 3) {
      util.islogin();//判断是否是登录状态
    } else {
      load(this)//加载数据
    }
  },
  showdetail(event){//显示商品的详情
    let detail = [];
    if (event.currentTarget.dataset) {
      detail = event.currentTarget.dataset;
      this.setData({ ismodal: true })
      this.setData({
        prize: detail.prize,
        modaltitle: detail.good_name,
        modalcontent: detail.dsc.replace(/<br\/>/g,' \n')
      })
    }
  },
  send(event){
    wx.showModal({
      title: '提示',
      content: '请扫描二维码下载APP',
      confirmText: '确认',
      success: function(res) {
        if (res.confirm) {
          wx.navigateTo({
            url: "/pages/download/download",
          }) 
        }
      },  
    })
    

    /*let detail = '';
    let that=this;
    if (event.currentTarget.dataset) {
      detail = event.currentTarget.dataset;
     // console.log(detail)
     wx.request({
       url: app.globalData.apiBase +"/index.php/app/getproductId.html",
       data: { id: detail.id},
       success(res){
        let d = res.data.replace(/^\(|\)$/g, '');
        var info = wx.getStorageSync('ptuserinfo');//获取本地缓存
        var cDate = new Date((info.createdDate).replace(/-/g, "/")).getTime();//注册时间
        var stdt = new Date(2017, 9, 27).getTime();//平台关闭时间
        let s_href = "../order/order?skuId=" + d.productId;
        if (stdt > cDate) {//开放时间大于注册时间                      
            wx.navigateTo({
              url: s_href,
            }) 
          } else {
          if (info.rank == 2) {
              wx.navigateTo({
                url: s_href,
              }) 
          } else if (info.rank == 1) {
            if (info.white != 1 || info.white == 2) {
               wx.navigateTo({
                 url: s_href,
               }) 
            } else if (info.white == 0) {
              if (invitationCode == 0) {
                 wx.navigateTo({
                   url: "http://zhongyouapp.com/game/membertype",//页面没有做
                 })  
              } else if (invitationCode == 7) {
                 
                   wx.navigateTo({
                     url: "http://zhongyouapp.com/game/membertype",//页面没有做
                   }) 
                 
               } else {
                 wx.navigateTo({
                   url: s_href,
                 })
               }
             }
           }
         }
       }
     })
    }*/
  },
  modalhide() { //弹出窗口
    this.setData({
      ismodal: false,
    })
  },
  bindPickerChange: function (e) {//加载多页数据
    this.setData({
      indexs: e.detail.value
    }),
    load(this)//加载数据
  },
})



function load(self){
  wx.showLoading({
    title: '加载中',
  })
  wx.request({
    url: app.globalData.apiBase +"index.php/app/prize.html",
    data: {
      uid: app.globalData.uid,
      p: self.data.indexs*1+1
    },
    success: function (res) {
      wx.hideLoading()
      let d = res.data.replace(/^\(|\)$/g, '');
      let li = JSON.parse(d)

      if (li.data) {
        let pagenum = [];
        for (let i = 0; i < li.num;i++){
          pagenum[i]='第'+(i+1)+'页'
        }  
        self.setData({ 
          rule_list_content: li.data,
          pageNum: pagenum,
          totalNam: li.num
        })
      }else{
        self.setData({unde:true})
      }
      wx.stopPullDownRefresh()//停止刷新
    }
  })

}
/*onPullDownRefresh: function () {//下拉刷新
  load(this);
}*/