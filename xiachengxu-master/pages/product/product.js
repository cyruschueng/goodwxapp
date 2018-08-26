// pages/product/product.js
import { getDate, getTime } from '../../utils/util.js';
import { Product } from 'product-model.js';
var product = new Product(),
  app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    from: '',
    loadingHidden: false,
    product: {}, // 商品详情信息
    storeNo: '',
    recommendList: [],
    storeInfo: {},
    useSimple: true, // 使用简约模板
    showGuide: false, // 显示导购欢迎页
    showProductInfo: true, // 简约模板显示商品详情和按钮组
    expandProductInfo: false, // 简约模板显示商品详情
    click_desc: false, // 是否点击描述按钮
    slideImg: '', // 轮播图滑动的当前图片
    hideContactButton: true, // 显示全部的找客服按钮
    showTip: true, // 显示预约引导提示
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    var that = this;

    var from = options.from || '', storeNo = wx.getStorageSync('storeNo');
    var scene = decodeURIComponent(options.scene);
    if (options.storeNo != null && options.storeNo != 'undefined') {
      wx.setStorageSync('storeNo', options.storeNo);
      storeNo = options.storeNo;
    }
    if (scene != 'undefined' && scene != null) {
      /**
       * 如果是通过商品二维码进来则需要进行查取此门店是简版还是普通版
       */
      var sceneList = scene.split(',');
      var sceneStoreNo = sceneList[0];
      storeNo = sceneStoreNo;
      this.data.employeNo = sceneList[1];
      wx.setStorageSync('storeNo', storeNo);
      id = parseInt(sceneList[2]);
    }
    this.data.storeNo = storeNo;
    this.setData({
      first_access: wx.getStorageSync('first_access'),
      id: parseInt(id),
      from
    });
    wx.setStorageSync("first_access", true);
    wx.showNavigationBarLoading();
    var userInfo = this.data.userInfo;
    // 新用户没有登录则请求授权
    if (!userInfo) {
      app.getUserSetting(data => {
        that.setData({
          userInfo: data.userInfo,
          useSimple: options.templateId == 'simple'
        });
        that.showGuide();
        this._loadData();
      })
    } else {
      this.setData({
        useSimple: options.templateId == 'simple',
        userInfo
      });
      that.showGuide();
      this._loadData();
    }

    // 获取窗口显示高度
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR;
        that.setData({
          winHeight: calc
        });
      }
    });
  },
  showGuide() {
    if (this.data.employeNo) {
      var that = this;
      let params = {
        data: {
          employeNo: this.data.employeNo,
          storeNo: this.data.storeNo
        }
      }
      product.showGuide(params, d => {
        if (d && d.status && d.data) {
          var data = d.data;
          that.setData({
            employee: d.data,
            showGuide: true
            // showGuide: d.code == 'NEWCUSTOMER'
          });
        }
      });
    }
  },
  closeGuide(e) {
    this.setData({
      showGuide: false
    });
    var params = {
      data: {
        storeNo: this.data.storeNo,
        nickName: this.data.employee.nickName,
        formId: e.detail.formId
      }
    };
    product.sendServiceMessage(params, null);
  },
  // 获取单个商品详情
  _loadData() {
    var that = this;
    var { storeNo, useSimple } = this.data;
    var params;
    if (!useSimple) {
      params = {
        useSimple,
        data: {
          storeNo: storeNo,
          goodsId: this.data.id
        }
      }
    } else {
      params = {
        useSimple,
        data: {
          postId: this.data.id
        }
      };
    }

    product.getDetailInfo(params, (data) => {
      // 显示客服提示
      if (data && data.status) {
        that.setData({
          product: data && data.status ? data.data : {}
        });
        var p = data.data;
        if (!useSimple) {
          params = {
            data: {
              storeNo: storeNo,
              goodsId: p.goodsId,
              goodsName: p.goodsName,
              goodsPrice: p.goodsPrice,
              goodsPic: p.goodsPic
            }
          }
          product.insertPageView(params);
        }

        // 添加浏览商品
        let postData = {
          data: {
            storeNo
          }
        };
        product.getStoreInfo(postData, res => {
          if (res.status) {
            that.setData({
              storeInfo: res.data
            });

          }
        });
        params = {
          data: {
            storeNo,
            page: 1,
            size: 3
          }
        }
        product.getRecommendProducts(params, d => {
          if (d.status) {
            that.setData({
              recommendList: d.data,
              loadingHidden: true
            });
            wx.hideNavigationBarLoading();
            wx.setNavigationBarTitle({
              title: p.goodsName || '详情'
            })
          }
        })
      } else {
        wx.showModal({
          content: '很抱歉，此商品已下架',
          showCancel: false,
          confirmText: '返回首页',
          success(res) {
            if (res.confirm) {
              wx.switchTab({
                url: '/pages/home/home',
              })
            }
          }
        })
      }

    });

  },
  goHome() {
    app.aldstat.sendEvent('返回门店首页');
    wx.switchTab({
      url: '../home/home',
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var that = this;
    var { useSimple, product, storeInfo } = this.data;
    if (useSimple) {
      return {
        title: product.postContent,
        imageUrl: product.postPics[0].postPic,
        path: '/pages/product/product?id=' + product.postId + '&storeNo=' + storeInfo.storeNo
      }
    } else {
      return {
        title: product.goodsName,
        imageUrl: product.goodsPic,
        path: '/pages/product/product?id=' + product.goodsId + '&storeNo=' + storeInfo.storeNo
      }
    }
  },
  shareTap() {
    // wx.navigateTo({
    //   url: '../share/share',
    // })

  },

  /**
   * 点赞
   */
  praiseTap(e) {
    product.dealFormIds(e.detail.formId);
    app.aldstat.sendEvent('点赞');
    var that = this;
    var userInfo = this.data.userInfo;
    if (!userInfo.gender) {
      app.getUserSetting(data => {
        that.setData({
          userInfo: data.userInfo
        });
      })
    } else {
      var productItem = this.data.product;
      this.setData({
        click_praise: true,
        praise_true: productItem.isLike == 0
      });
      // 调用后台接口保存点赞
      var flag = productItem.isLike == 1;
      var storeNo = this.data.storeNo;
      var params = {
        data: {
          goodsId: productItem.goodsId,
          goodsName: productItem.goodsName,
          goodsPrice: productItem.goodsPrice,
          goodsPic: productItem.goodsPic,
          storeNo: storeNo,
          flag: flag
        }
      };
      setTimeout(() => {
        productItem.isLike = flag ? 0 : 1;
        that.setData({
          product: productItem,
          click_praise: false
        });
      }, 200);
      // setTimeout(() => {
      //   that.setData({
      //     hide_praise_animate: true
      //   });
      //   setTimeout(() => {
      //     that.setData({
      //       hide_praise_animate: false,
      //       praise_true: false
      //     });
      //   }, 1000);
      // }, 3000);


      product.praise(params, data => {
        if (!data.status) {
          app.globalData.product.goodsId = productItem.goodsId;
          app.globalData.product.isLike = productItem.isLike;
          that.showTips('操作成功');
        } else {
          // productItem.isLike = productItem.isLike ? 0 : 1;
          // that.setData({
          //   product: productItem
          // });
          that.showTips('操作失败');
        }
      })
    }


  },
  backHome(e) {
    product.dealFormIds(e.detail.formId);
    app.aldstat.sendEvent('回到首页-商品详情');
    wx.switchTab({
      url: '/pages/home/home',
    })
  },
  collectTap(e) {
    product.dealFormIds(e.detail.formId);
    app.aldstat.sendEvent(this.data.useSimple ? '简约版-加入预购清单' : '普通版-加入预购清单');
    var that = this;
    var userInfo = this.data.userInfo;
    if (!userInfo.gender) {
      app.getUserSetting(data => {
        that.setData({
          userInfo: data.userInfo
        });
      })
    } else {
      wx.showTabBarRedDot({ index: 2 });
      this.setData({
        click_favorite: true
      });
      // 调用后台接口保存点赞
      var { storeNo, useSimple } = this.data, productItem = this.data.product, flag;
      flag = productItem.isFavorite == 1;
      setTimeout(() => {
        this.setData({
          click_favorite: false
        });
      }, 100);
      if (!flag) {
        let params = {};
        if (useSimple) {
          // 批量加入预购清单
          /**
           * 筛选重复的商品
           */
          let goods = productItem.postPics.filter((item, index, self) => {
            return self.findIndex(i => { return i.goodsId == item.goodsId }) === index;
          });
          params = {
            useSimple,
            data: {
              goods,
              storeNo,
            }
          }
        } else {
          params = {
            useSimple,
            data: {
              goodsId: productItem.goodsId,
              goodsName: productItem.goodsName,
              goodsPrice: productItem.goodsPrice,
              goodsPic: productItem.goodsPic,
              storeNo
            }
          };
        }
        product.collect(params, data => {
          if (data.status) {
            productItem.isFavorite = 1;

            that.setData({
              product: productItem
            });
            // app.globalData.product.goodsId = productItem.goodsId;
            wx.setStorageSync('fresh', true);
            wx.setStorageSync('cart-fresh', true);
            that.showMyTip('加入预购清单成功');
          } else {
            that.showMyTip('加入预购清单失败');
          }
        })
      } else if (flag && !this.data.isShowPopup) {
        that.showMyTip('已加入过预购清单');
      }
    }
  },

  shareTap(e) {
    app.aldstat.sendEvent('分享');
    product.dealFormIds(e.detail.formId);
  },
  // 预约到店
  makeAppoint(e) {
    app.aldstat.sendEvent(this.data.useSimple ? '简约版-预约到店' : '普通版-预约到店');
    var id = product.getDataSet(e, 'id'),
      that = this;
    var userInfo = this.data.userInfo;
    if (!userInfo.gender) {
      app.getUserSetting(data => {
        that.setData({
          userInfo: data.userInfo
        });
      })
    } else {
      // 将当前商品信息缓存进全局
      var p = this.data.product;
      var d = new Date();
      var date = getDate(d);
      var time = getTime(d);
      app.globalData.appoint = {
        goodsId: p.goodsId,
        goodsName: p.goodsName,
        goodsPic: p.goodsPic,
        goodsPrice: p.goodsPrice,
        bookerName: userInfo.nickName,
        mobile: wx.getStorageSync('mobile'),
        bookingDate: `${date} ${time}`,
        bookingCount: p.bookingCount
      };
      wx.navigateTo({
        url: '../appointment/appointment',
      })

    }
  },

  appointProducts(e) {
    var products = [];
    var goods = this.data.product.postPics;
    var { userInfo, storeNo } = this.data;
    /**
     * 过滤数组中重复的元素
     */

    products = goods.filter((item, index, self) => {
      return self.findIndex(i => { return i.goodsId == item.goodsId }) === index;
    })

    wx.setStorageSync('appointProducts', products);
    app.globalData.appoint = {
      bookerName: userInfo.nickName,
      mobile: wx.getStorageSync('mobile')
    }
    wx.navigateTo({
      url: '/pages/appointment/appointment?type=multiple&storeNo=' + storeNo
    })
  },

  /**
   * 预览大图
   */
  previewImage(e) {
    var img = e.currentTarget.dataset.imgSrc;
    var that = this, urls = [];
    that.data.product.goodsPics.forEach(item => {
      urls.push(item.imageUrl);
    })
    wx.previewImage({
      current: img,
      urls: urls
    })
  },

  selectProduct(e) {
    var goodsId = product.getDataSet(e, 'id');
    wx.navigateTo({
      url: '../product/product?id=' + goodsId
    })
  },

  // 轮播图切换图片事件，给滤镜更换滑动的图片
  slideChange(e) {
    this.setData({
      expandProductInfo: false,
      click_desc: false
    });
  },

  // 点击隐藏商品描述以及按钮组
  hideProductInfo(e) {
    var goodsId = product.getDataSet(e, 'id');
    var storeNo = this.data.storeNo;
    wx.navigateTo({
      url: `/pages/product/product?id=${goodsId}&storeNo=${storeNo}&templateId=default`,
    })
    this.setData({
      click_desc: false,
      expandProductInfo: false
    });
  },

  // 点击详情按钮
  clickProductDesc() {
    app.aldstat.sendEvent('简约版-点击商品详情');
    this.setData({
      click_desc: !this.data.click_desc,
      expandProductInfo: !this.data.expandProductInfo
    });
  },

  talkToCustomer() {
    var that = this;
    app.aldstat.sendEvent('详情页-客服');
    this.setData({
      hideContactButton: false
    });
    setTimeout(() => {
      that.setData({
        hideContactButton: true
      });
    }, 4000);
  },

  /**
   * 提示信息
   */
  showTips: function (title) {
    wx.showToast({
      title: title,
      duration: 1000,
      icon: 'success'
    })
  },

  showMyTip(title) {
    var that = this;
    this.setData({
      isShowPopup: true,
      tip: title
    });
    setTimeout(() => {
      that.setData({
        isShowPopup: false
      });
    }, 3000)
  },

  // 隐藏预约提示
  hideTip() {
    this.setData({
      showTip: false
    });
  }

})