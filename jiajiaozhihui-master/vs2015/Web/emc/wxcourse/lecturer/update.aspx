<%@ Page Language="C#" MasterPageFile="~/MasterPage/PageTemplate.Master" AutoEventWireup="true" CodeBehind="update.aspx.cs" Inherits="SfSoft.web.emc.wxcourse.lecturer.update" Title="无标题页" %>
<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
    <script src="../../../js/My97DatePicker/WdatePicker.js" type="text/javascript"></script>
    <script  src="/js/emccommon.js"></script>
    
    <cc1:TabOptionWebControls ID="TabOptionWebControls1" runat="server">
        <cc1:TabOptionItem ID="TabOptionItem1" runat="server" Tab_Name="编辑课程供应商">
            <asp:Panel ID="Panel1" GroupingText="基本数据" runat="server">
                <script src="//cdn.bootcss.com/jquery/2.2.1/jquery.js"></script>
                <table border="0" cellpadding="2" cellspacing="0" width="100%" class="fromtable">
                    <tr>
                        <td>姓名</td>
                        <td ><asp:TextBox ID="txtName" runat="server" Width="95%"></asp:TextBox></td>
                        <td>部门</td>
                        <td ><asp:TextBox ID="txtDepartMent" runat="server" Width="95%"></asp:TextBox></td>
                        <td>职位</td>
                        <td ><asp:TextBox ID="txtPostion" runat="server" Width="95%" ></asp:TextBox></td>
                    </tr>
                    <tr>
                        <td>课程封面</td>
                        <td colspan="5">
                            <asp:TextBox ID="txtHeadImgUrl" runat="server" Width="50%" Visible="false" ></asp:TextBox>
                            <asp:FileUpload ID="fileUpload" runat="server"  />
                            <asp:HyperLink ID="btnView" Target="_blank"  class="btn" onmouseout="this.className='btn'" onmouseover="this.className='btn_mouseover'"  Text ="查看"  Visible="false" runat="server" ></asp:HyperLink>
                            <asp:Button ID="btnDelPic"  runat="server" Text="删除" CssClass="btn" Visible="false" OnClientClick="return confirm('确定要删除图片？');" onclick="btnDelPic_Click" />
                        </td>
                    </tr>
                    <tr>
                        <td>简介</td>
                        <td colspan="5">
                            <asp:TextBox ID="txtIntro" TextMode="MultiLine" Rows="5" runat="server" Width="95%" ></asp:TextBox>
                        </td>
                    </tr>
                    <tr>
                         <td>详情</td>
                        <td colspan="5">
                            <FCKeditorV2:FCKeditor ID="txtDetails" runat="server" DefaultLanguage="zh-cn" Height="300px" Width="100%" ></FCKeditorV2:FCKeditor>
                        </td>
                    </tr>
                </table>
            </asp:Panel>
            <asp:HiddenField ID="hfMode" runat="server" />
            <asp:HiddenField ID="hfMID" runat="server" />
            <asp:HiddenField ID="hfID" runat="server" />
            <asp:HiddenField ID="hfReward" runat="server" />
        </cc1:TabOptionItem>
    </cc1:TabOptionWebControls>
</asp:Content>
