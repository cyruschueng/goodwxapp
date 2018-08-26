<%@ Page Language="C#" MasterPageFile="~/MasterPage/PageTemplate.Master" AutoEventWireup="true" CodeBehind="source_update.aspx.cs" Inherits="SfSoft.web.emc.resouce.set.source_update" Title="无标题页" %>
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
                        <td class="td">文件名称<span style="color:#f00;">*</span> </td>
                        <td ><asp:TextBox ID="txtFileTitle" runat="server" Width="95%"></asp:TextBox></td>
                    </tr>
                    <tr>
                        <td class="td">文件描述</td>
                        <td ><asp:TextBox ID="txtFileIntro" TextMode="MultiLine" runat="server" Width="95%"></asp:TextBox></td>
                    </tr>
                    <tr>
                        <td class="td">文件大小</td>
                        <td ><asp:TextBox ID="txtFileSize"  runat="server" Width="95%"></asp:TextBox></td>
                    </tr>
                    <tr>
                        <td class="td">文件类型</td>
                        <td ><asp:TextBox ID="txtFileType"  runat="server" Width="95%"></asp:TextBox></td>
                    </tr>
                     <tr>   
                        <td class="td">文件地址<span style="color:#f00;">*</span></td>
                        <td ><asp:TextBox ID="txtFileLink"  runat="server" Width="95%"></asp:TextBox></td>
                    </tr>
                    <tr>   
                        <td class="td">顺序</td>
                        <td ><asp:TextBox ID="txtSn"  runat="server" Width="95%"></asp:TextBox></td>
                    </tr>
                    <tr>   
                        <td class="td">是否有效</td>
                        <td ><asp:RadioButtonList ID="rblIsAct" runat="server" RepeatDirection="Horizontal">
                            <asp:ListItem Text="有效" Value="1"></asp:ListItem>
                            <asp:ListItem Text="无效" Value="0"></asp:ListItem>
                             </asp:RadioButtonList></td>
                    </tr>
                    <tr>   
                        <td class="td">其它参数</td>
                        <td ><asp:TextBox ID="txtRemark" TextMode="MultiLine"  runat="server" Width="95%"></asp:TextBox></td>
                    </tr>
                    <tr>
                        <td class="td">图片</td>
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
            <asp:HiddenField ID="hfClassId" runat="server" />
        </cc1:TabOptionItem>
    </cc1:TabOptionWebControls>
</asp:Content>

