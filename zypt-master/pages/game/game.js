var app = getApp();
var util = require('../t.js');
var begin = null;
Page({
  data: {
    rulelist:[],
    showModal:false,//模态框不显示
    ismodal:false,
    ten_prize:false,
    one_prize: false,
    price:'',       //产品价格    
    modaltitle: '', //产品标题
    imgUrl:'',      //产品图片
    isbegin:false , //不出现遮罩层
    //isOpacity:false
    showNnm:null,
  },
  onLoad () {
    this.setData({ baseUrl: 'http://www.zyylpt.com/' })//设置全局的页面路径
    let that=this
    wx.request({
      url: app.globalData.apiBase+"index.php/app/jiangpin.html", 
      success:function(res){
        let d = JSON.parse(res.data.replace(/^\(|\)$/g, '')); 
        that.setData({rulelist:d.src})
      }
    })
  },
  onShareAppMessage: function () {
    return {}
  },
  one_prize(){ 
    //if (!app.globalData.trd_session) return //一次抽奖
    var info = wx.getStorageSync('flag');
    if (info != 3) {//判断是否登录
      util.islogin();
    } else {  
      if (!app.globalData.trd_session) {//一次抽奖
        return
      } 
      Twinkle(this)
      let that=this;
      wx.request({
        url: app.globalData.apiBase+"index.php/weixin/playone.html",
        data:{
          trd_session: app.globalData.trd_session
        },
        success:function(res){
          if (res.data.errmsg) { 
            clearInterval(begin);
            that.setData({ isbegin: false });
            wx.showToast({
              title: "您未登录",
              duration: 1000,
              icon: 'loading',
            })
            return   
           }
          clearInterval(begin); 
          var d = res.data.replace(/^\(|\)$/g, '');
          if(d==0){
            wx.showModal({
              title: '',
              content: '您的大米不足',
            })
          }else { 
            d=JSON.parse(d); 
            that.setData({ 
              modaltitle: d.good_name, 
              imgUrl: d.img_url,
              price: d.market_price,
              one_prize: true,  
              ismodal: true //模态框
            })
          }
          that.setData({isbegin: false }) 
        },
        fail: function (error) {
          clearInterval(begin); 
          that.setData({ isbegin: false }) //遮罩层
          console.log(error)
        }
      })
    }
  },
  ten_prize(){
   // if (!app.globalData.trd_session) return //抽奖
    var info = wx.getStorageSync('flag');
    if (info != 3) {
      util.islogin();//判断是否是登录状态
    }else{
      if (!app.globalData.trd_session) {//一次抽奖
        return
      } 
      Twinkle(this)
      let that = this;
      wx.request({
        url: app.globalData.apiBase +"index.php/weixin/ten.html",
        data: {
          trd_session: app.globalData.trd_session
        },
        success: function (res) {
          if (res.data.errmsg) {
            clearInterval(begin);
            that.setData({ isbegin: false });
            return
          }
          clearInterval(begin);
          let d = res.data.replace(/^\(|\)$/g, '');
          if (d == 0) {
            wx.showModal({
              title: '',
              content: '您的大米不足',
            })
          } else {
            d = JSON.parse(d)
            that.setData({
              imgUrl: d,            
              ten_prize: true      
            })
          }
          that.setData({
            isbegin: false
          })
        },
        fail: function (error) {
          clearInterval(begin); 
          that.setData({ isbegin: false }) //遮罩层
          console.log(error)
        }
      })
    }
  },
  free(){  //白拿跳转
    wx.redirectTo({
      url: '../free/free',
    })
  },
  listDetail(event){ //产品详情
    //console.log(event) 
    let detail=[];
    if(event.currentTarget.dataset){
      detail = event.currentTarget.dataset;
      this.setData({ 
        price: detail.price,
        modaltitle: detail.cot,
        imgUrl: detail.url,
        ismodal: true
      })
    }
  }, 
  modalhide() {//弹出窗口
    this.setData({ 
      ismodal: false ,
      one_prize:false,
      ten_prize:false,
    })
  },  
})

function Twinkle(self){ //跳动方法
  let len = self.data.rulelist.length  //奖品列表的长度
  self.setData({ isbegin:true});  //出现的遮罩层
  begin = setInterval(function(){ //设置定时器
    var num = Math.floor(Math.random() * len);
    self.setData({ showNnm: num})  //随机某个跳动
  }, 100);
}
