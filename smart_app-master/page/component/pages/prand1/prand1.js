
// var texts = String(floor(Math.random()));
var texts = [];
for (var i = 0; i < 100; i++) {
  texts[i] = String(Math.random());
  };

Page({
  data: {
    text: '',
    canAdd: true,
    canRemove: false
  },

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

  extraLine: [],
  add: function (e) {
    for (var i = 0; i < 100; i++) {
      texts[i] = String(Math.random());
    };
    var that = this;
    this.extraLine.push(texts[this.extraLine.length % 100])
    this.setData({
      text: this.extraLine.join('\n'),
      canAdd: this.extraLine.length < 100,
      canRemove: this.extraLine.length > 0
    })
    setTimeout(function () {
      that.setData({
        scrollTop: 99999
      });
    }, 0)
  },
  remove: function (e) {
    var that = this;
    if (this.extraLine.length > 0) {
      this.extraLine.pop()
      this.setData({
        text: this.extraLine.join('\n'),
        canAdd: this.extraLine.length < 100,
        canRemove: this.extraLine.length > 0,
      })
    }
    setTimeout(function () {
      that.setData({
        scrollTop: 99999
      });
    }, 0)
  },
  restart: function (e) {
    console.log(texts);
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '数字抽签',
      path: 'page/component/pages/prand1/prand1',
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
  }
})
