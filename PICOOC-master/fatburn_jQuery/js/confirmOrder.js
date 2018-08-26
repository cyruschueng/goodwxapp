var SQueRenDingDan={
    SCategory_SQueRenDingDan:5080200,
    SQueRenDingDan_ShouJiHao:5080201,//手机号
    SQueRenDingDan_WeiXinHao:5080202,//微信号
    SQueRenDingDan_TongShouJiHao:5080203,//同手机号
    SQueRenDingDan_XuanZeYouHuiQuan:5080204,//选择优惠券
    SQueRenDingDan_TiJiaoDingDan:5080205//提交订单
};
var PhoneBtn = false;

$(function(){
    //定义‘确认订单’按钮的位置；
    var heightBody = $(window).height();
    var heightJine = $('.empty').offset().top;
    //alert(heightBody);
    //alert(heightJine);
    var deviceType=isMobile();
    if(deviceType == "isApp" && (typeof mobileApp != "undefined")){
         if(getCookie("saveCampFrom") == "1"){ //如果是从燃脂营学员首页续营
            var getPageInfo = function (){
              var data = {
                iconType:0,//0:默认箭头，1：叉，2：iconUrl传图片
                backNum:1,
                closeWebview:0,//默认为0
                iconUrl:""
              };
              return JSON.stringify(data);
            };
            mobileApp.showLeftBtn(getPageInfo());
        }
    }
    $('body').css('height', heightBody + 'px');
    $('.pay').show();
    var heightPay = $('.pay').height();
    //alert(heightPay);

    if(heightJine + heightPay > heightBody){
        $(window).scroll(function(){
            var scrollTop = $(window).scrollTop();
            $('.empty').css('marginBottom', 50+'px');
            $('.pay').css('bottom', -scrollTop+'px');
        });

    }

    /*window.location.href += '&eventName=fatburn';
    console.log(window.location.href);*/
    getGoodsInfo();//获取商品信息
    //console.log(window.location.href);

    appNoShare();
});

function getGoodsInfo(){
    var finalUrl=ajaxLink +"/v1/api/campGoods/getGoodsInfo"+window.location.search;//获取商品详情信息
    console.log('finalUrl='+finalUrl);
    var goodsId = '';
    var originPrice = 0;//应付价格
    var currentPrice = 0; //实付价格
    var currentPriceNew = 0; //实付价格(选择优惠券之后)
    var couponPrice = 0; //优惠价格
    var firstCouponId = null;
    $.ajax({
        type: "get",
        url: finalUrl,
        dataType:"json",
        success : function (data) {
            console.log(1,data);
            if(data.code == 200){
                $('body').show();//ajax请求成功显示body
                var beginTimeArr = data.resp.beginTime.split('-'); //开营时间
                goodsId = data.resp.id;
                originPrice = data.resp.originPrice;
                currentPrice = data.resp.curentPrice;
                $('.good .goodsName p').html(data.resp.name).show(); //商品名称
                $('.good .infoDesc .goodsName').ellipsis({ //超出2行加省略号
                    english: false,
                    lineNum: 2
                });
                $('.beginTime .year').html(beginTimeArr[0]);//开营时间:年
                $('.beginTime .month').html(beginTimeArr[1]);//开营时间:月
                $('.beginTime .day').html(beginTimeArr[2]);//开营时间:日
                $('.new-price').html(currentPrice); //商品现价
                var pictureArr = JSON.parse(data.resp.picture);
                $('.good .infoImg img').attr('src', pictureArr[0].url);
                var urlOrder = ajaxLink +"/v1/api/campGoods/confirmOrder"+window.location.search+'&goodsId='+goodsId;//有关优惠券的信息

                $.ajax({
                    type: "get",
                    url: urlOrder,
                    dataType:"json",
                    success : function (data) {
                        console.log(2,data);
                        if(data.code == 200){
                            firstCouponId = (data.resp.couponInfo.length>0)?data.resp.couponInfo[0].id:null;
                            //用户头像
                            var headImg = '';
                            if(data.resp.roleInfo.sex == 0){
                                headImg = '<img class="avatar" src="'+data.resp.roleInfo.headPortraitUrl+'" onerror="this.src='+arrHeadImg[0]+'"/>';
                            }else if(data.resp.roleInfo.sex == 1){
                                headImg = '<img class="avatar" src="'+data.resp.roleInfo.headPortraitUrl+'" onerror="this.src='+arrHeadImg[1]+'"/>';
                            }
                            $('.buy .userName').before(headImg);
                            //console.log($('.buy .avatar')[0]); //当前用户头像的url
                        //<img src="'+data.resp.items[0].head+'" onerror="this.src='+arrHeadImg[data.resp.items[0].gender]+'"/>
                            //$('.buy .avatar').attr('src', data.resp.roleInfo.headPortraitUrl);
                            $('.buy .userName').html(data.resp.roleInfo.name);
                            var $userName = $('.buy .userName').html();
                            if($userName.length>5){
                                $userName = $userName.substring(0,5)+'...';
                                $('.userName').html($userName);
                            }


                            if(data.resp.couponInfo.length == 0){
                                $('.youhui .money span').html('无可使用的优惠');
                                $('.jine .youHuiMoney').html('-¥0');
                                $('.pay .realyPay span').html('¥'+currentPrice);
                            }else{
                                if(data.resp.couponInfo[0].expire == true || data.resp.couponInfo[0].isUse == 1){//过期 或 已使用
                                    $('.youhui .money span').html('无可使用的优惠');
                                    $('.jine .youHuiMoney').html('-¥0');
                                    $('.pay .realyPay span').html('¥'+currentPrice);
                                }else{
                                    $('.youhui .money span').html('¥'+data.resp.couponInfo[0].value);
                                    $('.jine .youHuiMoney').html('-¥'+data.resp.couponInfo[0].value);
                                    console.log('currentPrice='+currentPrice);
                                    if(currentPrice != 0){
                                        currentPriceNew = currentPrice - data.resp.couponInfo[0].value;
                                        currentPriceNew = Math.round(currentPriceNew * 100) / 100; //四舍五入，并保留两位小数；
                                        console.log('currentPriceNew='+currentPriceNew);
                                        $('.pay .realyPay span').html('¥'+currentPriceNew);
                                    }
                                }
                            }
                            /*var chooseIndex = getCookie('chooseIndex');
                            var youHuiState2 = getCookie('youHuiState');
                            if(chooseIndex == ''){
                                if(data.resp.couponInfo.length == 0){
                                    $('.youhui .money span').html('无可使用的优惠');
                                    $('.jine .youHuiMoney').html('-¥0');
                                    $('.pay .realyPay span').html('¥'+currentPrice);
                                }else{
                                    if(data.resp.couponInfo[0].expire == true || data.resp.couponInfo[0].isUse == 1){//过期 或 已使用
                                        $('.youhui .money span').html('无可使用的优惠');
                                        $('.jine .youHuiMoney').html('-¥0');
                                        $('.pay .realyPay span').html('¥'+currentPrice);
                                    }else{
                                        $('.youhui .money span').html('¥'+data.resp.couponInfo[0].value);
                                        $('.jine .youHuiMoney').html('-¥'+data.resp.couponInfo[0].value);
                                        console.log('currentPrice='+currentPrice);
                                        if(currentPrice != 0){
                                            currentPriceNew = currentPrice - data.resp.couponInfo[0].value;
                                            currentPriceNew = Math.round(currentPriceNew * 100) / 100; //四舍五入，并保留两位小数；
                                            console.log('currentPriceNew='+currentPriceNew);
                                            $('.pay .realyPay span').html('¥'+currentPriceNew);
                                        }
                                    }
                                }
                            }else if(chooseIndex == 'noChoose2'){
                                $('.youhui .money span').html('无可使用的优惠');
                                $('.jine .youHuiMoney').html('-¥0');
                                $('.pay .realyPay span').html('¥'+currentPrice);
                            }else{
                                if(youHuiState2 == 'undefined'){
                                    $('.youhui .money span').html('不使用优惠券');
                                    $('.jine .youHuiMoney').html('-¥0');
                                    $('.pay .realyPay span').html('¥'+currentPrice);
                                }else{
                                    $('.youhui .money span').html('¥'+youHuiState2);
                                    $('.jine .youHuiMoney').html('-¥'+youHuiState2);
                                    if(currentPrice != 0){
                                        currentPriceNew = currentPrice - youHuiState2;
                                        currentPriceNew = Math.round(currentPriceNew * 100) / 100; //四舍五入，并保留两位小数；
                                        $('.pay .realyPay span').html('¥'+currentPriceNew);
                                    }
                                }
                            }*/


                        }else{
                            $(".error-main-t").html(data.result.message);
                            $(".errorAlert").css("display","block");
                            $(".error-main").css("margin-top",-$(".error-main").height()/2);
                        }
                    },
                    error : function (){
                        $(".error-main-t").html("啊哦，您的网络不太给力~");
                        $(".errorAlert").css("display","block");
                        $(".error-main").css("margin-top",-$(".error-main").height()/2);
                    }
                });
            }else{
                $(".error-main-t").html(data.result.message);
                $(".errorAlert").css("display","block");
                $(".error-main").css("margin-top",-$(".error-main").height()/2);
            }
        },
        error : function (){
            $(".error-main-t").html("啊哦，您的网络不太给力~");
            $(".errorAlert").css("display","block");
            $(".error-main").css("margin-top",-$(".error-main").height()/2);
        }

    });


    //选择优惠券
    var timer;
    var youHuiState = '';
    $('.youhui').unbind("click").click(function(){
        setMaiDian(SQueRenDingDan.SCategory_SQueRenDingDan,SQueRenDingDan.SQueRenDingDan_XuanZeYouHuiQuan);//选择优惠券埋点

        var deviceType=isMobile();
        var currentCouponId = '';
        if(deviceType == "isApp" && (typeof mobileApp != "undefined")){
            var data={
                link:absoluteUrl+'chooseCoupon.html'+window.location.search,
                animation: 1//默认1从右到左，2从下到上
            };
            data=JSON.stringify(data);
            mobileApp.openWebview(data);//当为手机时，打开新的链接
            toggleCoupon();

        }else{ //和if内容一样
            //设置一个定时器，定时获取cookie值
            window.location.href = absoluteUrl+'chooseCoupon.html'+window.location.search;//如果是电脑上测试，可以跳转新的链接，不能达到openWebview和下个页面的deleteHistory的效果；
            toggleCoupon();
        }
    });

    //设置一个定时器，定时获取cookie值
    //toggleCoupon();
    function toggleCoupon(){
        timer = setInterval(function(){
            youHuiState = getCookie('youHuiState');
            currentCouponId = getCookie('currentCouponId');
            //console.log('currentPrice='+currentPrice);
            //console.log('youHuiState='+youHuiState);
            if(youHuiState != ''){
                if(youHuiState == 'undefined'){
                    $('.youhui .money span').html('不使用优惠券');
                    $('.jine .youHuiMoney').html('-¥0');
                    $('.pay .realyPay span').html('¥'+currentPrice);
                }else{
                    $('.youhui .money span').html('¥'+youHuiState);
                    $('.jine .youHuiMoney').html('-¥'+youHuiState);
                    if(currentPrice != 0){
                        currentPriceNew = currentPrice - youHuiState;
                        currentPriceNew = Math.round(currentPriceNew * 100) / 100; //四舍五入，并保留两位小数；
                        $('.pay .realyPay span').html('¥'+currentPriceNew);
                    }
                }
                //clearInterval(timer);
            }
        }, 1);
    }


    //设置埋点（注意input用的是获取焦点focus事件）
    $('#phoneNum').unbind("focus").focus(function(){
        setMaiDian(SQueRenDingDan.SCategory_SQueRenDingDan,SQueRenDingDan.SQueRenDingDan_ShouJiHao);//手机号埋点
    });
    $('#wechatNum').unbind("focus").focus(function(){
        setMaiDian(SQueRenDingDan.SCategory_SQueRenDingDan,SQueRenDingDan.SQueRenDingDan_WeiXinHao);//手机号埋点
    });

    //关于提交订单
    //填写手机号和微信号
    var confirmOrderPhone = getCookie('confirmOrderPhone');//之前输入的数据在cookie中保存1天；
    var confirmOrderWechat = getCookie('confirmOrderWechat');

    var userUserId = getCookie("userUserId");
    var userRoleId = getCookie("userRoleId");
    //如果是同一账号，则默认保存之前输入的手机号和微信号
    if((userUserId == getParamByUrl("userId")) && (userRoleId == getParamByUrl("roleId"))){
        $('#phoneNum').val(confirmOrderPhone);
        $('#wechatNum').val(confirmOrderWechat);
    }else{
        delCookie("confirmOrderPhone");
        delCookie("confirmOrderWechat");
        $('#phoneNum').val("");
        $('#wechatNum').val("");
    }
    setCookie("userUserId", getParamByUrl("userId"),1);//userId保存cookie
    setCookie("userRoleId", getParamByUrl("roleId"),1);//roleId保存cookie



    if($('#phoneNum').val().length>0){
        $(".check").css("display","block");
    }
    $('#phoneNum').bind('input propertychange', function() {
        if($(this).val().length>0){
            $(".check").css("display","block");
        }else{
            $(".check").css("display","none");
        }
        if(($("#phoneNum").val() == $("#wechatNum").val()) && ($("#phoneNum").val() != '') && ($("#wechatNum").val() != '')){
            $("#samePhone").attr("src","image/confirmOrder/order-4.png");
        }else{
            $("#samePhone").attr("src","image/confirmOrder/order-3.png");
        }
        setCookie('confirmOrderPhone',$(this).val(),1);//设置保存手机号的cookie
        //console.log('$(this).val()',$(this).val());
        //console.log(getCookie('confirmOrderPhone'));
    });
    $('#wechatNum').bind('input propertychange', function(){
        setCookie('confirmOrderWechat',$(this).val(),1);//设置保存微信号的cookie
        if(($("#phoneNum").val() == $("#wechatNum").val()) && ($("#phoneNum").val() != '') && ($("#wechatNum").val() != '')){
            $("#samePhone").attr("src","image/confirmOrder/order-4.png");
        }else{
            $("#samePhone").attr("src","image/confirmOrder/order-3.png");
            //console.log(confirmOrderPhone,confirmOrderWechat);
        }
    });

    $("#samePhone").unbind("click").click(function(){
        setMaiDian(SQueRenDingDan.SCategory_SQueRenDingDan,SQueRenDingDan.SQueRenDingDan_TongShouJiHao);//同手机号埋点
        if(!PhoneBtn){
            $(this).attr("src","image/confirmOrder/order-4.png");
            var phoneNum = $("#phoneNum").val();
            $("#wechatNum").val(phoneNum);
            PhoneBtn=true;
        }else{
            $(this).attr("src","image/confirmOrder/order-3.png");
            $("#wechatNum").val("");
            PhoneBtn=false;
        }
        setCookie('confirmOrderWechat',$('#wechatNum').val(),1);//设置保存微信号的cookie
        //console.log(confirmOrderPhone,confirmOrderWechat);
    });
    if(($("#phoneNum").val() == $("#wechatNum").val()) && ($("#phoneNum").val() != '') && ($("#wechatNum").val() != '')){
        $("#samePhone").attr("src","image/confirmOrder/order-4.png");
    }


    //点击提交按钮
    $(".submit span").unbind("click").click(function(){
        setMaiDian(SQueRenDingDan.SCategory_SQueRenDingDan,SQueRenDingDan.SQueRenDingDan_TiJiaoDingDan);//提交订单埋点
        clearInterval(timer);
        var phoneNum = $("#phoneNum").val();
        var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        if(phoneNum==undefined || phoneNum==null || phoneNum==""){
            $('.alerts').eq(3).stop(true).fadeIn(200).delay(2000).fadeOut(200);//请填写参营人员手机号码
        }else if(!myreg.test(phoneNum)){
            $('.alerts').eq(4).stop(true).fadeIn(200).delay(2000).fadeOut(200);//手机号填写有误，请重新核对哦
        }else{
            var urlStock = ajaxLink + '/v1/api/campGoods/getGoodsStock' + window.location.search + '&id='+goodsId;//获取商品库存状态
            $.ajax({
                type: "get",
                url: urlStock,
                dataType:"json",
                success: function(data){
                    console.log(3,data);
                    if(data.code == 200){
                        console.log('data.resp='+data.resp);
                        if(data.resp == 1){//售罄但有未支付的订单
                            $('.alerts').eq(0).stop(true).fadeIn(200).delay(2000).fadeOut(200);//已拍完，但还有人未付款
                        }else if(data.resp == 2){//售罄且都支付完成
                            $('.alerts').eq(1).stop(true).fadeIn(200).delay(2000).fadeOut(200);//手慢了，名额被抢光啦～
                        }
                        else if(data.resp == 3 || data.resp == 5){// 不能同时购买多份  //3：表示支付成功； 5：提交订单但未支付
                            $('.alerts').eq(2).stop(true).fadeIn(200).delay(2000).fadeOut(200);//同一账号只能购买一次
                        }else if(data.resp == 4){// 有库存
                            //else{// 有库存
                            if($(".submit span").attr("clicked") == "0"){
                                //执行点击
                                $(".submit span").attr("clicked","1");//避免多次点击；
                                couponPrice = $('.jine .youHuiMoney').html().substring(2);
                                console.log('firstCouponId',firstCouponId);
                                var trafficSource = '';
                                if(getParamByUrl('refer') == 1){//banner
                                    trafficSource = 'appBanner'
                                }else if(getParamByUrl('refer') == 2){//push推送
                                    trafficSource = 'push'
                                }else if(getParamByUrl('refer') == 3){//开屏
                                    trafficSource = 'kaiPing'
                                }else if(getParamByUrl('refer') == 4){//从订单详情页进入
                                    trafficSource = 'orderDetail'
                                }else if(getParamByUrl('refer') == 6){//从'我的'售卖入口进入
                                    trafficSource = 'woDe'
                                }
                                else if(getParamByUrl('refer') == 5){//从文章底部
                                    trafficSource = 'wenzhang'
                                }
                                else{ //其他
                                    trafficSource = 'other'
                                }
                                var goodsInfo = {
                                    "goodsId":goodsId,
                                    "userId":parseInt(getParamByUrl('userId')),
                                    "roleId":parseInt(getParamByUrl('roleId')),
                                    "phoneNo":$('#phoneNum').val(),
                                    "weChat": $('#wechatNum').val(),
                                    "origPrice":originPrice,
                                    "currentPrice": couponPrice>0 ? currentPriceNew:currentPrice,
                                    "couponPrice":parseInt(couponPrice),
                                    "isCoupon":couponPrice>0 ? 1:0,
                                    "couponId":couponPrice>0 ? ((youHuiState == '')? firstCouponId:currentCouponId):null,
                                    "sourceType":"燃脂营APP",
                                    "trafficSource":trafficSource //流量来源，开屏/push/短信/banner/其他
                                };
                                console.log('goodsInfo ',goodsInfo);
                                var urlGenerateOrder = ajaxLink + '/v1/api/campOrder/generateOrder'+ window.location.search;//向后台提交数据
                                $.ajax({
                                    type:"POST",
                                    url:urlGenerateOrder,
                                    dataType:"json",
                                    contentType: 'application/json',
                                    data:JSON.stringify(goodsInfo),
                                    success:function(data){
                                        console.log(4,data);
                                        if(data.code == 200){
                                            console.log('向后台提交数据！');
                                            console.log(absoluteUrl+"orderSuccess.html"+window.location.search+"&orderId="+data.resp);
                                            var deviceType=isMobile();
                                            if(deviceType == "isApp" && (typeof mobileApp != "undefined")){
                                                var getPageInfo = function (){
                                                    var paydata = {
                                                        orderId:data.resp,
                                                        url:absoluteUrl+"openTrain.html"+window.location.search+"&orderId="+data.resp,
                                                        price:goodsInfo.currentPrice,
                                                        isRefresh:true,
                                                        function:"gobackToGood"
                                                    };
                                                    return JSON.stringify(paydata);
                                                };
                                                mobileApp.gotoPay(getPageInfo());
                                            }
                                            //delCookie('confirmOrderPhone');
                                            //delCookie('confirmOrderWechat');
                                            //setCookie("toOrderSuccess","0",1);
                                            setCookiePath("toOrderSuccess","0",1,"/;domain=picooc.com");
                                        }else{
                                            $(".error-main-t").html(data.message);
                                            $(".errorAlert").css("display","block");
                                            $(".error-main").css("margin-top",-$(".error-main").height()/2);
                                        }
                                    }
                                });
                                // window.location.href = absoluteUrl + 'pay.html'+ window.location.search; //正常跳转：支付页面
                            }
                        }
                        else{
                         //不再执行点击操作
                         }
                    }else{
                        $(".error-main-t").html(data.result.message);
                        $(".errorAlert").css("display","block");
                        $(".error-main").css("margin-top",-$(".error-main").height()/2);
                    }
                },
                error : function (){
                    $(".error-main-t").html("啊哦，您的网络不太给力~");
                    $(".errorAlert").css("display","block");
                    $(".error-main").css("margin-top",-$(".error-main").height()/2);
                }
            });
        }
    });



}


function appNoShare(){
    var getPageInfo = function (){
        var data = {
            title:'确认订单',
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
//从支付页面返回到商品介绍页
function gobackToGood(){
        // var getPageInfo = function (){
        //         var data = {
        //             backNum:1,//默认为1，
        //             closeWebview:0,//默认为0
        //         };
        //         return JSON.stringify(data);
        //     };
        // mobileApp.deleteHistory(getPageInfo());
        var getPageInfo = function (){
                var data = {
                    backNum:0,//默认为1，
                    closeWebview:1,//默认为0
                };
                return JSON.stringify(data);
            };
        mobileApp.deleteHistory(getPageInfo());    
}