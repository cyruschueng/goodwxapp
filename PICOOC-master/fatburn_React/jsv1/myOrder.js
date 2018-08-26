var SWoDeDingDan={
    SCategory_SWoDeDingDan:5080400,
    SWoDeDingDan_DengDaiFuKuan:5080401,//等待付款
    SWoDeDingDan_YiWanCheng:5080402,//已完成
    SWoDeDingDan_YiGuanBi:5080403,//已关闭
    SWoDeDingDan_YiQuXiao:5080404,//已取消
    SWoDeDingDan_QuZhiFu:5080405//去支付
};
$(function(){
	appNoShare();

  getOrders();
  
  // alert("bbb");
});

//获取我的订单列表
function getOrders(){
    // alert("app测试");
    var finalUrl=ajaxLink+"/v1/api/campOrder/findOrders"+window.location.search;
    $.ajax({
        type:"get",
        url:finalUrl,
        dataType:"json",
        success:function(data){
          if(data.code == 200){
            if(data.resp.records.length>0){
              var str1 = "";
              var str2 = '<span class="wait">等待付款</span>';
              var str3 = '<span class="ok">已完成</span>';
              var str4 = '<span class="ok">已关闭</span>';
              var str5 = '<span class="ok">已取消</span>';
              var str6 = "";
              var str7 = "";
              var str8 = '<span class="ok">退款中</span>';
              var str9 = '<span class="ok">退款完成</span>';
              for(i=0;i<data.resp.records.length;i++){
                if(data.resp.records[i].orderType==0){
                    str6 = str2;
                    str7 = '<div class="col-xs-4 col-sm-4 gotoPay"><span class="PayTo" goodsType='+data.resp.records[i].goodsType+' price='+data.resp.records[i].currentPrice+' orderId='+data.resp.records[i].orderId+'>去支付</span></div>';
                }else if(data.resp.records[i].orderType==1){
                    str6 = str3;
                    str7 = "";
                }else if(data.resp.records[i].orderType==2){
                    str6 = str5;
                    str7 = "";
                }else if(data.resp.records[i].orderType==3){
                    str6 = str4;
                    str7 = "";
                }else if(data.resp.records[i].orderType==4){
                    str6 = str8;
                    str7 = "";
                }else if(data.resp.records[i].orderType==5){
                    str6 = str9;
                    str7 = "";
                }
                var goodsUrl = JSON.parse(data.resp.records[i].goodsUrl);
                if(data.resp.records[i].goodsType == 1){
                  str1 += '<aside class="row order" goodsType='+data.resp.records[i].goodsType+' orderId='+data.resp.records[i].orderId+'>'+
                          '<div class="row col-xs-12 col-sm-12 orderDetail">'+
                          '<div class="col-xs-8 col-sm-8 number">订单编号：'+data.resp.records[i].orderId+'</div>'+
                          '<div class="col-xs-4 col-sm-4 waitPay">'+str6+'<img src="image/_myOrder/more.png"></div>'+
                          '</div>'+
                          '<div class="row col-xs-12 col-sm-12 info">'+
                          '<div class="col-xs-3 col-sm-3 infoImg"><img src='+goodsUrl[0].url+'></div>'+
                          '<div class="col-xs-9 col-sm-9 infoDesc">'+
                          '<h3>'+data.resp.records[i].goodsName+'</h3>'+
                          '<p>开营时间：'+data.resp.records[i].beginTime+'</p>'+
                          '</div>'+
                          '</div>'+
                          '<div class="row col-xs-12 col-sm-12 pay">'+
                          '<div class="col-xs-8 col-sm-8 payNum">实付款：'+'<span class="payprice">¥'+data.resp.records[i].currentPrice+'</span></div>'+str7+
                          '</div>'+
                          '</aside>';
                }else if(data.resp.records[i].goodsType == 2){
                  var saleTime = (data.resp.records[i].createTime).substring(0, 10);
                  str1 += '<aside class="row order" goodsType='+data.resp.records[i].goodsType+' orderId='+data.resp.records[i].orderId+'>'+
                          '<div class="row col-xs-12 col-sm-12 orderDetail">'+
                          '<div class="col-xs-8 col-sm-8 number">订单编号：'+data.resp.records[i].orderId+'</div>'+
                          '<div class="col-xs-4 col-sm-4 waitPay">'+str6+'<img src="image/_myOrder/more.png"></div>'+
                          '</div>'+
                          '<div class="row col-xs-12 col-sm-12 info">'+
                          '<div class="col-xs-3 col-sm-3 infoImg"><img src='+goodsUrl[0].url+'></div>'+
                          '<div class="col-xs-9 col-sm-9 infoDesc">'+
                          '<h3>'+data.resp.records[i].goodsName+'</h3>'+
                          '<p>购买时间：'+saleTime+'</p>'+
                          '</div>'+
                          '</div>'+
                          '<div class="row col-xs-12 col-sm-12 pay">'+
                          '<div class="col-xs-8 col-sm-8 payNum">实付款：'+'<span class="payprice">¥'+data.resp.records[i].currentPrice+'</span></div>'+str7+
                          '</div>'+
                          '</aside>';
                }

              }
              // alert("app测试2");
              $(".myOrders").html("");
              $(".myOrders").append(str1);
              // delCookie("toOrderSuccess");
              // delCookie("toOrderSuccess");
              // setCookiePath("toOrderSuccess","1",1,"/;domain=picooc.com");
              // alert(getCookie("toOrderSuccess"));
              //跳转到订单详情页
              $(".order").unbind("click").click(function(){
                  $(this).css("opacity","0.6");
                  var index = $(this).index();//设置埋点
                  //for(i=0;i<data.resp.records.length;i++){
                      if(data.resp.records[index].orderType==0){
                          setMaiDian(SWoDeDingDan.SCategory_SWoDeDingDan,SWoDeDingDan.SWoDeDingDan_DengDaiFuKuan);//等待付款
                      }else if(data.resp.records[index].orderType==1){
                          setMaiDian(SWoDeDingDan.SCategory_SWoDeDingDan,SWoDeDingDan.SWoDeDingDan_YiWanCheng);//已完成
                      }else if(data.resp.records[index].orderType==2){
                          setMaiDian(SWoDeDingDan.SCategory_SWoDeDingDan,SWoDeDingDan.SWoDeDingDan_YiQuXiao);//已取消
                      }else if(data.resp.records[index].orderType==3){
                          setMaiDian(SWoDeDingDan.SCategory_SWoDeDingDan,SWoDeDingDan.SWoDeDingDan_YiGuanBi);//已关闭
                      }
                 var orderId = $(this).attr("orderId");
                 setCookiePath("toOrderDetails","1",1,"/;domain=picooc.com");
                 // setCookie("toOrderDetails","1",1); //在cookie中存放跳转到订单详情页面的标识 1为从订单列表跳转的
                if($(this).attr("goodsType")==1){
                  window.location.href="orderDetails.html"+window.location.search+"&orderId="+orderId;
                }else if($(this).attr("goodsType")==2){
                  window.location.href="hdOrderDetails.html"+window.location.search+"&orderId="+orderId;
                }

              });
              $(".PayTo").unbind("click").click(function(event){
                  setMaiDian(SWoDeDingDan.SCategory_SWoDeDingDan,SWoDeDingDan.SWoDeDingDan_QuZhiFu);//去支付
                $(this).css("opacity","0.6");
                delCookie("toOrderSuccess");
                setCookiePath("toOrderSuccess","1",1,"/;domain=picooc.com");
                // alert("测试toOrderSuccess:"+getCookie("toOrderSuccess"));

                var orderId = $(this).attr("orderId"); 
                var currentPrice = $(this).attr("price");
                if($(this).attr("goodsType")==1){
                  var deviceType=isMobile();
                  if(deviceType == "isApp" && (typeof mobileApp != "undefined")){
                    var getPageInfo = function (){
                      var paydata = {
                        orderId:orderId,
                        url:absoluteUrl+"orderSuccess.html"+window.location.search+"&orderId="+orderId,
                        price:currentPrice,
                        isRefresh:true,
                        function:"getOrders"
                      };
                      return JSON.stringify(paydata);
                    };
                      if(getParamByUrl("os")=="android"){
                          mobileApp.gotoPay(getPageInfo());
                      }
                      else{
                          mobileApp.gotoPay.postMessage(getPageInfo());
                      }
                    //mobileApp.gotoPay(getPageInfo());
                  }
                }else if($(this).attr("goodsType")==2){
                    var deviceType=isMobile();
                    if(deviceType == "isApp" && (typeof mobileApp != "undefined")){
                      var getPageInfo = function (){
                        var paydata = {
                          orderId:orderId,
                          url:absoluteUrl+"hdPaySuccess.html"+window.location.search+"&orderId="+orderId,
                          price:currentPrice,
                          isRefresh:true,
                          function:"getOrders"
                        };
                        return JSON.stringify(paydata);
                      };
                        if(getParamByUrl("os")=="android"){
                            mobileApp.gotoPay(getPageInfo());
                        }
                        else{
                            mobileApp.gotoPay.postMessage(getPageInfo());
                        }
                      //mobileApp.gotoPay(getPageInfo());
                    }
                }

                event.stopPropagation();
                // window.location.href="orderSuccess.html"+window.location.search+"&orderId="+orderId;
              });
            }else{
              $(".myOrders").html("");
              var str = '<div class="row noOrder">暂无相关订单信息~</div>'
              $(".myOrders").append(str);
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
      title:"燃脂营订单",
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
