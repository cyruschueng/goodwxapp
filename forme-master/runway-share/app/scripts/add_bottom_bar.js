function $$ (selector) {
  return document.querySelector(selector);
}

function isInCodoon () {
  var sUserAgent = window.navigator.userAgent;
  var isInCodoon = /CodoonSport/.test(sUserAgent);
  return isInCodoon;
}


window.onload = function () {

  var _thieUrl = window.location.href

  function init () {
    var dom ='<img class="logo-bar-7" src="//activity-codoon.b0.upaiyun.com/undefined/upload/ic_codoon_logo@2x.png"><div class="download-app-bar-7"><a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.codoon.gps&g_f=992971" style="color: white;text-decoration-line: none">一起运动</a></div>'

    /*display: flex;
     justify-content: space-around;
     align-items: center;
     height: 50px;*/

     $$('.bottom-bar-7').innerHTML = dom

     var html = document.documentElement;
     var windowWidth = html.clientWidth;
     $$('.bottom-bar-7').style.fontSize = windowWidth / 18.75 + 'px';


     var bottomBar7 = '.bottom-bar-7 {position: fixed; bottom: 0px; width: 100%; height:3.25em; border-top:1px solid #e2e2e4; height:3.25em;background-color: #fff;box-sizing: border-box;margin: 0;z-index: 999; -webkit-transition: bottom .9s; transition: bottom .9s}'
     var logoBar7 = '.logo-bar-7 {width: 60%; box-sizing: border-box;padding: 0; position:relative; left: .5em; top: 50%; -webkit-transform: translate(0%,-50%); transform: translate(0%,-50%)}';
     var logoPBar7 = '.footer-p-bar-7 {display: inline-block;vertical-align: top;padding: .1em 0;box-sizing: border-box;margin: 0;}';
     var appNameBar7 = '.app-name-bar-7 {font-size: .9em;color: #292936;font-weight: bold;letter-spacing: 0.2px;box-sizing: border-box;padding: 0;margin: 0;line-height: .9em;}';
     var usersCountBar7 = '.users-count-bar-7 {padding: .25em 0 0 0 ;font-family: PingFangSC;font-size: .6em;font-weight: normal;font-style: normal;font-stretch: normal;letter-spacing: 0.1px;color: #7c7c83;box-sizing: border-box;margin: 0;line-height: .6em;}';
     var downloadAppBar7 = '.download-app-bar-7 {float:right; display:block; position:relative; right: .5em; top: 50%; width: 5.6em; height: 2em;border-radius: 2.5em;font-weight: normal;background-image: linear-gradient(to right, #41cb62, #2fc06c);background-image: -webkit-linear-gradient(to right, #41cb62, #2fc06c);font-size: .8em;letter-spacing: 0.4px;color: #ffffff;box-sizing: border-box;padding: 0;border: 0; line-height: 2em; text-align: center; -webkit-transform: translate(0%,-50%); transform: translate(0%,-50%)}';

     if ($$('body').clientWidth > 800 || isInCodoon()) {
       $$('.bottom-bar-7').style.display = 'none'
     }

     // 整屏时修改定位
    //  if(window.screen.height >= document.body.clientHeight) {
    //    $$('.bottom-bar-7').style.position = 'relative'
    //  }


     // 所需要的样式
     var style = bottomBar7 + logoBar7 + logoPBar7 + appNameBar7 + usersCountBar7 + downloadAppBar7

     // 创建style
     var nod =  document.createElement('style')
     nod.type = 'text/css'
     nod.innerHTML = style

     $$('head').appendChild(nod)

     function scroll( fn ) {
       var beforeScrollTop = document.body.scrollTop,
       fn = fn || function() {};
       window.addEventListener('scroll', function() {
           var afterScrollTop = document.body.scrollTop,
               delta = afterScrollTop - beforeScrollTop;
           if( delta === 0 ) return false;
           fn( delta > 0 ? 'down' : 'up' );
           beforeScrollTop = afterScrollTop;
       }, false);
     }

     scroll(function(direction) {
       if(getDomStyle($$('.bottom-bar-7'),'position') == 'relative') return
       direction == 'down' ?
         $$('.bottom-bar-7').style.bottom = '-3.25em' :
         $$('.bottom-bar-7').style.bottom = '0px'
     })

     setTimeout(function(){
       // $$('.bottom-bar-7').style.transition = 'all .5'
     },200)
  }

  // 根据dom,取回style值
  function getDomStyle (obj, attribute) {
    return obj.currentStyle?obj.currentStyle[attribute]:document.defaultView.getComputedStyle(obj,null)[attribute]
  }

  init()
}

function download () {
  var getId = getUrlTypeAndId().id
  var getFrom = getUrlTypeAndId().from
  var href = 'https://static.codoon.com/html/cpm_download_codoon_app.html?id='+ getId +'&codoon='+ getFrom
  window.location.href = href
}

// 根据不同的条件，获取到参数
function getUrlTypeAndId () {
  var url = window.location.href
  var formatUrl = url.split(window.location.host)[1]

   urlMap = [
     {
       index: 1,
       key: /feed\/share/,
       name:'feed',
       result: function () {
         var a = formatUrl.match(/([^\/]+)/g)[2]
         a = a.split('?')[0]
         return a
       }
     },
     {
       index: 1,
       key: /tieba_v2\/get_tieba_shareout_page/,
       name: 'tieba_v2',
       result: function () {
         return getQueryStringByName('id',url)
       }
     },
     {
       index: 2,
       key: /active_city\/outsite/,
       name: 'active_share',
       result: function () {
         return getQueryStringByName('activity_id',url)
       }
     },
     {
       index: 2,
       key: /share\/tieba_share_out/,
       name: 'tieba_share_out',
       result: function () {
         var a = formatUrl.match(/([^\/]+)/g)[2]
         a = a.split('?')[0]
         return a
       }
     },
     {
       index: 2,
       key: /www.codoon.com\/activity\/v1\/video-live-share/,
       name: 'video-live-share',
       result: function () {
         return getQueryStringByName('room_id',url)
       }
     },
     {
       index: 2,
       key: /activity\/v1/,
       name: 'activity',
       result: function () {
         return url.replace('share','index')
       }
     },
     {
       index: 2,
       key: /h5\/route_detail/,
       name: 'route_share',
       result: function () {
         return $$('.bottom-bar-7').getAttribute('r_id') ? $$('.bottom-bar-7').getAttribute('r_id') : 0
       }
     }

   ]
   var _url = url
   var result
   for(list in urlMap) {
     var keys = urlMap[list].key
     if(keys.test(_url)){
       return {
         from: urlMap[list].name,
         id: urlMap[list].result()
       }
     }
   }
   return {
     from: 0,
     id: 0
   }
 }

var bodyHeightListenerTimer = 0

var bodyHeightListener = setInterval(function () {
 if(bodyHeightListenerTimer >= 5) {
   clearInterval(bodyHeightListener)
 }
 if(window.screen.height == document.body.clientHeight) {
   $$('.bottom-bar-7').style.position = 'relative'
 } else {
   $$('.bottom-bar-7').style.position = 'fixed'
 }
 bodyHeightListenerTimer += 1
}, 500)

 // 获取参数
 function getQueryStringByName(name, url) {
  if(!url) return
  var url = url.split('?')[1]
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  var r = url.match(reg)
  if (r != null) return unescape(r[2]); return null
 }
