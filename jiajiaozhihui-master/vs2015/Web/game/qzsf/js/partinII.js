$(document).ready(function () {
    initUploadForm();
});

$("#chooseImage").click(function () {
    $("#FileContent").click();
});

$("#uploadImage").click(function () {
    if (Check.Perfect() == false) {
        return
    } else {
        if (Check.FileNull() == false) {
            return
        }
    }
    if (Check.Resume() == false) { return }
    if (Check.SelectBook() == false) { return }
    if (Check.BookPage() == false) { return }
    $('#uploadForm').submit();
});
$('input[name=FileContent]').change(function () {
    var input = $("#FileContent");
    if (typeof FileReader === 'undefined') {
        $("#previewImage").attr("alt", "抱歉，你的浏览器不支持 显示图片");
    }
    var file = this.files[0];
    if (!/image\/\w+/.test(file.type)) {
        alert("文件必须为图片！");
        var obj = document.getElementById('FileContent');
        obj.outerHTML = obj.outerHTML;
        return false;
    }
    if (file.size > 2048000) {
        $("#prompt").html("<strong>提示：</strong><span style='color:#f00'>文件大于2M,建议文件大小不要超出2M，便于上传</span>");
    } else {
        $("#prompt").html("");
    }
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (e) {
        var $previewImage = $("#previewImage");
        $previewImage.attr("src", this.result);
    }
    initUploadForm();
});
$("#bookname a").click(function () {
    var values = $(this).text();
    $("#bookname button").text(values);
});
function initUploadForm() {
    // 请将以下获取签名的链接换成您部署好的服务端http url
    // 建议通过业务登陆态检查来增强安全性，避免签名被非法获取
    var timestamp = new Date().getTime();
    $.getJSON('/game/doublenovemberII/server/getsignv.ashx?type=sign&timestamp=' + timestamp, function (data) {
        var sign = data.sign,
		    url = 'http://web.image.myqcloud.com/photos/v2/10010590/doublenove/0' + '?sign=' + encodeURIComponent(sign);
        var options = {
            type: 'post',
            url: url,
            dataType: 'json',
            beforeSend: function () {
                //$("#modal-progress").modal('show');
                $("#cover").show();
            },
            complete: function () {
                //$("#modal-progress").modal('hide');
                $("#cover").hide();
            },
            success: function (ret) {
                if (ret.code == 0) {
                    $("#FileContent").val("");
                    saveFile(ret.data.fileid, ret.data.download_url);
                } else {
                    $("#FileContent").val("");
                    alert("上传失败，请重试。。。");
                }
            },
            error: function (ret) {
                alert(ret.responseText);
            }
        };
        $('#uploadForm').ajaxForm(options);
    });
}
function saveFile(fileId, url) {
    var folder = $("#hfOpenID").val(),
        resume = $("#resume").val(),
        owner = $("#owner input:radio:checked").val(),
        bookname = $("#bookname button").text(),
        pagenumber = $("#pageindex").val();
    $.ajax({
        url: '/game/doublenovemberII/server/partinII.ashx',
        type: 'POST',
        dataType: 'json',
        data: { 'folder': '' + folder + '', 'resume': '' + resume + '', 'owner': '' + owner + '', 'bookname': '' + bookname + '', 'pagenumber': pagenumber, 'fileid': '' + fileId + '', 'url': '' + url + '' },
        success: function (data) {
            if ($.isEmptyObject(data)) {
                window.location.href = $("#hfInfoUrl").val();
            } else {
                alert("数据保存失败");
            }
        }
    });
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
Check.FileNull = function () {
    var value = $("#FileContent").val();
    if (value == "") {
        alert("请选择作品");
        return false;
    }
}
/*
wx.ready(function () {
    // 选择图片
    $(document).on("click", "#chooseImage", function (event) {
        wx.chooseImage({
            count: 1,
            sizeType: ['compressed'],
            sourceType: ['album', 'camera'],
            success: function (res) {
                var localIds = res.localIds;
                $("#previewImage").attr("src", images.localId[0]);
                $("#FileContent").val(images.localId[0]);
                $("#prompt").css("display", "none");
            }
        });
    });
})
*/