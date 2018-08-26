$(function(){
    appNoShare();
    $("#test1").unbind("click").click(function(){
        var data={
            link:"http://pm.picooc.com:9989/web/fatburntest/productDetails.html?version=22&userId=1620003&roleId=2572144&appver=3.3.0.1&timestamp=1480917621&os=android&lang=zh_CN&method=lst&timeZone=Asia/Shanghai&sign=0E2B0A12C5E694795BF188BA7C47F8D7&device_id=86274403769320&pushToken=android::86274403769320&webver=1&eventName=fatBurn&id=34&refer=1",
            animation: 1//默认1从右到左，2从下到上
        };
        data=JSON.stringify(data);
        if(getParamByUrl("os")=="android"){
            mobileApp.openWebview(data);
        }
        else{
            mobileApp.openWebview.postMessage(data);
        }
        //mobileApp.openWebview(data);
    });
});
function appNoShare(){
    var getPageInfo = function (){
        var data = {
            title:'有品燃脂营入口',
            /*isShare:false,
            backgroundColor:'#2c2f31'*/
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
        //mobileApp.getShareInfo(getPageInfo());
    }
    /*mobileApp.getShareInfo(getPageInfo());*/
    document.documentElement.style.webkitTouchCallout='none';
}


function getNewWebWiew(url){
    console.info(url);
    //url="http://"+location.host+"/web/fatburntest/"+url;
    var getPageInfo = function (){
        var data = {
            link:url,
            animation: 1//默认1从右到左，2从下到上
        };
        return JSON.stringify(data);
    };
    var deviceType=isMobile();
    if(deviceType == "isApp" && (typeof mobileApp != "undefined")){
        if(getParamByUrl("os")=="android"){
            mobileApp.openWebview(getPageInfo());
        }
        else{
            mobileApp.openWebview.postMessage(getPageInfo());
        }
        //mobileApp.openWebview(getPageInfo());
    }else{
        window.location.href=url;
    }
    document.documentElement.style.webkitTouchCallout='none';
}