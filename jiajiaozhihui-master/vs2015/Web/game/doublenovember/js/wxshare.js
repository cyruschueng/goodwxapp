
wx.ready(function () {
    //分享内容
    var shareData = {
        title: '家教智慧100万书法基金，赞助1万个孩子学习书法',
        desc: '家教智慧举办“亲子书法”活动，该活动是基于“书法+移动互联网”的创新理念，致力于打造一场万人书法盛宴',
        link: 'weixin.jiajiaozhihui.cn/start/doublenovember.ashx',
        imgUrl: 'weixin.jiajiaozhihui.cn/images/2015110908163066ea.jpg'
    };

    // 2. 分享接口
    // 2.1 监听“分享给朋友”，按钮点击、自定义分享内容及分享结果接口
    wx.onMenuShareAppMessage(shareData);

    // 2.2 监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口
    wx.onMenuShareTimeline(shareData);

    // 2.3 监听“分享到QQ”按钮点击、自定义分享内容及分享结果接口
    wx.onMenuShareQQ(shareData);

    // 2.4 监听“分享到微博”按钮点击、自定义分享内容及分享结果接口
    wx.onMenuShareWeibo(shareData);

    // 2.5分享到QQ空间
    wx.onMenuShareQZone(shareData);

   // 5.2 图片预览
    $(document).on("click", ".privewimg", function (event) {
        var src = $(this).attr("src");
        var index = src.lastIndexOf("?");
        src = src.substr(0, index);
        wx.previewImage({
            current: src,
            urls: [
                src
              ]
        });
    })

})