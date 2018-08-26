var util = require('../../utils/util.js');
var app = getApp();
var sign_key = app.globalData.sign_key;
var shelfUrl = app.globalData.shelfUrl;
var canTap = true,cid;
Page({
  /**
   * 页面的初始数据
   */
  data: {
      books:[],
      cidText:'Level aa - 学龄前',
      upStatus:true,
      modalStatus:true,
      is_read:true,
      isIpx:app.globalData.isIpx?true:false,
      moStatus:false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
        console.log(options);
        cid = parseInt(options.cid)||3;
        switch (cid){
            case 3:this.setData({cidText:'Level aa - 学龄前'});break
            case 4:this.setData({cidText:'Level A - 小学一年级'});break
            case 5:this.setData({cidText:'Level B - 小学二年级'});break
            case 6:this.setData({cidText:'Level C - 小学三年级'});break
            case 7:this.setData({cidText:'Level D - 小学四年级'});break
            case 8:this.setData({cidText:'Level E - 小学五年级'});break
            case 9:this.setData({cidText:'Level F - 小学六年级'});break
            default:break;
        }
  },
    toReading:function (e) {
      console.log(canTap);
      if(canTap){
          canTap = false;
          var book_id = e.currentTarget.dataset.bookId;
          var book_pic = e.currentTarget.dataset.bookPic;
          wx.navigateTo({
              url: '../../pages/reading/reading?id='+book_id+'&pic='+book_pic,
          });
      }
    },
    getBooks:function (cid) {
        console.log('cid',cid);
        var member_id = wx.getStorageSync('memberId');
        var s = "cid"+cid+"member_id"+member_id+sign_key;
        var sign = util.SHA256(s);
        var str = "?cid="+cid+"&member_id="+member_id+"&sign="+sign;
        var that = this;
        wx.showLoading({
            title: '加载绘本..',
        });
        console.log(shelfUrl+str);
        wx.request({
            url: shelfUrl+str,
            success: function (res) {
                console.log(res);
                wx.hideLoading();
                that.setData({
                    books:res.data.data.rows
                })
            },
            fail:function () {
                console.log('fffff')
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
      canTap = true;
      if(cid){
          this.getBooks(cid);

      }else {
          cid = parseInt(wx.getStorageSync('cid'));
          this.getBooks(cid);
      }
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
      // canTap = true;
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
  onShareAppMessage: function (res) {
      return {
          title: '海量绘本，纯正美式发音，等你来读',
          path: '/pages/index/index?to=index',
          imageUrl:'/images/index/share_index.png',
          success: function(res) {
              console.log(res);
          },
          fail: function(res) {
              console.log(res);
          }
      }
  }
})