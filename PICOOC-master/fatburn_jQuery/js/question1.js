$(function(){
    $(".container").css("minHeight",$(window).height()+"px");
    $(".content .radio_item").unbind("click").bind("click",function(){
        if($(".content .active").hasClass("other")){
            $(".otherText").css("display","none");
        }
        if($(this).hasClass("other")){
            $(".otherText").css("display","block");
        }
        $(".content .radio_item").removeClass("active");
        $(".content .radio_item").children("img").attr("src","http://cdn2.picooc.com/web/res/fatburn/image/question/select.png");
        $(this).addClass("active");
        $(this).children("img").attr("src","http://cdn2.picooc.com/web/res/fatburn/image/question/selectd.png");

    });


    $('#textContent').bind('input propertychange', function() {  
        var limit=25;
        var str=$(this).val(); 
        var charLen; 
        var byteLen=0; 
        var isAllSpace=$(this).val().replace(/\s/g,"") =='' ? true:false;
        byteLen=str.length; 
        if(isAllSpace){
            byteLen = 0;
        }
        /*console.info(byteLen <= limit && byteLen > 0);*/
        if(byteLen <= limit && byteLen >= 0){
            charLen = limit-byteLen;
            $("#countPoint").text(charLen);
        }else{
            $("#countPoint").text(0);
        }
    }); 

    $(".nextBtn").unbind("click").bind("click",function(){
        var isAllSpace=$('#textContent').val().replace(/\s/g,"") =='' ? true:false;
        if($(".active").length == 0){
            $(".pointAlert").css("display","block");
            $(".pointAlert").text("请选择答案~");
            setTimeout(function(){
                $(".pointAlert").css("display","none");
            },2000);  
        }else if($(".other").hasClass("active") && isAllSpace){
            $(".pointAlert").css("display","block");
            $(".pointAlert").text("请输入内容~");
            setTimeout(function(){
                $(".pointAlert").css("display","none");
            },2000);  
        }else{
            var roleId = getParamByUrl("roleId");
            //setCookie("question1"+roleId,,30);
        }
    });

    //标题设置
    appNoShare("问题 1/6");
    leftControl(true,false);
})


//客户端设置
//左上角关闭页面时控制返回按钮
function leftControl(isHandle,isHidden){
  var getPageInfo = function (){
    var data = {
      iconType:0,
      iconColor:"",
      backNum:1,
      closeWebview:0,
      hidden:isHidden,
      isHandle:isHandle,
      functionName:"returnPage"
      //isRefreshPage:true
    };
    return JSON.stringify(data);
  }
  var deviceType=isMobile();
  if(deviceType == "isApp" && (typeof mobileApp != "undefined")){
    if(getParamByUrl("os")=="android"){
      mobileApp.controlLeft(getPageInfo());
    }
    else{
      mobileApp.controlLeft.postMessage(getPageInfo());
    }
    //mobileApp.showLeftBtn(getPageInfo());
  }
  document.documentElement.style.webkitTouchCallout='none';
}

//设置退出页面前话术
function returnPage(){
    leftControl(false,true);
    $(".returnAlert").css("display","block");
    $(".return-main-btn0").unbind("click").click(function(){
        leftControl(false,false);
        closePage(2);
    });
    $(".return-main-btn1").unbind("click").click(function(){
        $(".returnAlert").css("display","none");
        leftControl(false,false);
    });
} 


function closePage(backNum){
  alert(backNum);
  var getPageInfo = function (){
    var data = {
      backNum:backNum,//默认为1，
      closeWebview:0,//默认为0
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
      //mobileApp.deleteHistory(getPageInfo());
  }
  document.documentElement.style.webkitTouchCallout='none';
}

function appNoShare(title){
  var getPageInfo3 = function (){
    var data = {
      title:title,
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
          mobileApp.controlTitle(getPageInfo3());
      }
    else{
          mobileApp.controlTitle.postMessage(getPageInfo3());
    }
    //mobileApp.getShareInfo(getPageInfo3());
  }
  document.documentElement.style.webkitTouchCallout='none';
}
