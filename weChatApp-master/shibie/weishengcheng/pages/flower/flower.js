// pages/flower/flower.js
var api = require('../../api.js');
var Zan = require('../../zanui/index');
var bgDataFlower = require('../../utils/dataFlower.js')
var homePageDataFlower = require('../../utils/HomeDataFlower.js')
var bgDataPet = require('../../utils/dataPet.js')
var homePageDataPet = require('../../utils/HomeDataPet.js')
var isPet = 0;
var app = getApp();
Page(Object.assign({}, Zan.Toast,{

  /**
   * 页面的初始数据
   */
  data: {
    homePageData:[],
    isShow: false,
    url: '',
    rate:'',
    name:'',
    color:'#5dc981',
    originData:"",
    data:"",
    flowerBoxTop:"700rpx",
    buttonName:"全部图片",
    imgNumber:5,
    scrollTop:-70,
    background:[]
    
    
  },
 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    // console.log("options",options)
    // console.log(homePageData)
    var that = this
    that.setData({
      deepBack:false
    })
    if (options.cart == 1) {
      that.setData({
        background:bgDataPet.data,
        homePageData:homePageDataPet.data,
      })
      isPet = 1;
      wx.setNavigationBarTitle({
        title:'宠物识别'
      })
      wx.setNavigationBarColor({
        frontColor:'#ffffff',
        backgroundColor:'#f09636'
      });
      this.setData(
        {
          // imageName:'宠物识别',
          // imageContent:'地球上的纯种宠物我都认得了，发我一张试试吧',
          // imageUrl:'http://pics.maiyizhi.cn/tupianshibie_pet.png',
          color:'#f09636',
        }
      )
    }else{
      that.setData({
        background:bgDataFlower.data,
        homePageData:homePageDataFlower.data,
      })
    }


    if (options.src !== undefined ) {
      this.setData(
        {
          isShow:true,
          url:getApp().globalData.localImgUrl
        }
      )
      wx.showNavigationBarLoading();
      wx.showToast({
        title: '处理中……',
        duration:20000,
        icon: 'loading'
      })
      // if (options.cart == 1) {

        wx.request({
          url:"https://denghao.me/special/app-photo-tell/analyse.php",
          data:{
            path:options.src,
            tag:"all",
          },
          method:"GET",
          success(res){
            wx.hideNavigationBarLoading();
            wx.hideToast();
            var data = res.data.data.detail;
            console.log("newurl",res)
            data.forEach((item)=>{
              if(item.desc==null){
                item.desc="暂无介绍"
              }
            })
            var length = data[0].desc[0].length;
            
            if(length >1){
                  wx.hideNavigationBarLoading();
                  wx.hideToast();
                  that.showZanToast("请上传清晰的图片");
                  setTimeout(function () {
                      that.setData({
                        isShow:false,
                        deepBack:true
                      })
          
                  },2000);
                  return;
              }

            data.forEach((item,index)=>{
               if(index>5){
                   var rat = that.getRandom(6);
                   item.rat = rat;
               }else{
                 var rat = that.getRandom(index);
                 item.rat = rat;
               }
             })

            that.setData(
              {
                data:data,
                deepBack:true
              }
            )
            
          },
          fail(res){
            wx.hideNavigationBarLoading();
            wx.hideToast();
            console.log()
            that.showZanToast("请上传清晰的图片");
            setTimeout(function () {
                that.setData({
                  isShow:false,
                  deepBack:true
                })
            },2000);
          
          }
        })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (options) {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
     // wx.navigateBack({
     //    delta:100,
     //  })
    console.log("this.data.isShow",this.data.isShow)
    if(this.data.deepBack==true){
      wx.navigateBack({
        delta:100,
      })
      // wx.redirectTo({
      //   url:"/pages/flower/flower",
      // }) 
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title:'这个识别'+(isPet?'宠物品种':'花草')+'的小程序太准了',
      path: "/pages/flower/flower?cart="+isPet
    }
  },
  uploadOriginalImage: function () {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      count:1,
      success: function (res) {
        console.log("res.tempFilePaths[0]",res.tempFilePaths[0])
        that.afterAvatarChoose(res.tempFilePaths[0]),
        getApp().globalData.localImgUrl = res.tempFilePaths[0]; 
        
      }
    })
  },

  afterAvatarChoose: function (localPic) {
    var cart = 0;
    if (isPet == 1) {
      cart = 1;
    }
    wx.navigateTo({
      url: '/pages/cutInside/cutInside?src='+localPic+'&source='+7+'&cart='+cart
    })
  },

  cancel: function () {
    this.setData(
      {
        isShow: false
      }
    )
  },

currentChange(event){
  console.log(detail)
  var detail = event.detail;
  var dataLength = this.data.data.length;
  var current =this.data.currentIndex;
  this.setData({
      scrollTop:-70,
      imgNumber:5,
      buttonName:"全部图片",
  });
 },

toggleImage(){
  
  if(this.data.buttonName==="收起图片"){
    this.setData({
      imgNumber:5,
      buttonName:"全部图片"
    })
   
  }else if(this.data.buttonName==="全部图片"){
    this.setData({
      imgNumber:20,
       buttonName:"收起图片"
    })
  }
 
},
getRandom(index){
  var i = index+1
  var random = Math.random();
  var rat = (random+(10-i))*10;
  rat = Math.floor(rat);
  return rat;
}

}))