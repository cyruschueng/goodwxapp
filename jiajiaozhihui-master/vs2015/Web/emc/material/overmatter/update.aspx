<%@ Page Language="C#" MasterPageFile="~/MasterPage/PageTemplate.Master" AutoEventWireup="true" CodeBehind="update.aspx.cs" Inherits="SfSoft.web.emc.material.overmatter.update" Title="无标题页" %>
<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
    <script type="text/javascript" src="../../../js/comm.js"></script>
    <style>
        select{ width:20%;}
    </style>
    <cc1:TabOptionWebControls ID="TabOptionWebControls1" runat="server">
        <cc1:TabOptionItem ID="TabOptionItem1" runat="server" Tab_Name=" 消息管理">
          <asp:Panel  ID="Panel1" GroupingText="文章数据编辑" runat="server">
            <table border="0" cellpadding="2" cellspacing="0" width="100%" class="fromtable">
                    <tr>
                        <td colspan="2" style=" text-align:center; font-size:18px; color:#f00; padding:5px 0px;">
                            <asp:Label ID="lblWeek" runat="server" ></asp:Label>
                        </td>
                    </tr>    
                    <tr>
                        <td align="right" height="25" style="width: 80px">周几&nbsp;</td>
                        <td align="left" height="25" >
                            <asp:DropDownList ID="ddlWeek" runat="server">
                                <asp:ListItem Text="---选择周几---" Value=""></asp:ListItem>
                                <asp:ListItem Text="周一" Value="1"></asp:ListItem>
                                <asp:ListItem Text="周二" Value="2"></asp:ListItem>
                                <asp:ListItem Text="周三" Value="3"></asp:ListItem>
                                <asp:ListItem Text="周四" Value="4"></asp:ListItem>
                                <asp:ListItem Text="周五" Value="5"></asp:ListItem>
                                <asp:ListItem Text="周六" Value="6"></asp:ListItem>
                                <asp:ListItem Text="周七" Value="7"></asp:ListItem>
                            </asp:DropDownList>
                        </td>
                    </tr>
                    <tr>
                        <td align="right" height="25" style="width: 80px">标题&nbsp;</td>
                        <td align="left" height="25" ><asp:TextBox ID="txtTitle" runat="server" Width="95%"></asp:TextBox></td>
                    </tr>
                    <tr>
                        <td align="left" height="25" style="width: 100px">文章Url</td>
                        <td align="left" height="25" >
                            <asp:TextBox ID="txtArticleUrl"   Width="95%" runat="server" ></asp:TextBox>
                        </td>
                    </tr>
                    <tr>
                        <td align="left" height="25" style="width: 100px">图片Url</td>
                        <td align="left" height="25" >
                            <asp:TextBox ID="txtImgUrl"   Width="95%" runat="server" ></asp:TextBox>
                        </td>
                    </tr>
                    <tr>
                        <td align="left" height="25" style="width: 100px">排序</td>
                        <td align="left" height="25" >
                            <asp:TextBox ID="txtOrder"  Width="95%" runat="server" ></asp:TextBox>
                        </td>
                    </tr>
                    <tr>
                        <td align="left" height="25" style="width: 100px">是否头条</td>
                        <td align="left" height="25" >
                            <asp:CheckBox ID="cbHead" runat="server" />
                        </td>
                    </tr>
            </table>
            </asp:Panel>
            <asp:HiddenField ID="hfMode" runat="server" />
            <asp:HiddenField ID="hfMID" runat="server" />
            <asp:HiddenField ID="hfID" runat="server" />
        </cc1:TabOptionItem>
    </cc1:TabOptionWebControls>
</asp:Content>
