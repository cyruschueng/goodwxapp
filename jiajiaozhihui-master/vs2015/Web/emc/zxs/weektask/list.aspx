<%@ Page Language="C#" MasterPageFile="~/MasterPage/FrameTemplate.Master" AutoEventWireup="true"
    Codebehind="list.aspx.cs" Inherits="SfSoft.web.emc.zxs.weektask.list" Title="无标题页" %>
 
<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
    <link href="../../css/reveal.css" rel="stylesheet" type="text/css" />
    <script src="../../../js/comm.js" type="text/javascript"></script>
    <script src="../../js/jquery.reveal.js" type="text/javascript"></script>
    <cc1:TabOptionWebControls ID="TabOptionWebControls1" runat="server">
        <cc1:TabOptionItem ID="TabOptionItem1" runat="server" Tab_Name="基础数据">
        <asp:Panel ID="panel2" runat="server">
            <table border="0" cellpadding="0" cellspacing="0" style="width:100%" class="fromtable">
                <tr>
                    <td>
                        <a href="#" id="btnShow" class="btn" data-reveal-id="myModal" onmouseover="this.className='btn_mouseover'" onmouseout="this.className='btn'" data-animation="fade">编辑任务</a>
                    </td>
                </tr>
            </table>
            <asp:SmartGridView ID="GridView1" runat="server" AutoGenerateColumns="False" Width="98%" SkinID ="sgv2" 
                    OnRowDeleting="GridView1_RowDeleting" OnRowEditing="GridView1_RowEditing" OnRowUpdating="GridView1_RowUpdating"
                    OnRowCancelingEdit="GridView1_RowCancelingEdit" OnRowDataBound="GridView1_RowDataBound"
                    DataKeyNames="Id" AllowPaging="True" PageSize="50"
                      OnPageIndexChanging="GridView1_PageIndexChanging">
                    <Columns>
                        <asp:BoundField DataField="Id" HeaderText="ID" ReadOnly="True">
                            <ItemStyle Width="20px" />
                        </asp:BoundField>
                        <asp:BoundField DataField="ThemeTitle" HeaderText="主题名称" ReadOnly="True">
                            <ItemStyle Width="100px" />
                        </asp:BoundField>
                        <asp:BoundField DataField="TaskTitle" HeaderText="任务名称" ReadOnly="True">
                            <ItemStyle Width="100px" />
                        </asp:BoundField>
                        <asp:BoundField DataField="Time" HeaderText="执行频率"  ReadOnly="true"/>
                        <asp:BoundField DataField="TaskType" HeaderText="任务要求"  ReadOnly="true"/>
                        <asp:BoundField DataField="Remark" HeaderText="说明"  ReadOnly="true"/>
                        <asp:BoundField DataField="Hash" HeaderText="锚点"  />
                        <asp:BoundField DataField="Other" HeaderText="其它" />
                        <asp:BoundField DataField="Sn" HeaderText="顺序"  />
                        <asp:TemplateField HeaderText="分类">
                            <ItemTemplate>
                                <%# GetTaskClassName(Eval("TaskClass").ToString()) %>
                            </ItemTemplate>
                            <EditItemTemplate>
                                <asp:DropDownList ID="ddlTaskClass" runat="server">
                                    <asp:ListItem Text="" Value=""></asp:ListItem>
                                    <asp:ListItem Text="大任务" Value="1"></asp:ListItem>
                                    <asp:ListItem Text="小任务" Value="0"></asp:ListItem>
                                </asp:DropDownList>
                            </EditItemTemplate>
                        </asp:TemplateField>

                        <asp:TemplateField  HeaderText="可选">
                                <ItemTemplate>
                                    <asp:CheckBox ID="cbOptional" runat="server" />
                                    <asp:HiddenField ID="hfOptional" runat="server" Value='<%# Eval("Optional") %>' />
                                </ItemTemplate>
                        </asp:TemplateField>
                        <asp:TemplateField HeaderText="启用">
                            <ItemTemplate>
                                <asp:CheckBox ID="cbIsActv" runat="server" />
                                <asp:HiddenField ID="hfIsActv" runat="server" Value='<%# Eval("IsAct") %>' />
                            </ItemTemplate>
                            <ItemStyle Width="50px" />
                        </asp:TemplateField>
                        <asp:CommandField ShowEditButton="True">
                            <ItemStyle Width="50px" />
                        </asp:CommandField>
                        <asp:CommandField ShowDeleteButton="True">
                            <ItemStyle Width="50px" />
                        </asp:CommandField>
                    </Columns>
                    <PagerSettings Position="Top"/>
                    <EditRowStyle Width="50px" />
                </asp:SmartGridView>
                <asp:HiddenField ID="hfWeek" runat="server" />
                <asp:HiddenField ID="hfThemeId" runat="server" />
                <asp:HiddenField ID="hfTasks" runat="server" />
        </asp:Panel>
        <div  id="myModal" class="reveal-modal" style=" height:300px;  overflow:scroll; display:none">
        <div class="xlarge">
            <table border="0" cellpadding="0" cellspacing="0" style="width:100%" class="fromtable">
               <tr>
                    <td>
                        <select id="sTaskType" style=" width:200px;">
                            <option value="">全部</option>
                            <option value="上传图片">上传图片</option>
                            <option value="上传音频">上传音频</option>
                            <option value="上传视频">上传视频</option>
                            <option value="见证">见证</option>
                            <option value="签到">签到</option>
                            <option value="国学练习">国学练习</option>
                            <option value="背诵考核">背诵考核</option>
                            <option value="测试考核">测试考核</option>
                        </select>
                    </td>
                    <td style=" text-align:right;">
                        <input id="btnAdd" type="button" value="确定" class="btn" onmouseover="this.className='btn_mouseover'" onmouseout="this.className='btn'" >
                    </td>
               </tr>
           </table>
            <asp:SmartGridView ID="GridView2" runat="server"  AutoGenerateColumns="False"
                        Width="100%"  DataKeyNames="Id" OnRowDataBound="GridView2_RowDataBound" MouseOverCssClass="OverRow" 
                        SkinID="sgv1" >
                        <Columns>
                            <asp:TemplateField ItemStyle-Width="20px">
                                <HeaderTemplate>
                                    <asp:CheckBox ID="all" runat="server" />
                                </HeaderTemplate>
                                <ItemTemplate>
                                    <asp:CheckBox ID="item" runat="server" />
                                </ItemTemplate>
                            </asp:TemplateField>
                            <asp:BoundField DataField="Id" HeaderStyle-Width="70px" ItemStyle-Width="70px" HeaderText="编号" ReadOnly="true" />
                            <asp:BoundField DataField="Title"  HeaderText="任务名称" ReadOnly="true" />
                            <asp:BoundField DataField="Time" HeaderStyle-Width="120px" ItemStyle-Width="120px" HeaderText="执行频率"  ReadOnly="true"/>
                            <asp:BoundField DataField="TaskType" HeaderStyle-Width="120px" ItemStyle-Width="120px" HeaderText="任务要求"  ReadOnly="true"/>
                            <asp:BoundField DataField="Remark" HeaderText="说明"  ReadOnly="true"/>
                        </Columns>
                        <CascadeCheckboxes>
                            <asp:CascadeCheckbox ChildCheckboxID="item" ParentCheckboxID="all" />
                        </CascadeCheckboxes>
                        <CheckedRowCssClass CheckBoxID="item" CssClass="SelectedRow" />
                        <PagerSettings Position="Bottom"></PagerSettings>
                    </asp:SmartGridView>
        </div>
            <asp:AspNetPager ID="AspNetPager1" runat="server" class="aspnetpager" 
                        CustomInfoHTML="&lt;font color='red'&gt;&lt;b&gt;%currentPageIndex%&lt;/b&gt;&lt;/font&gt;/%PageCount%&nbsp; &nbsp;&nbsp;   共 %RecordCount% 记录   每页 %PageSize% 条" 
                        FirstPageText="首 页" LastPageText="尾 页" NextPageText="下一页" 
                        OnPageChanged="AspNetPager1_PageChanged" PageSize="3" PrevPageText="上一页" 
                        ShowCustomInfoSection="right" ShowDisabledButtons="false" 
                        ShowPageIndexBox="always">
                    </asp:AspNetPager>
        </div>
        </cc1:TabOptionItem>
    </cc1:TabOptionWebControls>
    <script>
        $("#btnAdd").click(function () {
            var paramName = "tasks";
            var myhref = window.location.href;
            var items = getTaskGridItems();
            var tasks = getUrlParam("tasks");
            var themeId = getUrlParam("ThemId");
            var week = getUrlParam("Week");
            console.log(myhref);
            if (tasks == null) {
                myhref += "&tasks=" + items
            } else {
            
                var re = eval('/(' + paramName + '=)([^&]*)/gi');
                var nUrl = myhref.replace(re, paramName + '=' + items);
                myhref = nUrl;
            }
            editTask(themeId, items, week, myhref);
        });
        $("#btnShow").click(function () {
            $("#myModal").toggle();
            $("#<%=GridView1.ClientID %>").toggle();
            setTaskGridSelected();
        });
        $("#sTaskType").change(function () {
            var v = $(this).val();
            var grid = $("#<%=GridView2.ClientID %>");
            var rows = grid.find("tr");
            rows.show();
            if (v == "") return;
            rows.each(function (i) {
                if ($(this).children("td").eq(4).text() != v) {
                    $(this).hide();
                }
            })
        })
        function getUrlParam(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
            var r = window.location.search.substr(1).match(reg);  //匹配目标参数
            if (r != null) return unescape(r[2]); return null; //返回参数值
        }
        function getTaskGridItems() {
            var grid = $("#<%=GridView2.ClientID %>");
            var rows = grid.find("tr");
            var items = '';
            rows.each(function (i) {
                if ($(this).children("td").eq(0).children("span").eq(0).children("input:checked").length > 0) {
                    var o = $(this).children("td").eq(1).text();
                    items += "," + o;
                }
            })
            if (items.length > 0) {
                items = items.substr(1);
            }
            return items;
        }
        function setTaskGridSelected() {
            var items = $("#<%=hfTasks.ClientID %>").val();
            items = items.split(',');
            console.log(items);
            var grid = $("#<%=GridView2.ClientID %>");
            var rows = grid.find("tr");
            //console.log(rows);
            rows.each(function (i) {
                var o = $(this).children("td").eq(1).text();
                if (findTask(items, o)) {
                    $(this).removeAttr("class").addClass("SelectedRow");
                    $(this).find("td span input").attr("checked", "checked");
                }
            })
        }
        function editTask(themeid, tasks, week, href) {
            console.log(href);
            $.ajax({
                url: '../Service/TaskService.ashx',
                type: 'POST',
                dataType: 'text',
                data: { 'themeid': themeid, 'tasks': '' + tasks + '', 'week': week },
                success: function (data) {
                    console.log(data)
                    window.location.href = href;
                }
            });
        }
        function findTask(tasks,v){
            for(var i=0;i<tasks.length;i++){
                if(tasks[i]==v){
                    return true;
                }
            }
            return false;
        }
    </script>
</asp:Content>