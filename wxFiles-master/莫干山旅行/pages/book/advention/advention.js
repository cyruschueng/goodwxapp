var comm = require('../../../utils/common.js');  
var app = getApp()
Page({
    data: {
        remind:'加载中',
        list: [],
        scenery:{},
        advention:{},
    },

    onLoad:function(){
        console.log('onLoad') 
        this.getAdvention()
        wx.setNavigationBarTitle({
          title: "景点探险"
        })
    },

    kindToggle: function (e) {
        var id = e.currentTarget.id
        this.data[id].open = !this.data[id].open 
        this.setData({
          [id]: this.data[id]
         });
    },

    //获取探险数据
    getAdvention: function(){
      var that=this


      function sceneryRender(info){
        console.log('景点数据:　')
        console.log(info)
        var scenery={
          id:'',
          name:'',
          open:true,
          pages:[]
        }
        scenery.id = "scenery"
        scenery.name ="景点"
        scenery.pages=info
        that.setData({
          scenery:scenery
        })
      }

      var loadsum=0
      loadsum++
      wx.request({
        url: app._server+'/place/allplaces?appid='+app._appid+'&category_id=2',
        success: function (res) {
          if (res.data) {
            var info = res.data;
            if (info) {
              sceneryRender(info)
            }
          }
        },
        complete:function(){
          loadsum--
          if(!loadsum){
            that.setData({
              remind:''
            })
          }
        }
      })

      function adventionRender(info){
        console.log('探险数据: ')
        console.log(info)
        var advention={
          id:'',
          name:'',
          open:true,
          pages:[]
        }
        advention.id ="advention"
        advention.name="探险"
        advention.pages=info

        that.setData({
          advention:advention
        })
      }
      
      loadsum++
      wx.request({
        url: app._server+'/live/twocategories?appid='+app._appid+'&id=5',
        success: function (res) {
          if (res.data) {
            var info = res.data;
            if (info) {
              adventionRender(info)
            }
          }
        },
        complete:function(){
          loadsum--
          if(!loadsum){
            that.setData({
              remind:''
            })
          }
        }
      })
  },

    //图片加载错误处理
    errImg: function (ev) {
      var that = this;
      comm.errImgFun(ev, that);
    }, 
});
