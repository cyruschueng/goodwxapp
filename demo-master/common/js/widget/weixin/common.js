 var site_url ="http://dev-lumen.jcweixiaoyuan.cn";
// var site_url = "http://nut.com";
//var site_url = "http://gitjc.com";

// var goto_url = "http://teacher.com";
var goto_url = "http://dev-web.jcweixiaoyuan.cn/teacher";


// var goto_url = "http://localhost:3000/teacher";
// var goto_url = "http://weixiaoyuan30.com/teacher";


 // var site_url = "http://www.nut.com";
var cookie_prefix = "jc_teacher_";
var url_path = window.location.pathname;


//验证登录
if(url_path != "/view/html/register/tel.html")
{

    var self = this;
    if(isEmpty(getCookie('token'))||isEmpty(getCookie('user_id')))
    {
        var url = getLoginUrl();
        location.href = url;

    }
    else
    {
        var login_data = {};
        login_data.user_id = getCookie('user_id');
        login_data.token = getCookie("token");
        login_data.come_from = 2;

        $.ajax({
        url: site_url + '/wxverfiyuser',
        data: login_data,
        type: "GET",
        dataType: "JSON",
        async: false,
        success: function(obj) {
                // console.log(obj);
                if(obj.code == 30015 )
                {
                    typeof obj.msg == "object" && mui.toast(JSON.stringify(obj.msg));
                    typeof obj.msg !== "string" && mui.toast(obj.msg);
                }
                else if(obj.code == 30001 || obj.code == 30003)
                {
                    var url = self.getLoginUrl();
                    location.href = url;
                }
                else {
                    typeof obj.msg == "object" && mui.toast(JSON.stringify(obj.msg));
                    typeof obj.msg !== "string" && mui.toast(obj.msg);
                }
            }
        });
    }

}


/** 获取url参数
 * @param name  参数名 
 * by wuyi
 **/
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)
        return decodeURIComponent(r[2]);
    return null;


   /* var result = location.search.match(new RegExp("[\?\&]" + name+ "=([^\&]+)","i"));

         if(result == null || result.length < 1){

              return "";

         }

         return result[1];*/
}


/**
 * 判断是否为空
 * @param keyVal  参数
 * by wuyi
 **/
function isEmpty(keyVal) {
    if (keyVal == undefined || keyVal =="undefined" || keyVal == "" || keyVal == null || keyVal == 0)
        return true;

    return false;
}

function setCookie(key,  value, t) {

    var cookie_key = cookie_prefix + key;
    var oDate = new Date();
    oDate.setDate(oDate.getDate() + t);
    document.cookie = cookie_key + '=' + value + ';expires=' + oDate.toGMTString()+';path=/';
}

function getCookie(key) {

    var cookie_key = cookie_prefix + key;
    var arr1 = document.cookie.split('; ');
    for (var i = 0; i < arr1.length; i++) {
        var arr2 = arr1[i].split('=');
        if (arr2[0] == cookie_key) {
            return decodeURI(arr2[1]);
        }
    }
}

function removeCookie(key) {
    var cookie_key = cookie_prefix + key;
    document.cookie = cookie_key + '= ;expires=-1; path=/';
}

function getLoginUrl()
{
    return site_url + "/wechat/wxteacherlogin?target_url="+window.location.href;
}

function getNowFormatDate(format,mydate){
    format = format ? format : "Y-m-d H:i:s"; 
    var date = new Date(); 
    if(mydate){
        mydate = dateTimeFormat(mydate);
        date = new Date(mydate); 
    }
    
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    if (month >= 1 && month <= 9) 
        month = "0" + month;

    if (strDate >= 0 && strDate <= 9) 
        strDate = "0" + strDate;

    if (hours >= 0 && hours <= 9) 
        hours = "0" + hours;

    if (minutes >= 0 && minutes <= 9) 
        minutes = "0" + minutes;

    if(seconds >= 0 && seconds <= 9)
        seconds = "0" + seconds;

    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + hours + seperator2 + minutes
            + seperator2 + seconds;

    if(format == 'Y-m-d'){
        currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
    }else if(format == 'Y-m'){
        currentdate = date.getFullYear() + seperator1 + month;
    }else if(format == 'H:i'){
        currentdate = hours + seperator2 + minutes;
    }
    return currentdate;
}

function getMonthDays(year, month){
  var d = new Date(year, month - 1 + 1, 1);
  var prev_d = new Date(d - 1000);
  return prev_d.getDate();
}
function isPhone(){//判断是否是苹果系统
	return /(iPhone|iPod|iPad);?/i.test(navigator.userAgent);
}
function isAndriod(){//判断是否是安卓系统
	return /android/i.test(navigator.userAgent);
}
function dateTimeFormat(time){
	 return time.replace(/-/g, "/");
}
//im配置选项
 var env = 'prod'

 let appConfig = {
     // 配置1家长端或者2老师端
   mobileEndPoint: 2,
   // 用户的appkey
   // 用于在web demo中注册账号异步请求demo 服务器中使用
   dev: { //开发环境
     appkey: '0c6d73b9563c4c6cfbed666bdde7890f',
   },
   test: { //测试环境
     appkey: '396f4a5e9cd1bec0df9eefe67f55802b',
   },
   preprod: { //准生产
     appkey: '370ee5679c389d891b2052b66ffe4f03',
   },
   prod: { //生成
     appkey: 'b8bfd72ceefa106406faa1820b1357d5',
   }
 }