//index.js
//获取应用实例
var app = getApp()
var utils = require('../../utils/util.js')
var timeArr
var timeIndex = 0
var detail = {}

Page({
  data: {
  },
  onLoad: function (options) {
      let type = options.type;
      detail = utils.getDetail();

      var _index  =wx.getStorageSync('current_detail_index');
      if(_index ==99 || !_index){
          _index = 0
      }

      timeArr = [(_index+1)+'分钟前','1小时前','昨天','5天前','2016年5月1日 10:00']

      if(!detail.time){
          detail.time = timeArr[0]
      }
      this.setData({
          type: type,
          detail:detail
      })
      let barTitle = '';
      switch(type)
      {
          case 'time':
              barTitle = '填写发布时间'
              break;
          case 'source':
              barTitle = '填写来源'
              break;
          case 'loc':
              barTitle = '填写所在位置'
              break;
          default:
              break;
      }

      wx.setNavigationBarTitle({
          title: barTitle
      });
  },
    formSubmit: function (e) {
        switch(this.data.type)
        {
            case 'time':
                var time = e.detail.value.time;
                detail.time = time
                break;
            case 'source':
                var source = e.detail.value.source;
                detail.source = source
                break;
            case 'loc':
                var city = e.detail.value.city;
                var loc = e.detail.value.loc;
                detail.city = city
                detail.loc = loc
                break;
            default:
                break;
        }
        utils.saveDetail(detail)
        wx.navigateBack();
    },
    changeTime:function () {
        if(timeIndex==(timeArr.length-1)){
            timeIndex = 0
        }else{
            timeIndex++
        }
        if(timeArr[timeIndex] == detail.time){
            if(timeIndex==(timeArr.length-1)){
                timeIndex = 0
            }else{
                timeIndex++
            }
        }

        detail.time = timeArr[timeIndex]
        this.setData({
            detail: detail
        })
    }
})
