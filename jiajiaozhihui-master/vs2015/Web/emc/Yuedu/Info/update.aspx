<%@ Page Language="C#" MasterPageFile="~/MasterPage/PageTemplate.Master" AutoEventWireup="true" CodeBehind="update.aspx.cs" Inherits="SfSoft.web.emc.Yuedu.info.update" Title="无标题页" %>
<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
    <script src="../../../js/My97DatePicker/WdatePicker.js" type="text/javascript"></script>
    <script  src="/js/emccommon.js"></script>
    
    <cc1:TabOptionWebControls ID="TabOptionWebControls1" runat="server">
        <cc1:TabOptionItem ID="TabOptionItem1" runat="server" Tab_Name="群信息">
            <asp:Panel ID="Panel1" GroupingText="基本数据" runat="server">
                <style>
                    .td{ width:80px;}
                </style>
                <table border="0" cellpadding="2" cellspacing="0" width="100%" class="fromtable">
                    <tr>
                        <td class="td">活动编码</td>
                        <td ><asp:TextBox ID="txtAppid" runat="server" Width="95%"></asp:TextBox></td>
                    </tr>
                    <tr>
                        <td class="td">活动名称</td>
                        <td ><asp:TextBox ID="txtTitle" runat="server" Width="95%"></asp:TextBox></td>
                    </tr>
                    <tr>
                        <td class="td">普通用户人数</td>
                        <td ><asp:Label ID="lblNormalNumber" onkeyup="javascript:permitInt(this);" runat="server"></asp:Label></td>
                    </tr>
                    <tr>
                        <td class="td">活动特殊人数</td>
                        <td ><asp:Label ID="lbActiveNumber" onkeyup="javascript:permitInt(this);" runat="server"></asp:Label></td>
                    </tr>
                     <tr>   
                        <td class="td">活动简介</td>
                        <td ><FCKeditorV2:FCKeditor ID="txtIntroduction" runat="server" DefaultLanguage="zh-cn" Height="300px" Width="98%" ></FCKeditorV2:FCKeditor></td>
                    </tr>
                    <tr>
                        <td class="td">Logo</td>
                        <td >
                            <asp:Image ID="imgLogo" Visible="false" runat="server"  />
                            <asp:FileUpload ID="fileLogo" runat="server"  />
                            <asp:Button ID="btnDeleLogo" OnClick="btnDelPic_Click"  runat="server" Text="删除" CssClass="btn" Visible="false" OnClientClick="return confirm('确定要删除图片？');"  />
                        </td>
                    </tr>
                     <tr>   
                        <td class="td">状态</td>
                        <td >
                            <asp:DropDownList ID="ddlStatus" runat="server">
                                <asp:ListItem Text="----请选择----" Value=""></asp:ListItem>
                                <asp:ListItem Text="启用" Value="1"></asp:ListItem>
                                <asp:ListItem Text="未启用" Value="0"></asp:ListItem>
                            </asp:DropDownList>
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
