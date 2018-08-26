<%@ Page Language="C#" MasterPageFile="~/MasterPage/PageTemplate.Master" AutoEventWireup="true"
    CodeBehind="browse.aspx.cs" Inherits="SfSoft.web.emc.wxcourse.provider.browse" Title="无标题页" %>

<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
    <cc1:TabOptionWebControls ID="TabOptionWebControls1" runat="server">
        <cc1:TabOptionItem ID="TabOptionItem1" runat="server" Tab_Name="课程供应商">
            <asp:Panel ID="Panel1" GroupingText="查询条件" runat="server">
                <style>
                    .select{ width:95%;}
                </style>
                <table border="0" cellpadding="2" cellspacing="0" width="100%" class="fromtable">
                    <tr>
                        <td>供应商</td>
                        <td><asp:TextBox ID="txtName" runat="server" style=" width:98%;"></asp:TextBox></td>
                        <td>类型</td>
                        <td>
                            <asp:DropDownList ID="ddlType" runat="server" Width="95%" CssClass="select">
                                <asp:ListItem Text="" Value="" ></asp:ListItem>
                                <asp:ListItem Text="公司" Value="1" ></asp:ListItem>
                                <asp:ListItem Text="个人" Value="2"></asp:ListItem>
                            </asp:DropDownList>
                        </td>
                        <td colspan="3"></td>
                </tr>
                <tr>
                        <td>联系人</td>
                        <td><asp:TextBox ID="txtLinkMan" runat="server" style=" width:98%;"></asp:TextBox></td>
                        <td>电话</td>
                        <td><asp:TextBox ID="txtMobile" runat="server" style=" width:98%;"></asp:TextBox></td>
                        <td>QQ</td>
                        <td><asp:TextBox ID="txtQQ" runat="server" style=" width:98%;"></asp:TextBox></td>
                        <td><asp:Button ID="btnSearch" runat="server" Text="查询"  class="btn" 
                            onmouseout="this.className='btn'" onmouseover="this.className='btn_mouseover'" 
                                onclick="btnSearch_Click"  /></td>
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
                    <asp:BoundField DataField="Id" HeaderText="编号" ReadOnly="true" />
                    <asp:BoundField DataField="Name" HeaderText="供应商" ReadOnly="true" />
                    <asp:BoundField DataField="Type" HeaderText="类型"  ReadOnly="true"/>
                    <asp:BoundField DataField="LinkMan" HeaderText="联系人"  ReadOnly="true"/>
                    <asp:BoundField DataField="Mobile" HeaderText="手机"  ReadOnly="true"/>
                    <asp:BoundField DataField="QQ" HeaderText="QQ"  ReadOnly="true"/>
                    <asp:BoundField DataField="Weixin" HeaderText="微信号" ReadOnly="true" />
                    <asp:BoundField DataField="CollDate" HeaderText="合作时间" ReadOnly="true" />
                    <asp:BoundField DataField="IsAct" HeaderText="状态" ReadOnly="true"  />
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
                        OnPageChanged="AspNetPager1_PageChanged" PageSize="15" PrevPageText="上一页" 
                        ShowCustomInfoSection="right" ShowDisabledButtons="false" 
                        ShowPageIndexBox="always">
                    </asp:AspNetPager>
</asp:Content>
