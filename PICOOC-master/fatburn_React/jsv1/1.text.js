//*************************************************************************************************
//1.getShareInfo 改成：controlTitle
var getPageInfo = function (){
    var data = {
        title:'有品燃脂营入口',
        color:"",
        opacity:"",
        backgroundColor:"",
        backgroundOpacity:""
    };
    return JSON.stringify(data);
};
var deviceType=isMobile();
if(deviceType == "isApp" && (typeof mobileApp != "undefined")){
    if(getParamByUrl("os")=="android"){
        mobileApp.controlTitle(getPageInfo());
    }
    else{
        mobileApp.controlTitle.postMessage(getPageInfo());
    }
}
document.documentElement.style.webkitTouchCallout='none';
//*************************************************************************************************


//2.showLeftBtn 改成：controlLeft
/*有 controlLeft 方法的页面：
 *
 * bodyChange.js  confirmOrder.js  editInfo.js  editPhoto.js  editReport.js  figureContrast.js  figureContrastShare.js
 * hdConfirmOrder.js  hdOrderDetails.js  hdPaySuccess.js  infotest.js  infotest2.js  orderDetails.js  orderSuccess.js
 *infoWidget2.js  photoAlbum.js  productDetails.js  publishReport.js  questionnaire.js  questionSubmit.js  receiveCoupon.js
 * setcard1.js  student.js  infoWidget.js  trainPlan.js
 * */
var getPageInfo = function (){
    var data = {
        iconType:0,
        iconColor:"",
        backNum:1,
        closeWebview:0,
        hidden:false,
        isHandle:false,
        functionName:""
        //isRefreshPage:true
    };
    return JSON.stringify(data);
};
if(getParamByUrl("os")=="android"){
    mobileApp.controlLeft(getPageInfo());
}
else{
    mobileApp.controlLeft.postMessage(getPageInfo());
}
//备注：isRefreshPage 如果原来没有就不传；

//*************************************************************************************************


//3.controlRight,controlRightInfo
/*
* 有：shareTitle --- controlRight 方法的页面：
* 已改：bodyChange.js  rankList.js  reportDetialTrainer.js
*已改且测试通过：productDetails.js  figureContrastShare.js  infotest.js  infotest2.js  reportDetial.js
*
* 有：showRightBtn --- controlRightInfo 方法的页面：
*
* student.js  studentList.js
*
* 已改：
* 已改且测试通过：orderSuccess.js  figureContrast2.js  photoAlbum.js
*特殊：hdOrderDetails.js,receiveCoupon.js 这个页面原来有showRightBtn，但是并没有起作用，不用修改；
* */

/*
* 2017年3月4日15:47:34
* 燃脂营主APP相关页面右上角已换成最新的图标；
* */
//*************************************************************************************************


//4.postMessage：如果后面括号为空，则传空字符串；
//检查括号里面的值；
//重点这三个：reloadWebview   gotoWechat   markedAsNeedToRefresh ios后面需要传空字符串；
//相关页面有：hdOrderDetails.js  orderDetails.js  productDetails.js  questionSubmit.js  receiveCoupon.js
//

//5.左上角和右上角有默认状态，中间title每个页面都需要调用；

//检查
// postMessage  controlTitle
//controlTitle  controlLeft  controlRight


//trainerstudentInfo.js这个页面暂时不用加controlTitle方法；

//searchsendmsg.js这里面本身没有控制左上角，中间，右上角的方法，是由studentOtherInfo.js提前控制好的。
//现在重新定义：将studentOtherInfo.js页面中的setPageInfo注释掉，然后在searchsendmsg.js页面中重新定义左上角，中间，右上角的方法；
//而且控制右上角的页面走的是文案：（内容为：发送）

//重新检查右上角icon，关键字chrome


//关于icon
var iconUrl = "";
var iconShare = ["https://cdn2.picooc.com/web/res/event/chrome/android_share.png", "https://cdn2.picooc.com/web/res/event/chrome/ios_share.png"];
if (getParamByUrl("os") == "android") {
    iconUrl = iconShare[0];
}
else {
    iconUrl = iconShare[1];
}

//发现页面右上角图标，后又修改了；
//"https://cdn2.picooc.com/web/res/find/image/icon_sollect_true_ios.png","https://cdn2.picooc.com/web/res/find/image/icon_sollect_false_ios.png"