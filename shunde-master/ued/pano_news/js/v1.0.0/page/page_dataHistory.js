require([
    'common/interface',
    'common/util',
    'common/errCode',
    'module/cookie',
    'module/checkForm',
    'module/dataList'
], function (inter, util, errCode, cookie, check, dataList) {
    //分页设置
    var paginationOptions = {
        size: Infinity,
        target: $("#visitList"),
        pagination: $("#paginationBox"),
        ajaxType: 'GET',
        url: inter.getApiUrl().getVisit,
        param: {
            albumId: util.getQueryString("albumId")
        },
        listName: 'resultArr',
        itemTpl: '<tr><td>#{time}</td><td>#{pv}</td><td>#{uv}</td><td>#{vv}</td><td>#{iv}</td></tr>',
        getDataCallback: function(json){
            // for (var i = 0; i < json.data.historyVisits.length; i++) {
                var i = 0, result={};
                var resultArr = [];
            for( var item in json.data.historyVisits) {
                // var item = json.data.historyVisits[i];
                    resultArr[i] = {};
                    resultArr[i].time = item;
                    resultArr[i].pv = json.data.historyVisits[item].pv? json.data.historyVisits[item].pv : '-';
                    resultArr[i].uv = json.data.historyVisits[item].uv? json.data.historyVisits[item].uv : '-';
                    resultArr[i].vv = json.data.historyVisits[item].vv? json.data.historyVisits[item].vv : '-';
                    resultArr[i].iv = json.data.historyVisits[item].iv? json.data.historyVisits[item].iv : '-';
                    i++;
                    resultArr.length = i;
            }
            resultArr.reverse();
            result.resultArr = resultArr;
            $('.history-title').html("<span onClick='history.go(-1)' style='cursor:pointer;color:#0288D1;'>当日数据</span> >" + json.data.albumName+"历史数据");
            return result;
        },
    };
    dataList.init(paginationOptions);

    $("#datetime").daterangepicker({ 
        // autoUpdateInput: false,
        startDate: util.getPickerDateStr(new Date()),
        opens : 'right', //日期选择框的弹出位置
        locale:{
            format: 'YYYY/MM/DD',
            applyLabel: '确认',
            cancelLabel: '取消',
            fromLabel: '从',
            toLabel: '到',
            weekLabel: 'W',
            customRangeLabel: 'Custom Range',
            daysOfWeek:["日","一","二","三","四","五","六"],
            monthNames: ["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],
        }
    }, function (start, end, label) {
        $("#datetime").val(start.format('YYYY/MM/DD') + ' - ' + end.format('YYYY/MM/DD'));
        paginationOptions.param.fromDate = start.format('YYYYMMDD');
        paginationOptions.param.toDate = end.format('YYYYMMDD');
        dataList.init(paginationOptions);
    }).on('cancel.daterangepicker', function() {
        // $(this).val("");
        // if(paginationOptions.param.fromDate){
        //     paginationOptions.param.fromDate = '';
        //     paginationOptions.param.toDate = '';
        //     dataList.init(paginationOptions);
        // }
    })
    $('.date-wrap i').click(function() {
        $(this).parent().find('input').click();
    });
    $("#searchBox").on("click", "#searchQuery", function() {
        paginationOptions.param.q = $(this).siblings(".ipt").val();
        dataList.init(paginationOptions);
    }).on("keydown", ".ipt", function(e) {
        if(e.keyCode == 13){
            paginationOptions.param.q = $(this).siblings(".ipt").val();
            dataList.init(paginationOptions);
        }
    })
})