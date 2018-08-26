// pages/receipt/receipt.js
const app = getApp();
const utils = require('../../utils/util');
const basePath = app.globalData.basePath;
const imgPath = app.globalData.imgPath;
let total_page=1;
let cur_page=0
Page({
  data: {
    loadingHidden:true,
    mainList: [],
    isEmpty:false,
  },
  onLoad: function (options) {
    let page = this;
  },
  onShow: function () {
    const page=this;
    let refreshFlag = false;
    app.checkInfo(function () {
      try {
        var wxBizKey = wx.getStorageSync('wxBizKey');
        getPostList(page, wxBizKey, refreshFlag)
      }
      catch (e) {
      }
    })
  },
  // 上拉加载
  onReachBottom:function(){
    const page = this;
    let refreshFlag=false;
    if (cur_page < total_page){
      app.checkInfo(function () {
        try {
          var wxBizKey = wx.getStorageSync('wxBizKey');
          getPostList(page, wxBizKey, refreshFlag)
        }
        catch (e) {
        }
      })
    }else{
      wx.showToast({
        title: '已全部加载',
        icon: 'success',
        duration: 1000,
        mask: true
      })
    }
  },
  // 下拉刷新
  onPullDownRefresh:function(){
    let refreshFlag=true;
    cur_page=0;
    const page=this;
    page.setData({
      mainList:[]
    })
    app.checkInfo(function () {
      try {
        var wxBizKey = wx.getStorageSync('wxBizKey');
        getPostList(page, wxBizKey, refreshFlag)
      }
      catch (e) {
      }
    })
  },
  // 点击跳转详情
  toInfoHandle: function (e) {
    utils.toInfoHandle(e)
  },
  // 长按删除
  delItem:function(e){
    const page=this;
    const del_URL = basePath +'boxdelete/index';
    const _id = e.currentTarget.dataset.id;
    const box_status=0;
    let idx = e.currentTarget.dataset.idx;
    let list=page.data.mainList;
    console.log(_id)
    app.checkInfo(function () {
      try {
        var wxBizKey = wx.getStorageSync('wxBizKey');
        utils.delItem(page, list, idx, del_URL, _id, wxBizKey, box_status)
      }
      catch (e) {
      }
    })
  }
})

// 请求列表数据
function getPostList(page, wxBizKey,refreshFlag,cb) {
  page.setData({
    loadingHidden: false
  })
  wx.request({
    url: basePath + 'postbox/index',
    data: {
      wxBizKey: wxBizKey,
      cur_page: cur_page + 1
    },
    method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    header: {
      'content-type': 'application/json'
    },
    success: res => {
      console.log(res)
      let list = page.data.mainList;
      if (res.data.statusCode == '200') {
        console.log(res.data)
        total_page = res.data.total_page;
        cur_page = res.data.cur_page;
        if (res.data.dis_page instanceof Array) {
          for (let item of res.data.dis_page) {
            list.push(item)
          }
          page.setData({
            mainList: list
          })
        }
        if (res.data.total_page == 0 || res.data.total_page == 'undefined') {
          page.setData({
            isEmpty: true
          })
        }
      }
      if (res.statusCode == 3004) {
        page.setData({
          isEmpty: true
        })
      }
    },
    complete:res=>{
      page.setData({
        loadingHidden:true
      })
      if (refreshFlag){
        wx.stopPullDownRefresh()
      }
    }
  })
}