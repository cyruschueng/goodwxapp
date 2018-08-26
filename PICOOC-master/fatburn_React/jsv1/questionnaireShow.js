var gaugeTime = ""; //称重时段
var goal = ""; //入营目的
var concern = ""; //关注
var position = ""; //关注身体部位
var habit = ""; //不良习惯
var diet = ""; //饮食方式
var sport = ""; //运动频率
var sportAddress = ""; //运动地址
var sportTime = ""; //运动时间
var sportMerchine = ""; //运动装备
var sportHurt = ""; //运动损伤
var sickness = ""; //疾病
var orderId = getParamByUrl("orderId");
var questionResult = "questionResult_" + orderId;
var result = getCookie(questionResult);
console.log(result)
// var orderId = 100003;
var userId = getParamByUrl("userId");
$(function () {
    appNoShare("个人资料完善");
    var getPageInfo1 = function () {
        var data = {
            iconType: 0,
            iconColor: "",
            backNum: 0,
            closeWebview: 1,
            hidden: false,
            isHandle: false,
            functionName: ""
            //isRefreshPage:true
        };
        return JSON.stringify(data);
    };
    appFc.controlLeft(getPageInfo1());
    // getUserResult();
    var host = window.location.protocol + "//" + window.location.host;
    var finalUrl = host + "/v1/api/campQuestion/complete" + window.location.search;
    if (result == null || result == '') {
        $.ajax({
            type: "get",
            url: finalUrl,
            dataType: "json",
            success: function (data) {
                if (data.code == 200) {
                    var result = data.resp.CampQuestionDO;
                    getUserResult(result);
                }
            }
        })
    } else {
        result = eval('(' + result + ')');
        getUserResult(result)
    }
})

function getUserResult(result) {
    //var result={"wechatName":"委屈翁","orderId":"100003","userId":"925135","career":"委屈翁","area":"辽宁省鞍山市","weightPeriod":"0","mostTargt":"地方郭德纲","careContent":"饮食计划","bodyParts":"胸背","badEat":"偏爱油腻油炸食品和肉肉等","eatType":"食堂"}
    console.info(result);
    /*var questionResult="questionResult_"+orderId;
    localStorage.getItem(questionResult);
    console.info(localStorage.getItem(questionResult));*/
    if (result != "" && result != null) {
        //var result=localStorage.getItem(questionResult);
        // console.info(typeof result);

        // console.info(typeof result);
        // console.info(result.wechatName);
        //WX名称
        $("#wechatName").val(result.wechatName);
        //职业
        $("#occupation").val(result.career);
        //所在地
        $("#area").val(result.area);
        //目标
        var goal = result.mostTargt;
        var goalResult = false;
        $("#goal .radio").each(function () {
            if ($(this).children("span").text() == goal) {
                $(this).addClass("active");
                $(this).css("background-color", "#7fa9ff");
                $(this).css("color", "#fff");
                $(this).children("img").attr("src", "image/withoutCamp/check.png");
                goalResult = true;
            }
        });
        if (!goalResult) {
            $("#goal .radio2").addClass("active");
            $("#goal .radio3 img").attr("src", "image/withoutCamp/check2.png");
            $("#goal textarea").val(goal.split('-')[1]);
        }
        //关注
        var concern = result.careContent;
        var concernResult = false;
        $("#concern .radio").each(function () {
            if ($(this).children("span").text() == concern) {
                $(this).addClass("active");
                $(this).css("background-color", "#7fa9ff");
                $(this).css("color", "#fff");
                $(this).children("img").attr("src", "image/withoutCamp/check.png");
                concernResult = true;
            }
        });
        if (!concernResult) {
            /*$("#concern .radio3").click();*/
            $("#concern .radio2").addClass("active");
            $("#concern .radio3 img").attr("src", "image/withoutCamp/check2.png");
            $("#concern textarea").val(concern.split('-')[1]);
        }
        //身体部位
        if (result.bodyParts != '' && result.bodyParts != null) {
            var bodyParts = result.bodyParts.split("|");
            // console.log(bodyParts);
            var bodyPartsResult = false;
            $("#position .radio").each(function () {
                for (var i = 0; i < bodyParts.length; i++) {
                    if ($(this).children("span").text() == bodyParts[i]) {
                        $(this).addClass("active");
                        $(this).css("background-color", "#7fa9ff");
                        $(this).css("color", "#fff");
                        $(this).children("img").attr("src", "image/withoutCamp/checkboxYes.png");
                        // bodyPartsResult = true;
                        break;
                    }
                }
            });
            console.log(bodyPartsResult);
            if (!bodyPartsResult) {

                // if (bodyParts[0].split('-')[1] != '' && bodyParts[0].split('-')[1] != null) {
                    $("#position .radio2").addClass("active");
                    $("#position .radio3 img").attr("src", "image/withoutCamp/checkboxYes3.png");
                    $("#position textarea").val(bodyParts[0].split('-')[1]);
                // }
                /*$("#position .radio3").click();*/

            }
        }
        //不良选项
        if (result.badEat != '' && result.badEat != null) {
            var badEat = result.badEat.split("|");
            var badEatResult = false;
            $("#habit .radio").each(function () {
                for (var i = 0; i < badEat.length; i++) {
                    if ($(this).children("span").text() == badEat[i]) {
                        $(this).addClass("active");
                        $(this).css("background-color", "#7fa9ff");
                        $(this).css("color", "#fff");
                        $(this).children("img").attr("src", "image/withoutCamp/checkboxYes.png");
                        // badEatResult = true;
                        break;
                    }
                }
            });
            if (!badEatResult) {
                // if (badEat[0].split('-')[1] != '' && badEat[0].split('-')[1] != null) {
                    $("#habit .radio2").addClass("active");
                    $("#habit .radio3 img").attr("src", "image/withoutCamp/checkboxYes3.png");
                    $("#habit textarea").val(badEat[0].split('-')[1]);
                // }
                /*$("#habit .radio3").click();*/

            }
        }
        //日常饮食方式
        var eatType = result.eatType.split('|');
        // var eatTypeResult = false;
        $("#diet .radio").each(function () {
            for (var n = 0; n < eatType.length; n++) {
                if ($(this).children("span").text() == eatType[n]) {
                    $(this).addClass("active");
                    $(this).css("background-color", "#7fa9ff");
                    $(this).css("color", "#fff");
                    $(this).children("img").attr("src", "image/withoutCamp/checkboxYes.png");
                    // eatTypeResult = true;
                }
            }
        });
        //   if(!eatTypeResult){
        //       /*$("#diet .radio3").click();*/
        //       $("#diet .radio2").addClass("active");
        //       $("#diet .radio3 img").attr("src","image/withoutCamp/check2.png");
        //       $("#diet textarea").val(eatType);
        //   }
        //上称时段
        var weightPeriod = parseInt(result.weightPeriod);
        $("#gaugeTime .radio").eq(weightPeriod).addClass("active");
        $("#gaugeTime .radio").eq(weightPeriod).css("background-color", "#7fa9ff");
        $("#gaugeTime .radio").eq(weightPeriod).css("color", "#fff");
        $("#gaugeTime .radio").eq(weightPeriod).children("img").attr("src", "image/withoutCamp/check.png");

    }
}

//设置标题
function appNoShare(title) {
    var getPageInfo = function () {
        var data = {
            title: title,
			/*isShare:false,
			backgroundColor:'#2c2f31'*/
            color: "",
            opacity: "",
            backgroundColor: "",
            backgroundOpacity: ""
        };
        return JSON.stringify(data);
    };
    appFc.controlTitle(getPageInfo());
    // if (deviceType == "isApp" && (typeof mobileApp != "undefined")) {
    // 	if (getParamByUrl("os") == "android") {
    // 		mobileApp.controlTitle(getPageInfo());
    // 	}
    // 	else {
    // 		mobileApp.controlTitle.postMessage(getPageInfo());
    // 	}
    // 	//mobileApp.getShareInfo(getPageInfo());
    // }
    // document.documentElement.style.webkitTouchCallout = 'none';
}