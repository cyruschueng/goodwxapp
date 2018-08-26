// page/component/pages/数字骰子/数字骰子.js
// var Bmob = require('../../utils/bmob.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pic: '../../resources/pic/num000000.png',
    canNum: 0,
    tnum: 0,
    snum: 0,
    canNum1: false,
    canNum2: false,
    canNum3: false,
    canNum4: false,
    canNum5: false,
    canNum6: false,
    canNum0: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showShareMenu({          
      withShareTicket: true,
    });
    
    // 转发到群组后打开 
    /** 判断场景值，1044 为转发场景，包含shareTicket 参数 */
    if (options.scene == 1044) {
      wx.getShareInfo({
        shareTicket: options.shareTicket,
        success: function (res) {
          var encryptedData = res.encryptedData;
          var iv = res.iv;
        }
      })
    };
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  // onReady: function () {

  // },

  /**
   * 生命周期函数--监听页面显示
   */
  // onShow: function () {

  // },

  /**
   * 生命周期函数--监听页面隐藏
   */
  // onHide: function () {

  // },

  /**
   * 生命周期函数--监听页面卸载
   */
  // onUnload: function () {

  // },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  // onPullDownRefresh: function () {

  // },

  /**
   * 页面上拉触底事件的处理函数
   */
  // onReachBottom: function () {

  // },

  sample: function (e) {
    var Num = Math.floor(Math.random() * 6 + 1);
    var picname;

    switch (Num) {
      case 0:
        picname = '../../resources/pic/num000000.png';
        canNum0 = true;
        // console.log(picname);
        break;
      case 1:
        picname = '../../resources/pic/num100000.png';
        // console.log(picname);
        break;
      case 2:
        picname = '../../resources/pic/num110000.png';
        // console.log(picname);
        break;
      case 3:
        picname = '../../resources/pic/num111000.png';
        // console.log(picname);
        break;
      case 4:
        picname = '../../resources/pic/num111100.png';
        // console.log(picname);
        break;
      case 5:
        picname = '../../resources/pic/num111110.png';
        // console.log(picname);
        break;
      case 6:
        picname = '../../resources/pic/num111111.png';
        // console.log(picname);
        break;
      default:
        picname = '../../resources/pic/num000000.png';
        // console.log(picname);
        break;
    };

    var that = this;
    console.log(that.data.tnum);
    this.setData({
      tnum: that.data.tnum + 1,
      pic: picname,
      canNum: Num,
    });
    if (this.data.canNum==6){
      console.log("You did!!");
      this.setData({
        snum: that.data.snum + 1,
        });
      wx.showToast({
        title: '成功',
        icon: 'success',
        duration: 2000
      });
    };

  },
  restart: function (e) {
    wx.clearStorage();
    var texts = Math.floor(Math.random() * 7 + 1);
    console.log(texts);
    this.setData({
      tnum: 0,
      snum: 0,
      pic: '../../resources/pic/num000000.png',
      canNum: 0,
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '六色拼盘，你要尝试几次？',
      path: 'page/component/pages/prand2/prand2',
      success: function (res) {
        console.log('转发成功');
        // 转发成功

        // 转发时获取群信息 
        var shareTickets = res.shareTickets;
        if (shareTickets.length == 0) {
          return false;
        };

        console.log('shareTickets\t' + shareTickets);
        console.log('shareTickets[0]\t' + shareTickets[0]);
        wx.getShareInfo({
          shareTicket: shareTickets[0],
          success: function (res) {
            var encryptedData = res.encryptedData;
            var iv = res.iv;
            console.log('iv\t' + iv);
          }
        });

      },
      fail: function (res) {
        // 转发失败
      }
    }

  },
  showShareMenu: function (res) {
    wx.showShareMenu({
      withShareTicket: true
    })
  }
})
