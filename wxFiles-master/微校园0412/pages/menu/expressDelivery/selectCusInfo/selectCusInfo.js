// pages/wode/dizhi/dizhi.js
var app = getApp()
Page({
  data:{
    editIndex:0,
  delBtnWidth:150,
  shanchu:true,
  cusList: [],
  index: 0,
  selectOneInfo :{},
  },

  selectOne:function(e){
    var that = this;
    //1.获取当前选择联系人的下标
    var index = e.currentTarget.dataset.index;
    console.log("index"+ index);
    wx.getStorage({
      key: 'cusList',
      success: function(res){
        that.setData({
          selectOneInfo : res.data[index]
        });
        console.log(res.data[index]);
        console.log(that.data.selectOneInfo);
        wx.setStorage({
          key: 'selectOneInfo',
          data: that.data.selectOneInfo,
          success: function(res){
            wx.navigateBack({
              delta: 1, // 回退前 delta(默认为1) 页面
              success: function(res){
                // success
              },
              fail: function(res) {
                // fail
              },
              complete: function(res) {
                // complete
              }
            })
          },
          fail: function(res) {
            // fail
          },
          complete: function(res) {
            // complete
          }
        })

      },
      fail: function(res) {
        // fail
      },
      complete: function(res) {
        // complete
      }
    })

    
  },
  onLoad:function(options){
    var that = this;
    // 页面初始化 options为页面跳转所带来的参数
    console.log(getApp().data.cusListDB);
    // 1.从后台传过来的用户地址列表   cusListDB
    // 2.cusListDB缓存到wx的storage中key为cusList的变量
    wx.setStorage({
      key: 'cusList',
      data: getApp().data.cusListDB,
    })
    wx.getStorage({
      key: 'cusList',
      success: function(res){
       console.log(res.data);
      //  3.把wx.storage中cusList赋值给data.cusList
       that.setData({
         cusList : res.data
       });
       console.log(that.data.cusList);
      },
      fail: function(res) {
        // fail
      },
      complete: function(res) {
        // complete
      }
    });
    this.initEleWidth();
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
  },
 xinzengdizhi:function(){
   wx.navigateTo({
     url: '/pages/wode/xinzeng/xinzeng'
   })
 },
 touchS:function(e){
    if(e.touches.length==1){
      this.setData({
        //设置触摸起始点水平方向位置
        startX:e.touches[0].clientX
      });
    }
  },
  touchM:function(e){
    if(e.touches.length==1){
      //手指移动时水平方向位置
      var moveX = e.touches[0].clientX;
      //手指起始点位置与移动期间的差值
      var disX = this.data.startX - moveX;
      var delBtnWidth = this.data.delBtnWidth;
      var txtStyle = "";
      if(disX == 0 || disX < 0){//如果移动距离小于等于0，文本层位置不变
        txtStyle = "left:0px";
      }else if(disX > 0 ){//移动距离大于0，文本层left值等于手指移动距离
        txtStyle = "left:-"+disX+"px";
        if(disX>=delBtnWidth){
          //控制手指移动距离最大值为删除按钮的宽度
          txtStyle = "left:-"+delBtnWidth+"px";
        }
      }
      //获取手指触摸的是哪一项
      var index = e.target.dataset.index;
      var list = this.data.list;
      if(index>=0){
        list[index].txtStyle = txtStyle; 
        //更新列表的状态
        this.setData({
          list:list
        });
      }
    }
  },

  touchE:function(e){
    if(e.changedTouches.length==1){
      //手指移动结束后水平位置
      var endX = e.changedTouches[0].clientX;
      //触摸开始与结束，手指移动的距离
      var disX = this.data.startX - endX;
      var delBtnWidth = this.data.delBtnWidth;
      //如果距离小于删除按钮的1/2，不显示删除按钮
      var txtStyle = disX > delBtnWidth/2 ? "left:-"+delBtnWidth+"px":"left:0px";
      //获取手指触摸的是哪一项
      var index = e.target.dataset.index;
      var list = this.data.list;
      if(index){
        list[index].txtStyle = txtStyle;
        //更新列表的状态
        this.setData({
          list:list
        })

      }
    }
  },
  //获取元素自适应后的实际宽度
  getEleWidth:function(w){
    var real = 0;
    try {
      var res = wx.getSystemInfoSync().windowWidth;
      var scale = (750/2)/(w/2);//以宽度750px设计稿做宽度的自适应
      // console.log(scale);
      real = Math.floor(res/scale);
      return real;
    } catch (e) {
      return false;
     // Do something when catch error
    }
  },
  initEleWidth:function(){
    var delBtnWidth = this.getEleWidth(this.data.delBtnWidth);
    this.setData({
      delBtnWidth:delBtnWidth
    });
  },
  //点击删除按钮事件
  delItem:function(e){
    //获取列表中要删除项的下标
    var index = e.target.dataset.index;
    var list = this.data.list;
    //移除列表中下标为index的项
    list.splice(index,1);
    //更新列表的状态
    this.setData({
      list:list
    });
  }
})