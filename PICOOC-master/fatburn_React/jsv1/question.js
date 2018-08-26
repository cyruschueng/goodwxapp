//客户端设置
//左上角关闭页面时控制返回按钮
/*var orderId = 100102;*/
var orderId = getParamByUrl("orderId");
var result = "";
var questionResult = [];
if (getCookie("questionResult" + orderId) != "") {
    questionResult = getCookie("questionResult" + orderId);
}
getQuestionText();

//questionType:radio(单选)，select(多选)，input(生理期选择)
function getQuestion(questionIndex, questionType, selectResult) {
    var questionLength = result.resp.length;
    var questionList = result.resp;
    for (var i = 0; i < questionLength; i++) {
        if (questionList[i].questionOrder == questionIndex) {
            var optionLength = questionList[i].items.length;
            $(".title").text(questionList[i].question);
            $(".title").attr("id", questionList[i].id);
            var contentHtml = "";
            //单选
            if (questionType == "radio") {
                for (var j = 0; j < optionLength; j++) {
                    if (questionList[i].items[j].item == "其他") {
                        contentHtml += '<div value="' + j + '" index="' + questionList[i].items[j].id + '" class="radio_item other">'
                            + '<img src="http://cdn2.picooc.com/web/res/fatburn/image/question/select.png">'
                            + '<span>其他</span>'
                            + '</div>'
                            + '<div class="otherText">'
                            + '<textarea id="textContent" maxlength="250"></textarea>'
                            + '<span id="countPoint">250</span>'
                            + '</div>';
                    } else {
                        contentHtml += '<div value="' + j + '" index="' + questionList[i].items[j].id + '" class="radio_item">'
                            + '<img src="http://cdn2.picooc.com/web/res/fatburn/image/question/select.png">'
                            + '<span>' + questionList[i].items[j].item + '</span>'
                            + '</div>';
                    }
                }
                $(".content").html(contentHtml);

                $(".content .radio_item").unbind("click").bind("click", function () {
                    if ($(".content .active").hasClass("other")) {
                        $(".otherText").css("display", "none");
                    }
                    if ($(this).hasClass("other")) {
                        $(".otherText").css("display", "block");
                    }
                    $(".content .radio_item").removeClass("active");
                    $(".content .radio_item").children("img").attr("src", "http://cdn2.picooc.com/web/res/fatburn/image/question/select.png");
                    $(this).addClass("active");
                    $(this).children("img").attr("src", "http://cdn2.picooc.com/web/res/fatburn/image/question/selectd.png");

                });


                console.info("selectResult:" + selectResult);
                if (selectResult != "") {
                    $(".content .radio_item").eq(selectResult).click();
                    if ($(".active").hasClass("other")) {
                        var resultText = getCookie("question" + questionIndex + "Text" + orderId);
                        $("#textContent").text(resultText);
                        $("#countPoint").text(250 - parseInt($("#textContent").val().length));
                    }
                }
            }
            else if (questionType == "select") {
                var subQuestionId = 0;
                var subQuestionId = 0;
                for (var j = 0; j < optionLength; j++) {
                    if (questionList[i].items[j].item == "是") {
                        contentHtml += '<div value="' + j + '" index="' + questionList[i].items[j].id + '" class="radio_item yesSelect">'
                            + '<img src="http://cdn2.picooc.com/web/res/fatburn/image/question/select.png">'
                            + '<span>' + questionList[i].items[j].item + '</span>'
                            + '</div>';
                        subQuestionId = questionList[i].items[j].subquestionId;
                        console.info("subQuestionId:" + subQuestionId);
                    } else {
                        contentHtml += '<div value="' + j + '" index="' + questionList[i].items[j].id + '" class="radio_item">'
                            + '<img src="http://cdn2.picooc.com/web/res/fatburn/image/question/select.png">'
                            + '<span>' + questionList[i].items[j].item + '</span>'
                            + '</div>';
                    }
                }
                //contentHtml += '<div class="otherContent" id='+questionList[k].id+'>';
                for (var k = 0; k < questionLength; k++) {
                    if (questionList[k].id == subQuestionId) {
                        contentHtml += '<div class="otherContent" id=' + questionList[k].id + '>';
                        contentHtml += '<div class="otherTitle">' + questionList[k].question + '</div>'
                            + '<div class="otherSelect row">';
                        for (var j = 0; j < questionList[k].items.length; j++) {
                            contentHtml += '<div value="' + j + '" index="' + questionList[k].items[j].id + '" class="otherSelect_item col-xs-5 col-sm-5">'
                                + '<img src="http://cdn2.picooc.com/web/res/fatburn/image/question/multiSelect.png">'
                                + '<span>' + questionList[k].items[j].item + '</span>'
                                + '</div>';
                        }
                        contentHtml += '</div>'
                            + '<div class="otherTitle">备注（选填）</div>'
                            + '<div class="remark">'
                            + '<textarea id="textContent" maxlength="250"></textarea>'
                            + '<span id="countPoint">250</span>'
                            + '</div>'
                            + '</div>';
                    }
                }

                $(".content").html(contentHtml);
                $(".content .radio_item").unbind("click").bind("click", function () {
                    if ($(".content .active").hasClass("yesSelect")) {
                        $(".otherContent").css("display", "none");
                    }
                    if ($(this).hasClass("yesSelect")) {
                        $(".otherContent").css("display", "block");
                    }
                    $(".content .radio_item").removeClass("active");
                    $(".content .radio_item").children("img").attr("src", "http://cdn2.picooc.com/web/res/fatburn/image/question/select.png");
                    $(this).addClass("active");
                    $(this).children("img").attr("src", "http://cdn2.picooc.com/web/res/fatburn/image/question/selectd.png");

                });

                $(".otherContent .otherSelect_item").unbind("click").bind("click", function () {
                    if ($(this).hasClass("active")) {
                        $(this).removeClass("active");
                        $(this).children("img").css("width", ".75rem");
                        $(this).children("img").attr("src", "http://cdn2.picooc.com/web/res/fatburn/image/question/multiSelect.png");
                    } else {
                        $(this).addClass("active");
                        $(this).children("img").css("width", ".9375rem");
                        $(this).children("img").attr("src", "http://cdn2.picooc.com/web/res/fatburn/image/question/multiSelectd.png");
                    }
                });


                if (selectResult != "") {
                    $(".content .radio_item").eq(selectResult).click();
                    if ($(".active").hasClass("yesSelect")) {
                        var otherSelect = getCookie("question" + questionIndex + "Select" + orderId).split(",");
                        for (var n = 0; n < otherSelect.length; n++) {
                            otherSelect[n] = parseInt(otherSelect[n]);
                            $(".otherSelect .otherSelect_item").eq(otherSelect[n]).click();
                        }

                        var resultText = getCookie("question" + questionIndex + "Text" + orderId);
                        $("#textContent").text(resultText);
                        $("#countPoint").text(250 - parseInt($("#textContent").val().length));
                    }
                }

            } else if (questionType == "input") {
                var subQuestionId = 0;
                for (var j = 0; j < optionLength; j++) {
                    if (questionList[i].items[j].item == "是") {
                        contentHtml += '<div value="' + j + '" index="' + questionList[i].items[j].id + '" class="radio_item hasMenstruation">'
                            + '<img src="http://cdn2.picooc.com/web/res/fatburn/image/question/select.png">'
                            + '<span>' + questionList[i].items[j].item + '</span>'
                            + '</div>';
                        subQuestionId = questionList[i].items[j].subquestionId;
                        console.info("subQuestionId:" + subQuestionId);
                    } else {
                        contentHtml += '<div value="' + j + '" index="' + questionList[i].items[j].id + '" class="radio_item">'
                            + '<img src="http://cdn2.picooc.com/web/res/fatburn/image/question/select.png">'
                            + '<span>' + questionList[i].items[j].item + '</span>'
                            + '</div>';
                    }
                }
                //contentHtml += '<div class="menstruationContent" id='+questionList[k].id+'>';
                for (var k = 0; k < questionLength; k++) {
                    if (questionList[k].id == subQuestionId) {
                        contentHtml += '<div class="menstruationContent" id=' + questionList[k].id + '>';
                        for (var j = 0; j < questionList[k].items.length; j++) {
                            if (j == 0) {
                                contentHtml += '<div class="otherTitle">' + questionList[k].items[j].item + '</div>'
                                    + '<input id="startTime" index="' + questionList[k].items[j].id + '"  placeholder="请选择日期" name="StartTime" type="text" value/>';
                            } else {
                                contentHtml += '<div class="otherTitle">' + questionList[k].items[j].item + '</div>'
                                    + '<input id="endTime"  index="' + questionList[k].items[j].id + '"placeholder="请选择日期" name="StartTime" type="text" value/>';
                            }
                        }
                        contentHtml += '<div class="tip2">' + questionList[k].description + '</div>'
                            + '</div>';
                    }
                }
                // console.log(contentHtml);
                $(".content").html(contentHtml);

                $(".content .radio_item").unbind("click").bind("click", function () {
                    if ($(".content .active").hasClass("hasMenstruation")) {
                        $(".menstruationContent").css("display", "none");
                    }
                    if ($(this).hasClass("hasMenstruation")) {
                        $(".menstruationContent").css("display", "block");
                    }
                    $(".content .radio_item").removeClass("active");
                    $(".content .radio_item").children("img").attr("src", "http://cdn2.picooc.com/web/res/fatburn/image/question/select.png");
                    $(this).addClass("active");
                    $(this).children("img").attr("src", "http://cdn2.picooc.com/web/res/fatburn/image/question/selectd.png");

                });


                if (selectResult != "") {
                    $(".content .radio_item").eq(selectResult).click();
                    if ($(".active").hasClass("hasMenstruation")) {
                        var startTime = getCookie("question" + questionIndex + "Start" + orderId);
                        var endTime = getCookie("question" + questionIndex + "end" + orderId);
                        $("#startTime").val(startTime);
                        $("#endTime").val(endTime);
                    }
                }
            }
            $('#textContent').bind('input propertychange', function () {
                var limit = 250;
                var str = $(this).val();
                var charLen;
                var byteLen = 0;
                var isAllSpace = $(this).val().replace(/\s/g, "") == '' ? true : false;
                byteLen = str.length;
                if (isAllSpace) {
                    byteLen = 0;
                }
                if (byteLen <= limit && byteLen >= 0) {
                    charLen = limit - byteLen;
                    $("#countPoint").text(charLen);
                } else {
                    $("#countPoint").text(0);
                }
            });
            /*$(".content").html(contentHtml);*/
        }
    }
}

//请求服务器获取问卷内容
function getQuestionText() {
    var targetRoleId = getParamByUrl("roleId");
    var host = window.location.protocol + "//" + window.location.host;
    var finalUrl = host + "/v1/api/campQuestion/question" + window.location.search;
    $.ajax({
        type: "get",
        async: false,
        url: finalUrl,
        dataType: "json",
        success: function (data) {
            if (data.code == 200) {
                console.info(typeof data);
                result = data;
            }
        }
    });
}

//讲答案保存
function saveResult(type) {
    console.info("questionResult:" + questionResult);
    if (typeof questionResult == "string") {
        questionResult = JSON.parse(questionResult);
    }

    if (type == "radio") {
        var questionId = $(".title").attr("id");
        var oneQueastion = {};
        var itemId = $(".content .active").attr("index");
        var itemText = "";
        if ($(".content .active").hasClass("other")) {
            itemText = $("#textContent").val();
        }
        oneQueastion = { "questionId": questionId, "remark": "", "selectedItems": [{ "itemId": itemId, "itemText": itemText }] };
        var hasResult = false;
        for (var i = 0; i < questionResult.length; i++) {
            if (questionResult[i].questionId == questionId) {
                questionResult[i] = oneQueastion;
                hasResult = true;
            }
        }
        if (!hasResult) {
            questionResult.push(oneQueastion);
        }

    } else if (type == "select") {
        var questionId1 = $(".title").attr("id");
        var itemId = $(".content .active").eq(0).attr("index");
        var itemText = "";
        var hasResult = false;
        var oneQueastion = { "questionId": questionId1, "remark": "", "selectedItems": [{ "itemId": itemId, "itemText": "" }] };
        for (var i = 0; i < questionResult.length; i++) {
            if (questionResult[i].questionId == questionId1) {
                questionResult[i] = oneQueastion;
                hasResult = true;
            }
        }
        if (!hasResult) {
            questionResult.push(oneQueastion);
        }
        //questionResult.push(oneQueastion);
        if ($(".content .active").eq(0).hasClass("yesSelect")) {
            var questionId2 = $(".otherContent").attr("id");
            var remark = $("#textContent").val();
            var items = [];
            $(".otherContent .active").each(function () {
                items.push({ "itemId": $(this).attr("index"), "itemText": remark });
            });
            var hasResult2 = false;
            var oneQueastion2 = { "questionId": questionId2, "remark": remark, "selectedItems": items };
            for (var i = 0; i < questionResult.length; i++) {
                if (questionResult[i].questionId == questionId2) {
                    questionResult[i] = oneQueastion2;
                    hasResult2 = true;
                }
            }
            if (!hasResult2) {
                questionResult.push(oneQueastion2);
            }
            //questionResult.push(oneQueastion2);
            console.info(questionResult);
        }

    } else if (type == "input") {
        var questionId1 = $(".title").attr("id");
        var itemId = $(".content .active").eq(0).attr("index");
        var itemText = "";
        var hasResult = false;
        var oneQueastion = { "questionId": questionId1, "remark": "", "selectedItems": [{ "itemId": itemId, "itemText": "" }] };
        for (var i = 0; i < questionResult.length; i++) {
            if (questionResult[i].questionId == questionId1) {
                questionResult[i] = oneQueastion;
                hasResult = true;
            }
        }
        if (!hasResult) {
            questionResult.push(oneQueastion);
        }
        //questionResult.push(oneQueastion);
        if ($(".content .active").eq(0).hasClass("hasMenstruation")) {
            var questionId2 = $(".menstruationContent").attr("id");
            var items = [];
            $(".menstruationContent input").each(function () {
                var currYear = new Date().getFullYear();
                dateText = currYear + "-" + $(this).val().substring(0, 2) + "-" + $(this).val().substring(3, 5);
                items.push({ "itemId": $(this).attr("index"), "itemText": dateText });
            });
            var oneQueastion2 = { "questionId": questionId2, "remark": "", "selectedItems": items };
            var hasResult2 = false;
            for (var i = 0; i < questionResult.length; i++) {
                if (questionResult[i].questionId == questionId2) {
                    questionResult[i] = oneQueastion2;
                    hasResult2 = true;
                }
            }
            if (!hasResult2) {
                questionResult.push(oneQueastion2);
            }
            //questionResult.push(oneQueastion2);
            console.info(questionResult);
        }
    }

    questionResult = JSON.stringify(questionResult);
    //parse.JSON
    setCookie("questionResult" + orderId, questionResult, 30);
    console.info(questionResult);
}

//客户端联调
//var mobileApp=window.webkit.messageHandlers;
// function leftControl(isHandle, isHidden,backNum) {
function leftControl(isHandle, isHidden) {

    var getPageInfo = function () {
        var data = {
            iconType: 0,
            iconColor: "",
            backNum: 1,
            closeWebview: 0,
            hidden: isHidden,
            isHandle: isHandle,
            functionName: "returnPage"
            //isRefreshPage:true
        };
        return JSON.stringify(data);
    }
    var deviceType = isMobile();
    if (deviceType == "isApp" && (typeof mobileApp != "undefined")) {
        if (getParamByUrl("os") == "android") {
            mobileApp.controlLeft(getPageInfo());
        }
        else {
            window.webkit.messageHandlers.controlLeft.postMessage(getPageInfo());
        }
        //mobileApp.showLeftBtn(getPageInfo());
    }
    document.documentElement.style.webkitTouchCallout = 'none';
}


// function closePage(backNum) {
function closeCookie(){
    // alert('clear');
     //中断问卷去掉缓存
    for (var i = 0; i < 6; i++) {
        
        delCookie("question" + (i + 1) + "text" + orderId);
        delCookie("question" + (i + 1) + orderId);
        if (i == 3) {
            delCookie("question" + (i + 1) + "Select" + orderId);
        }
        if (i == 5) {
            delCookie("question6Start" + orderId);
            delCookie("question6end" + orderId);
        }

    }
}
function closePage() {
    // if (getCookie('toQuestionSource') == 1) {
    //     window.location.href = "trainPlan.html" + window.location.search;
    // }
    // else {
        var data = {
            backNum: 0,//默认为1，
            closeWebview: 1,//默认为0
            reload: false
        };
        data = JSON.stringify(data);
        appFc.deleteHistory(data);
        // window.location.href = "myFatBurn.html" + removeParamByUrl('orderId');

    // }

    // var getPageInfo = function () {
    //     var data = {
    //         backNum: backNum,//默认为1，
    //         closeWebview: 0,//默认为0
    //     };
    //     return JSON.stringify(data);
    // };
    // var deviceType = isMobile();
    // if (deviceType == "isApp" && (typeof mobileApp != "undefined")) {
    //     if (getParamByUrl("os") == "android") {
    //         mobileApp.deleteHistory(getPageInfo());
    //     } else {
    //         window.webkit.messageHandlers.deleteHistory.postMessage(getPageInfo());
    //     }
    //     //mobileApp.deleteHistory(getPageInfo());
    // }
    // document.documentElement.style.webkitTouchCallout = 'none';
}

function appNoShare(title) {
    var getPageInfo3 = function () {
        var data = {
            title: title,
            color: "",
            opacity: "",
            backgroundColor: "",
            backgroundOpacity: ""
        };
        return JSON.stringify(data);
    };
    var deviceType = isMobile();
    if (deviceType == "isApp" && (typeof mobileApp != "undefined")) {
        if (getParamByUrl("os") == "android") {
            mobileApp.controlTitle(getPageInfo3());
        }
        else {
            window.webkit.messageHandlers.controlTitle.postMessage(getPageInfo3());
        }
    }
    document.documentElement.style.webkitTouchCallout = 'none';
}
