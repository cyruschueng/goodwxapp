/**
 * Created by GUQIANG on 2017/11/21.
 */
module("page.xml","config.js",function (render,renderConfig) {
    return function () {
        var page = render();
        // var config = renderConfig();introStr
        var $ = com.appengine.$;
        var PanGestureDetector = com.appengine.gesture.PanGestureDetector;
        var PinchGestureDetector = com.appengine.gesture.PinchGestureDetector
        var SweepGestureDetector = com.appengine.gesture.SweepGestureDetector;
        var Animation = com.appengine.animation.Animation;
        var View = com.appengine.view.View;
        var v_welcomePano = page.$("welcomePano");
        var v_welcomeElement = page.$("welcomeElement");
        var v_welcomeGif = page.$("welcomeGif");
        var v_panoPage = page.$("panoPage");
        var v_map = page.$("map");
        var v_mapPage = page.$("mapPage");
        var v_mapBg = page.$("mapBg");
        var v_btn_get_photo = page.$("btn_get_photo");
        var v_mapPanoName = page.$("mapPanoName");
        var v_panoNameView = page.$("panoNameView");
        var v_closeMap = page.$("closeMap");
        var v_mapMarkerLayer = page.$("mapMarkerLayer");
        var v_video = page.$('video');
        var v_music = page.$("music");
        var v_musicOn = page.$("musicOn");
        var v_musicOff = page.$("musicOff");
        var v_gravity = page.$("gravity");
        var v_grOn = page.$("grOn");
        var v_grOff = page.$("grOff");
        var v_vrOn  = page.$("vrOn");
        var v_vrOff = page.$("vrOff");
        var v_disTouch = page.$("disTouch");
        var v_areaMarker = page.$("areaMarker");
        var v_areaText = page.$("areaText");
        var v_intro = page.$("intro");
        var v_close = page.$("close");
        var v_introPage = page.$("introPage");
        var v_activityIcon = page.$("activityIcon");
        var v_panoControl = page.$("panoControl");
        var v_panScrollBottom = page.$("panScrollBottom")
        var v_mapPanoNameEN = page.$("mapPanoNameEN");
        var v_areaText_en = page.$("areaText_en");
        var v_panoName = page.$("panoName");
        var v_panoInfoCtrl = page.$("panoInfoCtrl");
        var v_panoInfoCtrl2 = page.$("panoInfoCtrl2")
        var v_panoIntroPage = page.$("panoIntroPage");
        var v_panoName2 = page.$("panoName2");
        var v_panoDetail2 = page.$("panoDetail2");
        var v_album_image_scroll = page.$("album_image_scroll");
        var v_photoPage = page.$("photoPage");
        var v_mobanScroll = page.$("mobanScroll");
        var v_photoUpLoad = page.$("photoUpLoad");
        var v_photoTip = page.$("photoTip");
        var v_loading = page.$("loading");
        var v_loading2 = page.$("loading2");
        var v_boy = page.$("boy");
        var v_backPano = page.$("backPano");
        var v_girl = page.$("girl");
        var v_boyChoose = page.$("boyChoose");
        var v_girlChoose = page.$("girlChoose");
        var v_getPhoto = page.$("getPhoto");
        var v_photoShow = page.$("photoShow");
        var v_operationShow = page.$("operationShow");
        var v_reUpload = page.$("reUpload");
        var v_showMyPhoto = page.$("showMyPhoto");
        var v_photoResult = page.$("photoResult");
        var v_btn_getphoto_zh = page.$("btn_getphoto_zh");
        var v_btn_getphoto_eh = page.$("btn_getphoto_en");
        var v_btn_show_zh = page.$("btn_show_zh");
        var v_btn_show_en = page.$("btn_show_en");
        var v_btn_reupload_zh = page.$("btn_reupload_zh");
        var v_btn_reupload_en = page.$("btn_reupload_en");
        var v_panoNamEN = page.$("panoNamEN");
        var v_panoNamEN1 = page.$("panoNamEN1");
        var v_htmlTextView = page.$("htmlTextView");
        var v_bottom = page.$("bottom");
        var v_guideShare = page.$("guideShare");
        var v_alertView = page.$("alertView");
        var v_message = page.$("message");
        var v_overFlow = page.$("overFlow");

        var isGravity = false;
        var sex = 1;
        var model = 6100;
        //相册数据
        var albumData = {};
        albumData.panoLists = {};
        albumData.albumHandled = {};
        page._MAPSHAPETYPE = 1;//1表示宽度占满，高度超出 、、2表示高度占满，宽度超出
        page.initCenterTrans = [];//0 0
        page.MAXSCALE = 3;
        page.MINSCALE = 1;
        page.scaleExCallback = null;
        
        var photoUrl = "//pyeongchang2018.visualbusiness.cn/ms-cemp/pingChangController/faceMerge";
        var photoByModelUrl = "//pyeongchang2018.visualbusiness.cn/ms-cemp/pingChangController/faceMergeByModel";

        // var photoUrl = "http://115.159.5.90/ms-cemp/pingChangController/faceMerge";
        // var photoByModelUrl = "http://115.159.5.90/ms-cemp/pingChangController/faceMergeByModel";



        var albumUrl = "//data.pano.visualbusiness.cn/rest/album/view/2AC14975D4E24078AFAC6EDDBFB53548?lang="
        var getData = function () {
            httpGet({
                url: albumUrl,
                callback: function (e) {
                    albumDataHandle(e.data,e.data.albumList[0].albumName);
                }
            }); //通过businessID拿到业务数据
        };
        getData();

        var initApp = function(){
            v_htmlTextView.setHtml(renderConfig.introStr);
            v_welcomeGif._nativeView.div.style.background = 'url('+ randomGif +') no-repeat center/cover'
            window.hidePageLoading();
            initMusic();
            setTimeout(function () {
                v_welcomeGif.parentView.removeView(v_welcomeGif);
                v_welcomePano.setVisible(true);
                v_panoPage.setVisible(false);
                v_welcomeElement.setVisible(true);
                v_welcomePano.leftEye.setVisible(false);
                setTimeout(function () {
                    window.startAlphaAnimation(v_welcomeElement ,1,0,3000,function () {
                        v_welcomeElement.setVisible(false);
                        v_panoPage.setVisible(true);
                        v_welcomePano.leftEye.setVisible(true);
                        v_welcomePano.panoViewInternal.setGravityEnable(true);
                    })
                },2000)
            },8000);
        }
        var randomGif = './app.bundle/data/gif-delay-0.gif?'+new Date().getTime()
        util.preload(randomGif, "./app.bundle/images/bg.jpg", function(){
            initApp()
        });


        //初始化音乐播放
        var audioDom = document.getElementById("audioDom");
        var setAudioPlay = function(tar){
            // return
            if(typeof(tar) == "undefined"){
                if(audioDom.paused){
                    tar = "on";
                }else{
                    tar = "off";
                }
            }
            if(tar == "on"){
                audioDom.play();
                v_musicOn.setVisible(true);
                v_musicOff.setVisible(false);
            }
            if(tar == "off"){
                audioDom.pause();
                v_musicOn.setVisible(false);
                v_musicOff.setVisible(true);
            }
        }
        var initMusic = function () {
            var isAutoPlay = true;
            audioDom.volume = 0.3;
            if(isAutoPlay){
                setWXInitCallback(function(){
                    if(audioDom.paused){
                        setAudioPlay("on");
                    }
                });
                setAudioPlay("on");
            }
            shareConfig();
            util.setOnClick(v_music,function () {
                setAudioPlay();
            });
        }
        var evenBind = function () {
            v_gravity.setOnClick(function () {
                if (isGravity) {
                    v_welcomePano.panoViewInternal.setGravityEnable(true);
                    v_grOn.setVisible(false);
                    v_grOff.setVisible(true);
                } else {
                    v_welcomePano.panoViewInternal.setGravityEnable(false);
                    v_grOn.setVisible(true);
                    v_grOff.setVisible(false);
                };
                isGravity = !isGravity;
            });//重力点击
            v_vrOn.setOnClick(function () {
                v_panoPage.setVisible(false);
                v_disTouch.setVisible(true);
                v_welcomePano.setVREnable(true);
                v_welcomePano.panoViewInternal.setAutoplayEnable(true);
            });//vrOn按钮
            v_vrOff.setOnClick(function () {
                v_panoPage.setVisible(true);
                v_disTouch.setVisible(false);
                v_welcomePano.setVREnable(false);
                v_welcomePano.panoViewInternal.setAutoplayEnable(false);
            });//vrOn按钮
            v_activityIcon.setOnClick(function () {
                if(typeof(MtaH5) != "undefined"){
                    MtaH5.clickStat("activityIcon");
                };
                v_photoPage.setVisible(true);
                v_photoShow.setVisible(false);
                v_photoUpLoad.setVisible(true);
                v_welcomePano.leftEye.setVisible(false);
                v_panoPage.setVisible(false);
                v_welcomePano.panoViewInternal.setGravityEnable(false);
            });
            v_boy.setOnClick(function () {
                v_boyChoose.setVisible(true);
                v_girlChoose.setVisible(false);
                sex = 1;
                model = 6003;
            });
            v_girl.setOnClick(function () {
                v_boyChoose.setVisible(false);
                v_girlChoose.setVisible(true);
                sex = 2;
                model = 5802;
            });
            v_reUpload.setOnClick(function () {
                if(typeof(MtaH5) != "undefined"){
                    MtaH5.clickStat("reUpload");
                }
                v_photoShow.setVisible(false);
                v_photoUpLoad.setVisible(true);
                v_reUpload.setBackground("#0C6CBC");
                v_btn_reupload_zh.setFontColor("#ffffff");
                v_btn_reupload_en.setFontColor("#ffffff");
                v_btn_show_zh.setFontColor("#0C6CBC");
                v_btn_show_en.setFontColor("#0C6CBC");
                v_showMyPhoto.setBackground("");
            });
            v_showMyPhoto.setOnClick(function () {
                if(typeof(MtaH5) != "undefined"){
                    MtaH5.clickStat("showMyPhoto");
                };
                v_reUpload.setBackground("");
                v_btn_reupload_zh.setFontColor("#0C6CBC");
                v_btn_reupload_en.setFontColor("#0C6CBC");
                v_btn_show_zh.setFontColor("#ffffff");
                v_btn_show_en.setFontColor("#ffffff");
                v_showMyPhoto.setBackground("#0C6CBC");
                v_guideShare.setVisible(true);
            });
            v_guideShare.setOnClick(function () {
                v_guideShare.setVisible(false);
            })
            v_operationShow.setOnClick(function () {
                console.error("adasd");
            });
            v_areaMarker.setOnClick(function () {
                v_album_image_scroll.clearViews();
                v_album_image_scroll.setTranslateX(0);
                var albumName = v_areaText.getText();
                var album = {};
                var tempAlbumName = ""
                if(albumName.indexOf("江陵")>-1 ){
                    album = albumData.albumHandled["江陵海岸场馆"];
                    tempAlbumName =  "江陵海岸场馆";
                    v_areaText.setText("平昌片区");
                    v_areaText_en.setText("PyeongChang")
                }else{
                    album = albumData.albumHandled["平昌山脉场馆"];
                    tempAlbumName =  "平昌山脉场馆";
                    v_areaText.setText("江陵片区");
                    v_areaText_en.setText("GuangNeung")
                }
                window.startAlphaAnimation(v_areaMarker ,0,1,2000,function () {
                    v_areaMarker.setVisible(true);
                })
                var panos = album.panoList[0];
                setPanoIntro(panos);
                initPanoScrollBottom(tempAlbumName);
                v_album_image_scroll.setGone(false);
                jumpPano(panos);
                v_bottom.setVisible(true);
            });
            v_backPano.setOnClick(function () {
                v_welcomePano.panoViewInternal.setGravityEnable(true);
                v_photoPage.setVisible(false);
                v_panoPage.setVisible(true);
                v_welcomePano.leftEye.setVisible(true);
                v_album_image_scroll.clearViews();
                v_album_image_scroll.setTranslateX(0);
                var albumName = v_areaText.getText();
                var album = {};
                var tempAlbumName = ""
                if(albumName.indexOf("江陵")>-1 ){
                    album = albumData.albumHandled["平昌山脉场馆"];
                    tempAlbumName =  "平昌山脉场馆";
                }else{
                    album = albumData.albumHandled["江陵海岸场馆"];
                    tempAlbumName =  "平昌山脉场馆";
                }
                var panos = album.panoList[0];
                setPanoIntro(panos);
                initPanoScrollBottom(tempAlbumName);
                v_album_image_scroll.setGone(false);
                jumpPano(panos);
            });
            v_intro.setOnClick(function () {
                v_panoPage.setVisible(false);
                v_welcomePano.leftEye.setVisible(false);
                v_introPage.setVisible(true);
                // jQuery(v_welcomePano._nativeView.div).css({"filter":"blur(10px)", "-webkit-filter": "blur(10px)"});
            });
            v_close.setOnClick(function () {
                v_panoPage.setVisible(true);
                v_welcomePano.leftEye.setVisible(true);
                v_introPage.setVisible(false);
                jQuery(v_welcomePano._nativeView.div).css({"filter":"blur(10px)", "-webkit-filter": "blur(0px)"});
            });
            v_introPage.setOnClick(function () {
            });
            v_panoIntroPage.setOnClick(function () {
            });
            v_mapPage.setOnClick(function () {
            });
            v_photoShow.setOnClick(function () {
            });
            v_photoPage.setOnClick(function(){});
            v_map.setOnClick(function () {
                page.setMapTransTo(-page.frame.height*1864/1318/3,0);
                v_mapPage.setVisible(true);
            });
            v_closeMap.setOnClick(function () {
                v_mapPage.setVisible(false);
            });
            v_panoNameView.setOnClick(function () {
                var panoObj = v_panoNameView.info;
                v_album_image_scroll.clearViews();
                v_album_image_scroll.setTranslateX(0);
                var albumName = panoObj.albumName;
                var tempAlbumName = "";
                if(albumName.indexOf("江陵")>-1 ){
                    tempAlbumName =  "江陵海岸场馆";
                    v_areaText.setText("平昌片区");
                    v_areaText_en.setText("PyeongChang")
                }else{
                    tempAlbumName =  "平昌山脉场馆";
                    v_areaText.setText("江陵片区");
                    v_areaText_en.setText("GuangNeung")
                }
                initPanoScrollBottom(tempAlbumName);
                jumpPano(panoObj);
                v_mapPage.setVisible(false);
                v_album_image_scroll.setGone(false);
                for (var i in v_album_image_scroll.subViews) {
                    if(panoObj.panoId == v_album_image_scroll.subViews[i].info.panoId){
                        v_album_image_scroll.subViews[i].$("isActiveView").setVisible(true);
                        v_album_image_scroll.setTranslateX(-130*i);
                    } else {
                        v_album_image_scroll.subViews[i].$("isActiveView").setVisible(false);
                    }
                };
                for(var i in page.getMapMarker()){
                    if(i!=0){
                        var marker = page.getMapMarker()[i];
                        if(marker.info.panoId == panoObj.panoId){
                            page.getMapMarker()[i].$("marker").setSrc("/images/map/map_icon2.png");
                        }
                    }
                }
                setPanoIntro(panoObj)
                v_bottom.setVisible(true);
            });
            v_panoInfoCtrl.setOnClick(function () {
                v_welcomePano.leftEye.setVisible(false);
                v_panoIntroPage.setVisible(true);
                v_panoControl.setVisible(false);
            });
            v_panoInfoCtrl2.setOnClick(function () {
                v_welcomePano.leftEye.setVisible(true);
                v_panoIntroPage.setVisible(false);
                v_panoControl.setVisible(true);
            });
            v_welcomePano.setOnClick(function () {
                if(v_panoControl.visible){
                    v_panoControl.setVisible(false);
                    v_welcomePano.leftEye.setVisible(false);
                } else {
                    v_panoControl.setVisible(true);
                    v_welcomePano.leftEye.setVisible(true);
                }
            });
            v_panScrollBottom.setOnClick(function () {
            });
            v_welcomeElement.setOnClick(function () {
            });
            v_overFlow.setOnClick(function () {
            });
            v_alertView.setOnClick(function () {
                v_alertView.setVisible(false);
            });
            v_photoResult.interceptMethod("dispatchTouch", function(){
                window.__preventDefault__ = false;
                return this._origin.apply(this,arguments);
            });
            // 视频
            v_video.setOnClick(function(){
                // renderConfig.videoInfo.id
                if(com.appengine.core.Platform.android){
                    jQuery("#videoBoxInner").css("marginTop","60px");
                }
                jQuery("#videoBox").fadeIn(300);
                var isPlay = audioDom.paused ? false : true
                isPlay && setAudioPlay('off')
                v_panoControl.setVisible(false);
                v_welcomePano.leftEye.setVisible(false);
                window._player.setCloseCallback(function(){
                    window._player.pause()
                    if(isPlay){
                        setAudioPlay('on')
                    }
                    v_panoControl.setVisible(true);
                    v_welcomePano.leftEye.setVisible(true);
                })
                window._player.play()
            })
        };
        evenBind();
        //marker类型
        var normalMarker = function (markerObj) {
            var img = ""
            var name = ""
            switch (markerObj.mtype) {
                case "pano":
                    if(markerObj.panoNameEng){
                        img=markerObj.panoNameEng;
                    } else {
                        img="/images/pano/pano_marker.png"
                    }
                    name = markerObj.panoName
                    break;
                case "html":
                    img="/images/pano/icon_html.png"
                    break;
                case "label":
                    img="/images/pano/icon_label.png"
                    name = markerObj.label
                    break;
                case "url":
                    img="/images/pano/icon_url.png"
                    name = markerObj.urlName
                    break;
                default :
                    img="/images/pano/icon_pano.png"
                    break;
            };
            return View.parse({
                width: "wrap",
                height: "wrap",
                layout: "vertical",
                contentGravity:"centerHorizontal",
                panoHeading: markerObj.heading,
                panoPitch: markerObj.pitch,
                anchorX:"0.5",
                anchorY:"0.5",
                children: [
                    {
                       type:"View",
                        height:"wrap",
                        contentGravity: "center",
                        width:"wrap",
                        children: [
                            {
                                type: "View",
                                clipToBounds:"true",
                                borderCorner:"10dp",
                                background: "#063359",
                                alpha:"0.2",
                            },
                            {
                                marginRight:"5dp",
                                marginLeft:"5dp",
                                type: "TextView",
                                text: name,
                                width: "125dp",
                                marginTop:"2dp",
                                marginBottom:"3dp",
                                height: "wrap",
                                fontColor: "#ffffff",
                                fontSize: "14dp",
                                contentGravity: "center",
                            }
                        ]
                    },
                    {
                        type: "View",
                        height: "wrap",
                        width: "wrap",
                        children: [
                            {
                                type: "ImageView",
                                height:"54dp",
                                width:"wrap",
                                src: "/images/pano/kuang.png",
                            },
                            {
                                margin:"5dp",
                                type: "ImageView",
                                height: "40dp",
                                width: "wrap",
                                marginTop:"4dp",
                                src: img,
                            }
                        ]
                    }]
            });
        };
        //添加marker
        var createMarker = function (panoObj) {
            v_welcomePano.setAdaptor({
                getView: function (index) {
                    var cell = null;
                    var markerObj = panoObj.markers[index];
                    cell =  normalMarker(markerObj);
                    cell.info = markerObj;
                    cell.setOnClick(function () {
                        markerClick(markerObj);
                    })
                    if (cell) {
                        return cell;
                    } else {
                        return cell;
                    }
                },
                getCount: function () {
                    if (!panoObj.markers || !panoObj.markers.length) {
                        return 0;
                    }
                    return panoObj.markers.length;
                }
            });
        };

        var markerClick = function (markerObj) {
            v_bottom.setVisible(true);
            switch (markerObj.mtype) {
                case "pano":
                    var toPano = albumData.panoLists[markerObj.panoId];
                    setPanoIntro(toPano)
                    v_welcomePano.setPanoId(markerObj.panoId, function () {
                        v_welcomePano.setHeading(toPano.panoHeading);
                        v_welcomePano.setPitch(toPano.panoPitch);
                        v_album_image_scroll.setGone(false);
                        createMarker(toPano);
                    });
                    for (var i in v_album_image_scroll.subViews) {
                        if(markerObj.panoId == v_album_image_scroll.subViews[i].info.panoId){
                            v_album_image_scroll.subViews[i].$("isActiveView").setVisible(true);
                            v_album_image_scroll.setTranslateX(-130*i);
                        } else {
                            v_album_image_scroll.subViews[i].$("isActiveView").setVisible(false);
                        }
                    }
                    break;
                case "html":
                    break;
                case "label":
                    break;
                case "url":
                    window.location.href = markerObj.url;
                    break;
                default :
                    break;
            };
        };
        //跳转全景
        var jumpPano = function (panoObj) {
            v_welcomePano.setPanoId(panoObj.panoId, function () {
                v_welcomePano.setHeading(panoObj.panoHeading);
                v_welcomePano.setPitch(panoObj.panoPitch);
                v_welcomePano.panoViewInternal.setAutoplayEnable(true);
                createMarker(panoObj);
            });
        };
        //整理相册数据并跳转到第一相册的第一张默认全景
        var albumDataHandle = function (data ,ablumName) {
                for (var i = 0, len = data.albumList.length; i < len; i++) {
                    var album = data.albumList[i];
                    albumData.albumHandled[album.albumName] = {
                        albumInfo: album,
                        panoList: []
                    };
                    var handPanoList = function (_album) {
                        for (var i in _album.panoList) {
                            var pano = _album.panoList[i];
                            var  str= pano.panoInfo;
                            if(str.indexOf("_Ccontent")>-1){
                                var position = str.split("_Ccontent")[0];
                                pano.markerX = position.split(",")[0];
                                pano.markerY = position.split(",")[1];
                                if(pano.markerX && pano.markerX!=0){
                                    page.addMapMarker(mapMarker(pano));
                                };
                                if(pano.panoName.indexOf("旌善高山滑雪中心")>-1){
                                    page.addMapMarker(maker(pano));
                                }
                                if(pano.panoName.indexOf("江陵冰上运动场")>-1){
                                    page.addMapMarker(maker(pano));
                                }
                                if(pano.panoName.indexOf("奥林匹克体育场")>-1){
                                    page.addMapMarker(maker(pano));
                                }
                            };
                            pano.albumName = album.albumName;
                            albumData.panoLists[pano.panoId] = pano;
                            albumData.albumHandled[album.albumName].panoList.push(pano);
                        }
                        for (var j in _album.albumList) {
                            handPanoList(_album.albumList[j]);
                        }
                    }
                    handPanoList(album);
                };
            var album = albumData.albumHandled[ablumName];
            var panoObj = album.panoList[0];
            initPanoScrollBottom(ablumName);
            v_welcomePano.setPanoId(panoObj.panoId, function () {
                v_welcomePano.setHeading(panoObj.panoHeading);
                v_welcomePano.setPitch(panoObj.panoPitch);
                v_welcomePano.leftEye.setVisible(false);
                v_welcomePano.panoViewInternal.setAutoplayEnable(true);
                createMarker(panoObj);
            });
        };
        //初始化panoScrollBottom
        var initPanoScrollBottom = function (ablumName) {
            var panoList = albumData.albumHandled[ablumName].panoList;
            for (var i in panoList) {
                var cell = createImgItem(panoList[i],
                    panoList[i].thumbnailUrl,
                    panoList[i].panoName);
                v_album_image_scroll.addView(cell)
            }
            v_album_image_scroll.subViews[0].$("isActiveView").setVisible(true);
        };
        //创建v_album_img_scroll的item
        var createImgItem = function (data,imgUrl,panoName) {
            var cell = View.parse({
                width: "120dp",
                height: "70dp",
                marginRight: "10dp",
                borderCorner:"5dp",
                clipToBounds:true,
                children: [
                    {
                        type: "View",
                        id: "isActiveView",
                        background: "#3faae7",
                        visible: false
                    },
                    {
                        margin: "2dp",
                        id: "scrollView",
                        children: [
                            {
                                id: "poiImg",
                                type: "ImageView",
                                height: "match",
                                gravity: "center",
                                background: "#32A0FC",
                                src: imgUrl
                            },{
                               type:"ImageView",
                               // height:"40dp",
                                gravity:"bottom",
                               width:"match",
                               src:"/images/pano/shadow.png"
                            },
                            {
                                id: "textName",
                                type: "TextView",
                                height: "wrap",
                                fontSize: "14dp",
                                contentGravity:"center",
                                gravity: "bottom|centerHorizontal",
                                marginBottom:"5dp",
                                fontColor: "#ffffff",
                                text: panoNameDeal(panoName)[0]
                            },
                        ]
                    }
                ]
            });
            cell.info = data;
            cell.setOnClick(function () {
                var self = this;
                setPanoIntro(this.info)
                for (var i in v_album_image_scroll.subViews) {
                    v_album_image_scroll.subViews[i].$("isActiveView").setVisible(false);
                }
                self.$("isActiveView").setVisible(true);
                jumpPano(self.info);
            });
            return cell;
        };
        //创建 模板图片列表
        var createModel = function (picObj) {
            var cell = View.parse({
                width: "60dp",
                height: "60dp",
                marginRight: "19dp",
                borderCorner:"5dp",
                clipToBounds:true,
                children: [
                    {
                        margin: "2dp",
                        id: "scrollView",
                        children: [
                            {
                                id: "poiImg",
                                type: "ImageView",
                                height: "match",
                                gravity: "center",
                                background: "#32A0FC",
                                src: picObj.thumbnail
                            }
                        ]
                    },
                    {
                        type: "View",
                        id: "isActiveView",
                        background: "#000000",
                        alpha:"0.5",
                        visible: true
                    },
                ]
            });
            cell.info = picObj;
            cell.setOnClick(function () {
                if(typeof(MtaH5) != "undefined"){
                    MtaH5.clickStat("moban_btn");
                }
                v_overFlow.setVisible(true);
                var self = this;
                model = this.info.id;
                for (var i in v_mobanScroll.subViews) {
                    v_mobanScroll.subViews[i].$("isActiveView").setVisible(true);
                }
                v_loading2.setGone(false);
                self.$("isActiveView").setVisible(false);
                $.post(photoByModelUrl,
                    {
                        image:page.getBase(),
                        sex:sex,
                        model:model
                    }, function (res) {
                        var resulte = JSON.parse(res);
                        if(resulte.status == 0){
                            v_photoResult.setSrc(resulte.data,function () {
                                v_loading2.setGone(true);
                            });
                            window.shareInfo.img = util.getYoutuThumbnail(resulte.data)
                            window.getShareInfoSub (shareInfo.url, shareInfo.title, shareInfo.desc, shareInfo.img)
                            if(typeof(MtaH5) != "undefined"){
                                MtaH5.clickStat("ronghe-sucess");
                            }
                        } else {
                            v_alertView.setVisible(true);
                            v_loading2.setGone(true);
                            v_message.setText(resulte.msg);
                            setTimeout(function () {
                                if(v_alertView.visible){
                                    v_alertView.setVisible(false);
                                }
                            },2000);
                            if(typeof(MtaH5) != "undefined"){
                                MtaH5.clickStat("ronghe-error");
                            }
                        }
                        v_overFlow.setVisible(false);
                    }
                );
            });
            return cell;
        };

        //全景名称截取中文字段
        var panoNameDeal = function (panoName) {
            if(panoName.indexOf("-")>-1){
                return panoName.split("-");
            }
            return panoName;
        }
        //地图marker相关
        var mapMarker = function (pano) {
            var cell = View.parse({
                height:"wrap",
                width:"wrap",
                statue:0,
                id:pano.panoId,
                heading:pano.panoHeading,
                mapPosiX:pano.markerX,
                mapPosiY:pano.markerY,
                anchorX:0.5,
                contentGravity:"centerHorizontal",
                layout:"vertical",
                children:[
                    {
                        id:"marker",
                        type:"ImageView",
                        src:"/images/map/map_icon.png",
                        width:"20dp",
                        height:"wrap",
                    }]
            });
            cell.info = pano;
            cell.setOnClick(function () {
                if(cell.info .panoName.indexOf("旌善高山滑雪中心")>-1 ||
                    cell.info .panoName.indexOf("江陵冰上运动场")>-1||
                    cell.info.panoName.indexOf("奥林匹克体育场")>-1){
                    v_panoNameView.setVisible(false);
                }  else {
                    jQuery(v_panoNameView._nativeView.div).css({"z-index":"999", "-webkit-z-index": "999"});
                    v_panoNameView.info = cell.info;
                    v_mapPanoName.setText(panoNameDeal(cell.info.panoName)[0]);
                    v_mapPanoNameEN.setText(panoNameDeal(cell.info.panoName)[1])
                    v_panoNameView.setTranslateX(cell.transX-v_panoNameView.frame.width/2);
                    v_panoNameView.setTranslateY(cell.transY-30);
                    v_panoNameView.setVisible(true);
                }

            });
            return cell;
        };
        //
        var maker = function (pano) {
            var cell =  View.parse({
                height:"wrap",
                width:"wrap",
                padding:"5dp",
                id:pano.panoId,
                mapPosiX:pano.markerX,
                mapPosiY:pano.markerY,
                anchorX:"0.5",
                anchorY:"1",
                children:[
                    {
                        type:"View",
                        background:"#063359",
                        alpha:"0.2"
                    },
                    {
                        type:"View",
                        layout:"vertical",
                        contentGravity:"centerHorizontal",
                        height:"wrap",
                        width:"wrap",
                        children:[
                            {
                                type:"TextView",
                                fontColor:"#ffffff",
                                height:"wrap",
                                width:"wrap",
                                text:panoNameDeal(pano.panoName)[0]
                            },
                            {
                                type:"TextView",
                                fontColor:"#ffffff",
                                height:"wrap",
                                width:"wrap",
                                text:panoNameDeal(pano.panoName)[1]
                            },
                        ]
                    }]
            });
            cell.info = pano;
            cell.setOnClick(function () {
                var panoObj = this.info;
                v_album_image_scroll.clearViews();
                v_album_image_scroll.setTranslateX(0);
                var albumName = panoObj.albumName;
                var tempAlbumName = "";
                if(albumName.indexOf("江陵")>-1 ){
                    tempAlbumName =  "江陵海岸场馆";
                    v_areaText.setText("平昌片区");
                    v_areaText_en.setText("PyeongChang")
                }else{
                    tempAlbumName =  "平昌山脉场馆";
                    v_areaText.setText("江陵片区");
                    v_areaText_en.setText("GuangNeung")
                }
                initPanoScrollBottom(tempAlbumName);
                jumpPano(panoObj);
                v_mapPage.setVisible(false);
                v_album_image_scroll.setGone(false);
                for (var i in v_album_image_scroll.subViews) {
                    if(panoObj.panoId == v_album_image_scroll.subViews[i].info.panoId){
                        v_album_image_scroll.subViews[i].$("isActiveView").setVisible(true);
                        v_album_image_scroll.setTranslateX(-130*i);
                    } else {
                        v_album_image_scroll.subViews[i].$("isActiveView").setVisible(false);
                    }
                };
                setPanoIntro(panoObj)
                v_bottom.setVisible(true);
            });
            return cell;
        };
        //全景经信息
        var setPanoIntro = function (panoObj) {
            var panoInfo = "";
            if(panoObj.panoInfo.indexOf("_Ccontent")>-1){
                panoInfo = panoObj.panoInfo.split("_Ccontent")[1];
            } else {
                panoInfo = panoObj.panoInfo;
            }
            if(panoInfo){
                // v_panoDetail.setGone(false);
                v_panoInfoCtrl.setVisible(true);
            } else {
                // v_panoDetail.setGone(true);
                v_panoInfoCtrl.setVisible(false);
            }
            // v_panoDetail.setHtml(panoInfo);
            v_panoDetail2.setHtml(panoInfo);
            v_panoName._nativeView.div.style.textShadow = "3px 3px 3px rgba(0,0,0,0.4)";
            v_panoName.setText(panoNameDeal(panoObj.panoName)[0]);
            v_panoNamEN.setText(panoNameDeal(panoObj.panoName)[1]);
            v_panoNamEN1.setText(panoNameDeal(panoObj.panoName)[1]);
            v_panoName2.setText(panoNameDeal(panoObj.panoName)[0]);
            v_panoNamEN.setGone(false);
            v_panoNamEN1.setGone(false);
        };
        //地图手势
        page.getMapScale = function(){
            return v_mapBg.scaleX || 1;
        }
        page.getMapMarker = function(){
            return v_mapMarkerLayer.subViews;
        }
        page.getMapTranslateX = function () {
            return v_mapBg.translateX;
        }
        page.getMapTranslateY = function () {
            return v_mapBg.translateY;
        }
        page.setMapTransTo = function(transX, transY){
            transX = page._stopToBorderX(transX);
            transY = page._stopToBorderY(transY);
            v_mapBg.setTranslateX(transX);
            v_mapBg.setTranslateY(transY);
            v_mapMarkerLayer.setTranslateX(transX);
            v_mapMarkerLayer.setTranslateY(transY);
            page._updateMarkers();
        };
        page.setMapScaleTo = function(scale){
            scale = scale || 1;
            v_mapBg.setScaleX(scale);
            v_mapBg.setScaleY(scale);
            if(page.scaleExCallback){
                page.scaleExCallback(page.getScaleInfo());
            }
            page._updateMarkers();
        }
        page.setScaleChangeCallback = function (func) {
            page.scaleExCallback = func;
        }
        page._stopToBorderX = function(trans, scale){
            if(!trans || trans>0) return 0;
            var border = page.frame.width - v_mapBg.frame.width * (scale ? scale : page.getMapScale());
            return Math.max(trans, border);
        }
        page._stopToBorderY = function(trans, scale){
            if(!trans || trans>0) return 0;
            var border = page.frame.height - v_mapBg.frame.height * (scale ? scale : page.getMapScale());
            return Math.max(trans, border);
        }
        page._updateMarkerCell = function(cell) {
            var defaultImageW = page.frame.height*1864/1318;
            if(!cell || !cell.mapPosiX || !cell.mapPosiY) return;
            if(v_mapBg.frame.width==0){
                var  transX = (cell.mapPosiX * page.getMapScale()*defaultImageW)/1864  - cell.anchorX*cell.frame.width;
            }else{
                var  transX = (cell.mapPosiX * page.getMapScale()*v_mapBg.frame.width)/1864  - cell.anchorX*cell.frame.width;
            }
            var  transY = (cell.mapPosiY * page.getMapScale()*page.frame.height)/1318 - cell.anchorY*cell.frame.height;
            cell.transX = transX;
            cell.transY = transY;
            cell.setTranslateX(transX);
            cell.setTranslateY(transY);
        };
        page.clearMarkers = function(){
            v_mapMarkerLayer.clearViews();
        }
        page._updateMarkers = function() {
            for(var i = 0, len = v_mapMarkerLayer.subViews.length;i<len;i++){
                page._updateMarkerCell(v_mapMarkerLayer.subViews[i]);
            }
        }
        page.addMapMarker = function(cell){
            cell.mapPosiX = cell.mapPosiX || 0;
            cell.mapPosiY = cell.mapPosiY || 0;
            v_mapMarkerLayer.addView(cell);
            page._updateMarkerCell(cell);
        }
        v_mapMarkerLayer.isTouchInside = function(){
            return true;
        }
        page.getScaleInfo = function () {
            return {
                cur:v_mapBg.scaleX,
                max:page.MAXSCALE,
                min:page.MINSCALE
            }
        }
        var panGes = new PanGestureDetector();
        panGes.callback = function(offsetX, offsetY, event){
            if(event.touchPoints && event.touchPoints.length>1) return;
            if(event.state == 0){
                page.initTransX = page.getMapTranslateX();
                page.initTransY = page.getMapTranslateY();
                return;
            }
            var _transX = page.initTransX + offsetX;
            var _transY = page.initTransY + offsetY;
            page.setMapTransTo(_transX, _transY);
        }
        // var pitchGes = new PinchGestureDetector();
        // pitchGes.callback = function(scale, reset, event){
        //     if(reset){
        //         page.initPitchCenterX = event.getX();
        //         page.initPitchCenterY = event.getY();
        //         page.initTransX = page.getMapTranslateX();
        //         page.initTransY = page.getMapTranslateY();
        //         page.initScale  = page.getMapScale();
        //         page.startAnimation(null);
        //     }else{
        //         var imageScale = page.initScale * scale;
        //         imageScale = Math.max(imageScale, page.MINSCALE);
        //         imageScale = Math.min(imageScale, page.MAXSCALE);
        //         if(imageScale == page.MINSCALE || imageScale == page.MAXSCALE){
        //             return;
        //         }
        //         var _tx = page.initPitchCenterX - scale * (page.initPitchCenterX - page.initTransX);
        //         var _ty = page.initPitchCenterY - scale * (page.initPitchCenterY - page.initTransY);
        //         page.setMapScaleTo(imageScale);
        //         page.setMapTransTo(_tx, _ty);
        //     }
        // }
        var sweepGes = new SweepGestureDetector();
        sweepGes.callback = function(vx, vy ){
            var a = 0.001;
            var ty = Math.abs(vy) / a;
            var tx = Math.abs(vx) / a;
            var t = Math.max(ty, tx);
            var sx = 0.5 * a * tx * tx * (vx > 0 ? 1 : -1);
            var sy = 0.5 * a * ty * ty * (vy > 0 ? 1 : -1);

            var toTranslateX = page._stopToBorderX(page.getMapTranslateX() + sx);
            var toTranslateY = page._stopToBorderY(page.getMapTranslateY() + sy);

            var trans = new Animation();
            trans.timeInterplator = new com.appengine.animation.DecelerateInterceptor(2);
            trans.fromTranslateY = page.getMapTranslateY();
            trans.fromTranslateX = page.getMapTranslateX();
            trans.toTranslateX = toTranslateX;
            trans.toTranslateY = toTranslateY;
            trans.duration = t;
            trans.animateFrame = function(v, pro){
                page.setMapTransTo(trans.fromTranslateX + pro*(trans.toTranslateX - trans.fromTranslateX),
                    trans.fromTranslateY + pro*(trans.toTranslateY - trans.fromTranslateY));
            }
            trans.callback = function() {
            }
            page.startAnimation(trans);
        }
        v_mapMarkerLayer.addGestureDetector(panGes);
        // v_mapMarkerLayer.addGestureDetector(pitchGes);
        v_mapMarkerLayer.addGestureDetector(sweepGes);

        // jon
        (function(){
            var createDom = function(name){
                return document.createElement(name)
            }
            var input = createDom('input')
            input.setAttribute('type', 'file')
            input.setAttribute('accept', 'image/*')
            var canvas = createDom('canvas')
            var context = canvas.getContext('2d')
            context.fillStyle="#fff"
            var showLoading = function(isShow){
                var loading = document.getElementById('pageLoading')
                if(!loading){
                    loading = createDom('pageLoading')
                    loading.setAttribute('class', 'pageLoading')
                    loading.setAttribute('id', 'pageLoading')
                    document.body.append(loading)
                }
                loading.style.display = isShow ? 'block' : 'none'
            }
            var _img = new Image()
            page.$('photoHead')._nativeView.div.append(_img)
            var setPhoto = function(src, width, height, compressSrc){
                if(!src){
                    v_photoTip.setGone(false)
                    page.$('photoHead').setGone(true)
                    return
                }
                v_photoTip.setGone(true)
                page.$('photoHead').setGone(false)
                var img = page.$('photoHead')._nativeView.div.children[0]
                img.style.position = 'absolute'
                img.style.left = '50%'
                img.style.top = '50%'
                img.style['maxWidth'] = '100%'
                img.style['maxHeight'] = '100%'
                img.style.transform = 'translate(-50%, -50%)'
                if(width > height){
                    img.style.width = '100%'
                    img.style.height = 'auto'
                } else {
                    img.style.width = 'auto'
                    img.style.height = '100%'
                }
                img.src = src
                page._compressSrc = compressSrc
            }
            page.$('camera').setOnClick(function () {
                input.click()
            })
            var file = null
            var base64 = ''
            //对图片旋转处理 added by lzk
            function rotateImg(img, direction,canvas,expectWidth,expectHeight) {
                var min_step = 0;
                var max_step = 3;
                if (img == null) return;
                var width = expectWidth;//img.width; //
                var height = expectHeight;// img.height;//
                var step = 2;
                if (step == null) {
                    step = min_step;
                }
                if (direction == 'right') {
                    step++;
                    step > max_step && (step = min_step);
                } else {
                    step--;
                    step < min_step && (step = max_step);
                }
                //旋转角度以弧度值为参数
                var degree = step * 90 * Math.PI / 180;
                var ctx = canvas.getContext('2d');
                switch (step) {
                    case 0:
                        canvas.width = width;
                        canvas.height = height;
                        ctx.drawImage(img, 0, 0, expectWidth, expectHeight);
                        break;
                    case 1:
                        canvas.width = height;
                        canvas.height = width;
                        ctx.rotate(degree);
                        ctx.drawImage(img, 0, -height, expectWidth, expectHeight);
                        break;
                    case 2:
                        canvas.width = width;
                        canvas.height = height;
                        ctx.rotate(degree);
                        ctx.drawImage(img, -width, -height, expectWidth, expectHeight);
                        break;
                    case 3:
                        canvas.width = height;
                        canvas.height = width;
                        ctx.rotate(degree);
                        ctx.drawImage(img, -width, 0, expectWidth, expectHeight);
                        break;
                }
            }
            input.onchange = function(e){
                base64 = ''
                file = input.files[0];
                var imgFilter = /^(image\/jpeg|image\/png)$/i; // 检查图片格式
                if (!imgFilter.test(file.type)) {
                    alert("请选择jpeg、png格式的图片");
                    return;
                }
                showLoading(true)
                var reader = new FileReader()
                reader.onload = function ( e ) {
                    var Orientation = null;
                    EXIF.getData(file, function() {
                        EXIF.getAllTags(this);
                        Orientation = EXIF.getTag(this, 'Orientation');
                    });
                    base64 = e.target.result;
                    var img = new Image()
                    img.onerror = function(){
                        alert('解析出错请重新选择~')
                        showLoading(false)
                    }
                    img.onload = function(){
                        var expectWidth = this.naturalWidth;
                        var expectHeight = this.naturalHeight;
                        if (this.naturalWidth > this.naturalHeight && this.naturalWidth > 750) {
                            expectWidth = 750;
                            expectHeight = expectWidth * this.naturalHeight / this.naturalWidth;
                        } else if (this.naturalHeight > this.naturalWidth && this.naturalHeight > 1330) {
                            expectHeight = 1330;
                            expectWidth = expectHeight * this.naturalWidth / this.naturalHeight;
                        }
                        canvas.width = img.naturalWidth
                        canvas.height = img.naturalHeight
                        context.clearRect(0,0,canvas.width,canvas.height);
                        context.fillRect(0,0,canvas.width,canvas.height)
                        context.drawImage(img, 0,0, canvas.width,canvas.height);
                        //修复ios
                        if (navigator.userAgent.match(/iphone/i)) {
                            if(Orientation != "" && Orientation != 1){
                                switch(Orientation){
                                    case 6://需要顺时针（向左）90度旋转
                                        rotateImg(this,'left',canvas,expectWidth,expectHeight);
                                        break;
                                    case 8://需要逆时针（向右）90度旋转
                                        rotateImg(this,'right',canvas,expectWidth,expectHeight);
                                        break;
                                    case 3://需要180度旋转
                                        rotateImg(this,'right',canvas,expectWidth,expectHeight);//转两次
                                        rotateImg(this,'right',canvas,expectWidth,expectHeight);
                                        break;
                                }
                            }
                            base64 = canvas.toDataURL("image/jpeg", 0.6);
                        }else if (navigator.userAgent.match(/Android/i)) {// 修复android
                            base64 = canvas.toDataURL("image/jpeg", 0.6);
                        }else {
                            if (Orientation != "" && Orientation != 1) {
                                switch (Orientation) {
                                    case 6://需要顺时针（向左）90度旋转
                                        rotateImg(this, 'left', canvas, expectWidth, expectHeight);
                                        break;
                                    case 8://需要逆时针（向右）90度旋转
                                        rotateImg(this, 'right', canvas, expectWidth, expectHeight);
                                        break;
                                    case 3://需要180度旋转
                                        rotateImg(this, 'right', canvas, expectWidth, expectHeight);//转两次
                                        rotateImg(this, 'right', canvas, expectWidth, expectHeight);
                                        break;
                                }
                            }
                        }
                        var src = canvas.toDataURL("image/jpeg", 0.6);
                        var compressSrc = canvas.toDataURL("image/jpeg", renderConfig.getCompressRatio(base64));
                        if (navigator.userAgent.match(/iphone/i)) {
                            if(Orientation != "" && Orientation != 1){
                                switch(Orientation){
                                    case 6://需要顺时针（向左）90度旋转 所以宽高也替换
                                        setPhoto(src, img.naturalHeight, img.naturalWidth, compressSrc);
                                        break;
                                    case 8://需要逆时针（向右）90度旋转 所以宽高也替换
                                        setPhoto(src, img.naturalHeight, img.naturalWidth, compressSrc);
                                        break;
                                    case 3://需要180度旋转 宽高不用替换
                                        setPhoto(src, img.naturalWidth, img.naturalHeight, compressSrc);
                                        break;
                                    default:  //不用替换
                                        setPhoto(src, img.naturalWidth, img.naturalHeight, compressSrc);
                                        break;

                                }
                            }else{
                                setPhoto(src, img.naturalWidth, img.naturalHeight, compressSrc);
                            }
                        }else{
                            setPhoto(src, img.naturalWidth, img.naturalHeight, compressSrc);
                        }
                        showLoading(false)
                    }
                    img.src =  base64
                }
                reader.readAsDataURL(file)
                input.value = ''
            }
            var getBase = function(){
                var img = page.$('photoHead')._nativeView.div.children[0]
                if(!page._compressSrc && !img.src){
                    return ''
                }
                if(page._compressSrc){
                    // renderConfig.getCompressImg(img._compressSrc, 100*1024, function(err, compressBase){
                    //     if(err){
                    //         alert(err)
                    //     }else{
                    //         //compressBase
                    //     }
                    // })
                    return page._compressSrc.split("base64,")[1]
                }
                return img.src.split("base64,")[1]
                // if(!img){
                //     return
                // }
                // var width = img.naturalWidth
                // var height = img.naturalHeight
                // var cvs = createDom('canvas')
                // var ctx = cvs.getContext('2d')
                // cvs.width = width
                // cvs.height = height
                // ctx.fillStyle = "#fff";
                // ctx.fillRect(0, 0, cvs.width, cvs.height);
                // ctx.drawImage(img, 0, 0, cvs.width, cvs.height);
                // baseString = cvs.toDataURL('image/jpeg', 0.6);
                // return baseString.split("base64,")[1];
            }
            page.getBase = getBase
            var uploadImg = function(){
                if(typeof(MtaH5) != "undefined"){
                    MtaH5.clickStat("btn_get_photo");
                }
                v_mobanScroll.clearViews();
                v_overFlow.setVisible(true);
                var base = getBase()
                // if(base.length > 100*1024){
                //     renderConfig.getCompressImg(base, 100*1024, function(err, compressBase){
                //         if(err){
                //             v_message.setText(err);
                //             v_alertView.setVisible(true);
                //             v_overFlow.setVisible(false);
                //         }else{
                //             console.log('success')
                //             window.a = compressBase
                //             postImage(compressBase.split('base64,')[1])
                //         }
                //     })
                //     return
                // }
                if(!base){
                    v_alertView.setVisible(true);
                    v_overFlow.setVisible(false);
                    v_message.setText("选择要上传的图片");
                    setTimeout(function () {
                        if(v_alertView.visible){
                            v_alertView.setVisible(false);
                        }
                    },2000);
                    return
                }
                postImage(base)
            }
            var postImage = function(base){
                var picArry = [];
                if(sex==1){
                    picArry = renderConfig.getModels().men;
                } else {
                    picArry = renderConfig.getModels().women;
                }
                v_btn_getphoto_zh.setFontColor("#ffffff");
                v_btn_getphoto_eh.setFontColor("#ffffff");
                v_btn_get_photo.setSrc("/images/photo/photo_btn2.png");
                v_loading.setGone(false);
                $.post(photoUrl,{
                        image:base,
                        sex:sex
                    }, function (res) {
                        var resulte = JSON.parse(res);
                        if(resulte.status == 0){
                            v_photoResult.setSrc(resulte.data,function () {
                                for(var i  in picArry ){
                                    v_mobanScroll.addView(createModel(picArry[i]));
                                }
                                // v_mobanScroll.subViews[0].$("isActiveView").setVisible(false);
                                v_loading.setGone(true);
                                v_photoUpLoad.setVisible(false);
                                v_photoShow.setVisible(true);
                                window.shareInfo = {
                                    url:location.href,
                                    title:"全景看冬奥 这里是平昌",
                                    desc :"第23届冬季奥运会开幕了！新华社独家带你全景看冬奥，还可订制你的冬奥海报，一起来参与吧！",
                                    img  :util.getYoutuThumbnail(resulte.data)
                                };
                                window.shareConfig = function() {
                                    window.getShareInfoSub (shareInfo.url, shareInfo.title, shareInfo.desc, shareInfo.img)
                                };
                                shareConfig();
                            })
                            if(typeof(MtaH5) != "undefined"){
                                MtaH5.clickStat("ronghe-sucess");
                            }
                        } else {
                            v_loading.setGone(true);
                            v_alertView.setVisible(true);
                            v_message.setText(resulte.msg);
                            setTimeout(function () {
                                if(v_alertView.visible){
                                    v_alertView.setVisible(false);
                                }
                            },2000);
                            if(typeof(MtaH5) != "undefined"){
                                MtaH5.clickStat("ronghe-error");
                            }
                        }
                        v_overFlow.setVisible(false);
                    }
                )
            }
            v_getPhoto.setOnClick(uploadImg)
        })()

        return page;
    }
})