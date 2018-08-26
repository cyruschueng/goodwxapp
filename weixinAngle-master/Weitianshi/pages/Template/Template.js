var app = getApp();
var url = app.globalData.url;
var url_common = app.globalData.url_common;
// 错误提示消失
function errorHide(target, errorText, time) {
  var that = target;
  that.setData({
    error: "1",
    error_text: errorText
  });
  var errorTime = setTimeout(function () {
    that.setData({
      error: "0"
    });
  }, time);
}

// 多选标签页面间传值显示
function dealTagsData(that,data,dataCard,itemValue, itemId) {
  if (data) {
    dataCard.value = [];
    dataCard.id = [];
    data.forEach((x) => {
      if (x.check == true) {
        dataCard.id.push(x[itemId]);
        dataCard.value.push(x[itemValue]);
      }
    });
  }
  if (dataCard.value != "选择领域") {
    dataCard.css = "checkOn";
  } else {
    dataCard.css = "";
  }
  // console.log(dataCard.value,dataCard.id);
}

// 上滑加载
function loadMore(projectCheck, url, that, api, page, parameter, user_id, page_end) {
  if (projectCheck) {
    if (user_id != '') {
      if (page_end == false) {
        wx.showToast({
          title: 'loading...',
          icon: 'loading'
        });
        page++;
        that.setData({
          page: page
        });
        wx.request({
          url: url + api,
          data: {
            res_id: parameter,
            page: page,
          },
          method: 'POST',
          success: function (res) {
            app.log(that,"资源需求匹配的分页加载接口",res);
            that.callback(res, that);
          }
        });
        return;
      } else {
        app.errorHide(that, "没有更多了", 3000);
      }
    }
  }

}

// 循环出用户投资信息
function userNeed(that) {
  var userNeed = {};
  var user_industry = [];
  var user_industryId = [];
  var user_area = [];
  var user_areaId = [];
  var user_stage = [];
  var user_stageId = [];
  var user_scale = [];
  var user_scaleId = [];
  var user_id = wx.getStorageSync('user_id');
  if (user_id != 0) {
    wx.request({
      url: url + '/api/investors/checkInvestorInfo',
      data: {
        user_id: user_id
      },
      method: 'POST',
      success: function (res) {
        var investor = res.data.data;
        var industry = investor.industry_tag;
        for (var i = 0; i < industry.length; i++) {
          user_industry.push(industry[i].industry_name);
          user_industryId.push(industry[i].industry_id);
        }
        var area = investor.area_tag;
        for (var i = 0; i < area.length; i++) {
          user_area.push(area[i].area_title);
          user_areaId.push(area[i].area_id);
        }
        var scale = investor.scale_tag;
        for (var i = 0; i < scale.length; i++) {
          user_scale.push(scale[i].scale_money);
          user_scaleId.push(scale[i].scale_id);
        }
        var stage = investor.stage_tag;
        for (var i = 0; i < stage.length; i++) {
          user_stage.push(stage[i].stage_name);
          user_stageId.push(stage[i].stage_id);
        }
      }
    });
  }
  userNeed.user_industry = user_industry;
  userNeed.user_industryId = user_industryId;
  userNeed.user_area = user_area;
  userNeed.user_areaId = user_areaId;
  userNeed.user_stage = user_stage;
  userNeed.user_stageId = user_stageId;
  userNeed.user_scale = user_scale;
  userNeed.user_scaleId = user_scaleId;
  return userNeed;
}

// 添加人脉
function addNetWork(that, follow_user_id, followed_user_id) {
  wx.request({
    url: url + '/api/user/followUser',
    data: {
      user_id: follow_user_id,
      followed_user_id: followed_user_id
    },
    method: 'POST',
    success: function (res) {
      if (res.data.status_code == 2000000) {
        wx.showModal({
          title: "提示",
          content: "添加人脉成功",
          showCancel: false,
          confirmText: "到人脉库",
          success: function (res) {
            app.href('/pages/discoverInvest/discoverInvest');
          }
        });
      } else {
        wx.showModal({
          title: "提示",
          content: "您已经添加过此人脉",
          showCancel: false,
          confirmText: "到人脉库",
          success: function () {
            app.href('/pages/discoverInvest/discoverInvest');
          }
        });
      }
    },
    fail: function (res) {
      wx.showModal({
        title: "错误提示",
        content: "添加人脉失败" + res
      });
    },
  });
}

// 函数输出
module.exports = { errorHide, userNeed, loadMore, dealTagsData };

