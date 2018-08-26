$(function () {
    var result = getCookie("question4" + orderId) == null ? "" : getCookie("question4" + orderId);

    getQuestion(4, "select", result);
    //标题设置
    if (getParamByUrl('sex') == 0) {
        //标题设置
        appNoShare("问题 4/6");
    }
    else {
        appNoShare("问题 4/5");
    }

    $(".container").css("minHeight", $(window).height() + "px");


    $(".nextBtn").unbind("click").bind("click", function () {
        // var isAllSpace=$('#textContent').val().replace(/\s/g,"") =='' ? true:false;
        if ($(".content .active").length == 0) {
            $(".pointAlert").css("display", "block");
            $(".pointAlert").text("请选择答案~");
            setTimeout(function () {
                $(".pointAlert").css("display", "none");
            }, 2000);
        } else if ($(".yesSelect").hasClass("active") && $(".otherContent .active").length == 0) {
            $(".pointAlert").css("display", "block");
            $(".pointAlert").text("请选择损伤部位~");
            setTimeout(function () {
                $(".pointAlert").css("display", "none");
            }, 2000);
        } else {
            var radioResult = parseInt($(".active").attr("value"));
            console.info(radioResult);
            setCookie("question4" + orderId, radioResult, 30);

            if ($(".yesSelect").hasClass("active")) {
                var otherSelect = "";
                $(".otherSelect .otherSelect_item").each(function () {
                    if ($(this).hasClass("active")) {
                        otherSelect += $(this).attr("value") + ", ";
                    }
                });
                otherSelect = otherSelect.substring(0, otherSelect.length - 1);
                console.info(otherSelect);
                setCookie("question4Select" + orderId, otherSelect, 30);
            }

            var resultText = $("#textContent").val();
            if ((/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]|\ud83d[\ude80-\udeff]/g).test(resultText)) {
                $(".pointAlert").css("display", "block");
                $(".pointAlert").text("抱歉，暂不支持表情输入~");
                setTimeout(function () {
                    $(".pointAlert").css("display", "none");
                }, 2000);
                return false;
            }
            else {
                setCookie("question4Text" + orderId, resultText, 30);
            }
            // setCookie("question4Text"+orderId,resultText,30);

            //将答案存储
            saveResult("select");
            window.location.href = "question5.html" + window.location.search;
        }
    });

    $(".preBtn").unbind("click").bind("click", function () {
        window.location.href = 'question3.html' + location.search;
        // history.back(-1);

        /*closePage(1);*/
    });



    // appNoShare("问题 4/6");
    leftControl(true, false);
})


//客户端设置
//左上角关闭页面时控制返回按钮
//设置退出页面前话术
function returnPage() {
    leftControl(false, true);
    $(".returnAlert").css("display", "block");
    $(".return-main-btn0").unbind("click").click(function () {
        leftControl(false, false);
        closePage();
        closeCookie();
        // closePage(5);

    });
    $(".return-main-btn1").unbind("click").click(function () {
        $(".returnAlert").css("display", "none");
        leftControl(true, false);
    });
}

