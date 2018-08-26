
$(function () {
    // 初始化插件
    $("#mediaimg").zyUpload({
        width: "100%",                 // 宽度
        height: "200px",                 // 宽度
        itemWidth: "120px",                 // 文件项的宽度
        itemHeight: "100px",                 // 文件项的高度
        url: "/emc/advertisement/item/method/imagesUp.ashx",  // 上传文件的路径
        multiple: false,                    // 是否可以多个文件上传
        dragDrop: false,                    // 是否可以拖动上传文件
        del: true,                    // 是否可以删除文件
        finishDel: false,  				  // 是否在上传文件完成后删除预览
        /* 外部获得的回调接口 */
        onSelect: function (selectFiles, files) {                    // 选择文件的回调方法
            //alert("选择文件");
        },
        onDelete: function (file, files) {                     // 删除一个文件的回调方法
            alert(file);
            alert(files);
        },
        onSuccess: function (file, response) {                    // 文件上传成功的回调方法
            $("#ctl00_PageBody_hfPic").val(response);
        },
        onFailure: function (file) {                    // 文件上传失败的回调方法
            alert("上传失败");
        },
        onComplete: function (responseInfo) {           // 上传完成的回调方法
            //alert("上传完成上传完成");
        },
        onDefaultImg: function () {
            var url = "javascript:void(0)";
            if ($("#ctl00_PageBody_hfPic").val() != "") {
                url = $("#ctl00_PageBody_hfPic").val();
            } else {
                url = "control/images/add_img.png";
            }
            return url;
        }
    });
});

