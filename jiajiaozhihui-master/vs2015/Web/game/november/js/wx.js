
wx.ready(function () {
    // 1 判断当前版本是否支持指定 JS 接口，支持批量判断
    
    $("#checkJsApi").click(function(){
	wx.checkJsApi({
            jsApiList: [
        'getNetworkType',
        'previewImage'
      ],
            success: function (res) {
                alert(JSON.stringify(res));
            }
        });
    });
    var images = {
        localId: [],
        serverId: []
    };
    $("#chooseImage").click(function () {
        wx.chooseImage({
            success: function (res) {
                images.localId = res.localIds;
                alert('已选择 ' + res.localIds.length + ' 张图片');
            }
        });
    });
    
});

wx.error(function (res) {
    alert(res.errMsg);
});