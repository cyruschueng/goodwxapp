(function (doc, win) {
    var docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function () {
    var clientWidth = docEl.clientWidth;
    if (!clientWidth) return;
        if ( clientWidth > 415 ) {
            docEl.style.fontSize = 45 + 'px'
        }else{
            docEl.style.fontSize = (clientWidth/7.5) + 'px';    // 设计稿宽度是750px
        }
    };

    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);