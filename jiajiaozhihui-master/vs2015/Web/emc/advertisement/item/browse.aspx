<%@ Page Language="C#" MasterPageFile="~/MasterPage/PageTemplate.Master" AutoEventWireup="true"
    CodeBehind="browse.aspx.cs" Inherits="SfSoft.web.emc.advertisement.item.browse" Title="无标题页" %>

<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
    <cc1:TabOptionWebControls ID="TabOptionWebControls1" runat="server">
        <cc1:TabOptionItem ID="TabOptionItem1" runat="server" Tab_Name="公益品">
            <asp:Panel ID="Panel1" GroupingText="查询条件" runat="server">
                <style>
                    .select{ width:95%;}
                </style>
                <table border="0" cellpadding="2" cellspacing="0" width="100%" class="fromtable">
                    <tr>
                        <td>广告名称</td>
                        <td><asp:TextBox ID="txtName" runat="server" style=" width:98%;"></asp:TextBox></td>
                        <td>广告类型</td>
                        <td>
                            <asp:DropDownList ID="ddlOwn" runat="server">
                                <asp:ListItem Text="双十一活动" Value="emc.activity.double11"></asp:ListItem>
                                <asp:ListItem Text="国学知行社" Value="emc.zxs"></asp:ListItem>
                                <asp:ListItem Text="国学达人" Value="emc.brainsexpert"></asp:ListItem>
                                <asp:ListItem Text="诵读社" Value="emc.read"></asp:ListItem>
                                <asp:ListItem Text="阅读社" Value="emc.yuedu"></asp:ListItem>
                                <asp:ListItem Text="家教问答" Value="emc.qa"></asp:ListItem>
                            </asp:DropDownList>
                        </td>

                        <td><asp:Button ID="btnSearch" runat="server" Text="查询"  class="btn" 
                            onmouseout="this.className='btn'" onmouseover="this.className='btn_mouseover'" 
                                onclick="btnSearch_Click1"  /></td>
                    </tr>
                </table>
            </asp:Panel>
            <asp:SmartGridView ID="GridView1" runat="server"  AutoGenerateColumns="False"
                Width="99%"  DataKeyNames="ID"
                 OnRowDataBound="GridView1_RowDataBound" MouseOverCssClass="OverRow" 
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
                    <asp:BoundField DataField="ID" HeaderText="编号" ReadOnly="true" />
                    <asp:BoundField DataField="Name" HeaderText="广告名称" ReadOnly="true" />
                    <asp:BoundField DataField="Positions" HeaderText="广告位"  ReadOnly="true"/>
                    <asp:BoundField DataField="Own" HeaderText="项目"  ReadOnly="true"/>
                    <asp:BoundField DataField="CreateDate" HeaderText="创建日期"  ReadOnly="true"/>
                    <asp:BoundField DataField="IsAct" HeaderText="是否启用"  ReadOnly="true"/>
                </Columns>
                <CascadeCheckboxes>
                    <asp:CascadeCheckbox ChildCheckboxID="item" ParentCheckboxID="all" />
                </CascadeCheckboxes>
                <CheckedRowCssClass CheckBoxID="item" CssClass="SelectedRow" />
                <PagerSettings Position="Bottom"></PagerSettings>
            </asp:SmartGridView>
        </cc1:TabOptionItem>
    </cc1:TabOptionWebControls>
    <asp:AspNetPager ID="AspNetPager1" runat="server" class="aspnetpager" 
                        CustomInfoHTML="&lt;font color='red'&gt;&lt;b&gt;%currentPageIndex%&lt;/b&gt;&lt;/font&gt;/%PageCount%&nbsp; &nbsp;&nbsp;   共 %RecordCount% 记录   每页 %PageSize% 条" 
                        FirstPageText="首 页" LastPageText="尾 页" NextPageText="下一页" 
                        OnPageChanged="AspNetPager1_PageChanged" PageSize="6" PrevPageText="上一页" 
                        ShowCustomInfoSection="right" ShowDisabledButtons="false" 
                        ShowPageIndexBox="always">
                    </asp:AspNetPager>
</asp:Content>
