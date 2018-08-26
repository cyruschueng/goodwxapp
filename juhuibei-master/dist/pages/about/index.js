export default Page({
  data: {
    '__code__': {
      readme: ''
    }
  },
  onShareAppMessage: function () {
    return {
      title: '关于聚会呗',
      path: '/pages/about/index'
    };
  }
});