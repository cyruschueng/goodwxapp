Page({
  data: {
    question: []
  },
  onLoad: function () {
    var self = this;
    // 页面设置
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#f5f5f5'
    });
    wx.setNavigationBarTitle({
      title: '口令红包-常见问题'
    });


    var list = [
      {
        "question":"微客来-语音口令怎么玩?",
        "answer":"你可以设置一个带奖励的语音口令，好友说对口令才能领到奖励",
        "open":false
      },
      {
        "question":"我支付了但没有发出去?",
        "answer":"请在主页的【我的记录】中找到相应的记录，点击进入详情后点击【去转发】可把口令转发给好友或群，你也可以生成朋友圈分享图后发朋友圈",
        "open":false
      },
      {
        "question":"好友可以转发我的口令吗?",
        "answer":"可以的，您分享给好友或者转发到微信群的语音口令，其他好友均可再次转发",
        "open":false
      },
      {
        "question":"发口令会收取服务费吗?",
        "answer":"发语音口令会收取2%的服务费",
        "open":false
      },
      {
        "question":"发语音口令会收取2%的服务费",
        "answer":"未领取的金额将于24小时后退至微客来小程序余额；同时，未领取金额的服务费也将全部退回",
        "open":false
      },
      {
        "question":"如何提现到微信红包?",
        "answer":"在主页的【提现】或详情页的【去提现】均可跳转至余额提现页面进行提现，提现金额每次最少1元，最多1000元，每天最多提现20次",
        "open":false
      },
      {
        "question":"提现会收取服务费吗?多久到账?",
        "answer":"提现不收取服务费；申请提现后会在1-5个工作日内转账到您的微信钱包",
        "open":false
      },
      {
        "question":"如何联系客服?(客服在线时间 : 9:00-18:00)",
        "answer":"您可以点击下方按钮联系我们的在线客服； 您也可以拨打我们的客服电话：4000365711",
        "open":false
      }
    ];

    this.setData({
      question:list
    })
  },
  goopen:function(e){
    var tar = this.data.question[e.currentTarget.dataset.index];
    tar.open = !tar.open;
    this.setData({
      question:this.data.question
    })

  }
})
