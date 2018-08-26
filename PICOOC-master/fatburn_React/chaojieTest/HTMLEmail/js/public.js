var ajaxLink=window.location.protocol+"//"+window.location.host;
var absoluteUrl="https://a.picooc.com/web/fatburntest/";
//var absoluteUrl="https://a.picooc.com/web/fatburntest/";
if(window.location.host=="pm.picooc.com:444" || window.location.host=="pm.picooc.com:445"||window.location.host==""){
  var absoluteUrl="http://pm.picooc.com:9989/web/fatburntestReact/";
}
else if(window.location.host=="pm.picooc.com:9989"){
  var absoluteUrl="http://pm.picooc.com:9989/web/fatburntestReact/";
}
else{
  var absoluteUrl="https://a.picooc.com/web/fatburntestReact/";
}

var maidian="https://api2.picooc.com";
//var ajaxLink="https://pm.picooc.com:444";//测试版
var SAction={
    SClick_Action:1// 单击事件
};
function setMaiDian(parameter1,parameter2){//设置埋点
    $.ajax({
        type: "get",
        //url: maidian+"/v1/api/statistic/appAction"+window.location.search,
        url: maidian+"/v1/api/statistic/appAction"+window.location.search+"&ap="+parameter1+"|"+parameter2+'|'+SAction.SClick_Action,
        dataType: "jsonp",
        jsonp: "callback",
        jsonpCallback:"appAction",
        success : function (data) {
            console.log(parameter1, parameter2);
        }
    });
}
var arrHeadImg=['\'http://cdn2.picooc.com/web/res/sex0.png\'','\'http://cdn2.picooc.com/web/res/sex1.png\''];
// var arrHeadImg=['\'http://cdn2.picooc.com/web/res/appFriend/head_portrait_pic02.png\'','\'http://cdn2.picooc.com/web/res/appFriend/head_portrait_pic01.png\''];
var fontHeight=parseInt($("html").css("font-size"));
function isMobile(){
    var os = new Array("Android","iPhone","Windows Phone","iPod","BlackBerry","MeeGo","SymbianOS");  // 其他类型的移动操作系统类型，自行添加 
    var deviceType = navigator.userAgent;
    var len = os.length;
    var isinApp=isApp();
    for (var i = 0; i<len; i++) {
        if (deviceType.indexOf(os[i]) >= 0){
            if(isinApp){
                return "isApp";
            }
         return "isMobile";
        }
    }
    return "isPC";
}
function isApp(){
    var appOS=getParamByUrl("os");
    var userId=getParamByUrl("userId");
    if(appOS != "false" && userId != "false"){
        return true;
    }
    return false;
}
function getParamByUrl(paramKey){
  var url=window.location.search.substring(1);
  var arr=url.split("&");
  var result=[];
  for(var i=0;i < arr.length;i++){ 
      var param=arr[i].split("=");
      if(paramKey == param[0]){
        if(paramKey=="webver"){
          return  parseInt(param[1]);
        }
        return  param[1];
      }
  }
   return "false";
}
function removeParamByUrl(paramKey){
  var url=window.location.search.substring(1);
  var arr=url.split("&");
  var result=[];
  var str='?';
  for(var i=0;i < arr.length;i++){ 
      var param=arr[i].split("=");
      if(paramKey != param[0]){
        str+='&'+param[0]+'='+param[1];
        //return  param[1];
      }
  }
  return str;
}
function getCookie(c_name){
    if (document.cookie.length>0){
        c_start=document.cookie.indexOf(c_name + "=");
        if (c_start!=-1){ 
            c_start=c_start + c_name.length+1 ;
            c_end=document.cookie.indexOf(";",c_start)
            if (c_end==-1)
            c_end=document.cookie.length;
            return unescape(document.cookie.substring(c_start,c_end));
        } 
    }
    return "";
}
function setCookie(c_name,value,expiredays){
    var exdate=new Date();
    exdate.setDate(exdate.getDate()+expiredays);
    document.cookie=c_name+ "=" +escape(value)+((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
}
//设置带路径的cookie
function setCookiePath(c_name,value,expiredays,path){
    var exdate=new Date();
    exdate.setDate(exdate.getDate()+expiredays);
    document.cookie=c_name+ "=" +escape(value)+((expiredays==null) ? "" : ";expires="+exdate.toGMTString())+'; path='+path;
}
function delCookie(name){
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval=getCookie(name);
  if(cval!=null)
  document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}
function strToJson(str){
//var json = eval('(' + str + ')');
  if(typeof(str)=='string'){
    var json = eval('(' + str + ')');
  }
  else{
    var json = str;
  }
  return json;
}

$(function(){
  $(".error-main-btn1").unbind("click").click(function(){
    $(".errorAlert").css("display","none");
  });
})



function escapeContent(str){
    /*str=str.replace(/<br\s*\/?>/g, "\n");*/
    str=str.replace(/\%25/g, "%");
    str=str.replace(/\%26/g, "&");
    str=str.replace(/\%2B/g, "+");
    str=str.replace(/\%23/g, "#");
    return str;
}
var loadingTime1;
var loadingTime2;
function loading(){
  //loading动画
  var loadingIndex=1;
  loadingTime=setInterval(function(){
    if(loadingIndex==$(".loading-point").length){
      loadingIndex=0;
    }
    $(".loading-point").removeClass("loading-point-active");
    $(".loading-point").eq(loadingIndex).addClass("loading-point-active");
    loadingIndex++; 
  },300);
}
function loading2(){
  //loading动画
  var loadingIndex2=1;
  loadingTime2=setInterval(function(){
    if(loadingIndex2==$(".loading-point2").length){
      loadingIndex2=0;
    }
    $(".loading-point2").removeClass("loading-point-active2");
    $(".loading-point2").eq(loadingIndex2).addClass("loading-point-active2");
    loadingIndex2++; 
  },300);
}
function stopLoading(){

  $(".loading-load").css("display","none");
  clearInterval(loadingTime);
}
function stopLoading2(){
  $(".loading-load2").css("display","none");
  clearInterval(loadingTime2);
}