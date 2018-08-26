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
        size: 10,
        target: $("#visitList"),
        pagination: $("#paginationBox"),
        ajaxType: 'GET',
        url: inter.getApiUrl().searchTodayVisit,
        param: {
            // newsStatus: 1
        },
        listName: 'searchResult',
        itemTpl: '<tr><td><span class="#{previewClass}" data-status=#{newsStatus} data-id=#{albumId}>#{albumName}</span></td><td>#{pv}</td><td>#{uv}</td><td>#{vv}</td><td>#{iv}</td><td class="text-right"><a class="history-link" href="dataHistory.html?albumId=#{albumId}">历史数据</a></td></tr>',
        getDataCallback: function(json){
            for (var i = 0; i < json.data.searchResult.length; i++) {
                if(json.data.searchResult[i].newsStatus == 0 || json.data.searchResult[i].newsStatus == 1){
                    json.data.searchResult[i].previewClass = "preview-link";
                }
                json.data.searchResult[i].pv = json.data.searchResult[i].todayVisit.pv ? json.data.searchResult[i].todayVisit.pv : '-';
                json.data.searchResult[i].uv = json.data.searchResult[i].todayVisit.uv ? json.data.searchResult[i].todayVisit.uv : '-';
                json.data.searchResult[i].vv = json.data.searchResult[i].todayVisit.vv ? json.data.searchResult[i].todayVisit.vv : '-';
                json.data.searchResult[i].iv = json.data.searchResult[i].todayVisit.iv ? json.data.searchResult[i].todayVisit.iv : '-';
            }
            return json.data;
        },
    };
    dataList.init(paginationOptions);


    $("#visitList").on("click", ".preview-link", function(){
        var previewUrl = preview_root + '?albumId=' + $(this).attr("data-id");
        if($(this).attr("data-status") == "0"){
            window.open(previewUrl + "&preview=true", "_blank");
        } else {
            window.open(previewUrl, "_blank");
        }
    })

    $("#searchBox").on("click", "#searchQuery", function() {
        paginationOptions.param.q = $(this).siblings(".ipt").val();
        dataList.init(paginationOptions);
    }).on("keydown", ".ipt", function(e) {
        if(e.keyCode == 13){
            paginationOptions.param.q = $(this).val();
            dataList.init(paginationOptions);
        }
    })
})