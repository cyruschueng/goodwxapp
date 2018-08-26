
        var jsondata;
        var answers = ""; //选择了“是”的答案
        var index = 0;
        $(function () {
            init();
            $("#btnFalse").click(function () {
                select("btnFalse")
            });
            $("#btnTrue").click(function () {
                select("btnTrue")
            });
            $("#btnTest").click(function () {
                $("#start").hide();
                $("#going").show();
                $("#done").hide();
            });
        })
        var init = function () {
            index = 0;
            $.getJSON("../../json/iqtest.json", function (data) {
                jsondata = data;
                getItem(0);
            });
        }
        var getItem = function () {
            if (!jQuery.isEmptyObject(jsondata.qitest)) {
                var json = jsondata.qitest.detail[index];
                $("#iqtest_title").text(json.sn+". "+json.title);
                $("#iqtest_title").data("sn", json.sn);
            }
        }
        var select = function (btnId) {
            var name = $("#" + btnId).attr("name");
            if (name == "true") {
                var sn = $("#iqtest_title").data("sn");
                answers += sn + ",";
            }
            index += 1;
            if (index < parseInt(jsondata.qitest.total)) {
                getItem();
            } else {
                //显示结果  
                $("#start").hide();
                $("#going").hide();
                $("#done").show();
                analyzeResult();
            }
        }

        var analyzeResult = function () {
            if (answers.length != 0) {
                answers = answers.substr(0, answers.length - 1);
            }

            var rights = "";
            var arrayAnswer = answers.split(",");
            var obj = jsondata.qitest.answer;
            for (var i = 0; i < arrayAnswer.length; i++) {
                $.each(obj, function (index, context) {
                    var arraySelect = context.select.split(",");
                    for (var m = 0; m < arraySelect.length; m++) {
                        if (arrayAnswer[i] == arraySelect[m]) {
                            rights += context.sn + ",";
                        }
                    }
                })
            }
            if (rights.length != 0) {
                rights = rights.substr(0, rights.length - 1);
                var arrayRight = unique(rights.split(","));
                if (arrayRight.length > 3) {
                    var arrRandom = [];
                    var c = 0;
                    while (arrRandom.length < 3) {
                        var index = parseInt(Math.random() * (arrayRight.length - 1));
                        var isexist = false;
                        for (var m = 0; m < arrRandom.length; m++) {
                            if (arrRandom[m] == arrayRight[index]) {
                                isexist = true;
                            }
                        }
                        if (isexist == false) {
                            arrRandom[c] = arrayRight[index];
                            c += 1;
                        }
                    }
                    arrayRight = arrRandom;
                }
                var li = "";
                var sn = 0;
                for (var i = 0; i < arrayRight.length; i++) {
                    sn = i + 1;
                    var index = arrayRight[i] - 1;
                    li += "<li class='list-group-item' style='background:none; border:none;padding:10px 0'>【" + sn + "】" + obj[index].title + "</li>"
                }
                $("#rights").empty();
                $("#rights").append(li);
            }
        }
        //去除重复
        function unique(arr) {
            var result = [], hash = {};
            for (var i = 0;i<arr.length ; i++) {
                if (!hash[arr[i]]) {
                    result.push(arr[i]);
                    hash[arr[i]] = true;
                }
            }
            return result;
        }
   