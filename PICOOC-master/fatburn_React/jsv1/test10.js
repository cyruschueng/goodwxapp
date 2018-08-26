var getPageInfo2 = function (){
    var data = {
        title:"测试中间和左边方法",
        color:"#FFFFFF",
        opacity:"0.6",
        backgroundColor:"#cccccc",
        backgroundOpacity:"0.6"
    };
    return JSON.stringify(data);
};
if(getParamByUrl("os")=="android"){
    mobileApp.controlTitle(getPageInfo2());
}
else{
    mobileApp.controlTitle.postMessage(getPageInfo2());
}
//mobileApp.controlTitle(getPageInfo2());


var getPageInfo = function (){
    var data = {
        iconType:1,
        iconColor:"",
        backNum:2,
        closeWebview:0,
        hidden:false,
        isHandle:false,
        functionName:"",
        isRefreshPage:true
    };
    return JSON.stringify(data);
};
if(getParamByUrl("os")=="android"){
    mobileApp.controlLeft(getPageInfo());
}
else{
    mobileApp.controlLeft.postMessage(getPageInfo());
}
//mobileApp.controlLeft(getPageInfo());