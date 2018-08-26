//  app.js

const store = require('utils/store.js')
const api = require('api/index.js')

App ({

  /*
    说明：启动时发生
  */
  onLaunch: function(options){

    var query = options.query || {};

    //  允许分享至微信群
    api.wechat.setShareMenu(true)

    //  检查登录态
    api.wechat.checkSession(options.scene)
      .then( function( data ){

        data = data.data || {};
        wx.setStorageSync('session3rd', data.session3rd || '')
        store.session3rd = data.session3rd || ''
        store.client = data;
        store.launched = true;
      })

    //  记录用户来源
    api.wechat.checkSource(query.fromClientId, options.shareTicket)
      .then(function (data) {

        //  如果来自群，可以在这里加注需要执行的代码
      })
  },
  
  /*
    说明：打开时发生
  */
  onShow: function (options) {
  console.log(options)
    var query = options.query || {};
    
    //  记录用户来源 ( 内部做了去重，避免重复调用 )
    if (store.launched == true){
      api.wechat.checkSource(query.fromClientId, options.shareTicket)
        .then(function (data) {
          
          //  如果来自群，可以在这里加注需要执行的代码
        })
    }
  }
})