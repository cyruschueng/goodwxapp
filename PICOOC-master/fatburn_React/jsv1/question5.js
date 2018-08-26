$(function () {
    // var orderId = 100102;
    var result = getCookie("question5" + orderId) == null ? "" : getCookie("question5" + orderId);
    console.info(result);

    getQuestion(5, "radio", result);
    if (getParamByUrl('sex') == 0) {
        $(".nextBtn1").show();
        $(".nextBtn2").hide();
        $(".container").css("minHeight", $(window).height() + "px");
        $(".nextBtn1").unbind("click").bind("click", function () {
            if ($(".active").length == 0) {
                $(".pointAlert").css("display", "block");
                $(".pointAlert").text("请选择答案~");
                setTimeout(function () {
                    $(".pointAlert").css("display", "none");
                }, 2000);
            }
            else {
                var radioResult = parseInt($(".active").attr("value"));
                console.info(radioResult);
                setCookie("question5" + orderId, radioResult, 30);
                var resultText = $("#textContent").val();
                setCookie("question5Text" + orderId, resultText, 30);
                //将答案存储
                saveResult("radio");
                window.location.href = "question6.html" + window.location.search;
            }
        });
        //标题设置
        appNoShare("问题 5/6");
    }
    else {
        $(".nextBtn1").hide();
        $(".nextBtn2").show();
        $(".container").css("minHeight", $(window).height() + "px");
        $(".nextBtn2").unbind("click").bind("click", function () {
            if ($(".active").length == 0) {
                $(".pointAlert").css("display", "block");
                $(".pointAlert").text("请选择答案~");
                setTimeout(function () {
                    $(".pointAlert").css("display", "none");
                }, 2000);
            }
            else {
                var radioResult = parseInt($(".active").attr("value"));
                console.info(radioResult);
                setCookie("question5" + orderId, radioResult, 30);
                var resultText = $("#textContent").val();
                setCookie("question5Text" + orderId, resultText, 30);
                //将答案存储
                saveResult("radio");
                pushQuestionResult();
            }
        });
        //标题设置
        appNoShare("问题 5/5");
    }
    $(".preBtn").unbind("click").bind("click", function () {
        window.location.href = 'question4.html'+location.search;
        // history.back(-1);
        /*closePage(1);*/
    });

    leftControl(true, false);
});

function pushQuestionResult() {
    var targetRoleId = getParamByUrl("roleId");
    var host = window.location.protocol + "//" + window.location.host;
    var finalUrl = host + "/v1/api/campQuestion/question" + window.location.search;
    //questionResult = JSON.parse(questionResult);
    console.info(questionResult);
    $.ajax({
        type: "post",
        data: questionResult,
        url: finalUrl,
        dataType: "json",
        contentType: 'application/json',
        success: function (data) {
            if (data.code == 200) {
                closeCookie();
                jumpSport(data.resp.campId);
            } else {
                alert(data.message);
            }
        }
    });
}
var deviceType = isMobile();
//设置跳到运动视频的方法
function jumpSport(campId) {
    //alert("campId:"+campId);
    var roleId = getParamByUrl("roleId");
    var orderId = getParamByUrl("orderId");

    var type = 1;
    var getPageInfo = function () {
        var data = {
            roleId: roleId,
            type: type,
            campId: campId,
            orderId: orderId
        };
        return JSON.stringify(data);
    };
    if (deviceType == "isApp") {
        if (getParamByUrl("os") == "android") {
            mobileApp.jumpSport(getPageInfo());
        } else {
            window.webkit.messageHandlers.jumpSport.postMessage(getPageInfo());
        }
    }
    document.documentElement.style.webkitTouchCallout = 'none';
}
//设置退出页面前话术
function returnPage() {
    leftControl(false, true);
    $(".returnAlert").css("display", "block");
    $(".return-main-btn0").unbind("click").click(function () {
        leftControl(false, false);
        closePage();
        closeCookie();
        // closePage(6);

    });
    $(".return-main-btn1").unbind("click").click(function () {
        $(".returnAlert").css("display", "none");
        leftControl(true, false);
    });
} 
