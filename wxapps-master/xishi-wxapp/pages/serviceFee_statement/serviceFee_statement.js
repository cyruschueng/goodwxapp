var utils = require("../../utils/util.js");
import { get_serviceFeeExplain } from '../../url.js';
var sessionKey = '';
Page({

  data: {
    content:[]
  },

  onLoad: function (options) {
    sessionKey = wx.getStorageSync("sessionKey");
    if (!sessionKey) {
      utils.getSessionKey(utils.getSetting);
      return;
    }

    let that = this;
    utils.requestLoading(get_serviceFeeExplain + "?sessionKey=" + sessionKey,"post","","数据加载中...",
      function(res){
        if (res.Status == 5) {
          wx.removeStorageSync("sessionKey");
          utils.getSessionKey(utils.getSetting);
          return;
        }
        let statementList = res.explain.split("\\n");
        that.setData({
          content: statementList
        })
      },function(res){

      }
    );
  }

  
})