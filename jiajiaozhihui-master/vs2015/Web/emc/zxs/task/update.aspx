<%@ Page Language="C#" MasterPageFile="~/MasterPage/PageTemplate.Master" AutoEventWireup="true" CodeBehind="update.aspx.cs" Inherits="SfSoft.web.emc.zxs.task.update" Title="无标题页" %>
<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
    <script src="../../../js/My97DatePicker/WdatePicker.js" type="text/javascript"></script>
    <script  src="/js/emccommon.js"></script>
    <script src="../../../js/comm.js" type="text/javascript"></script>

    <cc1:TabOptionWebControls ID="TabOptionWebControls1" runat="server">
        <cc1:TabOptionItem ID="TabOptionItem1" runat="server" Tab_Name="任务设置">
            <asp:Panel ID="Panel1" GroupingText="" runat="server">
                <style>
                    .td{ width:80px;}
                </style>
                <table border="0" cellpadding="2" cellspacing="0" width="100%" class="fromtable">
                    <tr>
                        <td class="td">任务名称</td>
                        <td ><asp:TextBox ID="txtTitle" runat="server" Width="95%"></asp:TextBox></td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <asp:RadioButtonList ID="rblHZ" RepeatDirection="Horizontal" runat="server">
                                <asp:ListItem Text="每天" Value="1"></asp:ListItem>
                                <asp:ListItem Text="每周" Value="2"></asp:ListItem>
                                <asp:ListItem Text="每月" Value="3"></asp:ListItem>
                            </asp:RadioButtonList>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <asp:DropDownList ID="ddlTime" runat="server" Width="100px">
                                <asp:ListItem Text="1" Value="1"></asp:ListItem>
                                <asp:ListItem Text="2" Value="2"></asp:ListItem>
                                <asp:ListItem Text="3" Value="3"></asp:ListItem>
                                <asp:ListItem Text="4" Value="4"></asp:ListItem>
                                <asp:ListItem Text="5" Value="5"></asp:ListItem>
                                <asp:ListItem Text="6" Value="6"></asp:ListItem>
                                <asp:ListItem Text="7" Value="7"></asp:ListItem>
                                <asp:ListItem Text="8" Value="8"></asp:ListItem>
                                <asp:ListItem Text="9" Value="9"></asp:ListItem>
                                <asp:ListItem Text="10" Value="10"></asp:ListItem>
                                <asp:ListItem Text="60" Value="60"></asp:ListItem>
                                <asp:ListItem Text="70" Value="70"></asp:ListItem>
                                <asp:ListItem Text="80" Value="80"></asp:ListItem>
                                <asp:ListItem Text="90" Value="90"></asp:ListItem>
                                <asp:ListItem Text="100" Value="100"></asp:ListItem>
                            </asp:DropDownList>
                            <asp:DropDownList ID="ddlUnit" runat="server">
                                <asp:ListItem Text="个" Value="个"></asp:ListItem>
                                <asp:ListItem Text="次" Value="次"></asp:ListItem>
                                <asp:ListItem Text="分" Value="分"></asp:ListItem>
                            </asp:DropDownList>
                        </td>
                    </tr>
                    <tr>
                        <td>任务要求</td>
                        <td>
                            <asp:RadioButtonList ID="rblTaskType" RepeatDirection="Horizontal" runat="server">
                                <asp:ListItem Text="上传图片" Value="1"></asp:ListItem>
                                <asp:ListItem Text="上传音频" Value="2"></asp:ListItem>
                                <asp:ListItem Text="上传视频" Value="3"></asp:ListItem>
                                <asp:ListItem Text="见证" Value="4"></asp:ListItem>
                                <asp:ListItem Text="签到" Value="5"></asp:ListItem>
                                <asp:ListItem Text="国学练习" Value="6"></asp:ListItem>
                                <asp:ListItem Text="背诵考核" Value="7"></asp:ListItem>
                                <asp:ListItem Text="测试考核" Value="8"></asp:ListItem>
                                <asp:ListItem Text="无" Value="0"></asp:ListItem>
                            </asp:RadioButtonList>
                        </td>
                    </tr>
                    <tr>
                        <td class="td">说明</td>
                        <td ><asp:TextBox ID="txtRemark" TextMode="MultiLine" Rows="2" Width="95%" runat="server"></asp:TextBox></td>
                    </tr>
                    <tr>
                        <td class="td">详细说明</td>
                        <td >
                            <FCKeditorV2:FCKeditor ID="txtIntroduce" runat="server" DefaultLanguage="zh-cn" Height="300px" Width="100%" ></FCKeditorV2:FCKeditor>
                        </td>
                    </tr>
                     <tr>
                        <td class="td">状态</td>
                        <td >
                            <asp:DropDownList ID="ddlIsAct" runat="server">
                                <asp:ListItem Text="----请选择----" Value=""></asp:ListItem>
                                <asp:ListItem Text="启用" Value="1"></asp:ListItem>
                                <asp:ListItem Text="禁用" Value="0"></asp:ListItem>
                            </asp:DropDownList>
                        </td>
                    </tr>
                    <tr>
                        <td class="td">图标</td>
                        <td >
                            <asp:Image ID="imgLogo" Visible="false" runat="server"  />
                            <asp:FileUpload ID="fileLogo" runat="server"  />
                            <asp:Button ID="btnDeleLogo" OnClick="btnDelPic_Click"  runat="server" Text="删除" CssClass="btn" Visible="false" OnClientClick="return confirm('确定要删除图片？');"  />
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
