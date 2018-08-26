//通过localStorage获取token值
var token = localStorage.getItem("token");
var roleId = Number(localStorage.getItem("roleId"));
var userId = Number(localStorage.getItem("userId"));
//console.log("token:"+token, "roleId:"+roleId);
var totalCount;//总数，作为全局变量

$(function () {
    //下单时间
    $('#studentXiaDanTime,#studentXiaDanTimeEnd').datetimepicker({
        showSecond: true,
        changeMonth: true,
        changeYear: true,
        timeFormat: 'hh:mm:ss',//样式可以自定义
        dateFormat: 'yy-mm-dd'
    });

    //点击筛选
    $('#shaiXuanStudent').unbind('click').click(function () {
        var textChoose = $('#textChoose').val();
        // console.log(textChoose);
        var beginDate = $('#startCampTime').val();//开营时间
        var stat = $('#campstatus option:selected').val();//参营状态
        var TimePicker = $('#TimePicker').val();
        var beginTime = $('#studentXiaDanTime').val();//下单开始时间
        var endTime = $('#studentXiaDanTimeEnd').val();//下单结束时间
        // if(($('#checkbox1').prop('checked')==false) && ($('#xiaDanCheckbox').prop('checked')==false) ){
        //     alert('请选中您需要的checkbox');
        // }

        //#checkbox1：第一个checkbox
        //#xiaDanCheckbox：下单时间
        if (($('#checkbox1').prop('checked') == true) && ($('#xiaDanCheckbox').prop('checked') == false)) {
            if (textChoose == '') {
                alert('内容不能为空！');
            } else {
                if ($('.studentsTop .select option:selected').val() == '订单号') {
                    getQuestionList(studentPageNow, studentPageSize, textChoose, '', '', '', '', '', stat, beginDate, '', '');
                }
                if ($('.studentsTop .select option:selected').val() == '微信号') {
                    getQuestionList(studentPageNow, studentPageSize, '', textChoose, '', '', '', stat, beginDate, '', '');
                }
                if ($('.studentsTop .select option:selected').val() == '微信昵称') {
                    getQuestionList(studentPageNow, studentPageSize, '', '', textChoose, '', '', '', stat, beginDate, '', '');
                }
                if ($('.studentsTop .select option:selected').val() == '电话号') {
                    getQuestionList(studentPageNow, studentPageSize, '', '', '', textChoose, '', '', stat, beginDate, '', '');
                }
                if ($('.studentsTop .select option:selected').val() == '有品账号') {
                    getQuestionList(studentPageNow, studentPageSize, '', '', '', '', textChoose, '', stat, beginDate, '');
                }
                if ($('.studentsTop .select option:selected').val() == '营编号') {
                    getQuestionList(studentPageNow, studentPageSize, '', '', '', '', '', textChoose, stat, beginDate, '', '');
                }
            }
        }
        else if (($('#checkbox1').prop('checked') == false) && ($('#xiaDanCheckbox').prop('checked') == true)) {
            if (beginTime == '' || endTime == '') {
                alert('内容不能为空！');
            } else {
                getQuestionList(studentPageNow, studentPageSize, '', '', '', '', '', '', stat, beginDate, beginTime, endTime);
            }
        }
        else if (($('#checkbox1').prop('checked') == true) && ($('#xiaDanCheckbox').prop('checked') == true)) {
            if (textChoose == '' || beginTime == '' || endTime == '') {
                alert('内容不能为空！');
            } else {
                if ($('.studentsTop .select option:selected').val() == '订单号') {
                    getQuestionList(studentPageNow, studentPageSize, textChoose, '', '', '', '', '', stat, beginDate, beginTime, endTime);
                }
                if ($('.studentsTop .select option:selected').val() == '微信号') {
                    getQuestionList(studentPageNow, studentPageSize, '', textChoose, '', '', '', '', stat, beginDate, beginTime, endTime);
                }
                if ($('.studentsTop .select option:selected').val() == '微信昵称') {
                    getQuestionList(studentPageNow, studentPageSize, '', '', textChoose, '', '', '', stat, beginDate, beginTime, endTime);
                }
                if ($('.studentsTop .select option:selected').val() == '电话号') {
                    getQuestionList(studentPageNow, studentPageSize, '', '', '', textChoose, '', '', stat, beginDate, beginTime, endTime);
                }
                if ($('.studentsTop .select option:selected').val() == '有品账号') {
                    getQuestionList(studentPageNow, studentPageSize, '', '', '', '', textChoose, '', stat, beginDate, beginTime, endTime);
                }
                if ($('.studentsTop .select option:selected').val() == '营编号') {
                    getQuestionList(studentPageNow, studentPageSize, '', '', '', '', '', textChoose, stat, beginDate, beginTime, endTime);
                }
            }
        }
        else {
            getQuestionList(studentPageNow, studentPageSize, '', '', '', '', '', '', stat, beginDate, beginTime, endTime);

        }
    });

    var studentPageNow = 1;//当前页数；
    var studentPageSize = 100;//学员管理列表每页显示条数；

    $('.studentManage').unbind('click').click(function () {
        $('.orderModify2').hide();
        getQuestionList(studentPageNow, studentPageSize, '', '', '', '', '', '', '', '', '', '');
        $('.studentsTop,.studentsContent').show();//页面显示学员信息列表状态
    });

    //点击返回学员管理首页
    $('#returnStuList').unbind('click').click(function () {
        getQuestionList(studentPageNow, studentPageSize, '', '', '', '', '', '', '', '', '', '');
    });

});

//学员管理
function getQuestionList(studentPageNow, studentPageSize, orderId, wechat, wechatName, phone, userId, classId, stat, beginDate, beginTime, endTime) {
    var ajaxLink = baseUrl + "v1/api/campQuestion/questionList?pageNow=" + studentPageNow + '&pageSize=' + studentPageSize +
        '&orderId=' + orderId + '&wechat=' + wechat + '&wechatName=' + wechatName + '&phone=' + phone + '&userId=' + userId + '&classId=' + classId + '&beginDate=' + beginDate + '&stat=' + stat + '&beginTime=' + beginTime + '&endTime=' + endTime + "&token=" + token + "&roleId=" + roleId;//下单时间beginTime
    console.log('ajaxLink', ajaxLink);
    $.ajax({
        type: "get",
        url: ajaxLink,
        dataType: "json",
        success: function (data) {
            console.log('11*学员管理*', data);
            if (data.result.code == 200) {
                totalCount = data.resp.totalCount; //总数，作为全局变量
                $('#studentCount').html(totalCount);
                var str = '';
                var aboutStat = '', aboutWechatState = '', aboutSex = '', aboutWeightPeriod = '', aboutBodyType = '', isFianco = '';

                //console.log(data.resp.records.length,'长度');

                /*运动等级空着*/

                var aboutLength = 0;//计算显示的长度
                if (data.resp.pageCount != 0) {
                    (studentPageNow == data.resp.pageCount) ? (aboutLength = (data.resp.totalCount - (data.resp.pageSize * (data.resp.pageCount - 1)))) : (aboutLength = studentPageSize);
                }
                console.log('aboutLength', aboutLength);
                //console.log('aboutLength', aboutLength);
                for (var i = 0; i < aboutLength; i++) {

                    //判断如果值为null，在页面显示为空字符串‘’；
                    for (var item in data.resp.records[i]) {
                        //console.log(data.resp[i][item]);
                        if (data.resp.records[i][item] == null) {
                            data.resp.records[i][item] = '';
                        }
                    }
                    /*参营状态*/
                    //console.log(data.resp.records[i].stat,'*********');
                    switch (data.resp.records[i].stat) {
                        case 0:
                            aboutStat = "新生";
                            break;
                        case 1:
                            aboutStat = "续营";
                            break;
                        case 2:
                            aboutStat = "(新生)延期";
                            break;
                        case 3:
                            aboutStat = "退营";
                            break;
                        case 4:
                            aboutStat = "插班";
                            break;
                        case 5:
                            aboutStat = "换班";
                            break;
                        case 6:
                            aboutStat = "(续营)延期";
                            break;
                    }

                    /*微信添加*/
                    switch (data.resp.records[i].wechatState) {
                        case 0:
                            aboutWechatState = "已申请";
                            break;
                        case 1:
                            aboutWechatState = "已添加";
                            break;
                        case 2:
                            aboutWechatState = "无此微信";
                            break;
                        case 3:
                            aboutWechatState = "信息有误";
                            break;
                    }
                    /*性别*/
                    switch (data.resp.records[i].sex) {
                        case 0:
                            aboutSex = "女";
                            break;
                        case 1:
                            aboutSex = "男";
                            break;
                    }
                    /* 测量时段*/
                    switch (data.resp.records[i].weightPeriod) {
                        case 0:
                            aboutWeightPeriod = "04-12时 上午";
                            break;
                        case 1:
                            aboutWeightPeriod = "12-16时 下午";
                            break;
                        case 2:
                            aboutWeightPeriod = "16-20时 傍晚";
                            break;
                        case 3:
                            aboutWeightPeriod = "20-24时 夜晚";
                            break;
                    }
                    /*身体类型*/
                    switch (data.resp.records[i].bodyType) {
                        case 0:
                            aboutBodyType = "";
                            break;
                        case 1:
                            aboutBodyType = "隐性肥胖";
                            break;
                        case 2:
                            aboutBodyType = "肥胖";
                            break;
                        case 3:
                            aboutBodyType = "肌肉型肥胖";
                            break;
                        case 4:
                            aboutBodyType = "缺乏锻炼型";
                            break;
                        case 5:
                            aboutBodyType = "标准型";
                            break;
                        case 6:
                            aboutBodyType = "标准肌肉型";
                            break;
                        case 7:
                            aboutBodyType = "偏瘦型";
                            break;
                        case 8:
                            aboutBodyType = "偏瘦肌肉型";
                            break;
                        case 9:
                            aboutBodyType = "肌肉发达型";
                            break;
                    }
                    /* 是否体侧*/
                    switch (data.resp.records[i].isFianco) {
                        case 0:
                            isFianco = "否";
                            break;
                        case 1:
                            isFianco = "是";
                            break;
                    }

                    str += '<tr>' +
                        '<td>' + "'" + data.resp.records[i].orderId + '</td><td>' + aboutStat + '</td><td>' + data.resp.records[i].lastCoach + '</td><td>' + data.resp.records[i].lastCampName + '</td>' +
                        '<td>' + data.resp.records[i].coach + '</td><td>' + data.resp.records[i].campName + '</td><td>' + data.resp.records[i].stuId + '</td><td>' + data.resp.records[i].beginTime + '</td><td>' + data.resp.records[i].wechat + '</td>' +
                        '<td>' + data.resp.records[i].wechatName + '</td><td>' + aboutWechatState + '</td><td>' + data.resp.records[i].phone + '</td><td>' + data.resp.records[i].userId + '</td><td>' + aboutSex + '</td>' +
                        '<td>' + data.resp.records[i].height + '</td><td>' + data.resp.records[i].age + '</td><td>' + data.resp.records[i].lastc + '</td><td>' + data.resp.records[i].weight + '</td><td>' + data.resp.records[i].bodyFat + '</td>' +
                        '<td>' + aboutBodyType + '</td><td>' + data.resp.records[i].target + '</td><td></td><td>' + aboutWeightPeriod + '</td><td>' + data.resp.records[i].career + '</td>' +
                        '<td>' + data.resp.records[i].area + '</td><td>' + data.resp.records[i].physicalPeriod + '</td><td>' + data.resp.records[i].mostTargt + '</td><td>' + data.resp.records[i].careContent + '</td><td>' + data.resp.records[i].bodyParts + '</td>' +
                        '<td>' + data.resp.records[i].badEat + '</td><td>' + data.resp.records[i].eatType + '</td><td>' + data.resp.records[i].sportTimes + '</td><td>' + data.resp.records[i].sportVenues + '</td><td>' + data.resp.records[i].sportlong + '</td>' +
                        '<td>' + data.resp.records[i].sportInjury + '</td><td>' + data.resp.records[i].injuryDesc + '</td><td>' + data.resp.records[i].sick + '</td><td>' + data.resp.records[i].address + '</td><td>' + data.resp.records[i].postcode + '</td>' +
                        '<td>' + data.resp.records[i].remark + '</td><td>' + isFianco + '</td><td class="editStudent blue">编辑</td>' +
                        '</tr>';
                }
                $('#studentHead #dingdanhao').css({
                    'border': '1px solid black',
                    'backgroundColor': '#00B050'
                });
                $('#questionList').empty().append(str); //学员管理列表页
                //console.log("$('#questionList')",$('#questionList').html());


                editStudentInfo();
                //点击学员管理-编辑，之后跳转到编辑状态
                function editStudentInfo() {
                    var editNum;
                    $('#questionList .editStudent').unbind('click').click(function () {
                        editNum = $("#questionList .editStudent").index($(this));
                        //console.log('当前学员在整个列表的排序',editNum);
                        $('.studentsTop,.studentsContent').hide();//页面显示编辑状态
                        $('.orderModify2').show();

                        $('.editStudentInfo .stat').get(0).selectedIndex = data.resp.records[editNum].stat;//参营状态
                        $('.editStudentInfo .wechatState').get(0).selectedIndex = data.resp.records[editNum].wechatState;//微信添加

                        $('.editStudentInfo .wechat').val(data.resp.records[editNum].wechat);//微信号
                        $('.editStudentInfo .wechatName').val(data.resp.records[editNum].wechatName);//
                        $('.editStudentInfo .coach').val(data.resp.records[editNum].coach);//
                        $('.editStudentInfo .phone').val(data.resp.records[editNum].phone);//
                        $('.editStudentInfo .campName').val(data.resp.records[editNum].campName);//
                        $('.editStudentInfo .userId').val(data.resp.records[editNum].userId);//
                        $('.editStudentInfo .stuId').val(data.resp.records[editNum].stuId);//
                        $('.editStudentInfo .stuName').val(data.resp.records[editNum].stuName);
                        $('.editStudentInfo .campWeeks').html(data.resp.records[editNum].weeks);
                        $('.editStudentInfo .beginTime').val(data.resp.records[editNum].beginTime);//
                        $('.editStudentInfo .target').val(data.resp.records[editNum].target);// 后面有一个运动等级，需要补充
                        $('.editStudentInfo .address').val(data.resp.records[editNum].address);//
                        $('.editStudentInfo .postcode').val(data.resp.records[editNum].postcode);//
                        $('.editStudentInfo .remark').val(data.resp.records[editNum].remark);//

                        $('.editStudentInfo .mostTargt').html(data.resp.records[editNum].mostTargt);
                        $('.editStudentInfo .lastCoach').html(data.resp.records[editNum].lastCoach);
                        $('.editStudentInfo .careContent').html(data.resp.records[editNum].careContent);
                        $('.editStudentInfo .lastCampName').html(data.resp.records[editNum].lastCampName);
                        $('.editStudentInfo .bodyParts').html(data.resp.records[editNum].bodyParts);
                        $('.editStudentInfo .badEat').html(data.resp.records[editNum].badEat);
                        $('.editStudentInfo .eatType').html(data.resp.records[editNum].eatType);
                        //$('.editStudentInfo .sex').html(data.resp.records[editNum].sex);
                        if (data.resp.records[editNum].sex == 0) {
                            $('.editStudentInfo .sex').html('女');
                        } else if (data.resp.records[editNum].sex == 1) {
                            $('.editStudentInfo .sex').html('男');
                        } else {
                            $('.editStudentInfo .sex').html('');
                        }
                        $('.editStudentInfo .sportTimes').html(data.resp.records[editNum].sportTimes);
                        $('.editStudentInfo .height').html(data.resp.records[editNum].height);
                        $('.editStudentInfo .sportVenues').html(data.resp.records[editNum].sportVenues);
                        $('.editStudentInfo .age').html(data.resp.records[editNum].age);
                        $('.editStudentInfo .sportlong').html(data.resp.records[editNum].sportlong);
                        $('.editStudentInfo .lastc').html(data.resp.records[editNum].lastc);
                        $('.editStudentInfo .sportInjury').html(data.resp.records[editNum].sportInjury);
                        $('.editStudentInfo .weight').html(data.resp.records[editNum].weight);
                        $('.editStudentInfo .injuryDesc').html(data.resp.records[editNum].injuryDesc);
                        $('.editStudentInfo .bodyFat').html(data.resp.records[editNum].bodyFat);
                        $('.editStudentInfo .sick').html(data.resp.records[editNum].sick);
                        //$('.editStudentInfo .bodyType').html(data.resp.records[editNum].bodyType);
                        if (data.resp.records[editNum].bodyType == 1) {
                            $('.editStudentInfo .bodyType').html('隐性肥胖');
                        } else if (data.resp.records[editNum].bodyType == 2) {
                            $('.editStudentInfo .bodyType').html('肥胖');
                        } else if (data.resp.records[editNum].bodyType == 3) {
                            $('.editStudentInfo .bodyType').html('肌肉型肥胖');
                        } else if (data.resp.records[editNum].bodyType == 4) {
                            $('.editStudentInfo .bodyType').html('缺乏锻炼型');
                        } else if (data.resp.records[editNum].bodyType == 5) {
                            $('.editStudentInfo .bodyType').html('标准型');
                        } else if (data.resp.records[editNum].bodyType == 6) {
                            $('.editStudentInfo .bodyType').html('标准肌肉型');
                        } else if (data.resp.records[editNum].bodyType == 7) {
                            $('.editStudentInfo .bodyType').html('偏瘦型');
                        } else if (data.resp.records[editNum].bodyType == 8) {
                            $('.editStudentInfo .bodyType').html('偏瘦肌肉型');
                        } else if (data.resp.records[editNum].bodyType == 9) {
                            $('.editStudentInfo .bodyType').html('肌肉发达型');
                        } else {
                            $('.editStudentInfo .bodyType').html('');
                        }
                        //$('.editStudentInfo .weightPeriod').html(data.resp.records[editNum].weightPeriod);
                        if (data.resp.records[editNum].weightPeriod == 0) {
                            $('.editStudentInfo .weightPeriod').html('04-12时 上午');
                        } else if (data.resp.records[editNum].weightPeriod == 1) {
                            $('.editStudentInfo .weightPeriod').html('12-16时 下午');
                        } else if (data.resp.records[editNum].weightPeriod == 2) {
                            $('.editStudentInfo .weightPeriod').html('16-20时 傍晚');
                        } else if (data.resp.records[editNum].weightPeriod == 3) {
                            $('.editStudentInfo .weightPeriod').html('20-24时 夜晚');
                        } else {
                            $('.editStudentInfo .weightPeriod').html('');
                        }
                        $('.editStudentInfo .career').html(data.resp.records[editNum].career);
                        $('.editStudentInfo .area').html(data.resp.records[editNum].area);
                        $('.editStudentInfo .physicalPeriod').html(data.resp.records[editNum].physicalPeriod);
                    });
                    coachClassSelect('.editStudentInfo .coach', '.editStudentInfo .coachList', 'coachName');
                    coachClassSelect('.editStudentInfo .campName', '.editStudentInfo .classList', 'name');

                    function coachClassSelect(ele, box, name) {
                        $(ele).on('input', function () {
                            console.log('peiqian');
                            var value = $.trim($(this).val());
                            var weeks = $.trim($('.editStudentInfo .campWeeks').html());
                            var beginTime = $('.editStudentInfo .beginTime').val();
                            if (value == '') {
                                $.ajax({
                                    url: location.origin + '/v1/api/campAdmin/selectCampByWeek?roleId=' + roleId + '&token=' + token + '&weeks=' + weeks + '&beginTime=' + beginTime,
                                    type: 'get',
                                    success: function (data) {
                                        if (data.code == 200) {
                                            var data = data.resp;
                                            var str = '';
                                            $(box).empty();
                                            if (data.length > 0) {
                                                for (var j = 0; j < data.length; j++) {
                                                    str += '<li style="width:100%" class="">' + data[j][name] + '</li>';
                                                }
                                                $(box).append(str);
                                                $(box).find('li').on('click', function () {
                                                    var name = $(this).html();
                                                    $(this).parent().siblings('input').val(name);
                                                    $(box).empty();
                                                })

                                            }
                                        }
                                    },
                                    error: function () {
                                        swal('啊哦，网络错误~');
                                    }
                                })
                            };
                            // $(ele).on('blur',function(){
                            //     console.log('blur')
                            //     $(box).empty();
                            // })
                        })
                    }
                    //当为编辑状态时，点击取消：
                    $('#cancelStuInfo').unbind('click').click(function () {
                        $('.studentsTop,.studentsContent').show();//页面显示学员信息列表状态
                        $('.orderModify2').hide();
                    });

                    //当为编辑状态时，点击保存：
                    $('#saveStuInfo').unbind('click').click(function () {
                        var modifyStat, modifyWechatState;//将参营状态、微信添加转换为state值
                        //console.log($('.editStudentInfo .stat').val());
                        //console.log($('.editStudentInfo .wechatState').val());
                        switch ($('.editStudentInfo .stat').val()) {
                            case '新生':
                                modifyStat = 0;
                                break;
                            case '续营':
                                modifyStat = 1;
                                break;
                            case '延期(新生)':
                                modifyStat = 2;
                                break;
                            case '延期(续营)':
                                modifyStat = 6;
                                break;
                            case '退营':
                                modifyStat = 3;
                                break;
                            case '插班':
                                modifyStat = 4;
                                break;
                            case '换班':
                                modifyStat = 5;
                                break;
                        }
                        switch ($('.editStudentInfo .wechatState').val()) {
                            case '已申请':
                                modifyWechatState = 0;
                                break;
                            case '已添加':
                                modifyWechatState = 1;
                                break;
                            case '无此微信':
                                modifyWechatState = 2;
                                break;
                            case '信息有误':
                                modifyWechatState = 3;
                                break;
                        }
                        //编辑学员信息
                        var modifyStudentInfo = {
                            'token': token,
                            'roleId': roleId,
                            'id': data.resp.records[editNum].id,
                            "stat": modifyStat,
                            "wechatState": modifyWechatState,
                            "wechat": $('.editStudentInfo .wechat').val(),
                            "wechatName": $('.editStudentInfo .wechatName').val(),
                            'stuName': $('.editStudentInfo .stuName').val(),
                            "coach": $('.editStudentInfo .coach').val(),
                            "phone": $('.editStudentInfo .phone').val(),
                            "campName": $('.editStudentInfo .campName').val(),
                            "userId": Number($('.editStudentInfo .userId').val()),
                            "stuId": Number($('.editStudentInfo .stuId').val()),
                            "beginTime": $('.editStudentInfo .beginTime').val(),
                            "target": $('.editStudentInfo .target').val(),
                            "sportGrade": '这里是运动等级',//运动等级待定，这里是自己先定义的，后面需要修改
                            "address": $('.editStudentInfo .address').val(),
                            "postcode": $('.editStudentInfo .postcode').val(),
                            "remark": $('.editStudentInfo .remark').val()
                        };
                        console.log('modifyStudentInfo', modifyStudentInfo);
                        var urlInsertQuestion = baseUrl + 'v1/api/campQuestion/updateQuestion' + "?token=" + token + '&userId=' + userId + "&roleId=" + roleId;//向后台提交数据
                        //保存编辑后的学员信息
                        $.ajax({
                            type: "POST",
                            url: urlInsertQuestion,
                            dataType: "json",
                            contentType: 'application/json',
                            data: JSON.stringify(modifyStudentInfo),
                            success: function (data) {
                                console.log('22*保存编辑后的学员信息*', data);
                                if (data.result.code == 200) {
                                    alert('保存成功！');
                                    //console.log('修改学员信息成功！');

                                    getQuestionList(studentPageNow, studentPageSize, '', '', '', '', '', '', '', '', '', '');
                                    $('.studentsTop,.studentsContent').show();//页面显示学员信息列表状态
                                    $('.orderModify2').hide();

                                } else if (data.result.code == 30000) {
                                    window.location.href = 'index.html';//超时，跳转到登录页面；
                                } else {
                                     alert(data.message);
                                }
                            },
                            error: function (data) {
                                console.log(data);
                            }
                        });
                    });

                }

                /*点击全选的checkbox*/
                $('#checkAll').attr("checked", false); //初始化‘全选’为未选中状态；
                $('#checkAll').unbind('click').click(function () {
                    $('#questionList input:checkbox').attr("checked", $('#checkAll').prop('checked')); //全选/全不选
                });

                //点击删除按钮
                $('#deleteStuInfo').unbind('click').click(function () {
                    if (confirm('确定删除吗?')) {
                        //获取选中的checkbox
                        var urlDeleteQuestion = baseUrl + '/v1/api/campQuestion/deleteQuestion?ids=';
                        var idArr = [];
                        //遍历questionList中所有的checkbox
                        for (var i = 0; i < $('#questionList input[type=checkbox]').length; i++) {
                            if ($('#questionList input[type=checkbox]').eq(i).prop("checked")) {
                                idArr.push(data.resp.records[i].id);
                            }
                        }
                        idStr = idArr.join('-');
                        urlDeleteQuestion += idStr;
                        //console.log(urlDeleteQuestion);
                        //删除选中的学员信息
                        $.ajax({
                            type: "get",
                            url: urlDeleteQuestion + "&token=" + token + '&userId=' + userId + "&roleId=" + roleId,
                            dataType: "json",
                            success: function (data) {
                                if (data.result.code == 200) {
                                    console.log('33*删除选中的学员信息*', data);
                                } else if (data.result.code == 30000) {
                                    window.location.href = 'index.html';//超时，跳转到登录页面；
                                } else {
                                    $(".error-main-t").html(data.message);
                                    $(".errorAlert").css("display", "block");
                                    $(".error-main").css("margin-top", -$(".error-main").height() / 2);
                                }
                            }
                        });
                        $('#questionList input[type=checkbox]:checked').parent().parent().remove();// 移除当前行
                    }
                });

                /*点击批量导出*/
                $('#daoChu1').unbind('click').click(function () {
                    //新创建的表格必须为display:block;否则生成表格获取不到内容
                    var $newTable = $('<table id="daoChuFile" class="table table-striped" style="display: block; position: absolute;z-index: -999;"></table>').appendTo($('body'));//创建空表格
                    $('#daoChuFile').show().empty();
                    $('#studentHead').clone().appendTo('#daoChuFile');//把表头添加进去  注意用到了：clone();
                    //获取选中的checkbox
                    //$('#questionList input[type=checkbox]:checked').parent().parent().clone().appendTo($('#daoChuFile'));  //注意用到了：clone();
                    $('#questionList').parent().parent().clone().appendTo($('#daoChuFile'));  //注意用到了：clone();
                    //console.log($('#daoChuFie').html()); //这部分很重要，如果表格导出为空，可通过这部分输出进行测试；
                    //调用导出插件
                    $('#daoChuFile').tableExport(
                        {
                            type: 'excel',
                            escape: 'false'
                            //                          ignoreColumn: [2,3]//忽略列
                            //                          ignoreRow: [2,3]//忽略行
                        }
                    );
                    $('#daoChuFile').hide();//执行完tableExport，获取表格之后隐藏这个表格。
                });

                //点击上一页
                $('#lastPageStuInfo').unbind('click').click(function () {
                    //studentPageSize = data.resp.pageSize;
                    if (studentPageNow <= 1) {
                        alert('已经是第一页了！');
                    } else {
                        studentPageNow--;
                        //console.log(studentPageNow);
                        getQuestionList(studentPageNow, studentPageSize, orderId, wechat, wechatName, phone, userId, beginTime, endTime);
                    }
                });
                //点击下一页
                $('#nextPageStuInfo').unbind('click').click(function () {
                    if (studentPageNow >= data.resp.pageCount) {
                        alert('已经是最后一页了！');
                    } else {
                        studentPageNow++;
                        //console.log('data.resp.pageCount',data.resp.pageCount);
                        //console.log('studentPageNow,studentPageSize',studentPageNow,studentPageSize);
                        getQuestionList(studentPageNow, studentPageSize, orderId, wechat, wechatName, phone, userId, beginTime, endTime);
                    }
                });

            } else if (data.result.code == 30000) {
                window.location.href = 'index.html';//超时，跳转到登录页面；
            } else {
                $(".error-main-t").html(data.message);
                $(".errorAlert").css("display", "block");
                $(".error-main").css("margin-top", -$(".error-main").height() / 2);
            }
        }
    });
}











/*新增需求*/


//点击导出
$('#daoChu2').unbind('click').click(function () {
    console.log('totalCount=' + totalCount);
    var textChoose = $('#textChoose').val();
    var beginDate = $('#startCampTime').val();//开营时间
    var stat = $('#campstatus option:selected').val();//参营状态
    var beginTime = $('#studentXiaDanTime').val();//下单开始时间
    var endTime = $('#studentXiaDanTimeEnd').val();//下单结束时间
    if (($('#checkbox1').prop('checked') == false) && ($('#xiaDanCheckbox').prop('checked') == false)) {
        //alert('请选中您需要的checkbox');
        getQuestionList2(1, totalCount, '', '', '', '', '', '', stat, beginDate, '', '');
    }
    if (($('#checkbox1').prop('checked') == true) && ($('#xiaDanCheckbox').prop('checked') == false)) {
        if (textChoose == '') {
            alert('内容不能为空！');
            //根据状态返回不同的列表
        } else {
            if ($('.studentsTop .select option:selected').val() == '订单号') {
                getQuestionList2(1, totalCount, textChoose, '', '', '', '', '', stat, beginDate, '', '');
            }
            if ($('.studentsTop .select option:selected').val() == '微信号') {
                getQuestionList2(1, totalCount, '', textChoose, '', '', '', '', stat, beginDate, '', '');
            }
            if ($('.studentsTop .select option:selected').val() == '微信昵称') {
                getQuestionList2(1, totalCount, '', '', textChoose, '', '', '', stat, beginDate, '', '');
            }
            if ($('.studentsTop .select option:selected').val() == '电话号') {
                getQuestionList2(1, totalCount, '', '', '', textChoose, '', '', stat, beginDate, '', '');
            }
            if ($('.studentsTop .select option:selected').val() == '有品账号') {
                getQuestionList2(1, totalCount, '', '', '', '', '', textChoose, '', stat, beginDate, '', '');

            }
            if ($('.studentsTop .select option:selected').val() == '营编号') {
                getQuestionList2(1, totalCount, '', '', '', '', '', textChoose, stat, beginDate, '', '');
            }
        }
    }
    if (($('#checkbox1').prop('checked') == false) && ($('#xiaDanCheckbox').prop('checked') == true)) {
        if (beginTime == '' || endTime == '') {
            alert('内容不能为空！');
        } else {
            getQuestionList2(1, totalCount, '', '', '', '', '', '', stat, beginDate, beginTime, endTime);
        }
    }
    if (($('#checkbox1').prop('checked') == true) && ($('#xiaDanCheckbox').prop('checked') == true)) {
        if (textChoose == '' || beginTime == '' || endTime == '') {
            alert('内容不能为空！');
        } else {
            if ($('.studentsTop .select option:selected').val() == '订单号') {
                getQuestionList2(1, totalCount, textChoose, '', '', '', '', '', stat, beginDate, beginTime, endTime);
            }
            if ($('.studentsTop .select option:selected').val() == '微信号') {
                getQuestionList2(1, totalCount, '', textChoose, '', '', '', '', stat, beginDate, beginTime, endTime);
            }
            if ($('.studentsTop .select option:selected').val() == '微信昵称') {
                getQuestionList2(1, totalCount, '', '', textChoose, '', '', '', stat, beginDate, beginTime, endTime);
            }
            if ($('.studentsTop .select option:selected').val() == '电话号') {
                getQuestionList2(1, totalCount, '', '', '', textChoose, '', '', stat, beginDate, beginTime, endTime);
            }
            if ($('.studentsTop .select option:selected').val() == '有品账号') {
                getQuestionList2(1, totalCount, '', '', '', '', textChoose, '', stat, beginDate, beginTime, endTime);

            }
            if ($('.studentsTop .select option:selected').val() == '营编号') {
                getQuestionList2(1, totalCount, '', '', '', '', '', textChoose, stat, beginDate, beginTime, endTime);
            }
        }
    }
});



//学员管理列表
function getQuestionList2(studentPageNow, studentPageSize, orderId, wechat, wechatName, phone, userId, classId, stat, beginDate, beginTime, endTime) {
    var ajaxLink = baseUrl + "v1/api/campQuestion/questionList?pageNow=" + studentPageNow + '&pageSize=' + studentPageSize +
        '&orderId=' + orderId + '&wechat=' + wechat + '&wechatName=' + wechatName + '&phone=' + phone + '&userId=' + userId + '&classId=' + classId + '&stat=' + stat + '&beginDate=' + beginDate + '&beginTime=' + beginTime + '&endTime=' + endTime + "&token=" + token + "&roleId=" + roleId;//下单时间beginTime
    console.log('ajaxLink', ajaxLink);
    $.ajax({
        type: "get",
        url: ajaxLink,
        dataType: "json",
        success: function (data) {
            console.log('11*学员管理*', data);
            if (data.result.code == 200) {
                var str = '';
                var aboutStat = '', aboutWechatState = '', aboutSex = '', aboutWeightPeriod = '', aboutBodyType = '';

                //console.log(data.resp.records.length,'长度');

                /*运动等级空着*/

                var aboutLength = 0;//计算显示的长度
                if (data.resp.pageCount != 0) {
                    (studentPageNow == data.resp.pageCount) ? (aboutLength = (data.resp.totalCount - (data.resp.pageSize * (data.resp.pageCount - 1)))) : (aboutLength = studentPageSize);
                }
                console.log('aboutLength', aboutLength);
                //console.log('aboutLength', aboutLength);
                for (var i = 0; i < aboutLength; i++) {

                    //判断如果值为null，在页面显示为空字符串‘’；
                    for (var item in data.resp.records[i]) {
                        //console.log(data.resp[i][item]);
                        if (data.resp.records[i][item] == null) {
                            data.resp.records[i][item] = '';
                        }
                    }
                    /*参营状态*/
                    //console.log(data.resp.records[i].stat,'*********');
                    switch (data.resp.records[i].stat) {
                        case 0:
                            aboutStat = "新生";
                            break;
                        case 1:
                            aboutStat = "续营";
                            break;
                        case 2:
                            aboutStat = "(新生)延期";
                            break;
                        case 3:
                            aboutStat = "退营";
                            break;
                        case 4:
                            aboutStat = "插班";
                            break;
                        case 5:
                            aboutStat = "换班";
                            break;
                        case 6:
                            aboutStat = "(续营)延期";
                            break;
                    }

                    /*微信添加*/
                    switch (data.resp.records[i].wechatState) {
                        case 0:
                            aboutWechatState = "已申请";
                            break;
                        case 1:
                            aboutWechatState = "已添加";
                            break;
                        case 2:
                            aboutWechatState = "无此微信";
                            break;
                        case 3:
                            aboutWechatState = "信息有误";
                            break;
                    }
                    /*性别*/
                    switch (data.resp.records[i].sex) {
                        case 0:
                            aboutSex = "女";
                            break;
                        case 1:
                            aboutSex = "男";
                            break;
                    }
                    /* 测量时段*/
                    switch (data.resp.records[i].weightPeriod) {
                        case 0:
                            aboutWeightPeriod = "04-12时 上午";
                            break;
                        case 1:
                            aboutWeightPeriod = "12-16时 下午";
                            break;
                        case 2:
                            aboutWeightPeriod = "16-20时 傍晚";
                            break;
                        case 3:
                            aboutWeightPeriod = "20-24时 夜晚";
                            break;
                    }
                    /*身体类型*/
                    switch (data.resp.records[i].bodyType) {
                        case 0:
                            aboutBodyType = "";
                            break;
                        case 1:
                            aboutBodyType = "隐性肥胖";
                            break;
                        case 2:
                            aboutBodyType = "肥胖";
                            break;
                        case 3:
                            aboutBodyType = "肌肉型肥胖";
                            break;
                        case 4:
                            aboutBodyType = "缺乏锻炼型";
                            break;
                        case 5:
                            aboutBodyType = "标准型";
                            break;
                        case 6:
                            aboutBodyType = "标准肌肉型";
                            break;
                        case 7:
                            aboutBodyType = "偏瘦型";
                            break;
                        case 8:
                            aboutBodyType = "偏瘦肌肉型";
                            break;
                        case 9:
                            aboutBodyType = "肌肉发达型";
                            break;
                    }
                    /* 是否体侧*/
                    switch (data.resp.records[i].isFianco) {
                        case 0:
                            isFianco = "否";
                            break;
                        case 1:
                            isFianco = "是";
                            break;
                    }

                    str += '<tr>' +
                        '<td>' + "'" + data.resp.records[i].orderId + '</td><td>' + aboutStat + '</td><td>' + data.resp.records[i].lastCoach + '</td><td>' + data.resp.records[i].lastCampName + '</td>' +
                        '<td>' + data.resp.records[i].coach + '</td><td>' + data.resp.records[i].campName + '</td><td>' + data.resp.records[i].stuId + '</td><td>' + data.resp.records[i].beginTime + '</td><td>' + data.resp.records[i].wechat + '</td>' +
                        '<td>' + data.resp.records[i].wechatName + '</td><td>' + aboutWechatState + '</td><td>' + data.resp.records[i].phone + '</td><td>' + data.resp.records[i].userId + '</td><td>' + aboutSex + '</td>' +
                        '<td>' + data.resp.records[i].height + '</td><td>' + data.resp.records[i].age + '</td><td>' + data.resp.records[i].lastc + '</td><td>' + data.resp.records[i].weight + '</td><td>' + data.resp.records[i].bodyFat + '</td>' +
                        '<td>' + aboutBodyType + '</td><td>' + data.resp.records[i].target + '</td><td></td><td>' + aboutWeightPeriod + '</td><td>' + data.resp.records[i].career + '</td>' +
                        '<td>' + data.resp.records[i].area + '</td><td>' + data.resp.records[i].physicalPeriod + '</td><td>' + data.resp.records[i].mostTargt + '</td><td>' + data.resp.records[i].careContent + '</td><td>' + data.resp.records[i].bodyParts + '</td>' +
                        '<td>' + data.resp.records[i].badEat + '</td><td>' + data.resp.records[i].eatType + '</td><td>' + data.resp.records[i].sportTimes + '</td><td>' + data.resp.records[i].sportVenues + '</td><td>' + data.resp.records[i].sportlong + '</td>' +
                        '<td>' + data.resp.records[i].sportInjury + '</td><td>' + data.resp.records[i].injuryDesc + '</td><td>' + data.resp.records[i].sick + '</td><td>' + data.resp.records[i].address + '</td><td>' + data.resp.records[i].postcode + '</td>' +
                        '<td>' + data.resp.records[i].remark + '</td><td>' + isFianco + '</td><td class="editStudent blue">编辑</td>' +
                        '</tr>';
                }
                $('#studentHead #dingdanhao').css({
                    'border': '1px solid black',
                    'backgroundColor': '#00B050'
                });
                //$('#questionList').empty().append(str); //学员管理列表页
                var $questionList2 = $('<tbody id="questionList2"></tbody>').append(str);//创建空表格
                // console.log($questionList2);
                //console.log("$('#questionList2')",$('#questionList').html());


                /*点击批量导出*/
                //新创建的表格必须为display:block;否则生成表格获取不到内容
                var $newTable = $('<table id="daoChuFile2" class="table table-striped" style="display: block; position: absolute;z-index: -999;"></table>').appendTo($('body'));//创建空表格
                $('#daoChuFile2').show().empty();
                //把表头添加进去  注意用到了：clone();
                $('#studentHead').clone().appendTo('#daoChuFile2');
                //获取选中的checkbox
                //$('#questionList input[type=checkbox]:checked').parent().parent().clone().appendTo($('#daoChuFile2'));  //注意用到了：clone();
                $questionList2.appendTo($('#daoChuFile2'));  //注意用到了：clone();
                // console.log(111111);
                //console.log($('#daoChuFile2').html()); //这部分很重要，如果表格导出为空，可通过这部分输出进行测试；
                //导出表格插件
                $('#daoChuFile2').tableExport(
                    {
                        type: 'excel',
                        escape: 'false'
                        //                          ignoreColumn: [2,3]//忽略列
                        //                          ignoreRow: [2,3]//忽略行
                    }
                );
                $('#daoChuFile2').hide();//执行完tableExport，获取表格之后隐藏这个表格。


            } else if (data.result.code == 30000) {
                window.location.href = 'index.html';//超时，跳转到登录页面；
            } else {
                $(".error-main-t").html(data.message);
                $(".errorAlert").css("display", "block");
                $(".error-main").css("margin-top", -$(".error-main").height() / 2);
            }
        }
    });
}