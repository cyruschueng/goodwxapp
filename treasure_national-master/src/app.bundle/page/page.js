/**
 * Created by GUQIANG on 2017/11/21.
 */
module("page.xml", "/widgets/jiemu.xml","/widgets/plugins.js", "/util/util.js", function (render, renderJieMu) {

    var PanGestureDetector = com.appengine.gesture.PanGestureDetector;
    var View = com.appengine.view.View;
    var TextView = com.appengine.view.TextView;
    var ImageView = com.appengine.view.ImageView;
    return function () {
        var page = render();

        //欢迎页View
        var v_pageWelcome = page.$("pageWelcome");

        //全景页View
        var v_pagePan = page.$("pagePan"),
            v_panBox = page.$("panBox"),
            v_panTop = page.$("panTop"),
            v_logo = page.$("logo"),
            v_gravity = page.$("gravity"),
            v_gravityOn = page.$("gravityOn"),
            v_gravityOff = page.$("gravityOff"),
            v_vr = page.$("vr"),
            v_vrOff = page.$("vrOff"),
            v_vrOn = page.$("vrOn"),
            v_goActivity = page.$("goActivity"),
            v_intro = page.$("intro"),
            v_introText = page.$("introText"),
            // v_logo2 = page.$("logo2"),
            v_movie = page.$("movie"),
            v_music = page.$("music"),
            v_musicOn = page.$("musicOn"),
            v_musicOff = page.$("musicOff"),
            v_detailPop = page.$("detailPop"),
            v_contentPop = page.$("contentPop"),
            v_backPanPage = page.$("backPanPage"),
            v_backDetailPop = page.$("backDetailPop"),
            v_jiemuDetail = page.$("jiemuDetail"),
            v_articleTime = page.$("articleTime"),
            v_scrollView = page.$("scrollView"),
            v_articleDetail = page.$("articleDetail"),
            v_boFang = page.$("boFang"),
            v_topImage = page.$("topImage"),
            v_articleTitle = page.$("articleTitle"),
            v_helpView = page.$("helpView"),
            v_boFangShadow = page.$("boFangShadow"),
            v_articleDetailScroll = page.$("articleDetailScroll"),
            v_panBottom = page.$("panBottom"),
            v_mengceng = page.$("mengceng"),
            v_bottomScrollView = page.$("bottomScrollView");

        var isGravity = false;
        var isVR = false;
        var randObj = {};
        var isFirst = false;

        var parentAlbumData = [];
        parentAlbumData.panoLists = {};
        parentAlbumData.albumHandled = {};
        var articleDataList = [];

        //宝藏页面View
        var v_pageActivity = page.$("pageActivity"),
            v_flow = page.$("flow"),
            v_backPan = page.$("backPan"),
            v_cashi = page.$("cashi"),
            v_treasure = page.$("treasure"),
            v_treasureActivity = page.$("treasureActivity"),
            v_realTreasure = page.$("realTreasure"),
            v_goShare = page.$("goShare"),
            v_shareActivity = page.$("shareActivity"),
            v_iKnow = page.$("iKnow"),
            v_treasureText = page.$("treasureText"),
            v_treasureDetail = page.$("treasureDetail"),
            v_sharePrevent = page.$("sharePrevent"),
            v_finger = page.$("finger");
        //view的事件绑定
        var evenBind = function () {
            util.setOnClick(v_goActivity, function () {
                v_pagePan.setVisible(false);
                v_pageActivity.setVisible(true);
                if(v_cashi.visible){
                    // window.setAlternateRotateZAnimation(v_finger,-45,45,2000,function () {
                    //     v_finger.setVisible(false);
                    // },2);
                    window.setAlternateTransXAnimation(v_finger,-100,100,2000,function () {
                        v_cashi.setGone(true);
                    },2);
                }
                if(!isFirst){
                    isFirst = !isFirst;
                    httpGet({
                    url: "http://luna.visualbusiness.cn/luna-api/article/" + randObj.id,
                    callback: function (e2) {
                        v_treasureDetail.setData(e2.data.content);
                    }
                });
                }
            });
            util.setOnClick(v_backPan, function () {
                v_pagePan.setVisible(true);
                v_pageActivity.setVisible(false);
                window.shareInfo = {
                    url:location.href,
                    title:"全景探秘《国家宝藏》",
                    desc :"承古人之创造，开时代之生面",
                    img  :"http://mob.visualbusiness.cn/treasure_national-debug/app.bundle/images/shareLogo.jpg",
                };
                shareConfig();
            });
            util.setOnClick(v_intro, function () {
                // v_detailPop.setVisible(true);
                v_scrollView.setTranslateY(0);
                v_contentPop.setVisible(true);
            });
            util.setOnClick(v_introText, function () {
                // v_detailPop.setVisible(true);
                v_contentPop.setVisible(true);
            });
            util.setOnClick(v_music, function () {
                setAudioPlay();
                isAudioPlaying = audioIsPlaying();
            });
            util.setOnClick(v_movie, function () {
                window.location.href = "https://v.qq.com/x/page/r0507jvqrz6.html";
            });
            util.setOnClick(v_backPanPage, function () {
                v_detailPop.setVisible(false);
            });
            util.setOnClick(v_backDetailPop, function () {
                v_contentPop.setVisible(false);
            });
            util.setOnClick(v_goShare, function () {
                v_shareActivity.setVisible(true);
            });
            util.setOnClick(v_iKnow, function () {
                v_shareActivity.setVisible(false);
            });
            util.setOnClick(v_gravity, function () {
                if (!isGravity) {
                    v_gravityOn.setVisible(false);
                    v_gravityOff.setVisible(true);
                    isGravity = true;
                } else {
                    v_gravityOn.setVisible(true);
                    v_gravityOff.setVisible(false);
                    isGravity = false;
                }
                ;
                v_panBox.panoViewInternal.setGravityEnable(isGravity);
            });
            util.setOnClick(v_vr, function () {
                isVR = true;
                v_vrOff.setVisible(true);
                v_vrOn.setVisible(false);
                v_panBox.setVREnable(true);
                v_panTop.setVisible(false);
                v_logo.setVisible(false);
                v_mengceng.setVisible(false);
                v_panBottom.setVisible(false);
                v_goActivity.setVisible(false);
                v_panBox.panoViewInternal.setAutoplayEnable(false);
            });
            util.setOnClick(v_vrOff, function () {
                isVR = false;
                v_vrOff.setVisible(false);
                v_vrOn.setVisible(true);
                v_panTop.setVisible(true);
                v_logo.setVisible(true);
                v_mengceng.setVisible(true);
                v_goActivity.setVisible(true);
                v_panBottom.setVisible(true);
                v_panBox.setVREnable(false);
                v_panBox.panoViewInternal.setAutoplayEnable(false);
            });
            util.setOnClick(v_sharePrevent, function () {
                v_shareActivity.setVisible(false);
            });
            util.setOnClick(v_shareActivity);
            util.setOnClick(v_treasureActivity);
            util.setOnClick(v_pageWelcome);
            v_articleDetail.interceptMethod("setData", function(){
                var res = this._origin.apply(this, arguments);
                var divDom = this._nativeView.div;
                if(divDom){
                    var $divDom = $(divDom);
                    var imgs = $divDom.find("img");
                    var len = imgs.length;
                    for(var i in imgs){
                        imgs[i].onload = onerror = function(){
                            len--;
                            if(len <= 0){
                                v_articleDetail.requestLayout();
                            }
                        }
                    }
                };
                return res;
            });
            v_treasureDetail.interceptMethod("setData", function(){
                var res = this._origin.apply(this, arguments);
                var divDom = this._nativeView.div;
                if(divDom){
                    var $divDom = $(divDom);
                    var imgs = $divDom.find("img");
                    var len = imgs.length;
                    for(var i in imgs){
                        imgs[i].onload = onerror = function(){
                            len--;
                            if(len <= 0){
                                v_articleDetail.requestLayout();
                            }
                        }
                    }
                };
                return res;
            });
            v_jiemuDetail.interceptMethod("setData", function(){
                var res = this._origin.apply(this, arguments);
                var divDom = this._nativeView.div;
                if(divDom){
                    var $divDom = $(divDom);
                    var imgs = $divDom.find("img");
                    var len = imgs.length;
                    for(var i in imgs){
                        imgs[i].onload = onerror = function(){
                            len--;
                            if(len <= 0){
                                v_articleDetail.requestLayout();
                            }
                        }
                    }
                };
                return res;
            });
        };
        evenBind();
        //网络访问获取数据
        var params = util.getParams();
        var ALBUMID = params["albumid"] || "9453B00214DB435F8BDD20B1EF2A145D";
        var data = {};
        var HTTPNUM = 4;
        var httpData = function () {
            //全景数据
            httpGet({
                url: "http://data.pano.visualbusiness.cn/rest/album/view/" + ALBUMID + "?lang=",
                callback: function (e) {
                    HTTPNUM--;
                    data = e;
                    albumDataHandle(e.data);
                    util.setDocumentTitle("全景探秘《国家宝藏》");
                    handleDataFun();
                }
            });
            //文章的展品数据
            httpGet({
                url: "http://luna.visualbusiness.cn/luna-web/api/article/byBusinessId?business_id=2014&column_ids=596",
                callback: function (e1) {
                    HTTPNUM--;
                    var randomNum = Math.floor(Math.random() * e1.data.rows.length);
                    var randomObj = e1.data.rows[randomNum];
                    // for(var i in e1.data.rows){
                    //     if(e1.data.rows[i].title=="云纹铜禁"){
                    //         randObj = e1.data.rows[i]
                    //     }
                    // }
                    randObj = randomObj;
                    handleDataFun();
                }
            });
            //文章的节目列表数据
            httpGet({
                url: "http://luna.visualbusiness.cn/luna-web/api/article/byBusinessId?business_id=2014&column_ids=597",
                callback: function (e1) {
                    HTTPNUM--;
                    // var allArticleDataList = e1.data.rows
                    for (var i in e1.data.rows ) {
                        var isHavePanoData = e1.data.rows[i].abstract_content;
                        if(isHavePanoData&&isHavePanoData!=""){
                            articleDataList.push(e1.data.rows[i]);
                            var cell = createAlbumListCell(e1.data.rows[i]);
                            v_bottomScrollView.addView(cell);
                            if(i==0){
                                cell.$("active").setVisible(true);
                            }
                        }
                    };
                    httpGet({
                        url: "http://luna.visualbusiness.cn/luna-api/article/"+e1.data.rows[0].id,
                        callback: function (e2) {
                            HTTPNUM--;
                            dealContentDetail(e2);
                            handleDataFun();
                        }
                    });
                    handleDataFun();
                }
            });
            //拿到节目概述
            // httpGet({
            //     url: "http://luna.visualbusiness.cn/luna-api/article/2991",
            //     callback: function (e2) {
            //         HTTPNUM--;
            //         v_jiemuDetail.setData(e2.data.content);
            //         handleDataFun();
            //     }
            // });
            var handleDataFun = function () {
                if (HTTPNUM > 0) return;
                v_panBox.$("leftEye").setVisible(false);
                var title = articleDataList[0].title;
                var album = parentAlbumData.albumHandled[title];
                var panos = album.panoList;
                jumpPano(panos[0]);
                setTimeout(function () {
                    window.startAlphaAnimation(v_pageWelcome, 1, 0, 4000, function () {
                        initAnimation();
                    });
                },2000);
                createCanvas(randObj);
            };
        };
        httpData();
        //擦拭效果
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext('2d');
        var createCanvas = function (randObj) {
            var img1 = document.createElement("img");
            canvas.style.position = "relative";
            canvas.style.left = "0px";
            canvas.style.top = "0px";
            canvas.style.zIndex = "0";
            canvas.style.width = "100%";
            canvas.style.height = "100%";
            img1.onload = function () {
                canvas.width = v_flow.frame.width;
                canvas.height = v_flow.frame.height;
                ctx.drawImage(img1, 0, 0, v_flow.frame.width, v_flow.frame.height);
            };
            v_treasure.setSrc(randObj.thumbnail);
            v_realTreasure.setSrc(randObj.abstract_pic, function () {
                var height = v_realTreasure._nativeView.image.height;
                var width = v_realTreasure._nativeView.image.width;
                if (height > width) {
                    v_realTreasure.setHeight("match 0.4");
                    v_realTreasure.setWidth("wrap");
                } else {
                    v_realTreasure.setHeight("wrap");
                    v_realTreasure.setWidth("match 0.5");
                }
            });
            img1.src = randObj.abstract_content;
            v_flow._nativeView.div.appendChild(canvas);
        };
        //创建单个节目
        var crateJieMu = function (obj) {
            var cell = renderJieMu();
            cell.$("jiemu").setSrc(obj.abstract_pic);
            cell.$("textName").setText(obj.title);
            cell.$("time").setText(obj.short_title)
            cell.setOnClick(function () {
                v_articleDetailScroll.setTranslateY(0);
                httpGet({
                    url: "http://luna.visualbusiness.cn/luna-api/article/" + obj.id,
                    callback: function (e2) {
                        v_articleDetail.setData(e2.data.content);
                        v_articleTitle.setText(e2.data.title);
                        v_articleTime.setText(e2.data.short_title);
                        v_topImage.setSrc(e2.data.abstract_pic);
                        if (e2.data.video && e2.data.video != "") {
                             v_boFang.setVisible(true);
                             v_boFangShadow.setVisible(true);
                             v_helpView.setGone(false);
                        }else{
                              v_boFangShadow.setVisible(false);
                              v_helpView.setGone(true);
                        }
                        v_contentPop.setVisible(true);
                        util.setOnClick(v_boFang, function () {
                            // util.createVideoBox(page,{
                            //     "file_id" : "9031868223384872934"
                            // },function () {
                            //     if(isAudioPlaying){
                            //         setAudioPlay("on");
                            //     };
                            // });
                            // if(isAudioPlaying){
                            //     setAudioPlay("off");
                            // }
                            window.location.href = e2.data.video;
                        });
                    }
                });
            });
            return cell;
        };
        //添加marker
        var createMarker = function (panoObj) {
            v_panBox.setAdaptor({
                getView: function (index) {
                    var cell = null;
                    switch (panoObj.markers[index].mtype) {
                        case "pano":
                            cell = window.viewfactory.normalPanoMarker(panoObj.markers[index]);
                            cell.info = panoObj.markers[index];
                            cell.setOnClick(function () {
                                var obj = this;
                                var toPano = parentAlbumData.panoLists[obj.info.panoId];
                                v_panBox.setPanoId(obj.info.panoId, function () {
                                    v_panBox.setHeading(toPano.panoHeading);
                                    v_panBox.setPitch(toPano.panoPitch);
                                    createMarker(toPano);
                                });
                            });
                            break;
                        case "html":
                            break;
                        case "label":
                            break;
                        case "url":
                            cell = window.viewfactory.normalUrlMarker(panoObj.markers[index]);
                            cell.info = panoObj.markers[index];
                            cell.setOnClick(function () {
                                var obj = this;
                                window.location.href = obj.info.url;
                            });
                            break;
                        default :
                            break;
                    };
                    if (cell) {
                        return cell;
                    } else {
                        return null;
                    }

                },
                getCount: function () {
                    if (!panoObj.markers||!panoObj.markers.length) {
                        return 0;
                    }
                    return panoObj.markers.length;
                }
            });
        };
        //创建listview对应的cell
        var createAlbumListCell = function (articleData) {
            if(articleData.title=="节目介绍"){
                articleData.title = "国家宝藏主场景";
            }
            var cell = View.parse({
                width: "168dp",
                height: "94dp",
                marginLeft: "10dp",
                translateY: "0",
                children: [
                    {
                        type: "ImageView",
                        id: "active",
                        src:"/images/img_bg.png",
                        visible: false,
                    },
                    {
                        type: "ImageView",
                        id: "img",
                        width: "156dp",
                        height: "86dp",
                        src: articleData.thumbnail,
                        gravity: "center"
                    },
                    {
                        type: "ImageView",
                        width: "156dp",
                        src:"/images/shadowtest.png",
                        height: "30dp",
                        marginBottom:"4dp",
                        gravity: "bottom|centerHorizontal",
                    },
                    {
                        type: "TextView",
                        id: "text",
                        text: articleData.title,
                        fontSize: "12dp",
                        margin: "0 5 5 5",
                        height: "wrap",
                        width: "match",
                        wordSpace: "1.6dp",
                        fontColor: "#fff4db",
                        gravity: "bottom|center",
                        contentGravity: "center",
                    }
                ]
            });
            cell.info = articleData;
            cell.setOnClick(function () {
                var self = this;
                for(var i in v_bottomScrollView.subViews){
                    v_bottomScrollView.subViews[i].$("active").setVisible(false);
                }
                cell.$("active").setVisible(true);
                v_articleDetailScroll.setTranslateY(0);
                httpGet({
                    url: "http://luna.visualbusiness.cn/luna-api/article/"+self.info.id,
                    callback: function (e2) {
                        dealContentDetail(e2);
                    }
                });

                if(self.info.title=="国家宝藏主场景"){
                    v_introText.setText("节目介绍");
                    // var album = parentAlbumData.albumHandled["国家宝藏主场景"];
                    // var panos = album.panoList;
                }else{
                    v_introText.setText(self.info.title);
                }
                var album = parentAlbumData.albumHandled[self.info.title];
                var panos = album.panoList;
                if(panos.length>0){
                    jumpPano(panos[0]);
                }
            });
            return cell;
        };
        // 图片的手势事件
        var panGes = new PanGestureDetector();
        panGes.callback = function (offsetX, offsetY, event) {
            if (event.touchPoints && event.touchPoints.length > 1) return;
            if (event.state == 0) {
                v_cashi.setGone(true);
                panGes.lastX = event.touchPoints[0].x;
                panGes.lastY = event.touchPoints[0].y;
                return;
            };
            if(event.state == 1){
                var curX = event.touchPoints[0].x;
                var curY = event.touchPoints[0].y;
                ctx.save();
                ctx.lineCap = "round";
                ctx.lineJoin = "round";
                ctx.globalCompositeOperation = "destination-out";
                ctx.lineWidth = 24;
                ctx.moveTo(panGes.lastX, panGes.lastY);
                ctx.lineTo(curX,curY);
                ctx.save();
                panGes.lastX = curX;
                panGes.lastY = curY;
                ctx.stroke();
                ctx.restore();
            }
            if (event.state == 2) {
                v_flow.setTouchable(false);
                ctx.clearRect(0, 0, v_flow.frame.width, v_flow.frame.height);
                httpGet2({
                    url:"http://server.cemp.visualbusiness.cn/ms-cemp/nationalTreasureController/registProtector",
                    callback: function (numData) {
                        //var htmlStr = "你是第<font size=6px >"+numData.data.protectorTotal+"</font>位</br>"+randObj.title+"<font size=3px>的今生守护人</font>";
                        var htmlStr = "你是第"+numData.data.protectorTotal+"位</br>"+randObj.title+"的今生守护人";
                        v_treasureText.setHtml(htmlStr);
                        window.shareInfo = {
                            url: location.href,
                            title: "我是第"+numData.data.protectorTotal+"位国宝" + randObj.title + "的今生守护人",
                            desc: "承古人之创造，开时代之生面",
                            img: randObj.abstract_pic
                        };
                        shareConfig();
                        setTimeout(function () {
                            v_treasureActivity.setVisible(true);
                        }, 1000);
                    }
                });
            };
        };
        v_flow.addGestureDetector(panGes);
        //整理相册数据
        var albumDataHandle = function (data) {
            for(var i = 0, len= data.albumList.length;i<len;i++){
                var album = data.albumList[i];
                parentAlbumData.albumHandled[album.albumName] = {
                    albumInfo:album,
                    panoList:[]
                };
                var handPanoList = function(_album){
                    for(var i in _album.panoList){
                        var pano = _album.panoList[i];
                        pano.albumName = album.albumName;
                        parentAlbumData.panoLists[pano.panoId] = pano;
                        parentAlbumData.albumHandled[album.albumName].panoList.push(pano);
                    }
                    for(var j in _album.albumList){
                        handPanoList(_album.albumList[j]);
                    }
                }
                handPanoList(album);
            };
        };
        //初始化音乐播放
        var audioDom = document.getElementById("audioDom");
        var setAudioPlay = function (tar) {
            if (typeof(tar) == "undefined") {
                if (audioDom.paused) {
                    tar = "on";
                } else {
                    tar = "off";
                };
            }
            if (tar == "on") {
                audioDom.play();
                v_musicOn.setVisible(true);
                v_musicOff.setVisible(false);
            }
            if (tar == "off") {
                audioDom.pause();
                v_musicOn.setVisible(false);
                v_musicOff.setVisible(true);
            }
        };
        //获取音乐状态
        var audioIsPlaying = function () {
            return (page.audio && (!page.audio.paused));
        };
        var isAudioPlaying = audioIsPlaying();
        var initMusic = function () {
            var isAutoPlay = true;
            // audioDom.setAttribute("src",src);
            audioDom.volume = 0.3;
            if (isAutoPlay ) {
                setWXInitCallback(function () {
                    if (audioDom.paused ) {
                        setAudioPlay("on");
                    }
                });
                setAudioPlay("on");
            }
            shareConfig();
        };
        initMusic();
        //全景跳转
        var jumpPano = function (pano) {
            v_panBox.setPanoId(pano.panoId, function () {
                v_panBox.setHeading(pano.panoHeading);
                v_panBox.setPitch(pano.panoPitch);
                createMarker(pano);
                window.hidePageLoading();
            });
            v_panBox.panoViewInternal.setAutoplayEnable(true);
        };
        //节目详情页面类容设置
        var dealContentDetail = function (data) {
            v_articleDetail.setData(data.data.content);
            v_articleTitle.setText(data.data.title);
            v_articleTime.setText(data.data.short_title);
            v_topImage.setSrc(data.data.abstract_pic);
            if (data.data.video && data.data.video != "") {
                v_boFang.setVisible(true);
                v_boFangShadow.setVisible(true);
                v_helpView.setGone(false);
            }else{
                v_boFang.setVisible(false);
                v_boFangShadow.setVisible(false);
                v_helpView.setGone(true);
            }
            util.setOnClick(v_boFang, function () {
                // util.createVideoBox(page,{
                //     "file_id" : "9031868223384872934"
                // },function () {
                //     if(isAudioPlaying){
                //         setAudioPlay("on");
                //     };
                // });
                // if(isAudioPlaying){
                //     setAudioPlay("off");
                // }
                window.location.href = data.data.video;
            });
        };
        //初始化动画
        var initAnimation = function () {
            v_pageWelcome.setGone(true);
            v_panTop.setVisible(true);
            v_logo.setVisible(true);
            v_mengceng.setVisible(true);
            v_goActivity.setVisible(true);
            v_panBottom.setVisible(true);
            v_panBox.$("leftEye").setVisible(true);
        };

        return page;
    }
})