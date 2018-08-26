<%@ Page Language="C#" MasterPageFile="~/MasterPage/PageTemplate.Master" AutoEventWireup="true" CodeBehind="update.aspx.cs" Inherits="SfSoft.web.emc.resouce.set.update" Title="无标题页" %>
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
                        <td class="td">Bucket名称<span style="color:#f00;">*</span> </td>
                        <td ><asp:TextBox ID="txtTitle" runat="server" Width="95%"></asp:TextBox></td>
                    </tr>
                    <tr>
                        <td class="td">专家</td>
                        <td ><asp:TextBox ID="txtExpertId" runat="server" Width="95%"></asp:TextBox></td>
                    </tr>
                    <tr>
                        <td class="td">简介</td>
                        <td ><asp:TextBox ID="txtIntro" TextMode="MultiLine" runat="server" Width="95%"></asp:TextBox></td>
                    </tr>
                     <tr>   
                        <td class="td">群介绍</td>
                        <td ><FCKeditorV2:FCKeditor ID="txtDetail" runat="server" DefaultLanguage="zh-cn" Height="300px" Width="98%" ></FCKeditorV2:FCKeditor></td>
                    </tr>
                    <tr>
                        <td class="td">小图</td>
                        <td >
                            <asp:Image style="width:30%;" ID="smallImgSrc" Visible="false" runat="server"  />
                            <asp:FileUpload ID="fileSmallImgSrc" runat="server"  />
                            <asp:Button ID="btnDeleSmallImgSrc" OnClick="btnDeleSmallImgSrc_Click"  runat="server" Text="删除" CssClass="btn" Visible="false" OnClientClick="return confirm('确定要删除图片？');"  />
                        </td>
                    </tr>
                    <tr>
                        <td class="td">大图</td>
                        <td >
                            <asp:Image style="width:30%;" ID="imgSrc" Visible="false" runat="server"  />
                            <asp:FileUpload ID="fileImgSrc" runat="server"  />
                            <asp:Button ID="btnDeleImgSrc" OnClick="btnDeleImgSrc_Click"  runat="server" Text="删除" CssClass="btn" Visible="false" OnClientClick="return confirm('确定要删除图片？');"  />
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
