
$(function(){
	appNoShare("");
	leftControl();
})


function appNoShare(title){
    var getPageInfo = function (){
        var data = {
            title:title,
            isShare:false,
            backgroundColor:'#2c2f31'
        };
        return JSON.stringify(data);
    };
    var deviceType=isMobile();
        if(deviceType == "isApp" && (typeof mobileApp != "undefined")){
        mobileApp.getShareInfo(getPageInfo());
    }
    document.documentElement.style.webkitTouchCallout='none';
}


//左上角刷新返回功能
function leftControl(){
    var getPageInfo = function (){
        var data = {
            iconType:1,//0:默认箭头，1：叉，2：iconUrl传图片
            backNum:1,//1为正常后退，
            closeWebview:0,//默认为0
            hidden:false,
			isHandle:false,
			functionName:""
        };
        return JSON.stringify(data);
    }
    var deviceType=isMobile();
    if(deviceType == "isApp" && (typeof mobileApp != "undefined")){
        mobileApp.showLeftBtn(getPageInfo());
    }
    document.documentElement.style.webkitTouchCallout='none';
}

