(function ($) {
    var wxconfig = {
        regist: function () {
            $.ajax({
                url: '/game/qzsf/server/RegistWxConfig.ashx',
                type: 'Post',
                dataType: 'JSON',
                data: { 'url': window.location.href },
                success: function (data) {
                    wx.config({
                        debug: false,
                        appId: data.AppId,
                        timestamp: data.Timestamp,
                        nonceStr: data.NonceStr,
                        signature: data.Signature,
                        jsApiList: ['hideOptionMenu', 'chooseImage', 'previewImage', 'uploadImage']
                    });
                }
            })
        }
    }
    var provide = {
        save: function (imageMediaId) {
            var openId = $("#hfOpenID").val();
            var name = $("#name").val();
            var telephone = $("#telephone").val();
            $.ajax({
                url: './server/agreement.ashx',
                type: 'POST',
                dataType: 'json',
                data: { 'openId': '' + openId + '', 'name': '' + name + '', 'telephone': '' + telephone + '', 'imageMediaId': '' + imageMediaId + '' },
                beforeSend: function () {
                    //$.showLoading();
                },
                complete: function () {
                    $.hideLoading();
                },
                success: function (data) {
                    if (data.code == 0) {
                        $("#uploadImage").text("上传完成").addClass("disabled");
                        alert("上传完成");
                    } else {
                        alert("上传失败，请重试");
                    }
                }
            })
        },
        checkData: function () {
            var name = $("#name").val();
            var telephone = $("#telephone").val();
            if ($.trim(name) == "") {
                alert("请填入你姓名");
                return false;
            }
            if ($.trim(telephone).length < 11) {
                alert("请填入你的电话号码");
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
        jssdk.clearImageData();
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
            provide.save(imageServerId);
        });
    })

})(jQuery)