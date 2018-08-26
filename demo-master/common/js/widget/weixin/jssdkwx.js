var _data = {};
_data.token = getCookie("token");
_data.url = window.location.href;
_data.come_from = 2;
$.ajax({
    url: site_url + '/wx/getjssdk',
    data: _data,
    type: "GET",
    dataType: "JSON",
    success: function(obj) {
        if (obj.code === 0) {
            wx.config({
                debug: false,
                appId: obj.data.result.appId,
                timestamp: obj.data.result.timestamp,
                nonceStr: obj.data.result.nonceStr,
                signature: obj.data.result.signature,
                jsApiList: [
                    'checkJsApi',
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage',
                    'onSendAppMessage',
                    'onMenuShareQQ',
                    'onMenuShareWeibo',
                    'hideMenuItems',
                    'showMenuItems',
                    'hideAllNonBaseMenuItem',
                    'showAllNonBaseMenuItem',
                    'translateVoice',
                    'startRecord',
                    'stopRecord',
                    'onRecordEnd',
                    'playVoice',
                    'pauseVoice',
                    'stopVoice',
                    'uploadVoice',
                    'downloadVoice',
                    'chooseImage',
                    'previewImage',
                    'uploadImage',
                    'downloadImage',
                    'getNetworkType',
                    'openLocation',
                    'getLocation',
                    'hideOptionMenu',
                    'showOptionMenu',
                    'closeWindow',
                    'scanQRCode',
                    'chooseWXPay',
                    'openProductSpecificView',
                    'addCard',
                    'chooseCard',
                    'openCard'
                ]
            });

        } else {
            mui.toast(JSON.stringify(obj.msg));
        }
    }
});
var img_button = "#img_button"; // 图片按钮
var images = {
    localId: [], // 每一次上传的图片Id
    serverId: [], // 累计的上传的图片serverId
    showlocalId: [] //累计的上传的图片localId
};

var jssdk_title = "";
var jssdk_desc = "";
var jssdk_link = '';
var jssdk_imgUrl = '';
wx.ready(function() {
    wx.onMenuShareAppMessage({
        title: jssdk_title,
        desc: jssdk_desc,
        link: jssdk_link,
        imgUrl: jssdk_imgUrl,
        type: 'link', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: function(res) {
            mui.toast("分享给朋友成功！");
        },
        cancel: function(res) {
            alert('已取消');
        },
        fail: function(res) {
            alert(res.errMsg);
        }
    });
    wx.onMenuShareTimeline({
        title: jssdk_title, // 分享标题
        link: jssdk_link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: jssdk_imgUrl, // 分享图标
        success: function(res) {
            mui.toast("分享给朋友成功！");
        },
        cancel: function(res) {
            alert('已取消');
        },
        fail: function(res) {
            alert(res.errMsg);
        }
    });

    if (document.querySelector(img_button)) {
        document.querySelector(img_button).onclick = function() {
            var count = app.img_upload_count - images.showlocalId.length;
            if (count < 1) {
                mui.toast('不能上传图片了');
                return;
            }

            wx.chooseImage({
                count: count,
                sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
                sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                success: function(res) {
                    app.loadText = '正在上传';
                    app.maskShow = true;

                    images.localId = res.localIds;
                    if (window.__wxjs_is_wkwebview) {
                        $.each(res.localIds, function(i, e) {
                            images.showlocalId.push(e);
                            wx.getLocalImgData({ //循环调用  getLocalImgData
                                localId: e, // 图片的localID
                                success: function(res) {
                                    var localData = res.localData; // localData是图片的base64数据，可以用img标签显示
                                    localData = localData.replace('jgp', 'jpeg'); //iOS 系统里面得到的数据，类型为 image/jgp,因此需要替换一下

                                    app.imgs.push(localData);
                                },
                                fail: function(res) {
                                    mui.toast(JSON.stringify(res));
                                    app.maskShow = false;
                                }
                            });
                        });
                    } else {
                        $.each(res.localIds, function(i, e) {
                            images.showlocalId.push(e);
                            app.imgs.push(e);
                        });
                    }

                    upload_image();
                },
                fail: function(res) {
                    mui.toast(JSON.stringify(res));
                    app.maskShow = false;
                }
            });

        };
    }
    var upload_image = function(localId) {
        if (images.localId.length == 0) {
            mui.toast('请先使用 chooseImage 接口选择图片');
            return;
        }
        var i = 0,
            length = images.localId.length;
        images.serverId = [];

        function upload() {
            wx.uploadImage({
                localId: images.localId[i],
                isShowProgressTips: 0,
                success: function(res) {
                    i++;
                    app.loadText = '已上传：' + i + '/' + length;
                    //mui.toast('已上传：' + i + '/' + length);
                    images.serverId.push(res.serverId);
                    if (i < length) {
                        setTimeout(upload, 600);
                    } else {
                        if (app.upload_type == 1) {
                            mui.toast('请等待上传完成...');
                            app.upload();
                        } else {
                            app.maskShow = false;
                        }
                    }
                },
                fail: function(res) {
                    mui.toast(JSON.stringify(res));
                    app.maskShow = false;
                }
            });
        }
        upload();
    }



});

var previewImg = function() {
    wx.previewImage({
        current: app.current_url, // 当前显示图片的http链接
        urls: app.previewImgs // 需要预览的图片http链接列表
    });
}
