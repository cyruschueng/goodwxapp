//index.js
//获取应用实例
var app = getApp()
var hasMore;
var currentPage=1;
var cat;
var isLoading;
var from;
var wuserHistory;

var api = require('../../api.js')
var Zan = require('../../zanui/index');
var utils = require('../../utils/util.js')

Page(Object.assign({}, Zan.Tab, {
  data: {
    inputShowed: false,
    inputVal: ""
  },
  showInput: function () {
    this.setData({
      inputShowed: true,
    });
    if(wuserHistory.length){
      this.setData({
        wuserHistory:wuserHistory.reverse()
      });
    }
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false,
      wuserHistory:[]
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: "",
      searchResult:[]
    });
  },
  inputTyping: function (e) {
    var that = this;
    wx.showNavigationBarLoading();
    api.wuser(cat,currentPage,e.detail.value, function(res) {
      that.setData({
        inputVal: e.detail.value,
        searchResult: res.list
      });
      wx.hideNavigationBarLoading();
    });
  },
  onLoad: function (options) {
      wuserHistory  = wx.getStorageSync('wuserHistory');
      if(utils.isEmptyObject(wuserHistory)){
        wuserHistory = []
      }
      cat  = 100
      currentPage=1;
      from = options.from;
      isLoading = false;
      this.getList(cat,'');
  },
    getList: function(index,search) {
        var that = this;
        if(utils.isEmptyObject(that.data.list)){that.data.list = []}
        if (isLoading) {
            return;
        } else {
            isLoading = true;
        }
        wx.showNavigationBarLoading();

      wx.showToast({
        title: 'Loading……',
        duration:2000,
        icon: 'loading'
      })


        api.wuser(index,currentPage,search, function(res) {
            console.log(res)
            currentPage = res.page;
            hasMore = res.pageCount > res.page;
            isLoading = false;

            if(currentPage == 1){
                that.data.list = []
            }

            res.cats.selectedId = index;
            res.cats.scroll = true;
            res.cats.height = 45;

            that.setData({
                tabs:res.cats,
                list: that.data.list.concat(res.list),
                hasMore: hasMore
            })
            wx.hideToast()
            wx.hideNavigationBarLoading();
        });
    },
    onReachBottom: function() {
        if (!hasMore) return;
        currentPage++;
        this.getList(cat,'');
    },
    selectUser:function(e){
        var detail = utils.getDetail()

      if(this.data.inputVal){
        var _data = {'name':e.currentTarget.dataset.name,'avatar':e.currentTarget.dataset.avatar};
        if(wuserHistory&&wuserHistory.length<10){
          wuserHistory.push(_data)
        }else if(wuserHistory.length>=10){
          wuserHistory[wuserHistory.length-1] = _data
        }

        wx.setStorageSync('wuserHistory',wuserHistory);
      }

        if(utils.isEmptyObject(detail.likes)){detail.likes = [];}
        if(from=='detail'){
            detail.name = e.currentTarget.dataset.name
            detail.avatar = e.currentTarget.dataset.avatar
            utils.saveDetail(detail)
        }else if(from=='like'){
            detail.likes.push(e.currentTarget.dataset.avatar)
            utils.saveDetail(detail)
        }else if(from=='comment'){
            var index = wx.getStorageSync('current_comment_index')
            if(!index){index = 0;}
            if(utils.isEmptyObject(detail.comments)){detail.comments = [];}
            if(utils.isEmptyObject(detail.comments[index])){detail.comments[index] = {};}
            detail.comments[index].avatar = e.currentTarget.dataset.avatar
            detail.comments[index].name = e.currentTarget.dataset.name
            utils.saveDetail(detail)
        }else if(from=='info'){
            var info = wx.getStorageSync('info')
            info.name = e.currentTarget.dataset.name
            info.avatar = e.currentTarget.dataset.avatar
            wx.setStorageSync("info", info)
            utils.saveDetail(detail)
        }else if(from=='newsAvatar'){
            var info = wx.getStorageSync('info')
            info.newsAvatar = e.currentTarget.dataset.avatar
            wx.setStorageSync("info", info)
            utils.saveDetail(detail)
        }else if(from=='zhuangx'){
          wx.setStorageSync("zhuangx_user", {'user_name':e.currentTarget.dataset.name,'avatar':e.currentTarget.dataset.avatar})
        }else if(from.indexOf("_") > 0){
            var arr = from.split("_")
            var app = arr[0]
            var type = arr[1]
            var _app  = wx.getStorageSync(app);
            if(utils.isEmptyObject(_app)){_app = {};}
            if(utils.isEmptyObject(_app[type])){_app[type] = {};}
            if(utils.isEmptyObject(_app[type].list)){_app[type].list = [];}

            index = wx.getStorageSync('current_'+app+'_'+type+'_index')

            if(!index){index = 0;}
            if(utils.isEmptyObject(_app[type].list[index])){_app[type].list[index] = {};}

            _app[type].list[index].avatar = e.currentTarget.dataset.avatar
            _app[type].list[index].name = e.currentTarget.dataset.name
            wx.setStorageSync(app, _app);
        }else if(from.indexOf("-") > 0){//聊天设置
            var arr = from.split("-")
            var app = arr[0]
            var type = arr[1]
            var _app  = wx.getStorageSync(app);
            if(utils.isEmptyObject(_app)){_app = {};}
            if(utils.isEmptyObject(_app[type])){_app[type] = {};}
            if(utils.isEmptyObject(_app[type].users)){_app[type].users = [];}

            var _user = {"avatar":e.currentTarget.dataset.avatar,"name":e.currentTarget.dataset.name}
            _app[type].users.push(_user)

            //wx.setStorageSync('temp_jietu_select_user', _user);

            wx.setStorageSync(app, _app);
        }

        wx.navigateBack();
    },
    handleZanTabChange(e) {

        var componentId = e.componentId;
        cat = e.selectedId;
        currentPage = 1
        this.setData({
            [`${componentId}.selectedId`]: cat,
            list: null
        });
        this.getList(cat,'')
    }
}));
