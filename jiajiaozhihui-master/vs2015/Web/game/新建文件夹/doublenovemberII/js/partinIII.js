$(document).ready(function () {
    initImg();
    $("#chooseImage").click(function () {
        $("#FileContent").click();
    });
    $("#previewImage").click(function () {
        $("#FileContent").click();
    });
    $("#bookname a").click(function () {
        var values = $(this).text();
        $("#bookname button").text(values);
    });
    $("#uploadImage").click(function () {
        
        var base64 = sessionStorage.getItem("imgdata");
        if (Check.Perfect() == false) {
            return
        } else {
            if (!sessionStorage.getItem("imgdata")) {
                alert("请选择要上传的作品");
                return;
            }
        }
        if (Check.Resume() == false) { return }
        if (Check.SelectBook() == false) { return }
        if (Check.BookPage() == false) { return }
        upload(base64);
    })
});
function initImg() {
    if (typeof FileReader === 'undefined') {
        $("#previewImage").attr("alt", "抱歉，你的浏览器不支持 显示图片");
    }
    sessionStorage.clear();
    $("#FileContent").localResizeIMG({
        width: 500,
        quality: 0.8,
        success: function (result) {
            var submitData = {
                base64_string: result.clearBase64
            };
            var base64 = submitData.base64_string;
            var $previewImage = $("#previewImage");
            $("#prompt").html("");
            $previewImage.attr("src", "data:image/jpeg;base64," + base64);
            sessionStorage["imgdata"] = base64
        }
    })
}
function upload(imgData){
    var folder = $("#hfOpenID").val(),
        resume = $("#resume").val(),
        owner = $("#owner input:radio:checked").val(),
        bookname = $("#bookname button").text(),
        pagenumber = $("#pageindex").val();
    $.ajax({
        url: '/game/doublenovemberII/server/uploadIII.ashx',
        type: 'POST',
        dataType: 'json',
        data: { 'folder': '' + folder + '', 'resume': '' + resume + '', 'owner': '' + owner + '', 'bookname': '' + bookname + '', 'pagenumber': pagenumber, 'imgdata': imgData },
        beforeSend: function () {
            $("#cover").show();
        },
        complete: function () {
            $("#cover").hide();
        },
        success: function (data) {
            if (data.code == 0) {
                window.location.href = $("#hfInfoUrl").val();
            } else {
                alert("上传失败，请重试");
                sessionStorage.clear();
                $("#previewImage").attr("src","");
            }
        }
    })
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
