// page/API/index.js
Page({
  data:{
    list:[
      {
        id:'api',
        name:'开放接口',
        open:false,
        pages:[
          {
            zh:'微信登录',
            url:'login/login'
          },
          {
            zh: '获取用户信息',
            url: 'get-user-info/get-user-info'
          },{
            zh: '发起支付',
            url: 'request-payment/request-payment'
          },{
            zh: '分享',
            url: 'share/share'
          },{
            zh: '客服消息',
            url: 'custom-message/custom-message'
          },{
            zh: '模板消息',
            url: 'template-message/template-message'
          }
        ]
      }
    ]
  },
  kindToggle: function (e) {
    var id = e.currentTarget.id, list = this.data.list;
    for (var i = 0, len = list.length; i < len; ++i) {
      if (list[i].id == id) {
        if(list[i].url){
          wx.navigateTo({
            url: 'pages/' + list[i].url
          })
          return
        }
        list[i].open = !list[i].open
      } else {
        list[i].open = false
      }
    }
    this.setData({
      list: list
    });
  }
})