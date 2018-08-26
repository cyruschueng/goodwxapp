Page({

  /**
   * 页面的初始数据
   */
  data: {
    logo: '',
    avatar: '',
    nickName: '',
    title: '',
    describe: '',
    time: '',
    num: '',
    end_type: 1,
    is_anony: 1,
    is_open: 1,
    has_correct: 2,
    is_limit: 0,
    is_derive:1,
    type_nums: [
      { name: 'A' },
      { name: 'B' },
      { name: 'C' },
      { name: 'D' },
      { name: 'E' },
      { name: 'F' },
      { name: 'G' },
      { name: 'H' },
      { name: 'I' },
      { name: 'J' },
      { name: 'K' },
      { name: 'L' },
      { name: 'M' },
      { name: 'N' },
      { name: 'O' },
      { name: 'P' },
      { name: 'Q' },
      { name: 'R' },
      { name: 'S' },
      { name: 'T' },
      { name: 'U' },
      { name: 'V' },
      { name: 'W' },
      { name: 'X' },
      { name: 'Y' },
      { name: 'Z' }
    ],
    id:'',
    disable: false,
    create:true,
    nums: [],
    mycreate:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      id: options.id
    });
    wx.request({
      url: getApp().appApi.resultAPI,
      data: {
        id: options.id,
        uid: wx.getStorageSync('uid') 
      },
      dataType: 'json',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token': wx.getStorageSync('token'),
        'uid': wx.getStorageSync('uid')
      },
      success: function (res) {
        if (res.data.code != 200) {
          wx.showModal({
            title: '请求失败！',
            content: res.data.msg,
            showCancel: false
          })
        }else{
          console.log(res.data.result)
          that.setData({
            nums: res.data.result.option_list,
            logo: res.data.result.question.img,
            title: res.data.result.question.title,
            describe: res.data.result.question.describe,
            num: res.data.result.question.join_total,
            is_open: res.data.result.question.is_open,
            has_correct: res.data.result.question.has_correct,
            is_anony: res.data.result.question.is_anony,
            time: res.data.result.question.add_time,
          });
          try {
            var ui = wx.getStorageSync('uid');
            console.log('用户' + ui);
            if (!ui) {
              getApp().userLogin();
              wx.navigateTo({
                url: '/pages/result/result?id=' + that.dataset.id,
              })
            } else {
              if (ui == res.data.result.question.uid) {
                that.setData({
                  create: true,
                  mycreate:true
                });
              } else {
                if (res.data.result.question.is_open == 2) {
                  that.setData({
                    create: false
                  })
                }else{
                  that.setData({
                    create: true
                  })
                }
              }
            }
          } catch (e) {

          }
        }
      }
    });
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
  switchChange:function(e){
    this.setData({
      transpond: e.detail.value
    });
  },              
  review: function (e) {
    var nums = this.data.nums;
    var myObj = nums[e.currentTarget.dataset.keys].formate_option;
    var len = myObj.length;
    var myArr = [];
    for (var i = 0; i < len; i++) {
      myArr.push(myObj[i].file);
    }
    wx.previewImage({
      current: myArr[e.currentTarget.dataset.current],
      urls: myArr
    })
  },
  show:function(e) {
    var nums = this.data.nums;
    if (nums[e.currentTarget.dataset.id].show){
      nums[e.currentTarget.dataset.id].show = false;
    }else{
      nums[e.currentTarget.dataset.id].show = true;
    }
    
    console.log(e.currentTarget.dataset.id);
    this.setData({
      nums:nums,
    })
  },
  shift:function () {
    this.setData({
      show:false,
      go_del: true,
      go_over: true
    })
  },
  shift_two:function () {
    this.setData({
      show:true,
      go_del: false,
      go_over: false
    })
  },
  mycreate:function(){
    var that = this;
    wx.redirectTo({
      url: '/pages/derive/derive?id='+that.data.id,
    })
  }
  // check:function(){
  //   var arr=[];
  //   var nums = this.data.nums;
  //   var length = nums.length;
  //   for(var i=0;i<length;i++){
  //     if(nums[i].type==3){
  //       arr[i] = nums[i].answer;
  //     }
  //     if(nums[i].type==1){
  //       arr[i] = nums[i].answer;
  //     }
  //     if(nums[i].type==2){
  //       arr[i] = nums[i].answer;
  //     }
  //   }
  //   console.log(arr);
  // }
})