<%@ Page Language="C#" MasterPageFile="~/MasterPage/PageTemplate.Master" AutoEventWireup="true" CodeBehind="update.aspx.cs" Inherits="SfSoft.web.emc.audio.download.update" Title="无标题页" %>
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
                    <td  style="width:120px;">标题</td>
                    <td  >
                        <asp:TextBox ID="txtTitle" runat="server" Width="220px"></asp:TextBox></td>
                </tr>
                <tr>
                    <td  style="width:120px;">描述</td>
                    <td  >
                        <asp:TextBox ID="txtIntro" TextMode="MultiLine" runat="server" Width="95%"></asp:TextBox></td>
                </tr>
                <tr>
                    <td  style="width:120px;">下载地址</td>
                    <td  >
                        <asp:TextBox ID="txtDownLoadUrl"  runat="server" Width="95%"></asp:TextBox></td>
                </tr>
                <tr>
                        <td style="width:120px;">封面</td>
                        <td >
                            <asp:TextBox ID="txtImgUrl" Width="50%" runat="server" Visible="false" ></asp:TextBox>
                            <asp:FileUpload ID="fileUpload" runat="server"  />
                            <asp:HyperLink ID="btnView" Target="_blank"  class="btn" onmouseout="this.className='btn'" onmouseover="this.className='btn_mouseover'"  Text ="查看"  Visible="false" runat="server" ></asp:HyperLink>
                            <asp:Button ID="btnDelPic"  runat="server" Text="删除" CssClass="btn" 
                                Visible="false" OnClientClick="return confirm('确定要删除图片？');" 
                                onclick="btnDelPic_Click" /></td>
                </tr>
                 <tr>
                    <td  style="width:120px;">详情</td>
                    <td  >
                        <FCKeditorV2:FCKeditor ID="txtDetail" runat="server" DefaultLanguage="zh-cn" Height="300px" Width="98%" ></FCKeditorV2:FCKeditor></td>
                </tr>
                <tr>
                    <td  style="width:120px;">备注</td>
                    <td  >
                        <asp:TextBox ID="txtRemark" TextMode="MultiLine" runat="server" Width="95%"></asp:TextBox></td>
                </tr>
                <tr>
                    <td style="width:120px;">书签</td>
                    <td>
                                <asp:CheckBoxList ID="cbTags" RepeatDirection="Horizontal" runat="server">
                                    <asp:ListItem Text="SR-2" Value="SR-2"></asp:ListItem>
                                    <asp:ListItem Text="SR-6" Value="SR-6"></asp:ListItem>
                                    <asp:ListItem Text="SR-7" Value="SR-7"></asp:ListItem>
                                    <asp:ListItem Text="SR-7S" Value="SR-7S"></asp:ListItem>
                                    <asp:ListItem Text="SR-8" Value="SR-8"></asp:ListItem>
                                </asp:CheckBoxList></td>
                </tr>
            </table>
            </asp:Panel>
            <asp:HiddenField ID="hfMode" runat="server" />
            <asp:HiddenField ID="hfMID" runat="server" />
            <asp:HiddenField ID="hfID" runat="server" />
        </cc1:TabOptionItem>
    </cc1:TabOptionWebControls>
</asp:Content>
