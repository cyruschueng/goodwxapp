<%@ Page Language="C#" MasterPageFile="~/MasterPage/PageTemplate.Master" AutoEventWireup="true" CodeBehind="browse.aspx.cs" Inherits="SfSoft.web.emc.sm.workct.browse" Title="无标题页" %>
<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
    <cc1:TabOptionWebControls ID="TabOptionWebControls1" runat="server">
        <cc1:TabOptionItem ID="TabOptionItem1" runat="server" Tab_Name="工作交接">
            <table width="600" class="fromtable" style="border-left-color: lightgrey; border-bottom-color: lightgrey; border-top-style: solid; border-top-color: lightgrey; border-right-style: solid; border-left-style: solid; border-right-color: lightgrey; border-bottom-style: solid" border="1" cellpadding="2" cellspacing="0">
                <tr>
                    <td style="width: 177px; height: 20px; color: white; background-color: royalblue;">
                        交接功能选择：</td>
                    <td style="width: 177px; height: 20px; color: white; background-color: royalblue;">
                        交接人员：</td>
                    <td style="height: 20px; width: 177px; color: white; background-color: royalblue;">
                        交接范围：</td>
                </tr>
                <tr>
                    <td style="width: 177px; height: 120px" valign="top">
                        <asp:CheckBox ID="cbTask" runat="server" Text="任务管理" Width="81px" />
                        <br />
                        <asp:CheckBox ID="cbToDo" runat="server" Text="审批事务" Width="81px" />
                        <br />
                        <asp:CheckBox ID="cbWorkFlow" runat="server" Text="审批流程" Width="80px" />
                        <br />
                        <asp:CheckBox ID="cbDataAcl" runat="server" Text="数据权限" Width="79px" />
                        <br />
                        <asp:CheckBox ID="cbFunAcl" runat="server" Text="功能权限" Width="78px" /></td>
                    <td style="width: 278px; height: 19px" valign="top">
                        <asp:Label ID="Label1" runat="server" Text="被交接人：" Width="64px" Height="17px"></asp:Label>
                        <asp:DropDownList ID="ddlOldMan" runat="server">
                        </asp:DropDownList><br />
                        <br />
                        <asp:Label ID="Label2" runat="server" Text="现交接人：" Width="63px" Height="18px"></asp:Label>
                        <asp:DropDownList ID="ddlNewMan" runat="server">
                        </asp:DropDownList></td>
                    <td style="height: 19px; width: 298px;" valign="top"><asp:DropDownList ID="ddlFw" runat="server">
                    </asp:DropDownList></td>
                </tr>
                <tr>
                    <td style="height: 16px" colspan="3">
                                               &nbsp;<asp:Label ID="lblMsg" runat="server" ForeColor="Red" Width="210px"></asp:Label></td>
                </tr>
            </table>
            <br />
            &nbsp;</cc1:TabOptionItem>
    </cc1:TabOptionWebControls>
</asp:Content>
