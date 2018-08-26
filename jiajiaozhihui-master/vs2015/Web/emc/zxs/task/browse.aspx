<%@ Page Language="C#" MasterPageFile="~/MasterPage/PageTemplate.Master" AutoEventWireup="true"
    CodeBehind="browse.aspx.cs" Inherits="SfSoft.web.emc.zxs.task.browse" Title="无标题页" %>

<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
    <table border="0" cellpadding="2" cellspacing="0" width="100%" class="fromtable">
        <tr>
            <td style=" width:80px;">任务名称</td>
            <td style=" width:100px;"><asp:TextBox ID="txtTask"  runat="server"></asp:TextBox> </td>
            <td>
                <asp:Button ID="btnSearch" class="btn" onmouseout="this.className='btn'"  onmouseover="this.className='btn_mouseover'"  Text="查询" OnClick="btnSearch_Click"  runat="server"/>
            </td>
        </tr>
    </table>
    <cc1:TabOptionWebControls ID="TabOptionWebControls1" runat="server">
        <cc1:TabOptionItem ID="TabOptionItem1" runat="server" Tab_Name="任务信息">
            <asp:Panel ID="Panel3" GroupingText="" runat="server">
                <asp:SmartGridView ID="GridView1" runat="server"  AutoGenerateColumns="False"
                    Width="99%"  DataKeyNames="Id" OnRowDataBound="GridView1_RowDataBound" MouseOverCssClass="OverRow" 
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
                        <asp:BoundField DataField="Id" HeaderText="编号" ReadOnly="true" />
                        <asp:BoundField DataField="Title" HeaderText="任务名称" ReadOnly="true" />
                        <asp:BoundField DataField="Time" HeaderText="执行频率"  ReadOnly="true"/>
                        <asp:BoundField DataField="TaskType" HeaderText="任务要求"  ReadOnly="true"/>
                        <asp:BoundField DataField="Remark" HeaderText="说明"  ReadOnly="true"/>
                        <asp:TemplateField HeaderText="Logo">
                            <ItemTemplate>
                                <img style="width:30p; height:30px;" src='<%#Eval("ImgLogo") %>' />
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
        </cc1:TabOptionItem>
    </cc1:TabOptionWebControls>
    <asp:AspNetPager ID="AspNetPager1" runat="server" class="aspnetpager" 
                        CustomInfoHTML="&lt;font color='red'&gt;&lt;b&gt;%currentPageIndex%&lt;/b&gt;&lt;/font&gt;/%PageCount%&nbsp; &nbsp;&nbsp;   共 %RecordCount% 记录   每页 %PageSize% 条" 
                        FirstPageText="首 页" LastPageText="尾 页" NextPageText="下一页" 
                        OnPageChanged="AspNetPager1_PageChanged" PageSize="15" PrevPageText="上一页" 
                        ShowCustomInfoSection="right" ShowDisabledButtons="false" 
                        ShowPageIndexBox="always">
                    </asp:AspNetPager>
</asp:Content>
