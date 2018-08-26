var common = require('../../common/common.js');
var util = require('../../common/util.js')
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stardate: '',
    array: [{ id: 1, name: '银承纸票' }, { id: 2, name: '商承纸票' }, { id: 3, name: '银承电票' }, { id: 4, name: '商承电票' }],
    index: 0,
    imgtop: '../../image/top.png',
    imgbottom: '../../image/bottom.png',
    imgdelete: '../../image/x1.png',
    drawerView: false,
    labelView: false,
    label_name:'',
    todolabels: [],
    accessid: '',
    host: '',
    policy: '',
    signature: '',
    expire: '',
    upload_dir: '',
    filename: '',
    pics:[],
    picslocal: [],
    //zhanglianhao
    sumMoney:'',
    calshow:true,
    quantity:'',
    all:'',
    picslocalimg:[],
    picsimg:[],
    now:util.formatTime2(new Date),
    calculateDate: {},
    disabled: false,
    bindForm: []
  },
  //监听售价---zhanglianhao
  sumchange:function(e){
    this.setData({
      all:e.detail.value
    })
  },
  quantitychange:function(e){
    this.setData({
      quantity:e.detail.value
    })
  },
  bindStartDateChange:function(e){
    this.setData({
      stardate:e.detail.value
    })
  },
  //计算售价----zhanglianhao
  toCalculator:function(){
    var all=this.data.all
    var quantity=this.data.quantity
    var stardate=this.data.stardate
    var sumMoney=parseInt(all*quantity)
    wx.navigateTo({
      url:`../calculator/calculator?sumMoney=${all}&quantity=${quantity}&stardate=${stardate}&calshow=${this.data.calshow}`
    })
  },
  //月份加6
  monthPlus:function(curr, num){
    var date=curr//this.data.start_date
    var now=date.split('-')
    var year=now[0]
    var month=parseInt(now[1])
    var days=now[2]

    //判断加6个月是否超过一年
    var substract=(month+num)-12
    if (substract<=0) {
      year=year
      if (month+num<10) {
        month='0'+(month+num)
      } else {
        month=month+num
      }
    } else {
      year=parseInt(year)+1
      month='0'+((month+num)-12)
    }

    //当月份为二月时，根据闰年还是非闰年判断天数
    if (parseInt(month)==2) {
      var sdays
      sdays=(year % 4 == 0) && (year % 100 != 0 || year % 400 == 0) ? 29 : 28
      days=days>sdays?sdays:days
    } else if (parseInt(month) == 1 || parseInt(month) == 3 || parseInt(month) == 5 || parseInt(month) == 7 || parseInt(month) == 8 || parseInt(month) == 10 || parseInt(month) == 12) {
      days=days
    } else {
      days=days>30?30:days
    }
    var end_date=[year, month, days].join('-')
    return end_date
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    _this.setData({
      picslocal: [],
      disabled: false
    })
    //接收计算的值
    /*if (options.surplus) {
      _this.setData({
        sumMoney:options.surplus,
        all:options.all,
        quantity:options.quantity,
        stardate:options.stardate
      })
    }*/


    //获取storage的token
    wx.getStorage({
      key: 'tokenstorage',
      success: function (res) {
        _this.setData({
          tokenstorage: res.data,
        })
      }
    })
    //获取storage的swap
    wx.getStorage({
      key: 'swapstorage',
      success: function (res) {
        _this.setData({
          swapstorage: res.data,
        })
      }
    })
    //验证---
    this.WxValidate = app.globalDataValidate(
      {
        draft_value: {
          required: true,
          max: 100000
        },
        draft_count: {
          required: true,
          max: 1000
        },
        sell_price: {
          max: 1000000000
        },
        acceptance: {
          maxlength: 20
        },
        address: {
          maxlength: 10
        }
      }
      , {
        draft_value: {
          required: '请输入总金额',
          max: '总金额不能\n大于10亿',
        },
        draft_count: {
          required: '请输入汇票张数',
          max: '汇票张数不能\n大于1000张',
        },
        sell_price: {
          max: '售价不能\n大于10亿',
        },
        acceptance: {
          maxlength: '承兑人不能\n超过20字符'
        },
        address: {
          maxlength: '交易地点不能\n超过10字符'
        }
      }
    )
  },
  //换取 token
  exchangeToken: function (e) {
    var _this = this;
    wx.request({
      url: common.getRequestUrl + '/dtk/users/token',
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'swap': _this.data.swapstorage
      },
      success: function (res) {
        if (res.data.code == 'OK') {
          wx.setStorageSync('tokenstorage', res.data.token)
          _this.setData({
            tokenstorage: res.data.token
          })
          setTimeout(function () {
            if (e == 1) {
              _this.logoSignature()
            } else if (e == 2) {
              _this.formSubmit(_this.data.bindForm)
            }
          }, 1000);
        } else if (res.data.code == 'USER_NOT_LOGIN') {
          app.userLogin(e)
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'cancel',
            duration: 2000
          })
          try {
            wx.setStorageSync('tokenstorage', '');
            wx.setStorageSync('swapstorage', '')
            wx.setStorageSync('myData', '')
            wx.setStorageSync('avatarInfo', '')
            _this.setData({
              tokenstorage: '',
              swapstorage: '',
              myData: '',
              srcavatar: '../../image/m.png'
            })
          } catch (e) {
          }
          setTimeout(function () {
            wx.switchTab({
              url: '../index/index'
            })
          }.bind(this), 500);
        }
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },
  /**
   * 监听普通picker选择器
   */
  bindChange: function (e) {
    this.setData({
      index: e.detail.value
    });
  },
  drawerToggle: function () {
    var _this = this;
    var toggle = _this.data.drawerView;
    if (toggle) {
      this.setData({
        drawerView: false
      })
    } else {
      this.setData({
        drawerView: true
      })
    }

  },

  //添加标签------------------------------------------------------------------------------------------------------
  updateLabelData: function (resettodolabels) {
    var data = {};
    if (resettodolabels) {
      data.todolabels = this.data.todolabels;
    }

    data.todolabelsOfUncomplted = this.data.todolabels.filter(function (t) {
      return !t.complete;
    });

    data.todolabelsOfComplted = this.data.todolabels.filter(function (t) {
      return t.complete;
    });

    this.setData(data);
  },
  updateLabelStorage: function () {
    var storage = [];
    this.data.todolabels.forEach(function (t) {
      storage.push({
        id: t.id,
        text: t.text,
        complete: t.complete
      })
    });

    wx.setStorageSync('todolabels', storage);
  },
  addLabel: function (e) {
    if (!this.data.label_name) return;
    if (this.data.label_name.length > 10){
      wx.showToast({
        title: '标签信息不能超过10个字符',
        duration: 2000
      })
      return;
    }
    this.setData({
      labelView: true
    })
    var that = this;
    setTimeout(function () {
      that.data.todolabels.push({
        id: app.getId(),
        label_name: that.data.label_name
      });
      that.setData({
        label_name: ''
      });

      that.updateLabelData(true);
      that.updateLabelStorage();
    }, 500);
  },
  bindLabelName: function (e) {
    this.setData({
      label_name: e.detail.value
    })
  },
  //删除标签
  clearLabelSingle: function (e) {
    var id = this.getTodoIdLabel(e, 'label-del-item-');
    var label = this.getTodoLabel(id);

    label.loading = true;
    this.updateLabelData(true);

    var that = this;
    setTimeout(function () {
      that.clearTodoLabel(id);
      that.updateLabelData(true);
      that.updateLabelStorage();
    }, 500);
  },
  getTodoLabel: function (id) {
    return this.data.todolabels.filter(function (t) {
      return id == t.id;
    })[0];
  },
  getTodoIdLabel: function (e, prefix) {
    return e.currentTarget.id.substring(prefix.length);
  },
  clearTodoLabel: function (id) {
    var targetIndex;
    this.data.todolabels.forEach(function (t, i) {
      if (targetIndex !== undefined) return;

      if (t.id == id) {
        targetIndex = i;
      }
    });

    this.data.todolabels.splice(targetIndex, 1);
  },
  formSubmit: function (e) {
    if (!this.WxValidate.checkForm(e)) {
      const error = this.WxValidate.errorList[0]
      wx.showToast({
        title: `${error.msg} `,
        duration: 2000
      })
      return false
    }
    var that = this;
    console.log('几张图片那？？？？？？')
    console.log(that.data.pics)
    //return;
    that.setData({
      bindForm: e
    });
    var tagsname = [];
    var tags = that.data.todolabels
    for (var j = 0; j < tags.length; j++) {
      delete tags[j]["id"];
      tagsname.push(tags[j]["label_name"])
    }

    //总金额 0-1000000000，0时显示不限
    if (e.detail.value.draft_value == '') {
      var draft_value = 0;
    } else {
      var draft_value = Number(e.detail.value.draft_value + '0000');
    }
    //汇票张数
    if (e.detail.value.draft_count == '') {
      var draft_count = 0;
    } else {
      var draft_count = parseInt(e.detail.value.draft_count);
    }
    //售价
    if (e.detail.value.sell_price == '') {
      var sell_price = 0;
    } else {
      var sell_price = parseInt(e.detail.value.sell_price);
    }
    

    that.setData({
      loadingHidden: false,
      disabled: true
    });
    wx.request({
      url: common.getRequestUrl + '/dtk/drafts/sell',
      data: {
        'draft_type': that.data.array[that.data.index].id,
        'draft_value': draft_value,
        'draft_count': draft_count,
        'draft_end_date': e.detail.value.draft_end_date,
        'sell_price': sell_price,
        'acceptance': e.detail.value.acceptance,
        'address': e.detail.value.address,
        'tags': tagsname,
        'pics': that.data.pics
      },
      method: 'POST',
      header: {
        'content-type': 'application/json',
        'token': this.data.tokenstorage
      },
      success: function (res) {
        if (res.data.code == 'OK') {
          wx.showToast({
            title: '添加成功',
            icon: 'success',
            duration: 2000
          })
          wx.redirectTo({
            url: '../ticketdetail/ticketdetail?id=' + res.data.drafts_id
          })

        } else if (res.data.code == 'TOKEN_INVLID') {
          that.exchangeToken(2)
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'success',
            duration: 2000
          })
          setTimeout(function () {
            wx.switchTab({
              url: '../index/index'
            })
          }.bind(this), 500);
        }
      }
    })
  },
  /**
* 上传图片
*/
  business_license_pic: function () {
    var _this = this;
    if (_this.data.pics.length > 5){
      wx.showToast({
        title: '最多上传6张',
        icon: 'cancel',
        duration: 2000
      })
    }else{
      _this.logoSignature(1)
      /*setTimeout(function () {
        _this.chooseImageBox()
      }.bind(_this), 500);
*/
    }

  },
  //提交上传图片
  chooseImageBox: function () {
    var _this = this;
    wx.chooseImage({
      count: 1, // 最多可以选择的图片张数，默认9
      sizeType: ['compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function (res) {
        const src = res.tempFilePaths[0]
        var picslocalimg = _this.data.picslocalimg;
        picslocalimg.push(src)
        setTimeout(function () {
          _this.setData({
            picslocal: picslocalimg
          })
        }, 500);
        var fileExtension = src.substring(src.lastIndexOf('.') + 1);
        var key = _this.data.filename + '.' + fileExtension;
        wx.uploadFile({
          url: _this.data.host,
          filePath: src,
          name: 'file',
          header: {
            'token': _this.data.tokenstorage
          },
          formData: {
            name: src,
            key: _this.data.upload_dir + _this.data.filename + '.' + fileExtension,
            policy: _this.data.policy,
            OSSAccessKeyId: _this.data.accessid,
            success_action_status: '200',
            signature: _this.data.signature
          },
          success: function (res) {
            if (res.statusCode == '200') {
              var picsimg = _this.data.picsimg;
              picsimg.push(key)
              console.log(key)
              setTimeout(function () {
                _this.setData({
                  pics: picsimg
                })
              }, 1000);
              wx.showToast({
                title: '上传成功',
                icon: 'cancel',
                duration: 2000
              })
            } else {
              wx.showToast({
                title: res.data.msg,
                icon: 'cancel',
                duration: 2000
              })
            }
          },
          fail: function (err) {
            console.log(err)
          }
        })


      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  //取得logo上传签名
  logoSignature: function (e) {
    console.log("取得logo上传签名");
    var _this = this;
    wx.request({
      url: common.getRequestUrl + '/dtk/drafts/sign',
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token': this.data.tokenstorage
      },
      success: function (res) {
        console.log(res.data.sign)
        if (res.data.code == 'OK') {
          _this.setData({
            accessid: res.data.sign.accessid,
            host: res.data.sign.host,
            policy: res.data.sign.policy,
            signature: res.data.sign.signature,
            expire: res.data.sign.expire,
            upload_dir: res.data.sign.upload_dir,
            filename: res.data.sign.filename
          })
          if(e==1){
            setTimeout(function () {
              _this.chooseImageBox()
            }.bind(_this), 500);
          }
        } else if (res.data.code == 'TOKEN_INVLID') {
          _this.exchangeToken(1)
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'success',
            duration: 2000
          })
          setTimeout(function () {
            wx.switchTab({
              url: '../index/index'
            })
          }.bind(this), 500);
        }
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('onShow------------')
    var _this=this;
    _this.setData({
      picslocal: [],
      stardate:this.monthPlus(this.data.now, 6)
    })

    var calculateDate=this.data.calculateDate
    // console.log(Object.keys(calculateDate).length)
    //接收上个页面的参数
    if (Object.keys(calculateDate).length!==0) {
      var pages=getCurrentPages()
      var currPage=pages[pages.length-1]//当前页面
      _this.setData({
        sumMoney:this.data.calculateDate.surplus,
        all:this.data.calculateDate.all,
        quantity:this.data.calculateDate.quantity,
        stardate:this.data.calculateDate.stardate
      })
      console.log(this.data.calculateDate)
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作

  onPullDownRefresh: function () {

  },
   */
  /**
   * 页面上拉触底事件的处理函数

  onReachBottom: function () {

  },
   */
  /**
   * 用户点击右上角分享

  onShareAppMessage: function () {

  }
     */
  /* 删除上传图片 */
  picslocalDelete: function (event){
    var picslocalbox = event.currentTarget.dataset.picslocalbox;
    var _this=this;
    _this.removeByValue(_this.data.picslocal, picslocalbox);
  },
  removeByValue:function (arr, val) {
    var _this = this;
    var pics = _this.data.pics
    for(var i= 0; i<arr.length; i++) {
      if (arr[i] == val) {
          arr.splice(i, 1);
          pics.splice(i, 1);
          _this.setData({
            picslocal: arr,
            picslocalimg: arr,
            pics: pics,
            picsimg: pics
          })
      }
    }
  },



})
