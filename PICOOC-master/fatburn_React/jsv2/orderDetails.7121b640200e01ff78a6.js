webpackJsonp([27],{224:function(e,a,n){"use strict";var i=n(0),t=n(1),s=n(3),r={SCategory_SDingDanXiangQing:5080500,SDingDanXiangQing_ShiFouQuXiaoDingDan:5080501,SDingDanXiangQing_QuXiaoDingDan:5080502,SDingDanXiangQing_ZanBuQuXiao:5080503,SDingDanXiangQing_LianXiKeFu:5080504,SDingDanXiangQing_QuXiaoLianXiKeFu:5080505,SDingDanXiangQing_QianWangWeiXin:5080506,SDingDanXiangQing_QianWangShangPinXiangQing:5080507,SDingDanXiangQing_QuZhiFu:5080508},c="",o=[i.createElement("span",{className:"wait"},"等待付款"),i.createElement("span",{className:"nowait"},"已完成"),i.createElement("span",{className:"nowait"},"已取消"),i.createElement("span",{className:"nowait"},"已关闭"),i.createElement("span",{className:"nowait"},"退款中"),i.createElement("span",{className:"nowait"},"退款完成")],l=i.createClass({displayName:"OrderDetailsContainer",getInitialState:function(){var e=this;window.getOrderInfo=e.getOrderInfo,e.getOrderInfo();var a=isMobile();if(getParamByUrl("webver")>2){var n={title:"订单详情",color:"",opacity:"",backgroundColor:"",backgroundOpacity:""};n=JSON.stringify(n),appFc.controlTitle(n)}else{"isApp"==a&&"undefined"!=typeof mobileApp&&mobileApp.getShareInfo(function(){var e={title:"订单详情",isShare:!1,backgroundColor:"#2c2f31"};return JSON.stringify(e)}()),document.documentElement.style.webkitTouchCallout="none"}if("isApp"==a)if("1"==getCookie("toOrderDetails"))if(getParamByUrl("webver")>2){appFc.controlLeft(function(){var e={iconType:0,iconColor:"",backNum:1,closeWebview:0,hidden:!1,isHandle:!1,functionName:"",isRefreshPage:!0};return JSON.stringify(e)}())}else{mobileApp.showLeftBtn(function(){var e={iconType:0,backNum:1,closeWebview:0,iconUrl:"",isRefreshPage:!0};return JSON.stringify(e)}())}else if("2"==getCookie("toOrderDetails"))if("1"==getCookie("toOrderSuccess"))if(getParamByUrl("webver")>2){appFc.controlLeft(function(){var e={iconType:0,iconColor:"",backNum:1,closeWebview:0,hidden:!1,isHandle:!1,functionName:"",isRefreshPage:!0};return JSON.stringify(e)}())}else{mobileApp.showLeftBtn(function(){var e={iconType:0,backNum:1,closeWebview:0,iconUrl:"",isRefreshPage:!0};return JSON.stringify(e)}())}else if("2"==getCookie("toOrderSuccess"))if(getParamByUrl("webver")>2){appFc.controlLeft(function(){var e={iconType:0,iconColor:"",backNum:1,closeWebview:0,hidden:!1,isHandle:!1,functionName:"",isRefreshPage:!0};return JSON.stringify(e)}())}else{mobileApp.showLeftBtn(function(){var e={iconType:0,backNum:1,closeWebview:0,iconUrl:"",isRefreshPage:!0};return JSON.stringify(e)}())}else if(getParamByUrl("webver")>2){appFc.controlLeft(function(){var e={iconType:0,iconColor:"",backNum:1,closeWebview:0,hidden:!1,isHandle:!1,functionName:"",isRefreshPage:!0};return JSON.stringify(e)}())}else{mobileApp.showLeftBtn(function(){var e={iconType:0,backNum:1,closeWebview:0,iconUrl:"",isRefreshPage:!0};return JSON.stringify(e)}())}return{orderDetailsData:{}}},render:function(){var e,a=this,n=a.state.orderDetailsData,t="none",s="none";if(console.log(n),void 0!==n.resp){t="block";var r=n.resp.beginTime,c=r.split("-"),l=c[0]+"年"+c[1]+"月"+c[2]+"日",m="¥"+n.resp.currentPrice;0==n.resp.orderType&&(s="block",a.timeDiffer(n.resp.nowDate,n.resp.endTime));var g="";"block",g=n.resp.weChat,n.resp.weChat&&null!=n.resp.weChat&&""!=n.resp.weChat&&("block",g=n.resp.weChat,g.length>20&&(g=g.substring(0,12)+"...")),e=i.createElement("div",null,i.createElement("section",{className:"container",style:{display:t}},i.createElement("aside",{className:"row order common"},i.createElement("div",{className:"row col-xs-12 col-sm-12 orderDetail"},i.createElement("div",{className:"col-xs-8 col-sm-8 left"},"订单编号：",i.createElement("span",{id:"orderId"},n.resp.orderId)),i.createElement("div",{className:"col-xs-4 col-sm-4 right",id:"orderStatus"},o[n.resp.orderType])),i.createElement("div",{className:"row col-xs-12 col-sm-12 info",onClick:a.infoFunction},i.createElement("div",{className:"col-xs-3 col-sm-3 infoImg"},i.createElement("img",{id:"orderImg",src:n.resp.goodsUrl})),i.createElement("div",{className:"col-xs-9 col-sm-9 infoDesc"},i.createElement("h3",{id:"orderName"},n.resp.goodsName),i.createElement("div",{className:"infoDesc_bottom"},i.createElement("p",{className:"campBegin"},"开营时间：",i.createElement("span",{id:"beginTime"},l)),i.createElement("p",{className:"price",id:"price"},"¥",i.createElement("span",{id:"totalPrice"},n.resp.origPrice)))))),i.createElement("aside",{className:"row common content content5",style:{display:null==n.resp.activationCode?"block":"none"}},i.createElement("div",{className:"row col-xs-12 col-sm-12"},i.createElement("div",{className:"col-xs-5 col-sm-5 left"},"参营人"),i.createElement("div",{className:"col-xs-7 col-sm-7 right",id:"userName"},n.resp.userName))),i.createElement("aside",{className:"row common content content1",style:{height:null==n.resp.activationCode?"6.25rem":"auto"}},i.createElement("div",{className:"row col-xs-12 col-sm-12 content1-padding"},i.createElement("div",{className:"col-xs-5 col-sm-5 left"},"手机号"),i.createElement("div",{className:"col-xs-7 col-sm-7 right",id:"phoneNum"},n.resp.phoneNo)),i.createElement("div",{className:"row col-xs-12 col-sm-12 borderTop content1-padding",style:{display:null==n.resp.activationCode?"block":"none"}},i.createElement("div",{className:"col-xs-5 col-sm-5 left"},"微信号"),i.createElement("div",{className:"col-xs-7 col-sm-7 right",id:"wechatNum"},g))),i.createElement("aside",{className:"row common content content2"},i.createElement("div",{className:"row col-xs-12 col-sm-12"},i.createElement("div",{className:"col-xs-5 col-sm-5 left"},"支付方式"),i.createElement("div",{className:"col-xs-7 col-sm-7 right"},"微信支付"))),i.createElement("aside",{className:"row common content content3"},i.createElement("div",{className:"row col-xs-12 col-sm-12"},i.createElement("div",{className:"col-xs-5 col-sm-5 left"},"商品总额"),i.createElement("div",{className:"col-xs-7 col-sm-7 right right2"},"¥",i.createElement("span",{id:"origPrice"},n.resp.origPrice)),i.createElement("div",{className:"col-xs-5 col-sm-5 left"},"优惠券"),i.createElement("div",{className:"col-xs-7 col-sm-7 right right2"},"-¥",i.createElement("span",{id:"couponPrice"},n.resp.couponPrice)),i.createElement("div",{className:"col-xs-6 col-sm-6 left"}),i.createElement("div",{className:"col-xs-6 col-sm-6 right right2 right3"},i.createElement("span",null,"实付款"),i.createElement("span",{id:"currentPrice",style:{marginLeft:"1rem"}},m)))),i.createElement("aside",{className:"row common content content4 service",onClick:a.serviceFunction},i.createElement("div",{className:"row col-xs-12 col-sm-12 contact"},i.createElement("img",{src:"https://cdn2.picooc.com/web/res/fatburn/image/sell/orderDetailsOut/server.png"})," ",i.createElement("span",null,"咨询售后客服"))),i.createElement("aside",{className:"row common content status",style:{display:s}},i.createElement("div",{className:"row col-xs-12 col-sm-12"},i.createElement("div",{className:"row col-xs-6 col-sm-6 left"},i.createElement("div",{className:"col-xs-12 col-sm-12 time"},"待付款剩余时间"),i.createElement("div",{className:"col-xs-12 col-sm-12 timeNum"},i.createElement("span",{id:"hour"}),i.createElement("span",{id:"minute"}),i.createElement("span",{id:"second"}))),i.createElement("div",{className:"col-xs-6 col-sm-6 right"},i.createElement("span",{className:"cancel",onClick:a.cancelOrderFunction,"data-order_id":n.resp.orderId,"data-goods_id":n.resp.goodsId},"取消订单"),i.createElement("span",{onClick:a.goToPayFunction,className:"gotoPay","data-order_id":n.resp.orderId,"data-source_type":n.resp.sourceType,style:{marginLeft:"1rem"}},"去支付"))))),i.createElement("aside",{className:"row fixbg"},i.createElement("div",{className:"col-xs-12 col-sm-12 fixbg-main"},i.createElement("div",{className:"row"},i.createElement("div",{className:"col-xs-12 col-sm-12 fixbg-main-t"}),i.createElement("div",{className:"col-xs-12 col-sm-12 fixbg-main-btn"},i.createElement("div",{className:"row"},i.createElement("div",{className:"col-xs-6 col-sm-6 fixbg-main-btn1"}),i.createElement("div",{className:"col-xs-6 col-sm-6 fixbg-main-btn2"})))))),i.createElement("aside",{className:"row fixBg"},i.createElement("div",{className:"col-xs-12 col-sm-12 fixBg-main"},i.createElement("div",{className:"row"},i.createElement("div",{className:"col-xs-12 col-sm-12 fixBg-top"},i.createElement("div",{className:"row"},i.createElement("div",{className:"col-xs-12 col-sm-12 fixBg-p"})))))))}else e=i.createElement("i",null);return e},getOrderInfo:function(){var e=this,a=ajaxLink+"/v1/api/campOrder/orderInfo"+window.location.search;$.ajax({type:"get",url:a,dataType:"json",success:function(n){200==n.code?(console.log(n),console.log(a),void 0!==e.state.orderDetailsData.resp&&e.state.orderDetailsData.resp.records.length>0&&(n.resp.records=e.state.orderDetailsData.resp.records.concat(n.resp.records)),e.setState({orderDetailsData:n})):($(".error-main-t").html(n.result.message),$(".errorAlert").css("display","block"),$(".error-main").css("margin-top",-$(".error-main").height()/2))}})},infoFunction:function(){var e=this,a=e.state.orderDetailsData;setMaiDian(r.SCategory_SDingDanXiangQing,r.SDingDanXiangQing_QianWangShangPinXiangQing);for(var n=window.location.search.substring(1),i=n.split("&"),t="",s=0;s<i.length;s++){var c=i[s].split("=");"orderId"!=c[0]&&"refer"!=c[0]&&(t+="&"+c[0]+"="+c[1])}var o=a.resp.linkId;null!=o&&(window.location.href="productDetails.html?urlSign=1&refer=4"+t+"&linkId="+o)},serviceFunction:function(){if(setMaiDian(r.SCategory_SDingDanXiangQing,r.SDingDanXiangQing_LianXiKeFu),"isApp"==isMobile()){var e=function(){var e={content:"picooc2"};return JSON.stringify(e)};getParamByUrl("webver")>2?appFc.copyContent(e()):mobileApp.copyContent(e())}$(".fixbg-main-t").html('已复制燃脂营售后客服微信号<span style="color:#35d0c5;">picooc2</span>，请前往微信，在顶部搜索中粘贴'),$(".fixbg-main-t").css("text-align","left"),$(".fixbg-main-btn1").html("取消"),$(".fixbg-main-btn2").html("前往微信"),$(".fixbg").css("display","block"),$(".fixbg-main").css("margin-top",-$(".fixbg-main").height()/2),$(".fixbg-main").css("width","90%"),$(".fixbg-main").css("left","5%"),$(".fixbg-main-btn2").unbind("click").click(function(){setMaiDian(r.SCategory_SDingDanXiangQing,r.SDingDanXiangQing_QianWangWeiXin),$(".fixbg").css("display","none"),"isApp"==isMobile()&&(getParamByUrl("webver")>2?appFc.gotoWechat():mobileApp.gotoWechat())}),$(".fixbg-main-btn1").unbind("click").click(function(){setMaiDian(r.SCategory_SDingDanXiangQing,r.SDingDanXiangQing_QuXiaoLianXiKeFu),$(".fixbg").css("display","none")})},cancelOrderFunction:function(){var e=this;setMaiDian(r.SCategory_SDingDanXiangQing,r.SDingDanXiangQing_ShiFouQuXiaoDingDan),c=$(".cancel").attr("data-goods_id"),$(".fixbg-main-t").html("确认取消订单？"),$(".fixbg-main-t").css("text-align","center"),$(".fixbg-main-btn1").html("取消订单"),$(".fixbg-main-btn2").html("暂不取消"),$(".fixbg").css("display","block"),$(".fixbg-main").css("margin-top",-$(".fixbg-main").height()/2),$(".fixbg-main").css("width","84%"),$(".fixbg-main").css("left","8%"),$(".fixbg-main-btn2").unbind("click").click(function(){setMaiDian(r.SCategory_SDingDanXiangQing,r.SDingDanXiangQing_ZanBuQuXiao),$(".fixbg").css("display","none")}),$(".fixbg-main-btn1").unbind("click").click(function(){setMaiDian(r.SCategory_SDingDanXiangQing,r.SDingDanXiangQing_QuXiaoDingDan),e.cancelOrder(2)})},goToPayFunction:function(e){var a=this,n=a.state.orderDetailsData,i=$.trim(e.currentTarget.getAttribute("data-source_type"));setMaiDian(r.SCategory_SDingDanXiangQing,r.SDingDanXiangQing_QuZhiFu),setCookiePath("toOrderSuccess","2",1,"/;domain=picooc.com");var t=isMobile();if("燃脂营APP"==i||"有赞"==i){if("isApp"==t){var s=function(){var e={orderId:n.resp.orderId,url:absoluteUrl+"orderSuccess.html"+window.location.search,price:n.resp.currentPrice,isRefresh:!0,function:"getOrderInfo"};return JSON.stringify(e)};getParamByUrl("webver")>2?appFc.gotoPay(s()):mobileApp.gotoPay(s())}}else"微信"==i?($(".error-main-t").html("该订单在微信上生成哒，请在同一个渠道完成支付~"),$(".errorAlert").css("display","block"),$(".error-main").css("margin-top",-$(".fixbg-main").height()/2)):"微博"==i?($(".error-main-t").html("该订单在微博上生成哒，请在同一个渠道完成支付~"),$(".errorAlert").css("display","block"),$(".error-main").css("margin-top",-$(".fixbg-main").height()/2)):"QQ"==i?($(".error-main-t").html("该订单在qq上生成哒，请在同一个渠道完成支付~"),$(".errorAlert").css("display","block"),$(".error-main").css("margin-top",-$(".fixbg-main").height()/2)):($(".error-main-t").html("该订单在浏览器上生成哒，请在同一个渠道完成支付~"),$(".errorAlert").css("display","block"),$(".error-main").css("margin-top",-$(".fixbg-main").height()/2))},timeDiffer:function(e,a){var n=this;"iOS"==getParamByUrl("os")&&(a=a.replace(/-/g,"/"),e=e.replace(/-/g,"/"));var i=new Date(a)-new Date(e);i=parseInt(i/1e3);var t=setInterval(function(){if(i>=0){var e=Math.floor(i/86400),a=Math.floor(i/3600)-24*e,s=Math.floor(i/60)-24*e*60-60*a,r=Math.floor(i)-24*e*60*60-60*a*60-60*s;a=(a<10?"0":"")+a,s=(s<10?"0":"")+s,r=(r<10?"0":"")+r,$("#hour").html(a+":"),$("#minute").html(s+":"),$("#second").html(r),i--}else i<0&&(console.log(i),clearInterval(t),n.cancelOrder(3))},1e3)},cancelOrder:function(e){console.log(c);var a=ajaxLink+"/v1/api/campOrder/updateOrder"+window.location.search+"&goodsId="+c+"&orderType="+e;$.ajax({type:"get",url:a,dataType:"json",success:function(n){console.log(a),200==n.code?2==e?($(".fixbg").css("display","none"),$(".status").css("display","none"),$(".wait").html("已取消"),$(".wait").css("color","#adadad"),$(".fixBg").css("display","block"),$(".fixBg-p").css("display","block"),$(".fixBg-p").html("订单已取消"),$(".fixBg").css("height",$(window).height()),$(".fixBg-main").css("width",$(window).width()-140),$(".fixBg-main").css("margin-top",-$(".fixBg-main").height()/2),setTimeout(function(){$(".fixBg").css("display","none"),$(".fixBg-p").css("display","none")},1500)):3==e&&($(".status").css("display","none"),$(".wait").html("已关闭"),$(".wait").css("color","#adadad")):($(".fixbg").css("display","none"),$(".error-main-t").html(n.result.message),$(".errorAlert").css("display","block"),$(".error-main").css("margin-top",-$(".error-main").height()/2))}})},copyFunction:function(){this.refs.activationCode.select(),document.execCommand("Copy")}}),m=i.createClass({displayName:"Component",render:function(){return i.createElement("div",null,i.createElement(l,null),i.createElement(s,null))}});t.render(i.createElement(m,null),document.getElementById("orderDetailsBox"))}},[224]);