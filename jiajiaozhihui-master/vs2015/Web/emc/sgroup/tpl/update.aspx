<%@ Page Language="C#" MasterPageFile="~/MasterPage/PageTemplate.Master" AutoEventWireup="true" CodeBehind="update.aspx.cs" Inherits="SfSoft.web.emc.sgroup.tpl.update" Title="无标题页" %>
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
                        <td class="td">模版明称</td>
                       <td ><asp:TextBox ID="txtTitle" runat="server" Width="180px"></asp:TextBox></td>
                    </tr>

                    <tr>
                        <td class="td">二维码X坐标</td>
                        <td ><asp:TextBox ID="txtQRCodeX" TextMode="Number" runat="server" Width="100px"></asp:TextBox></td>
                    </tr>
                     <tr>   
                        <td class="td">二维码Y坐标</td>
                        <td ><asp:TextBox ID="txtQRCodeY" TextMode="Number" runat="server" Width="100px"></asp:TextBox></td>
                    </tr>

                    <tr>
                        <td class="td">二维码宽</td>
                        <td ><asp:TextBox ID="txtQRCodeW" TextMode="Number" runat="server" Width="100px"></asp:TextBox></td>
                    </tr>
                     <tr>   
                        <td class="td">二维码高</td>
                        <td ><asp:TextBox ID="txtQRCodeH" TextMode="Number" runat="server" Width="100px"></asp:TextBox></td>
                    </tr>

                    <tr>
                        <td class="td">文字</td>
                        <td ><asp:TextBox ID="txtTag" runat="server" Width="90%"></asp:TextBox></td>
                    </tr>
                    <tr>
                        <td class="td">二维码X坐标</td>
                        <td ><asp:TextBox ID="txtTagX" TextMode="Number" runat="server" Width="100px"></asp:TextBox></td>
                    </tr>
                     <tr>   
                        <td class="td">二维码Y坐标</td>
                        <td ><asp:TextBox ID="txtTagY" TextMode="Number" runat="server" Width="100px"></asp:TextBox></td>
                    </tr>
                     <tr>   
                        <td class="td">排序</td>
                        <td ><asp:TextBox ID="txtSn" TextMode="Number" runat="server"  Width="80px"></asp:TextBox></td>
                    </tr>
                    <tr>   
                        <td class="td">海报类型</td>
                        <td >
                            <asp:RadioButtonList ID="rblCatalogue" RepeatDirection="Horizontal" runat="server">
                                <asp:ListItem Value="1" Text="初级海报"></asp:ListItem>
                                <asp:ListItem Value="2" Text="高级海报"></asp:ListItem>
                             </asp:RadioButtonList> 
                        </td>
                    </tr>
                    <tr>   
                        <td class="td">是否有效</td>
                        <td >
                            <asp:RadioButtonList ID="rblIsAct" RepeatDirection="Horizontal" runat="server">
                                <asp:ListItem Value="0" Text="无效"></asp:ListItem>
                                <asp:ListItem Value="1" Text="用效"></asp:ListItem>
                             </asp:RadioButtonList> 
                        </td>
                    </tr>
                     <tr>
                        <td class="td">模版</td>
                        <td >
                            <asp:Image ID="imgSrc" Visible="false" runat="server"  />
                            <asp:FileUpload ID="fileSrc" runat="server"  />
                            <asp:Button ID="btnDeleSrc" OnClick="btnDelSrc_Click"  runat="server" Text="删除" CssClass="btn" Visible="false" OnClientClick="return confirm('确定要删除图片？');"  />
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
