var rordID
$(function(){
    window.parent.goTop(0)
    var hash = window.location.hash;
    init(hash);
})

//初始化
function init(hash) {
    initInputData();
    initSearch(hash);
}

//查询数据
function initSearch(hash) {
    var PageIndex = parseInt(hash.substr(1,1)) - 1;
    var url = yshurl + "SELECTProReturnList"
    var view = $("#view")
    var tpl = $("#tpl").html()
    var param = {
        ReturnStatus: $("#returnStatus").val(),
        pageindex: PageIndex * 10,
        pagesize: 10
    }
    getDataList(url, param, function(ret) {
        view.empty();
        showData(view, tpl, ret.many[0])
        if(view.text() == '暂无数据'){
            view.html('<tr><td>暂无数据</td></tr>')
        }
        //分页条数
        var returnDataTotal = ret.aaData[0].totals
        $("#paginator").empty()
        //getDataList(url, param, function(res) {
        var pageIndex = Math.ceil(returnDataTotal / param.pagesize) || 0
        $("#itemTotal").text((returnDataTotal || 0))
        $("#pageTotal").text(pageIndex)
        for(var num = 1; num <= pageIndex; num++) {
            var str = "<li class=''><a href='#" + num + "' class='page-number' onclick='setHash(" + num + ")'>" + num + "</a></li>"
            if((PageIndex + 1) == num)
                str = "<li class='active pageFlag'><a href='#" + num + "' class='page-number'>" + num + "</a></li>"
            $("#paginator").append(str)
        }
        //}, true)
    }, true)
}

//初始化搜索时间
function initInputData (){
    var myDate = new Date();
    var currentDate = myDate.Format("yyyy-MM-dd hh:mm:ss.S").substr(0,10);
    //设置前7天日期
    myDate.setDate(myDate.getDate() - 7);
    var weekAgoDate = myDate.Format("yyyy-MM-dd hh:mm:ss.S").substr(0,10);
    $("#dealTimeStart").val(weekAgoDate);
    $("#dealTimeEnd").val(currentDate);
}

function setHash (num){
    window.location.hash = num;
    var hash = window.location.hash;
    initSearch(hash);
}

$(document).on('click', '.to-ord-detail', function(){
    var self = $(this)
    window.location.href = 'rord_detail.html?orderid=' + self.data('ordid')
})
$(document).on('click', '.rordhancle', function(){
    $('#rordHandleModel').modal()
    leftCancelShade('rordHandleModel')
    rordID = $(this).data('id')
})

$(document).on('click', '#btnRordHandle', function(){
    var rordStatus = $('.rord-radio:checked').data('statu')
    var notes = $('.rord-radio:checked').parent().parent().find('.form-control').val()||''
    if(notes.length <= 0 && rordStatus != 3){
        if(rordStatus == 4){
            ysh_msg('请填写拒绝退货的原因')
        }else if(rordStatus == 2){
            ysh_msg('请填写退货寄送地址及邮编')
        }else{
            ysh_msg('请选择操作')
        }
    }else{
        if(rordStatus == 4 || rordStatus == 2 || rordStatus == 3){
            getDataList(yshurl + 'P_API_ReturnProductUpdate', {
                ReturnStatus: rordStatus,
                ProReturnId: rordID,
                notes: notes
            }, function(d){
                if(d.state == 0){
                    if(rordStatus == 4){
                        ysh_msg('退货已驳回')
                        initSearch("?1")
                        $('#rordHandleModel').modal('hide')
                    }else if(rordStatus == 2){
                        ysh_msg('退货已受理')
                        initSearch("?1")
                        $('#rordHandleModel').modal('hide')
                    }else{
                        ysh_msg('已退款,流程结束')
                        initSearch("?1")
                        $('#rordHandleModel').modal('hide')
                    }
                }
            })
        }else{
            ysh_msg('请选择操作')
        }
    }
})
$(document).on('click', '.endrord', function(){
    var self = $(this)
    rordID = self.data('id')
    ysh_confirm("是否要完成退货", "确认", "取消", function(a){
        if(a){
            getDataList(yshurl + 'P_API_ReturnProductUpdate', {
                ReturnStatus: 3,
                ProReturnId: rordID,
                notes: ""
            }, function(d){
                if(d.state == 0){
                    ysh_msg('已完成退货')
                    initSearch("?1")
                }
            })
        }
    })
})

$(document).on('change', '#returnStatus', function(){
    initSearch("?1")
})

$(document).on('click', '#btnCloseRord', function(){
    var notes = $('.close-reason').val()||''
    if(notes){
        getDataList(yshurl + 'P_API_ReturnProductUpdate', {
            ReturnStatus: 4,
            ProReturnId: rordID,
            notes: notes
        }, function(d){
            if(d.state == 0){
                ysh_msg('已关闭退货')
                initSearch("?1")
                $('#rordHandleModel').modal('hide')
            }
        })
    }else{
        ysh_msg('请填写驳回，并关闭退货流程的原因')
    }
})

$(document).on('click', '.closerord', function(){
    $('#closeRordModel').modal()
    leftCancelShade('closeRordModel')
    rordID = $(this).data('id')
})

