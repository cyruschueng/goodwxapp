var SDingDanXiangQing={
    SCategory_SDingDanXiangQing:5080500,
    SDingDanXiangQing_ShiFouQuXiaoDingDan:5080501,//是否取消订单
    SDingDanXiangQing_QuXiaoDingDan:5080502,//取消订单
    SDingDanXiangQing_ZanBuQuXiao:5080503,//暂不取消
    SDingDanXiangQing_LianXiKeFu:5080504,//联系客服
    SDingDanXiangQing_QuXiaoLianXiKeFu:5080505,//取消联系客服
    SDingDanXiangQing_QianWangWeiXin:5080506,//前往微信
    SDingDanXiangQing_QianWangShangPinXiangQing:5080507,//前往商品详情页
    SDingDanXiangQing_QuZhiFu:5080508//去支付
};
var goodsId = "";
$(function(){
    appNoShare();
    //获取订单详情
    getOrderInfo();
    // setTimeout(function(){
    //   $(".container").css("display","block");
    // },500);
    var deviceType=isMobile();
    if(deviceType == "isApp" && (typeof mobileApp != "undefined")){
      // alert("调试：toOrderDetails-----------------"+getCookie("toOrderDetails"));
      // alert("调试：toOrderSuccess-----------------"+getCookie("toOrderSuccess"));
      // alert("测试："+getCookie("toOrderDetails")+"========="+getCookie("toOrderSuccess"));
      if(getCookie("toOrderDetails") == "1"){ //从订单列表进入订单详情页面
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
      }else if(getCookie("toOrderDetails") == "2"){ //从下单成功页进入订单详情页面
          if(getCookie("toOrderSuccess") == "1"){ //从订单列表进入的下单成功页
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
          }else if(getCookie("toOrderSuccess") == "2"){ //从订单详情进入的下单成功页
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
          }else{   //从确认订单页面进入下单成功页
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

      // var rightdata={
      //   rightImg: "",//右上角图片
      //   function:""//右上角点击后需要调的h5的方法名
      // };
      // mobileApp.showRightBtn("");
    }


    $(".container").css("display","block");
    $(".cancel").unbind("click").click(function(){
        setMaiDian(SDingDanXiangQing.SCategory_SDingDanXiangQing,SDingDanXiangQing.SDingDanXiangQing_ShiFouQuXiaoDingDan);
        goodsId = $(this).attr("goodsId");
        $(".fixbg-main-t").html("确认取消订单？");
        $(".fixbg-main-t").css("text-align","center");
        $(".fixbg-main-btn1").html("取消订单");
        $(".fixbg-main-btn2").html("暂不取消");
        $(".fixbg").css("display","block");
        $(".fixbg-main").css("margin-top",-$(".fixbg-main").height()/2);
        $(".fixbg-main").css("width","84%");
        $(".fixbg-main").css("left","8%");
        $(".fixbg-main-btn2").unbind("click").click(function(){
            setMaiDian(SDingDanXiangQing.SCategory_SDingDanXiangQing,SDingDanXiangQing.SDingDanXiangQing_ZanBuQuXiao);
          $(".fixbg").css("display","none");
        });
        $(".fixbg-main-btn1").unbind("click").click(function(){
            setMaiDian(SDingDanXiangQing.SCategory_SDingDanXiangQing,SDingDanXiangQing.SDingDanXiangQing_QuXiaoDingDan);
            //取消订单
            cancelOrder(2);
        });
    });
    $(".service").unbind("click").click(function(){
        setMaiDian(SDingDanXiangQing.SCategory_SDingDanXiangQing,SDingDanXiangQing.SDingDanXiangQing_LianXiKeFu);
        var deviceType=isMobile();
        if(deviceType == "isApp" && (typeof mobileApp != "undefined")){
            var getPageInfo = function (){
              var data = {
                content:"picoocer2"
              };
              return JSON.stringify(data);
            };
            mobileApp.copyContent(getPageInfo());
        }

        // $(".fixbg-main-t").html('燃脂营售后服务微信号<span style="color:#c7b1a4;">picoocer2</span>，已复制到剪贴板，请前往微信，在顶部搜索中粘贴');
        $(".fixbg-main-t").html('已复制燃脂营售后客服微信号<span style="color:#35d0c5;">picoocer2</span>，请前往微信，在顶部搜索中粘贴');
        $(".fixbg-main-t").css("text-align","left");
        $(".fixbg-main-btn1").html("取消");
        $(".fixbg-main-btn2").html("前往微信");
        $(".fixbg").css("display","block");
        $(".fixbg-main").css("margin-top",-$(".fixbg-main").height()/2);
        $(".fixbg-main").css("width","90%");
        $(".fixbg-main").css("left","5%");
        $(".fixbg-main-btn2").unbind("click").click(function(){
            setMaiDian(SDingDanXiangQing.SCategory_SDingDanXiangQing,SDingDanXiangQing.SDingDanXiangQing_QianWangWeiXin);
            $(".fixbg").css("display","none");
            var deviceType=isMobile();
            if(deviceType == "isApp" && (typeof mobileApp != "undefined")){
                mobileApp.gotoWechat();
            }
        });
        $(".fixbg-main-btn1").unbind("click").click(function(){
            setMaiDian(SDingDanXiangQing.SCategory_SDingDanXiangQing,SDingDanXiangQing.SDingDanXiangQing_QuXiaoLianXiKeFu);
            $(".fixbg").css("display","none");
        });
    });
    
});

function getOrderInfo(){
    var finalUrl=ajaxLink+"/v1/api/campOrder/orderInfo"+window.location.search;
    $.ajax({
        type:"get",
        url:finalUrl,
        dataType:"json",
        success:function(data){
          if(data.code == 200){
            if(data.resp!=undefined && data.resp!=null && data.resp!=""){
                $("#orderId").html(data.resp.orderId);
                var str1 = '<span class="wait">等待付款</span>';
                var str2 = '<span class="nowait">已完成</span>';
                var str3 = '<span class="nowait">已关闭</span>';
                var str4 = '<span class="nowait">已取消</span>';
                var str5 = '<span class="nowait">退款中</span>';
                var str6 = '<span class="nowait">退款完成</span>';
                if(data.resp.orderType==0){
                  $("#orderStatus").html(str1);
                  $(".status").css("display","block");
                  $(".cancel").attr("orderId",data.resp.orderId);
                  $(".cancel").attr("goodsId",data.resp.goodsId);
                  $(".gotoPay").attr("orderId",data.resp.orderId);
                  timeDiffer(data.resp.nowDate,data.resp.endTime);
                }else if(data.resp.orderType==1){
                  $("#orderStatus").html(str2);
                  $(".status").css("display","none");
                }else if(data.resp.orderType==2){
                  $("#orderStatus").html(str4);
                  $(".status").css("display","none");
                }else if(data.resp.orderType==3){
                  $("#orderStatus").html(str3);
                  $(".status").css("display","none");
                }else if(data.resp.orderType==4){
                  $("#orderStatus").html(str5);
                  $(".status").css("display","none");
                }else if(data.resp.orderType==5){
                  $("#orderStatus").html(str6);
                  $(".status").css("display","none");
                }

                var goodsUrl = JSON.parse(data.resp.goodsUrl);
                $("#orderImg").attr("src",goodsUrl[0].url);
                $("#orderName").html(data.resp.goodsName);
                var beginTime = data.resp.beginTime;
                var arr=beginTime.split('-');
                var beginTime2 = arr[0]+'年'+arr[1]+'月'+arr[2]+'日';
                $("#beginTime").html(beginTime2);

                $("#totalPrice").html(data.resp.origPrice);
                $("#phoneNum").html(data.resp.phoneNo);

                if(data.resp.weChat && data.resp.weChat!=null && data.resp.weChat!=""){
                  $(".content1").css("height","6.25rem");
                  $(".wechat").css("display","block");
                  if(data.resp.weChat.length>20){
                    $("#wechatNum").html(data.resp.weChat.substring(0,12)+"...");
                  }else{
                    $("#wechatNum").html(data.resp.weChat);
                  }
                  
                }

                $("#origPrice").html(data.resp.origPrice);
                $("#couponPrice").html(data.resp.couponPrice);
                $("#currentPrice").html("¥"+data.resp.currentPrice);
                $("#userName").html(data.resp.userName);
                
                $(".container").css("visibility","visible");

                $(".info").unbind("click").click(function(){
                    setMaiDian(SDingDanXiangQing.SCategory_SDingDanXiangQing,SDingDanXiangQing.SDingDanXiangQing_QianWangShangPinXiangQing);
                    window.location.href = "productDetails.html"+window.location.search+"&id="+data.resp.goodsId+"&refer=4&urlSign=1"+"&typeSize="+data.resp.goodsType;
                });
                
                $(".gotoPay").unbind("click").click(function(){
                    setMaiDian(SDingDanXiangQing.SCategory_SDingDanXiangQing,SDingDanXiangQing.SDingDanXiangQing_QuZhiFu);
                    setCookiePath("toOrderSuccess","2",1,"/;domain=picooc.com");
                    // alert("toOrderSuccess:================="+getCookie("toOrderSuccess"));
                    var deviceType=isMobile();
                    if(deviceType == "isApp" && (typeof mobileApp != "undefined")){
                      var getPageInfo = function (){
                        var paydata = {
                          orderId:data.resp.orderId,
                          url:absoluteUrl+"orderSuccess.html"+window.location.search,
                          price:data.resp.currentPrice,
                          isRefresh:true,
                          function:"getOrderInfo"
                        };
                        return JSON.stringify(paydata);
                      };
                      // alert(mobileApp.gotoPay);
                      mobileApp.gotoPay(getPageInfo());
                    }
                    // event.stopPropagation();
                    // var orderId = $(this).attr("orderId");
                    // window.location.href="orderSuccess.html"+window.location.search+"&orderId="+orderId;
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

//取消订单
function cancelOrder(orderType){
    var finalUrl=ajaxLink+"/v1/api/campOrder/updateOrder"+window.location.search+"&goodsId="+goodsId+"&orderType="+orderType;
    $.ajax({
        type:"get",
        url:finalUrl,
        dataType:"json",
        success:function(data){
          if(data.code == 200){
            if(orderType==2){
              $(".fixbg").css("display","none");
              $(".status").css("display","none");
              $(".wait").html("已取消");
              $(".wait").css("color","#adadad");

              $(".fixBg").css("display","block");
              $(".fixBg-p").css("display","block");
              $(".fixBg-p").html("订单已取消");
              $(".fixBg").css("height",$(window).height());
              $(".fixBg-main").css("width",$(window).width()-140);
              $(".fixBg-main").css("margin-top",-$(".fixBg-main").height()/2);
              setTimeout(function(){
                $(".fixBg").css("display","none");
                $(".fixBg-p").css("display","none");
              },1500);
            }else if(orderType==3){
              $(".status").css("display","none");
              $(".wait").html("已关闭");
              $(".wait").css("color","#adadad");

              // $(".fixBg").css("display","block");
              // $(".fixBg-p").css("display","block");
              // $(".fixBg-p").html("订单已关闭");
              // $(".fixBg").css("height",$(window).height());
              // $(".fixBg-main").css("width",$(window).width()-140);
              // $(".fixBg-main").css("margin-top",-$(".fixBg-main").height()/2);
              // setTimeout(function(){
              //   $(".fixBg").css("display","none");
              //   $(".fixBg-p").css("display","none");
              // },1500);
            }

          }else{
            $(".fixbg").css("display","none");
            $(".error-main-t").html(data.result.message);
            $(".errorAlert").css("display","block");
            $(".error-main").css("margin-top",-$(".error-main").height()/2);
          }
        }
    })
}


//获取时间差
//timeDiffer("2016-11-14 10:00:00", "2016-11-14 10:00:10");
function timeDiffer(nowTime, endTime) {
    if(getParamByUrl("os")=="iOS"){
      endTime = endTime.replace(/-/g,"/");
      nowTime = nowTime.replace(/-/g,"/");
    }else{}
    var intDiff = new Date(endTime) - new Date(nowTime);
    // alert((new Date(endTime))+'|'+ (new Date(nowTime)));
    intDiff = parseInt(intDiff/1000);//倒计时总秒数量
    var t1 = setInterval(function(){

        if (intDiff >= 0) {
            var day = Math.floor(intDiff / (60 * 60 * 24));
            var hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
            var minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
            var second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
            hour = (hour<10?'0':'') + hour;
            minute = (minute<10?'0':'') + minute;
            second = (second<10?'0':'') + second;
            $("#hour").html(hour+':');
            $('#minute').html(minute+':');
            $('#second').html(second);
            // $(".status .timeNum span").css("display","inline-block");
            // $(".status .timeNum span").css("width","20px");
            // $(".status .timeNum span").css("height","20px");
            intDiff--;
        }else if(intDiff < 0){
            // showGoodsStatus();//倒计时为0时，刷新整个页面
            console.log(intDiff);
            clearInterval(t1);
            cancelOrder(3);  //关闭订单
        }
    }, 1000);
}

function appNoShare(){
  var getPageInfo = function (){
    var data = {
      title:"订单详情",
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