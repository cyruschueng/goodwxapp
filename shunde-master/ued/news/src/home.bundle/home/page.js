require("page.xml" , "widgets/plugins.js", "widgets/jquery.qrcode.min.js",  function(renderPage){
    var View = com.appengine.view.View;
    var ImageView = com.appengine.view.ImageView;
    var Animation = com.appengine.animation.Animation;
    var AnimationPano  = com.appengine.animation.PanoAnimation;
    var DecelerateInterpolator = com.appengine.animation.DecelerateInterpolator;

    return function(){
        var params     = util.getParams();
        var albumId    = params["albumid"] ;//|| "850C07A6E0B745B8A2D985EBC3F4B30E";
        var ispreview  = params["preview"] ;//|| true;
            ispreview  = View.parseBoolean(ispreview);
        var musicAuto  = params["musicauto"];
        // var showPicIntro = params["picintro"];
        var forceType  = params["forcetype"];
        var isOnline   = window.location.pathname.indexOf("debug") == -1 ? true : false;
        if(forceType){
            if(forceType == "online"){
                isOnline = true;
            }else if(forceType == "test"){
                isOnline = false;
            }
        }


        if(musicAuto && musicAuto == "auto"){
            musicAuto = true;
        }else{
            musicAuto = false;
        }
        //建议尺寸1920*1080——pc
        //建议尺寸640*1024——移动端
        var bootImgSize = {
            pc:{
                width:1920,
                height:1080
            },
            mobile:{
                width:640,
                height:1024
            }
        }
        // if(isOnline){//正式
        //     var panoDataSyle = "";
        //     var appStyle = {
        //         view   :"http://news.pano.visualbusiness.cn/rest/album/view/",
        //         preview:"http://news.pano.visualbusiness.cn/rest/album/preView/",
        //         mta:"http://news.pano.visualbusiness.cn/rest/album/statist/getMtaIds"
        //     }
        //     var baseUrl = ispreview ? appStyle["preview"] : appStyle["view"];
        // }else{//测试
        //     var panoDataSyle = "[TT]";
        //     var appStyle = {
        //         view   :"http://newstest.pano.visualbusiness.cn/rest/album/view/",
        //         preview:"http://newstest.pano.visualbusiness.cn/rest/album/preView/",
        //         mta:"http://newstest.pano.visualbusiness.cn/rest/album/statist/getMtaIds"
        //     }
        //     var baseUrl = ispreview ? appStyle["preview"] : appStyle["view"];
        // }

        var page = renderPage();
        var v_pano    = page.$("panoId");
        var v_newsListsIntro = page.$("newsListsIntro");
        var v_newsLists  = page.$("newsLists");
        var v_news_title = page.$("news_title");
        var v_ctl_music  = page.$("ctl_music");
        var v_ctl_vr_on    = page.$("ctl_vr_on");
        var v_ctl_vr_off   = page.$("ctl_vr_off");
        var v_ctl_gravity  = page.$("ctl_gravity");
        var v_ctl_intro    = page.$("ctl_intro");
        var v_newsListsIntroTxt = page.$("newsListsIntroTxt");
        var v_bootImg      = page.$("bootImg");
        var v_bootView     = page.$("bootView");
        // var v_newsLogo_mobile   = page.$("newsLogo_mobile");
        // var v_newsLogo_pc       = page.$("newsLogo_pc");
        var v_newsLogo     = page.$("newsLogo");

        //video
        var v_video = page.$("video");
        //picIntro
        var v_picIntro = page.$("picIntro");
        var v_picIntroView = page.$("picIntroView");
        var v_picClose = page.$("picClose");
        var v_picScrollView = page.$("picScrollView");
        var v_pic = page.$("pic");


        // if(showPicIntro){
        //     if(showPicIntro=="show"){
        //         v_picIntro.setGone(false);
        //     }else{
        //         v_picIntro.setMarginLeft(0);
        //         v_picIntro.setGone(true);
        //     }
        // }

        //iconbox
        var v_panoCtlBox   = page.$("panoCtlBox");
        var v_newsCtrl     = page.$("newsCtrl");
        var v_newsBottom   = page.$("newsBottom");
        var v_qrcodeEntrance = page.$("qrcodeEntrance");

        //简介
        var v_newsIntro      = page.$("newsIntro");
        var v_newsIntroTitle = page.$("newsIntroTitle");
        var v_newsIntroClose = page.$("newsIntroClose");
        var v_newsIntroCtn   = page.$("newsIntroCtn");

        //二维码
        var v_qrcodeEntrance = page.$("qrcodeEntrance");
        var v_codeBox        = page.$("codeBox");
        var v_code           = page.$("code");
        var panoMarkers = {};
        var videoId = "";

        var newsInfo = null;
        var isMobile = false;

        // 184*104
        var panoList = {
            width:92,
            height:52,
            marginRight:8
        }
        // CLIENT_TYPE// 0：PC端， 1：H5，2：IOS， 3：Android。默认不区分渠道。
        var clientLayout = function(){
            if(CLIENT_TYPE == "0"){//PC端 news_title
                isMobile = false;
                v_bootView.setGone(true);
                v_news_title.setGone(false);
                v_newsListsIntro.setHeight("30dp");
                v_newsListsIntro.setMarginLeft("20dp");
                v_newsListsIntro.setMarginRight("20dp");
                v_newsLists.setMarginLeft("20dp");
                v_newsLists.setMarginBottom("12dp");
                v_qrcodeEntrance.setGone(false);
                panoList.width = 184;
                panoList.height = 104;
                panoList.marginRight = 10;
            }else{//手机端
                isMobile = true;
                v_bootView.setGone(false);
                v_news_title.setGone(true);
                v_qrcodeEntrance.setGone(true);
                v_newsListsIntro.setHeight("60dp");
                v_newsListsIntro.setMarginLeft("30dp");
                v_newsListsIntro.setMarginRight("30dp");
                v_newsLists.setMarginLeft("30dp");
                v_newsLists.setMarginBottom("20dp");

                panoList.width = 92;
                panoList.height = 52;
                panoList.marginRight = 8;
            }
        }


        //TODO 数据获取及处理
        var getAlbumInfo = function(id, callback){
            httpGet({
                url:window.urlProvider(ispreview?'prenews':'news')+id,
                callback:function(e){
                    if(e && e.result == 0){
                        newsInfo = e.data;
                        if(callback) callback(e.data);
                    }else{
                        alert("数据获取失败！")
                    }
                }
            });
        }
        var createListData = function(data){
            if(!data) return;
            if(data.panoList && data.panoList.length > 0){
                v_newsLists.panoLists = v_newsLists.panoLists.concat(data.panoList);
            }
            if(!data.albumList) return;
            for(var i  = 0,len = data.albumList.length;i<len;i++){
                createListData(data.albumList[i]);
            }
        }

        //code
        var createCode = function(v, url){
            var div = v._nativeView.div;
                url = url || window.location.href;
            var _div = $(div);
            _div.qrcode({
                text:url,
                width: v.frame.width || 150, //宽度 
                height:v.frame.width || 150 //高度 
            });
        }
        var codeHoverEvent = function(){
            page.$("qrcodeEntranceBg").hoverHandler = function(ac){
                switch (ac){
                    case "in":
                        v_codeBox.setVisible(true);
                    break;
                    case "out":
                        v_codeBox.setVisible(false);
                    break;
                }
            }
            createCode(v_code);
        }

        //factroy marker
        var factroy_videoMarker = function(name, marker){
            var cell = View.parse({
                height:"26dp",
                padding:"2dp",
                width:"wrap",
                borderColor:"#5CC0FF",
                borderWidth:"2dp",
                background:"#3495D1",
                layout:"horizontal",
                clipToBounds:true,
                borderCorner:"13dp",
                panoHeading:marker.heading,
                panoPitch:marker.pitch,
                children:[{
                    type:"ImageView",
                    src:"/home/images/movie.png",
                    width:"22dp",
                    height:"22dp",
                    gravity:"centerVertical"
                },{
                    type:"TextView",
                    text:name,
                    fontColor:"#ffffff",
                    fontSize:"14dp",
                    width:"wrap",
                    height:"wrap",
                    marginLeft:"5dp",
                    marginRight:"5dp",
                    gravity:"centerVertical"
                }]
            });
            cell.clickInfo = marker;
            util.setOnClick(cell, showMarkerVideo);
            return cell;
        }
        var showMarkerVideo = function(){
            if(this.clickInfo.videoId){
                // musicCtrlEx("pause");
                // util.createVideoBox(page,{
                //     "file_id" : this.clickInfo.videoId
                // });


                util.createVideoBox(page,{
                    "file_id" : this.clickInfo.videoId
                },function () {
                    if(isAudioPlaying){
                        musicCtrlEx("play");
                    };
                });
                if(isAudioPlaying){
                    musicCtrlEx("pause");
                }


            }
        }

        //newsList
        var factory_panoList = function(){
            // var height = parseInt(panoList.height);
            //     height = height||"wrap";
            var border = 1;
            var cell = View.parse({
                width:"wrap",
                marginRight:panoList.marginRight,
                height:panoList.height + border*2+ 'dp',
                width:panoList.width   + border*2+ 'dp',
                children:[{
                    id:"hover",
                    background:"#ffffff",
                    alpha:0,
                    height:"match",
                    width:"match"
                },{
                    id:"active",
                    background:"#ffffff",
                    width:"match",
                    height:"match",
                    alpha:0
                },{
                    height:panoList.height+'dp',
                    width:panoList.width+'dp',
                    gravity:"center",
                    children:[{
                        type:"ImageView",
                        id:"thumbNail"
                    },{
                        height:"wrap",
                        gravity:"bottom",
                        children:[{
                            type:"ImageView",
                            height:"match",
                            src:"/home/images/list_shadow.png"
                        },{
                            id:"name",
                            height:"22dp",
                            type:"TextView",
                            fontSize:"12dp",
                            clipToBounds:"true",
                            fontColor:"#ffffff",
                            padding:"4dp",
                            maxLine:"1"
                        }]
                    }]
                }]
            });
            cell._nativeView.div.setAttribute("class","panoListHover");
            util.setOnClick(cell,function(){
                clickPanoList(this.listIndex || 0)
            });
            return cell;
        }
        var clickPanoList = function(index){
            if(typeof index == "undefined"){
                var index = this.listIndex || 0;
            }
            var pano  = v_newsLists.panoLists[index];
                page.panoIndex = index;
            // var panoId = isOffLine?("[TT]"+pano.panoId) : pano.panoId;
            var panoId = pano.panoId;
            v_pano.clearViews();
            v_pano.setPanoId(panoId,function(){
                v_pano.setHeading(pano.panoHeading);
                v_pano.setPitch(pano.panoPitch);
                addPanoMarker(panoMarkers && panoMarkers[pano.panoId]);
            });
            v_newsLists.notifyDataChanged();
            var text = pano.panoInfo;
            text = text.replace(/[\r\n]/g,"<br/>");
            text = text.replace(/\s{2}/g,"&nbsp;&nbsp;");
            v_newsListsIntroTxt.setHtml(text);
        }
        var addPanoMarker = function(markers){
            if(!markers) return;
            // if(markers.showMarker)return;
            for(var i in markers){
                var markerCell = null;
                switch(markers[i] && markers[i].mtype){
                    case "video": //panoHeading
                        markerCell = factroy_videoMarker(markers[i].name, markers[i]);
                        if(!isMobile){
                            markerCell = null;
                        }
                    break;
                }
                if(markerCell){
                    v_pano.addView(markerCell);
                }
            }
        }

        //初始化panoList
        var initList = function(){
            v_newsLists.setAdaptor({
                getCellView : function(reuseView,index) {
                    if(!reuseView) {
                        reuseView = factory_panoList();
                    }
                    var panoInfo = v_newsLists.panoLists[index];
		    var thumbnailUrl = panoInfo.customThumbnailUrl;
	            if(thumbnailUrl==null||thumbnailUrl.length==0) {
		        thumbnailUrl = panoInfo.thumbnailUrl;
  		    }
                    reuseView.$("thumbNail").setSrc(thumbnailUrl);
                    reuseView.$("name").setText(panoInfo.panoName);
                    if(index == page.panoIndex){
                        reuseView.$("active").setAlpha(1);
                        reuseView.$("active").isChoosed = true;
                    }else{
                        reuseView.$("active").setAlpha(0);
                        reuseView.$("active").isChoosed = false;
                    }
                    reuseView.listIndex = index;
                    reuseView.$("name") || reuseView.$("name").setMaxLine("1");
                    return reuseView;
                },
                getCount : function() {
                    if(!v_newsLists.panoLists) return 0;
                    return v_newsLists.panoLists.length;
                }
            });
            v_newsLists.notifyDataChanged = function(){
                var count = this.adaptor.getCount();
                if(this.lastVisiblePosition >= count) {
                    this.lastVisiblePosition = count - 1;
                    if(this.firstVisiblePosition >= this.lastVisiblePosition) {
                        this.firstVisiblePosition = this.lastVisiblePosition;
                    }
                }
                this.updateCellInfo(this.lastVisiblePosition);
                var vset = [];
                for(var i = this.firstVisiblePosition ; i <= this.lastVisiblePosition && i >= 0;i++) {
                    var view = this.adaptor.getCellView(this.cellInfos[i].view,i);
                    this._addCellView(view,i,this.cellInfos[i].top,this.cellInfos[i].height);
                    vset.push(view);
                }
                this.checkCells();
                if(this.frame.width > 0 && this.frame.height > 0) {
                    this.fly(0, 0);
                }
            };
            v_newsLists.getAdaptor = true;
        }
        //create bootImg
        var createBootImg = function(src){
            if(!src) return;
            v_bootImg.setSrc(newsInfo.features.h5_cover_url);
            if(!v_bootView.frame.width && !v_bootView.frame.height) return;
            var img = document.createElement("img");
            img.onload = function(){
                var ratio = img.width/img.height;
                var frameRa = v_bootView.frame.width / v_bootView.frame.height;
                if(ratio>frameRa){
                    v_bootImg.setHeight("match");
                    v_bootImg.setWidth("wrap");
                }else{
                    v_bootImg.setHeight("wrap");
                    v_bootImg.setWidth("match");
                }
            }
            img.src = src;
        }
        //根据相册数据渲染页面
        var initApp = function(){
            if(!v_newsLists.panoLists || v_newsLists.panoLists.length<0) return;
            //初始页面
            if(isMobile && newsInfo.features.h5_cover_url){
                createBootImg(newsInfo.features.h5_cover_url);
            }

            //newsList
            var height = parseInt(panoList.height);
                height = height?height+2+"dp":"wrap";
            v_newsLists.setHeight(height);
            if(!v_newsLists.getAdaptor) initList();
            clickPanoList(0);

            //分享
            if(newsInfo.shareInfo){
                shareInfo.title = newsInfo.shareInfo.title;
                shareInfo.desc  = newsInfo.shareInfo.desc;
                shareInfo.img   = newsInfo.shareInfo.imgUrl;
                shareConfig();
            }

            //简介albumInfo albumName
            v_newsIntroTitle.setText(newsInfo.albumName);
            newsInfo.albumInfo = newsInfo.albumInfo.replace(/[\r\n]/g,"<br/>");
            newsInfo.albumInfo = newsInfo.albumInfo.replace(/\s{2}/g,"&nbsp;&nbsp;");
            v_newsIntroCtn.setHtml(newsInfo.albumInfo);
            v_news_title.setText(newsInfo.albumName);
            setDocumentTitle(newsInfo.albumName);

            //newsInfo.features.autoplayflag && newsInfo.features.autoplayflag != "false" &&　
            if(newsInfo.features.music_url){
                util.setOnClick(v_ctl_music,function(){
                    musicCtrlEx();
                    isAudioPlaying = audioIsPlaying();
                })
                //musicAuto
                if(musicAuto){
                    musicCtrlEx("play");
                    window.wxInitCallback = function(){
                        musicCtrlEx("play");
                    }
                }
            }else{
                v_ctl_music.setGone(true);
            }

            //vr
            if(newsInfo.features.vrflag && newsInfo.features.vrflag != "false"){
                util.setOnClick(v_ctl_vr_on,function(){
                    vrCtrlEx(true)
                });
                util.setOnClick(v_ctl_vr_off,function(){
                    vrCtrlEx(false)
                });
            }else{
                v_ctl_vr_on.setGone(true);
            }

            //gravity
            if(newsInfo.features.gravityflag && newsInfo.features.gravityflag != "false"){
                util.setOnClick(v_ctl_gravity,gravityCtrlEx);
            }else{
                v_ctl_gravity.setGone(true);
            }

            if(newsInfo.features.patch_url){//补地
                v_pano.addPatch(newsInfo.features.patch_url, 0, 90, 63, 63);
            }

            //logo
            if(newsInfo.features.logo_url){
                v_newsLogo.setSrc(newsInfo.features.logo_url, function(){
                    var imgWidth = v_newsLogo._nativeView.imgWidth;
                    var imgHeight = v_newsLogo._nativeView.imgHeight;
                    
                    if(imgWidth && imgHeight ){//100 40  2.5   40  100
                        var ratio = imgWidth/imgHeight;
                        var maxWidth = (window.screen.width -230 ) || 100;
                        if(ratio > 1.1){
                            var _ratio = maxWidth/imgWidth;
                            _ratio = Math.min(_ratio, 0.9);

                            v_newsLogo.setWidth("wrap");
                            v_newsLogo.setHeight("match "+_ratio);
                            v_newsLogo.setGravity("centerVertical");
                            // console.log(_ratio)
                        }
                    }
                    // if(isMobile){//移动端
                        // <View id="newsLogoBox" width="wrap" height="40dp" marginLeft="20dp">
                        //     <ImageView id="newsLogo" width="40dp" height="wrap"  gravity="top" gone="true"/>
                        // </View>
                    // }
                    v_newsLogo.setGone(false);
                });
            }
            
            //二维码
            codeHoverEvent();

            closeLoading();
        }
        var audioIsPlaying = function () {
            return (page.audio && (!page.audio.paused));
        }
        var isAudioPlaying = audioIsPlaying();
        var musicCtrlEx = function(tar){
            if(!page.audio){
                page.audio = document.getElementById("audio");
                page.audio.setAttribute("src",newsInfo.features.music_url || "");
            }
            var audio = page.audio;
            if(!newsInfo.features.music_url){
                return;
            }
            //musicCtrlEx
            if(!tar){
                if(audio.paused){
                    tar = "play";
                }else{
                    tar = "pause";
                }
            }
            if(tar == "play"){
                audio.play();
                v_ctl_music.setStatic(1);
            }else if(tar == "pause"){
                audio.pause();
                v_ctl_music.setStatic(0);
            }
        }
        var gravityCtrlEx = function(type){
            if(typeof type == "undefined"){
                type = !v_pano.isGravityOn;
            } 
            if(type){
                v_pano.panoViewInternal.setGravityEnable(true);
                v_ctl_gravity.setStatic(1);
                v_pano.isGravityOn = true;
            }else{
                v_pano.panoViewInternal.setGravityEnable(false);
                autoplay();
                v_ctl_gravity.setStatic(0);
                v_pano.isGravityOn = false;
            }
        }
        var vrCtrlEx = function(type){
            if(typeof type == "undefined"){
                type = !v_pano.isVrOn;
            } 
            if(type){
                v_pano.setVREnable(true);
                gravityCtrlEx(true);
                v_ctl_vr_off.setVisible(true);
                v_panoCtlBox.setVisible(false);
                v_pano.isVrOn = true;
            }else{
                v_pano.setVREnable(false);
                gravityCtrlEx(false);
                v_ctl_vr_off.setVisible(false);
                v_panoCtlBox.setVisible(true);
                v_pano.isVrOn = false;
            }
        }
        var setDocumentTitle = function(title){
            var $body = $('body');  
                document.title= title;  
                var $iframe = $('<iframe src="favicon.ico"><iframe>');  
                    $iframe.on('load',function(){  
                        setTimeout(function(){  
                            $iframe.off('load').remove();  
                        },0);  
                    }).appendTo($body);  
        }
        var autoplay = function(){
            //自动播放
            if(newsInfo.features.autoplayflag && newsInfo.features.autoplayflag != "false"){
                v_pano.panoViewInternal.setAutoplayEnable(true);
            }
        }

        var closeLoading = function(){
            if(!isMobile){
                hidePageLoading();
                enterPano();
                return
            }
            setTimeout(function(){
                hidePageLoading();
                if(newsInfo.features.h5_cover_url){//有背景图
                    setTimeout(function(){
                        startAlphaAnimation(v_bootView, 1, 0, 1000, function(){
                            v_bootView.setVisible(false);
                            enterPano();
                        })
                    },3000);
                }else{
                    setTimeout(function(){
                        v_bootView.setVisible(false);
                        enterPano();
                    },0);
                }
            },800);
        }
        var enterPano = function(){
            startAlphaAnimation(v_panoCtlBox,0,1,500,function(){
                autoplay();
            });
        }
        var eventBind = function(){
            var clickOff = [v_newsCtrl, v_newsBottom, v_newsIntro, v_qrcodeEntrance, v_bootView];
            for(var i in clickOff){
               util.setOnClick(clickOff[i]); 
            }
            util.setOnClick(v_ctl_intro,function(){
                v_panoCtlBox.setVisible(false);
                startAlphaAnimation(v_newsIntro,0,1,200);
            })

            util.setOnClick(v_newsIntroClose,function(){
                if(v_newsIntro.alpha == 1){
                    startAlphaAnimation(v_newsIntro,1,0,200,function(){
                        v_newsIntro.setVisible(false);
                        v_panoCtlBox.setVisible(true);
                    });
                }
            }) 

            util.setOnClick(v_pano,function(){
                if(v_pano.isVrOn) return;
                if(v_panoCtlBox.alpha != 0 && v_panoCtlBox.alpha != 1) return;
                if(v_panoCtlBox.visible){
                    startAlphaAnimation(v_panoCtlBox,1,0,200,function(){
                        v_panoCtlBox.setVisible(false);
                    })
                }else{
                    startAlphaAnimation(v_panoCtlBox,0,1,200)
                }
            })

            //视频
            util.setOnClick(v_video,function(){
                util.createVideoBox(page,{
                    "file_id" : videoId
                },function () {
                    if(isAudioPlaying){
                        musicCtrlEx("play");
                    };
                });
                if(isAudioPlaying){
                    musicCtrlEx("pause");
                }
            });

            //长图介绍
            util.setOnClick(v_picIntro,function(){
                v_picIntroView.setVisible(true);
                v_panoCtlBox.setVisible(false);
                v_picScrollView.setTranslateY(0);
            });
            //长图返回
            util.setOnClick(v_picClose,function(){
                v_picIntroView.setVisible(false);
                v_panoCtlBox.setVisible(true);
            });
            util.setOnClick(v_picIntroView);
        }
        var newsexhibition_extend = function(data){
            if(data.newsintro_enter){//信息介绍文字
                page.$("newsintro_enter").setText(data.newsintro_enter);
            }
            if(data.longImage&&data.longImage!=""){
                v_pic.setSrc(data.longImage);
                v_picIntro.setGone(false);
            }else{
                v_picIntro.setMarginLeft(0);
                v_picIntro.setGone(true);
            }
            // panoMarkers
            if(data.showMarker=="dismiss"){
                panoMarkers={};
            }else{
                panoMarkers = data.markers || {};
            };
            if(data.videoIcon&&data.videoIcon=="show"){
                videoId=data.videoId;
                v_video.setGone(false);
            }else{
                v_video.setMarginLeft(0);
                v_video.setGone(true);
            }



        };

        // var setMta = function(){
        //     httpGet({
        //         url:appStyle.mta+"?albumId="+albumId,
        //         callback:function(e){
        //             if(e.result == 0 ) {
        //                 sid = e.data.sid || "500390819";
        //                 cid = e.data.cid || "500390820"; 
        //                 var mta = $("<script>").attr({
        //                     src:"http://pingjs.qq.com/h5/stats.js?v2.0.2",
        //                     name:"MTAH5",
        //                     sid:sid,
        //                     cid:cid
        //                 });
        //                 mta = mta[0];
        //                 var s = document.getElementsByTagName("script")[0];
        //                 s.parentNode.insertBefore(mta, s);
        //                 mta.onload = function(e) {
        //                     if(typeof(MtaH5) != "undefined"){
        //                         MtaH5.clickStat(albumId);
        //                     }
        //                 }
        //             }
        //         }
        //     });
        // }
        clientLayout();
        eventBind();
        if(albumId){
            // setMta();
            getAlbumInfo(albumId,function(data){
                v_newsLists.panoLists = [];
                createListData(data);
                initApp();
            });
            // httpGet({
            //     url:"http://mob.visualbusiness.cn/newsexhibition-debug/home.bundle/home/data/config.json",
            //     // url:"http://192.168.0.133:8080/examples/config.json",
            //     callback:function(e){
            //         if(e && e.data && e.data[albumId]){
            //             newsexhibition_extend(e.data[albumId]);
            //         }
            //     },
            //     fail:function(e){
            //         console.log("that none");
            //     }
            // })
        }else{
            alert("相册参数错误！");
        }
        return page;
    }
});
