;module("main.xml",function(render){
    var View = com.appengine.view.View;
    var Platform = com.appengine.core.Platform;

    /**
     * 目前只有appengine_web版本支持全景引擎
     * iOS和android暂时不支持
     */
    if(Platform.appengineMobile) {
        alert("该平台暂不支持全景引擎!!");
        return new View();
    }

    return function() {
        var page = render();
        var panoView = page.$("panoView");
        var getQueryString = function(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) 
                return unescape(r[2]); 
            return null;
        }
        page.onPageWillShown = function(){
            var panoId = getQueryString("panoId");
            if(!panoId){
                alert('缺少panoId');
                return;
            }
            rootView._interceptedPanotileUrl = window.location.protocol + '//tiles.pano.vizen.cn/';
            if(panoId.substring(0,4) == "[TT]") {
                rootView._interceptedPanotileUrl = window.location.protocol + '//tilestest.pano.visualbusiness.cn/';
                panoId = panoId.substring(4);
            }
            panoView.setPanoId(panoId, function(){
                setTimeout(function(){
                    window.hideLoading();
                    if(getQueryString("autoplay") === 'true'){
                        panoView.setAutoplayEnable && panoView.setAutoplayEnable(true);
                    };
                }, 2000)
            });
        }
        return page;
    }
})