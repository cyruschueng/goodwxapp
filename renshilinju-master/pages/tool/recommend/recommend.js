// pages/mine/recommend/recommend.js
var publicUrl = getApp();
var url = publicUrl.globalData.baseAPI;
var picUrl = publicUrl.globalData.picurl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading : false,
    name:'',
    tagslists: [],
    checkArrs: '',
    tel:'',
    beizhu:'',
    tags:'',
    showDialog: false,
    showDialogRight: false,
    showModalStatus: false,
    newbiaoqian:'',
    loading: false,
    post_id:0,
    items: [
      { name: '0', value: '美食', checked: false, },
      { name: '1', value: '开锁', checked: false, },
      { name: '2', value: '小时工', checked: false, },
      { name: '3', value: '做饭', checked: false, },
      { name: '4', value: '保洁', checked: false, },
      { name: '5', value: '维修', checked: false, },
      { name: '6', value: '疏通管道', checked: false, },
      { name: '7', value: '搬家', checked: false, },
      { name: '8', value: '回收', checked: false, },
      { name: '9', value: '开锁换锁', checked: false, },
      { name: '10', value: '宠物', checked: false, },
      { name: '11', value: '洗衣', checked: false, },
      { name: '12', value: '保姆', checked: false, },
    ],
    value:[]
  },
  checkChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e)
    var that = this
    that.setData({
      value: e.detail.value
    })
    console.log(this.data.value)
    var items = this.data.items;
    console.log(this.data.items)
    var checkArr = e.detail.value;
    console.log(e.detail.value)
    for (var i = 0; i < items.length; i++) {
      if (checkArr.indexOf(i + "") != -1) {
        items[i].checked = true;
      } else {
        items[i].checked = false;
      }
    }
    this.setData({
      items: items
    })
  },
  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    var that = this
    that.setData({
      value: e.detail.value
    })
    var items = this.data.tagslists;
    console.log(items.length)
    console.log(this.data.tagslists)
    var checkArr = e.detail.value;

    console.log(e.detail.value)
    that.setData({
      checkArrs: checkArr,
    })
  },
  powerDrawer: function (e) {
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu)
  },
  util: function (currentStatu) {
    /* 动画部分 */
    // 第1步：创建动画实例 
    var animation = wx.createAnimation({
      duration: 200, //动画时长 
      timingFunction: "linear", //线性 
      delay: 0 //0则不延迟 
    });

    // 第2步：这个动画实例赋给当前的动画实例 
    this.animation = animation;

    // 第3步：执行第一组动画 
    animation.opacity(0).rotateX(-100).step();

    // 第4步：导出动画对象赋给数据对象储存 
    this.setData({
      animationData: animation.export()
    })

    // 第5步：设置定时器到指定时候后，执行第二组动画 
    setTimeout(function () {
      // 执行第二组动画 
      animation.opacity(1).rotateX(0).step();
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象 
      this.setData({
        animationData: animation
      })

      //关闭 
      if (currentStatu == "close") {
        this.setData(
          {
            showModalStatus: false
          }
        );
      }
    }.bind(this), 200)

    // 显示 
    if (currentStatu == "open") {
      this.setData(
        {
          showModalStatus: true
        }
      );
    }
  } ,
  getnew:function(e){
    this.setData({
      newbiaoqian: newbiaoqian
    })
    console.log(this.data.newbiaoqian)
  },
  addNew:function(e){
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu)
  },
  back: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  setLoading: function (e) {
    this.setData({
      loading: !this.data.loading
    })
  },
  choose:function(e){
    
    console.log(e.currentTarget.dataset.text)
    this.setData({
      tags: e.currentTarget.dataset.text
    })
  },
  recommendPosts: function (event) {
    console.log(event)
    var that = this;
    var userInfo = publicUrl.globalData.userInfo
    if (that.data.name==''){
      wx.showToast({
        title: '请输入姓名！',
        icon: 'success',
        duration: 1500
      })
    }
    else if (that.data.tel.length == 0 || that.data.tel.length != 11) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'success',
        duration: 1500
      })
    }else{
      that.setData({
        loading: true,
      })
      wx.request({
        url: url + '/sermen',
        method: 'post',
        data: {
          xiaoquid: userInfo.xqid,
          userid: userInfo.id,
          name: that.data.name,
          phone: that.data.tel,
          desc: that.data.beizhu,
          tags: that.data.value
        },
        header: {
          'Accept': "*/*",
          'Authorization': 'Token ' + userInfo.thirdkey + ',userid=' + userInfo.id
        },
        success: function (res) {
          console.log(res.data);
          that.setData({
            post_id: res.data.post_id
          })
          wx.navigateTo({
            url: '/pages/home/topicDetail/topicDetail?id=' + that.data.post_id + '&path=' + 'fabu',
          })
        },
        fail: function (error) {
          console.log(error);
        }
      })

    }
    
    
    
    
  },
  name:function(e){
    this.setData({
      name: e.detail.value
    })
  },
  tel: function (e) {
    this.setData({
      tel: e.detail.value
    })
  },
  beizhu: function (e) {
    this.setData({
      beizhu: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(this.data.checkArrs)
    var userInfo = publicUrl.globalData.userInfo;
    var xqname = userInfo.xqname;
    var tagslists = [];
    var that = this;
    wx.setNavigationBarTitle({
      title: '生活推荐'
    })
    wx.request({
      url: url + '/tags',
      data: {
      },
      header: {
        'Accept': "*/*",
        'Authorization': 'Token ' + userInfo.thirdkey + ',userid=' + userInfo.id
      },
      success: function (res) {
        console.log(res.data);
        for (var i = 0; i < res.data.comments.length;i++){
          var tagslist={
            id: res.data.comments[i].id,
            name: res.data.comments[i].name,
            taggingscount: res.data.comments[i].taggings_count,
            checked: false,
          }
          tagslists.push(tagslist)
        }
        that.setData({
          tagslists: tagslists,
        })
      },
      fail: function (error) {
        console.log(error);
      }
    })
    // var userInfo = wx.getStorageSync('userInfo');

    console.log(userInfo.id)
    this.setData({
      xiaoquid: userInfo.xqid,
      xqname: xqname
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var userInfo = publicUrl.globalData.userInfo
    this.setData({
      xqname: userInfo.xqname
    })
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
  
  }
})