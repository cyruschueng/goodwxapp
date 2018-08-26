require([
    'common/interface',
    'common/util',
    'common/errCode',
    'module/cookie',
    'module/checkForm',
    'module/dataList'
], function (inter, util, errCode, cookie, check, dataList) {
    var curState = 1;
    //分页设置
    var paginationOptions = {
        size: 10,
        target: $("#itemBox"),
        pagination: $("#paginationBox"),
        ajaxType: 'GET',
        url: inter.getApiUrl().getAlbumList,
        param: {
            newsStatus: 1
        },
        listName: 'searchResult',
        itemTpl: '<div class="item" data-id=#{albumId}><img src="#{albumThumb}"><div><span class="tag">全景新闻</span><p class="#{previewClass}" data-status=#{newsStatus}>#{albumName}</p><div class="info"><pre>#{albumInfo}</pre></div><div class="bottom"><div class="pull-right"><a class="operate op-draft">待发布</a><a class="operate op-release">发布</a><a class="operate op-edit">编辑</a><a class="operate op-delete">删除</a><a class="operate op-redraft">恢复为草稿</a><a class="operate op-remove">彻底删除</a></div><span>#{createUser} #{createDate}</span></div></div></div>',
        getDataCallback: function(json){
            for (var i = 0; i < json.data.searchResult.length; i++) {
                if(!json.data.searchResult[i].albumThumb){
                    json.data.searchResult[i].albumThumb = '../images/default_pic.png';
                }
                if(json.data.searchResult[i].newsStatus == 0 || json.data.searchResult[i].newsStatus == 1){
                    json.data.searchResult[i].previewClass = "preview-link";
                }
            }
            return json.data;
        },
    };
    dataList.init(paginationOptions);

    $("#datetime").daterangepicker({ 
        autoUpdateInput: false,
        startDate: new Date(),
        opens : 'right', //日期选择框的弹出位置
        locale:{
            format: 'YYYY-MM-DD',
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
        paginationOptions.param.fromTime = start.format('YYYYMMDD');
        paginationOptions.param.toTime = end.format('YYYYMMDD');
        dataList.init(paginationOptions);
    }).on('cancel.daterangepicker', function() {
        $(this).val("");
        if(paginationOptions.param.fromTime){
            paginationOptions.param.fromTime = '';
            paginationOptions.param.toTime = '';
            dataList.init(paginationOptions);
        }
    })
    $("#esType").on("click", "li", function(){
        var esType = $(this).attr("data-type");
        $(this).parents(".select-box").removeClass("active");
        paginationOptions.param.esType = esType;
        dataList.init(paginationOptions);
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
    $(".select-type").click(function(){
        $(".select-type").removeClass("active");
        $(this).addClass("active");
        var type = $(this).attr("data-type");
        var status = $(this).attr("data-status");
        $("#itemBox").attr("class", type);
        paginationOptions.param.newsStatus = status;
        curState = status;
        dataList.init(paginationOptions);
    })
    $("#itemBox").on("click", ".operate", function(){
        var albumId = $(this).parents(".item").attr("data-id");
        var type = $(this).attr("class").replace("operate ", "");
        if(type == "op-edit"){
            top.location.href = "mediaRelease_panoSet.html?albumId=" + albumId;
        } else {
            var newState;
            switch (type) {
                case "op-draft":
                case "op-redraft":
                    newState = 0;
                    break;
                case "op-release":
                    newState = 1;
                    break;
                case "op-delete":
                    newState = 2;
                    break;
                case "op-remove":
                    newState = 3;
                    break;
            }
            changeStatus(albumId, newState);
        }
    })
    // $('.js-to-edit').on('click', function() {
    //     window.open("mediaRelease_panoSet.html", "_blank");
    // })
    $("#itemBox").on("click", ".preview-link", function(){
        var previewUrl = preview_root + '?albumId=' + $(this).parents(".item").attr("data-id");
        if($(this).attr("data-status") == "0"){
            window.open(previewUrl + "&preview=true", "_blank");
        } else {
            window.open(previewUrl, "_blank");
        }
    })
    function changeStatus(albumId, newState){
        var url = inter.getApiUrl().changeStatus + '?albumId='+albumId+'&curState='+curState+'&newState=' + newState;
        util.setAjax(url, {}, function (json) {
            if (json.result != "0") {
                $.alert(json.msg);
            } else {
                /*setTimeout(function(){
                    $(".item[data-id="+albumId+"]").remove();
                }, 1000)
                $(".item[data-id="+albumId+"]").addClass("animated bounceOutRight");*/
                dataList.init(paginationOptions);
            }
        }, function () {
            alert('服务器繁忙，请稍后再试。');
        },"POST");
    }
})