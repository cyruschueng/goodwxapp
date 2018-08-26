function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function requestApi(uri, request_data, succ_cb, fail_cb, complete_cb) {
  if (!request_data) {
    request_data = new Object();
  }
  request_data.sign = "yuedongyuedongyuedongyuedongwxapp";
  request_data.xyy = getUserXyy();
  wx.request({
    url: 'https://api.51yund.com' + uri,
    data: request_data,
    method: 'POST',
    dataType: "json",
    header: { 'content-type': 'application/x-www-form-urlencoded' },
    success: function (res) {
      if (succ_cb && typeof succ_cb === 'function') {
        succ_cb(res.data);
      }
    },
    fail: function (res) {
      if (fail_cb && typeof fail_cb === 'function') {
        fail_cb(res);
      }
    },
    complete: function () {
      if (complete_cb && typeof complete_cb === 'function') {
        complete_cb();
      }
    }
  });
}

function getUserGroupRank(userId, succ_cb, fail_cb){
  requestApi("/ydwxapp_rank/get_user_group_rank",{user_id: userId},function (res) {
    if (succ_cb && typeof succ_cb === 'function') {
      succ_cb(res);
    }
  }, function (res) {
    if (fail_cb && typeof fail_cb === 'function') {
      fail_cb(res);
    }
  })
}

function getUserInfo(userId, succ_cb, fail_cb) {
  requestApi("/sport/get_user_info", { user_ids: userId }, function (res) {
    if (succ_cb && typeof succ_cb === 'function') {
      succ_cb(res);
    }
  }, function (res) {
    if (fail_cb && typeof fail_cb === 'function') {
      fail_cb(res);
    }
  });
}

function saveUserIdXyy(userId, xyy) {
  wx.setStorageSync("user_id", userId);
  wx.setStorageSync("xyy", xyy);
  var currentTime = (new Date()).getTime();
  wx.setStorage({
    key: 'user_id_cache_time',
    data: currentTime,
  });
}

function getUserId() {
  try {
    var userId = wx.getStorageSync('user_id')
    if (userId) {
      return userId;
    }
  } catch (e) {

  }

  return -1;
}

function getUserIdCacheTime() {
  try {
    var userId = wx.getStorageSync('user_id_cache_time')
    if (userId) {
      return userId;
    }
  } catch (e) {

  }

  return -1;
}

function getUserXyy() {
  try {
    var xyy = wx.getStorageSync('xyy')
    if (xyy) {
      return xyy;
    }
  } catch (e) {
    console.log("storage xyy exception");
  }

  return "";
}

function isDisplayGuide() {
  try {
    var displayGuide = wx.getStorageSync('display_guide')
    if (displayGuide) {
      return displayGuide;
    }
  } catch (e) {
    console.log("storage display_guide exception");
  }

  return -1;
}

function setGuideOver() {
  try {
    wx.setStorage({ key: "display_guide", data: 1 });
  } catch (e) {
    console.log("storage display_guide exception");
  }

  return -1;
}

function showToast(title) {
  if (!title) {
    return;
  }
  wx.showToast({
    title: title,
    duration: 1800
  })
}

function showSuccToast(title) {
  if (!title) {
    title = "操作成功";
  }
  wx.showToast({
    title: title,
    icon: 'success',
    duration: 1800
  })
}

function showLoading() {
  wx.showToast({
    title: '加载中',
    icon: 'loading',
    duration: 100000
  })
}

function hideLoading() {
  wx.hideToast();
}

module.exports = {
  formatTime: formatTime,
  requestApi: requestApi,
  getUserInfo: getUserInfo,
  getUserId: getUserId,
  getUserXyy: getUserXyy,
  isDisplayGuide: isDisplayGuide,
  setGuideOver: setGuideOver,
  showLoading: showLoading,
  hideLoading: hideLoading,
  showToast: showToast,
  getUserIdCacheTime: getUserIdCacheTime,
  saveUserIdXyy: saveUserIdXyy,
  showSuccToast: showSuccToast,
  getUserGroupRank: getUserGroupRank
}
