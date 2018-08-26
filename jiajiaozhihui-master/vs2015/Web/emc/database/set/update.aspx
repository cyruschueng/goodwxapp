<%@ Page Language="C#" MasterPageFile="~/MasterPage/PageTemplate.Master" AutoEventWireup="true" CodeBehind="update.aspx.cs" Inherits="SfSoft.web.emc.material.reply.update" Title="无标题页" %>
<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
    <cc1:TabOptionWebControls ID="TabOptionWebControls1" runat="server">
        <cc1:TabOptionItem ID="TabOptionItem1" runat="server" Tab_Name=" 消息管理">
            <table border="0" cellpadding="2" cellspacing="0" width="100%" class="fromtable">
                    <tr>
                        <td align="right" height="25" style="width: 80px">标题&nbsp;</td>
                        <td align="left" height="25" ><asp:TextBox ID="txtTitle" runat="server" Width="95%"></asp:TextBox></td>
                        <td align="left" height="25" style="width: 100px">关键字</td>
                        <td align="left" height="25" ><asp:TextBox ID="txtKeyWord" runat="server" Width="95%"></asp:TextBox></td>
                        <td align="left" height="25" style="width: 100px">消息类型</td>
                        <td align="left" height="25" ><asp:DropDownList ID="ddlMsgType" runat="server" Width="95%"></asp:DropDownList></td> 
                        <td align="left" height="25" style="width: 100px">分类</td>
                        <td align="left" height="25" ><asp:DropDownList ID="ddlClass" runat="server" Width="95%"></asp:DropDownList></td> 
                    </tr>
                    <tr>
                        <td align="left" height="25" style="width: 100px">描述</td>
                        <td align="left" height="25" colspan="7">
                            <asp:TextBox ID="fckDesc"  TextMode="MultiLine" MaxLength="1000" Height="200px" Width="100%" runat="server" ></asp:TextBox>
                        </td>
                    </tr>
                    <tr>
                        <td align="left" height="25" style="width: 100px">图片链接</td>
                        <td align="left" height="25" colspan="3"><asp:TextBox ID="txtPicUrl" runat="server" Width="95%"></asp:TextBox></td>
                        <td align="left" height="25" style="width: 100px">新闻内容链接</td>
                        <td align="left" height="25" colspan="3"><asp:TextBox ID="txtNewsUrl" runat="server" Width="95%"></asp:TextBox></td>
                    </tr>
                    <tr>
                        <td align="left" height="25" style="width: 100px">内容</td>
                        <td colspan="7">
                            <asp:TextBox ID="fckContent"  TextMode="MultiLine" MaxLength="1000" Height="400px" Width="100%" runat="server" ></asp:TextBox>
                        </td>
                    </tr>
            </table>
            <asp:HiddenField ID="hfMode" runat="server" />
            <asp:HiddenField ID="hfMID" runat="server" />
            <asp:HiddenField ID="hfID" runat="server" />
        </cc1:TabOptionItem>
    </cc1:TabOptionWebControls>
</asp:Content>
