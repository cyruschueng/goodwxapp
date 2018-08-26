import Api from '/../../utils/config/api.js';  //每个有请求的JS文件都要写这个，注意路径
Page({
  data: {
    actdata:[],
    page:1,
    actid:'',  //活动ID
    flag: true
  },

  onLoad: function (options) {
    
  },
  onShow: function () {
    this.setData({
      actdata: [],
      page: 1,
      flag: true
    })
    this.getcatdata()
  },
  getcatdata:function(){  //获取列表数据
    let that = this;
    let _parms = {
      page:this.data.page,
      row:8
    }
    wx.showLoading({
      title: '更多数据加载中。。。',
      mask: true
    })
    Api.actlist(_parms).then((res) => {
      let data = res.data;
      wx.hideLoading()
      if (data.code == 0 && data.data.list != null && data.data.list != "" && data.data.list != []) {
        
        let actList = [];
        actList = that.data.actdata;
        for (let i = 0; i < data.data.list.length; i++) {
          actList.push(data.data.list[i]);
          actList[i].endTime = actList[i].endTime.substring(0, actList[i].endTime.indexOf(' '));
        }
        that.setData({
          actdata: actList
        })
      } else {
        that.setData({
          flag: false
        });
      }
      if(that.data.page == 1) {
        wx.stopPullDownRefresh()
      } else {
        wx.hideLoading();
      }
    })
  },
  clickVote:function(event){
    const actid = event.currentTarget.id
    wx.navigateTo({
      url: 'details-like/details-like?actid='+actid,
    })
  },
  onReachBottom: function () {  //用户上拉触底
    if(this.data.flag) {
      wx.showLoading({
        title: '加载中..'
      })
      this.setData({
        page: this.data.page + 1
      });
      this.getcatdata();
    }
  },
  onPullDownRefresh: function () {    //用户下拉刷新
    this.setData({
      actdata: [],
      page: 1,
      flag: true
    });
    this.getcatdata();
  }
})