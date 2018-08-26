<%@ Page Language="C#" MasterPageFile="~/MasterPage/PageTemplate.Master" AutoEventWireup="true" CodeBehind="update.aspx.cs" Inherits="SfSoft.web.emc.tempmsg.wx.update" Title="无标题页" %>
<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
    
    <cc1:TabOptionWebControls ID="TabOptionWebControls1" runat="server">
        <cc1:TabOptionItem ID="TabOptionItem1" runat="server" Tab_Name="知行社基本信息">
            <asp:Panel ID="Panel1" GroupingText="" runat="server">
                <table border="0" cellpadding="2" cellspacing="0" width="100%" id="tableMsg" class="fromtable">
                    <tr>
                        <td  >模版</td>
                        <td><select id="tempId" ></select> <label style=" display:none" id="lbtempId"></label></td>
                    </tr>
                </table>
                <table border="0" cellpadding="2" cellspacing="0" width="100%" id="tableView" class="fromtable">
                    
                    
                </table>
                
            </asp:Panel>
        </cc1:TabOptionItem>
    </cc1:TabOptionWebControls>
    <input type="hidden" id="hfId" />
    <asp:HiddenField ID="hfRecordNumber" runat="server" />
    <script src="//cdn.bootcss.com/jquery/1.12.4/jquery.js"></script>
    <script src="../../../js/My97DatePicker/WdatePicker.js" type="text/javascript"></script>
    <script type="text/javascript">
        (function () {
            var currItem = {};
            $.ajax({
                url: '../provide/TempMsgProvide.ashx?method=temp',
                type: 'GET',
                dataType: "JSON",
                success: function (res) {
                    console.log(res);
                    loadTemp(res);
                    var model = getQueryString("mode");
                    var id = getQueryString("id");
                    if (model == "update" && id != "" && id != null && id != undefined) {
                        $("#hfId").val(id);
                        getModel(res, id);
                    } else {
                        $("#tempId").show();
                        $("#lbtempId").hide();
                    }
                }
            });
            function getModel(data, id) {
                $.ajax({
                    url: '../provide/TempMsgProvide.ashx?method=init&id=' + id,
                    type: 'GET',
                    dataType: "JSON",
                    success: function (res) {
                        for (var i = 0; i < data.length; i++) {
                            if (data[i].tempid == res.tempId) {
                                var info = data[i];
                                currItem = info;
                                addFirst(info)
                                item(info);
                                addLink(info);
                                addRemark(info);
                                $("#" + info.first.id).val(res.first);
                                $("#" + info.remark.id).val(res.remark);
                                $("#" + info.link.id).val(res.link);
                                $("#title").val(res.title);
                                $("#sendDate").val(res.sendDate);
                                $("#lbtempId").show().text(res.tempId);
                                $("#tempId").val(info.tempid);
                                $("#tempId").hide();
                                var o = JSON.parse(res.item);
                                $.each(info.item, function (index, v) {
                                    $.each(o, function (s, v2) {
                                        if (v.id == v2.id) {
                                            $("#" + v.id).val(v2.value);
                                            return false;
                                        }
                                    })
                                });
                                break;
                            }
                        }
                    }
                });
            }

            /*获取参数*/
            function getQueryString(name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
                var r = window.location.search.substr(1).match(reg);
                if (r != null) return unescape(r[2]); return null;
            };
            function loadTemp(res) {

                var html = '<option value="">...请选择...</option>';

                $.each(res, function (index, item) {
                    html += '<option title="' + index + '"  value="' + item.tempid + '">' + item.name + '</option>';
                });

                $("#tempId").append(html);

                $("#tempId").on('change', function () {
                    var v = $(this).val();
                    var index = $(this).find("option:selected").attr("title");
                    if (v == "") return;
                    var n = $("#tableMsg tr:gt(0)").remove();
                    currItem = res[index];
                    addFirst(currItem)
                    item(currItem);
                    addLink(currItem);
                    addRemark(currItem);
                });
            }
            function addLink(res) {
                var html = '';
                html += '<tr>';
                html += '   <td style="width:150px;">' + res.link.title + '</td><td><input type="text" id="' + res.link.id + '" style="width:80%; " /></td>';
                html += '</tr>';
                $("#tableMsg").append(html);
            };
            function addFirst(res) {
                var html = '';
                html += '<tr>';
                html += '   <td style="width:150px;">标题</td><td><input type="text" id="title" style="width:80%; " /></td>';
                html += '</tr>';
                html += '<tr>';
                html += '   <td style="width:150px;">' + res.first.title + '</td><td><input type="text" id="' + res.first.id + '" style="width:80%; " /></td>';
                html += '</tr>';
                $("#tableMsg").append(html);
            };
            function addRemark(res) {
                var html = '';
                html += '<tr>';
                html += '   <td style="width:150px;">' + res.remark.title + '</td><td><input type="text" id="' + res.remark.id + '" style="width:80%; " /></td>';
                html += '</tr>';

                html += '<tr>';
                html += '   <td style="width:150px;">发布日期</td><td><input type="text" onFocus="WdatePicker({lang:\'zh-cn\',dateFmt:\'yyyy-MM-dd HH:mm:ss\'})" id="sendDate" style="width:80%; " /></td>';
                html += '</tr>';

                html += '<tr>';
                html += '   <td colspan="2" style=" text-align:center"><input id="btnView" type="button" value="预览" class="btn" onmouseout="this.className=\'btn\'" onmouseover="this.className=\'btn_mouseover\'"  /></td>';
                html += '</tr>';

                $("#tableMsg").append(html);
            };

            function item(res) {
                var html = '';
                $.each(res.item, function (index, item) {
                    html += '<tr>';
                    if (item.type == "text") {
                        html += '   <td style="width:150px;">' + item.title + '</td><td><input type="text" data-replace="' + item.replace + '" id="' + item.id + '" style="width:80%; " /></td>';
                    } else if (item.type == "datetime") {
                        html += '   <td style="width:150px;">' + item.title + '</td><td><input onFocus="WdatePicker({lang:\'zh-cn\',dateFmt:\'yyyy-MM-dd HH:mm:ss\'})"  type="text" id="' + item.id + '" style="width:80%; " /></td>';
                    }
                    html += '</tr>';
                });
                $("#tableMsg").append(html);
            }
            function view(data) {
                var html = '';
                html += '<tr>';
                html += '   <td style="width:150px;">消息标题</td>';
                html += '   <td>' + $("#title").val() + '</td>';
                html += '</tr>';

                html += '<tr>';
                html += '   <td style="width:150px;">' + data.first.title + '</td>';
                html += '   <td>' + $("#" + data.first.id).val() + '</td>';
                html += '</tr>';
                $.each(data.item, function (index, item) {
                    html += '<tr>';
                    html += '   <td style="width:150px;">' + item.title + '</td>';
                    html += '   <td >' + $("#" + item.id).val() + '</td>';
                    html += '</tr>';
                });
                html += '<tr>';
                html += '   <td style="width:150px;">' + data.link.title + '</td>';
                html += '   <td>' + $("#" + data.link.id).val() + '</td>';
                html += '</tr>'
                html += '<tr>';

                html += '<tr>';
                html += '   <td style="width:150px;">' + data.remark.title + '</td>';
                html += '   <td>' + $("#" + data.remark.id).val() + '</td>';
                html += '</tr>'

                html += '<tr>';
                html += '   <td style="width:150px;">发布日期</td>';
                html += '   <td>' + $("#sendDate").val() + '</td>';
                html += '</tr>'

                html += '<tr>';
                html += '   <td colspan="2" style=" text-align:center">';
                html += '       <input type="button" style="margin-right:15px;" id="btnSave" value="保存" class="btn" onmouseout="this.className=\'btn\'" onmouseover="this.className=\'btn_mouseover\'"  />';
                html += '       <input type="button" style="margin-right:15px;" id="btnReturn" value="返回" class="btn" onmouseout="this.className=\'btn\'" onmouseover="this.className=\'btn_mouseover\'"  />';
                html += '       <select id="selectTestOpend"><option value="">...测试时消息接收人．．．</option><option value="oc6zzs6NmC09jBfHbbFJX4kfnxbA">风子</option><option value="oc6zzs1y_A_7RgGi6EGLBUrPCfRk">袁哥</option><option value="oqmjZjh55_7kJKBAZOjwhPUiGEjc">袁哥测试号</option><option value="oc6zzs4Cm45R0tZ4qJXtMdJ3GzyU">小锅</option></select>';
                html += '       <input type="button" style="margin-right:15px;" id="btnTest" value="消息测试" class="btn" onmouseout="this.className=\'btn\'" onmouseover="this.className=\'btn_mouseover\'"  />';
                html += '        <label>当前用户</label>';
                html += '        <label id="user_number"><%=RecordNumber %></label>';
                html += '        <label>选择发送</label>';
                html += '        <select id="page_size">';
                html += '            <option value="10000">10000</option>';
                html += '            <option value="20000">20000</option>';
                html += '            <option value="30000">30000</option>';
                html += '            <option value="40000">40000</option>';
                html += '            <option value="50000">50000</option>';
                html += '            <option value="60000">60000</option>';
                html += '            <option value="70000">70000</option>';
                html += '            <option value="80000">80000</option>';
                html += '            <option value="90000">90000</option>';
                html += '            <option value="100000">100000</option>';
                html += '            <option value="110000">110000</option>';
                html += '            <option value="120000">120000</option>';
                html += '            <option value="130000">130000</option>';
                html += '            <option value="140000">140000</option>';
                html += '            <option value="150000">150000</option>';
                html += '            <option value="160000">160000</option>';
                html += '            <option value="170000">170000</option>';
                html += '            <option value="180000">180000</option>';
                html += '            <option value="190000">190000</option>';
                html += '            <option value="200000">200000</option>';
                html += '        </select>';
                html += '        <label>个用户</label>';
                html += '        <label>从第</label>';
                html += '        <select id="page_index"><option value="">请选择</option></select>';
                html += '       <input type="button" style="margin-right:15px;" id="btnSend" value="发布" class="btn" onmouseout="this.className=\'btn\'" onmouseover="this.className=\'btn_mouseover\'"  />';
                html += '   </td>';
                html += '</tr>';

                $("#tableView tr").remove();
                $("#tableView").append(html);
            }
            $(document).on('click', '#btnView', function () {
                $("#tableMsg").hide();
                $("#tableView").show();
                view(currItem);
            });
            $(document).on('click', '#btnReturn', function () {
                $("#tableMsg").show();
                $("#tableView").hide();
                $("#tableView tr").remove();
            });
            $(document).on('click', '#btnTest', function () {
                var id = $("#hfId").val();
                var openid = $("#selectTestOpend").val(); // "oqmjZjh55_7kJKBAZOjwhPUiGEjc";
                if (openid == "") {
                    alert("请选择测试人");
                    return;
                }
                $.ajax({
                    url: '../provide/TempMsgProvide.ashx?method=test',
                    dataType: "text",
                    data: { id: id, openid: openid },
                    success: function (res) {
                        alert("测试发布，请查看微信公众号，是否收到信息");
                    }
                });
            });
            $(document).on('click', '#btnSend', function () {
                var isSure = confirm("确定要发布吗！");
                if (isSure == false) return;

                var id = $("#hfId").val();
                var pagesize=$("#page_size").val();
                var pageindex=$("#page_index").val();
                $.ajax({
                    url: '../provide/TempMsgProvide.ashx?method=send',
                    dataType: "text",
                    data: { id: id, orderby: "OpenId Asc",pagesize:pagesize,pageindex:pageindex },
                    success: function (res) {
                        alert("信息已发布，请查看微信公众号，是否收到信息");
                    }
                });
            });
            $(document).on('change', "#page_size", function () {
                var recordCount = parseInt($("#<%=hfRecordNumber.ClientID %>").val());
                var number = parseInt($(this).val());

                var s = recordCount / number;
                var y = recordCount % number;
                var x = 0;
                if (y > 0) x = 1;
                var total = s + x;
                $("#page_index").empty();
                for (var i = 1; i < total; i++) {
                    var option = '<option value="'+i+'">第' + i + '页(' + calculate(i) + ' 用户)</option>';
                    $("#page_index").append(option);
                };
                function calculate(i) {
                    if (i <= s) {
                        return number;
                    } else {
                        return y;
                    }
                }
            });

            $(document).one('click', '#btnSave', function () {
                var isSure = confirm("确定要保存吗！");
                if (isSure == false) return;

                var data = {
                    first: $("#" + currItem.first.id).val(),
                    remark: $("#" + currItem.remark.id).val(),
                    link: $("#" + currItem.link.id).val(),
                    item: getItem(currItem.item),
                    sendDate: $("#sendDate").val(),
                    tempId: $("#tempId").val(),
                    title: $("#title").val(),
                    id: $("#hfId").val()
                };
                var m = getQueryString("mode");
                var method = "";
                if (m == "update") {
                    method = "update"
                } else {
                    method = "add";
                }
                $.ajax({
                    url: "../provide/TempMsgProvide.ashx?method=" + method,
                    type: "POST",
                    dataType: "text",
                    data: data,
                    success: function (res) {
                        console.log(res);
                        if (res > 0 || res == "True") {
                            alert("保存成功");
                        } else {
                            alert("保存失败");
                        }
                    }
                });
                function getItem(data) {
                    var items = [];

                    $.each(data, function (index, item) {
                        var d = {
                            id: item.id,
                            value: $("#" + item.id).val(),
                            replace: $("#" + item.id).data("replace") == "undefined" ? "" : $("#" + item.id).data("replace")
                        };
                        items.push(d);
                    });
                    return JSON.stringify(items);
                };
            })
        })()
    </script>
</asp:Content>
