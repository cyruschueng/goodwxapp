$(function () {

    var result = getCookie("question1" + orderId) == null ? "" : getCookie("question1" + orderId);
    console.info(result);

    getQuestion(1, "radio", result);


    $(".container").css("minHeight", $(window).height() + "px");

    $(".nextBtn").unbind("click").bind("click", function () {
        var isAllSpace = $('#textContent').val().replace(/\s/g, "") == '' ? true : false;
        if ($(".active").length == 0) {
            $(".pointAlert").css("display", "block");
            $(".pointAlert").text("请选择答案~");
            setTimeout(function () {
                $(".pointAlert").css("display", "none");
            }, 2000);
        } else if ($(".other").hasClass("active") && isAllSpace) {
            $(".pointAlert").css("display", "block");
            $(".pointAlert").text("请输入内容~");
            setTimeout(function () {
                $(".pointAlert").css("display", "none");
            }, 2000);
        } else {

            var radioResult = parseInt($(".active").attr("value"));
            var radioResultText = $(".active span").text();
            console.info(radioResult);
            setCookie("question1" + orderId, radioResult, 30);
            //setCookie("question1text"+orderId,radioResultText,30);
            var resultText = $("#textContent").val();
            if ((/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]|\ud83d[\ude80-\udeff]/g).test(resultText)) {
                $(".pointAlert").css("display", "block");
                $(".pointAlert").text("抱歉，暂不支持表情输入~");
                setTimeout(function () {
                    $(".pointAlert").css("display", "none");
                }, 2000);
                return false;
            }
            else{
                setCookie("question1Text" + orderId, resultText, 30);
            }
            

            //将答案存储
            saveResult("radio");

            window.location.href = "question2.html" + window.location.search;

        }
    });
    if (getParamByUrl('sex') == 0) {
        //标题设置
        appNoShare("问题 1/6");
    }
    else {
        appNoShare("问题 1/5");
    }
    // appNoShare("问题 1/6");
    leftControl(true, false);
})




//设置退出页面前话术
function returnPage() {
    leftControl(false, true);
    $(".returnAlert").css("display", "block");
    $(".return-main-btn0").unbind("click").click(function () {
        leftControl(false, false);
        // closePage(2);
        closePage();
        closeCookie();
    });
    $(".return-main-btn1").unbind("click").click(function () {
        $(".returnAlert").css("display", "none");
        leftControl(true, false);
    });
}

