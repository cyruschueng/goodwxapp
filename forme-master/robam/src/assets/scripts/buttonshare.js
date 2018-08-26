//share
import codoonBrige from './codoon-native-bridge';
var bridge = new codoonBrige();
function nativebtnShare(){
  var options = {
    shareImgUrl : "http://activity-codoon.b0.upaiyun.com/robam/upload/share.png",
    shareLineLink : "https://www.codoon.com/activity/v1/robam/share.html",
    shareDescContent :'纵情跑，只为放肆吃！掌控身体，纵享美食！老板电器疯狂卡路里——趁现在，动起来！',
    shareCodoonLineLink : "https://www.codoon.com/activity/v1/robam/index.html",
    shareTitle : '老板电器618疯狂卡路里——趁现在，动起来！'
  };
  bridge.nativeCustomerShare({
    sCodoonShareImgUrl : options.shareImgUrl,
    sCodoonShareLineLink : options.shareLineLink,
    sCodoonShareDescContent : options.shareDescContent,
    sCodoonShareCodoonLineLink : options.shareCodoonLineLink,
    sCodoonShareTitle : options.shareTitle,
    oCodoonShareDestination : {
      'codoonTimeline' : true,
      'codoonGroup' : false,
      'weixinToFriend' : true,
      'weixinToTimeline' : true,
      'sinaWeibo' : false,
      'tencentQQ' : false,
      'tencentQzone' : false
    }
  });

  setTimeout(function () {
    bridge.nativeTopButtonShare({
      sCodoonShareImgUrl : options.shareImgUrl,
      sCodoonShareLineLink : options.shareLineLink,
      sCodoonShareDescContent : options.shareDescContent,
      sCodoonShareCodoonLineLink : options.shareCodoonLineLink,
      sCodoonShareTitle : options.shareTitle,
      oCodoonShareDestination : {
        'codoonTimeline' : false,
        'codoonGroup' : false,
        'weixinToFriend' : true,
        'weixinToTimeline' : true,
        'sinaWeibo' : true,
        'tencentQQ' : false,
        'tencentQzone' : false
      }
    });
  },1500)
};

export default nativebtnShare;

