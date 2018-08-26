
wx.ready(function () {
    //分享内容
    var shareData = {
        title: '家教智慧万人书法行动，一点小坚持，人生大变化',
        desc: '家教智慧举办“亲子书法”活动，该活动是基于“书法+移动互联网”的创新理念，致力于打造一场万人书法盛宴',
        link: 'http://weixin.jiajiaozhihui.cn/start/doublenovember3.ashx?weixinid=' + $("#hfWeixinID").val(),
        imgUrl: 'http://weixin.jiajiaozhihui.cn/images/2015110908163066ea.jpg'
    };

    // 2. 分享接口
    // 2.1 监听“分享给朋友”，按钮点击、自定义分享内容及分享结果接口
    wx.onMenuShareAppMessage(shareData);

    // 2.2 监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口
    wx.onMenuShareTimeline(shareData);


    // 5.2 图片预览
    $(document).on("click", ".privewimg", function (event) {
        var src = $(this).attr("src");
        var index = src.lastIndexOf("?");
        src = src.substr(0, index);
        src = src + '?imageView2/2/w/1000';
        wx.previewImage({
            current: src,
            urls: [
                src
              ]
        });
    })
    wx.getLocation({
        success: function (res) {
            
            $.ajax({
                url: "./server/index.ashx",
                type: "POST",
                dataType: "json",
                data: { 'openid': '' + $("#hfOpenID").val() + '', 'latitude': '' + res.latitude + '', 'longitude': '' + res.longitude + '', 'method': 'location' },
                success: function (data) {

                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {

                }
            });
        },
        cancel: function (res) {
            
        }
    });
})