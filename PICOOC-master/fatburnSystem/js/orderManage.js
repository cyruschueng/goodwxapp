//通过localStorage获取token值
var token = localStorage.getItem("token");
var roleId = Number(localStorage.getItem("roleId"));
var userId = Number(localStorage.getItem("userId"));
//console.log("token:"+token, "roleId:"+roleId);
var pageCount;//总页数，作为全局变量
var totalCount;//订单总数，作为全局变量
$(function () {
    //下单时间格式化显示
    $('#orderBeginTime,#orderEndTime').datetimepicker({
        showSecond: true,
        changeMonth: true,
        changeYear: true,
        timeFormat: 'hh:mm:ss',//样式可以自定义
        dateFormat: 'yy-mm-dd'
    });
    //点击筛选
    $('#orderShaiXuan').unbind('click').click(function () {
        var orderTypes = $('#orderSelect option:selected').val();
        console.log('orderTypes=' + orderTypes);
        var keyWords = $('#orderChooseItem').val();
        var beginTime = $('#orderBeginTime').val();
        var endTime = $('#orderEndTime').val();
        //$('#orderCheckbox2').prop("checked")
        //都没有选中
        if (($('#orderCheckbox1').prop('checked') == false) && ($('#orderCheckbox2').prop('checked') == false) && ($('#orderCheckbox3').prop('checked') == false)) {
            alert('请选中您需要的checkbox');
        }

        //不同的筛选状态下，获取不同的列表
        if (($('#orderCheckbox1').prop('checked') == false) && ($('#orderCheckbox2').prop('checked') == false) && ($('#orderCheckbox3').prop('checked') == true)) {
            if (orderTypes == '等待付款') {
                console.log('******');
                getOrderList(orderPageNow, orderPageSize, '', '', '', 0);
            } else if (orderTypes == '已完成') {
                getOrderList(orderPageNow, orderPageSize, '', '', '', 1);
            } else if (orderTypes == '已取消') {
                getOrderList(orderPageNow, orderPageSize, '', '', '', 2);
            } else if (orderTypes == '超时关闭') {
                getOrderList(orderPageNow, orderPageSize, '', '', '', 3);
            } else if (orderTypes == '退款完成') {
                getOrderList(orderPageNow, orderPageSize, '', '', '', 5);
            }
        }


        if (($('#orderCheckbox1').prop('checked') == true) && ($('#orderCheckbox2').prop('checked') == false) && ($('#orderCheckbox3').prop('checked') == false)) {
            if (keyWords == '') {
                alert('内容不能为空！');
            } else {
                getOrderList(orderPageNow, orderPageSize, keyWords, '', '', '');
            }
        }
        if (($('#orderCheckbox1').prop('checked') == true) && ($('#orderCheckbox2').prop('checked') == false) && ($('#orderCheckbox3').prop('checked') == true)) {
            if (keyWords == '') {
                alert('内容不能为空！');
            } else {
                if (orderTypes == '等待付款') {
                    getOrderList(orderPageNow, orderPageSize, keyWords, '', '', 0);
                } else if (orderTypes == '已完成') {
                    getOrderList(orderPageNow, orderPageSize, keyWords, '', '', 1);
                } else if (orderTypes == '已取消') {
                    getOrderList(orderPageNow, orderPageSize, keyWords, '', '', 2);
                } else if (orderTypes == '超时关闭') {
                    getOrderList(orderPageNow, orderPageSize, keyWords, '', '', 3);
                } else if (orderTypes == '退款完成') {
                    getOrderList(orderPageNow, orderPageSize, keyWords, '', '', 5);
                }
            }
        }



        if (($('#orderCheckbox1').prop('checked') == false) && ($('#orderCheckbox2').prop('checked') == true) && ($('#orderCheckbox3').prop('checked') == false)) {
            if (beginTime == '' || endTime == '') {
                alert('内容不能为空！');
            } else {
                getOrderList(orderPageNow, orderPageSize, '', beginTime, endTime, '');
            }
        }
        if (($('#orderCheckbox1').prop('checked') == false) && ($('#orderCheckbox2').prop('checked') == true) && ($('#orderCheckbox3').prop('checked') == true)) {
            if (beginTime == '' || endTime == '') {
                alert('内容不能为空！');
            } else {
                if (orderTypes == '等待付款') {
                    getOrderList(orderPageNow, orderPageSize, '', beginTime, endTime, 0);
                } else if (orderTypes == '已完成') {
                    getOrderList(orderPageNow, orderPageSize, '', beginTime, endTime, 1);
                } else if (orderTypes == '已取消') {
                    getOrderList(orderPageNow, orderPageSize, '', beginTime, endTime, 2);
                } else if (orderTypes == '超时关闭') {
                    getOrderList(orderPageNow, orderPageSize, '', beginTime, endTime, 3);
                } else if (orderTypes == '退款完成') {
                    getOrderList(orderPageNow, orderPageSize, '', beginTime, endTime, 5);
                }
            }
        }



        if (($('#orderCheckbox1').prop('checked') == true) && ($('#orderCheckbox2').prop('checked') == true) && ($('#orderCheckbox3').prop('checked') == false)) {
            if (keyWords == '' || beginTime == '' || endTime == '') {
                alert('内容不能为空！');
            } else {
                getOrderList(orderPageNow, orderPageSize, keyWords, beginTime, endTime, '');
            }
        }
        if (($('#orderCheckbox1').prop('checked') == true) && ($('#orderCheckbox2').prop('checked') == true) && ($('#orderCheckbox3').prop('checked') == true)) {
            if (keyWords == '' || beginTime == '' || endTime == '') {
                alert('内容不能为空！');
            } else {
                if (orderTypes == '等待付款') {
                    getOrderList(orderPageNow, orderPageSize, keyWords, beginTime, endTime, 0);
                } else if (orderTypes == '已完成') {
                    getOrderList(orderPageNow, orderPageSize, keyWords, beginTime, endTime, 1);
                } else if (orderTypes == '已取消') {
                    getOrderList(orderPageNow, orderPageSize, keyWords, beginTime, endTime, 2);
                } else if (orderTypes == '超时关闭') {
                    getOrderList(orderPageNow, orderPageSize, keyWords, beginTime, endTime, 3);
                } else if (orderTypes == '退款完成') {
                    getOrderList(orderPageNow, orderPageSize, keyWords, beginTime, endTime, 5);
                }
            }
        }
    });

    var orderPageNow = 1;//当前页数；
    var orderPageSize = 50;//订单管理列表每页显示条数；

    $('.orderManage').unbind('click').click(function () {
        getOrderList(orderPageNow, orderPageSize, '', '', '', '');
    });

    //点击返回订单管理首页
    $('#returnOrderList').unbind('click').click(function () {
        getOrderList(orderPageNow, orderPageSize, '', '', '', '');
    });

});

//获取订单管理列表
function getOrderList(orderPageNow, orderPageSize, keyWords, beginTime, endTime, orderTypes) {

    var ajaxLink = baseUrl + "v1/api/campAdmin/findOrders?pageNow=" + orderPageNow + '&pageSize=' + orderPageSize + '&keyWords=' + keyWords + '&beginTime=' + beginTime + '&endTime=' + endTime + '&orderType=' + orderTypes + "&token=" + token + "&roleId=" + roleId;
    //console.log(ajaxLink);
    $.ajax({
        type: "get",
        url: ajaxLink,
        dataType: "json",
        success: function (data) {
            console.log('11*订单管理*', data);
            if (data.result.code == 200) {
                var str = '';
                pageCount = data.resp.pageCount; //总页数，作为全局变量
                totalCount = data.resp.totalCount; //订单总数，作为全局变量
                $('#orderCount').html(totalCount);
                var aboutLength = 0;//计算显示的长度
                if (data.resp.pageCount != 0) {
                    (orderPageNow == data.resp.pageCount) ? aboutLength = (data.resp.totalCount - (data.resp.pageSize * (data.resp.pageCount - 1))) : aboutLength = orderPageSize;
                }

                var paymentType = '';//支付方式
                var aboutOrderType;//订单状态
                var paymentTime2; //支付时间
                var isActive = '';//激活状态
                console.log('aboutLength=' + aboutLength);
                for (var i = 0; i < aboutLength; i++) {
                    //判断如果值为null，在页面显示为空字符串‘’；
                    for (var items in data.resp.records[i]) {
                        //console.log(data.resp[i][item]);
                        if (data.resp.records[i][items] == null) {
                            data.resp.records[i][items] = '';
                        }
                    }
                    if (data.resp.records[i].paymentType == 0) {//支付方式：0-'',1-'微信'
                        paymentType = '';
                    } else if (data.resp.records[i].paymentType == 1) {
                        paymentType = '微信';
                    }
                    /*订单状态*/
                    switch (data.resp.records[i].orderType) {
                        case 0:
                            aboutOrderType = "等待付款";
                            break;
                        case 1:
                            aboutOrderType = "已完成";
                            break;
                        case 2:
                            aboutOrderType = "取消";
                            break;
                        case 3:
                            aboutOrderType = "超时关闭";
                            break;
                        case 5:
                            aboutOrderType = "退款完成";
                            break;
                    }
                    /*激活状态*/
                    switch (data.resp.records[i].isActive) {
                        case 0:
                            isActive = "已使用";
                            break;
                        case 1:
                            isActive = "未使用";
                            break;
                        case 2:
                            isActive = "已过期";
                    }
                    paymentTime2 = data.resp.records[i].paymentTime.split(" ")[1];
                    if (paymentTime2 == null) {
                        paymentTime2 = '';
                    }
                    str += '<tr>' +
                        '<td>' + "'" + data.resp.records[i].orderId + '</td><td>' + data.resp.records[i].goodsName + '</td><td>' + data.resp.records[i].goodsId + '</td>' +
                        '<td>' + data.resp.records[i].origPrice + '</td><td>' + data.resp.records[i].currentPrice + '</td><td>' + data.resp.records[i].couponPrice + '</td><td>' + data.resp.records[i].paymentTime.split(" ")[0] + '</td><td>' + paymentTime2 + '</td><td>' + paymentType + '</td>' +
                        '<td>' + data.resp.records[i].paymentCode.substring(0, 18) + '</br>' + data.resp.records[i].paymentCode.substring(18) + '</td><td>' + data.resp.records[i].createTime.split(" ")[0] + '</td><td>' + data.resp.records[i].createTime.split(" ")[1] + '</td><td>' + data.resp.records[i].sourceType + '</td><td>' + aboutOrderType + '</td>' +
                        '<td>' + data.resp.records[i].trafficSource + '</td><td>' + data.resp.records[i].weChat + '</td><td>' + data.resp.records[i].phoneNo + '</td>' +
                        '<td>' + data.resp.records[i].userId + '</td><td>' + isActive + '</td><td>' + data.resp.records[i].remark + '</td><td class="editOrder blue">编辑</td>' +
                        '</tr>';
                }
                //console.log('pageCount',pageCount);

                $('#orderList').empty().append(str); //订单管理列表页

                /*点击批量导出*/
                aboutDaoChuOrderInfo();
                function aboutDaoChuOrderInfo() {
                    $('#orderDaoChu').unbind('click').click(function () {
                        //新创建的表格必须为display:block;否则生成表格获取不到内容
                        var $newTable = $('<table id="daoChuOrderFile" class="table table-striped" style="display: block; position: absolute;z-index: -999999;"></table>').appendTo($('body'));//创建空表格
                        $('#daoChuOrderFile').show().empty();
                        $('#orderHead').clone().appendTo('#daoChuOrderFile');//把表头添加进去  注意用到了：clone();
                        //获取选中的checkbox
                        $('#orderList').clone().appendTo($('#daoChuOrderFile'));  //注意用到了：clone();
                        //console.log($('#daoChuOrderFile').html());//这部分很重要，如果表格导出为空，可通过这部分输出进行测试；
                        $('#daoChuOrderFile').tableExport(
                            {
                                type: 'excel',
                                escape: 'false'
                                //                          ignoreColumn: [2,3]
                                //                          ignoreRow: [2,3]
                            }
                        );
                        $('#daoChuOrderFile').hide();//执行完tableExport，获取表格之后隐藏这个表格。
                    });
                }

                //编辑订单信息
                aboutEditOrderInfo();
                function aboutEditOrderInfo() {
                    var editNum;
                    $('#orderList .editOrder').unbind("click").click(function () {//点击编辑
                        editNum = $("#orderList .editOrder").index($(this));
                        //console.log('当前学员在整个列表的排序',editNum);
                        $('.orderTop,.orderContent').hide();
                        $('.orderModify').show();

                        /*if(data.resp.records[editNum].orderType == 1){ //已完成：不可修改
                            //$('.editOrderInfo .orderType').val(data.resp.records[editNum].orderType);//订单状态
                            $('.editOrderInfo .orderType').attr('disabled','disabled').get(0).selectedIndex = data.resp.records[editNum].orderType;//订单状态
                        }else{
                            $('.editOrderInfo .orderType').removeAttr('disabled').get(0).selectedIndex = data.resp.records[editNum].orderType;//订单状态
                        }*/
                        //已完成：可修改
                        $('.editOrderInfo .orderType').get(0).selectedIndex = data.resp.records[editNum].orderType;//订单状态

                        $('.editOrderInfo .weChat').val(data.resp.records[editNum].weChat);//微信号
                        $('.editOrderInfo .weChatName').val(data.resp.records[editNum].weChatName);//微信昵称
                        $('.editOrderInfo .phoneNo').val(data.resp.records[editNum].phoneNo);//电话号
                        $('.editOrderInfo .remark').val(data.resp.records[editNum].remark);//备注
                        $('.editOrderInfo .userId').val(data.resp.records[editNum].userId);//备注
                        $('.editOrderInfo .isActive').val(data.resp.records[editNum].isActive);//是否激活


                        $('.editOrderInfo .orderId').html(data.resp.records[editNum].orderId);
                        $('.editOrderInfo .goodsName').html(data.resp.records[editNum].goodsName);
                        $('.editOrderInfo .goodsCode').html(data.resp.records[editNum].goodsCode);
                        $('.editOrderInfo .origPrice').html(data.resp.records[editNum].origPrice);
                        $('.editOrderInfo .currentPrice').val(data.resp.records[editNum].currentPrice);
                        $('.editOrderInfo .couponPrice').html(data.resp.records[editNum].couponPrice);
                        $('.editOrderInfo .paymentTime').html(data.resp.records[editNum].paymentTime);
                        if (data.resp.records[editNum].paymentType == 0) {//支付方式：0-'',1-'微信'
                            $('.editOrderInfo .paymentType').html('');
                        } else if (data.resp.records[editNum].paymentType == 1) {
                            $('.editOrderInfo .paymentType').html('微信');
                        }
                        $('.editOrderInfo .paymentCode').html(data.resp.records[editNum].paymentCode);
                        $('.editOrderInfo .createTime').html(data.resp.records[editNum].createTime);
                        $('.editOrderInfo .sourceType').html(data.resp.records[editNum].sourceType);
                        $('.editOrderInfo .trafficSource').html(data.resp.records[editNum].trafficSource);
                    });
                    //当为编辑状态时，点击取消：
                    $('#cancelOrderInfo').unbind("click").click(function () {
                        $('.orderTop,.orderContent').show();
                        $('.orderModify').hide();
                    });
                    //当为编辑状态时，点击保存：
                    $('#saveOrderInfo').unbind("click").click(function () {
                        var orderId = data.resp.records[editNum].orderId;
                        var goodsId = data.resp.records[editNum].goodsId;
                        //var orderType = $('.editOrderInfo .orderType').val();
                        var orderType;
                        var weChat = $('.editOrderInfo .weChat').val();
                        var weChatName = $('.editOrderInfo .weChatName').val();
                        var phoneNo = $('.editOrderInfo .phoneNo').val();
                        var remark = $('.editOrderInfo .remark').val();
                        var userId = $('.editOrderInfo .userId').val();
                        var currentPrice = $('.editOrderInfo .currentPrice').val();
                        switch ($('.editOrderInfo .orderType').val()) {
                            case '等待付款':
                                orderType = 0;
                                break;
                            case '已完成':
                                orderType = 1;
                                break;
                            case '取消':
                                orderType = 2;
                                break;
                            case '关闭':
                                orderType = 3;
                                break;
                            case '退款完成':
                                orderType = 5;
                                break;
                        }
                        var urlUpdateOrder = baseUrl + "v1/api/campAdmin/updateOrder?orderId=" + orderId + '&goodsId=' + goodsId
                            + '&orderType=' + orderType + '&weChat=' + weChat + '&weChatName=' + weChatName + '&phoneNo=' + phoneNo + '&currentPrice=' + currentPrice + '&remark=' + remark + '&userId=' + userId + "&token=" + token + "&roleId=" + roleId;
                        //console.log('urlUpdateOrder',urlUpdateOrder);
                        //保存编辑后的订单信息
                        $.ajax({
                            type: "get",
                            url: urlUpdateOrder,
                            dataType: "json",
                            success: function (data) {
                                console.log('22*保存编辑后的订单信息*', data);
                                if (data.result.code == 200) {
                                    alert('保存成功！');
                                    //window.location.reload();//刷新当前页面
                                    getOrderList(orderPageNow, orderPageSize, '', '', '', '');//显示最新列表
                                    $('.orderTop,.orderContent').show();
                                    $('.orderModify').hide();
                                } else if (data.result.code == 30000) {
                                    window.location.href = 'index.html';//超时，跳转到登录页面；
                                } else {
                                    $(".error-main-t").html(data.message);
                                    $(".errorAlert").css("display", "block");
                                    $(".error-main").css("margin-top", -$(".error-main").height() / 2);
                                }
                            }
                        });
                    });
                }

                //点击上一页
                $('#lastPageOrderInfo').unbind('click').click(function () {
                    if (orderPageNow <= 1) {
                        alert('已经是第一页了！');
                    } else {
                        orderPageNow--;
                        //console.log(orderPageNow);
                        getOrderList(orderPageNow, orderPageSize, keyWords, beginTime, endTime, orderTypes);
                    }
                });
                //点击下一页
                $('#nextPageOrderInfo').unbind('click').click(function () {
                    //console.log('pageCount',pageCount);
                    if (orderPageNow >= pageCount) {
                        alert('已经是最后一页了！');
                    } else {
                        orderPageNow++;
                        //console.log('data.resp.pageCount',pageCount);
                        //console.log('orderPageNow,orderPageSize',orderPageNow,orderPageSize);
                        getOrderList(orderPageNow, orderPageSize, keyWords, beginTime, endTime, orderTypes);
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

//点击导出所有  totalCount
$('#orderDaoChu2').unbind('click').click(function () {
    var orderTypes = $('#orderSelect option:selected').val();
    var keyWords = $('#orderChooseItem').val();
    var beginTime = $('#orderBeginTime').val();
    var endTime = $('#orderEndTime').val();
    //$('#orderCheckbox2').prop("checked")
    console.log('totalCount=' + totalCount);
    if (($('#orderCheckbox1').prop('checked') == false) && ($('#orderCheckbox2').prop('checked') == false) && ($('#orderCheckbox3').prop('checked') == false)) {
        //alert('请选中您需要的checkbox');
        //totalCount = 460;
        getOrderList2(1, totalCount, '', '', '', '');
    }
    if (($('#orderCheckbox1').prop('checked') == false) && ($('#orderCheckbox2').prop('checked') == false) && ($('#orderCheckbox3').prop('checked') == true)) {
        if (orderTypes == '等待付款') {
            getOrderList2(1, totalCount, '', '', '', 0);
        } else if (orderTypes == '已完成') {
            getOrderList2(1, totalCount, '', '', '', 1);
        } else if (orderTypes == '已取消') {
            getOrderList2(1, totalCount, '', '', '', 2);
        } else if (orderTypes == '超时关闭') {
            getOrderList2(1, totalCount, '', '', '', 3);
        } else if (orderTypes == '退款完成') {
            getOrderList2(1, totalCount, '', '', '', 5);
        }
    }
    if (($('#orderCheckbox1').prop('checked') == true) && ($('#orderCheckbox2').prop('checked') == false) && ($('#orderCheckbox3').prop('checked') == false)) {
        if (keyWords == '') {
            alert('内容不能为空！');
        } else {
            getOrderList2(1, totalCount, keyWords, '', '', '');
        }
    }
    if (($('#orderCheckbox1').prop('checked') == true) && ($('#orderCheckbox2').prop('checked') == false) && ($('#orderCheckbox3').prop('checked') == true)) {
        if (keyWords == '') {
            alert('内容不能为空！');
        } else {
            if (orderTypes == '等待付款') {
                getOrderList2(1, totalCount, keyWords, '', '', 0);
            } else if (orderTypes == '已完成') {
                getOrderList2(1, totalCount, keyWords, '', '', 1);
            } else if (orderTypes == '已取消') {
                getOrderList2(1, totalCount, keyWords, '', '', 2);
            } else if (orderTypes == '超时关闭') {
                getOrderList2(1, totalCount, keyWords, '', '', 3);
            } else if (orderTypes == '退款完成') {
                getOrderList2(1, totalCount, keyWords, '', '', 5);
            }
        }
    }
    if (($('#orderCheckbox1').prop('checked') == false) && ($('#orderCheckbox2').prop('checked') == true) && ($('#orderCheckbox3').prop('checked') == false)) {
        if (beginTime == '' || endTime == '') {
            alert('内容不能为空！');
        } else {
            getOrderList2(1, totalCount, '', beginTime, endTime, '');
        }
    }
    if (($('#orderCheckbox1').prop('checked') == false) && ($('#orderCheckbox2').prop('checked') == true) && ($('#orderCheckbox3').prop('checked') == true)) {
        if (beginTime == '' || endTime == '') {
            alert('内容不能为空！');
        } else {
            if (orderTypes == '等待付款') {
                getOrderList2(1, totalCount, '', beginTime, endTime, 0);
            } else if (orderTypes == '已完成') {
                getOrderList2(1, totalCount, '', beginTime, endTime, 1);
            } else if (orderTypes == '已取消') {
                getOrderList2(1, totalCount, '', beginTime, endTime, 2);
            } else if (orderTypes == '超时关闭') {
                getOrderList2(1, totalCount, '', beginTime, endTime, 3);
            } else if (orderTypes == '退款完成') {
                getOrderList2(1, totalCount, '', beginTime, endTime, 5);
            }
        }
    }
    if (($('#orderCheckbox1').prop('checked') == true) && ($('#orderCheckbox2').prop('checked') == true) && ($('#orderCheckbox3').prop('checked') == false)) {
        if (keyWords == '' || beginTime == '' || endTime == '') {
            alert('内容不能为空！');
        } else {
            getOrderList2(1, totalCount, keyWords, beginTime, endTime, '');
        }
    }
    if (($('#orderCheckbox1').prop('checked') == true) && ($('#orderCheckbox2').prop('checked') == true) && ($('#orderCheckbox3').prop('checked') == true)) {
        if (keyWords == '' || beginTime == '' || endTime == '') {
            alert('内容不能为空！');
        } else {
            if (orderTypes == '等待付款') {
                getOrderList2(1, totalCount, keyWords, beginTime, endTime, 0);
            } else if (orderTypes == '已完成') {
                getOrderList2(1, totalCount, keyWords, beginTime, endTime, 1);
            } else if (orderTypes == '已取消') {
                getOrderList2(1, totalCount, keyWords, beginTime, endTime, 2);
            } else if (orderTypes == '超时关闭') {
                getOrderList2(1, totalCount, keyWords, beginTime, endTime, 3);
            } else if (orderTypes == '退款完成') {
                getOrderList2(1, totalCount, keyWords, beginTime, endTime, 5);
            }
        }
    }
});




//获取订单管理列表
function getOrderList2(orderPageNow, orderPageSize, keyWords, beginTime, endTime, orderTypes) {

    var ajaxLink = baseUrl + "v1/api/campAdmin/findOrders?pageNow=" + orderPageNow + '&pageSize=' + orderPageSize + '&keyWords=' + keyWords + '&beginTime=' + beginTime + '&endTime=' + endTime + '&orderType=' + orderTypes + "&token=" + token + "&roleId=" + roleId;
    //console.log(ajaxLink);
    $.ajax({
        type: "get",
        url: ajaxLink,
        dataType: "json",
        success: function (data) {
            console.log('11*订单管理*', data);
            if (data.result.code == 200) {
                var str = '';
                pageCount = data.resp.pageCount; //总页数，作为全局变量
                //totalCount = data.resp.totalCount; //订单总数，作为全局变量
                var aboutLength = 0;//计算显示的长度
                if (data.resp.pageCount != 0) {
                    (orderPageNow == data.resp.pageCount) ? aboutLength = (data.resp.totalCount - (data.resp.pageSize * (data.resp.pageCount - 1))) : aboutLength = orderPageSize;
                }

                var paymentType = '';//支付方式
                var aboutOrderType;//订单状态
                var paymentTime2; //支付时间
                for (var i = 0; i < totalCount; i++) {
                    //判断如果值为null，在页面显示为空字符串‘’；
                    for (var items in data.resp.records[i]) {
                        //console.log(data.resp[i][item]);
                        if (data.resp.records[i][items] == null) {
                            data.resp.records[i][items] = '';
                        }
                    }
                    if (data.resp.records[i].paymentType == 0) {//支付方式：0-'',1-'微信'
                        paymentType = '';
                    } else if (data.resp.records[i].paymentType == 1) {
                        paymentType = '微信';
                    }
                    /*订单状态*/
                    switch (data.resp.records[i].orderType) {
                        case 0:
                            aboutOrderType = "等待付款";
                            break;
                        case 1:
                            aboutOrderType = "已完成";
                            break;
                        case 2:
                            aboutOrderType = "取消";
                            break;
                        case 3:
                            aboutOrderType = "超时关闭";
                            break;
                        case 5:
                            aboutOrderType = "退款完成";
                            break;
                    }
                    paymentTime2 = data.resp.records[i].paymentTime.split(" ")[1];
                    if (paymentTime2 == null) {
                        paymentTime2 = '';
                    }
                    str += '<tr>' +
                        '<td>' + "'" + data.resp.records[i].orderId + '</td><td>' + data.resp.records[i].goodsName + '</td><td>' + data.resp.records[i].goodsId + '</td>' +
                        '<td>' + data.resp.records[i].origPrice + '</td><td>' + data.resp.records[i].currentPrice + '</td><td>' + data.resp.records[i].couponPrice + '</td><td>' + data.resp.records[i].paymentTime.split(" ")[0] + '</td><td>' + paymentTime2 + '</td><td>' + paymentType + '</td>' +
                        '<td>' + data.resp.records[i].paymentCode.substring(0, 18) + '</br>' + data.resp.records[i].paymentCode.substring(18) + '</td><td>' + data.resp.records[i].createTime.split(" ")[0] + '</td><td>' + data.resp.records[i].createTime.split(" ")[1] + '</td><td>' + data.resp.records[i].sourceType + '</td><td>' + aboutOrderType + '</td>' +
                        '<td>' + data.resp.records[i].trafficSource + '</td><td>' + data.resp.records[i].weChat + '</td><td>' + data.resp.records[i].phoneNo + '</td>' +
                        '<td>' + data.resp.records[i].userId + '</td><td>' + data.resp.records[i].remark + '</td><td class="editOrder blue">编辑</td>' +
                        '</tr>';
                }
                //console.log('pageCount',pageCount);
                var $newbody2 = $('<tbody id="orderList2"></tbody>').append(str);//创建空表格
                //$('#orderList').empty().append(str); //订单管理列表页


                /*批量导出*/
                //新创建的表格必须为display:block;否则生成表格获取不到内容
                var $newTable2 = $('<table id="daoChuOrderFile2" class="table table-striped" style="display: block; position: absolute;z-index: -999;"></table>').appendTo($('body'));//创建空表格
                $('#daoChuOrderFile2').show().empty();
                $('#orderHead').clone().appendTo('#daoChuOrderFile2');//把表头添加进去  注意用到了：clone();
                //获取选中的checkbox
                $newbody2.appendTo($('#daoChuOrderFile2'));  //注意用到了：clone();
                console.log(1);
                console.log($('#daoChuOrderFile2').clone().html());//这部分很重要，如果表格导出为空，可通过这部分输出进行测试；
                $('#daoChuOrderFile2').tableExport(
                    {
                        type: 'excel',
                        escape: 'false'
                        //                          ignoreColumn: [2,3]
                        //                          ignoreRow: [2,3]
                    }
                );
                $('#daoChuOrderFile2').hide();//执行完tableExport，获取表格之后隐藏这个表格。



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
