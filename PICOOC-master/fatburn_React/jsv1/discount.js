var SWoDeYouHuiQuan={
    SCategory_SWoDeYouHuiQuan:5080900,
    SWoDeYouHuiQuan_RanZhiYingYouHuiQuan:5080901,//燃脂营优惠券
    SWoDeYouHuiQuan_GouChengYouHuiMa:5080902,//购秤优惠码
    SWoDeYouHuiQuan_QianWangYouZan:5080903//前往有赞
};
$(function(){
    var leftBox = $('.title .leftBox');
    var rightBox = $('.title .rightBox');
    //leftBox.addClass('leftTitle').next().removeClass('rightTitle');
    leftBox.unbind("click").click(function(){
        setMaiDian(SWoDeYouHuiQuan.SCategory_SWoDeYouHuiQuan,SWoDeYouHuiQuan.SWoDeYouHuiQuan_RanZhiYingYouHuiQuan);
        $(this).addClass('leftTitle').next().removeClass('rightTitle');
        $('.coupons').show();
        $('.couponCode').hide();
    });
    rightBox.unbind("click").click(function(){
        setMaiDian(SWoDeYouHuiQuan.SCategory_SWoDeYouHuiQuan,SWoDeYouHuiQuan.SWoDeYouHuiQuan_GouChengYouHuiMa);
        $(this).addClass('rightTitle').prev().removeClass('leftTitle');
        $('.couponCode').show();
        $('.coupons').hide();
    });

    appNoShare();
    //获取优惠券列表
    findCoupon();

});

function findCoupon(){
    var finalUrl=ajaxLink+"/v1/api/campCoupon/findCoupon"+window.location.search;
    $.ajax({
        type:"get",
        url:finalUrl,
        dataType:"json",
        success:function(data){
            if(data.code == 200){
                if(data.resp.couponList.length>0){
                    var str1 = "";
                    for(i=0;i<data.resp.couponList.length;i++){

                        if (data.resp.couponList[i].isUse == 0) {
                            if (!data.resp.couponList[i].expire) {
                                /*str1 += '<div class="row col-xs-12 col-sm-12 avail isAvail">'+
                                 '<div class="msg">'+
                                 '<div class="col-xs-6 col-sm-6 continue">'+data.resp.couponList[i].name+'</div>'+
                                 '<div class="col-xs-6 col-sm-6 value"><span class="value1">¥</span> <span class="value2">'+data.resp.couponList[i].value+'</span></div>'+
                                 '</div>'+
                                 '<div class="col-xs-12 col-sm-12 term">有效期：'+data.resp.couponList[i].beginTime+' - '+data.resp.couponList[i].endTime+'</div>'+
                                 '<div class="col-xs-12 col-sm-12 require">'+data.resp.couponList[i].rule+'</div>'+
                                 '</div>';*/
                                str1 += '<div class="row col-xs-12 col-sm-12 avail isAvail">' +
                                    '<div class="msg">' +
                                    '<div class="col-xs-6 col-sm-6 continue">' + data.resp.couponList[i].name + '</div>' +
                                    '<div class="col-xs-6 col-sm-6 value"><span class="value1">¥</span> <span class="value2">' + data.resp.couponList[i].value + '</span></div>' +
                                    '</div>' +
                                    '<div class="col-xs-12 col-sm-12 term">有效期：截止到 2017-02-28 24:00:00</div>' +
                                    '<div class="col-xs-12 col-sm-12 require">' + data.resp.couponList[i].rule + '</div>' +
                                    '</div>';
                            } else {
                                /*str1 += '<div class="row col-xs-12 col-sm-12 avail notAvail">'+
                                 '<div class="msg">'+
                                 '<div class="col-xs-6 col-sm-6 continue">'+data.resp.couponList[i].name+'</div>'+
                                 '<div class="col-xs-6 col-sm-6 value"><span class="value1">¥</span> <span class="value2">'+data.resp.couponList[i].value+'</span></div>'+
                                 '</div>'+
                                 '<div class="col-xs-12 col-sm-12 term">有效期：'+data.resp.couponList[i].beginTime+' - '+data.resp.couponList[i].endTime+'</div>'+
                                 '<div class="col-xs-12 col-sm-12 require">'+data.resp.couponList[i].rule+'</div>'+
                                 '<img class="status" src="image/withoutCamp/coupon3.png">'+
                                 '</div>'; */
                                str1 += '<div class="row col-xs-12 col-sm-12 avail notAvail">' +
                                    '<div class="msg">' +
                                    '<div class="col-xs-6 col-sm-6 continue">' + data.resp.couponList[i].name + '</div>' +
                                    '<div class="col-xs-6 col-sm-6 value"><span class="value1">¥</span> <span class="value2">' + data.resp.couponList[i].value + '</span></div>' +
                                    '</div>' +
                                    '<div class="col-xs-12 col-sm-12 term">有效期：截止到 2017-02-28 24:00:00</div>' +
                                    '<div class="col-xs-12 col-sm-12 require">' + data.resp.couponList[i].rule + '</div>' +
                                    '<img class="status" src="image/withoutCamp/coupon3.png">' +
                                    '</div>';
                            }
                        } else if (data.resp.couponList[i].isUse == 1) {
                            /*str1 += '<div class="row col-xs-12 col-sm-12 avail notAvail">'+
                             '<div class="msg">'+
                             '<div class="col-xs-6 col-sm-6 continue">'+data.resp.couponList[i].name+'</div>'+
                             '<div class="col-xs-6 col-sm-6 value"><span class="value1">¥</span> <span class="value2">'+data.resp.couponList[i].value+'</span></div>'+
                             '</div>'+
                             '<div class="col-xs-12 col-sm-12 term">有效期：'+data.resp.couponList[i].beginTime+' - '+data.resp.couponList[i].endTime+'</div>'+
                             '<div class="col-xs-12 col-sm-12 require">'+data.resp.couponList[i].rule+'</div>'+
                             '<img class="status" src="image/withoutCamp/coupon2.png">'+
                             '</div>'; */
                            str1 += '<div class="row col-xs-12 col-sm-12 avail notAvail">' +
                                '<div class="msg">' +
                                '<div class="col-xs-6 col-sm-6 continue">' + data.resp.couponList[i].name + '</div>' +
                                '<div class="col-xs-6 col-sm-6 value"><span class="value1">¥</span> <span class="value2">' + data.resp.couponList[i].value + '</span></div>' +
                                '</div>' +
                                '<div class="col-xs-12 col-sm-12 term">有效期：截止到 2017-02-28 24:00:00</div>' +
                                '<div class="col-xs-12 col-sm-12 require">' + data.resp.couponList[i].rule + '</div>' +
                                '<img class="status" src="image/withoutCamp/coupon2.png">' +
                                '</div>';
                        }
                    }
                    $(".coupons").append(str1);
                }else{
                    var str2 = '<div class="row noCoupon">暂无可使用的优惠券~</div>'
                    $(".coupons").append(str2);
                }


                if(data.resp.codeList.length>0){
                    var str1 = "";
                    for(i=0;i<data.resp.codeList.length;i++){
                       
                     
                      if(!data.resp.codeList[i].expire){
                       str1 += '<div class="row col-xs-12 col-sm-12 avail isAvail">'+
                               '<div class="msg">'+
                               '<div class="col-xs-9 col-sm-9 continue">'+
                               '<p class="zan">'+data.resp.codeList[i].name+'</p>'+
                               '<p class="zanNum">'+data.resp.codeList[i].coupon_code+'&nbsp;<span code='+data.resp.codeList[i].coupon_code+' class="copy copy3">&nbsp;复制&nbsp;</span></p>'+
                               '</div>'+
                               '<div class="col-xs-3 col-sm-3 value"><span class="value1">¥</span> <span class="value2">'+data.resp.codeList[i].value+'</span></div>'+
                               '</div>'+
                               '<div class="col-xs-12 col-sm-12 term">有效期：'+data.resp.codeList[i].begin_time+' - '+data.resp.codeList[i].end_time+'</div>'+
                               '<div class="col-xs-12 col-sm-12 require">'+data.resp.codeList[i].rule+'</div>'+
                               '<div class="col-xs-12 col-sm-12 goTo" >前往有赞使用</div>'+
                               '</div>';
                      }else{
                        str1 +=  '<div class="row col-xs-12 col-sm-12 avail notAvail">'+
                                 '<div class="msg">'+
                                 '<div class="col-xs-9 col-sm-9 continue">'+
                                 '<p class="zan">'+data.resp.codeList[i].name+'</p>'+
                                 '<p class="zanNum zanNum2">'+data.resp.codeList[i].coupon_code+'&nbsp;<span class="copy copy2">&nbsp;复制&nbsp;</span></p>'+
                                 '</div>'+
                                 '<div class="col-xs-3 col-sm-3 value"><span class="value1">¥</span> <span class="value2">'+data.resp.codeList[i].value+'</span></div>'+
                                 '</div>'+
                                 '<div class="col-xs-12 col-sm-12 term">有效期：'+data.resp.codeList[i].begin_time+' - '+data.resp.codeList[i].end_time+'</div>'+
                                 '<div class="col-xs-12 col-sm-12 require">'+data.resp.codeList[i].rule+'</div>'+
                                 '<img class="status" src="image/withoutCamp/coupon3.png">'+
                                 '<div class="col-xs-12 col-sm-12 goTo goTo2">前往有赞使用</div>'+
                                 '</div>';
                      }
                    }
                    $(".couponCode").append(str1);

                    //跳转到有赞
                    $(".isAvail .goTo").unbind("click").click(function(){
                        setMaiDian(SWoDeYouHuiQuan.SCategory_SWoDeYouHuiQuan,SWoDeYouHuiQuan.SWoDeYouHuiQuan_QianWangYouZan);
                        var deviceType=isMobile();//判断是不是app的方法
                        if(deviceType == "isApp" && (typeof mobileApp != "undefined")){
                           var data={
                               link:"https://h5.koudaitong.com/v2/goods/361jk71ya1ddk",
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
                        }else{
                           window.location.href="https://h5.koudaitong.com/v2/goods/361jk71ya1ddk";
                        }
                    });

                    $(".copy3").unbind("click").click(function(event){
                        event.stopPropagation();
                        var copycontent = $(this).attr("code");
                        //app复制内容到剪切板
                        var deviceType=isMobile();
                        if(deviceType == "isApp" && (typeof mobileApp != "undefined")){
                            var getPageInfo = function (){
                              var data = {
                                content:copycontent
                              };
                              return JSON.stringify(data);
                            };
                            if(getParamByUrl("os")=="android"){
                                mobileApp.copyContent(getPageInfo());
                            }
                            else{
                                mobileApp.copyContent.postMessage(getPageInfo());
                            }
                            //mobileApp.copyContent(getPageInfo());
                        }
                        $(".fixBg").css("height",$(window).height());
                        $(".fixBg-main").css("width",$(window).width()-140);
                        $(".fixBg-p").css("display","block");
                        $(".fixBg").css("display","block");
                        $(".fixBg-p").html("复制成功，前往有赞去使用吧~");
                        $(".fixBg-main").css("margin-top",-$(".fixBg-main").height()/2);
                        setTimeout(function(){
                          $(".fixBg").css("display","none");
                          $(".fixBg-p").css("display","none");
                        },1500);
                    });
                }else{
                    var str2 = '<div class="row noCoupon">暂无可使用的优惠码~</div>';
                    $(".couponCode").append(str2);
                }
            }else{
                $(".error-main-t").html(data.result.message);
                $(".errorAlert").css("display","block");
                $(".error-main").css("margin-top",-$(".error-main").height()/2);
            }
        }
    })
}

function appNoShare(){
    var getPageInfo = function (){
        var data = {
            title:'燃脂营优惠券',
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
    document.documentElement.style.webkitTouchCallout='none';
}