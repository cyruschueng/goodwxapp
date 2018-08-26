module("main.xml",function(render){
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

//        var viewportChanged = function() {
//            page.$("status").setText("Pitch:"+panoView.getPitch().toFixed(2)+ "\nHeading:"+panoView.getHeading().toFixed(2));
//        }

        panoView.setVREnable(true);

        //panoView.onHeadingChangeCallback = viewportChanged;
        //panoView.onPitchChangeCallback = viewportChanged;

        panoView.setAdaptor({
            getCount : function() {
                if(panoView.panoData == null) {
                    return 0;
                }
                return panoView.panoData.markers.length;
            },
            getView : function(pos) {
                var markerData = panoView.panoData.markers[pos];
                var marker = View.parse({
                    layout : "horizontal",
                    background : "#88333333",
                    height : "30dp",
                    borderCorner : "15dp",
                    clipToBounds : "true",
                    width : "wrap",
                    children : [
                        {
                            type : "ImageView",
                            width : "wrap",
                            marginTop : "4dp",
                            marginBottom : "4dp",
                            marginLeft : "12dp",
                            src : "/Images/pano.png"

                        },
                        {
                            id : "textView",
                            type : "TextView",
                            fontSize : "18dp",
                            fontColor : "#FFFFFF",
                            contentGravity : "center",
                            width : "wrap",
                            text : encodeURIComponent(markerData.panoName),
                            marginLeft : "6dp",
                            marginRight : "12dp"
                        }
                    ]
                });
                marker.interceptMethod("setVisible",function(){
                    this._origin.apply(this,arguments);
                    this.requestLayout();
                })
                marker.panoHeading = View.parseFloat(markerData.heading);
                marker.panoPitch = View.parseFloat(markerData.pitch);


                marker.setOnClick(function(){
                    loadAlbum(markerData.albumId,markerData.panoId);
                })

                return marker;
            }
        })

        var getAllPanos = function(album) {
            if(album == null) {
                return [];
            }
            var panos = [];
            if(album.panoList != null) {
                panos = panos.concat(album.panoList);
            }
            if(album.albumList != null) {
                for(var i = 0 ; i < album.albumList.length; i++) {
                    var subAlbum = album.albumList[i];
                    panos = panos.concat(getAllPanos(subAlbum));
                }
            }
            return panos;
        }

        var getPanoData = function(album,panoId) {
            if(album == null) {
                return [];
            }

            var panos = getAllPanos(album);
            for(var i = 0 ; i < panos.length; i++) {
                var pano = panos[i];
                if(pano.panoId == panoId || panoId == null) {
                    if(pano.markers == null || pano.markers.length == 0) {
                        pano.markers = [
                            {
                                panoName : "下一个",
                                heading : ""+(i*180),
                                pitch : '-20',
                                albumId : album.albumId,
                                panoId : (i==panos.length-1) ? panos[0].panoId : panos[i+1].panoId
                            }
                        ]
                    }
                    return pano;
                }
            }
            return null;
        }

        var albumCache = {};

        var loadAlbum = function(albumId,panoId) {
            var loadedCallback = function(data) {
                data.data.albumId = albumId;
                panoView.panoData = getPanoData(data.data,panoId);
                if(panoView.panoData == null) {
                    alert("找不到指定的全景:"+panoId);
                    return;
                }
                panoView.setPanoId(panoView.panoData.panoId);
                panoView.notifyDataChanged();
            }

            if(albumCache[albumId]) {
                loadedCallback(albumCache[albumId]);
                return;
            }
            $.ajax({
              type: "get",
              async: false,
              url: "http://shunde.vizen.cn/pano-viewer-web/rest/album/get?albumId=" + albumId+"&lang="
            })

            $.ajax({
                type: "get",
                async: false,
                url: "http://data.pano.visualbusiness.cn/rest/album/view/"+albumId,
                dataType: "json",
                success: function (data) {
                    if(data == null) {
                        alert("网络错误");
                        return;
                    }
                    if(data.result != 0) {
                        alert(data.msg);
                        return;
                    }
                    albumCache[albumId] = data;
                    loadedCallback(data);
                },
                error: function () {
                    alert("网络错误");
                }
            });
        }

        var param = com.appengine.core.RequestUtil.getRequestParam(window.location.href);
        var albumId = "9A1D8F87870F4BE8A1E51C2DFE35A797";
        if(param["albumId"]) {
            albumId = param["albumId"];
        }
        var panoId = param["panoId"];
        loadAlbum(albumId,panoId);
        return page;
    }
})