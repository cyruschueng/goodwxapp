require([
    'common/interface',
    'common/util',
    'common/errCode',
    'module/cookie',
    'module/checkForm'
], function (inter, util, errCode, cookie, check) {
    var albumId = util.location().albumId;
    var albumUpdateObject = null;
    getAlbum();
    $("#previousStep").attr("href","mediaRelease_panoSet.html?albumId=" + albumId);
    $(".switch-input").change(function(){
        var type = $(this).attr("name");
        if($(this).is(":checked")){
            if(type == "gravityflag"){
                $("#showGravity").show();
            } else if(type == "vrflag"){
                $("#showVr").show();
            } else if(type == "autoplayflag"){
                panoView.setAutoplayEnable(true);
            }
            $(this).parent().addClass("checked");
        } else {
            if(type == "gravityflag"){
                $("#showGravity").hide();
            } else if(type == "vrflag"){
                $("#showVr").hide();
            } else if(type == "autoplayflag"){
                panoView.setAutoplayEnable(false);
            }
            $(this).parent().removeClass("checked");
        }

    })
    $("#playMusic").click(function(){
        if($("#musicUrl").attr("src")){
            if($("#musicUrl").attr("data-play") == 1){
                $("#musicUrl")[0].pause();
                $("#musicUrl").attr("data-play",0);
                $("#playMusic").attr("src", "../images/play.png");
            } else {
                $("#musicUrl")[0].play();
                $("#musicUrl").attr("data-play",1);
                $("#playMusic").attr("src", "../images/pause.png");
            }
        }
    })
    $(".upload").click (function () {
        this.value = null;
    });
    $(".upload").change(function(event){
        var self = this;
        var type = 'pic';
        var file = event.target.files[0];
        if(!file){
            return;
        }
        if($(this).attr("id") == "uploadAudio"){
            $("#audioName").text(file.name);
            type = 'audio'
        } else {
            if(!/image/.test(file.type)){
                alert("请上传图片");
                return;
            }
        }
        var fileName = $(this).attr("data-file-name");
        fileName = fileName.replace(/\./, Date.parse(new Date())+'.');
        if(!file) {
            return;
        }
        util.uploadToLuna(file, function(url){
            url += '?' + parseInt(100*Math.random());
            $(self).parent(".cover-box").addClass("edit");
            if($(self).parent(".cover-box").hasClass("mobi") || $(self).parent(".cover-box").hasClass("pc")){
                $(self).parent(".cover-box").css("background-image", "url("+url+")");
                $(self).siblings(".preview-img").val(url);
            } else {
                $(self).siblings(".preview-img").attr("src", url);
            }
            if(/logo/i.test($(self).attr("id"))){
                $("#showLogo").attr("src", url).show();
            } else if(/audio/i.test($(self).attr("id"))){
                $("#showMusic").show();
            } else if(/patch/i.test($(self).attr("id"))){
                patch = panoView.addPatch(url, 0, 90, 61, 61);
            }
            /*var obj = $(self)[0]; 
            obj.outerHTML = obj.outerHTML; */
        }, false, type)
    })
    $(".delete").click(function(){
        var coverBox = $(this).parents(".cover-box");
        if(coverBox.hasClass("pc") || coverBox.hasClass("mobi")){
            coverBox.css("background-image", "");
            coverBox.find(".preview-img").val("");
        } else {
            coverBox.find(".preview-img").attr("src", "");
        }
        coverBox.removeClass("edit");
        if($(this).attr("data-type") == "logo"){
            $("#showLogo").hide();
        } else if($(this).attr("data-type") == "music"){
            $("#showMusic").hide();
        } else if($(this).attr("data-type") == "patch"){
            panoView.removePatch(patch)
        }
    })
    $("#save").click(function(){
        saveAlbum(false, function(){
            alert("保存成功");
        });
    })
    $("#release").click(function(){
        saveAlbum(true, function(){
            alert("发布成功");
            location.href = "mediaList.html";
        });
    })
    $("#preview").click(function(){
        var newWindow = window.open('about:blank');
        saveAlbum(false, function(){
            /* 跳到预览页 */
            newWindow.location = preview_root + '?albumId=' + albumId + "&preview=true";
        });
    })

    function initAppEnginer(panoId, features){
        new com.appengine.App(document.getElementById("appContainer"),function(){
            page = new com.appengine.view.Page();
            panoView = new com.appengine.view.PanoView();
            panoView.setPanoId(panoId);
            panoView.setMouseWheelEnable(false);
            page.setWidth("209");
            page.setHeight("372");
            if(features.autoplayflag == "true"){
                panoView.setAutoplayEnable(true);
            }
            if(features.patch_url){
                patch = panoView.addPatch(features.patch_url, 0, 90, 61, 61);
            }
            page.addView(panoView);
            return page;
        });
    }
    function deleteFile(info,callback) {
        var formData = null;
        if(window.FormData) {
            var formData = new FormData();
            formData.append('op','delete');
        }
        var url = 'http://web.file.myqcloud.com/files/v1/'+ info.appId  +'/'+ info.bucketName + info.path;
        $.ajax({
            type: 'post',
            url: url,
            headers: {
                "Authorization": info.signature
            },
            processData: false,
            contentType: false,
            data: formData,
            xhrFields: {
               withCredentials: false
            },
            success: function(data) {
                console.log(data)
            }
        });
    }
    function getAlbum() {
        util.setAjax(inter.getApiUrl().getAlbumUrl, {
             albumId: albumId,
             lang: localStorage.langStr
         }, function (json) {
             if (json.result != "0") {
                $.alert(json.msg);
             } else {
                albumUpdateObject = json.data;
                albumUpdateObject.albumContent = $.parseJSON(albumUpdateObject.albumContent);
                var features = {
                    vrflag: false,
                    gravityflag: false,
                    autoplayflag: false
                };
                albumUpdateObject.albumContent.features = $.extend(features, albumUpdateObject.albumContent.features);
                if(albumUpdateObject.albumContent.panoList && albumUpdateObject.albumContent.panoList.length > 0){
                    var panoId = albumUpdateObject.albumContent.panoList[0].panoId;
                    if(base_mode !== "online"){
                        panoId = '[TT]' + panoId;
                    }
                    initAppEnginer(panoId, albumUpdateObject.albumContent.features);
                }
                renderFeature(albumUpdateObject.albumContent);
             }
         }, function () {
             alert('服务器繁忙，请稍后再试。');
         },"GET");

    }
    function renderFeature(albumContent){
        var features = albumContent.features;
        var switchArr = $(".switch-input");
        for (var i = 0; i < switchArr.length; i++) {
            if(features[switchArr[i].name] == "true"){
                switchArr[i].checked = true;
                $(switchArr[i]).parent().addClass("checked");
            }
        }
        var imgArr = $(".preview-img");
        for (var i = 0; i < imgArr.length; i++) {
            if($(imgArr[i]).attr("name") && features[$(imgArr[i]).attr("name")]){
                if($(imgArr[i]).attr("name") == "pc_cover_url" || $(imgArr[i]).attr("name") == "h5_cover_url"){
                    $(imgArr[i]).val(features[$(imgArr[i]).attr("name")]);
                    $(imgArr[i]).parent().css("background-image", "url(" + features[$(imgArr[i]).attr("name")] + ")");
                } else {
                    $(imgArr[i]).attr("src", features[$(imgArr[i]).attr("name")]);
                }
                $(imgArr[i]).parent().addClass("edit");
            }
        }
        if(features.logo_url){
            $("#showLogo").attr("src", features.logo_url).show();
        }
        if(features.vrflag == "true"){
            $("#showVr").show();
        }
        if(features.gravityflag == "true"){
            $("#showGravity").show();
        }
        if(features.musicUrl){
            $("#showMusic").show;
        }
        var shareInfo = {
            title: '',
            desc: '',
            imgUrl: ''
        };
        $.extend(shareInfo, albumContent.shareInfo);
        $("#shareTitle").val(shareInfo.title);
        $("#shareDesc").val(shareInfo.desc);
        if(shareInfo.imgUrl){
            $("#shareUrl").parent().addClass("edit");
            $("#shareUrl").attr("src", shareInfo.imgUrl);
        }

    }
    function saveAlbum(isRelease, callback) {
        var switchArr = $(".switch-input");
        for (var i = 0; i < switchArr.length; i++) {
            albumUpdateObject.albumContent.features[switchArr[i].name] = '' + switchArr[i].checked;
        }
        var imgArr = $(".preview-img");
        for (var i = 0; i < imgArr.length; i++) {
            if($(imgArr[i]).attr("name")){
                if($(imgArr[i]).attr("name") == "pc_cover_url" || $(imgArr[i]).attr("name") == "h5_cover_url"){
                    albumUpdateObject.albumContent.features[$(imgArr[i]).attr("name")] = $(imgArr[i]).val();
                } else {
                    albumUpdateObject.albumContent.features[$(imgArr[i]).attr("name")] = $(imgArr[i]).attr("src");
                }
            }
        }
        albumUpdateObject.albumContent.shareInfo = {
            title: $("#shareTitle").val(),
            desc: $("#shareDesc").val(),
            imgUrl: $("#shareUrl").attr("src"),
        }
        var data = JSON.stringify({
            albumId: albumUpdateObject.albumId, 
            optVersion: albumUpdateObject.optVersion, 
            albumContent: JSON.stringify(albumUpdateObject.albumContent)
        });
        isRelease = isRelease ? isRelease : false;
        var url = inter.getApiUrl().setAlbumUrl + '?isRelease=' + isRelease;
        util.setAjax(url, data, function (json) {
            if (json.result != "0") {
                $.alert(json.msg);
            } else {
                albumUpdateObject = json.data;
                albumUpdateObject.albumContent = JSON.parse(albumUpdateObject.albumContent);
                if(callback){
                    callback();
                }
            }
        }, function () {
            alert('服务器繁忙，请稍后再试。');
        },"POST");
    }
})