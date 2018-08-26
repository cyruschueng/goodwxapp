// pages/answer/answer.js
function trim(str) {
  return str.replace(/(^\s*)|(\s*$)/g, "");
}
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
    num: 0,
    id:'',
    is_anony: 1,
    is_open: 1,
    is_push:'',
    has_correct: 2,
    is_limit: 0,
    end_type: 1,
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
    disable: false,
    nums: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: getApp().appApi.getUserInfoAPI,
      data: {
        id: wx.getStorageSync('uid')
      },
      dataType: 'json',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token': wx.getStorageSync('token'),
        'uid': wx.getStorageSync('uid')
      },
      success: function (res) {
        console.log(res.data.result.item.department);
        console.log(res.data.result.item.username);
        if (res.data.result.item.department == null || res.data.result.item.username == null) {
          wx.showModal({
            title: '温馨提示！',
            content: '回答问卷前必须完善用户信息，是否完善？',
            success: function (res) {
              if (res.confirm) {
                wx.reLaunch({
                  url: '/pages/user/user',
                })
              } else if (res.cancel) {
                wx.redirectTo({
                  url: '/pages/answer/answer?id=' + that.data.id,
                })
              }
            }
          })
        }
      }
    });
    console.log(options.id);
    var that = this;
    that.setData({
      id: options.id
    });
    wx.request({
      url: getApp().appApi.detailAPI,
      data: {
        id: options.id
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
        }
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
          is_push: res.data.result.question.is_push
        });
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
  radioChange: function (e) {
    var key = e.currentTarget.dataset.key;
    // console.log(key);
    var nums = this.data.nums;
   nums[key].checked = e.detail.value;
   nums[key].answer = e.detail.value;
    this.setData({
      nums: nums
    });
  },
  checkboxChange: function (e) {
    var key = e.currentTarget.dataset.key;
    // console.log(key);
    // console.log(e.detail.value)
    var key = e.currentTarget.dataset.key;
    var nums = this.data.nums;
    var max = parseInt(nums[key].multi_limit) == 0 ? nums.length : parseInt(nums[key].multi_limit);
    var length = e.detail.value.length;
    var arr = e.detail.value;
    var count = nums[key].formate_option.length;
    if (nums[key].is_must == 1){
      if (length <= max) {
        for (var j = 0; j < count; j++) {
          nums[key].formate_option[j].check = false;
          nums[key].answer=[]
        }
        for (var i = 0; i < arr.length; i++) {
          nums[key].formate_option[arr[i]].check = true;
        }
        nums[key].answer = arr;
      } else {
        arr.shift();
        for (var j = 0; j < count; j++) {
          nums[key].formate_option[j].check = false;
          nums[key].answer = []
        }
        for (var i = 0; i < arr.length; i++) {
          nums[key].formate_option[arr[i]].check = true;
        }
        nums[key].answer = arr;
      }
    }else{
      for (var j = 0; j < count; j++) {
        nums[key].formate_option[j].check = false;
        nums[key].answer = []
      }
      for (var i = 0; i < arr.length; i++) {
        nums[key].formate_option[arr[i]].check = true;
      }
      nums[key].answer = arr;
    }
    console.log(arr);
    this.setData({
      nums: nums
    });
    // console.log(this.data.nums);
  },
  bindTextAreaBlur:function(e){
    var key = e.currentTarget.dataset.key;
    // console.log(key)
    var nums = this.data.nums;
    nums[key].answer = e.detail.value;
    this.setData({
      nums: nums
    });
    // console.log(this.data.nums);
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
  check:function(){
    var that = this;
    var arr=[];
    var nums = this.data.nums;
    var length = nums.length;
    for(var i=0;i<length;i++){
      if(nums[i].type==3){
        if (nums[i].is_must==1){
          if (nums[i].answer == undefined || !trim(nums[i].answer)) {
            wx.showToast({
              title: '第' + (i+1) + '题填空为空',
              image:'../../images/warn.png'
            });
            return false;
          }
        }
        if (nums[i].answer==undefined){
          arr[i] = ''
        }else{
          arr[i] = nums[i].answer;
        }
      }
      if(nums[i].type==1){
        if (nums[i].is_must == 1) {
          if (nums[i].answer == undefined) {
            wx.showToast({
              title: '第' + (i + 1) + '题单选未选',
              image: '../../images/warn.png'
            });
            return false;
          }
        }
        arr[i] = nums[i].answer;
      }
      if(nums[i].type==2){
        if (nums[i].is_must == 1) {
          if (nums[i].answer == undefined) {
            wx.showToast({
              title: '第' + (i + 1) + '题多选未选',
              image: '../../images/warn.png'
            });
            return false;
          }
          // if (nums[i].answer.length != nums[i].max){
          //   wx.showToast({
          //     title: '第' + (i + 1) + '题选数不符',
          //   });
          //   return false;
          // }
        }
       arr[i] = nums[i].answer;
      }
    }
    var end_json = {};
    // console.log(nums);
    for(var i=0;i<nums.length;i++){
      if (nums[i].answer){
        if (parseInt(nums[i].type)==1){
          end_json[nums[i].id] = parseInt(nums[i].answer)+1
        }
        if (parseInt(nums[i].type) == 3) {
          end_json[nums[i].id] = nums[i].answer
        }
        if (parseInt(nums[i].type) == 2) {
          var ar = nums[i].answer;
          var new_arr=[];
          // console.log(ar)
          for(var j=0;j<ar.length;j++){
            new_arr[j]=parseInt(ar[j])+1;
          } 
          var news = new_arr.sort(function(a,b){
            return parseInt(a)-parseInt(b)
          });
          // console.log(new_arr)
          end_json[nums[i].id] = news.join(',');
        }
      }else{
        end_json[nums[i].id] = ''
      }
    }
    
    console.log(JSON.stringify(end_json));
    wx.request({
      url: getApp().appApi.answerAPI,
      data: {
        question_id: that.data.id,
        uid: wx.getStorageSync('uid'),
        answer: JSON.stringify(end_json)
      },
      dataType: 'json',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token': wx.getStorageSync('token'),
        'uid': wx.getStorageSync('uid')
      },
      success: function (res) {
        console.log(res);
        if (res.data.code != 200) {
          wx.showModal({
            title: '提交失败！',
            content: res.data.msg,
            showCancel: false
          })
        }
        if (res.data.code == 1001) {
          getApp().userLogin();
          wx.navigateTo({
            url: '/pages/answer/answer?id=' + that.data.id,
          })
        }else{
          console.log(that.data.id);
          wx.navigateTo({
            url: '/pages/addsOver/addsOver?id=' + that.data.id,
          })
        }
      }
    });
  }
})