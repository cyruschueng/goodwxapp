var imgUrl = "http://weixin.shenertingduji.com/images/card.jpg";  //注意必须是绝对路径

       //var lineLink = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa0f624ad8cdb46c4&redirect_uri=http://192.168.100.179/courseslist.aspx?openid=oqmjZjh55_7kJKBAZOjwhPUiGEjc&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";   //同样，必须是绝对路径

//       var openid=document.getElementById("hfOpenid").value;
//       var id=document.getElementById("hfGoodsid").value;
       var openid="uym";
       var id="344";
       var lineLink = "http://192.168.100.179/publicgoods.aspx?openid="+openid+"&id="+id;   //同样，必须是绝对路径
       
       var descContent = '【家教智慧】公益品代购'; //分享给朋友或朋友圈时的文字简介
       var shareTitle = '【家教智慧】公益品';  //分享title
       var appid = ''; //apiID，可留空
       
       function shareFriend() {
           WeixinJSBridge.invoke('sendAppMessage',{
               "appid": appid,
               "img_url": imgUrl,
               "img_width": "200",
               "img_height": "200",
               "link": lineLink,
               "desc": descContent,
               "title": shareTitle
           }, function(res) {
               //_report('send_msg', res.err_msg);
               validateShare(res);
           })
       }
       function shareTimeline() {
           WeixinJSBridge.invoke('shareTimeline',{
               "img_url": imgUrl,
               "img_width": "200",
               "img_height": "200",
               "link": lineLink,
               "desc": descContent,
               "title": shareTitle
           }, function(res) {
                  //_report('timeline', res.err_msg);
                  validateShare(res);
           });
       }
       function shareWeibo() {
           WeixinJSBridge.invoke('shareWeibo',{
               "content": descContent,
               "url": lineLink,
           }, function(res) {
               //_report('weibo', res.err_msg);
               validateShare(res);
           });
       }
       // 当微信内置浏览器完成内部初始化后会触发WeixinJSBridgeReady事件。
       document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
           // 发送给好友
           WeixinJSBridge.on('menu:share:appmessage', function(argv){
               shareFriend();
           });
           // 分享到朋友圈
           WeixinJSBridge.on('menu:share:timeline', function(argv){
               shareTimeline();
           });
           // 分享到微博
           WeixinJSBridge.on('menu:share:weibo', function(argv){
               shareWeibo();
           });
       }, false);
       function validateShare(res){
            if(res.err_msg=="send_app_msg:ok") {
                share();
            }
       }