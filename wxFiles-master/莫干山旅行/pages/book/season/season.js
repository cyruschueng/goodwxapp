var comm = require('../../../utils/common.js');  
var app = getApp()
Page({
    data:{
        remind:'加载中',
        scrollHeight:0,
        seasonName: ['班夫春季', '班夫夏季', '班夫秋季','班夫冬季'],
        seasonIndex:0,
        selectedSeason:[],
        season:[],
    },

    //初始化
    onLoad: function () {
        var that=this
        var selectedSeason
        this.getSeason(this.data.seasonIndex+1)
        wx.getSystemInfo({
          success: function (res) {
            that.setData({
              scrollHeight: res.windowHeight-90,
              selectedSeason: selectedSeason
            });
          }
        });
        wx.setNavigationBarTitle({
          title: "季节活动"
        })
    },

    //转换季节
    seasonChange: function(e) {
        this.setData({
          remind:'加载中'
        })
        this.getSeason(parseInt(e.detail.value)+1)
        this.setData({
            seasonIndex:e.detail.value,
        })
    },

    kindToggle: function (e) {
        var id = e.currentTarget.id, selectedSeason = this.data.selectedSeason;
        for (var i = 0, len = selectedSeason.length; i < len; ++i) {
            if (selectedSeason[i].id == id) {
                selectedSeason[i].open = !selectedSeason[i].open
            }else {
                selectedSeason[i].open = false
            }


        }
        this.setData({
            selectedSeason: selectedSeason,
        });
        
    },


    

    getSeason: function(id){
      var that=this

      function seasonRender(info){
        var selectedSeason
        selectedSeason=info
        for (var i in selectedSeason){
          selectedSeason[i].open=false
        }
        that.setData({
          selectedSeason: selectedSeason
        })
      }

      wx.request({
        url: app._server+'/festival/festivals?appid='+app._appid+'&festival_category_id='+id,
        success: function (res) {
          if (res.data) {
            var info = res.data;
            if (info) {
              seasonRender(info)
            }
          }
        },
        complete:function(){
          that.setData({
            remind:''
          })
        }
      }) 
    },

    //图片加载错误处理
    errImg: function (ev) {
      var that = this;
      comm.errImgFun(ev, that);
    }, 
})