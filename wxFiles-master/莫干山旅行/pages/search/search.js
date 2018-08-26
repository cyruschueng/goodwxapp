
var app = getApp();
Page({
  data:{
    remind:'请输入您想要搜索的内容',
    search_inputShowed: false,
    search_inputVal: "",
    scrollHeight: 0,
    liveShowMore:'none',
    wonderfulShowMore:'none',
    live:[],
    wonderful:[]
  },


  onLoad: function () {
    var that = this
    var live=this.data.live
    var wonderful=this.data.live
    var liveShowMore='none'
    var wonderfulShowMore='none'
    if(live.length > 3){
      liveShowMore='block'
    }
    if (wonderful.length > 3) {
      wonderfulShowMore = 'block'
    }
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          scrollHeight: res.windowHeight,
          liveShowMore: liveShowMore,
          wonderfulShowMore: wonderfulShowMore
        });
      }
    });
    wx.setNavigationBarTitle({
      title: '搜索'
    })
  },


  //搜索
  showInput: function() {
    this.setData({
      search_inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      search_inputVal: "",
      search_inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      search_inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      search_inputVal: e.detail.value
    });
    console.log('e.detail.value')
  },

  search: function (e) {
    if (e.detail.value != '') {
      wx.showToast({
        title: '加载中',
        icon: 'loading',
        duration: 1000
      })
      this.getSearchData(e.detail.value)
    }else {
      wx.showModal({
        title: '提示',
        content: '请输入您要搜索的内容！',
        showCancel: false,
      })

    }
  },

  liveMore:function(){
    var live=this.data.live
    for(var i in live){
      live[i].isShow='block'
    }
    
    this.setData({
      live:live,
      liveShowMore:'none',
      wonderful:[],
    })
  },

  wonderfulMore:function(){
    var wonderful = this.data.wonderful
    for (var i in wonderful) {
      wonderful[i].isShow = 'block'
    }
    this.setData({
      wonderful: wonderful,
      wonderfulShowMore: 'none',
      live:[]
    })
  },


  getSearchData:function(words=''){
    var that=this

    function searchDataRender(info){
      
      var live = info.places
      var wonderful = info.articles
      if (info.places.length > 0){
        for (var i in info.places) {
          live[i].id = info.places[i].id
          live[i].name = info.places[i].title
          live[i].img = info.places[i].img
          live[i].content = info.places[i].intro
          if (i == 0 || i == 1) {
            live[i].isShow = "block"
          } else {
            live[i].isShow = "none"
          }
        }  
      }

      if (info.articles.length > 0){
        for (var i in info.articles) {
          wonderful[i].id = info.articles[i].id
          wonderful[i].name = info.articles[i].title
          wonderful[i].img = info.articles[i].img
          wonderful[i].content = info.articles[i].intro
          if (i == 0 || i == 1) {
            wonderful[i].isShow = "block"
          } else {
            wonderful[i].isShow = "none"
          }
          if (!parseInt(info.articles[i].is_theme)) {
            wonderful[i].url = '../details/content/content?appid='+app._appid+'&id=' + info.articles[i].id
          } else {
            //传递给专题页面的内容
            var extra = { 'title': wonderful[i].title, 'img': wonderful[i].img, 'intro': wonderful[i].intro }
            wonderful[i].url = '../details/list/list?appid='+app._appid+'&id=' + wonderful[i].id + '&extra=' + JSON.stringify(extra)
          }
        }  
      }

      that.setData({
        live:live,
        wonderful:wonderful,
        remind:''
      })
    }

    wx.request({
      url: app._server+'/search/global?appid='+app._appid+'&words='+words,
      success:function(res){
        if(res.data.articles.length > 0 || res.data.places.length > 0){
          var info=res.data
          searchDataRender(info)  
        }else{
          wx.showModal({
            title: '提示',
            content: '暂无该项，请搜索其他项！',
            showCancel: false,
          })
          that.setData({
            remind: '抱歉，没有找到您搜索的内容'
          })
        }
      }
    })
  },

   

})