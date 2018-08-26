//index.js
//获取应用实例
var app = getApp();
var hasMore;
var currentPage=1;
var cat;
var isLoading;

var api = require('../../api.js')
var Zan = require('../../zanui/index');
var utils = require('../../utils/util.js')
import { $wuxDialog } from '../../wux/wux'
let detail
let type
let info
let details
let weixin

let _detail
let _details
let _info
let price
let id

Page(Object.assign({}, Zan.Tab, {
    data: {
        gridPicSize: '?imageView2/1/w/' + Math.ceil(app.globalData.system_info.windowWidth / 2*app.globalData.system_info.pixelRatio) + '/h/' + Math.ceil(app.globalData.system_info.windowWidth / 2*app.globalData.system_info.pixelRatio),
    },
    onShow:function (options) {
      var that = this
        cat = 100
        currentPage=1;
        detail = utils.getDetail()
        details = utils.getDetails()

      weixin  = wx.getStorageSync('weixin');
      if(utils.isEmptyObject(weixin)){weixin = {};}
      if(utils.isEmptyObject(weixin.danliao)){weixin.danliao = {};}
      if(utils.isEmptyObject(weixin.qunliao)){weixin.qunliao = {};}

        if (!utils.isEmptyObject(details[99])&&details[99].content && type==1) {
            wx.setStorageSync('current_detail_index',99)
            this.setData({
                hasDetail: 1,
                url:'/pages/detail/detail',
                text:'编辑中的详情页'
            })
        }

        info = wx.getStorageSync('info')

        if ((!utils.isEmptyObject(info)||!utils.emptyDeatails()) && type==2) {
            this.setData({
                hasDetail: 1,
                url:'/pages/circle/circle',
                text:'编辑中的朋友圈'
            })
        }

      if (!utils.isEmptyObject(weixin.qunliao) && type==3) {
        this.setData({
          hasDetail: 1,
          url:'/pages/jietu/weixin/qunliao/qunliao',
          text:'编辑中的群聊'
        })
      }
      if (!utils.isEmptyObject(weixin.danliao) && type==4) {
        this.setData({
          hasDetail: 1,
          url:'/pages/jietu/weixin/danliao/danliao',
          text:'编辑中的单聊'
        })
      }

        isLoading = false;
      api.login(function (_user) {
        that.getList(cat);
      },function () {
        that.getList(cat);
      },'必须授权登录之后才能操作呢，是否重新授权登录？')
    },
    onLoad: function (options) {
        type = options.type
        if (type==1) {
            wx.setNavigationBarTitle({
                title: '选择朋友圈模板'
            });
          this.setData({
            key: 'weishengcheng_help'
          })
        } else if(type==2) {
            wx.setNavigationBarTitle({
                title: '选择朋友圈模板'
            });
          this.setData({
            key: 'weishengcheng_help'
          })
        }else{
          wx.setNavigationBarTitle({
            title: '选择聊天模板'
          });
          this.setData({
            key: 'duihuajietu_help'
          })
        }
    },
    selectTemplate:function (e) {
        let that = this
        if((utils.isEmptyObject(details[99])&& type==1) || (utils.isEmptyObject(info)&&utils.emptyDeatails()&&type==2 || type>2)){//原来没有新建过
            this.gotoEdit(e.currentTarget.id);
        }else{
            wx.showModal({
                title: '提示',
                content: '还有编辑中的朋友圈哦，要覆盖掉么？',
                confirmText:'覆盖',
                cancelText:'继续编辑',
                success: function(res) {
                    if (res.confirm) {
                        that.gotoEdit(e.currentTarget.id);
                    } else{
                        if(type==1){
                          wx.setStorage({
                            key:"current_detail_index",
                            data:99,
                            success:function () {
                              wx.navigateTo({
                                url: "/pages/detail/detail"
                              })
                            }
                          })
                        }else if(type == 2){
                            wx.navigateTo({
                                url: "/pages/circle/circle"
                            })
                        }
                    }
                }
            })
        }
    },
    saveWeixin:function (weixin,url) {
      wx.setStorage({
        key:"weixin",
        data:weixin,
        success:function () {
          wx.navigateTo({
            url: url
          })
        }
      })
    },
    dealData:function (k) {
      var that = this
      console.log(that.data.list[k])
      price = that.data.list[k]['price']
      id = that.data.list[k]['id']
      if(type==1){
        _detail = JSON.parse(that.data.list[k]['content'])
      }else if(type==2){
        var _content = JSON.parse(that.data.list[k]['content'])
        if(_details[99]){
          var tempDetail = _details[99]
          _details = _content.details
          _details[99] = tempDetail
        }else{
          _details = _content.details
        }
        _info = _content.info
      }else if(type==3){
        var _qunliao = JSON.parse(that.data.list[k]['content']);
        var _url = "/pages/jietu/weixin/qunliao/qunliao";

        if(!utils.isEmptyObject(weixin.qunliao)){
          wx.showModal({
            title: '提示',
            content: '还有编辑中的对话哦，要覆盖掉么？',
            confirmText:'覆盖',
            cancelText:'继续编辑',
            success: function(res) {
              if (res.confirm) {
                weixin.qunliao = _qunliao;
                that.saveWeixin(weixin,_url+'?price='+price+'&id='+id)
              } else{
                wx.navigateTo({
                  url: _url
                })
              }
            }
          })
        }else{
          weixin.qunliao = _qunliao;
          that.saveWeixin(weixin,_url+'?price='+price+'&id='+id)
        }
      }else{
        var _danliao = JSON.parse(that.data.list[k]['content']);
        var _url = "/pages/jietu/weixin/danliao/danliao";

        if(!utils.isEmptyObject(weixin.danliao)){
          wx.showModal({
            title: '提示',
            content: '还有编辑中的对话哦，要覆盖掉么？',
            confirmText:'覆盖',
            cancelText:'继续编辑',
            success: function(res) {
              if (res.confirm) {
                weixin.danliao = _danliao;
                that.saveWeixin(weixin,_url+'?price='+price+'&id='+id)
              } else{
                wx.redirectTo({
                  url: _url
                })
              }
            }
          })
        }else{
          weixin.danliao = _danliao;
          that.saveWeixin(weixin,_url+'?price='+price+'&id='+id)
        }
      }
    },
    gotoEdit:function(id){
      console.log(id)
        var that = this
        _detail=utils.getDetail()
        _details=utils.getDetails()
        _info=wx.getStorageSync('info')
        if(utils.isEmptyObject(_info)){
            _info = {}
        }

        if(id != '0'){
            for (let k = 0; k < that.data.list.length; k++) {
                if(that.data.list[k]['id'] == id){
                  console.log(k)
                  wx.showNavigationBarLoading();
                  api.login(function (user) {
                    console.log(k)
                    that.data.list[k]['content'] = that.data.list[k]['content'].replace(/\%user_name\%/g,user.user_name).replace(/\%avatar\%/g,user.avatar)

                    that.dealData(k);
                    wx.hideNavigationBarLoading();
                    that.saveAndRedirect();
                  },function () {
                    that.data.list[k]['content'] = that.data.list[k]['content'].replace(/\%user_name\%/g,'无名氏').replace(/\%avatar\%/g,'http://icons.maiyizhi.cn/default_avatar.png')
                    that.dealData(k);
                    wx.hideNavigationBarLoading();
                    that.saveAndRedirect();
                  },'必须授权登录之后才能操作呢，是否重新授权登录？')
                }
            }
        }else{

          api.login(function (_user) {
            api.getUser(function (res) {
              if(res.isVip){
                if(type==1){
                  _detail = {}
                  that.saveAndRedirect();
                }else if(type==2){
                  if(_details[99]){
                    var tempDetail = _details[99]
                    _details = []
                    _details[99] = tempDetail
                  }else {
                    _details = []
                  }
                  _info = {}
                  that.saveAndRedirect();
                }else if(type == 4){
                  if(!utils.isEmptyObject(weixin.danliao)){
                    wx.showModal({
                      title: '提示',
                      content: '还有编辑中的对话哦，要覆盖掉么？',
                      confirmText:'覆盖',
                      cancelText:'继续编辑',
                      success: function(res) {
                        if (res.confirm) {
                          weixin.danliao = {};
                          that.saveWeixin(weixin,"/pages/jietu/weixin/danliao/danliao")
                        } else{
                          wx.navigateTo({
                            url: "/pages/jietu/weixin/danliao/danliao"
                          })
                        }
                      }
                    })
                  }else{
                    wx.navigateTo({
                      url: "/pages/jietu/weixin/danliao/danliao"
                    })
                  }
                  /*wx.redirectTo({
                    url: "/pages/jietu/weixin/qunliao/qunliao"
                  })*/
                }else{
                  if(!utils.isEmptyObject(weixin.qunliao)){
                    wx.showModal({
                      title: '提示',
                      content: '还有编辑中的对话哦，要覆盖掉么？',
                      confirmText:'覆盖',
                      cancelText:'继续编辑',
                      success: function(res) {
                        if (res.confirm) {
                          weixin.qunliao = {};
                          that.saveWeixin(weixin,"/pages/jietu/weixin/qunliao/qunliao")
                        } else{
                          wx.navigateTo({
                            url: "/pages/jietu/weixin/qunliao/qunliao"
                          })
                        }
                      }
                    })
                  }else{
                    wx.navigateTo({
                      url: "/pages/jietu/weixin/qunliao/qunliao"
                    })
                  }/*
              wx.redirectTo({
                url: "/pages/jietu/weixin/danliao/danliao"
              })*/
                }
              }else{
                console.log('not vip')
                $wuxDialog.open({
                  title: '提示',
                  content: '开通VIP，才能使用这个功能哦',
                  verticalButtons: !0,
                  buttons: [
                    {
                      text: '去开通',
                      bold: !0,
                      onTap(e){
                        wx.navigateTo({
                          url: '/pages/about/about?type=vip'
                        })
                      }
                    },
                    {
                      text: '取消',
                      bold: 0,
                      onTap(e){
                        return false;
                      }
                    },
                  ],
                })
              }
            },function () {
              $wuxDialog.open({
                title: '提示',
                content: '开通VIP，才能使用这个功能哦',
                verticalButtons: !0,
                buttons: [
                  {
                    text: '去开通',
                    bold: !0,
                    onTap(e){
                      wx.navigateTo({
                        url: '/pages/about/about?type=vip'
                      })
                    }
                  },
                  {
                    text: '取消',
                    bold: 0,
                    onTap(e){
                      return false;
                    }
                  },
                ],
              })
            })
          },function () {
            return;
          },'必须授权登录之后才能操作呢，是否重新授权登录？')
        }
        //wx.setStorageSync("detail", detail);

    },
    saveAndRedirect:function () {
    if(type==1){

      wx.setStorage({
        key:"current_detail_index",
        data:99,
        success:function () {
          utils.saveDetail(_detail)
          wx.navigateTo({
            url: "/pages/detail/detail"+'?price='+price+'&id='+id
          })
        }
      })
    }else if(type == 2){

      wx.setStorageSync("details", _details);
      wx.setStorageSync("info", _info);
      wx.navigateTo({
        url: "/pages/circle/circle"+'?price='+price+'&id='+id
      })
    }
  },
    getList: function(index) {
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
        api.template(index,type,currentPage, function(res) {
            currentPage = res.page;
            hasMore = res.pageCount > res.page;
            isLoading = false;
            res.cats.selectedId = index;
            res.cats.scroll = true;
            res.cats.height = 45;

            if(currentPage == 1){
                that.data.list = []
            }

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
        this.getList(cat);
    },
    handleZanTabChange(e) {
        var componentId = e.componentId;
        currentPage = 1
        cat = e.selectedId;
        this.setData({
            [`${componentId}.selectedId`]: cat,
            list: null
        });
        this.getList(cat)
    }
}));
