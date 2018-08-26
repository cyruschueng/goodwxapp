$(document).ready(function () {
    var wxconfig = {
        regist: function () {
            $.ajax({
                url: '/game/qzsf/server/RegistWxConfig.ashx',
                type: 'Post',
                dataType: 'JSON',
                data: { 'url': window.location.href },
                success: function (data) {
                   //data = JSON.parse(data);
                    wx.config({
                        debug: false,
                        appId: data.AppId,
                        timestamp: data.Timestamp,
                        nonceStr: data.NonceStr,
                        signature: data.Signature,
                        jsApiList: ['hideOptionMenu', 'chooseImage', 'previewImage', 'uploadImage',
                            'startRecord', 'stopRecord', 'onVoiceRecordEnd', 'playVoice', 'pauseVoice', 'stopVoice', 'onVoicePlayEnd', 'uploadVoice', 'downloadVoice'
                        ]
                    });
                }
            })
        }
    }
    function voice(isStrartRecord) {
        var interval;
        var mask = $('#mask');
        var weuiActionsheet = $('#weui_actionsheet');
        var actionsheet_record = $('#actionsheet_record');
        var actionsheet_voice = $('#actionsheet_voice');
        weuiActionsheet.addClass('weui_actionsheet_toggle');
        mask.show()
                    .focus()
                    .addClass('weui_fade_toggle').one('click', function () {
                    });
        actionsheet_voice.text("开始录音");
        $('#actionsheet_cancel').one('click', function () {
            hideActionSheet(weuiActionsheet, mask);
            voiceProvide.stopRecordVoice();
            voiceProvide.clear();
        });
        actionsheet_voice.off('click').on('click', function () {
            if (voiceProvide.isStrartRecord == true) {
                hideActionSheet(weuiActionsheet, mask);
                showVoiceMenu(true, true);
                voiceProvide.stopRecordVoice();
            } else {
                voiceProvide.startRecordVoice();
                actionsheet_record.show();
                $(this).text("完成");
                interval = setInterval(function () {
                    if (voiceProvide.isVoiceComplete == true) {
                        clearInterval(interval);
                        hideActionSheet(weuiActionsheet, mask);
                        showVoiceMenu(true, true);
                    }
                }, 500);
            }
        });
        mask.unbind('transitionend').unbind('webkitTransitionEnd');
        function hideActionSheet(weuiActionsheet, mask) {
            weuiActionsheet.removeClass('weui_actionsheet_toggle');
            mask.removeClass('weui_fade_toggle');
            mask.on('transitionend', function () {
                mask.hide();
            }).on('webkitTransitionEnd', function () {
                mask.hide();
            })
            actionsheet_record.hide();
            if (interval != null || interval != undefined) {
                clearInterval(interval);
            }
            $("#footerMenu").show();
        };
        var showVoiceMenu = function (isStrartRecord, isVoiceComplete) {
            var btnStartRecordVoice = $("#voicerecord");
            var btnTestPlayVoice = $("#voicetry");
            if (isStrartRecord == false) {
                btnStartRecordVoice.show();
                btnTestPlayVoice.hide();
            }
            if (isStrartRecord == true && isVoiceComplete == true) {
                btnStartRecordVoice.hide();
                btnTestPlayVoice.show();
            }
        };
        jssdk.events(function () {
            voiceProvide.isVoiceComplete = true;
        });
        var voiceProvide = {
            isVoiceComplete: false,
            isStrartRecord: false,
            seVoiceEmpty: true,

            startRecordVoice: function () {
                jssdk.voice.startRecord(function () {
                    voiceProvide.isStrartRecord = true;

                });
            },
            stopRecordVoice: function () {
                jssdk.voice.stopRecord(function () {
                    voiceProvide.isStrartRecord = false;
                })
            },
            clear: function () {
                jssdk.clearVoiceData();
                isStrartRecord = false;
                isVoiceComplete = false;
            },
            testPlayVoice: function () {
                jssdk.voice.playVoice();
            },
            initVoiceState: function () {
                isVoiceComplete = false;
                isStrartRecord = false;
                seVoiceEmpty = true;
            }
        }
    }
    var provide = {
        save: function (imageMediaId, voiceMediaId) {
            var openId = $("#hfOpenID").val();
            var resume = $("#resume").val();
            var owner = $("#owner input:radio:checked").val();
            if (openId == "oc6zzswh64UXKqMdmhCqGBrBpe9k" || openId=="oc6zzs1y_A_7RgGi6EGLBUrPCfRk") {
                var c = { 'openId': '' + openId + '', 'resume': '' + resume + '', 'owner': '' + owner + '', 'imageMediaId': '' + imageMediaId + '', 'voiceMediaId': '' + voiceMediaId + '' };
                alert(JSON.stringify(c));
            }
            $.ajax({
                url: './server/uploadIII.ashx',
                type: 'POST',
                dataType: 'json',
                data: { 'openId': '' + openId + '', 'resume': '' + resume + '', 'owner': '' + owner + '', 'imageMediaId': '' + imageMediaId + '', 'voiceMediaId': '' + voiceMediaId + '' },
                beforeSend: function () {
                    //$.showLoading();
                },
                complete: function () {
                    $.hideLoading();
                },
                success: function (data) {
                    if (data.code == 0) {
                        //window.location.href = $("#hfInfoUrl").val();
                    } else {
                        alert("上传失败，请重试");
                    }
                }
            })
        },
        checkData: function () {
            var content = $("#resume").val();
            if ($.trim(content) == "") {
                alert("请填入你的感想");
                return false;
            } else if ($.trim(content).length < 5) {
                alert("感想至少5个字");
                return false;
            }
        }
    }
    wxconfig.regist();
    var jssdk = new jsSdk();

    $("#chooseImage").click(function () {
        jssdk.clearImageData();
        jssdk.image.chooseImage(function (rec) {
            $("#previewImage").attr("src", rec[0]);
            $("#chooseImage").hide();
        });
    });
    $("#previewImage").click(function () {
        jssdk.image.chooseImage();
    })
    $("#uploadImage").click(function () {
        if (provide.checkData() == false) return;
        $.showLoading();
        jssdk.image.uploadImage(function (imageServerId) {
            if (imageServerId == "") {
                $.hideLoading();
                alert("请选择要上传的作品！");
                return false;
            }
            jssdk.voice.uploadVoice(function (voiceServerId) {
                provide.save(imageServerId, voiceServerId);
            })
        });
    })
    $("#btnVoice").click(function () {
        voice();
        $("#footerMenu").hide();
    })
    $("#btnTestVoice").click(function () {
        jssdk.voice.playVoice();
        $("#footerMenu").hide();
    });
    $("#btnTryRecordVoice").click(function () {
        voice();
    })
});


