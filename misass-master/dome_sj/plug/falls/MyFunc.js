

/*
 *  获取scrollTop和left
 *  用法: scroll().top;  scroll().left;
 */
function scroll() {
    if(window.pageXOffset != null){ // IE9+ 和 最新浏览器
        return {
            top: window.pageYOffset,
            left: window.pageXOffset
        }
    }else if(document.compatMode == 'CSS1Compat') { // w3c标准
        return {
            top: document.documentElement.scrollTop,
            left: document.documentElement.scrollLeft
        }
    }
    return {
        top: document.body.scrollTop,
        left: document.body.scrollLeft
    }
}

function $(id) {
    return document.getElementById(id);
}

