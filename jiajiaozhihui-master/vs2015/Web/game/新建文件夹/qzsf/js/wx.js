
wx.ready(function () {

    var images = {
        localId: [],
        serverId: []
    };
    // 选择图片
    $(document).on("click", "#chooseImage", function (event) {
        //$("#chooseImage").click(function () {
        wx.chooseImage({
            success: function (res) {
                images.localId = res.localIds;
                $("#previewImage").attr("src", images.localId[0]);
                $("#prompt").css("display", "none");
            }
        });
    });
    // 上传图片
    $(document).on("click", "#uploadImage", function (event) {
        //$("#uploadImage").click(function () {
        if (Check.Perfect() == false) { return }
        if (Check.Resume() == false) { return }
        if (Check.SelectBook() == false) { return }
        if (Check.BookPage() == false) { return }
        if (images.localId.length == 0) {
            $("#promptModal .modal-body").text("请先选择图片");
            $("#promptModal").modal("show");
            return;
        }
        var i = 0, length = images.localId.length;
        images.serverId = [];
        upload(length);
    });

    var imageNum = 0;
    //上传至微信服务器
    function upload(length) {
        wx.uploadImage({
            localId: images.localId[imageNum],
            isShowProgressTips: 1, // 默认为1，显示进度提示
            success: function (res) {
                imageNum++;
                images.serverId.push(res.serverId);
                uploadServer(res.serverId);
            },
            fail: function (res) {
                alert("error:" + JSON.stringify(res));
            }
        });
    }
    //上传到服务器
    function uploadServer(mediaId) {
        var bookName = $("#bookname button").text();
        var pageNumber = $("#pageindex").val();
        $.ajax({
            url: "./server/partin.ashx",
            type: "POST",
            dataType: "json",
            data: { 'folder': '' + $("#hfOpenID").val() + '', 'resume': '' + $("#resume").val() + '', 'mediaId': '' + mediaId + '', 'owner': '' + $("#owner input:radio:checked").val() + '', 'bookname': '' + bookName + '', 'pagenumber': pageNumber },
            beforeSend: function () {
                $("#cover").css("display", "block");
            },
            complete: function () {
                $("#cover").css("display", "none");
            },
            success: function (data) {
                images.localId = [];
                images.serverId = [];
                var uploadAlert = new UploadAlert();
                if (jQuery.isEmptyObject(data)) {
                    window.location.href = $("#hfInfoUrl").val();
                } else {
                    alert(data.message + "(" + data.code + ")" + " 上传失败,请调整图片的大小(建议不要超过1M 文件格式jpg)或在良好的网络环境下上传");
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                $("#modal-net-exception").modal('show');
            }
        });
    }
})
wx.error(function (res) {
    alert(res.errMsg);
});

function UploadAlert(){
    this.template = '<div class="alert @alert_type alert-dismissible upload-prompt" role="alert">'
                            +'<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>'
                            + '<strong>@alert_title!</strong>@alert_content'
                            +'</div>';

};
UploadAlert.prototype.alertWarning = function () {
    var result = this.template.replace("@alert_type", "alert-danger")
                            .replace("@alert_title", "提示")
                            .replace("@alert_content", "上传失败！");
    return result;
};
UploadAlert.prototype.alertSuccess = function () {
    var result = this.template.replace("@alert_type", "alert-danger")
                            .replace("@alert_title", "提示")
                            .replace("@alert_content", "上传成功！");
    return result;
}
function Check() { };
Check.Resume = function () {
    if ($("#resume").val() == "" || $("#resume").val().length < 5) {
        alert("请写入你的感想，不要小于5字");
        $("#resume").focus();
        return false;
    }
}
Check.SelectBook = function () {
    var value = $("#bookname button").text();
    if (value == "---书名---") {
        alert("请选择书名");
        return false;
    }
}
Check.BookPage = function () {
    var value = $("#pageindex").val();
    if (value == "") {
        alert("请输入页码");
        return false;
    } else if (isNaN(value)) {
        alert("页码不正确，只能输入数字");
        return false;
    } else if (parseInt(value) < 1) {
        alert("页码不正确，请输入大小或等于1的页码！");
        return false;
    }
}
//检查资料是不是完善
Check.Perfect = function () {
    var value = $("#prompt a").text();
    if (value == "完善资料") {
        alert("请先完善资料");
        return false;
    }
}