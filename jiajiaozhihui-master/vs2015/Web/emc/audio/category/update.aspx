<%@ Page Language="C#" MasterPageFile="~/MasterPage/PageTemplate.Master" AutoEventWireup="true" CodeBehind="update.aspx.cs" Inherits="SfSoft.web.emc.audio.category.update" Title="无标题页" %>
<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
    <script src="../../../js/My97DatePicker/WdatePicker.js" type="text/javascript"></script>
    <script  src="/js/emccommon.js"></script>
    <script src="../../js/jquery-1.7.2.min.js" type="text/javascript"></script>
    <cc1:TabOptionWebControls ID="TabOptionWebControls1" runat="server">
        <cc1:TabOptionItem ID="TabOptionItem2" runat="server" Tab_Name="计划数据">
            <asp:Panel ID="Panel2" GroupingText="筛选" runat="server">
                <style>
                    select { width:200px;}
                </style>
                <table border="0" cellpadding="0" cellspacing="0" style="width:98%" class="fromtable">
                    <tr>
                        <td style="width:120px;">长标题</td>
                        <td>
                            <asp:TextBox runat="server" ID="txtFullName" Width="200px"></asp:TextBox>
                        </td>
                    </tr>
                    <tr>
                        <td style="width:120px;">短标题</td>
                        <td>
                            <asp:TextBox runat="server" ID="txtShortName" Width="200px"></asp:TextBox>
                        </td>
                    </tr>
                    <tr>
                        <td style="width:120px;">小图</td>
                        <td >
                            <asp:TextBox ID="txtMiniImgUrl" Width="50%" runat="server" Visible="false" ></asp:TextBox>
                            <asp:FileUpload ID="fileMiniImgUrl" runat="server"  />
                            <asp:HyperLink ID="btnMiniImgView" Target="_blank"  class="btn" onmouseout="this.className='btn'" onmouseover="this.className='btn_mouseover'"  Text ="查看"  Visible="false" runat="server" ></asp:HyperLink>
                            <asp:Button ID="btnDelMiniPic"  runat="server" Text="删除" CssClass="btn" 
                                Visible="false" OnClientClick="return confirm('确定要删除图片？');" 
                                onclick="btnDelMiniPic_Click" /></td>
                    </tr>
                    <tr>
                        <td style="width:120px;">大图</td>
                        <td >
                            <asp:TextBox ID="txtMaxImgUrl" Width="50%" runat="server" Visible="false" ></asp:TextBox>
                            <asp:FileUpload ID="fileMaxImgUrl" runat="server"  />
                            <asp:HyperLink ID="btnMaxImgView" Target="_blank"  class="btn" onmouseout="this.className='btn'" onmouseover="this.className='btn_mouseover'"  Text ="查看"  Visible="false" runat="server" ></asp:HyperLink>
                            <asp:Button ID="btnDelMaxPic"  runat="server" Text="删除" CssClass="btn" 
                                Visible="false" OnClientClick="return confirm('确定要删除图片？');" 
                                onclick="btnDelMaxPic_Click" /></td>
                    </tr>
                    <tr>
                        <td style="width:120px;">是否有效</td>
                        <td>
                            <asp:CheckBox ID="cbIsAct" runat="server" /> 是否有效
                        </td>
                    </tr>
                </table>
            </asp:Panel>
        </cc1:TabOptionItem>
    </cc1:TabOptionWebControls>
    <asp:HiddenField ID="hfMode" runat="server" />
            <asp:HiddenField ID="hfMID" runat="server" />
            <asp:HiddenField ID="hfID" runat="server" />
</asp:Content>
