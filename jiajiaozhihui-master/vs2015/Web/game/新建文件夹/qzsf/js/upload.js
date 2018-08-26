(function () {
    var $btnLoadUpFile = $("#fileupload");
    var imgBase64, imgSize, imgName;
    $btnLoadUpFile.change(function () {
        lrz(this.files[0], {}, function (results) {
            console.log(results);
            var $prodiv = $("#pro-div");
            if ($prodiv) {
                $prodiv.remove();
            }
            imgBase64 = results.base64;
            imgSize = results.base64.length;
            imgName = results.origin.name;

//            if (imgSize > 5120) {
//                alert("上传失败，文件过大，请上传小于5M的图片");
//                return;
            //            }

            $("#previewImage").attr("src", results.base64);
            $("#prompt").css("display", "none");
        })
    });
    var $previewImage = $("#previewImage");
    $previewImage.click(function () {
        $btnLoadUpFile.click();
    });

    var uploadImage = $("#uploadImage");
    uploadImage.click(function () {
        if (Check.Perfect() == false) { return }
        if (Check.Image() == false) { return }
        if (Check.Resume() == false) { return }
        if (Check.SelectBook() == false) { return }
        if (Check.BookPage() == false) { return }
        //发送到后端
        var xhr = new XMLHttpRequest();
        var data = {
            base64: imgBase64,
            size: imgSize, // 校验用，防止未完整接收
            name: imgName,
            folder: $("#hfOpenID").val(),
            resume: $("#resume").val(),
            owner: $("#owner input:radio:checked").val(),
            bookname: $("#bookname button").text(),
            pagenumber: $("#pageindex").val()
        };
        xhr.open('POST', './server/upload.ashx?action=uploadImg', true);
        xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                if (xhr.response != 0) {
                    var result = eval("(" + xhr.response.toString() + ")");
                    alert(result.msg);
                    if (result.code == 0) {
                        alert("ok");
                    }
                }
            }
        };
        xhr.send(JSON.stringify(data)); // 发送base64
    })
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
    Check.Image = function () {
        var value = $("#previewImage").attr("src");
        if (value == "") {
            alert("请选择作品");
            return false;
        }
    }
})()