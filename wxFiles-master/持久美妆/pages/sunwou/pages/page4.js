//页面首次加载时调用
function onLoad(that, page) {
  console.log('onload')
  that.data.page4.onLoad = true;
  that.setData({

  })
}
//每次回到页面时调用
function onShow(that, page) {
  console.log('onshow')
}
//下拉刷新
function onPullDownRefresh(that, page) {
  console.log('onPullDownRefresh')
}
//上拉刷新
function onReachBottom(that, page) {

}
//分享
function onShareAppMessage(that, page) {
  return {
    path: '/pages/index/index?page=' + that.data.page,
    title: '课程'
  }
}
module.exports = {
  onLoad: onLoad,
  onShow: onShow,
  onPullDownRefresh: onPullDownRefresh,
  onReachBottom, onReachBottom,
  onShareAppMessage: onShareAppMessage
}