

var shareInfoRandoms=[
  {"title":"微景天下 | 旅游行业移动互联网解决方案供应商","desc":"微景天下在全景摄影、实景三维建模、地图绘制、导航、以及大数据应用等方面国内领先。"},
];

var shareInfoRandom = shareInfoRandoms[Math.floor(Math.random()*shareInfoRandoms.length)];


function sentMtaMessage(msg){
    if(typeof(MtaH5) != "undefined"){
      // alert(msg);
      MtaH5.clickStat(msg);
    }
}

var shareData = {
    title: shareInfoRandom["title"],
    desc: shareInfoRandom["desc"],
    link: 'http://www.visualbusiness.com',     //正式
    imgUrl: 'http://www.visualbusiness.com/images/share.jpg',  //正式
    success: function () { 
        // 用户确认分享后执行的回调函数
        sentMtaMessage("shareAppMessageSuccess");
    },
    cancel: function () { 
        // 用户取消分享后执行的回调函数
        sentMtaMessage("shareAppMessageCancel");
    }
  };
var timeLineShareData={
    title: shareInfoRandom["title"],
    desc: shareInfoRandom["desc"],
    link: 'http://www.visualbusiness.com',     //正式
    imgUrl: 'http://www.visualbusiness.com/images/share.jpg',  //正式
    success: function () { 
        // 用户确认分享后执行的回调函数
        sentMtaMessage("shareTimelineSuccess");
    },
    cancel: function () { 
        // 用户取消分享后执行的回调函数
        sentMtaMessage("shareTimelineCancel");
    }
};
  var nonceStr;
  var timeStamp;
  var signature;
  var openWeiXinlatitude = 39.970316;
  var openWeiXinlongitude = 116.362215;
  var openWeiXinMapName = "";
  var openWeiXinMapAddress = "";
  function initConfig() {
     wx.config({
        debug: false,
        appId: 'wxa0c7da25637df906',
        timestamp: timeStamp,
        nonceStr: nonceStr,
        signature: signature,
        jsApiList: [
          'checkJsApi',
          'onMenuShareTimeline',
          'onMenuShareAppMessage',
          'onMenuShareQQ',
          'onMenuShareWeibo',
          'onMenuShareQZone',
          'chooseImage',
          'previewImage',
          'uploadImage',
          'downloadImage',
          'getNetworkType',
          'openLocation',
          'getLocation'
        ]
    });
    wx.ready(function(){
            wx.onMenuShareAppMessage(shareData);
           wx.onMenuShareTimeline(timeLineShareData);
           wx.checkJsApi({
              jsApiList: [
                'getLocation',
                'openLocation',
                ],
                success: function (res) {
                //alert(JSON.stringify(res));
                }
            });

            $(".main-wrap").on("click",".open_map",function(){
               // alert($(this).attr("lat"));
               if($(this).attr("lat") && $(this).attr("lat")!="")
               {
                  openWeiXinlatitude = $(this).attr("lat");
                  openWeiXinlongitude = $(this).attr("lng");
                  openWeiXinMapName = $(this).attr("title");
                  openWeiXinMapAddress = $(this).attr("address");
                  // alert($(this).attr("lat")+","+$(this).attr("title"));
               }
                wx.openLocation({
                  latitude: Number(openWeiXinlatitude),
                  longitude: Number(openWeiXinlongitude),
                  name: openWeiXinMapName,
                  address: openWeiXinMapAddress,
                  scale: 14,
                  infoUrl: 'http://wap.visualbusiness.cn/'
                });
            });
            
            
        });
    wx.error(function(obj){
    var props = "" ; 
      // 开始遍历 
      for ( var p in obj ){ // 方法 
      if ( typeof ( obj [ p ]) == " function " ){ obj [ p ]() ; 
      } else { // p 为属性名称，obj[p]为对应属性的值 
      props += p + " = " + obj [ p ] + " /t " ; 
      } } // 最后显示所有的属性 
      //alert ( props ) ;
    });
    
  }

 function getShareInfo(url , shareInfo) {
   var newUrl = url.replace(new RegExp("&","g"),"%26");
   // alert(shareData.link);
   var mUrl = 'http://sfs.visualbusiness.cn/SimpleServer/signature_q?appId=wxa0c7da25637df906&url='+newUrl;
    $.get(mUrl, function (response) {
          if (response) {
              var dataJson = eval("("+response+")");
              nonceStr = dataJson.noncestr;
              timeStamp = dataJson.timestamp;
              signature = dataJson.signature;
              //alert(signature);
              if(typeof(shareInfo) != "undefined"){
                if(typeof(shareInfo.title) != "undefined"){
                  shareData.title=shareInfo.title;
                  timeLineShareData.title=shareInfo.desc.replace('<br/>','，');
                }
                if(typeof(shareInfo.desc) != "undefined"){
                  shareData.desc=shareInfo.desc.replace('<br/>','，');
                  timeLineShareData.desc=shareInfo.desc.replace('<br/>','，');
                }
                if(typeof(shareInfo.link) != "undefined"){
                  shareData.link=shareInfo.link;
                  timeLineShareData.link=shareInfo.link;
                }
                if(typeof(shareInfo.imgUrl) != "undefined"){
                  shareData.imgUrl=shareInfo.imgUrl;
                  timeLineShareData.imgUrl=shareInfo.imgUrl;
                }
              }
              initConfig();
          }
      });
    
  }



 
