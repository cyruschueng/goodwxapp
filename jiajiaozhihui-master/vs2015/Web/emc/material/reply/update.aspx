<%@ Page Language="C#" MasterPageFile="~/MasterPage/PageTemplate.Master" AutoEventWireup="true" CodeBehind="update.aspx.cs" Inherits="SfSoft.web.emc.material.reply.update" Title="无标题页" %>
<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
    <cc1:TabOptionWebControls ID="TabOptionWebControls1" runat="server">
        <cc1:TabOptionItem ID="TabOptionItem1" runat="server" Tab_Name=" 消息管理">
            <table border="0" cellpadding="2" cellspacing="0" width="100%" class="fromtable">
                    <tr>
                        <td >微信号</td>
                        <td colspan="7">
                            <asp:DropDownList ID="ddlApp"  runat="server" >
                                <asp:ListItem Text="" Value=""></asp:ListItem>
                                <asp:ListItem Text="家教智慧公众号(jiajiaozh)" Value="jiajiaozh"></asp:ListItem>
                                <asp:ListItem Text="品格养成服务号(pingeyc)" Value="pingeyc"></asp:ListItem>
                            </asp:DropDownList>
                        </td>
                    </tr>
                    <tr>
                        <td align="right" height="25" style="width: 80px">标题&nbsp;</td>
                        <td align="left" height="25" ><asp:TextBox ID="txtTitle" runat="server" Width="95%"></asp:TextBox></td>
                        <td align="left" height="25" style="width: 100px">关键字</td>
                        <td align="left" height="25" ><asp:TextBox ID="txtKeyWord" runat="server" Width="95%"></asp:TextBox></td>
                        <td align="left" height="25" style="width: 100px">消息类型</td>
                        <td align="left" height="25" ><asp:DropDownList ID="ddlMsgType" runat="server" Width="95%"></asp:DropDownList></td> 
                        <!--
                        <td align="left" height="25" style="width: 100px">分类</td>
                        <td align="left" height="25" ><asp:DropDownList ID="ddlClass" runat="server" Width="95%"></asp:DropDownList></td> 
                        -->
                        <td align="left" height="25" style="width: 100px">排序</td>
                        <td align="left" height="25" ><asp:TextBox ID="txtOrder" runat="server" Width="95%"></asp:TextBox></td>

                    </tr>
                    <tr>
                        <td align="left" height="25" style="width: 100px">标签<span style="color:#f00">(多个用逗号隔开)</span></td>
                        <td align="left" height="25" colspan="7">
                            <asp:TextBox ID="txtTags" Width="98%" runat="server"></asp:TextBox>
                        </td>
                    </tr>
                    <tr>
                        <td align="left" height="25" style="width: 100px">描述</td>
                        <td align="left" height="25" colspan="7">
                            <asp:TextBox ID="fckDesc"  TextMode="MultiLine" MaxLength="1000" Height="100px" Width="100%" runat="server" ></asp:TextBox>
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
                            <asp:TextBox ID="fckContent"  TextMode="MultiLine" MaxLength="1000" Height="300px" Width="100%" runat="server" ></asp:TextBox>
                        </td>
                    </tr>
                    <tr>
                        <td align="left" height="25" style="width: 100px">认证Url</td>
                        <td colspan="7">
                            <asp:TextBox ID="txtAuthUrl"   Width="100%" runat="server" ></asp:TextBox>
                        </td>
                    </tr>
                    <tr>
                        <td align="left" height="25" style="width: 100px">使用范围</td>
                        <td colspan="7">
                            <asp:RadioButtonList ID="rblClass" RepeatDirection="Horizontal" runat="server">
                                <asp:ListItem Text="系统" Value="1"></asp:ListItem>
                                <asp:ListItem Text="非系统" Value="0"></asp:ListItem>
                            </asp:RadioButtonList>
                        </td>
                    </tr>
                    <tr>
                        <td align="left" height="25" style="width: 100px">从微信服务器读取用户数据</td>
                        <td >
                            <asp:CheckBox ID="cbIsReadWeiXinService" runat="server" />
                        </td>
                        <td colspan="6">
                            <span style="color:#000;">些项设置只针对图文消息，是为了兼容以前自己服务读取微信用户数据 如果选择此项，直接从微信服务器读取数据，否则将从自己的服务器读取用户数据！</span>
                        </td>
                    </tr>
            </table>
            <asp:HiddenField ID="hfMode" runat="server" />
            <asp:HiddenField ID="hfMID" runat="server" />
            <asp:HiddenField ID="hfID" runat="server" />
        </cc1:TabOptionItem>
    </cc1:TabOptionWebControls>
</asp:Content>
