var STianWenJuanLingQuan={
	SCategory_STianWenJuanLingQuan:5081100,
	STianWenJuanLingQuan_LiJiXuYing:5081101,//立即续营
	STianWenJuanLingQuan_WoZhiDaoLe:5081102//我知道了
};
$(function(){
    var windowHeight = $(window).height();
    //alert(windowHeight);
    $('body').height(windowHeight);
    // $("body").css("height",$(window).height());
    var getPageInfo = function (){
        var data = {
            iconType:1,//0:默认箭头，1：叉，2：iconUrl传图片
            backNum:2,
            closeWebview:0,//默认为0
            iconUrl:""
        };
        return JSON.stringify(data);
    };
    mobileApp.showLeftBtn(getPageInfo());
    var rightdata={
      rightImg: "",//右上角图片
      function:""//右上角点击后需要调的h5的方法名
    };
  mobileApp.showRightBtn("");
	getCoupon();
	// var deviceType=isMobile();
	// if(deviceType == "isApp" && (typeof mobileApp != "undefined")){


	// }
});


function getCoupon(){
    var windowSearch = getCookie("windowSearch");
    // alert("windowSearch:---"+windowSearch);
    var finalUrl=ajaxLink+"/v1/api/campCoupon/getCoupon"+windowSearch;
    $.ajax({
        type:"get",
        url:finalUrl,
        dataType:"json",
        success:function(data){
          if(data.code == 200){
    		if(data.resp.success){
    			$("#name").html(data.resp.coupon.name);
    			$("#beginTime").html(data.resp.coupon.beginTime);
    			$("#endTime").html(data.resp.coupon.endTime);
    			$("#rule").html("恭喜您获得续营优惠券及提前购买资格，点击下方“立即续营");
    			$("#value").html(data.resp.coupon.value);
    			$(".receive2").css("display","none");
    			$(".receive1").css("display","block");

    			$(".saveCamp").unbind("click").click(function(){
                    setCookiePath("saveCampFrom","1",1,"/;domain=picooc.com");
					setMaiDian(STianWenJuanLingQuan.SCategory_STianWenJuanLingQuan,STianWenJuanLingQuan.STianWenJuanLingQuan_LiJiXuYing);
    				var link = data.resp.link;
                    // alert("link:---"+link);
                    var linkSearch = "";
                    if(link.indexOf("?")>=0){
                        linkSearch='&'+link.split("?")[1];
                        link=link.split("?")[0];
                    }
                    // alert("linkSearch:---"+linkSearch);
                    // alert(link+windowSearch+linkSearch);
                    window.location.href = link+windowSearch+linkSearch;

    			});
    		}else{
    			$(".receive1").css("display","none");
    			$(".receive2").css("display","block");

    			$(".iknow").unbind("click").click(function(){
					setMaiDian(STianWenJuanLingQuan.SCategory_STianWenJuanLingQuan,STianWenJuanLingQuan.STianWenJuanLingQuan_WoZhiDaoLe);
					// var deviceType=isMobile();
					// if(deviceType == "isApp" && (typeof mobileApp != "undefined")){
							var getPageInfo = function (){
									var data = {
										backNum:2,//默认为1，
										closeWebview:0,//默认为0
									};
								    return JSON.stringify(data);
								};
							mobileApp.deleteHistory(getPageInfo());
					// }else{
					// 	window.location.href="student.html"+windowSearch;
					// }
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