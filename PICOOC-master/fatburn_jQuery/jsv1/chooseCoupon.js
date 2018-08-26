var SXuanZeYouHuiQuan={
    SCategory_SXuanZeYouHuiQuan:5080300,
    SXuanZeYouHuiQuan_BuShiYongYouHuiQuan:5080301,//不使用优惠券
    SXuanZeYouHuiQuan_ShiYongYouHuiQuan:5080302//使用优惠券
};
$(function(){
	appNoShare();
	findCoupon();  //获取优惠券列表
    /*alert(getCookie('hello'));
    $(window).click(function(){
        alert(2);
        setCookie('hello', 'world', 1);
    });*/
});
function findCoupon(){
    //alert(1);
    var chooseIndex = getCookie('chooseIndex');
    //alert(chooseIndex);
    console.log('chooseIndex='+chooseIndex);//选中的优惠券列表的第几个
    var finalUrl=ajaxLink+"/v1/api/campCoupon/findCoupon"+window.location.search;
    $.ajax({
        type:"get",
        url:finalUrl,
        dataType:"json",
        success:function(data){
            console.log(1,data);
            if(data.code == 200){
                //setCookie('youHuiState', '', 1);//清除优惠状态的cookie
                console.log("getCookie('youHuiState')",getCookie('youHuiState'));
                if(data.resp.couponList.length>0){
                    var str1 = "";
                    for(i=0;i<data.resp.couponList.length;i++){
                       
                       if(data.resp.couponList[i].isUse==0){//没用过
                       	if(!data.resp.couponList[i].expire){//没有过期
                         str1 += '<div class="row col-xs-12 col-sm-12 avail isAvail">'+
                				 '<div class="msg msg2">'+
                    			 '<div class="col-xs-8 col-sm-8 continue"><img class="circle circle1 aboutCircle keYongQuan" src="https://cdn2.picooc.com/web/res/fatburn/image/sell/chooseCoupon/circle1.png">&nbsp;&nbsp;<span>'+data.resp.couponList[i].name+'</span></div>'+
                    			 '<div class="col-xs-4 col-sm-4 value"><span class="value1">¥</span> <span class="value2">'+data.resp.couponList[i].value+'</span></div>'+
                				 '</div>'+
                				 '<div class="col-xs-12 col-sm-12 term">有效期：'+data.resp.couponList[i].beginTime+' - '+data.resp.couponList[i].endTime+'</div>'+
                				 '<div class="col-xs-12 col-sm-12 require">'+data.resp.couponList[i].rule+'</div>'+
            					 '</div>';
            			}else{//过期
                          str1 += '<div class="row col-xs-12 col-sm-12 avail notAvail">'+
                    				 '<div class="msg">'+
                        			 '<div class="col-xs-8 col-sm-8 continue"><img class="circle" src="https://cdn2.picooc.com/web/res/fatburn/image/sell/chooseCoupon/circle2.png">&nbsp;&nbsp;<span>'+data.resp.couponList[i].name+'</span></div>'+
                        			 '<div class="col-xs-4 col-sm-4 value"><span class="value1">¥</span> <span class="value2">'+data.resp.couponList[i].value+'</span></div>'+
                    				 '</div>'+
                    				 '<div class="col-xs-12 col-sm-12 term">有效期：'+data.resp.couponList[i].beginTime+' - '+data.resp.couponList[i].endTime+'</div>'+
                    				 '<div class="col-xs-12 col-sm-12 require">'+data.resp.couponList[i].rule+'</div>'+
                    				 '<img class="status" src="https://cdn2.picooc.com/web/res/fatburn/image/sell/chooseCoupon/expire.png">'+
                					 '</div>';  
            			}
                       }else if(data.resp.couponList[i].isUse==1){//已使用
                          str1 +='<div class="row col-xs-12 col-sm-12 avail notAvail">'+
                				 '<div class="msg">'+
                    			 '<div class="col-xs-8 col-sm-8 continue"><img class="circle" src="https://cdn2.picooc.com/web/res/fatburn/image/sell/chooseCoupon/circle2.png">&nbsp;&nbsp;<span>'+data.resp.couponList[i].name+'</span></div>'+
                    			 '<div class="col-xs-4 col-sm-4 value"><span class="value1">¥</span> <span class="value2">'+data.resp.couponList[i].value+'</span></div>'+
                				 '</div>'+
                				 '<div class="col-xs-12 col-sm-12 term">有效期：'+data.resp.couponList[i].beginTime+' - '+data.resp.couponList[i].endTime+'</div>'+
                				 '<div class="col-xs-12 col-sm-12 require">'+data.resp.couponList[i].rule+'</div>'+
                				 '<img class="status" src="https://cdn2.picooc.com/web/res/fatburn/image/sell/chooseCoupon/used.png">'+
            					 '</div>';

                       }
                    }
                    
                    $(".coupons").append(str1);

                    if($('.msg2 .keYongQuan').length == 0){ //没有可用券
                        $(".circle1:first").attr("src","https://cdn2.picooc.com/web/res/fatburn/image/sell/chooseCoupon/circle1.png");//不使用优惠券打勾
                    }


                    //判断选中的是哪一个优惠券，再次进入该页面时，上一次选中的优惠券前面打勾
                    $('.aboutCircle').attr('src', 'https://cdn2.picooc.com/web/res/fatburn/image/sell/chooseCoupon/circle2.png');
                    if(chooseIndex != ''){
                        if(chooseIndex == 'noChoose2'){
                            $(".circle1:first").attr("src","https://cdn2.picooc.com/web/res/fatburn/image/sell/chooseCoupon/circle1.png");//不使用优惠券
                        }else{
                            $('.aboutCircle').eq(Number(chooseIndex)).attr('src', 'https://cdn2.picooc.com/web/res/fatburn/image/sell/chooseCoupon/circle1.png');//第chooseIndex个有效的优惠券前面打勾
                        }
                    }else{
                        $('.aboutCircle:first').attr('src', 'https://cdn2.picooc.com/web/res/fatburn/image/sell/chooseCoupon/circle1.png');//第一个有效的优惠券前面打勾(默认状态)
                    }


                    //$('.aboutCircle').attr('src', 'image/https://cdn2.picooc.com/web/res/fatburn/image/sell/chooseCoupon/circle2.png');
                    //$('.aboutCircle:first').attr('src', 'image/https://cdn2.picooc.com/web/res/fatburn/image/sell/chooseCoupon/circle1.png');//第一个有效的优惠券前面打勾

                    var $circle1 = $(".circle1"); //伪数组
                    var $circle1Par = $circle1.parent().parent();//默认选中元素的父元素的父元素:msg
                    $('.msg2').each(function(index){
                        $(this).unbind("click").click(function(){
                            //console.log('$(this)='+$(this).html());
                            console.log('index',index);
                            $circle1.removeClass("active");
                            $circle1.attr("src","https://cdn2.picooc.com/web/res/fatburn/image/sell/chooseCoupon/circle2.png");
                            $(this).children().children(".circle1").attr("src","https://cdn2.picooc.com/web/res/fatburn/image/sell/chooseCoupon/circle1.png");
                            $(this).children().children(".circle1").addClass("active");
                            var value = $(this).find('.value2').html();
                            console.log(this.nodeName);
                            currentCouponId = (value == undefined)? null:data.resp.couponList[index - 1].id;
                            console.log('value='+value);
                            console.log('currentCouponId='+currentCouponId);
                            setCookie('youHuiState', value, 1);//设置优惠状态的cookie
                            //alert(getCookie('youHuiState'));
                            setCookie('currentCouponId', currentCouponId, 1);//设置优惠状态的cookie--id
                            setCookie('chooseIndex', $(this).index(), 1);//选中的优惠券列表的第几个
                            console.log(this.nodeName);
                            if(this.nodeName.toLowerCase() == 'aside'){
                                setMaiDian(SXuanZeYouHuiQuan.SCategory_SXuanZeYouHuiQuan,SXuanZeYouHuiQuan.SXuanZeYouHuiQuan_BuShiYongYouHuiQuan);//不使用优惠券埋点
                                setCookie('chooseIndex', 'noChoose2', 1);//不选优惠券
                                console.log(getCookie('chooseIndex'));
                            }else if(this.nodeName.toLowerCase() == 'div'){
                                setMaiDian(SXuanZeYouHuiQuan.SCategory_SXuanZeYouHuiQuan,SXuanZeYouHuiQuan.SXuanZeYouHuiQuan_ShiYongYouHuiQuan);//使用优惠券埋点
                                //alert($(this).find(".aboutCircle").index());
                                setCookie('chooseIndex', index-1, 1);//选中的可用优惠券列表的第几个
                                console.log(getCookie('chooseIndex'));
                            }

                            deleteHistory();//回退到上一个页面(只可以在手机上测试)
                        });
                    });
                }else{
                	$(".coupons").html("");
                    $(".circle1").attr("src","https://cdn2.picooc.com/web/res/fatburn/image/sell/chooseCoupon/circle1.png");
                    var str2 = '<div class="row noCoupon">暂无可使用的优惠券～</div>';
                    $(".coupons").append(str2);
                    $(".circle1").parent().parent().unbind("click").click(function(){
                        setMaiDian(SXuanZeYouHuiQuan.SCategory_SXuanZeYouHuiQuan,SXuanZeYouHuiQuan.SXuanZeYouHuiQuan_BuShiYongYouHuiQuan);//不使用优惠券埋点
                        deleteHistory();//回退到上一个页面(只可以在手机上测试)
                    });

                }
            }else{
                $(".error-main-t").html(data.result.message);
                $(".errorAlert").css("display","block");
                $(".error-main").css("margin-top",-$(".error-main").height()/2);
            }
        }
    })
}


//选择好优惠券之后，页面自动跳转到确认订单页面；
function deleteHistory(){
    var getPageInfo = function (){
        var data = {
            backNum:1,//默认为1，
            closeWebview:0//默认为0
        };
        return JSON.stringify(data);
    };
    var deviceType=isMobile();
    if(deviceType == "isApp" && (typeof mobileApp != "undefined")){
        if(getParamByUrl("os")=="android"){
            mobileApp.deleteHistory(getPageInfo());
        }
        else{
            mobileApp.deleteHistory.postMessage(getPageInfo());
        }
    }
}


function appNoShare(){
    var getPageInfo = function (){
        var data = {
            title:'我的优惠券',
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
    }
    document.documentElement.style.webkitTouchCallout='none';
}