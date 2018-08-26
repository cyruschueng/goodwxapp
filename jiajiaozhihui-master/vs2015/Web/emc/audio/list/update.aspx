<%@ Page Language="C#" MasterPageFile="~/MasterPage/PageTemplate.Master" AutoEventWireup="true" CodeBehind="update.aspx.cs" Inherits="SfSoft.web.emc.audio.list.update" Title="无标题页" %>
<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
    <script src="../../../js/My97DatePicker/WdatePicker.js" type="text/javascript"></script>
    <script  src="/js/emccommon.js"></script>
    <script src="../../js/jquery-1.7.2.min.js" type="text/javascript"></script>
    <cc1:TabOptionWebControls ID="TabOptionWebControls1" runat="server">
        <cc1:TabOptionItem ID="TabOptionItem1" runat="server" Tab_Name="课程内容">
            <asp:Panel ID="Panel1" GroupingText="基本数据" runat="server">
                <style>
                    select { width:200px;}
                </style>
                <table border="0" cellpadding="0" cellspacing="0" style="width:98%" class="fromtable">
                <tr>
                    <td style="width:120px;">类目</td>
                    <td>
                        <asp:DropDownList ID="ddlCategory1" AutoPostBack="true" runat="server" 
                            onselectedindexchanged="ddlCategory1_SelectedIndexChanged"></asp:DropDownList>
                        &nbsp;&nbsp;
                        <asp:DropDownList ID="ddlCategory2" AutoPostBack="true" runat="server"  Visible="false"
                            onselectedindexchanged="ddlCategory2_SelectedIndexChanged"></asp:DropDownList>
                        &nbsp;&nbsp;
                        <asp:DropDownList ID="ddlCategory3" runat="server" Visible="false"
                            onselectedindexchanged="ddlCategory3_SelectedIndexChanged"></asp:DropDownList>
                    </td>
                </tr>
                <tr>
                    <td  style="width:120px;">
                        长标题&nbsp;</td>
                    <td  >
                        <asp:TextBox ID="txtFullName" runat="server" Width="220px"></asp:TextBox></td>
                </tr>
                <tr>
                    <td  style="width:120px;">
                        短标题&nbsp;</td>
                    <td  >
                        <asp:TextBox ID="txtShortName" runat="server" Width="220px"></asp:TextBox></td>
                </tr>
                <tr>
                        <td style="width:120px;">音源</td>
                        <td>
                            <asp:TextBox ID="txtSoundSource" runat="server" Width="95%"></asp:TextBox></td>
                </tr>
                <tr>
                        <td style="width:120px;">时长</td>
                        <td>
                            <asp:TextBox ID="txtDuration" onkeyup="javascript:permitFloat(this);" TextMode="Number" runat="server" Width="95%"></asp:TextBox></td>
                </tr>
                <tr>
                        <td style="width:120px;">封面</td>
                        <td >
                            <asp:TextBox ID="txtCover" Width="50%" runat="server" Visible="false" ></asp:TextBox>
                            <asp:FileUpload ID="fileUpload" runat="server"  />
                            <asp:HyperLink ID="btnView" Target="_blank"  class="btn" onmouseout="this.className='btn'" onmouseover="this.className='btn_mouseover'"  Text ="查看"  Visible="false" runat="server" ></asp:HyperLink>
                            <asp:Button ID="btnDelPic"  runat="server" Text="删除" CssClass="btn" 
                                Visible="false" OnClientClick="return confirm('确定要删除图片？');" 
                                onclick="btnDelPic_Click" /></td>
                </tr>
                <tr>
                        <td style="width:120px;">歌手</td>
                        <td><asp:TextBox ID="txtSinger" runat="server" Width="220px"></asp:TextBox></td>
                 </tr>
                <tr>  
                        <td style="width:120px;">是否启用</td>
                        <td><asp:CheckBox ID="cbIsAct" Checked="true" runat="server" />是否启用</td>   
                </tr>
            </table>
            </asp:Panel>
            <asp:HiddenField ID="hfMode" runat="server" />
            <asp:HiddenField ID="hfMID" runat="server" />
            <asp:HiddenField ID="hfID" runat="server" />
        </cc1:TabOptionItem>
    </cc1:TabOptionWebControls>
</asp:Content>
