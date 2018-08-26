$(function () {
    $("#year table tr td").click(function () {
        var v = $(this).text();
        $("#year button").text(v);
    })
    $("#month table tr td").click(function () {
        var v = $(this).text();
        $("#month button").text(v);
    })
    $("#day table tr td").click(function () {
        var v = $(this).text();
        $("#day button").text(v);
    })

    $("#btnSubmit").click(function () {
        if (Additioninfo.TestingSex() == false) {
            alert("请选择性别");
            return;
        }
        if (Additioninfo.TestingBirthday() == false) {
            alert("请选择出生年月");
            return;
        }
        if (Additioninfo.TestingNickName() == false) {
            alert("请输入别名");
            return;
        }
        Additioninfo.Submit();
    });

    var sex = $("#hfSex");
    if (sex.val() != "") {
        $("input:radio[value='" + sex.val() + "']").iCheck('check')
    }
    var birthday = $("#hfBirthday");
    if (birthday.val() != "") {
        var data = eval("(" + birthday.val() + ")");
        $("#year button").text(data.year + "年");
        $("#month button").text(data.month + "月");
        $("#day button").text(data.day + "日");
    }
    var alias = $("#hfAlias");

    if (alias.val() != "") {

        var data = eval("(" + alias.val() + ")");
        $("#nickname").val(data.alias);
        $("input:radio[value='" + data.isalias + "']").iCheck('check')
    }
})
function Additioninfo() {

}
Additioninfo.TestingSex = function () {
    var selected = $("input:radio[name='sex']:checked").val();
    if (selected == undefined) {
        return false
    }
    return true;
}
Additioninfo.TestingBirthday = function () {
    var year = $("#year button").text();
    if (isNaN(parseInt(year))) {
        return false;
    }
    var month = $("#month button").text();
    if (isNaN(parseInt(month))) {
        return false;
    }
    var day = $("#day button").text();
    if (isNaN(parseInt(day))) {
        return false;
    }
    return true;
}
//如果选择启用别名，那么别名一定要填写
Additioninfo.TestingNickName = function () {
    var selected = $("input:radio[name='IsAlias']:checked").val();
    var v = $("#nickname").val();
    if (selected == 1 && v == "") {
        return false;
    }
}
Additioninfo.Submit = function () {
    var openid = $("#hfOpenID").val();
    var sex = $("input:radio[name='sex']:checked").val();
    var year = $("#year button").text();
    var month = $("#month button").text();
    var day = $("#day button").text();
    var nickname = $("#nickname").val();
    var isalias = $("input:radio[name='IsAlias']:checked").val();

    $.ajax({
        url: "./server/additioninfo.ashx",
        type: "POST",
        dataType: "json",
        beforeSend: function () {
            toast.show("数据处理中");
        },
        complete: function () {
            toast.hide();
        },
        data: { 'openid': '' + openid + '', 'sex': '' + sex + '', 'year': '' + year + '', 'month': '' + month + '', 'day': '' + day + '', 'nickname': '' + nickname + '', 'isalias': '' + isalias + '', 'method': 'edit' },
        success: function (data) {
            if (!$.isEmptyObject(data)) {
                if (data.code == 0) {
                    if ($("#hfFrom").val() == "normal") {
                        window.location.href = "/game/qzsf/info-user.aspx?id=76";
                    } else {
                        window.location.href = "/game/qzsf/partin.aspx?id=76";
                    }
                }
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            location.href = "error.html";
        }
    })
}
var toast = {
    that: $('#loadingToast'),
    hide: function () {
        this.that.hide();
    },
    show: function () {
        this.that.show();
    }
};

