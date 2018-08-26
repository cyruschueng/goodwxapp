$(function () {
    var arr11 = [];
    var arr22 = [];
    var arr33 = [];
    // var token = "42c623d5a9b74026acfc103192058ca2";
    // var roleId = '257255013';
    // var baseUrl = location.protocol + '//' + location.hostname + ":18092/";
    var baseUrl = location.origin + '/';
    var token = localStorage.getItem('token');
    var roleId = localStorage.getItem('roleId');
    var PAGE_SIZE = '';
    var textIndex = 0;
    var timeIndex = 0;
    var gradeIdArr = [];//分类合成商品ID组合    
    // var checkedId = [];
    // 引入富文本插件
    var editor_inner,
        editor_out;
    KindEditor.ready(function (K) {
        editor_inner = K.create('textarea[name="content"]', {
            allowFileManager: false,
            themesPath: K.basePath,
            width: '100%',
            height: '500px',
            colorTable: [["#e64f4c", "#ed4e38", "#c52977", "#66a63e", "#4f4f57", "#7b7c83"], ["#0366d6", "#944d20", "#ba480e", "#f66f00", "#ff7e00", "#00a6a7"], ["#5c8d45", "#8807a8", "#2f76ac", "#00781c", "#007a86", "#1f539b"], ["#66659b", "#5f519d", "#573462"], ["#E53333", "#E56600", "#FF9900", "#64451D", "#DFC5A4", "#FFE500"], ["#009900", "#006600", "#99BB00", "#B8D100", "#60D978", "#00D5FF"], ["#337FE5", "#003399", "#4C33E5", "#9933E5", "#CC33E5", "#EE33EE"], ["#FFFFFF", "#CCCCCC", "#999999", "#666666", "#333333", "#000000"]],
            resizeType: 1,
            pasteType: 2,
            urlType: 'absolute'
        });

    });
    KindEditor.ready(function (K) {
        editor_out = K.create('textarea[name="content1"]', {
            allowFileManager: false,
            themesPath: K.basePath,
            width: '100%',
            height: '500px',
            colorTable: [["#e64f4c", "#ed4e38", "#c52977", "#66a63e", "#4f4f57", "#7b7c83"], ["#0366d6", "#944d20", "#ba480e", "#f66f00", "#ff7e00", "#00a6a7"], ["#5c8d45", "#8807a8", "#2f76ac", "#00781c", "#007a86", "#1f539b"], ["#66659b", "#5f519d", "#573462"], ["#E53333", "#E56600", "#FF9900", "#64451D", "#DFC5A4", "#FFE500"], ["#009900", "#006600", "#99BB00", "#B8D100", "#60D978", "#00D5FF"], ["#337FE5", "#003399", "#4C33E5", "#9933E5", "#CC33E5", "#EE33EE"], ["#FFFFFF", "#CCCCCC", "#999999", "#666666", "#333333", "#000000"]],
            resizeType: 1,
            pasteType: 2,
            urlType: 'absolute'
        });
    });
    TimePicker("#Shijian1");
    TimePicker("#Shijian2");
    // 切换个功能模块
    $('.storehead span').on('click', function () {
        $(this).addClass('backg').siblings().removeClass('backg');
        var index = $(this).index();

        // localStorage.setItem('PAGE', index);
        // PAGE_SIZE = localStorage.getItem('PAGE');
        if (index == 1) {
            getGoodsList(1, 10);
        }
        else if (index == 3) {
            $('#onLineSale').css('backgroundColor', 'green');
            $('#outLineSale').css('backgroundColor', '#ccc');
            var onlineUrl = baseUrl + 'v1/api/campSell/findClasses?token=' + token + '&roleId=' + roleId;
            getCampList(1, 10, onlineUrl);
        }
        else if (index == 5) {
            getSaleList(1, 10);
        }
        else if (index == 6) {
            findSaleOrder(1, 10, '', '', '', '');
        };
        arr11 = [];
        arr22 = [];
        arr33 = [];
        $('.classlist').find('tbody').html('');
        $('.classSelect').html('');
        $('.shangpmingc1').val('').attr('data-id', '');
        $('.content').hide().eq(index).show();
        localStorage.setItem('campsatus', '0');
        clearCamp();
        clearGoodsPage();



    });
    // 调用阿里云上传图片
    uploadImgToOSS();

    $('.inner_out input').on('click', function () {
        if ($(this).attr('checked')) {
            $('.goodsmgsout').show();
            $('.imgout').show();
            $('.tools_out').show();
        } else {
            $('.goodsmgsout').hide();
            $('.imgout').hide();
            $('.tools_out').hide();
        }
    });

    // 获取促销工具
    function getSaleTools(ele, listEle) {
        $(ele).on('input', function () {
            var that = this;
            var value = $(this).val();
            $.ajax({
                url: baseUrl + 'v1/api/campSell/getCouponName?name=' + value + '&token=' + token + '&roleId=' + roleId,
                type: 'get',
                success: function (data) {
                    console.log(data);
                    if (data.code == 200) {
                        var resp = data.resp;
                        // console.log(data.resp);
                        var liEle = '';
                        $(listEle).html('');
                        // if (resp.length > 0) {
                        for (var i = 0; i < resp.length; i++) {
                            var liEle = '<li data-id=' + resp[i].id + ' data-type=' + resp[i].type + ' >' + resp[i].name + '</li>';
                            $(listEle).show().append(liEle);
                        }
                        $(listEle).find('li').on('click', function () {
                            var id = $(this).attr('data-id');
                            var type = $(this).attr('data-type');
                            var name = $(this).text();
                            $(this).parent().empty();
                            $(that).attr('data-id', id).attr('data-type', type).val(name);
                        });

                    }
                },
                error: function (data) {
                    swal(data.message)
                }
            })
        });
        // $(ele).on('blur', function () {
        //     $(listEle).hide()
        // })
    }
    getSaleTools('.toolsName_inner', '.toolsContent_inner');
    getSaleTools('.toolsName_out', '.toolsContent_out');
    // 创建商品
    function createbigGclass() {
        // 获取商品种类
        var gBigclass = Number($('.gBigclass input:checked').val());
        // console.log(gBigclass);
        // 获取商品名称
        var gname = $('.gname').val();
        if ($('.gname').attr('data-id') == '' || $('.gname').attr('data-id') == null) {
            var id = '';
        }
        else {
            var id = Number($('.gname').attr('data-id'));
        }
        // console.log(gname);
        // 获取促销工具(app内)
        var inTool = $('.toolsName_inner').val();
        var inCouponId = Number($('.toolsName_inner').attr('data-id'));
        var inCouponType = $('.toolsName_inner').attr('data-type');
        // console.log(saleTools_inner);
        // 获取预热时间
        var yuReShijian = $('#yuReShijian').val();
        // 获取开售时间
        var kaishouShijian = $('#kaishouShijian').val();
        // 获取分享话术
        var shareInfo = $('.shareInfo').val();
        // 获取商品头图（app内）
        var gheadimg_inner = [];
        var img_inner = $('#imgListContentinner img');
        for (var i = 0; i < img_inner.length; i++) {
            gheadimg_inner.push({ 'url': img_inner[i].src });
        }
        // gheadimg_inner = gheadimg_inner.join(',');
        // console.log(gheadimg_inner);
        // 获取用户评价
        var userpjiaimg = [];
        
        var serpjia = $('#userpjiaimg img');
        for (var i = 0; i < serpjia.length; i++) {
            userpjiaimg.push({ 'url': serpjia[i].src });
        }
        // userpjiaimg = userpjiaimg.join(',');
        // 获取商品详情（app内）
        var html_inner = editor_inner.html();
        console.log(html_inner);
        var gheadimg_out = '';
        var html_out = '';
        var outTool = '';
        var outCouponId = '';
        var outCouponType = '';
        if ($('.inner_out input').attr('checked')) {
            // 获取商品头图（app外）
            gheadimg_out = [];
            var img_out = $('#imgListContentout img');
            if ($('#imgListContentout img').length > 0) {
                
                for (var i = 0; i < img_inner.length; i++) {
                    gheadimg_out.push({ 'url': img_out[i].src })
                }
            }

            // gheadimg_out.join(',');
            // 获取商品详情（app外）
            html_out = editor_out.html();
            // console.log(html_out);
            // 获取促销工具(app内)
            outTool = $('.toolsName_out').val();
            outCouponId = Number($('.toolsName_out').attr('data-id'));
            outCouponType = $('.toolsName_out').attr('data-type');
        }
        else{
            gheadimg_out = gheadimg_inner;
            html_out = html_inner;
        }
        if ($.trim(gname) == '' || $.trim(gname) == null) {
            swal('请填写商品名称');
            return false;
        }
        if ($.trim(yuReShijian) == '' || $.trim(gname) == null) {
            swal('请选择预热时间');
            return false;
        }
        if ($.trim(kaishouShijian) == '' || $.trim(gname) == null) {
            swal('请选择开售时间');
            return false;
        }
        if (gheadimg_inner == '' || $.trim(gname) == null) {
            swal('请上传商品头图');
            return false;
        }
        if (userpjiaimg == '' || $.trim(gname) == null) {
            swal('请上传用户评价');
            return false;
        }
        if (html_inner == '' || $.trim(gname) == null) {
            swal('请编辑商品详情');
            return false;
        }
        var goodsinfodata = {
            'id': id,
            'type': gBigclass,
            'name': gname,
            'preheatingTime': yuReShijian,
            'saleTime': kaishouShijian,
            'inPicture': JSON.stringify(gheadimg_inner),
            'outPicture': JSON.stringify(gheadimg_out),
            'inDesc': html_inner,
            'outDesc': html_out,
            'userEvaluation': JSON.stringify(userpjiaimg),
            'shareInfo': shareInfo,
            'outTool': outTool,
            'outCouponId': outCouponId,
            'inTool': inTool,
            'inCouponId': inCouponId,
            'outCouponType': outCouponType,
            'inCouponType': inCouponType
        }
        goodsinfodata = JSON.stringify(goodsinfodata);
        console.log(goodsinfodata);
        swal({
            title: "确认保存？",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "确定",
            closeOnConfirm: '取消'
        }, function () {
            $.ajax({
                // url: 'http://172.17.1.233:8080/v1/api/campSell/operateGrade?token=' + token + '&roleId=' + roleId,
                url: baseUrl + 'v1/api/campSell/operateGrade?token=' + token + '&roleId=' + roleId,
                type: 'POST',
                data: goodsinfodata,
                dataType: 'json',
                contentType: 'application/json',
                success: function (result) {
                    if (result.code == 200) {
                        clearGoodsPage();
                        $('.content').hide().eq(1).show();
                        $('.storehead span').eq(1).addClass('backg').siblings().removeClass('backg');
                        localStorage.setItem('campsatus', '0');
                        getGoodsList(1, 10);
                    }
                },
                error: function (data) {
                    console.log('啊哦，您的网络不太给力~');
                }
            });
        })
    }
    // 清除创建商品页面
    function clearGoodsPage() {
        // 清除商品名称
        $('.gname').val('');
        $('.gname').attr('data-id', '');

        // 清除预热时间
        $('#yuReShijian').val('');
        // 清除开售时间
        $('#kaishouShijian').val('');
        // 清除促销工具
        $('.toolsName_inner').val('').attr('data-id', '');
        $('.toolsName_out').val('').attr('data-id', '');

        // 清除分享话术
        $('.shareInfo').val('');
        // 清除商品头图（app内）
        $('#imgListContentinner').empty();

        // 清除用户评价
        $('#userpjiaimg').empty();

        // 清除商品详情（app内）
        editor_inner.html('');
        // 清除商品头图（app外）
        $('#imgListContentout').empty();
        // 清除商品详情（app外）
        editor_out.html('');
    }


    // 保存商品
    $('.gsave').on('click', function () {
        createbigGclass();
    });
    getGoodNames('.shangpmingc', '.searchList');
    getGoodNames('.shangpmingc1', '.searchGradeList');
    // 获取商品名
    function getGoodNames(ele, listEle) {
        $(ele).on('input', function () {
            var value = $(this).val();
            $.ajax({
                url: baseUrl + 'v1/api/campSell/getGradeName?name=' + value + '&token=' + token + '&roleId=' + roleId,
                type: 'get',
                success: function (data) {
                    console.log(data);
                    if (data.code == 200) {
                        var resp = data.resp;
                        console.log(data.resp);
                        var liEle = '';
                        $(listEle).html('');
                        // if (resp.length > 0) {
                        for (var i = 0; i < resp.length; i++) {
                            var liEle = '<li data-id=' + resp[i].id + ' data-type=' + resp[i].type + '>' + resp[i].name + '</li>';
                            $(listEle).show().append(liEle);
                        }
                        $(listEle).find('li').on('click', function () {
                            var id = $(this).attr('data-id');
                            var name = $(this).text();
                            $(this).parent().hide();
                            $(this).parent().siblings('input').attr('data-id', id).val(name);
                            findCampName(id, '');
                        })

                    }
                    // }
                },
                error: function (data) {
                    swal(data.message)
                }
            })
        });
        //  $(ele).on('blur', function () {
        //     $(listEle).hide()
        // })
    }

    $('.campName1').on('input', function () {
        var gradeId = $('.shangpmingc1').attr('data-id');
        var gradeName = $('.shangpmingc1').val();
        var value = $.trim($(this).val());
        if (gradeName == null || gradeName == '') {
            swal('请先输入商品名称');
        } else {
            findCampName(gradeId, value);
        }
    });
    function findCampName(gradeId, className) {
        $.ajax({
            url: baseUrl + 'v1/api/campSell/getClassName?gradeId=' + gradeId + '&className=' + className + '&token=' + token + '&roleId=' + roleId,
            type: 'get',
            success: function (data) {
                if (data.code == 200) {
                    var resp = data.resp;
                    $('.classSelect').html('');
                    for (var i = 0; i < resp.length; i++) {
                        var str = '<label><input type="checkbox" data-id=' + resp[i].id + ' data-name=' + resp[i].className + '>' + resp[0].className + resp[i].beginTime + '</label>  ';
                        $('.classSelect').append(str);
                    }
                }
            }
        });
    }
    $('.addclassTable').on('click', function () {
        var str1 = '';
        var gradeName1 = $('.shangpmingc1').val();
        $('.classlist table tbody').html('');
        console.log($('.classSelect input:checked'));
        for (var j = 0; j < $('.classSelect input:checked').length; j++) {
            var classId = $($('.classSelect input:checked')[j]).attr('data-id');

            var className = $($('.classSelect input:checked')[j]).attr('data-name');
            arr11.push({ 'classId': classId, 'className': className, 'gradeName': gradeName1 });

        }

        for (var i = 0; i < arr11.length; i++) {
            if (arr22.indexOf(arr11[i].classId) == -1) {
                arr22.push(arr11[i].classId);
                arr33.push(arr11[i]);
            }
        }
        for (var m = 0; m < arr33.length; m++) {
            str1 = ' <tr>' +
                ' <td>' + arr33[m].gradeName + '</td>' +
                '<td data-id=' + arr33[m].classId + ' class="classIds">' + arr33[m].className + '</td>' +
                '<td><span style="color:red" class="delSelectClass" data-index=' + m + '>删除</span></td>' +
                '</tr>';
            $('.classlist table tbody').append(str1);
            $('.delSelectClass').on('click', function () {
                // var index = $(this).attr('data-index');
                // console.log(index);
                $(this).parents('tr').remove();
            })
        }
    });
    $('.createlinks').on('click', function () {
        var arr = []
        for (var i = 0; i < $('.classIds').length; i++) {
            arr.push($('.classIds').eq(i).attr('data-id'));
        }
        if (arr.length == 1) {
            arr = arr.join('-') + '-';
        }
        else {
            arr = arr.join('-');
        }
        // arr = arr.join('-');
        var data = {
            "sellNum": arr
        }
        data = JSON.stringify(data);
        console.log(data);
        createSaleLink(data, '.classlist');

    })
    // 创建班级类别-添加
    $('.addlistTable').on('click', function () {
        var goodsname = $('.shangpmingc').val();
        var id = $('.shangpmingc').attr('data-id');
        var campName = $.trim($('.campName').val());
        if(campName.length > 5){
            swal('营名称不超过5个字符');
            return false;
        }
        timeIndex++;
        var str = '<tr>' +
            '<td class="rowspantd" data-id=' + id + '>' + goodsname + '</td>' +
            '<td><input type="text" value="' + campName + '" data-id=""></td>' +
            '<td><input type="text" placeholder="请输入周期"/></td>' +
            '<td><input type="text" placeholder="请输入开营时间" id="kaiyingShijian2_' + timeIndex + '"/></td>' +
            '<td><input type="text" placeholder="请输入限时特价开始时间" id="tjkaishiShijian2_' + timeIndex + '" /></td>' +
            '<td><input type="text" placeholder="请输入限时特价结束时间" id="tjjieshuShijian2_' + timeIndex + '"/></td>' +
            '<td><input type="text" placeholder="请输入原价"/></td>' +
            '<td><input type="text" placeholder="请输入现价"/></td>' +
            '<td><input type="text" placeholder="请输入特价"/></td>' +
            '<td><input type="text" placeholder="请输入库存"/></td>' +
            '<td><input type="text" placeholder="请输入剩余库存"/></td>' +
            '<td><input type="checkbox"/></td>' +
            '<td class="delbanjlist" style="color:blue">删除</td>' +
            '</tr>';
        console.log("#kaiyingShijian2_" + timeIndex);

        $('.banjlist tbody').append(str);
        TimePicker("#kaiyingShijian2_" + timeIndex);
        TimePicker("#tjkaishiShijian2_" + timeIndex);
        TimePicker("#tjjieshuShijian2_" + timeIndex);
        // var num = $('.banjlist tbody tr').length;
        // 合并单元格
        // $('.rowspantd').hide().eq(0).show().attr('rowspan', num);

        // 删除列表
        $('.delbanjlist').on('click', function () {
            $(this).parent().remove();
            // $('.rowspantd').hide().eq(0).show().attr('rowspan', num - 1);

        })

    });
    // 保存营
    function saveCamp(campdata, url) {
        swal({
            title: "确认保存？",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "确定",
            closeOnConfirm: '取消'
        }, function () {
            $.ajax({
                url: url + '?token=' + token + '&roleId=' + roleId,
                type: 'POST',
                data: campdata,
                dataType: 'json',
                contentType: 'application/json',
                success: function (result) {
                    if (result.code == 200) {
                        clearCamp();
                        $('.content').hide().eq(3).show();
                        $('.storehead span').eq(3).addClass('backg').siblings().removeClass('backg');
                        var onlineUrl = baseUrl + 'v1/api/campSell/findClasses?token=' + token + '&roleId=' + roleId;
                        getCampList(1, 10, onlineUrl);
                        $('#onLineSale').css('backgroundColor', 'green');
                        $('#outLineSale').css('backgroundColor', '#ccc');
                        localStorage.setItem('campsatus', '0');
                    }
                    else {
                        swal('啊哦，您的网络不太给力~');
                    }
                },
                error: function (data) {
                    swal('啊哦，您的网络不太给力~');
                }
            })
        })
    }
    $('.campsave').on('click', function () {
        var campsatus = localStorage.getItem('campsatus');
        var url = '';
        var classId = '';

        var goosInfobody;
        var tbody = $('.banjlist tbody tr');
        // 存储营表格信息

        if (campsatus == 1) {
            for (var i = 0; i < tbody.length; i++) {
                var online;
                if ($($(tbody[i]).children()[11].childNodes[0]).attr('checked')) {
                    online = '1';
                }
                else {
                    online = '0';
                }
                var data = {
                    'gradeName': $(tbody[i].childNodes[0]).text(),
                    'gradeId': Number($(tbody[i].childNodes[0]).attr('data-id')),
                    'className': $(tbody[i].childNodes[1]).find('input').val(),
                    'lastWeeks': Number($(tbody[i].childNodes[2]).find('input').val()),
                    'beginTime': $(tbody[i].childNodes[3]).find('input').val(),
                    'limitedBegintime': $(tbody[i].childNodes[4]).find('input').val(),
                    'limitedEndtime': $(tbody[i].childNodes[5]).find('input').val(),
                    'originPrice': Number($(tbody[i].childNodes[6]).find('input').val()),
                    'curentPrice': Number($(tbody[i].childNodes[7]).find('input').val()),
                    'especialPrice': Number($(tbody[i].childNodes[8]).find('input').val()),
                    'originStock': Number($(tbody[i].childNodes[9]).find('input').val()),
                    'stock': Number($(tbody[i].childNodes[10]).find('input').val()),
                    'isOnline': Number(online),
                    'id': Number($(tbody[i].childNodes[1]).find('input').attr('data-id'))
                }

            }

            url = baseUrl + 'v1/api/campSell/updateClass';
            goosInfobody = JSON.stringify(data);
            console.log(goosInfobody);
        }
        else {
            goosInfobody = []
            for (var i = 0; i < tbody.length; i++) {
                var online;
                if ($($(tbody[i]).children()[11].childNodes[0]).attr('checked')) {
                    online = '1';
                }
                else {
                    online = '0';
                }
                var data = {
                    'gradeName': $(tbody[i].childNodes[0]).text(),
                    'gradeId': Number($(tbody[i].childNodes[0]).attr('data-id')),
                    'className': $(tbody[i].childNodes[1]).find('input').val(),
                    'lastWeeks': Number($(tbody[i].childNodes[2]).find('input').val()),
                    'beginTime': $(tbody[i].childNodes[3]).find('input').val(),
                    'limitedBegintime': $(tbody[i].childNodes[4]).find('input').val(),
                    'limitedEndtime': $(tbody[i].childNodes[5]).find('input').val(),
                    'originPrice': Number($(tbody[i].childNodes[6]).find('input').val()),
                    'curentPrice': Number($(tbody[i].childNodes[7]).find('input').val()),
                    'especialPrice': Number($(tbody[i].childNodes[8]).find('input').val()),
                    'originStock': Number($(tbody[i].childNodes[9]).find('input').val()),
                    'stock': Number($(tbody[i].childNodes[10]).find('input').val()),
                    'isOnline': Number(online),
                    'id': Number($(tbody[i].childNodes[1]).find('input').attr('data-id'))
                }
                goosInfobody.push(data);
            }

            url = baseUrl + 'v1/api/campSell/insertClassBatch';
            goosInfobody = JSON.stringify(goosInfobody);
            console.log(goosInfobody);

        }
        saveCamp(goosInfobody, url);
    });
    // 清除营
    function clearCamp() {
        $('.grade input').val('').attr('data-id', '');
        $('.campName').val('');
        $('.searchList').hide();
        $('.banjlist tbody').html('');
    }
    // 获取营列表(在线||下架)
    function getCampList(pageNow, pageSize, url) {
        var url = url;
        $.ajax({
            url: url + '&pageNow=' + pageNow + '&pageSize=' + pageSize,
            success: function (data) {
                console.log(data);
                if (data.code == 200) {
                    var resp = data.resp.records[0];
                    // console.log(resp);
                    $('.campListShow tbody').remove();
                    var str = '';
                    var objLength = 0;
                    //   var saleId = []; 
                    for (var i in resp) {

                        var info = resp[i];
                        // console.log(info.length)
                        var tbodys = '<tbody></tbody>'
                        $('.campListShow table').append(tbodys);

                        for (var j = 0; j < info.length; j++) {
                            // var isOnline = '';
                            // if (info[j].isOnline == 1) {
                            //     isOnline = '是';
                            // }
                            // else if (info[j].isOnline == 0) {
                            //     isOnline = '否';
                            // }
                            if (info[j].curentPrice == undefined || info[j].curentPrice == null) {
                                info[j].curentPrice = '';
                            }
                            if (info[j].especialPrice == undefined || info[j].especialPrice == null) {
                                info[j].especialPrice = '';
                            }
                            if (info[j].stock == undefined || info[j].stock == null) {
                                info[j].stock = '';
                            }
                            if (info[j].sellStock == undefined || info[j].sellStock == null) {
                                info[j].sellStock = '';
                            }
                            // console.log(saleId);
                            if (j == 0) {
                                var str1 = '<tr>' +
                                    '<td class="rowspantd" rowspan=' + info.length + '>' + i + '</td>' +
                                    // '<td rowspan=' + info.length + '><input type="checkbox" class="allSelect" data-goodsName=' + i + '></td>' +
                                    '<td>' + info[0].className + '</td>' +
                                    '<td>' + info[0].classId + '</td>' +
                                    '<td>' + info[0].beginTime + '</td>' +
                                    // '<td>' + info[0].limitedBegintime + '</td>' +
                                    // '<td>' + info[0].limitedEndtime + '</td>' +
                                    // '<td>' + info[0].originPrice + '</td>' +
                                    '<td>' + info[0].curentPrice + '</td>' +
                                    '<td>' + info[0].especialPrice + '</td>' +
                                    '<td>' + info[0].stock + '</td>' +
                                    '<td>' + info[0].sellStock + '</td>' +
                                    '<td>' + info[0].createTime + '</td>' +
                                    // '<td><input type="checkbox" data-id=' + info[0].id + ' data-isOnLine=' + info[0].isOnline + ' data-className=' + info[0].className + ' class="singleSelect" data-goodsName=' + i + '></input></td>' +
                                    '<td style="color:blue"><span class="editCamp" data-id=' + info[0].classId + '>编辑</span>/<span class="delCamp" data-id=' + info[0].classId + '>删除</span></td>' +
                                    '</tr>';
                                // console.log(str1);
                                $($('.campListShow table tbody')[objLength]).append(str1);
                            }
                            else if (j > 0) {
                                var str2 = '<tr>' +
                                    '<td>' + info[j].className + '</td>' +
                                    '<td>' + info[j].classId + '</td>' +
                                    '<td>' + info[j].beginTime + '</td>' +
                                    // '<td>' + info[j].limitedBegintime + '</td>' +
                                    // '<td>' + info[j].limitedEndtime + '</td>' +
                                    '<td>' + info[j].curentPrice + '</td>' +
                                    '<td>' + info[j].especialPrice + '</td>' +
                                    '<td>' + info[j].stock + '</td>' +
                                    '<td>' + info[j].sellStock + '</td>' +
                                    '<td>' + info[j].createTime + '</td>' +
                                    // '<td><input type="checkbox" data-id=' + info[j].id + ' data-isOnLine=' + info[j].isOnline + ' data-className=' + info[j].className + ' class="singleSelect" data-goodsName=' + i + '></input></td>' +
                                    '<td style="color:blue"><span class="editCamp" data-id=' + info[j].classId + '>编辑</span>/<span class="delCamp" data-id=' + info[j].classId + '>删除</span></td>' +
                                    '</tr>';
                                // console.log(str2);
                                $($('.campListShow table tbody')[objLength]).append(str2);
                            }
                        }
                        objLength++;
                    }

                    // 删除营
                    $('.delCamp').on('click', function () {
                        var _this = this;
                        var id = $(this).attr('data-id');
                        swal({
                            title: "确认删除",
                            showCancelButton: true,
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: "确定",
                            closeOnConfirm: '取消'
                        }, function () {
                            $.ajax({
                                url: baseUrl + 'v1/api/campSell/deleteClass?ids=' + id + '&token=' + token + '&roleId=' + roleId,
                                type: 'DELETE',
                                success: function (data) {
                                    if (data.code == 200) {
                                        var length = $(_this).parents('tbody').find('tr').length;
                                        var index = $(_this).attr('data-index');
                                        var nowlength = length-1;
                                        if(length > 1){
                                            if(index == 0){
                                                var name = $(_this).parents('tr').find('td').eq(0).text();
                                                $(_this).parents('tbody').find('tr').eq(1).prepend('<td rowspan="'+nowlength+'">'+name+'</td>');
                                                $(_this).parents('tr').remove();
                                            }
                                            else{
                                                $(_this).parents('tr').remove();
                                                // $(_this).parents('tr').find('td').eq(0).attr('rowsapn',length-1);
                                            }
                                        }
                                        else{
                                            $(_this).parents('tbody').remove();
                                            // $(_this).parents('tr').remove();
                                        }
                                       
                                    }
                                }

                            })
                        })

                    })
                    //编辑营
                    $('.editCamp').on('click', function () {
                        var id = $(this).attr('data-id');
                        localStorage.setItem('campsatus', '1');
                        $('.content').hide().eq(2).show();
                        $('.storehead span').eq(2).addClass('backg').siblings().removeClass('backg');
                        editCamp(id);
                    });
                    // 下一页
                    if (data.resp.pageCount > data.resp.pageNow) {
                        $("#campAfter").css("background-color", "green");
                        $("#campAfter").unbind("click").click(function () {
                            getCampList(data.resp.pageNow + 1, 10, url);
                        });
                    } else {
                        $("#campAfter").css("background-color", "#ccc");
                        $("#campAfter").unbind("click");
                    }
                    // 上一页
                    if (data.resp.pageNow > 1) {
                        $("#campBefore").css("background-color", "green");
                        $("#campBefore").unbind("click").click(function () {
                            getCampList(data.resp.pageNow - 1, 10, url);
                        });
                    } else {
                        $("#campBefore").css("background-color", "#ccc");
                        $("#campBefore").unbind("click");
                    }
                    // 点击商品按钮
                    $('.allSelect').on('click', function () {
                        var select = $(this).parents('tbody').find('.singleSelect');
                        var goodsName = $(this).attr('data-goodsName');
                        var checkedId = [];
                        if ($(this).attr('checked')) {
                            select.attr('checked', 'checked');

                            for (var i = 0; i < select.length; i++) {
                                $(select[i]).attr('checked', 'checked');
                                checkedId.push($(select[i]).attr('data-id'));

                            }
                            var str = '<div data-id=' + checkedId + ' id="slectText' + textIndex + '" class="slectText">' + goodsName + '</div>';
                            $('.createArea').append(str);
                            dragText('.slectText');
                            textIndex++;

                        }
                        else {
                            // console.log(textIndex);
                            select.removeAttr('checked');
                            // $("#slectText" + textIndex).remove();
                            textIndex--;
                            for (var i = 0; i < checkedId.length; i++) {
                                for (var j = 0; j < select.length; j++) {
                                    if (checkedId[i] == $(select[j]).attr('data-id')) {
                                        checkedId.splice(i, 1);
                                        j--;
                                    }
                                }

                            }
                        }

                        console.log(checkedId);
                    });
                    // 点击营按钮
                    $('.singleSelect').on('click', function () {
                        var goodsName = $(this).attr('data-goodsName');
                        var className = $(this).attr('data-className');
                        if ($(this).attr('checked')) {
                            var id = $(this).attr('data-id');
                            var str = '<div data-id=' + id + ' id="slectText' + textIndex + '" class="slectText1">' + goodsName + '-' + className + '</div>';
                            $('.createArea').append(str);
                            dragText('.slectText1');
                            textIndex++;
                        }
                        else {
                            textIndex--;
                        }

                    });


                }

            },
            error: function (data) {
                swal('请求失败');
            }
        })
    }
    // 获取下架营
    $('#outLineSale').on('click', function () {
        $(this).css('backgroundColor', 'green');
        $('#onLineSale').css('backgroundColor', '#ccc');
        var outLineUrl = baseUrl + 'v1/api/campSell/findOffClasses?token=' + token + '&roleId=' + roleId;
        getCampList(1, 10, outLineUrl);
    });
    // 获取下架营
    $('#onLineSale').on('click', function () {
        $(this).css('backgroundColor', 'green');
        $('#outLineSale').css('backgroundColor', '#ccc');
        var onLineUrl = baseUrl + 'v1/api/campSell/findClasses?token=' + token + '&roleId=' + roleId;
        getCampList(1, 10, onLineUrl);
    })
    // 拖拽
    function dragText(ele) {
        var TextElement = document.querySelectorAll(ele);
        for (var i = 0; i < TextElement.length; i++) {
            TextElement[i].draggable = true;
            TextElement[i].ondragstart = function (n) {
                return function (event) {
                    event.dataTransfer.setData("Text", event.target.id)
                    // event.dataTransfer.setData("image", event.target.src);
                }
            }(i)
            TextElement[i].ondragover = function (event) {
                event.preventDefault()
            };
            TextElement[i].ondrop = function (n) {
                return function (event) {
                    var dataStr = event.dataTransfer.getData("Text");
                    console.log(dataStr);
                    var from = document.querySelector('#' + dataStr);
                    var thisText = $(this).text();
                    var thisId = $(this).attr('data-id');
                    var fromText = $(from).text();
                    var fromId = $(from).attr('data-id');
                    $(this).text(fromText);
                    $(this).attr('data-id', fromId);
                    $(from).text(thisText);
                    $(from).attr('data-id', thisId);
                    event.preventDefault();
                    event.stopPropagation();
                }
            }(i)
        }
    }
    // 编辑商品
    function editShangp(id) {
        $.ajax({
            type: "get",
            url: baseUrl + 'v1/api/campSell/getGradeById?token=' + token + '&id=' + id + '&roleId=' + roleId,
            success: function (data) {
                if (data.code == 200) {
                    var data = data.resp;
                    console.log(data);
                    var gBigclass = $('.gBigclass input');
                    // 选择商品大类
                    for (var i = 0; i < gBigclass.length; i++) {
                        if ($(gBigclass[i]).val() == data.type) {
                            gBigclass.removeAttr('checked').eq(i).attr('checked', 'checked');
                        }
                    }
                    // 获取商品名称
                    $('.gname').val(data.name);
                    $('.gname').attr('data-id', data.id);
                    // 获取预热时间
                    $('#yuReShijian').val(data.preheatingTime);
                    // 获取开售时间
                    $('#kaishouShijian').val(data.saleTime);
                    // 获取促销工具
                    $('.toolsName_inner').val(data.inTool).attr('data-id', data.inCouponId).attr('data-type', data.inCouponType);
                    $('.toolsName_out').val(data.outTool).attr('data-id', data.outCouponId).attr('data-type', data.outCouponType);
                    // 获取分享话术
                    $('.shareInfo').val(data.shareInfo);
                    // 获取商品头图（app内）
                    // var inPicture = data.inPicture.split(',');


                    var imgIndex12 = 0;
                    $("#imgListContentinner").empty();
                    if (data.inPicture != '' || data.inPicture != null) {

                        var inPicture = JSON.parse(data.inPicture);
                        for (var i = 0; i < inPicture.length; i++) {
                            var str1 = '<div class="upload_append_list" index12=' + imgIndex9 + '>' +
                                '<div class="file_bar">' +
                                '<div style="padding:5px;">' +
                                '<p class="file_name"></p>' +
                                '<span class="file_del" data-index12=' + imgIndex9 + ' title="删除"></span>' +
                                '</div>' +
                                '</div>' +
                                '<a style="height:100px;width:120px;" href="#" class="imgBox" >' +
                                '<div class="uploadImg" style="width:105px;">' +
                                '<img class="upload_image innerimg" id="dragimginner' + imgIndex9 + '" src=' + inPicture[i].url + ' style="width:expression(this.width > 105 ? 105px :this.width)">' +
                                '</div>' +
                                '</a>' +
                                '</div>';
                            imgIndex9++;

                            $("#imgListContentinner").append(str1);
                            delImg(9);
                        }
                        dragImg('.innerimg');
                    }
                    // var imgIndex13 = 0;
                    $('#userpjiaimg').empty();
                    if (data.userEvaluation != '' || data.userEvaluation != null) {
                        // 获取用户评价
                        var userEvaluation = JSON.parse(data.userEvaluation);

                        for (var i = 0; i < userEvaluation.length; i++) {
                            var str2 = '<div class="upload_append_list" index13=' + imgIndex11 + '>' +
                                '<div class="file_bar">' +
                                '<div style="padding:5px;">' +
                                '<p class="file_name"></p>' +
                                '<span class="file_del" data-index13=' + imgIndex11 + ' title="删除"></span>' +
                                '</div>' +
                                '</div>' +
                                '<a style="height:100px;width:120px;" href="#" class="imgBox" >' +
                                '<div class="uploadImg" style="width:105px;">' +
                                '<img class="upload_image userpjimg" id="dragimgPj' + imgIndex11 + '" src=' + userEvaluation[i].url + ' style="width:expression(this.width > 105 ? 105px :this.width)">' +
                                '</div>' +
                                '</a>' +
                                '</div>';
                            imgIndex11++;
                            $("#userpjiaimg").append(str2);
                            delImg(11);
                        }
                        dragImg('.userpjimg');
                    }
                    // 获取商品详情（app内）
                    editor_inner.html(data.inDesc);
                    // 获取商品头图（app外）
                    $('#imgListContentout').empty();
                    if (data.outPicture != null && data.outPicture != '') {
                        $('.inner_out input').click();
                         $('.inner_out input').attr('checked','checked');
                        // var outPicture = data.outPicture.split(',');
                        var outPicture = JSON.parse(data.outPicture);

                        // var imgIndex14 = 0;
                        for (var i = 0; i < outPicture.length; i++) {
                            var str3 = '<div class="upload_append_list" index14=' + imgIndex10 + '>' +
                                '<div class="file_bar">' +
                                '<div style="padding:5px;">' +
                                '<p class="file_name"></p>' +
                                '<span class="file_del" data-index14=' + imgIndex10 + ' title="删除"></span>' +
                                '</div>' +
                                '</div>' +
                                '<a style="height:100px;width:120px;" href="#" class="imgBox" >' +
                                '<div class="uploadImg" style="width:105px;">' +
                                '<img class="upload_image outimg" id="dragimgout' + imgIndex10 + '" src=' + outPicture[i].url + ' style="width:expression(this.width > 105 ? 105px :this.width)">' +
                                '</div>' +
                                '</a>' +
                                '</div>';
                            imgIndex10++;
                            delImg(10);
                            $("#imgListContentout").append(str3);
                        }
                        dragImg('.outimg');
                    }
                    // 清除商品详情（app外）
                    if(data.outDesc != '' && data.outDesc != null){
                        // $('.inner_out input').attr('checked','checked');
                         $('.inner_out input').click();
                         $('.inner_out input').attr('checked','checked');
                        editor_out.html(data.outDesc);
                    }
                }
            }
        });
    }
    // 编辑营
    function editCamp(id) {
        $.ajax({
            type: "get",
            url: baseUrl + 'v1/api/campSell/getClassById?token=' + token + '&id=' + id + '&roleId=' + roleId,
            success: function (data) {
                if (data.code == 200) {
                    var data = data.resp;
                    console.log(data);
                    var checked = '';
                    if (data.beginTime == null || data.beginTime == '') {
                        data.beginTime = '';
                    }
                    if (data.limitedBegintime == null || data.limitedBegintime == '') {
                        data.limitedBegintime = '';
                    }
                    if (data.limitedEndtime == null || data.limitedBegintime == '') {
                        data.limitedEndtime = '';
                    }
                    if (data.especialPrice == null || data.especialPrice == '') {
                        data.especialPrice = '';
                    }

                    var str = '<tr>' +
                        '<td class="rowspantd" data-id=' + data.gradeId + '>' + data.gradeName + '</td>' +
                        '<td><input tyep="text" value=' + data.className + ' data-id=' + data.id + '></td>' +
                        '<td><input type="text" placeholder="请输入周期" value=' + data.lastWeeks + ' ></td>' +
                        '<td><input type="text" placeholder="请输入开营时间" id="kaiyingShijian"  ></td>' +
                        '<td><input type="text" placeholder="请输入特价开始时间" id="tjkaishiShijian"  ></td>' +
                        '<td><input type="text" placeholder="请输入特价结束时间" id="tjjieshuShijian" ></td>' +
                        '<td><input type="text" placeholder="请输入原价" value=' + data.originPrice + ' ></td>' +
                        '<td><input type="text" placeholder="请输入现价" value=' + data.curentPrice + ' ></td>' +
                        '<td><input type="text" placeholder="请输入特价" value=' + data.especialPrice + ' ></td>' +
                        '<td><input type="text" placeholder="请输入库存" value=' + data.originStock + ' ></td>' +
                        '<td><input type="text" placeholder="请输入剩余库存" value=' + data.stock + ' ></td>' +
                        '<td><input type="checkbox" class="linestatus"></td>' +
                        '<td class="delbanjlist" style="color:blue">删除</td>' +
                        '</tr>';
                    $('.banjlist').append(str);
                    if (data.isOnline == 1) {
                        $('.linestatus').attr('checked', 'checked');
                    }
                    $('#kaiyingShijian').val(data.beginTime);
                    $('#tjkaishiShijian').val(data.limitedBegintime)
                    $('#tjjieshuShijian').val(data.limitedEndtime)
                    TimePicker("#kaiyingShijian");
                    TimePicker("#tjkaishiShijian");
                    TimePicker("#tjjieshuShijian");

                }
            }
        });
    }
    // 获取商品列表
    function getGoodsList(pageNow, pageSize) {
        console.log(baseUrl);
        $.ajax({
            type: "get",
            url: baseUrl + "v1/api/campSell/findGrades?pageNow=" + pageNow + '&pageSize=' + pageSize + '&token=' + token + '&roleId=' + roleId,
            success: function (data) {
                // alert(4);
                if (data.code == 200) {
                    var resp = data.resp.records;
                    $('.goodsListShow table tbody').html('');
                    for (var i = 0; i < resp.length; i++) {
                        var type = '';
                        if (resp[i].type == 1) {
                            type = '服务类';
                        }
                        else if (resp[i].type == 2) {
                            type = '实物类';
                        }
                        var str = '<tr>' +
                            '<td>' + type + '</td>' +
                            '<td>' + resp[i].gradeName + '</td>' +
                            '<td>' + resp[i].nowClass + '</td>' +
                            '<td>' + resp[i].stock + '</td>' +
                            '<td>' + resp[i].sellStock + '</td>' +
                            '<td>' + resp[i].createtime + '</td>' +
                            '<td><input type="checkbox" class="gradeId" value=' + resp[i].gradeId + '></td>' +
                            '<td><span class="editShangp" style="color:blue" data-id=' + resp[i].gradeId + '>编辑</span></td>' +
                            '</tr>';
                        $('.goodsListShow table tbody').append(str);
                    }
                    // 编辑商品
                    $('.editShangp').on('click', function () {
                        var id = $(this).attr('data-id');
                        $('.content').hide().eq(0).show();
                        $('.storehead span').eq(0).addClass('backg').siblings().removeClass('backg');
                        editShangp(id);
                    });
                    // 下一页
                    if (data.resp.pageCount > data.resp.pageNow) {
                        $("#goodsAfter").css("background-color", "green");
                        $("#goodsAfter").unbind("click").click(function () {
                            getGoodsList(data.resp.pageNow + 1, 10);
                        });
                    } else {
                        $("#goodsAfter").css("background-color", "#ccc");
                        $("#goodsAfter").unbind("click");
                    }
                    // 上一页
                    if (data.resp.pageNow > 1) {
                        $("#goodsBefore").css("background-color", "green");
                        $("#goodsBefore").unbind("click").click(function () {
                            getGoodsList(data.resp.pageNow - 1, 10);
                        });
                    } else {
                        $("#goodsBefore").css("background-color", "#ccc");
                        $("#goodsBefore").unbind("click");
                    }
                    // 合成全部售卖
                    $('#allSale').on('click', function () {
                        $('.goodsListShow input').attr('checked', 'checked');
                        var data = {
                            "sellNum": 'ALL'
                        }
                        data = JSON.stringify(data);
                        createSaleLink(data, '.goodsListShow');
                    });
                  
                    // var gradeIdArr = [];//分类合成商品ID组合
                    $('.gradeId').click(function () {
                        var id = $(this).val();
                        if ($(this).attr('checked') == 'checked') {
                            gradeIdArr.push($(this).val());
                        }
                        else {
                            for (var m = 0; m < gradeIdArr.length; m++) {
                                if (gradeIdArr[m] == id) {
                                    gradeIdArr.splice(m, 1);
                                }
                            }

                        }
                        console.log(gradeIdArr);
                    });
                     // 分类合成售卖
                    $('#classGoodsSale').on('click', function () {
                        var arr = [];
                        // for (var i = 0; i < $('.goodsListShow input').length; i++) {
                        //     if ($('.goodsListShow input').eq(i).attr('checked') == 'checked') {
                        //         arr.push($('.goodsListShow input').eq(i).val());
                        //     }
                        // }
                        console.log(gradeIdArr);
                        
                        if (gradeIdArr.length == 1) {
                           arr = gradeIdArr.join(':') + ':';
                        }
                        else {
                            arr = gradeIdArr.join(':')
                        }

                        console.log(arr);
                        var data1 = {
                            "sellNum": arr
                        }
                        data1 = JSON.stringify(data1);
                        createSaleLink(data1, '.goodsListShow');
                    })
                }
            },
            error: function () {
                // alert(5);
            }
        });
    }
    // 获取售卖列表
    function getSaleList(pageNow, pageSize) {
        $.ajax({
            url: baseUrl + 'v1/api/campSell/findSell?pageNow=' + pageNow + '&pageSize=' + pageSize + '&token=' + token + '&roleId=' + roleId,
            type: 'get',
            success: function (data) {
                console.log(data);
                if (data.code == 200) {
                    var resp = data.resp.records[0];
                    $('.saleListShow tbody').remove();
                    console.log(data.resp.records[0]);
                    var allLink = data.resp.all;
                    setCookie('allLink', allLink, 30);
                    var objlength = 0;
                    for (var i in resp) {
                        // console.log(objlength);
                        var info = resp[i];
                        // console.log(info.length)
                        var tbodys = '<tbody class="childLink"></tbody>';
                        var linkIdArr = [];
                        $('.saleListShow table').append(tbodys);
                        for (var j = 0; j < info.length; j++) {
                            // linkIdArr.push(info[j].classId);
                            if (j == 0) {
                                var str1 = '<tr>' +
                                    // '<td rowspan=' + info.length + '>' + i + '</td>' +
                                    '<td rowspan=' + info.length + '><span class="createLink" data-link=' + i + '>生成链接</span></td>' +
                                    '<td>' + info[0].gradeName + '</td>' +
                                    '<td class="clsID" data-id=' + info[0].classId + '>' + info[0].className + '</td>' +
                                    '<td>' + info[0].originPrice + '</td>' +
                                    '<td>' + info[0].curentPrice + '</td>' +
                                    '<td>' + info[0].originStock + '</td>' +
                                    '<td>' + info[0].stock + '</td>' +
                                    '<td>' + info[0].beginTime + '</td>' +
                                    '<td rowspan=' + info.length + '><label><input type="checkbox" value="1" class="deliveryPosition" data-id="">我的燃脂营</label></td>' +
                                    '</tr>';
                                // console.log(str1);
                                $($('.saleListShow table .childLink')[objlength]).append(str1);
                            }
                            else if (j > 0) {
                                var str2 = '<tr>' +
                                    '<td>' + info[j].gradeName + '</td>' +
                                    '<td class="clsID" data-id=' + info[j].classId + '>' + info[j].className + '</td>' +
                                    '<td>' + info[j].originPrice + '</td>' +
                                    '<td>' + info[j].curentPrice + '</td>' +
                                    '<td>' + info[j].originStock + '</td>' +
                                    '<td>' + info[j].stock + '</td>' +
                                    '<td>' + info[j].beginTime + '</td>' +
                                    '</tr>';
                                // console.log(str2);
                                $($('.saleListShow table .childLink')[objlength]).append(str2);
                            }

                        }
                        objlength++;
                    }
                    // 生成总链接
                    $('.getAllLink').on('click', function () {
                        var saleLink = allLink;
                        swal({
                            title: "已生成链接",
                            type: "input",
                            showCancelButton: true,
                            closeOnConfirm: false,
                            confirmButtonText: "复制",
                            cancelButtonText: "取消",
                            animation: "slide-from-top",
                            inputPlaceholder: "",
                            inputValue: saleLink
                        }, function (inputValue) {
                            if (inputValue === false) return false;

                            if (inputValue === "") {
                                swal.showInputError("没有可复制的内容哦~");
                                return false
                            }
                            var Url1 = $("fieldset input");
                            Url1.select(); // 选择对象
                            document.execCommand("Copy"); // 执行浏览器复制命令
                            swal("复制成功!", "", "success");
                        });
                    });
                    // 生成链接
                    $('.createLink').on('click', function () {
                        var saleLink = $(this).attr('data-link')
                        swal({
                            title: "已生成链接",
                            type: "input",
                            showCancelButton: true,
                            closeOnConfirm: false,
                            confirmButtonText: "复制",
                            cancelButtonText: "取消",
                            animation: "slide-from-top",
                            inputPlaceholder: "",
                            inputValue: saleLink
                        }, function (inputValue) {
                            if (inputValue === false) return false;

                            if (inputValue === "") {
                                swal.showInputError("没有可复制的内容哦~");
                                return false
                            }
                            var Url1 = $("fieldset input");
                            Url1.select(); // 选择对象
                            document.execCommand("Copy"); // 执行浏览器复制命令
                            swal("复制成功!", "", "success");
                        });
                    });
                    // 投放位置
                    $('.deliveryPosition').on('click', function () {
                        var that = this;
                        var arr = [];
                        // console.log($(this).parents('tbody').find('.clsID'));
                        var sellLink = $(this).parents('tbody').find('.createLink').attr('data-link');
                        for (var i = 0; i < $(this).parents('tbody').find('.clsID').length; i++) {
                            arr.push($(this).parents('tbody').find('.clsID').eq(i).attr('data-id'));
                        }
                        if (arr.length == 1) {
                            arr = arr.join('-') + '-';
                        }
                        else {
                            arr = arr.join('-');
                        }
                        var linkId = {
                            sellLink: sellLink,
                            sellNum: arr,
                            deliveryPosition: 1
                        }
                        console.log(linkId);
                        if ($(this).attr('checked') == 'checked') {
                            swal({
                                title: "确认保存？",
                                showCancelButton: true,
                                confirmButtonColor: "#DD6B55",
                                confirmButtonText: "确定",
                                closeOnConfirm: '取消'
                            }, function () {
                                $.ajax({
                                    url: baseUrl + 'v1/api/campSell/updateLink' + '?token=' + token + '&roleId=' + roleId,
                                    type: 'POST',
                                    data: JSON.stringify(linkId),
                                    dataType: 'json',
                                    contentType: 'application/json',
                                    success: function (data) {
                                        if (data.code == 200) {
                                            $(that).removeAttr('checked');

                                        }
                                        else {
                                            swal('啊哦，您的网络不太给力~');
                                        }
                                    },
                                    error: function (data) {
                                        swal('啊哦，您的网络不太给力~');
                                    }
                                })
                            })
                        }
                    });
                    // 下一页
                    if (data.resp.pageCount > data.resp.pageNow) {
                        $("#saleAfter").css("background-color", "green");
                        $("#saleAfter").unbind("click").click(function () {
                            getSaleList(data.resp.pageNow + 1, 10);
                        });
                    } else {
                        $("#saleAfter").css("background-color", "#ccc");
                        $("#saleAfter").unbind("click");
                    }
                    // 上一页
                    if (data.resp.pageNow > 1) {
                        $("#saleBefore").css("background-color", "green");
                        $("#saleBefore").unbind("click").click(function () {
                            getSaleList(data.resp.pageNow - 1, 10);
                        });
                    } else {
                        $("#saleBefore").css("background-color", "#ccc");
                        $("#saleBefore").unbind("click");
                    }


                }
            },
            error: function (data) {
                swal('啊哦，您的网络不太给力~');
            }
        })
    };
    // 创建售卖
    function createSaleLink(id, ele) {
        $.ajax({
            type: "post",
            url: baseUrl + 'v1/api/campSell/insertLink?token=' + token + '&roleId=' + roleId,
            data: id,
            dataType: 'json',
            contentType: 'application/json',
            success: function (data) {
                if (data.code == 200) {
                    arr11 = [];
                    arr22 = [];
                    arr33 = [];
                    gradeIdArr = [];
                    $('.content').hide().eq(5).show();
                    $('.storehead span').eq(5).addClass('backg').siblings().removeClass('backg');
                    textIndex = 0;
                    checkedId = [];
                    if (ele == '.createArea' || ele == '.goodsListShow') {
                        $(ele).html('');
                    }
                    if (ele == '.classlist') {
                        console.log()
                        $(ele).find('tbody').html('');
                        $('.classSelect').html('');
                        $('.shangpmingc1').val('').attr('data-id', '');
                    }
                    $(ele).find('input').removeAttr('checked');
                    // $('.campListShow tbody td input').removeAttr('checked');
                    getSaleList(1, 10);
                }
                else {
                    swal('啊哦，您的网络不太给力~');
                }
            },
            error: function () {
                swal('啊哦，您的网络不太给力~');
            }
        });
    }
    $('#delSale').on('click', function () {
        $('.createArea').html('');
        textIndex = 0;
        $('.campListShow tbody td input').removeAttr('checked');
    })
    // 获取售卖订单
    function findSaleOrder(pageNow, pageSize, coachName, coachId, beginTime, endTime) {
        $.ajax({
            url: baseUrl + 'v1/api/campOrder/findSales?token=' + token + '&roleId=' + roleId + '&pageNow=' + pageNow + '&pageSize=' + pageSize + '&coachId=' + coachId + '&coachName=' + coachName + '&beginTime=' + beginTime + '&endTime=' + endTime,
            type: 'get',
            success: function (data) {
                if (data.code == 200) {
                    var allLink = getCookie('allLink')
                    var resp = data.resp.records;
                    var phoneNo;
                    $('.CoachShow tbody').html('');
                    for (var i = 0; i < resp.length; i++) {
                        if (resp[i].phoneNo == null) {
                            phoneNo = '';
                        }
                        else {
                            phoneNo = resp[i].phoneNo;
                        }
                        var str = '<tr>' +
                            '<td>' + resp[i].coachName + '</td>' +
                            '<td>' + phoneNo + '</td>' +
                            '<td>' + resp[i].salesNum + '</td>' +
                            '<td>' + resp[i].salesMoney + '</td>' +
                            '<td>' + resp[i].commission + '</td>' +
                            '<td><span data-link=' + allLink + '&coachId=' + resp[i].coachId + ' class="createCoachLink" style="color:blue">生成链接</span></td>' +
                            '</tr>';
                        $('.CoachShow tbody').append(str);
                    }
                    $('.createCoachLink').on('click', function () {
                        var saleLink = $(this).attr('data-link')
                        swal({
                            title: "已生成链接",
                            type: "input",
                            showCancelButton: true,
                            closeOnConfirm: false,
                            confirmButtonText: "复制",
                            cancelButtonText: "取消",
                            animation: "slide-from-top",
                            inputPlaceholder: "",
                            inputValue: saleLink
                        }, function (inputValue) {
                            if (inputValue === false) return false;

                            if (inputValue === "") {
                                swal.showInputError("没有可复制的内容哦~");
                                return false
                            }
                            var Url1 = $("fieldset input");
                            Url1.select(); // 选择对象
                            document.execCommand("Copy"); // 执行浏览器复制命令
                            swal("复制成功!", "", "success");
                        });
                    });
                    // 下一页
                    if (data.resp.pageCount > data.resp.pageNow) {
                        $("#CoachAfter").css("background-color", "green");
                        $("#CoachAfter").unbind("click").click(function () {
                            findSaleOrder(data.resp.pageNow + 1, 10, '', '', '', '');
                        });
                    } else {
                        $("#CoachAfter").css("background-color", "#ccc");
                        $("#CoachAfter").unbind("click");
                    }
                    // 上一页
                    if (data.resp.pageNow > 1) {
                        $("#CoachBefore").css("background-color", "green");
                        $("#CoachBefore").unbind("click").click(function () {
                            findSaleOrder(data.resp.pageNow - 1, 10, '', '', '', '');
                        });
                    } else {
                        $("#CoachBefore").css("background-color", "#ccc");
                        $("#CoachBefore").unbind("click");
                    }

                }
            }
        })
    }
    // 获取教练名
    $('.coachName').on('input', function () {
        // $(ele).on('input', function () {
        var value = $(this).val();
        $.ajax({
            url: baseUrl + 'v1/api/campCoach/getCoachName?coachName=' + value + '&token=' + token + '&roleId=' + roleId,
            type: 'get',
            success: function (data) {
                console.log(data);
                if (data.code == 200) {
                    var resp = data.resp;
                    console.log(data.resp);
                    var liEle = '';
                    $('.searchcoachList').html('');
                    // if (resp.length > 0) {
                    for (var i = 0; i < resp.length; i++) {
                        var liEle = '<li data-id=' + resp[i].id + ' data-type=' + resp[i].type + '>' + resp[i].name + '</li>';
                        $('.searchcoachList').show().append(liEle);
                    }
                    $('.searchcoachList').find('li').on('click', function () {
                        var id = $(this).attr('data-id');
                        $('.coachId').val('').val(id);
                        var name = $(this).text();
                        $(this).parent().hide();
                        $('.coachName').attr('data-id', id).val(name);
                    })

                }
                // }
            },
            error: function (data) {
                swal(data.message)
            }
        })
    })
    // 按教练查询销售订单
    $('#searchCoach').on('click', function () {
        var coachName = $('.coachName').val();
        var coachId = $('.coachId').val();
        var beginTime = $('#Shijian1').val();
        var endTime = $('#Shijian2').val();
        findSaleOrder(1, 10, coachName, coachId, beginTime, endTime);
    })

})
// 拖拽图片
function dragImg(ele) {
    var imgElement = document.querySelectorAll(ele);
    for (var i = 0; i < imgElement.length; i++) {
        imgElement[i].draggable = true;
        imgElement[i].ondragstart = function (n) {
            return function (event) {
                event.dataTransfer.setData("Text", event.target.id)
                event.dataTransfer.setData("image", event.target.src);
            }
        }(i)
        imgElement[i].ondragover = function (event) {
            event.preventDefault()
        };
        imgElement[i].ondrop = function (n) {
            return function (event) {
                var dataStr = event.dataTransfer.getData("Text");
                console.log(dataStr);
                var dataImg = event.dataTransfer.getData("image");
                console.log(dataImg);
                var fromimg = document.querySelector('#' + dataStr);
                console.log(fromimg);
                console.log(this.src);
                fromimg.src = this.src;
                this.src = dataImg;

                event.preventDefault();
                event.stopPropagation();
            }
        }(i)
    }
}