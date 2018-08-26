<%@ Page Language="C#" MasterPageFile="~/MasterPage/PageTemplate.Master" AutoEventWireup="true"
    CodeBehind="browse.aspx.cs" Inherits="SfSoft.web.emc.QA.q.browse" Title="无标题页" %>
<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
    <script src="../../../js/My97DatePicker/WdatePicker.js" type="text/javascript"></script>
    
    <cc1:TabOptionWebControls ID="TabOptionWebControls1" runat="server">
        <cc1:TabOptionItem ID="TabOptionItem1" runat="server" Tab_Name="问题列表">
            <asp:Panel ID="Panel3" GroupingText="" runat="server">
                <table border="0" cellpadding="0" cellspacing="0" style="width:100%" class="fromtable">
                    <tr>
                        <td><asp:TextBox ID="txtComment" placeholder="查找的内容" runat="server"></asp:TextBox></td>
                        <td>
                            <asp:TextBox ID="txtStartDate" onClick="WdatePicker({isShowClear:true,readOnly:true})" runat="server"></asp:TextBox>
                            -
                            <asp:TextBox ID="txtEndDate" onClick="WdatePicker({isShowClear:true,readOnly:true})" runat="server"></asp:TextBox>
                        </td>
                        <td><asp:TextBox ID="txtExpert" placeholder="专家"  runat="server"></asp:TextBox></td>
                        <td><asp:TextBox ID="txtReplayNumber" placeholder="回答次数" TextMode="Number" runat="server"></asp:TextBox></td>
                        <td><asp:CheckBox ID="cbTop" runat="server" />精华</td>
                        <td><asp:CheckBox ID="cbDele" runat="server" />已删除</td>
                        
                        <td>
                            <asp:Button ID="btnFind"  Text="查询" class="btn"  
                                onmouseover="this.className='btn_mouseover'" onmouseout="this.className='btn'" 
                                runat="server" onclick="btnFind_Click" />
                        </td>
                    </tr>
                </table>
                <asp:SmartGridView ID="GridView1" runat="server"  AutoGenerateColumns="False"
                    Width="99%"  DataKeyNames="Id,OpenId" 
                    OnRowDataBound="GridView1_RowDataBound" MouseOverCssClass="OverRow" 
                    SkinID="sgv1" onrowcommand="GridView1_RowCommand" >
                    <Columns>
                        <asp:TemplateField ItemStyle-Width="20px">
                            <HeaderTemplate>
                                <asp:CheckBox ID="all" runat="server" />
                            </HeaderTemplate>
                            <ItemTemplate>
                                <asp:CheckBox ID="item" runat="server" />
                            </ItemTemplate>
                        </asp:TemplateField>
                        <asp:BoundField DataField="Id" HeaderText="编号" ReadOnly="true" />
                        <asp:BoundField DataField="Comment" HeaderText="问题" ReadOnly="true" />
                        <asp:BoundField DataField="UName" HeaderText="专家" ReadOnly="true" />
                        <asp:BoundField DataField="Quantity" HeaderText="回答次数"  ReadOnly="true"/>
                        <asp:BoundField DataField="LikeNumber" HeaderText="点赞数"  ReadOnly="true"/>
                        <asp:TemplateField HeaderText="精华">
                            <ItemTemplate>
                                <%# Eval("istop").ToString()=="1"?"是":"" %>
                            </ItemTemplate>
                        </asp:TemplateField>

                        <asp:BoundField DataField="CreateDate" HeaderText="提问日期"  ReadOnly="true"/>
                        <asp:TemplateField>
                            <ItemTemplate>
                                <label onclick='like(<%# Eval("Id") %>,<%# Container.DataItemIndex+1 %>)' style=" cursor:pointer"  >点赞</label>
                                &nbsp;&nbsp;
                                <label onclick='top1(<%# Eval("Id") %>,<%# Container.DataItemIndex+1 %>)' style=" cursor:pointer">精华</label>
                            </ItemTemplate>
                        </asp:TemplateField>
                    </Columns>
                    <CascadeCheckboxes>
                        <asp:CascadeCheckbox ChildCheckboxID="item" ParentCheckboxID="all" />
                    </CascadeCheckboxes>
                    <CheckedRowCssClass CheckBoxID="item" CssClass="SelectedRow" />
                    <PagerSettings Position="Bottom"></PagerSettings>
                </asp:SmartGridView>
            </asp:Panel>
            <asp:AspNetPager ID="AspNetPager1" runat="server" class="aspnetpager" 
                        CustomInfoHTML="&lt;font color='red'&gt;&lt;b&gt;%currentPageIndex%&lt;/b&gt;&lt;/font&gt;/%PageCount%&nbsp; &nbsp;&nbsp;   共 %RecordCount% 记录   每页 %PageSize% 条" 
                        FirstPageText="首 页" LastPageText="尾 页" NextPageText="下一页" 
                        OnPageChanged="AspNetPager1_PageChanged" PageSize="15" PrevPageText="上一页" 
                        ShowCustomInfoSection="right" ShowDisabledButtons="false" 
                        ShowPageIndexBox="always">
                    </asp:AspNetPager>
        </cc1:TabOptionItem>
        <cc1:TabOptionItem ID="TabOptionItem2" runat="server" Tab_Name="我要提问">
            <style>
                .select{width:200px;}
            </style>
            <table border="0" cellpadding="0" cellspacing="0" style="width:100%" class="fromtable">
                <tr>
                    <td>提问人</td>
                    <td><asp:DropDownList ID="ddlQuizzer" runat="server" CssClass="select"></asp:DropDownList></td>
                </tr>
                <tr>
                    <td>问题</td>
                    <td>
                        <asp:TextBox ID="txtQuestion" TextMode="MultiLine" Rows="3" runat="server" Width="99%"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td colspan="2">
                        <asp:Button class="btn" onmouseover="this.className='btn_mouseover'" 
                            onmouseout="this.className='btn'" ID="btnQuestion" Text="提交"  runat="server" 
                            onclick="btnQuestion_Click" />
                    </td>
                </tr>
            </table>
        </cc1:TabOptionItem>    
    </cc1:TabOptionWebControls>
    <script src="../../js/jquery-1.7.2.min.js" type="text/javascript"></script>
    <script>

        function like(id, index) {
            var number = prompt("请输入你点赞数", 1);
            if (isNaN(number)) {
                alert("请输入数字");
                return;
            }
            $.ajax({
                url: '../helper/QAProvide.ashx?method=like',
                type: 'POST',
                data: { id: id, number: number },
                dataType: 'text',
                success: function (res) {
                    var grid = $("#<%=GridView1.ClientID %>");
                    var tr = grid.find("tr").eq(index);
                    var td = tr.find("td").eq(5);
                    td.text(res);
                }
            })
        };
        function top1(id,index) {
            $.ajax({
                url: '../helper/QAProvide.ashx?method=top',
                type: 'POST',
                data: { id: id },
                dataType: 'text',
                success: function (res) {
                    var grid = $("#<%=GridView1.ClientID %>");
                    var tr = grid.find("tr").eq(index);
                    var td = tr.find("td").eq(6);
                    td.text(res=="1"?"是":"");
                }
            })
        };
    </script>
</asp:Content>
