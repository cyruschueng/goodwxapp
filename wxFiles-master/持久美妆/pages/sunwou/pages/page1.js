//页面首次加载时调用
function onLoad(that,page){
  console.log('onload')
  that.data.page1.onLoad = true;
  that.setData({
    
  })
}
//每次回到页面时调用
function onShow(that,page){
  console.log('onshow')
}
//下拉刷新
function onPullDownRefresh(that, page){
  console.log('onPullDownRefresh')
}
//上拉刷新
function onReachBottom(that,page){

}
//分享
function onShareAppMessage(that,page){
  return {
    path:'/pages/index/index?page='+that.data.page,
    title:'首页'
  }
}
function setLocation(that,index){
  console.log(index)
  wx.chooseLocation({
    success: function(res){
      that.data.page1.contentList[index].config.data.locationName = res.name;
      console.log(res)
      that.setData({
        page1: that.data.page1
      })
    }
  })  
}
module.exports = {
  onLoad: onLoad,
  onShow: onShow,
  onPullDownRefresh: onPullDownRefresh,
  onReachBottom, onReachBottom,
  onShareAppMessage: onShareAppMessage,
  setLocation:setLocation
}