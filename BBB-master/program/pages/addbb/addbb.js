const util = require('../../utils/util.js')
// pages/addbb/addbb.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchValue:'',
    currentState:false,
    all: {
      gain: '0%',
      loss: '0%'
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showShareMenu({
      withShareTicket: true,
      success: function (res) {
        // 分享成功
        console.log('shareMenu share success')
        console.log('分享' + res)
      },
      fail: function (res) {
        // 分享失败
        console.log(res)
      }
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
    let coinName = this.data.searchValue;
    return {
      title: coinName,
      path: `/pages/voteresult/voteresult?coin=${coinName}`,
      success: function (res) {
        console.log('shareTickets' + res.shareTickets[0])
        // console.log
        wx.getShareInfo({
          shareTicket: res.shareTickets[0],
          success: function (res) { console.log(res) },
          fail: function (res) { console.log(res) },
          complete: function (res) { console.log(res) }
        })
      },
      fail: function (res) {
        // 分享失败
        console.log(res)
      }
    }
  },
  jumpResult: function (event) {
    let type = event.currentTarget.dataset['type'],
        openid = wx.getStorageSync('openid'),
        code = this.data.searchValue;
    if (type == 1) {
      util.requestPost(`main/loss/${openid}/${code}`, {}, function (response) {
        wx.setStorageSync('hasClick', true);
        if (response.ok == true) {
          wx.showToast({
            title: '投票成功',
            icon: 'succes',
            duration: 1000,
            mask: true
          });
        } else {
          wx.showToast({
            title: response.message,
            icon: 'loading',
            duration: 1000,
            mask: true
          });
        }
      });
    } else if (type == 2) {
      util.requestPost(`main/gain/${openid}/${code}`, {}, function (response) {
        if (response.ok === true) {
          wx.setStorageSync('hasClick', true);
          wx.showToast({
            title: '投票成功',
            icon: 'succes',
            duration: 1000,
            mask: true
          });
        } else {
          wx.showToast({
            title: response.message,
            icon: 'loading',
            duration: 1000,
            mask: true
          });
        }
      });
    } else {
      console.error('type error...');
    }
    setTimeout(function(){
     // wx.navigateTo({
      //  url: "/pages/voteresult/voteresult?checked=true"
     // });
    },2000);
  },
  searchHandle: function (e) {
    this.setData({
      searchValue: e.detail.value
    }) 
    if (this.data.searchValue === '') {
      wx.showModal({
        title: '提示',
        content: '请输入要比的币', 
      }) 
    } else {
      var that = this;
      let openid = wx.getStorageSync('openid')
      util.requestGet(`main/getCoin/${that.data.searchValue}`, function (response) {
        console.log(JSON.stringify(response))
        if(response.ok === true){
          console.log(`main/getLastPeriodsInfo/${openid}/${that.data.searchValue}`);
          util.requestGet(`main/getLastPeriodsInfo/${openid}/${that.data.searchValue}`, function (response) {
            console.log(JSON.stringify(response))
            let status = response.details.info;
            that.setData({
              currentState : true
            })
            if(status == 0){
              that.setData({
                isNote:false
              })
            }else{
              that.setData({
                isNote: true
              })
              that.getAllInfo();
            }
           
          });
        }else{
          that.setData({
            currentState: false
          })
          wx.showToast({
            title: response.message,
            icon: 'loading',
            duration: 1000,
            mask: true
          });
        }
      })
    }
  },
  getAllInfo: function () {
    let that = this;
    let key = String(this.data.searchValue).toUpperCase();
    util.requestGet(`main/getOne/${key}`, function (response) {
      let all = response.details.info,
        gain = parseFloat(all.gain / all.total * 100).toFixed(2) + '%',
        loss = parseFloat(all.loss / all.total * 100).toFixed(2) + '%';

      all.gain = gain;
      all.loss = loss;

      that.setData({
        all: all
      });
    })
  }
})