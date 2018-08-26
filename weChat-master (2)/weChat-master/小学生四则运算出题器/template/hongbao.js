function hongbaoClick(e) {
  var tmp='';
  var url = getApp().globalData.host +'/GetDiscription'
  wx.request({
    url: url,
    method: 'POST',
    data: {page: 'hongbao'},
    header: { 'content-type': "application/x-www-form-urlencoded" },
    success: function(e) {
      var data=e.data;
      wx.setClipboardData({
        data: data,
      });
      wx.showModal({
        title: '复制成功',
        content: '请打开支付宝领取红包',
        showCancel: false,
        confirmText: '知道了'
      });
    }
  });
  
}
module.exports.hongbaoClick=hongbaoClick;