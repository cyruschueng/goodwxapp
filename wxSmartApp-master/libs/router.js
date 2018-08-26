

function navigateTo(url, sucBack) {
  wx.navigateTo({
    url: url,
    success: function (res) {
      sucBack ? sucBack(res) : "";
    }
  })
};

function redirectTo(url, sucBack) {
  wx.redirectTo({
    url: url,
    success: function (res) {
      // success
    },
    fail: function () {
      // fail
    },
    complete: function () {
      // complete
    }
  })
};
function reLaunch(url, sucBack) {
  wx.redirectTo({
    url: url,
    success: function (res) {
      // success
    },
    fail: function () {
      // fail
    },
    complete: function () {
      // complete
    }
  })
};
// 返回首页
export function reToMainPage () {
  let url = '../main/main';
  redirectTo(url);
}
// 用户列表
export function goToUserList (id) {
  let url = '../userList/userList?id=' + id;
  navigateTo(url);
}
// 领取设备

// export function goToReceiveDev(money,deviceId) {
  
//   let url = '../receiveDev/receiveDev?money=' + money + '&deviceId=' + deviceId;

//   navigateTo(url);
// }

// 跳到扫码功能选择画面
export function goToScaneCode(isManager, deviceId, deviceNo) {

  let url = '../scaneCode/scaneCode?isManager=' + isManager + '&deviceId=' + deviceId
            + '&deviceNo=' + deviceNo;

  navigateTo(url);
}

// 支付使用费
export function goToPayUseFee() {
  let url = '../payUseFee/payUseFee';
  redirectTo(url);
}
// 分享
export function goToShare() {
  let url = '../share/share';
  navigateTo(url);
};
// 分享详情
export function goToShareDetail(id, source) {
  let url = '../shareDetail/shareDetail?id=' + id + '&source=' + source;
  navigateTo(url);
};
// 用户中心
export function goToUser() {
  let url = '/pages/user/user';
  reLaunch(url);
}; 
// 我的钱包
export function goToMyWallet() {
  let url = '../myWallet/myWallet';
  navigateTo(url)
};
// 手机验证
export function goToPhoneTest() {
  let url = '../textMessage/textMessage';
  navigateTo(url)
};
// 用户详情
export function goToUserInfo() {
  let url = '../userInfo/userInfo';
  navigateTo(url)
};
// 我的设备
export function goToMyDevice() {
  let url = '../myDevice/myDevice';
  navigateTo(url);
};
// 附近的设备
export function goToNearbyDev() {
  let url = '../nearbyDev/nearbyDev';
  navigateTo(url);
};
// 关注列表
export function goToFollowList() {
  let url = '../followList/followList';
  navigateTo(url);
};
// 粉丝列表
export function goToFansList() {
  let url = '../fansList/fansList';
  navigateTo(url);
};
// 交易明细
export function goToWalletLog() {
  let url = '../walletLog/walletLog';
  navigateTo(url);
};
// 地图导航
export function goToMapNav(mapData) {
  let url = '../mapNav/mapNav?lng=' + mapData.lng + '&lat=' + mapData.lat;
  navigateTo(url);
};