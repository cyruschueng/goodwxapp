// JavaScript Document

// 控制字体自适应
(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            docEl.style.fontSize = 10 * (clientWidth / 320) + 'px';
        };

    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
    recalc();
})(document, window);

/* 当页面加载完后*/
document.onreadystatechange = loading;
function loading(){
  if(document.readyState == "complete") { 
    
      var iheight = window.screen.height;
      //alert(iheight)
      
          //ip4样式
          if(iheight == 480){
            //alert('ok') 

              
          //ip5样式 
          }else if(iheight == 568){


            //ip6样式 
          }else if(iheight == 667||iheight==736){

          };
          
          //华为等屏幕底部有控制栏目的手机
          var wid=document.body.clientWidth;
            var hei=document.body.clientHeight;
            if(hei/wid<1.575){
            
          }
  }
};

// Game_isMove=1; //可以滑动
// Game_isMove=0; //不可以滑动
Game_isMove=1;
document.addEventListener("touchmove",function(e){
  if(Game_isMove==0){
    e.preventDefault();
    e.stopPropagation();
  }
},false);














