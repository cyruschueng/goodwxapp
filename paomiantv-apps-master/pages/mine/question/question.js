//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    openItem: -1, // 展开的问题索引
    questionList: [
      { title: 'Q1: 小程序活动介绍：', des: '（1）用户下载“泡面短视频”app. \n（2）登陆且绑定微信号.\n（3）活动期内（2月13日-2月22日）在“泡面短视频”录制发布第一条视频后赢取免费红包.\n（4）分享至微信群即可与好友一起抢泡面短视频准备的平台总额10万的红包' },
      { title: 'Q2：如何联系客服？', des: 'A：点击【我的】-【客服】进入客服系统；客服在线时间10点~19点', open: false },
      { title: 'Q3：提现多久到账？', des: 'A：申请提现后会在1~5个工作日转到您的微信钱包' },
      { title: 'Q4：提现会收取服务费吗？', des: 'A：提现收取2%的服务费' },
      { title: 'Q5：如何提现？', des: 'A：点击【我的】-【我的余额】进行提现，提现最低2元起提' },
      { title: 'Q6：未领取红包如何处理？', des: 'A：未领取红包将于48小时后退至您的小程序余额中' },
      { title: 'Q7：好友可以转发我的红包吗？', des: 'A：可以，点击红包领取页面中的转发可转发给其他用户' },
      { title: 'Q8：我在泡面短视频APP发了多个视频，怎么只能发一个红包？', des: 'A：活动期内（2月13日-2月22日），只有在“泡面短视频”录制发布【第一条视频】可以赢取免费红包哦' },
      { title: 'Q9：设置完扣款成功但未完成发送的红包，在哪里找回？', des: 'A：点击【我的】-【记录】可以找到未发送红包，转发即可。' },
      { title: 'Q10：我的微信怎么无法绑定？', des: 'A：联系客服，提供微信号和手机号，技术人员于三个工作日内会为您解决该问题。' },
      {
        title: 'Q11：泡面短视频介绍', des: 'A：泡面短视频-短视频互动交友社区搞笑鬼畜有脑洞，影视片段加不停！Ps：下载APP前，请先丢弃“偶像包袱”。像贴纸一样简单的在视频中加入各种影视小片段。海量影视片段、鬼畜素材、表情包……只要你来拍，秒变段子手~' },

    ]
  },
  openItem: function (e) {
    var _self = this;
    var currentItemId = e.currentTarget.dataset.id;
    if (_self.data.openItem !== currentItemId) { // 如果当前点击打开的item与以展开的不相等，更换openItem值
      _self.setData({
        openItem: currentItemId,
      })
      console.log(_self.data.openItem)
    } else {
      _self.setData({
        openItem: -1,
      })
    }
    /*_self.setData({
        questionList: currentItem,
    })*/
  },
  onLoad: function () {

  }
})
