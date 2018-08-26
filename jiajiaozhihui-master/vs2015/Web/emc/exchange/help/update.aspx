<%@ Page Language="C#" MasterPageFile="~/MasterPage/PageTemplate.Master" AutoEventWireup="true" CodeBehind="update.aspx.cs" Inherits="SfSoft.web.emc.exchange.help.update" Title="无标题页" %>
<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
    <cc1:TabOptionWebControls ID="TabOptionWebControls1" runat="server">
        <cc1:TabOptionItem ID="TabOptionItem1" runat="server" Tab_Name=" 消息管理">
            <table border="0" cellpadding="2" cellspacing="0" width="100%" class="fromtable">
                    <tr>
                        <td align="right" height="25" style="width: 80px">标题&nbsp;</td>
                        <td align="left" height="25" ><asp:TextBox ID="txtTitle" runat="server" Width="95%"></asp:TextBox></td>
                        <td align="left" height="25" style="width: 100px">消息类型</td>
                        <td align="left" height="25" ><asp:DropDownList ID="ddlHelpType" runat="server" Width="95%"></asp:DropDownList></td> 
                        <td align="left" height="25" style="width: 100px">排序</td>
                        <td align="left" height="25" ><asp:TextBox ID="txtSn" runat="server" Width="95%"></asp:TextBox></td>
                    </tr>
                    <tr>
                        <td align="left" height="25" style="width: 100px">内容</td>
                        <td colspan="5">
                            <FCKeditorV2:FCKeditor ID="txtDetails" runat="server" DefaultLanguage="zh-cn" Height="600px" Width="100%" ></FCKeditorV2:FCKeditor>
                        </td>
                    </tr>
            </table>
            <asp:HiddenField ID="hfMode" runat="server" />
            <asp:HiddenField ID="hfMID" runat="server" />
            <asp:HiddenField ID="hfID" runat="server" />
        </cc1:TabOptionItem>
    </cc1:TabOptionWebControls>
</asp:Content>
