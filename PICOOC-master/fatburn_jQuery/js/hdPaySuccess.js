$(function(){
    appNoShare();

    var deviceType=isMobile();
    if(deviceType == "isApp" && (typeof mobileApp != "undefined")){
        // alert(getCookie("toOrderSuccess"));
        if(getCookie("toOrderSuccess") == "1"){  //如果是从订单列表支付
            var getPageInfo = function (){
                var data = {
                    iconType:1,//0:默认箭头，1：叉，2：iconUrl传图片
                    backNum:1,
                    closeWebview:0,//默认为0
                    iconUrl:""
                };
                return JSON.stringify(data);
            };
            mobileApp.showLeftBtn(getPageInfo());
        }else if(getCookie("toOrderSuccess") == "2"){
            var getPageInfo = function (){  //如果是从订单详情支付
                var data = {
                    iconType:1,//0:默认箭头，1：叉，2：iconUrl传图片
                    backNum:2,
                    closeWebview:0,//默认为0
                    iconUrl:""
                };
                return JSON.stringify(data);
            };
            mobileApp.showLeftBtn(getPageInfo());
        }else{              //如果是从确认订单支付
            // var getPageInfo = function (){
            //     var data = {
            //         iconType:0,//0:默认箭头，1：叉，2：iconUrl传图片
            //         backNum:2,
            //         closeWebview:0,//默认为0
            //         iconUrl:""
            //     };
            //     return JSON.stringify(data);
            // };
            // mobileApp.showLeftBtn(getPageInfo());
            var getPageInfo = function (){
                var data = {
                    iconType:1,//0:默认箭头，1：叉，2：iconUrl传图片
                    backNum:0,
                    closeWebview:1,//默认为0
                    iconUrl:""
                };
                return JSON.stringify(data);
            };
            mobileApp.showLeftBtn(getPageInfo());
        }

    }
});
function appNoShare(){
    var getPageInfo = function (){
        var data = {
            title:'订单详情',
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