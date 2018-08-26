(function ($) {
    $.fn.shenerAddress = function (options) {
        var defaults = {
            bodyId: "", /*当调用收货地址时此对象隐藏*/
            areaDataPath: "../js/areas.json", /*区域库的位置指本库使用的区域库json*/
            latestAddress: { "serverpath": "", "openid": "", "backfn": function () { } }, /*用户从服务器获取最近使用的收货地址*/
            saveAddress: { "serverpath": "", "openid": "" },
            getAllAddress: { "serverpath": "", "openid": "" },
            setLatestAddress: { "serverpath": "", "openid": "" },
            backSelectAddress: function (data) { }
        };
        var opts = $.extend(defaults, options);
        var main = {
            province: "",
            city: "",
            district: "",
            init: function () {
                $.ajax({
                    url: opts.getAllAddress.serverpath,
                    type: 'Post',
                    dataType: 'JSON',
                    data: { "openid": opts.getAllAddress.openid },
                    beforeSend: function () {
                        main.toast.show();
                    },
                    complete: function () {
                        main.toast.hide();
                    },
                    success: function (data) {
                        var div = '';
                        div += '<div id="pageSelectAddress" class="weui_msg">';
                        div += '        <p style="text-align:right; padding-right:15px;" >';
                        div += '            <a id="btnAdd" href="#add" class="weui_btn weui_btn_mini weui_btn_default">填加新的地址</a>'
                        div += '        </p>'
                        div += '        <div class="weui_text_area">';
                        div += '              <div class="weui_cells">';
                        if (!$.isEmptyObject(data.ds)) {
                            $.each(data.ds, function (index, context) {
                                div += '            <div class="weui_cell">';
                                div += '                    <div class="weui_cell_bd weui_cell_primary">';
                                div += '                            <a href="javascript:void(0)" data-id=' + context.Id + '>'
                                div += '                            <div style="font-weight:bold; text-align:left;"><span>' + context.Name + '</span>&nbsp;&nbsp;&nbsp;&nbsp;<span> ' + ' ' + context.Mobile + '</span></div>';
                                div += '                            <div style="text-align:left; color:#666; font-size:0.8em"><span>' + context.Province + '</span><span> ' + context.City + '</span><span>' + context.District + '</span><span>' + context.Address + '</span></div>';
                                div += '                            </a>'
                                div += '                     </div>';
                                div += '             </div>';
                            })
                        }
                        div += '              </div>';
                        div += '        </div>';
                        div += '</div>';
                        $(document.body).append(div);
                    }
                });
            },
            inputList: [],
            edit: function () {
                var div = '';
                div += '<div id="edit" class="weui_msg">'
                div += '      <div class="weui_cell" style="padding-bottom:0px;">';
                div += '          <div class="weui_cell_hd"><a href="javascript:void(0)" id="btnReturnAddressList"><span  class="glyphicon glyphicon-arrow-left"></span></a></div>';
                div += '          <div class="weui_cell_bd weui_cell_primary"></div>';
                div += '          <div class="weui_cell_ft"><input type="button" disabled="disabled"  class="weui_btn weui_btn_mini weui_btn_default"  id="btnSave" value="保存" /></div>'
                div += '      </div>';
                div += '    <div class="weui_text_area">'
                div += '        <div  class="weui_cells weui_cells_form">';
                div += '              <div class="weui_cell">';
                div += '                      <div class="weui_cell_hd"><label style="font-weight: initial; width:4em; font-size:0.8em;" class="weui_label">收货人</label></div>';
                div += '                      <div class="weui_cell_bd weui_cell_primary">';
                div += '                          <input class="weui_input" type="text" name="name"  placeholder="姓名"/>';
                div += '                      </div>';
                div += '                </div>';
                div += '              <div class="weui_cell">';
                div += '                      <div class="weui_cell_hd"><label style="font-weight: initial; width:4em;" class="weui_label">手机号码</label></div>';
                div += '                      <div class="weui_cell_bd weui_cell_primary">';
                div += '                          <input class="weui_input" type="tel" name="tel" pattern="[0-9]*" placeholder="11位手机号码"/>';
                div += '                      </div>';
                div += '                </div>';
                div += '              <div class="weui_cell">';
                div += '                      <div class="weui_cell_hd"><label style="font-weight: initial; width:4em;" class="weui_label">地区信息</label></div>';
                div += '                      <div class="weui_cell_bd weui_cell_primary">';
                div += '                          <input id="eidt_area" class="weui_input" name="area" type="text" readonly="readonly"  placeholder="地区信息"/>';
                div += '                      </div>';
                div += '                </div>';
                div += '              <div class="weui_cell">';
                div += '                      <div class="weui_cell_hd"><label style="font-weight: initial; width:4em;" class="weui_label">详细地址</label></div>';
                div += '                      <div class="weui_cell_bd weui_cell_primary">';
                div += '                          <input class="weui_input" type="text" name="detail"  placeholder="街道门牌信息"/>';
                div += '                      </div>';
                div += '                </div>';
                div += '        </div>';
                div += '      </div>';
                div += '</div>';
                $(document.body).append(div);
                this.inputList = $("#edit .weui_input");
            },
            toast: {
                show: function () {
                    var div = '';
                    div += '<div id="loading" class="weui_loading_toast">';
                    div += '    <div class="weui_mask_transparent"></div>';
                    div += '    <div class="weui_toast">';
                    div += '        <div class="weui_loading">';
                    div += '            <div class="weui_loading_leaf weui_loading_leaf_0"></div>';
                    div += '           <div class="weui_loading_leaf weui_loading_leaf_1"></div>';
                    div += '           <div class="weui_loading_leaf weui_loading_leaf_2"></div>';
                    div += '          <div class="weui_loading_leaf weui_loading_leaf_3"></div>';
                    div += '          <div class="weui_loading_leaf weui_loading_leaf_4"></div>';
                    div += '          <div class="weui_loading_leaf weui_loading_leaf_5"></div>';
                    div += '           <div class="weui_loading_leaf weui_loading_leaf_6"></div>';
                    div += '          <div class="weui_loading_leaf weui_loading_leaf_7"></div>';
                    div += '          <div class="weui_loading_leaf weui_loading_leaf_8"></div>';
                    div += '          <div class="weui_loading_leaf weui_loading_leaf_9"></div>';
                    div += '          <div class="weui_loading_leaf weui_loading_leaf_10"></div>';
                    div += '          <div class="weui_loading_leaf weui_loading_leaf_11"></div>';
                    div += '      </div>';
                    div += '      <p class="weui_toast_content">数据处理中</p>';
                    div += '  </div>';
                    div += '</div>';
                    $("#loading").remove();
                    $(document.body).append(div);
                },
                hide: function () {
                    $("#loading").remove();
                }
            },
            selectProvince: function () {
                $.getJSON(opts.areaDataPath, function (data) {
                    var div = '';
                    div += '<div id="edit_province" class="weui_cells">';
                    for (var province in data) {
                        div += '<div class="weui_cell ">';
                        div += '    <div class="weui_cell_bd weui_cell_primary">';
                        div += '        <a href="javascript:void(0)" style=" display:inline-block;width:100%;" class="edit_province_item">' + province + '</a>';
                        div += '      </div>';
                        div += '</div>';
                    };
                    div += '</div>';
                    $(document.body).append(div);
                })
            },
            selectCity: function () {
                $.getJSON(opts.areaDataPath, function (data) {
                    var div = '';
                    div += '<div id="edit_city" class="weui_cells">';
                    for (var city in data[main.province]) {
                        div += '<div class="weui_cell" >';
                        div += '    <div class="weui_cell_bd weui_cell_primary">';
                        div += '        <a href="javascript:void(0)" style=" display:inline-block;width:100%;" class="edit_city_item">' + city + '</a>';
                        div += '      </div>';
                        div += '</div>';
                    };
                    div += '</div>';
                    $(document.body).append(div);
                })
            },
            selectDistrict: function () {
                $.getJSON(opts.areaDataPath, function (data) {
                    var div = '';
                    div += '<div id="edit_district" class="weui_cells">';
                    $.each(data[main.province][main.city], function (index, context) {
                        div += '<div class="weui_cell" >';
                        div += '    <div class="weui_cell_bd weui_cell_primary">';
                        div += '        <a href="javascript:void(0)" style=" display:inline-block;width:100%;" class="edit_district_item">' + context + '</a>';
                        div += '      </div>';
                        div += '</div>';
                    })
                    div += '</div>';
                    $(document.body).append(div);
                })
            }
        };
        var selector = $(this).selector;
        var $body = $(opts.bodyId);

        /*加载后获取用户的收化地址*/

        $.ajax({
            url: opts.latestAddress.serverpath,
            type: 'POST',
            dataType: 'JSON',
            data: { "openid": opts.latestAddress.openid },
            success: function (data) {
                if (!$.isEmptyObject(data.ds)) {
                    opts.latestAddress.backfn(data);
                }
            }
        });

        /*选择与编辑地址入口*/
        $(document).on('click', selector, function () {
            $("#pageSelectAddress").remove();
            $body.hide();
            main.init();
        });
        /*选择一个收货地址*/
        $(document).on('click', "#pageSelectAddress .weui_cell .weui_cell_bd a", function () {
            var $this = $(this);
            var id = $this.data("id");
            var $span = $this.children("div").children("span");
            var address = {
                name: $span[0].innerHTML,
                mobile: $span[1].innerHTML,
                province: $span[2].innerHTML,
                city: $span[3].innerHTML,
                district: $span[4].innerHTML,
                detail: $span[5].innerHTML
            };
            $body.show();
            $("#pageSelectAddress").remove();
            opts.backSelectAddress(address);
            setLatestAddress(id);
        });
        /*填加新的收货地址*/
        $(document).on('click', "#btnAdd", function () {
            $body.hide();
            $("#pageSelectAddress").remove();
            $("#edit").remove();
            main.edit();
        });
        /*编辑地区信息*/
        $(document).on('click', '#eidt_area', function () {
            $("#edit").hide();
            $("#edit_province").remove();
            main.selectProvince();
        });
        /*选择省*/
        $(document).on('click', '.edit_province_item', function () {
            $("#edit_province").remove();
            $("#edit_city").remove();
            main.province = $(this)[0].innerHTML;
            main.selectCity();
        });
        /*选择市*/
        $(document).on('click', '.edit_city_item', function () {
            $("#edit_city").remove();
            $("#edit_district").remove();
            main.city = $(this)[0].innerHTML;
            main.selectDistrict();
        });
        /*选择区*/
        $(document).on('click', '.edit_district_item', function () {
            $("#edit_district").remove();
            main.district = $(this)[0].innerHTML;
            $("#edit").show();
            if (main.province == main.city) {
                $("#eidt_area").val(main.province + " " + main.district);
            } else {
                $("#eidt_area").val(main.province + " " + main.city + " " + main.district);
            }
            completed();
        });

        /*验证输入是否完整性*/
        $(document).on('keyup', '#edit', function () {
            completed();
        });
        /*保存收货地址*/
        $(document).on('click', '#btnSave', function () {
            var name = $("#edit input[name='name']").val();
            var tel = $("#edit input[name='tel']").val();
            var detail = $("#edit input[name='detail']").val();
            var province = main.province;
            var city = main.city;
            var district = main.district;

            /*验证手机号码*/
            var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
            if (!myreg.test(tel)) {
                alert('请输入有效的手机号码！');
                return false;
            }
            $.ajax({
                url: opts.saveAddress.serverpath,
                type: 'Post',
                dataType: 'text',
                data: { "openid": opts.saveAddress.openid, "name": name, "tel": tel, "detail": detail, "province": province, "city": city, "district": district },
                beforeSend: function () {
                    main.toast.show();
                },
                complete: function () {
                    main.toast.hide();
                },
                success: function (data) {
                    if (data == 0) {
                        $("#edit").remove();
                        main.init();
                    }
                }
            });
        });
        /*返回到地址列表*/
        $(document).on('click', '#btnReturnAddressList', function () {
            $("#edit").remove();
            main.init();
        });
        /*设置用户选择的当前收货地址为默认*/
        function setLatestAddress(id) {
            $.ajax({
                url: opts.setLatestAddress.serverpath,
                type: 'POST',
                dataType: 'text',
                data: { "id": id },
                success: function (data) {

                }
            });
        };
        function completed() {
            var isComplete = true;
            for (var i = 0; i < main.inputList.length; i++) {
                if (main.inputList.eq(i).val() == "") {
                    isComplete = false;
                    break;
                }
            }
            if (isComplete == true) {
                $("#btnSave").removeClass("weui_btn_default").addClass("weui_btn_primary").removeAttr("disabled");
            } else {
                $("#btnSave").removeClass("weui_btn_primary").addClass("weui_btn_default").attr("disabled", "disabled");
            }
        };
    };
})(jQuery)