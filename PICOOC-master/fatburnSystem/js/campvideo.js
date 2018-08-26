$(function () {
    // 获取运动视频基础数据
    var aurl = baseUrl + 'v1/api/campScheme/getAll';
    getActList(1, 10, aurl, '');
    getCamoVideoBase();
    uploadImgToOSS();
    VideoList(1, 10, '');
    AudioList(1, 10, '');
    function getCamoVideoBase() {
        $.ajax({
            url: baseUrl + '/v1/api/campVideo/videoBasic',
            type: 'GET',
            dataType: "json",
            jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
            jsonpCallback: "flightHandler",
            success: function (result) {
                if (result.code == 200) {
                    var data = result.resp.data;
                    // console.log(data);
                    for (var i = 0; i < data.length; i++) {
                        // 难度
                        if (data[i].type == 1) {
                            var troubleStr = '<label><input type="radio" name="trouble" value="' + data[i].id + '"/>' + data[i].name + '</label>&emsp;';
                            $('.trouble').append(troubleStr);
                        }
                        // 动作类型
                        if (data[i].type == 2) {
                            var actStr = '<label><input type="radio" name="actclass" value="' + data[i].id + '"/>' + data[i].name + '</label>&emsp;';
                            $('.actclass').append(actStr);
                            $('.actionType').append(actStr);
                        }
                        // 主要锻炼结构
                        if (data[i].type == 3 && data[i].parentId == 0) {
                            var bodyStr = '<label><input type="radio" name="VbodyMain" value="' + data[i].name + '" data-type="' + data[i].type + '" data-id="' + data[i].id + '"/>' + data[i].name + '</label>&emsp;';
                            $('.VbodyMain').append(bodyStr);
                        }
                        // 锻炼结构
                        if (data[i].type == 3 && data[i].parentId == 0) {
                            var bodyStr = '<label><input type="checkbox" value="' + data[i].name + '" data-type="' + data[i].type + '" data-id="' + data[i].id + '"/>' + data[i].name + '</label>&emsp;';
                            $('.Vbody').append(bodyStr);
                        }
                        // 主要锻炼部位
                        if (data[i].type == 6 && data[i].parentId != 0) {
                            var partStr = '<label><input type="radio" name="VpartMain" value="' + data[i].name + '" data-type="' + data[i].type + '" data-id="' + data[i].id + '"/>' + data[i].name + '</label>&emsp;';
                            $('.VpartMain').append(partStr);
                        }
                        // 锻炼部位
                        if (data[i].type == 6 && data[i].parentId != 0) {
                            var partStr = '<label><input type="checkbox" value="' + data[i].name + '" data-type="' + data[i].type + '" data-id="' + data[i].id + '"/>' + data[i].name + '</label>&emsp;';
                            $('.Vpart').append(partStr);
                        }
                        // 工具
                        if (data[i].type == 4) {
                            var toolStr = '<label><input type="checkbox" value="' + data[i].name + '" data-type="' + data[i].type + '" data-id="' + data[i].id + '"/>' + data[i].name + '</label>';
                            $('.tool').append(toolStr);
                        }
                        // 禁忌
                        if (data[i].type == 5) {
                            var forbidStr = '<label><input type="checkbox" value="' + data[i].name + '" data-id="' + data[i].id + '" data-type="' + data[i].type + '"/>' + data[i].name + '</label>';
                            $('.forbid').append(forbidStr);
                        }
                    }
                    $('.VbodyMain input').on('click', function () {
                        for (var i = 0; i < $('.VbodyMain input').length; i++) {
                            if ($('.VbodyMain input')[i].checked) {
                                $('.Vbody input').removeAttr('checked').eq(i).attr('checked', 'checked');
                            }
                        }
                    });
                    $('.VpartMain input').on('click', function () {
                        for (var i = 0; i < $('.VpartMain input').length; i++) {
                            if ($('.VpartMain input')[i].checked) {
                                $('.Vpart input').removeAttr('checked').eq(i).attr('checked', 'checked');
                            }
                        }
                    });
                }
            },
            error: function (data) {
                console.log('啊哦，您的网络不太给力~');
            }
        });
    };
    // 保存
    $('.Vsave').unbind('click').click(function () {
        var id = $(this).attr('data-id');
        saveVideo(id);
    });
    // 编辑保存视频
    // $('.Vsave').unbind('click').click(function(){
    //     saveVideo('VsaveEdit');
    // });
    $('.Asave').unbind('click').click(function () {
        var id = $(this).attr('data-id');
        saveAudio(id);
    });
    //  保存视频
    function saveVideo(videoId) {
        var videoName = $('#videoname').val();//视频名称
        var actionType = $('.actionType input:checked').val()
        var actionTypes = parseInt(actionType);
        var body = $('.Vbody input');//身体结构
        var bodyMain = $('.VbodyMain input:checked').attr('data-id');
        var bodyMains = parseInt(bodyMain);
        var checkBody = [];
        for (var k = 0; k < body.length; k++) {
            var obj1 = {};
            if (body[k].checked) {
                obj1['name'] = $(body[k]).attr('value');
                obj1['type'] = $(body[k]).attr('data-type');
                obj1['id'] = $(body[k]).attr('data-id');
                checkBody.push(obj1);
            }
        };
        var partMain = $('.VpartMain input:checked').attr('data-id');
        var partMains = parseInt(partMain);
        var checkPart = [];
        var part = $('.Vpart input:checked');//身体部位
        for (var i = 0; i < part.length; i++) {
            var obj2 = {};
            if (part[i].checked) {
                obj2['name'] = $(part[i]).attr('value');
                obj2['type'] = $(part[i]).attr('data-type');
                obj2['id'] = $(part[i]).attr('data-id');
                checkPart.push(obj2);
            }
        }
        var videoUrl = $('#addvideoList div').html();//视频路劲
        var videoImg = $('#addimgList img').attr('src');//头图路劲
        var sex = $('.sexban input:checked').attr('data-index');//男版、女版
        var sexs = parseInt(sex);
        var direction = $('.direction input:checked').val();//方向
        var actionCount = $('.actionCount input:checked').val();//动作次数
        var actionCounts = parseInt(actionCount);
        var unit = $('.actionUnit input:checked').val();//单位
        var units = parseInt(unit);
        var vdata = {
            "name": videoName,
            "body": checkBody,
            'actionType': actionTypes,
            "part": checkPart,
            "videoUrl": videoUrl,
            "videoImg": videoImg,
            "sex": sexs,
            'direction': direction,
            'bodyMain': bodyMains,
            'partMain': partMains,
            "actionCount": actionCounts,
            "unit": units,
            'videoId': videoId
        };
        
        var videoData = JSON.stringify(vdata);
        console.log(videoData);
        if (videoName == '') {
            swal('请填写视频名称或上传视频');
            return false;
        }
        if (videoUrl == '') {
            swal('请上传视频');
            return false;
        }
        if (videoImg == '') {
            swal('请上传缩略图');
            return false;
        }
        if (typeof sex == 'undefined') {
            swal('请选择试用版本');
            return false;
        }
        if (typeof actionType == 'undefined') {
            swal('请选择动作类型');
            return false;
        }
        if (checkBody.length == 0) {
            swal('请选择锻炼结构');
            return false;
        }
        if (typeof bodyMain == 'undefined') {
            swal('请选择主要锻炼结构');
            return false;
        }
        if (checkPart.length == 0) {
            swal('请选择锻炼部位');
            return false;
        }
        if (typeof partMain == 'undefined') {
            swal('请选择主要锻炼部位');
            return false;
        }
        if (typeof actionCount == 'undefined') {
            swal('请选择动作个数');
            return false;
        }
        if (typeof unit == 'undefined') {
            swal('请选择动作单位');
            return false;
        } else {
            swal({
                title: "确认保存？",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "confirm",
                closeOnConfirm: '取消'
            },
                function () {
                    $.ajax({
                        url: baseUrl + "v1/api/campVideo/operateVideo" + "?token=" + token + "&roleId=" + roleId,
                        type: 'POST',
                        data: videoData,
                        jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
                        jsonpCallback: "flightHandler",
                        dataType: 'json',
                        contentType: 'application/json',
                        success: function (result) {
                            if (result.code == 200) {
                                window.close();
                                localStorage.setItem('PageId', '2')
                                window.open('actManager.html', '_blank');
                            }
                        },
                        error: function (data) {
                            console.log('啊哦，您的网络不太给力~');
                        }
                    });
                });
        }
    }
    //  保存音频
    function saveAudio(audioId) {
        var audioName = $('#audioName').val();//音频名称
        var audioType = $('.audioType input:checked').val();
        var audioTypes = parseInt(audioType);//音频类型
        var audioUrl = $('#addAudioList div').html();//音频路劲
        var Adata = {
            'name': audioName,
            'audioType': audioTypes,
            'audioUrl': audioUrl,
            'audioId': audioId
        };
        var AudioData = JSON.stringify(Adata);
        if (audioName == '' || audioName == null) {
            swal('请编辑音频名称或上传音频');
            return false;
        }
        if (audioUrl == '' || audioUrl == null) {
            swal('请上传音频');
            return false;
        }
        if (typeof audioType == 'undefined') {
            swal('请选择音频类型');
            return false;
        }
        else {
            swal({
                title: "确认保存？",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "confirm",
                closeOnConfirm: '取消'
            },
                function () {
                    $.ajax({
                        url: baseUrl + "v1/api/campVideo/operateAudio" + "?token=" + token + "&roleId=" + roleId,
                        type: 'POST',
                        jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
                        jsonpCallback: "flightHandler",
                        dataType: 'json',
                        contentType: 'application/json',
                        data: AudioData,
                        success: function (result) {
                            if (result.code == 200) {
                                window.close();
                                localStorage.setItem('PageId', '3');
                                window.open('actManager.html', '_blank');
                            }
                        },
                        error: function (data) {
                            console.log('啊哦，您的网络不太给力~');
                        }
                    });
                });

        }
    };
    // 视频列表
    function VideoList(pageNow, pageSize, videoName) {
        $.ajax({
            url: baseUrl + "v1/api/campVideo/findVideos" + "?token=" + token + "&pageNow=" + pageNow + "&pageSize=" + pageSize + "&name=" + videoName + "&roleId=" + roleId,
            type: 'GET',
            dataType: "json",
            jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
            jsonpCallback: "flightHandler",
            success: function (result) {
                if (result.code == 200) {
                    $('.VideoCount').text(result.resp.totalCount);
                    var str = '';
                    var dataList = result.resp.records;
                    $('.Videolistshow').html('');
                    if (dataList.length > 0) {
                        for (var i = 0; i < dataList.length; i++) {
                            if (dataList[i].id == null) {
                                dataList[i].id = "";
                            }
                            if (dataList[i].name == null) {
                                dataList[i].name = "";
                            }
                            if (dataList[i].duration == null) {
                                dataList[i].duration = '';
                            }
                            if (dataList[i].videoUrl == null) {
                                dataList[i].videoUrl = '';
                            }
                            if (dataList[i].fileSize == null) {
                                dataList[i].fileSize = "";
                            }
                            if (dataList[i].createTime == null) {
                                dataList[i].createTime = "";
                            }
                            if (dataList[i].videoImg == null) {
                                dataList[i].videoImg = '';
                            }
                            if (dataList[i].sex == null) {
                                dataList[i].sex = "";
                            }
                            else if (dataList[i].sex == 0) {
                                dataList[i].sex = "女生版";
                            }
                            else if (dataList[i].sex == 1) {
                                dataList[i].sex = "男生版";
                            }
                            if (dataList[i].body == null) {
                                dataList[i].body = "";
                            }
                            if (dataList[i].part == null) {
                                dataList[i].part = '';
                            }

                            if (dataList[i].partMain == 21) {
                                dataList[i].partMain = "颈";
                            }
                            else if (dataList[i].partMain == 22) {
                                dataList[i].partMain = "肩";
                            }
                            else if (dataList[i].partMain == 23) {
                                dataList[i].partMain = "胸";
                            }
                            else if (dataList[i].partMain == 24) {
                                dataList[i].partMain = "背";
                            }
                            else if (dataList[i].partMain == 25) {
                                dataList[i].partMain = "臂";
                            }
                            else if (dataList[i].partMain == 26) {
                                dataList[i].partMain = "腰";
                            }
                            else if (dataList[i].partMain == 27) {
                                dataList[i].partMain = "腹";
                            }
                            else if (dataList[i].partMain == 28) {
                                dataList[i].partMain = "臀";
                            }
                            else if (dataList[i].partMain == 29) {
                                dataList[i].partMain = "腿";
                            }
                            if (dataList[i].bodyMain == 17) {
                                dataList[i].bodyMain = "上肢";
                            }
                            else if (dataList[i].bodyMain == 18) {
                                dataList[i].bodyMain = "核心";
                            }
                            else if (dataList[i].bodyMain == 19) {
                                dataList[i].bodyMain = "下肢";
                            }
                            else if (dataList[i].bodyMain == 20) {
                                dataList[i].bodyMain = "全身";
                            }
                            if (dataList[i].actionCount == null) {
                                dataList[i].actionCount = "";
                            }
                            else if (dataList[i].unit == 0) {
                                dataList[i].unit = "次";
                            }
                            else if (dataList[i].unit == 1) {
                                dataList[i].unit = "秒";
                            };
                            /*结构*/
                            var bbody = dataList[i].body.split(',');
                            //    dataList[i].body = dataList[i].body.split(',');
                            for (var j = 0; j < bbody.length; j++) {
                                if (bbody[j] == 17) {
                                    bbody[j] = "上肢";
                                }
                                else if (bbody[j] == 18) {
                                    bbody[j] = "核心";
                                }
                                else if (bbody[j] == 19) {
                                    bbody[j] = "下肢";
                                }
                                else if (bbody[j] == 20) {
                                    bbody[j] = "全身";
                                }
                            }
                            var bbodyList = bbody.join();
                            var partArr = dataList[i].part.split(',');
                            for (var j = 0; j < partArr.length; j++) {
                                /*部位*/
                                if (partArr[j] == 21) {
                                    partArr[j] = "颈";
                                }
                                else if (partArr[j] == 22) {
                                    partArr[j] = "肩";
                                }
                                else if (partArr[j] == 23) {
                                    partArr[j] = "胸";
                                }
                                else if (partArr[j] == 24) {
                                    partArr[j] = "背";
                                }
                                else if (partArr[j] == 25) {
                                    partArr[j] = "臂";
                                }
                                else if (partArr[j] == 26) {
                                    partArr[j] = "腰";
                                }
                                else if (partArr[j] == 27) {
                                    partArr[j] = "腹";
                                }
                                else if (partArr[j] == 28) {
                                    partArr[j] = "臀";
                                }
                                else if (partArr[j] == 29) {
                                    partArr[j] = "腿";
                                }
                            }
                            str = '<tr>' +
                                '<td>' + dataList[i].id + '</td>' +
                                '<td>' + dataList[i].name + '</td>' +
                                '<td>' + dataList[i].duration / 1000 + '秒</td>' +
                                '<td>' + dataList[i].fileSize + '</td>' +
                                '<td><a href=' + dataList[i].videoUrl + ' target="_blank">查看</a></td>' +
                                '<td><a href=' + dataList[i].videoImg + ' target="_blank">查看</a></td>' +
                                '<td>' + dataList[i].createTime + '</td>' +
                                '<td>' + dataList[i].sex + '</td>' +
                                '<td>' + dataList[i].bodyMain + '(' + bbodyList + ')' + '</td>' +
                                '<td>' + dataList[i].partMain + '(' + partArr.join() + ')' + '</td>' +
                                '<td>' + dataList[i].actionCount + '</td>' +
                                '<td>' + dataList[i].unit + '</td>' +
                                '<td><button data-index=' + dataList[i].id + ' class="editVideo">编辑</button>&emsp;<button class="delVideo" data-index=' + dataList[i].id + ' data-flag=' + dataList[i].flag + '>删除</button></td></tr>';
                            $('.Videolistshow').append(str);

                        };
                    }
                    if (result.resp.pageCount > result.resp.pageNow) {
                        $("#VideoListAfter").css("background-color", "green");
                        $("#VideoListAfter").unbind("click").click(function () {
                            VideoList(result.resp.pageNow + 1, 10, videoName);;
                        });
                    } else {
                        $("#VideoListAfter").css("background-color", "#ccc");
                        $("#VideoListAfter").unbind("click");
                    }
                    if (result.resp.pageNow > 1) {
                        $("#VideoListBefore").css("background-color", "green");
                        $("#VideoListBefore").unbind("click").click(function () {
                            VideoList(result.resp.pageNow - 1, 10, videoName);
                        });
                    } else {
                        $("#VideoListBefore").css("background-color", "#ccc");
                        $("#VideoListBefore").unbind("click");
                    }
                    $('.editVideo').unbind('click').click(function () {

                        var id = $(this).attr('data-index');
                        //  alert(id);
                        localStorage.setItem('videoId', JSON.stringify(id));
                        window.open('editVideo.html', '_blank');
                    });
                    var url = baseUrl + 'v1/api/campVideo/operateVideo';
                    $('.delVideo').unbind('click').click(function () {
                        console.log(url);
                        var id = parseInt($(this).attr('data-index'));
                        // var flag = parseInt($(this).attr('data-flag'));
                        var data = {
                            'videoId': id,
                            'flag': 1
                        }
                        var nowData = JSON.stringify(data);
                        delList(nowData, $(this), url);
                    });
                } else if (data.result.code == 30000) {
                    window.location.href = 'index.html';//超时，跳转到登录页面；
                } else {
                    swal(result.message);
                }
            },
            error: function (data) {
                console.log(data);

                console.log('啊哦，您的网络不太给力~');
            }
        });
    };
    // 音频列表
    function AudioList(pageNow, pageSize, audioName) {
        $.ajax({
            url: baseUrl + "v1/api/campVideo/findAudios" + "?token=" + token + "&pageNow=" + pageNow + "&pageSize=" + pageSize + "&name=" + audioName + "&roleId=" + roleId,
            type: 'GET',
            dataType: "json",
            jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
            jsonpCallback: "flightHandler",
            success: function (result) {
                if (result.code == 200) {
                    var dataList = result.resp.records;
                    $('.AudioCount').text(result.resp.totalCount);
                    $('.Audiolistshow').html('');
                    if (dataList.length > 0) {
                        for (var i = 0; i < dataList.length; i++) {
                            if (dataList[i].id == null) {
                                dataList[i].id = "";
                            }
                            if (dataList[i].name == null) {
                                dataList[i].name = "";
                            }
                            else if (dataList[i].audioType == 1) {
                                dataList[i].audioType = "背景音乐";
                            }
                            else if (dataList[i].audioType == 2) {
                                dataList[i].audioType = "动作状态";
                            }
                            else if (dataList[i].audioType == 3) {
                                dataList[i].audioType = "数字";
                            }
                            else if (dataList[i].audioType == 4) {
                                dataList[i].audioType = "动作";
                            }
                            else if (dataList[i].audioType == 5) {
                                dataList[i].audioType = "动作单位";
                            }
                            if (dataList[i].duration == null) {
                                dataList[i].duration = '';
                            }
                            if (dataList[i].audioUrl == null) {
                                dataList[i].audioUrl = '';
                            }
                            if (dataList[i].fileSize == null) {
                                dataList[i].fileSize = "";
                            }
                            if (dataList[i].createTime == null) {
                                dataList[i].createTime = "";
                            }
                            var str = '<tr>' +
                                '<td>' + dataList[i].id + '</td>' +
                                '<td data-type=' + dataList[i].audioType + '>' + dataList[i].audioType + '</td>' +
                                '<td>' + dataList[i].name + '</td>' +
                                '<td>' + dataList[i].duration / 1000 + '秒</td>' +
                                '<td><a href=' + dataList[i].audioUrl + ' target="_blank">查看</a></td>' +
                                '<td>' + dataList[i].fileSize + '</td>' +
                                '<td>' + dataList[i].createTime + '</td>' +
                                '<td><button data-index=' + dataList[i].id + ' class="editAudio">编辑</button>&emsp;<button class="delAudio" data-index=' + dataList[i].id + ' data-flag=' + dataList[i].flag + '>删除</button></td></tr>';
                            $('.Audiolistshow').append(str);
                        }
                    }
                    if (result.resp.pageCount > result.resp.pageNow) {
                        $("#AudioListAfter").css("background-color", "green");
                        $("#AudioListAfter").unbind("click").click(function () {
                            AudioList(result.resp.pageNow + 1, 10, audioName);;
                        });
                    } else {
                        $("#AudioListAfter").css("background-color", "#ccc");
                        $("#AudioListAfter").unbind("click");
                    }
                    if (result.resp.pageNow > 1) {
                        $("#AudioListBefore").css("background-color", "green");
                        $("#AudioListBefore").unbind("click").click(function () {
                            AudioList(result.resp.pageNow - 1, 10, audioName);
                        });
                    } else {
                        $("#AudioListBefore").css("background-color", "#ccc");
                        $("#AudioListBefore").unbind("click");
                    }
                    $('.editAudio').unbind('click').click(function () {
                        var id = $(this).attr('data-index');
                        localStorage.setItem('audioId', JSON.stringify(id));
                        window.open('editAudio.html', '_blank');
                    });
                    var url = baseUrl + 'v1/api/campVideo/operateAudio';
                    $('.delAudio').unbind('click').click(function () {
                        var id = parseInt($(this).attr('data-index'));
                        // var flag = parseInt($(this).attr('data-flag'));
                        var data = {
                            'audioId': id,
                            'flag': 1
                        }
                        var nowData = JSON.stringify(data);
                        delList(nowData, $(this), url);
                    });
                } else if (data.result.code == 30000) {
                    window.location.href = 'index.html';//超时，跳转到登录页面；
                } else {
                    swal(result.message);
                }
            },
            error: function (data) {
                console.log(data);
                console.log('啊哦，您的网络不太给力~');
            }
        });
    };
    // 动作管理
    $('.firstMenu4').unbind('click').click(function () {
        $('.firstMenu span').removeClass('active');
        $(this).children().addClass('active');
        $('.specialRight,.right,.middle,common').hide();
        $('.actManager').show();
        // $('.newAdd').hide();
    });

    $('.activeMan').unbind('click').click(function () {
        window.open('actManager.html', '_blank');
    });
    // 切换动作库
    $('.storePro>span').unbind('click').click(function () {
        var _this = $(this);
        $(this).addClass('active3').siblings().removeClass('active3');
        $(".storeProC").hide().eq(_this.index()).show();
        $('.newAdd').hide();
        VideoList(1, 10, '');
        AudioList(1, 10, '');
        var url = baseUrl + 'v1/api/campScheme/getAll'
        getActList(1, 10, url, '');
    });

    $('.dlVideo').unbind('click').click(function () {
        $('#videoname').val('');
        $('.videolist div').html('');
    });
    $('.dlAudio').unbind('click').click(function () {
        $('.audiolist div').html('');
        $('#audioName').val('');
    });
    $('.dlimg').unbind('click').click(function () {
        $('.imglist').empty();
    });
    // 清空编辑视频页
    // function clearEditVideo(){
    //     $('#videoname').val('');//视频名称
    //     $('.actionType input:checked').removeAttr('checked');//动作类型
    //     $('.VbodyMain input').removeAttr('checked');//身体结构
    //     $('.VpartMain input').removeAttr('checked');//身体部位
    //     $('.Vbody input').removeAttr('checked');//身体结构
    //     $('.Vpart input').removeAttr('checked');//身体部位
    //     $('#addvideoList').html('');//视频路劲
    //     $('#addimgList').empty();//头图路劲
    //     $('.sexban input').removeAttr('checked').eq(0).attr('checked','checked');//男版、女版
    //     $('.actionCount input').removeAttr('checked').eq(0).attr('checked','checked');//动作次数
    //     $('.actionUnit input:checked').removeAttr('checked');//单位
    // }
    // 清空编辑音频页
    // function clearEditAudio(){
    //     $('#audioName').val('');//音频名称
    //     $('.audioType input:checked').removeAttr('checked');//音频类型
    //     $("#addAudioList").empty();
    // }
    // 清空编辑动作页
    // function clearEditAct(){
    //     $('#actname').val('');//名称
    //     $('.tice input:checked').removeAttr('checked');//体测
    //     $('.actclass input:checked').removeAttr('checked');//动作类型
    //     $('.trouble input:checked').removeAttr('checked');//难度
    //     $('.forbid input').removeAttr('checked');//禁忌
    //     $('.tool input').removeAttr('checked');//工具
    //     $('.gap input').val('');//间歇时长
    //     $('.pergroup input').val('');//重复次数
    //     $('.points textarea').val('');//动作要点
    //     $('.videoN input').val('');//视频
    //     $('.audioN input').val('');//音频
    //     $('.remark textarea').val('');//呼吸说明
    //     $('.searchVideoList').empty();
    //     $('.searchAudioList').empty();
    // }
    $('.editAudio').unbind('click').click(function () {
        editAudio(id);
    });
    // 删除视频与音频
    function delList(nowData, ele, url) {
        swal({
            title: "是否删除",
            type: "",
            showCancelButton: true,
            closeOnConfirm: false,
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            animation: "slide-from-top",
            inputPlaceholder: ""
        },
            function (isConfirm) {
                if (isConfirm) {
                    $.ajax({
                        url: url + "?token=" + token + "&roleId=" + roleId,
                        data: nowData,
                        type: 'post',
                        dataType: "json",
                        jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
                        contentType: 'application/json',
                        jsonpCallback: "flightHandler",
                        success: function (result) {
                            if (result.code == 200) {
                                swal("Deleted!", "", "success");
                                ele.parents('tr').remove();
                            }
                            else{
                                swal("Deleted!", "", "fail");
                            }
                        }
                    })
                } else {
                    swal("failed", "Your imaginary file is safe :)", "error");
                }
            });

    };
    // 添加动作
    function saveAct(id) {
        var name = $('#actname').val();//名称
        var actionType = $('.actclass input:checked').val();
        var actionTypes = parseInt(actionType);//动作类型
        var level = $('.trouble input:checked').val();
        var levels = parseInt(level);//难度
        var forbid = $('.forbid input');//禁忌
        var checkForbid = [];
        for (var i = 0; i < forbid.length; i++) {
            var obj1 = {};
            if (forbid[i].checked) {
                obj1['name'] = $(forbid[i]).attr('value');
                obj1['type'] = parseInt($(forbid[i]).attr('data-type'));
                obj1['id'] = parseInt($(forbid[i]).attr('data-id'));
                checkForbid.push(obj1);
            }
        };
        var detailEquipments = $('.tool input');//工具
        var checkDetailEquipments = [];
        for (var j = 0; j < detailEquipments.length; j++) {
            var obj2 = {};
            if (detailEquipments[j].checked) {
                obj2['name'] = $(detailEquipments[j]).attr('value');
                obj2['type'] = parseInt($(detailEquipments[j]).attr('data-type'));
                obj2['id'] = parseInt($(detailEquipments[j]).attr('data-id'));
                checkDetailEquipments.push(obj2);
            }
        };
        var gap = $('.gap input').val();//间歇时长
        var pergroup = $('.pergroup input').val();
        var pergroups = parseInt($('.pergroup input').val());//重复次数
        var points = $('.points textarea').val();//动作要点
        var ppoint = $.trim(points).split("\n");
        var HTMLpoint = '';
        var HTMLpointLi = '';
        if ($.trim(points).length != 0 && points != '') {
            for (var i = 0; i < ppoint.length; i++) {
                HTMLpointLi += '<li style="list-style:none">' + ppoint[i] + '</li>'
            }
            HTMLpoint += '<ul><li style="list-style-type:none;margin-left:-20px;">动作要点：</li>' + HTMLpointLi + '</ul>'
            console.log(HTMLpoint);
        }
        //视频
        var video = {
            videoId: parseInt($('.videoN input').attr('data-id')),
            name: $('.videoN input').val(),
            duration: $('.videoN input').attr('data-duration'),
            fileSize: $('.videoN input').attr('data-fileSize')
        };
        //音频
        var audio = {
            audioId: parseInt($('.audioN input').attr('data-id')),
            name: $('.audioN input').val(),
            duration: $('.audioN input').attr('data-duration'),
            fileSize: $('.audioN input').attr('data-fileSize')
        };
        var bodyTest = $('.tice input:checked').val();
        var bodyTests = parseInt(bodyTest);//体测
        var remark = $('.remark textarea').val();//呼吸说明
        var premark = $.trim(remark).split('\n');
        var HTMLremark = '';
        var HTMLremarkLi = '';
        if ($.trim(remark).length != 0 && remark != '') {
            for (var i = 0; i < premark.length; i++) {
                HTMLremarkLi += '<li>' + premark[i] + '</li>'
            }
            HTMLremark += '<ul><li style="list-style-type:none;margin-left:-20px;">呼吸说明：</li>' + HTMLremarkLi + '</ul>'
            console.log(HTMLremark);
        }
        var description = '<!DOCTYPE html>' +
            '<html lang="en">' +
            '<body>' + HTMLpoint + HTMLremark
        '</body></html>';
        console.log(description);
        var actData = {
            'name': name,
            'actionType': actionTypes,
            'level': levels,
            'taboo': checkForbid,
            'detailEquipments': checkDetailEquipments,
            'gap': gap,
            'pergroup': pergroups,
            'points': points,
            'remark': remark,
            'video': video,
            'audio': audio,
            'description': description,
            'bodyTest': bodyTests,
            'id': id
        }
        var actDATA = JSON.stringify(actData);

        if (name == '' || name == null) {
            swal('请编辑动作名称');
            return false;
        }
        if (video.name == '' || video.name == null) {
            swal('请编辑视频名称');
            return false;
        }
        if (audio.name == '' || audio.name == null) {
            swal('请编辑音频名称');
            return false;
        }
        if (typeof bodyTest == 'undefined') {
            swal('请选择是否体测');
            return false;
        }
        if (typeof actionType == 'undefined') {
            swal('请选择动作类型');
            return false;
        }
        if (typeof level == 'undefined') {
            swal('请选择难度');
            return false;
        }
        // if(checkForbid.length == 0){
        //     swal('请选择禁忌');
        //     return false;
        // }
        if (pergroup == null || pergroup == '') {
            swal('请填写重复次数');
            return false;
        }
        if (gap == '' || gap == null) {
            swal('请填写间歇时长');
            return false;
        }
        if ($.trim(points).length > 300) {
            swal('动作要点最多输入300个字');
            return false;
        }
        if ($.trim(remark).length > 300) {
            swal('呼吸说明最多输入300个字');
            return false;
        }
        else {
            swal({
                title: "确认保存？",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "confirm",
                closeOnConfirm: '取消'
            },
                function () {
                    $.ajax({
                        url: baseUrl + 'v1/api/campScheme/updateAction' + "?token=" + token + "&roleId=" + roleId,
                        type: 'POST',
                        data: actDATA,
                        dataType: 'json',
                        jsonp: 'callback',
                        jsonpCallback: 'flightHandler',
                        contentType: 'application/json',
                        success: function (result) {
                            if (result.code == 200) {
                                window.close();
                                localStorage.setItem('PageId', '1')
                                window.open('actManager.html', '_blank');
                            }
                        },
                        error: function (data) {
                            console.log('啊哦，您的网络不太给力~');
                        }
                    });
                });
        }
    };
    // 新增动作-视频联想
    $('.videoN input').unbind('input').on('input', function () {
        var url = baseUrl + 'v1/api/campVideo/findVideos?pageNow=1&pageSize=10'
        var name = $(this).val();
        $('.searchVideoList').empty().show();
        getAction(url, name, $('.searchVideoList'));
    });
    // .on('blur',function(){
    //     $('.searchVideoList').hide();
    // });
    // 新增动作-音频联想
    $('.audioN input').unbind('input').on('input', function () {
        var url = baseUrl + 'v1/api/campVideo/findAudios?pageNow=1&pageSize=10'
        var name = $(this).val();
        $('.searchAudioList').empty().show();
        getAction(url, name, $('.searchAudioList'));
    });
    // .on('blur',function(){
    //     $('.searchAudioList').hide();
    // });
    // 保存动作
    $('.Dsave').unbind('click').click(function () {
        var id = $(this).attr('data-id');
        saveAct(id);
    });
    // 视频筛选
    $('.videoSX').unbind('click').click(function () {
        var videoName = $(this).siblings('input').val();
        VideoList(1, 10, videoName);
    })
    // 音频筛选
    $('.audioSX').unbind('click').click(function () {
        var audioName = $(this).siblings('input').val();
        AudioList(1, 10, audioName);
    })
    // 动作筛选
    $('.actSX').unbind('click').click(function () {
        var actName = $(this).siblings('input').val();
        var url = baseUrl + 'v1/api/campScheme/action';
        getActList(1, 10, url, actName);

    });
    // 动作库的视频与音频联想
    function getAction(url, name, ele) {
        $.ajax({
            url: url + '&name=' + name + '&token=' + token + '&roleId=' + roleId,
            type: 'get',
            dataType: 'json',
            jsonp: 'callback',
            jsonpCallback: 'flightHandler',
            contentType: 'application/json',
            success: function (result) {
                if (result.code == 200) {
                    var data = result.resp.records;
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].name == null) {
                            data[i].name == '';
                        }
                        var str = '<li data-id=' + data[i].id + ' data-duration=' + data[i].duration + ' data-fileSize=' + data[i].fileSize + ' data-actionType=' + data[i].actionType + '>' + data[i].name + '</li>';
                        $(ele).append(str);
                    }
                    $('.searchVideoList li').unbind('click').on('click', function () {
                        var name = $(this).text();
                        var id = $(this).attr('data-id');
                        var duration = $(this).attr('data-duration');
                        var actionTypeId = $(this).attr('data-actionType');
                        var fileSize = $(this).attr('data-fileSize');
                        $(ele).siblings('input').val(name).attr('data-id', id).attr('data-duration', duration).attr('data-fileSize', fileSize);
                        $(ele).hide();
                        var actionType = $('.actclass input');
                        console.log(actionType);
                        for (var i = 0; i < actionType.length; i++) {
                            console.log($(actionType[i]).val());
                            if ($(actionType[i]).val() == actionTypeId) {
                                $(actionType[i]).attr('checked', 'checked');
                            }
                        }
                    });
                    $('.searchAudioList li').unbind('click').on('click', function () {
                        var name = $(this).text();
                        var id = $(this).attr('data-id');
                        var duration = $(this).attr('data-duration');
                        var fileSize = $(this).attr('data-fileSize');
                        $(ele).siblings('input').val(name).attr('data-id', id).attr('data-duration', duration).attr('data-fileSize', fileSize);
                        $(ele).hide();
                    });
                }
            }

        });
    };
    // 获取动作库列表以及模糊筛选
    function getActList(pageNow, pageSize, url, actData) {
        $.ajax({
            url: url + "?token=" + token + "&pageNow=" + pageNow + "&pageSize=" + pageSize + "&name=" + actData + "&roleId=" + roleId,
            type: 'get',
            dataType: 'json',
            jsonp: 'callback',
            jsonpCallback: 'flightHandler',
            contentType: 'application/json',
            success: function (result) {
                if (result.code == 200) {
                    var str = '';
                    // window.location.href = 'actManager.html';
                    $('.actCount').text(result.resp.totalCount);
                    $('.actListShow').html('');
                    var data = result.resp.records;
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].id == null) {
                            data[i].id = '';
                        }
                        if (data[i].actionType == null) {
                            data[i].actionType = '';
                        }
                        else if (data[i].actionType == 1) {
                            data[i].actionType = '热身';
                        }
                        else if (data[i].actionType == 2) {
                            data[i].actionType = '无氧';
                        }
                        else if (data[i].actionType == 3) {
                            data[i].actionType = '有氧';
                        }
                        else if (data[i].actionType == 4) {
                            data[i].actionType = '拉伸';
                        }
                        if (data[i].name == null) {
                            data[i].name = '';
                        }
                        if (data[i].level == null) {
                            data[i].level = '';
                        }
                        else if (data[i].level == 5) {
                            data[i].level = 'A';
                        }
                        else if (data[i].level == 6) {
                            data[i].level = 'B';
                        }
                        else if (data[i].level == 7) {
                            data[i].level = 'C';
                        }
                        else if (data[i].level == 8) {
                            data[i].level = 'D';
                        }
                        if (data[i].pergroup == null) {
                            data[i].pergroup = '';
                        }
                        if (data[i].gap == null) {
                            data[i].gap = '';
                        }
                        if (data[i].detailEquipments == null) {
                            data[i].detailEquipments = '';
                        }
                        if (data[i].points == null) {
                            data[i].points = '';
                        }
                        if (data[i].remark == null) {
                            data[i].remark = '';
                        }
                        if (data[i].video == null) {
                            data[i].video = '';
                        }
                        if (data[i].audio == null) {
                            data[i].audio = '';
                        }
                        if (data[i].duration == null) {
                            data[i].duration = '';
                        }
                        if (data[i].createTime == null) {
                            data[i].createTime = '';
                        }
                        var detailEqs = data[i].detailEquipments.split(',');
                        for (var m = 0; m < detailEqs.length; m++) {
                            if (detailEqs[m] == 9) {
                                detailEqs[m] = '哑铃';
                            }
                            else if (detailEqs[m] == 10) {
                                detailEqs[m] = '瑜伽垫';
                            }
                            else if (detailEqs[m] == 11) {
                                detailEqs[m] = '弹力带';
                            }
                        }
                        var tabooList = data[i].taboo.split(',');
                        for (var n = 0; n < tabooList.length; n++) {
                            if (tabooList[n] == 12) {
                                tabooList[n] = '大基数';
                            }
                            else if (tabooList[n] == 13) {
                                tabooList[n] = '生理期';
                            }
                            else if (tabooList[n] == 14) {
                                tabooList[n] = '上肢损伤';
                            }
                            else if (tabooList[n] == 15) {
                                tabooList[n] = '下肢损伤';
                            }
                            else if (tabooList[n] == 16) {
                                tabooList[n] = '核心损伤';
                            }
                        }
                        var str = '<tr>' +
                            '<td>' + data[i].id + '</td>' + //编号
                            '<td>' + data[i].actionType + '</td>' + //动作类型
                            ' <td>' + data[i].name + '</td>' +//名称
                            '<td>' + data[i].level + '</td>' +//难度
                            '<td>' + tabooList.join() + '</td>' +//禁忌
                            '<td>' + data[i].pergroup + '</td>' +//重复次数
                            '<td>' + data[i].gap / 1000 + '秒' + '</td>' +//间歇时长
                            '<td>' + detailEqs.join() + '</td>' +//工具
                            '<td>' + data[i].duration / 1000 + '秒' + '</td>' +//动作时长
                            '<td>' + data[i].createTime + '</td>' +//创建时间
                            '<td><button class="actEdit" data-id="' + data[i].id + '">编辑</button>&emsp;<button class="delAct" data-id="' + data[i].id + '">删除</button></td>'
                            + '</tr>';
                        $('.actListShow').append(str);
                    }
                    if (result.resp.pageCount > result.resp.pageNow) {
                        $("#actListAfter").css("background-color", "green");
                        $("#actListAfter").unbind("click").click(function () {
                            var aurl = baseUrl + 'v1/api/campScheme/getAll';
                            getActList(result.resp.pageNow + 1, 10, aurl, '');;
                        });
                    } else {
                        $("#actListAfter").css("background-color", "#ccc");
                        $("#actListAfter").unbind("click");
                    }
                    if (result.resp.pageNow > 1) {
                        $("#actListBefore").css("background-color", "green");
                        $("#actListBefore").unbind("click").click(function () {
                            var aurl = baseUrl + 'v1/api/campScheme/getAll';
                            getActList(result.resp.pageNow - 1, 10, aurl, '');
                        });
                    } else {
                        $("#actListBefore").css("background-color", "#ccc");
                        $("#actListBefore").unbind("click");
                    }
                    $('.delAct').unbind('click').click(function () {
                        var id = parseInt($(this).attr('data-id'));
                        var url = baseUrl + 'v1/api/campScheme/deleteAction';
                        var nowData = JSON.stringify(data);
                        delAct(id, $(this));
                    });
                    $('.actEdit').unbind('click').click(function () {
                        window.open('editActive.html', '_blank');
                        var actionId = $(this).attr('data-id');
                        localStorage.setItem('actionId', JSON.stringify(actionId));

                    });

                }
            }

        });
    };

    // 删除动作
    function delAct(id, ele) {
        swal({
            title: "是否删除",
            // text: "Write something interesting:",
            type: "",
            showCancelButton: true,
            closeOnConfirm: false,
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            animation: "slide-from-top",
            inputPlaceholder: ""
        },
            function (isConfirm) {
                if (isConfirm) {
                    $.ajax({
                        url: baseUrl + 'v1/api/campScheme/deleteAction?id=' + id,
                        type: 'delete',
                        dataType: 'json',
                        contentType: 'application/json',
                        success: function (result) {
                            if (result.code == 200) {
                                ele.parents('tr').remove();
                                swal("Deleted!", "", "success");
                            }
                            else{
                                swal("Deleted!", "", "fail");
                            }
                        }
                    });

                } else {
                    swal("failed", "Your imaginary file is safe :)", "error");
                }
            });

    }
});