var SWenJuanTiJiaoChengGong={
    SCategory_SWenJuanTiJiaoChengGong:5080800,
    SWenJuanTiJiaoChengGong_FuZhiWeiXinHao:5080801,//复制微信号
    SWenJuanTiJiaoChengGong_QuXiao:5080802,//取消
    SWenJuanTiJiaoChengGong_QianWangWeiXin:5080803//前往微信
};
$(function(){
	appNoShare();
  var deviceType=isMobile();
  if(deviceType == "isApp" && (typeof mobileApp != "undefined")){
    // alert("测试2提交成功："+getCookie("toQuestionnaire")+"==============="+getCookie("toOrderSuccess"));
      if(getCookie("toQuestionnaire") == "1"){ //从下单成功页面进入
          if(getCookie("toOrderSuccess") == "1"){ //从订单列表进入的下单成功页
            var getPageInfo = function (){
              var data = {
                /*iconType:1,//0:默认箭头，1：叉，2：iconUrl传图片
                backNum:3,
                closeWebview:0,//默认为0
                iconUrl:""*/
                  iconType:1,
                  iconColor:"",
                  backNum:3,
                  closeWebview:0,
                  hidden:false,
                  isHandle:false,
                  functionName:""
                  //isRefreshPage:true
              };
              return JSON.stringify(data);
            };
            // alert("111");
            // alert(JSON.stringify(mobileApp));
              if(getParamByUrl("os")=="android"){
                  mobileApp.controlLeft(getPageInfo());
              }
              else{
                  mobileApp.controlLeft.postMessage(getPageInfo());
              }
            //mobileApp.showLeftBtn(getPageInfo());
          }else if(getCookie("toOrderSuccess") == "2"){ //从订单详情进入的下单成功页
            var getPageInfo = function (){
              var data = {
                /*iconType:1,//0:默认箭头，1：叉，2：iconUrl传图片
                backNum:4,
                closeWebview:0,//默认为0
                iconUrl:""*/
                  iconType:1,
                  iconColor:"",
                  backNum:4,
                  closeWebview:0,
                  hidden:false,
                  isHandle:false,
                  functionName:""
                  //isRefreshPage:true
              };
              return JSON.stringify(data);
            };
              if(getParamByUrl("os")=="android"){
                  mobileApp.controlLeft(getPageInfo());
              }
              else{
                  mobileApp.controlLeft.postMessage(getPageInfo());
              }
            //mobileApp.showLeftBtn(getPageInfo());
          }else{   //从确认订单页面进入下单成功页
            // var getPageInfo = function (){
            //   var data = {
            //     iconType:1,//0:默认箭头，1：叉，2：iconUrl传图片
            //     backNum:4,
            //     closeWebview:0,//默认为0
            //     iconUrl:""
            //   };
            //   return JSON.stringify(data);
            // };
            // mobileApp.showLeftBtn(getPageInfo());
            var getPageInfo = function (){
              var data = {
                /*iconType:1,//0:默认箭头，1：叉，2：iconUrl传图片
                backNum:0,
                closeWebview:1,//默认为0
                iconUrl:""*/
                  iconType:1,
                  iconColor:"",
                  backNum:0,
                  closeWebview:1,
                  hidden:false,
                  isHandle:false,
                  functionName:""
                  //isRefreshPage:true
              };
              return JSON.stringify(data);
            };
              if(getParamByUrl("os")=="android"){
                  mobileApp.controlLeft(getPageInfo());
              }
              else{
                  mobileApp.controlLeft.postMessage(getPageInfo());
              }
            //mobileApp.showLeftBtn(getPageInfo());
          }
      }else{
            var getPageInfo = function (){
              var data = {
                /*iconType:1,//0:默认箭头，1：叉，2：iconUrl传图片
                backNum:2,
                closeWebview:0,//默认为0
                iconUrl:""*/
                  iconType:1,
                  iconColor:"",
                  backNum:2,
                  closeWebview:0,
                  hidden:false,
                  isHandle:false,
                  functionName:""
                  //isRefreshPage:true
              };
              return JSON.stringify(data);
            };
          if(getParamByUrl("os")=="android"){
              mobileApp.controlLeft(getPageInfo());
          }
          else{
              mobileApp.controlLeft.postMessage(getPageInfo());
          }
            //mobileApp.showLeftBtn(getPageInfo());
      }

  }

	$(".copy").unbind("click").click(function(event){
        setMaiDian(SWenJuanTiJiaoChengGong.SCategory_SWenJuanTiJiaoChengGong,SWenJuanTiJiaoChengGong.SWenJuanTiJiaoChengGong_FuZhiWeiXinHao);
		event.stopPropagation();
        //app复制内容到剪切板
        var deviceType=isMobile();
        if(deviceType == "isApp" && (typeof mobileApp != "undefined")){
            var getPageInfo = function (){
              var data = {
                content:"picooc2"
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

        // $(".fixbg-main-t").html('燃脂营售后服务微信号<span style="color:#c7b1a4;">picooc2</span>，已复制到剪贴板，请前往微信，在顶部搜索中粘贴');
        $(".fixbg-main-t").html('已复制燃脂营售后客服微信号<span style="color:#35d0c5;">picooc2</span>，请前往微信，在顶部搜索中粘贴');
        $(".fixbg-main-t").css("text-align","left");
        $(".fixbg-main-btn1").html("取消");
        $(".fixbg-main-btn2").html("前往微信");
        $(".fixbg").css("display","block");
        $(".fixbg-main").css("margin-top",-$(".fixbg-main").height()/2);

        $(".fixbg-main-btn2").unbind("click").click(function(){
            setMaiDian(SWenJuanTiJiaoChengGong.SCategory_SWenJuanTiJiaoChengGong,SWenJuanTiJiaoChengGong.SWenJuanTiJiaoChengGong_QianWangWeiXin);
            $(".fixbg").css("display","none");
            //前往微信
            var deviceType=isMobile();
            if(deviceType == "isApp" && (typeof mobileApp != "undefined")){
                if(getParamByUrl("os")=="android"){
                    mobileApp.gotoWechat();
                }
                else{
                    mobileApp.gotoWechat.postMessage("");
                }
                //mobileApp.gotoWechat();
            }
        });
        $(".fixbg-main-btn1").unbind("click").click(function(){
            setMaiDian(SWenJuanTiJiaoChengGong.SCategory_SWenJuanTiJiaoChengGong,SWenJuanTiJiaoChengGong.SWenJuanTiJiaoChengGong_QuXiao);
            $(".fixbg").css("display","none");
        });
	});
})

function appNoShare(){
	var getPageInfo = function (){
		var data = {
			title:"提交成功",
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