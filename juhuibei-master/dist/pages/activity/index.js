import { $wuxToptips } from '../../packages/@wux/components/wux';
import { $wuxDialog } from '../../packages/@wux/components/wux';
import WxValidate from '../../common/assets/plugins/WxValidate';
import api from '../../api/api_v1.js';

var gourmet_address = "";   // 详细地址
var gourmet_title = "";     // 地址标题
var latitude = 0;           // 纬度
var longitude = 0;          // 经度
const qiniuUploader = require("../../libs/qiniuUploader");

Page({
  data: {
    form: {
      "title": '',
      "description": '',
      "start_date": '',
      "start_time": '',
      "username": '',
      "phone": '',
      "numbers": '',
      "end_date": '',
      "end_time": ''
    },
    files: [],
    start_date: "2018-01-01",
    start_time: "12:00",
    end_date: "2018-01-01",
    end_time: "11:00",
    has_image: false,
    image_id: 0,
    uid: 0,
    title: '地图定位',
    isAgree: true,
    show: false
  },
  onLoad() {
    var that = this;
    var uid = wx.getStorageSync('uid')
    if (uid) {
      this.setData({ uid: uid })
      that.getUserInfo(uid)
      that.initValidate()
    } else {
      var token = new Token();
      token.getTokenFromServer((cb) => {
        that.setData({ uid: cb.uid })
        token.saveUserInfo(cb.uid)
        that.getUserInfo(cb.uid)
        that.initValidate()
      });
    }
  },
  /**
   * 获取用户信息 姓名和手机
   */
  getUserInfo: function(uid) {
    var that = this;
    api.getUserInfo({
      query: {
        user_id: uid
      },
      success: (res) => {
        console.log('getUserInfo', res)
        if (res.data.res === 0) {
          that.setData({
            username: res.data.data.username,
            phone: res.data.data.phone
          })
        }
      }
    })
  },
  showToptips(error) {
    const hideToptips = $wuxToptips.show({
      timer: 3000,
      text: error.msg || '请填写正确的字段',
      success: () => console.log('toptips', error)
    })

    // setTimeout(hideToptips, 1500)
  },
  submitForm: function(e) {
    console.log('image_id', this.data.image_id);
    var that = this;
    const params = e.detail.value;
    if (!this.WxValidate.checkForm(e)) {
      const error = this.WxValidate.errorList[0]
      this.showToptips(error)
      return false
    }
    if (!that.data.image_id) {
      this.showToptips({msg:'选择一张背景图片'})
      return false
    }
    if (!gourmet_title) {
      this.showToptips({msg:'选择聚会的位置'})
      return false
    }

    var data = {
      title: params.title,
      description: params.description,
      start_date: params.start_date,
      start_time: params.start_time,
      gourmet_address: gourmet_address,
      gourmet_title: gourmet_title,
      latitude: latitude,
      longitude: longitude,
      numbers: params.numbers,
      username: params.username,
      phone: params.phone,
      end_date: params.end_date,
      end_time: params.end_time,
      user_id: that.data.uid,
      image_id: that.data.image_id,
      form_id: e.detail.formId
    }

    api.saveActivity({
      method: 'post',
      data: data,
      success: (res) => {
        console.log('saveActivity', res);
        wx.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 1000,
          success: function () {
            wx.redirectTo({
              url: '/pages/home/index'
            });
          }
        });
      }
    })
    
    $wuxToptips.success({
      hidden: !0,
      text: '提交成功'
    })
  },
  initValidate() {
    this.WxValidate = new WxValidate({
      title: {
        required: true,
      },
      numbers: {
        required: true,
      },
      username: {
        required: true,
      },
      phone: {
        required: true,
        tel: true, 
      }
    }, {
        title: {
          required: '聚会主题，如三年一班十年同学聚会'
        },
        numbers: {
          required: '需要输入人数上限',
        },
        username: {
          required: '还没有填写姓名',
        },
        phone: {
          required: '还没有填写手机',
          tel: '请输入正确的手机号', 
        }
      })
  },
  chooseImage: function (e) {   
    wx.navigateTo({
      url: '/pages/cut_image/index?user_id=' + this.data.uid
    })
  },
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },
  bindStartDateChange: function (e) {
    this.setData({
      start_date: e.detail.value,
      end_date: e.detail.value
    })
  },
  bindStartTimeChange: function (e) {
    this.setData({
      start_time: e.detail.value,
      end_time: e.detail.value
    })
  },
  bindEndDateChange: function (e) {
    this.setData({
      end_date: e.detail.value
    })
  },
  bindEndTimeChange: function (e) {
    this.setData({
      end_time: e.detail.value
    })
  },
  chooseLocation: function () {
    var that = this;
    wx.chooseLocation({
      success: function (ret) {
        console.log('chooseLocation', ret)
        gourmet_address = ret.address
        gourmet_title = ret.name
        latitude = +ret.latitude //数值
        longitude = +ret.longitude //数值
        // 前端展示选择的地址标题
        that.setData({
          title: gourmet_title,
        })
      }
      , cancel: function () {
        geopoint = null;//退出之后对象清空
      }
    })
  },
  bindAgreeChange: function (e) {
    this.setData({
      isAgree: !!e.detail.value.length
    });
  },
  bindGroupTag() {
    $wuxDialog.alert({
      title: '限定微信群',
      content: '仅转发到的群成员可以报名',
      onConfirm(e) {
        console.log('我知道了')
      },
    })
  },
  showOrHide: function () {
    let show = this.data.show;
    this.setData({ show: !show });
    console.log(this.data.show);
  }
})