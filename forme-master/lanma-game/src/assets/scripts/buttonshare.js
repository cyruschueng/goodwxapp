//share
import codoonBrige from './codoon-native-bridge';
var bridge = new codoonBrige();
function nativebtnShare(options){
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
      'sinaWeibo' : true,
      'tencentQQ' : true,
      'tencentQzone' : true
    }
  });
};

export default nativebtnShare;

