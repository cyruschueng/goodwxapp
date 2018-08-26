var app = getApp();
var url = app.globalData.url;
var url_common = app.globalData.url_common;
Page({
  data: {
    array: ['否', '是'],
    upLoadSuccess: false,
    personCode: true,
    personTime: 60,
    codeColor: true,
  },
  onLoad: function (option) {
    let that = this;

    //请求各种标签列表项
    wx.request({
      url: app.globalData.url_common + '/api/category/getProjectCategory',
      method: 'POST',
      success: function (res) {
        var thisData = res.data.data;
        //添加false
        that.for(thisData.area);
        that.for(thisData.industry);
        that.for(thisData.scale);
        that.for(thisData.stage);

        wx.setStorageSync('y_area', thisData.area);//地区
        wx.setStorageSync('industry', thisData.industry);//投资领域
        wx.setStorageSync('y_scale', thisData.scale);//投资金额
        wx.setStorageSync('y_stage', thisData.stage);//投资阶段
      }
    })

    //用来判断是否是重新认证
    let recertification = option.isUpdate;
    // group_id 18:买方FA 19:卖方FA  6:投资人 3:创业者 8:其他
    let group_id = option.group_id;
    let authenticate_id = option.authenticate_id;
    let user_id = wx.getStorageSync('user_id');
    that.setData({
      group_id: group_id,
      recertification: recertification
    })
    //请求数据  recertification 1: 重新认证  0: 第一次认证
    if (recertification == 1) {
      wx.request({
        url: url_common + '/api/user/getUserGroupByStatus',
        data: {
          user_id: user_id
        },
        method: 'POST',
        success: function (res) {
          // 0:未认证1:待审核 2 审核通过 3审核未通过
          let status = res.data.status;
          let group_id = res.data.group.group_id;
          let authenticate_id = res.data.authenticate_id;
          that.setData({
            status: status,
            group_id: group_id,
            // type: type,
            authenticate_id: authenticate_id
          })
          wx.request({
            url: url_common + '/api/user/getUserAuthenticateInfo',
            data: {
              user_id: user_id,
              authenticate_id: authenticate_id
            },
            method: 'POST',
            success: function (res) {
              let user_info = res.data.user_info;
              let invest_info = res.data.invest_info;
              that.dealTags(that, invest_info);
              that.setData({
                user_info: user_info,
                invest_info: invest_info,
                is_FA_part: user_info.is_FA_part,
                is_alliance: user_info.is_alliance,
                is_financing: user_info.is_finacing,
                is_identify_member: user_info.is_identify_member,
                is_saas: user_info.is_saas
              })
            }
          })
        }
      })
    } else if (recertification == 0) {
      wx.request({
        url: url_common + '/api/user/getUserBasicInfo',
        data: {
          user_id: user_id
        },
        method: 'POST',
        success: function (res) {
          let user_info = res.data.user_info;
          let invest_info = res.data.invest_info;
          that.dealTags(that, invest_info);
          that.setData({
            user_info: user_info,
            invest_info: invest_info,
            authenticate_id: authenticate_id
          })
        }
      })
    }
  },
  onShow: function () {
    //更改某一项表单值后返回表单页面数据更新
    let invest_info = this.data.invest_info;
    let user_info = this.data.user_info;
    let industryCurrent1 = wx.getStorageSync('industryCurrent1') || [];
    let scaleValue = wx.getStorageSync('paymoneyenchangeValue') || [];
    let stageValue = wx.getStorageSync('payenchangeValue') || [];
    let areaValue = wx.getStorageSync('payareaenchangeValue') || [];
    let scaleId = wx.getStorageSync('paymoneyenchangeId') || [];
    let stageId = wx.getStorageSync('y_payStageId') || [];
    let areaId = wx.getStorageSync('payareaenchangeId') || [];
    let industryId = [];
    industryCurrent1.forEach(x => {
      industryId.push(x.industry_id)
    })
    let newScale = [];
    let newStage = [];
    let newArea = [];
    scaleValue.forEach(x => {
      newScale.push({ scale_money: x })
    })
    stageValue.forEach(x => {
      newStage.push({ stage_name: x })
    })
    areaValue.forEach(x => {
      newArea.push({ area_title: x })
    })
    //如果是由更改表单某一项内容后返回该页面的话
    if (invest_info) {
      invest_info.invest_industry = industryCurrent1;
      invest_info.invest_scale = newScale;
      invest_info.invest_stage = newStage;
      invest_info.invest_area = newArea;
      this.setData({
        invest_info: invest_info,
        industryId: industryId,
        scaleId: scaleId,
        stageId: stageId,
        areaId: areaId
      })
    }
  },
  // 姓名type:0 手机type:1 品牌type:2 公司type:3 职位type:4 邮箱type:5  微信type:6 个人描述type:7
  //写入内容
  writeNewThing: function (e) {
    let type = e.currentTarget.dataset.type;
    let writeNameValue = this.data.user_info.user_real_name;
    let writeBrand = this.data.user_info.user_brand;
    let writeCompany = this.data.user_info.user_company_name;
    let writeCareer = this.data.user_info.user_company_career;
    let writeEmail = this.data.user_info.user_email;
    let writeWeChat = this.data.user_info.user_wechat;
    let writeDescrible = this.data.user_info.user_intro;
    if (type == 0) {
      app.href('/pages/form/personInfo/personInfo?name=' + writeNameValue + '&&type=0')
    } else if (type == 2) {
      app.href('/pages/form/personInfo/personInfo?brand=' + writeBrand + '&&type=2')
    }
    else if (type == 3) {
      // 跳转公司模糊搜索
      app.href('/pages/search/search1/search1?company=' + writeCompany + '&&type=3')
    }
    else if (type == 4) {
      app.href('/pages/form/personInfo/personInfo?career=' + writeCareer + '&&type=4')
    }
    else if (type == 5) {
      app.href('/pages/form/personInfo/personInfo?email=' + writeEmail + '&&type=5')
    }
    else if (type == 6) {
      app.href('/pages/form/personInfo/personInfo?writeWeChat=' + writeWeChat + '&&type=6')
    } else if (type == 7) {
      app.href('/pages/form/personInfo/personInfo?writeDescrible=' + writeDescrible + '&&type=7')
    }
  },
  // 上传名片
  scanIDcard: function () {
    let user_id = wx.getStorageSync('user_id');
    let group_id = this.data.group_id;
    let authenticate_id = this.data.authenticate_id;
    var that = this;
    wx.chooseImage({
      count: 1,
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        let size = res.tempFiles[0].size;
        if (size <= 1048576) {
          wx.uploadFile({
            url: url_common + '/api/user/uploadCard', 
            filePath: tempFilePaths[0],
            name: 'file',
            formData: {
              'user_id': user_id,
              'authenticate_id': authenticate_id
            },
            success: function (res) {
              let data = JSON.parse(res.data);
              if (data.status_code == 2000000) {
                wx.showToast({
                  title: '成功',
                  icon: 'success',
                  duration: 2000
                })
                that.setData({
                  upLoadSuccess: true
                })
              }
            }
          })
        } else {
          app.errorHide(that, "上传图片不能超过1M", 1500)
        }
      }
    })
  },
  // 跳转投资领域
  toIndustry: function () {
    app.href('/pages/form/industry/industry?current=1')
  },
  // 跳转投资轮次
  toScale: function () {
    app.href('/pages/form/scale/scale')
  },
  // 跳转投资金额
  toStage: function () {
    app.href('/pages/form/stage/stage')
  },
  // 跳转投资地区
  toArea1: function () {
    app.href('/pages/form/area2/area2')
  },
  // 申请加入FA行业联盟
  bindFAService: function (e) {
    this.setData({
      is_alliance: e.detail.value
    })
  },
  // FA服务
  addFAService: function (e) {
    this.setData({
      is_identify_member: e.detail.value
    })
  },
  // sass服务
  sass: function (e) {
    this.setData({
      is_saas: e.detail.value
    })
  },
  // 兼职FA
  partFA: function (e) {
    this.setData({
      is_FA_part: e.detail.value
    })
  },
  // 需要FA顾问
  needFA: function (e) {
    this.setData({
      is_financing: e.detail.value
    })
  },
  // 提交保存跳转
  submit: function () {
    let user_id = wx.getStorageSync('user_id');
    let authenticate_id = this.data.authenticate_id;
    let group_id = this.data.group_id;
    let iden_name = this.data.user_info.user_real_name;
    let iden_company_name = this.data.user_info.user_company_name;
    let iden_company_career = this.data.user_info.user_company_career;
    let iden_email = this.data.user_info.user_email;
    let iden_wx = this.data.user_info.user_wechat;
    let iden_desc = this.data.user_info.user_intro;
    let iden_brand = this.data.user_info.user_brand;
    let is_financing = this.data.is_financing;
    let is_alliance = this.data.is_alliance;
    let is_identify_member = this.data.is_identify_member;
    let is_saas = this.data.is_saas;
    let is_FA_part = this.data.is_FA_part;
    let industry = this.data.industry;
    let area = this.data.area;
    let stage = this.data.stage;
    let scale = this.data.scale;
    let recertification = this.data.recertification;
    if (iden_name != '' && iden_company_name != '' && iden_company_career != '') {
      wx.request({
        url: url_common + '/api/user/saveUserAuthentication',
        data: {
          user_id: user_id,
          authenticate_id: authenticate_id,
          iden_name: iden_name,
          iden_company_name: iden_company_name,
          iden_company_career: iden_company_career,
          iden_email: iden_email,
          iden_wx: iden_wx,
          iden_desc: iden_desc,
          iden_brand: iden_brand,
          is_financing: is_financing,
          is_alliance: is_alliance,
          is_identify_member: is_identify_member,
          is_saas: is_saas,
          is_FA_part: is_FA_part,
          industry: this.data.industryId,
          area: this.data.areaId,
          stage: this.data.stageId,
          scale: this.data.scaleId
        },
        method: 'POST',
        success: function (res) {
          let statusCode = res.data.status_code;
          if (statusCode == 2000000) {
            app.href('/pages/my/identity/identityResult/identityResult?authenticate_id=' + authenticate_id + '&&recertification=' + recertification)
          }
        }
      })
    } else {
      if (iden_name == '') {
        app.errorHide(that, "姓名不能为空", 1500)
      } else if (iden_company_name == '') {
        app.errorHide(that, "公司不能为空", 1500)
      } else if (iden_company_career == '') {
        app.errorHide(that, "职位不能为空", 1500)
      }
    }
  },
  //多选标签预处理
  dealTags(that, invest_info) {
    let scale = wx.getStorageSync('scale') || []
    let stage = wx.getStorageSync('stage') || []
    let hotCity = wx.getStorageSync('hotCity') || []
    //scale
    let paymoneyenchangeCheck = [];
    let paymoneyenchangeValue = [];
    let paymoneyenchangeId = [];
    scale.forEach((x, index) => {
      paymoneyenchangeCheck[index] = false;
      if (invest_info.invest_scale) {
        invest_info.invest_scale.forEach(y => {
          if (x.scale_money === y.scale_money) {
            paymoneyenchangeCheck[index] = true;
            paymoneyenchangeValue.push(x.scale_money);
            paymoneyenchangeId.push(x.scale_id)
          }
        })
      }
    })
    //stage
    let payenchangeCheck = [];
    let payenchangeValue = [];
    let payenchangeId = [];
    stage.forEach((x, index) => {
      payenchangeCheck[index] = false;
      if (invest_info.invest_stage) {
        invest_info.invest_stage.forEach(y => {
          if (x.stage_name === y.stage_name) {
            payenchangeCheck[index] = true;
            payenchangeValue.push(x.stage_name);
            payenchangeId.push(x.stage_id)
          }
        })
      }
    })
    //hotCity
    let payareaenchangeCheck = [];
    let payareaenchangeValue = [];
    let payareaenchangeId = [];
    hotCity.forEach((x, index) => {
      payareaenchangeCheck[index] = false;
      if (invest_info.invest_area) {
        invest_info.invest_area.forEach(y => {
          if (x.area_title === y.area_title) {
            payareaenchangeCheck[index] = true;
            payareaenchangeValue.push(x.area_title);
            payareaenchangeId.push(x.area_id)
          }
        })
      }
    })
    //industry
    let industryId = [];
    if (invest_info.invest_industry) {
      invest_info.invest_industry.forEach(x => {
        industryId.push(x.industry_id)
      })
    }
    that.setData({
      industryId: industryId,
      areaId: payareaenchangeId,
      stageId: payenchangeId,
      scaleId: paymoneyenchangeId
    })

    wx.setStorageSync('industryCurrent1', invest_info.invest_industry)
    wx.setStorageSync('paymoneyenchangeCheck', paymoneyenchangeCheck)
    wx.setStorageSync('paymoneyenchangeValue', paymoneyenchangeValue)
    wx.setStorageSync('paymoneyenchangeId', paymoneyenchangeId)
    wx.setStorageSync('payenchangeCheck', payenchangeCheck)
    wx.setStorageSync('payenchangeValue', payenchangeValue)
    wx.setStorageSync('payenchangeId', payenchangeId)
    wx.setStorageSync('payareaenchangeCheck', payareaenchangeCheck)
    wx.setStorageSync('payareaenchangeValue', payareaenchangeValue)
    wx.setStorageSync('payareaenchangeId', payareaenchangeId)
  },
  //给所有添加checked属性
  for: function (name) {
    for (var i = 0; i < name.length; i++) {
      name[i].checked = false;
    }
  },
  // 新用户获取验证码
  Code: function (e) {
    let check = e.currentTarget.dataset.check;
    this.setData({
      personCode: false
    });
    var personTime = 60;
    var timer = setInterval(() => {
      if (personTime > 1) {
        this.setData({
          personTime: personTime--,
        });
      } else {
        this.setData({
          personCode: true,
          personTime: 60
        });
      }
    }, 1000)
    var stop = setTimeout(() => {
      clearInterval(timer);
      this.setData({
        personCode: true,
        personTime: 60,
      });
    }, 60000)

  },
  // input获取焦点时停止倒计时
  personNo: function (e) {
    var that = this;
    clearTimeout(stop),
      that.setData({
        //  codeColor:false,
        personCode: false,
      });
  }
})