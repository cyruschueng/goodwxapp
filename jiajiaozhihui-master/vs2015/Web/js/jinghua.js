sessionStorage.setItem("pageindex", 1);
var myScroll, pullDownEl, pullDownOffset, pullUpEl, pullUpOffset, generatedCount = 0;
var startLoad = 0; //0:开始加载数据 1：加载数据完整
/**
* 滚动翻页 （自定义实现此方法）
* myScroll.refresh();		// 数据加载完成后，调用界面更新方法
*/



function pullUpAction() {
    setTimeout(function () {	// <-- Simulate network congestion, remove setTimeout from production!
        var el, li, i;
        el = $("#thelist");
        load(el);
    }, 1000);                  // <-- Simulate network congestion, remove setTimeout from production!
}

/**
* 初始化iScroll控件
*/
function loaded() {
    pullUpEl = document.getElementById('pullUp');
    pullUpOffset = pullUpEl.offsetHeight;

    myScroll = new iScroll('wrapper', {
        scrollbarClass: 'myScrollbar', /* 重要样式 */
        useTransition: false, /* 此属性不知用意，本人从true改为false */
        topOffset: pullDownOffset,
        onRefresh: function () {
            if (pullUpEl.className.match('loading')) {
                pullUpEl.className = '';
                pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
            }
        },
        onScrollMove: function () {
            if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
                pullUpEl.className = 'flip';
                pullUpEl.querySelector('.pullUpLabel').innerHTML = '松手开始更新...';
                this.maxScrollY = this.maxScrollY;
            } else if (this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {
                pullUpEl.className = '';
                pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
                this.maxScrollY = pullUpOffset;
            }
        },
        onScrollEnd: function () {
            if (pullUpEl.className.match('flip')) {
                pullUpEl.className = 'loading';
                pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载中...';
                pullUpAction(); // Execute custom function (ajax call?)
            }
        }
    });
    setTimeout(function () { document.getElementById('wrapper').style.left = '0'; }, 800);
    load($("#thelist"));
}

//初始化绑定iScroll控件 
document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
document.addEventListener('DOMContentLoaded', loaded, false);


function load(wrap) {
    var jinhua = new jinhuaData(sessionStorage.getItem("pageindex"), 5);
    var data = jinhua.init();
    jinhua.loadMsgs(data, wrap); //加载数据

    if (startLoad == 0) {
        myScroll.refresh(); 	// 数据加载完成后，调用界面更新方法 Remember to refresh when contents are loaded (ie: on ajax completion)
    }
}

function jinhuaData(pageindex, pagesize) {
    this.init = function () {
        var result = "";
        $.ajax({
            url: "/Service/showJinHuaData.ashx",
            type: "POST",
            async: false,
            dataType: "json",
            data: { "pageindex": pageindex, "pagesize": pagesize },
            beforeSend: function () {
                startLoad = 1;
            },
            complete: function () {
                startLoad = 0;
            },
            success: function (msg) {
                if (!jQuery.isEmptyObject(msg.ds)) {
                    result = msg.ds;
                    var pageindex = parseInt(sessionStorage.getItem("pageindex")) + 1;
                    sessionStorage.setItem("pageindex", pageindex);
                }
            }
        });
        return result;
    }
}


jinhuaData.prototype.loadMsgs = function (msg,wrap) {
    var html = "";
    html += "<div class='appmsg'>";
    html += "<div class='appmsg_content'>";
    $.each(msg, function (index, context) {
        
        if (context.IsHead == 1) {
            html += headMsgs(context);
        } else {
            html += generalMsgs(context);
        }
    });
    html += "</div>";
    html += "</div>";
    wrap.append(html);
    startLoad = 0;
}
//加载头条
var headMsgs = function (msg) {
    var html = "";
    html += "<div class='appmsg_info'>";
    html += "<em class='appmsg_date'>" + msg.RefValue + "</em>";
    html += "</div>"
    html += "<div class='cover_appmsg_item'>";
    html += "<h4 class='appmsg_title'>";
    html += "<a href='" + msg.ArticleUrl + "' target='_blank'>" + msg.Title + "</a>";
    html += "</h4>";
    html += "<div class='appmsg_thumb_wrp'><img src='" + msg.ImgUrl + "'  class='appmsg_thumb'></div>";
    html += "</div>";
    return html;
}
//加载其它的数据
var generalMsgs = function (msg) {
    var html = "";
    html += "<div class='appmsg_item'>";
    html += "<img src=" + msg.ImgUrl + " class='appmsg_thumb' />";
    html += "<h4 class='appmsg_title'>";
    html += "<a href=" + msg.ArticleUrl + " target='_blank'>" + msg.Title + "</a>";
    html += "</h4>";
    html += "</div>";
    return html;
}