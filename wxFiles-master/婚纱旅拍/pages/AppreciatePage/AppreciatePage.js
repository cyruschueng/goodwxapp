// pages/AppreciatePage/AppreciatePage.js
//获取应用实例
var app = getApp()
Page({
  data: {
    ScrollTop:0,
    BackFlag:false,
    NavFlag:2,
      swiperCurrent:0,
      slider: [],
    IconList:[],
    articlelist:[],
    TextLeft:['一月客片','二月客片','三月客片','四月客片','五月客片','六月客片','七月客片','八月客片','九月客片','十月客片','十一月客片','十二月客片',],
    Month:['JANUARY WORKS','FEBRUARY WORKS','MARCH WORKS','APRIL WORKS','MAY','JUNE WORKS','JULY WORKS','AUGUST WORKS','SEPTEMBER WORKS','OCTOBER WORKS','NOVEMBER WORKS','DECEMBER WORKS'],
    classesid:0,
    cname:'',
  },
   //滑块指示
    swiperChange:function(e){
        this.setData({
    swiperCurrent: e.detail.current
  })
    },
   //显示，隐藏回到顶部 
  EventHandle:function(e){
    var that =this;
    console.log(e.detail.scrollTop)
    if(e.detail.scrollTop >= 710){
      that.setData({
        BackFlag:true
      })
    }else{
       that.setData({
        BackFlag:false
      })
    }
  },
  //回到顶部
  BackTop:function(){
 
    var that = this;
    that.setData({
      ScrollTop:0
    })
       console.log(that.data.ScrollTop)
  },
  //选项卡切换
  NavActive:function(e){
    wx.setStorageSync('NavFlag', e.currentTarget.id)
    wx.navigateBack({
      delta: 1, // 回退前 delta(默认为1) 页面
    })
  },
  //
  gotoAppreciateText:function(e){
    var that=this;
    console.log(e.currentTarget.id);
    var month=that.data.articlelist[e.currentTarget.id].mon;
    wx.navigateTo({
      url: '/pages/AppreciateText/AppreciateText?month='+month+'&classesid='+that.data.classesid,
    })
  },
  onLoad:function(option){
    var that=this;
    var id=option.id;
    var cname=option.cname;
    that.setData({
      cname:cname
      });
    that.data.classesid=id;
    var that=this;
    wx.request({
      url: app.globalData.IP+"wx/findarticlebypid.do?classesid="+id,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function(res){

            for(var i=0;i<res.data.length;i++)
            {
                     var item={mon:res.data[i].month,image:app.globalData.IP+"controller/"+res.data[i].image,text:'',text2:'',classesid:res.data[i].classesid};
                     var a=item.mon;
                     item.text=that.data.TextLeft[a-1];
                      item.text2=that.data.Month[a-1]; 
              that.data.articlelist=that.data.articlelist.concat(item);

            }
            that.setData({
              articlelist:that.data.articlelist
            })
            console.log(that.data.articlelist)
      },

    });
   
  }
})
