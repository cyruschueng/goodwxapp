// pages/bindgroup/bindgroup.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    color1:'#999',
    color2:'#999',
    color3:'#999',
    name:'',info:'',phone:'',
    applea:[
      {img:'/pages/source/images/error-red.png',title:'审核未通过',info:'经审核您并非本群群主',color:'#ff0100'},
      { img: '/pages/source/images/ing.png', title: '正在审核中', info: '你提交的申诉正在审核', color: '#999' },
    ],
    status:2,
    appleaing:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    setTimeout(function(){
      if(getApp().globalData.userid){
        that.setData({
          loading:0
        })
        console.log(getApp().globalData.userid)
        wx.request({
          url: 'https://xcx.bjletusq.com/index.php/home/WeChatGroup/CheckBindingGroup',
          data: { user_id: getApp().globalData.userid,open_gid:123},
          header: { "Content-Type": "application/x-www-form-urlencoded" },
          method: 'POST',
          success: function(res) {
            switch(res.data.code){
              case 1:
                that.setData({
                  isbind:0
                })
              break;
              case 2:
                that.setData({
                  isbind:1
                })
              break;
              case 3:
                that.setData({
                  isbind:2,
                  appleaing:1,
                  status:1
                })
              break;
              case 4:
                that.setData({
                  isbind:2,
                  appleaing:1,
                  status:0
                })  
            }
          },
        })
      }
    },1000)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  isModel:function(){
    var that = this;
    that.setData({
      isModel:1
    })
  },
  close:function(){
    this.setData({
      isModel:0
    })
  },
  getName:function(e){
    var that = this;
    if(e.detail.value!=''){
      that.setData({
        name:e.detail.value
      })
    }
  },
  getPhone:function(e){
    var that = this;
    if(e.detail!=''){
      that.setData({
        phone:e.detail.value
      })
    }
  },
  getInfo:function(e){
    var that =this;
    if(e.detail.value!=''){
      that.setData({
        info:e.detail.value
      })
    }
  },
  bindGroup:function(){
    console.log(this.data)
    var that = this;
    that.setData({
      color1:'#999',
      color2:'#999',
      color3:'#999'
    })
    if(that.data.name==''||that.data.name==undefined){
      console.log(that.data.name)
      that.setData({
        color1:'red'
      })
      console.log(1)
    }else{
      console.log(that.data.name)
      if(that.data.info==''||that.data.info==undefined){
        console.log(that.data.info)
        that.setData({
          color3:'red'
        })
      }else{
        if (!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(that.data.phone))){
          console.log(that.data.phone)
          that.setData({
            color2:'red'
          })
        }else{
          // 提交
          var subData = {}
          subData.name = that.data.name;
          subData.phone = that.data.phone;
          subData.group_remark =that.data.info;
          subData.admin_user_id = getApp().globalData.shopId;
          // subData.open_gid = getApp().globalData.openGid;
          subData.open_gid = '123';
          subData.user_id = getApp().globalData.userid;
          wx.request({
            url: 'https://xcx.bjletusq.com/index.php/home/WeChatGroup/BindingGroup',
            method: 'POST',
            header: { "Content-Type": "application/x-www-form-urlencoded" },
            data:subData,
            success: res => {
              console.log(res)
            }
          })             
        }
       
      }
    }
  }
})