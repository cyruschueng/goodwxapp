// pages/answer/answer.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    is_anony:1,
    is_open:1,
    has_correct:2,
    transpond:true,
    show:true,
    go_del: false,
    logo: '',
    avatar: '',
    nickName: '',
    title: '',
    describe: '',
    time: '',
    num: 0,
    id:'',
    question_id:'',    
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
    is_push:'',
    is_answer:2
  }
  ,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    console.log(options.id);
    that.setData({
      question_id: options.id
    }); 
    wx.request({
      url: getApp().appApi.detailAPI,
      data:{
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
        console.log(res);
        if (res.data.code != 200) {
          wx.showModal({
            title: '请求失败！',
            content: res.data.msg,
            showCancel: false
          })
        }else{
          console.log(res);
          console.log(res.data.result.option_list)
          that.setData({
            is_answer: res.data.result.question.is_answer,
            nums: res.data.result.option_list,
            logo: res.data.result.question.img,
            title: res.data.result.question.title,
            describe: res.data.result.question.describe,
            num: res.data.result.question.join_total,
            is_open: res.data.result.question.is_open,
            has_correct: res.data.result.question.has_correct,
            is_anony: res.data.result.question.is_anony,
            is_push: res.data.result.question.is_push,
          });
        }
    }});
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
    console.log(e.detail.value);
    this.setData({
      transpond: e.detail.value
    });
    var that = this;
    console.log(e.detail.value)
    if (e.detail.value==true){
    wx.showModal({
      title: '友情提醒',
      content: '广场是一个公众区域，发布后所有人都可以看到并答卷哦，是否发布？',
      success: function (res) {
        if (res.confirm) {
          that.setData({
            is_push: 1
          });
          wx.request({
            url: getApp().appApi.pushAPI,
            data: { id: that.data.question_id },
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
              } else {
                wx.showToast({
                  title: '提交成功！',
                })
              }
            },
            fail: function (error) {
              wx.showModal({
                title: '提交失败！',
                content: error,
                showCancel: false
              })
              console.log(error);
            }
          })
        } else if (res.cancel) {
          that.setData({
            is_push: 2
          });
        }
      }
    })
    }else{
      wx.showModal({
        title: '友情提醒',
        content: '广场是一个公众区域，发布后所有人都可以看到并答卷哦，是否取消发布？',
        success: function (res) {
          if (res.confirm) {
            that.setData({
              is_push: 2
            });
            wx.request({
              url: getApp().appApi.pushAPI,
              data: { id: that.data.question_id },
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
                } else {
                  wx.showToast({
                    title: '提交成功！',
                  })
                }
              },
              fail: function (error) {
                wx.showModal({
                  title: '提交失败！',
                  content: error,
                  showCancel: false
                })
                console.log(error);
              }
            })
          } else if (res.cancel) {
            that.setData({
              is_push:1
            });
          }
        }
      })
    }
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
  goEidt:function(e) {
    var that = this;
    if (that.data.is_answer == 2) {
    wx.navigateTo({
      url: '/pages/addsEdit/addsEdit?id=' + e.currentTarget.dataset.id + '&question_id=' + that.data.question_id,
    });
    console.log(e.currentTarget.dataset.id)
    }else{
      wx.showModal({
        title: '温馨提示！',
        content: '该问卷已有用户回答,您只能添加或者删除问题，不能修改问题',
        showCancel:false
      })
    }
  },
  del:function(e){
    var that = this;
    console.log(that.data.is_answer);
    if (that.data.is_answer==1){
      wx.showModal({
        title: '温情提示',
        content: '该问卷已有用户回答,您只能添加或者删除问题，不能修改问题。是否删除此问题？',
        success: function (res) {
          if (res.confirm) {
            console.log(e.currentTarget.dataset.id);
            wx.request({
              url: getApp().appApi.delAPI,
              data: {
                id: e.currentTarget.dataset.id
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
                } else {
                  wx.request({
                    url: getApp().appApi.detailAPI,
                    data: {
                      id: that.data.question_id
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
                      console.log(res.data.result.option_list)
                      that.setData({
                        nums: res.data.result.option_list,
                      });
                    }
                  });
                }
              }
            });
          } else if (res.cancel) {

          }
        }
      })
    }else{
      wx.showModal({
        title: '温情提示',
        content: '删除问题将会删除该问题统计数据，是否删除？',
        success: function (res) {
          if (res.confirm) {
            console.log(e.currentTarget.dataset.id);
            wx.request({
              url: getApp().appApi.delAPI,
              data: {
                id: e.currentTarget.dataset.id
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
                } else {
                  wx.request({
                    url: getApp().appApi.detailAPI,
                    data: {
                      id: that.data.question_id
                    },
                    dataType: 'json',
                    method: 'POST',
                    header: {
                      'content-type': 'application/x-www-form-urlencoded',
                      'token': getApp().globalData.token,
                      'uid': getApp().globalData.uid
                    },
                    success: function (res) {
                      if (res.data.code != 200) {
                        wx.showModal({
                          title: '请求失败！',
                          content: res.data.msg,
                          showCancel: false
                        })
                      }
                      console.log(res.data.result.option_list)
                      that.setData({
                        nums: res.data.result.option_list,
                      });
                    }
                  });
                }
              }
            });
          } else if (res.cancel) {

          }
        }
      })
    }
  },
  review: function (e) {
    console.log(e.currentTarget.dataset.keys);
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
  shift:function () {
    this.setData({
      show:false,
      go_del: true,
      go_over: true
    })
  },
  back:function(){
    let that = this;
    // console.log(that.data.id)
    wx.navigateTo({  
      url: '/pages/create/create?id=' + that.data.question_id,
    });
  },
  shift_two:function () {
    this.setData({
      show:true,
      go_del: false,
      go_over: false
    })
  },
  go_add:function(){
    var that = this;
    wx.navigateTo({  
      url: '/pages/adds/adds?id=' + that.data.question_id,
    })
  },
  check:function(){
    var that = this;
    console.log(that.data.question_id);
    wx.navigateTo({
      url: '/pages/addsOver/addsOver?id=' + that.data.question_id,
    });
  }
})