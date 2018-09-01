import { GLOBAL_API_DOMAIN } from '../../../utils/config/config.js'
import Api from '../../../utils/config/api.js';
var utils = require('../../../utils/util.js')
var app = getApp();
Page({
  data: {
    _build_url: GLOBAL_API_DOMAIN,   //域名
    article: app.globalData.article,   //获取全局变量
    isplus: true,
    addind: '',
    num: 0,
    title: '',  //标题
    coverimg: '',  //封面图片
    content: [],   //文章内容数据
    butt: ['预览', '提交', '退出文章编辑'],
  },

  onLoad: function (options) {  // 生命周期函数--监听页面加载
    let that = this;
    let _isIll = wx.getStorageSync('isIll')
    let _ismodi = wx.getStorageSync('ismodi')
    let _idnum = wx.getStorageSync('idnum')
    var article = app.globalData.article;  //获取全局变量
    let _text = wx.getStorageSync('text') //获取同步缓存数据

    if (_isIll) {
      let data = article;
      data[_idnum].txt = _text;
      that.setData({
        content: data
      })
      wx.setStorage({
        key: 'isIll',
        data: false,
      })
      wx.setStorage({
        key: 'idnum',
        data: '',
      })
    } else {
      if (_ismodi) {
        let obj = {
          type: 'text',
          value: _text
        }
        article[_idnum] = obj;
        wx.setStorage({
          key: 'ismodi',
          data: false,
        })
        wx.setStorage({
          key: 'idnum',
          data: '',
        })
      } else {
        if (_text) {
          let obj = {
            type: 'text',
            value: _text
          }
          article.push(obj);
        }
      }
    }


    wx.getStorage({
      key: 'cover',
      success: function (res) {
        if (res.data) {
          that.setData({
            coverimg: res.data
          })
        }
      }
    })

    wx.getStorage({
      key: 'title',
      success: function (res) {
        if (res.data) {
          that.setData({
            title: res.data
          })
        }
      }
    })

    wx.getStorage({
      key: 'content',
      success: function (res) {
        if (res.data) {
          let arr2 = res.data;
          article = article.concat(arr2)
        }
      }
    })

    this.setData({
      content: article
    })
  },
  onUnload: function () { //生命周期函数--监听页面卸载
  
  },
  onShow: function () {
  },
  bindblurinput: function (e) { //焦点离开标题框  获取框中value
    let that = this;
    let _title = e.detail.value;
    that.setData({
      title: _title
    })
    wx.setStorage({
      key: 'title',
      data: _title
    })

  },
  getcover: function () {  //获取封面图片
    this.getimg('b');
  },
  clickplus: function (e) {  //点击加号
    let ind = e.currentTarget.id;
    this.setData({
      isplus: false,
      addind: ind
    })
  },
  isplusf: function () {  //关闭选择图文
    this.setData({
      isplus: true
    })
  },
  clickimg: function () {  //添加内容图片
    let that = this;
    this.setData({
      isplus: true
    })
    this.getimg('a')
  },
  clicktxt: function () {  //添加文字
    this.setData({
      isplus: true
    })
    wx.redirectTo({
      url: 'text_input/text_input'
    })
  },
  changepicture: function (e) {  //更换内容中的图片
    let that = this;
    let ind = e.currentTarget.id;
    if (this.data.content[ind].type == 'img') {
      console.log(this.data.content[ind])
      this.getimg(ind)
    }
  },
  bindblurnote: function (e) {  //图片简介输入
    let that = this;
    let ind = e.currentTarget.id;
    let _value = e.detail.value;
    let data = that.data.content;
    if (data[ind].type == 'img') {
      data[ind].txt = _value;
      that.setData({
        content: data
      })
    }
  },
  illustrate: function (e) {  //点击编辑图片简介
    let ind = e.currentTarget.id;
    wx.setStorage({
      key: 'modi',
      data: this.data.content[ind].txt,
    })
    wx.setStorage({
      key: 'idnum',
      data: ind,
    })
    wx.setStorage({
      key: 'isIll',
      data: true,
    })
    wx.redirectTo({
      url: 'text_input/text_input'
    })
  },
  modify(e) {  //修改文本
    let ind = e.currentTarget.id
    wx.setStorage({
      key: 'modi',
      data: this.data.content[ind].value,
    })
    wx.setStorage({
      key: 'ismodi',
      data: true,
    })
    wx.setStorage({
      key: 'idnum',
      data: ind,
    })
    wx.navigateTo({
      url: 'text_input/text_input'
    })
  },
  FormSubmit(e) {  // 点击按钮
    let that = this
    wx.showToast({
      title: '正在提交，请稍后',
      mask:'true',
      icon: 'none',
      duration: 2000
    })
    let ind = e.currentTarget.id
    if (ind == 0) {  //  ['预览','提交','退出文章编辑']
      let [..._data] = this.data.content
      _data= JSON.stringify(_data)
      wx.navigateTo({
        content: [],   //文章内容数据
        url: 'article_details/article_details?content=' + _data+'&title='+this.data.title
      })
    } else if (ind == 1) {
      let sum = [];
      let _content = JSON.stringify(this.data.content);
      let _con = utils.utf16toEntities(_content)
      let _title = this.data.title;
      let _coverimg = this.data.coverimg;
      for (let i = 0; i < this.data.content.length; i++) {
        if (this.data.content[i].type == 'text') {
          if (this.data.content[i].value.length < 200) {
            let txt = this.data.content[i].value;
            sum.push(txt)
          } else {
            let txt = this.data.content[i].value.slice(0, 200);
            sum.push(txt)
          }
        }
      }
      let _sum =''
      if (sum[0] != undefined && sum[0] != ''){
        _sum = utils.utf16toEntities(sum[0])
      }
      if (!_coverimg) {
        wx.showToast({
          title: '请设置封面图片',
          icon: 'none',
          duration: 1500
        })
        return false
      }
      if (!_title) {
        wx.showToast({
          title: '请输入标题',
          icon: 'none',
          duration: 1500
        })
        return false
      }
      if (_content.length < 3) {
        wx.showToast({
          title: '请输入内容',
          icon: 'none',
          duration: 1500
        })
        return false
      }

      let _parms = {
        title: _title,
        content: _con,
        userId: app.globalData.userInfo.userId,
        summary: _title,
        homePic: _coverimg,
        userName: app.globalData.userInfo.userName,
        nickName: app.globalData.userInfo.nickName
      }
      Api.topicadd(_parms).then((res) => {
        if (res.data.code == 0) {
          
          setTimeout(function () {
            wx.showToast({
              title: '提交成功',
              icon: 'none',
              duration: 1500
            })
            that.setData({
              content: []
            })
            wx.switchTab({
              url: '../../discover-plate/discover-plate'
            })
            wx.setStorage({
              key: 'cover',
              data: ''
            })
            wx.setStorage({
              key: 'title',
              data: '',
            })
            wx.setStorage({
              key: 'text',
              data: '',
            })
          }, 1500)
        }
      })
    } else if (ind == 2) {
      wx.showModal({
        title: '提示',
        content: '退出编辑将清空数据',
        success: function (res) {
          if (res.confirm) {
            wx.switchTab({
              url: '../../discover-plate/discover-plate'
            })
          } else if (res.cancel) {
            // console.log('用户点击取消')
          }
        }
      })
    }
  },
  getimg: function (_type) {   // 获取图片  公用
    let that = this;
    wx.chooseImage({  //获取图片
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        let tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: that.data._build_url + 'img/upload',
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            'userName': app.globalData.userInfo.userName
          },
          success: function (res) {
            let article = getApp().globalData.article;  //获取全局变量
            let _data = res.data;
            _data = JSON.parse(_data);
            let _img = _data.data.smallPicUrl
            if (_type == 'a') {  //添加内容图片
              let obj = {
                type: 'img',
                value: _img,
                txt: ''
              }
              article.push(obj);
              that.setData({
                content: article
              })
            } else if (_type == 'b') {  //添加封面图片
              wx.setStorage({
                key: 'cover',
                data: _img
              })
              that.setData({
                coverimg: _img
              })
            } else {
              let data = that.data.content;
              data[_type].value = _img;
              article[_type].value = _img;
              that.setData({
                content: data,
                article:data
              })
            }
          },
          fail: function (res) {
            console.log("fail:", res)
          }
        })
      }
    })
  }

})