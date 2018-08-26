module.exports = {
  onShareAppMessage: function () {
    let imageUrl = 'https://wxapp.haizeihuang.com/wannengdequan_php/images/share.png';
    let title = '24小时随时答题夺金，对三道题就有奖金，答的多拿得多。';
    let path = 'pages/index/index?';
    return {
      title: title,
      path: path,
      imageUrl: imageUrl,
      success: function (res) { },
      fail: function (res) { }
    }
  }
}