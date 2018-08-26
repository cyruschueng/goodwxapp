/**
 * @filename openInstall.js
 * @filedesc openInstall.js
 * @authors lq
 * @email 610970478@qq.com
 * @date 2017-11-21 10:57:40
 * @version v1.0
*/
define(['//res.cdn.openinstall.io/openinstall.js'], function (openinstall) {
	//openinstall初始化，初始化时将与openinstall服务器交互，应尽可能早的调用
    /*web页面向app传递的json数据(json string/js Object)，应用被拉起或是首次安装时，通过相应的android/ios api可以获取此数据*/
    var data = OpenInstall.parseUrlParams();//openinstall.js中提供的工具函数，解析url中的所有查询参数
    new OpenInstall({
        /*appKey必选参数，openinstall平台为每个应用分配的ID*/
        appKey : "dqohdc",
        /*可选参数，自定义android平台的apk下载文件名，只有apk在openinstall托管时才有效；个别andriod浏览器下载时，中文文件名显示乱码，请慎用中文文件名！*/
        //apkFileName : "OpenInstallDemo-v2-2.0.0.apk",
        /*可选参数，是否优先考虑拉起app，以牺牲下载体验为代价*/
        //preferWakeup:true,
        /*openinstall初始化完成的回调函数，可选*/
        onready : function() {
            /*var m = this,button = document.getElementById("downloadButton");
            button.style.visibility="visible";*/
            //用法1：如app已安装，进入网页立即拉起app；用户点击某个按钮时再开始安装app
            /*通过scheme拉起app(如果已在openinstall平台开启scheme启动功能)*/
            //m.schemeWakeup();
            /*用户点击某个按钮时(假定按钮id为downloadButton)，安装app*/
            /*button.onclick = function() {
                m.wakeupOrInstall();
            }*/
            //用法2：用户点击某个按钮拉起app，等待设定时间后app尚未拉起，再安装app
            /*用户点击某个按钮时，安装app*/
            //button.onclick=function(){
            //   //500毫秒后app尚未拉起，将安装app，可自定义超时时间，单位为毫秒
            //   m.wakeupOrInstall({timeout:500});
            //}
        }
    }, data);
});