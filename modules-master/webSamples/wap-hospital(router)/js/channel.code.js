'use strict';
(function() {
  var pjc = getUrlParam('projectCode');
  pjc&&(sessionStorage.projectCode = pjc);
  pjc = pjc || sessionStorage.projectCode;
  if(pjc) {
    if(bs.v.weixin) {
      var openid = docCookies.getItem('openid'),
          hostye= location.href.indexOf('waptest')>-1?'//jh.3uol.com':'',
        getOpenid = function() { location.href = hostye+ '/api/wxgetopenid/?returnurl=' + encodeURIComponent(location.href) };
      openid ? Post(config.host + '/v2/ChildCareUser/GetProjectVisitCount', {
        projectCode: pjc,
        openid: openid,
        token: config.token || ''
      }, function(data) {
        config.wxImgurl=data.data.icon;
      }) : getOpenid();
    }
  }
}());