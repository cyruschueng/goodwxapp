var texts = [
  'cf1709     - 1  5   15135    05',
  'ma1709     1  8   2516     10',
  'sr1709     -1  7   6198     10',
  'ta1709      1 12   5140     05',
  'zc1709     -1  4   594      60',
  'bu1709      1  8   2578     10',
  'hc1709      1  5   4030     10',
  'i1709       1  3   598     100',
  'i1801       1  3   559     100',
  'j1709       1  1   2064    100',
  'jm1709      1  1   1267     60',
  'rb1710      1  5   4010     10',
  'ru1709      1  1   12890    10',
  '更多精彩，敬请联系.',
  'jarnar@qq.com.'
];

Page({
  data: {
    text: '',
    canAdd: true,
    canRemove: false
  },
  extraLine: [],
  add: function(e) {
    var that = this;
    this.extraLine.push(texts[this.extraLine.length % 15])
    this.setData({
      text: this.extraLine.join('\n'),
      canAdd: this.extraLine.length < 15,
      canRemove: this.extraLine.length > 0
    })
    setTimeout(function(){
      that.setData({
        scrollTop: 99999
      });
    }, 0)
  },
  remove: function(e) {
    var that = this;
    if (this.extraLine.length > 0) {
      this.extraLine.pop()
      this.setData({
        text: this.extraLine.join('\n'),
        canAdd: this.extraLine.length < 15,
        canRemove: this.extraLine.length > 0,
      })
    }
    setTimeout(function(){
      that.setData({
        scrollTop: 99999
      });
    }, 0)
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '数据参考',
      path: 'page/component/pages/text/text',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})
