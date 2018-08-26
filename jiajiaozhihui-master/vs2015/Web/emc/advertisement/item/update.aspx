<%@ Page Language="C#" MasterPageFile="~/MasterPage/PageTemplate.Master" AutoEventWireup="true" CodeBehind="update.aspx.cs" Inherits="SfSoft.web.emc.advertisement.item.update" Title="无标题页" %>
<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
    
    <link href="control/css/zyUpload.css" rel="stylesheet" type="text/css" />
    <cc1:TabOptionWebControls ID="TabOptionWebControls1" runat="server">
        <cc1:TabOptionItem ID="TabOptionItem1" runat="server" Tab_Name="在线活动">
            <asp:Panel ID="Panel1" GroupingText="基本数据" runat="server">
                <table border="0" cellpadding="2" cellspacing="0" width="100%" class="fromtable">
                    <tr>
                        <td >广告名称&nbsp;</td>
                        <td colspan="2">
                            <asp:TextBox ID="txtName" runat="server" Width="95%"></asp:TextBox>
                        </td>
                        <td>
                            <asp:RadioButtonList ID="rblIsAct" RepeatDirection="Horizontal" runat="server">
                                <asp:ListItem Text="启用" Value="1"></asp:ListItem>
                                <asp:ListItem Text="禁用" Value="0"></asp:ListItem>
                            </asp:RadioButtonList>
                        </td>
                    </tr>
                    <tr>
                        <td>图片</td>
                        <td colspan="3">
                            <asp:Image ID="imgUrl" Visible="false" runat="server"  />
                            <asp:FileUpload ID="fileImgUrl" runat="server"  />
                            <asp:Button ID="btnDeleImg" OnClick="btnDeleImg_Click"  runat="server" Text="删除" CssClass="btn" Visible="false" OnClientClick="return confirm('确定要删除图片？');"  />
                        </td>
                    </tr>
                    <tr>
                        <td>视频URL</td>
                        <td colspan="3">
                            <asp:TextBox ID="txtMediaUrl" runat="server" Width="95%"></asp:TextBox>
                        </td>
                    </tr>
                    <tr>
                        <td>外链</td>
                        <td colspan="3">
                            <asp:TextBox ID="txtOuterLink" TextMode="Url" runat="server" Width="95%"></asp:TextBox>
                        </td>
                    </tr>
                    <tr>
                        <td >广告位</td>
                        <td >
                            <asp:DropDownList ID="ddlPositions" runat="server">
                                <asp:ListItem Text="----请选择----" Value=""></asp:ListItem>
                                <asp:ListItem Text="第1位" Value="1"></asp:ListItem>
                                <asp:ListItem Text="第2位" Value="2"></asp:ListItem>
                                <asp:ListItem Text="第3位" Value="3"></asp:ListItem>
                                <asp:ListItem Text="第4位" Value="4"></asp:ListItem>
                                <asp:ListItem Text="第5位" Value="5"></asp:ListItem>
                                <asp:ListItem Text="第6位" Value="6"></asp:ListItem>
                                <asp:ListItem Text="第7位" Value="7"></asp:ListItem>
                                <asp:ListItem Text="第8位" Value="8"></asp:ListItem>
                                <asp:ListItem Text="第9位" Value="9"></asp:ListItem>
                                <asp:ListItem Text="第10位" Value="10"></asp:ListItem>
                            </asp:DropDownList>
                        </td> 
                        <td>分组</td>
                        <td>
                            <asp:DropDownList ID="ddlOwn" runat="server">
                                <asp:ListItem Text="----请选择----" Value=""></asp:ListItem>
                                <asp:ListItem Text="双十一活动" Value="emc.activity.double11"></asp:ListItem>
                                <asp:ListItem Text="国学知行社" Value="emc.zxs"></asp:ListItem>
                                <asp:ListItem Text="国学达人" Value="emc.brainsexpert"></asp:ListItem>
                                <asp:ListItem Text="诵读社" Value="emc.read"></asp:ListItem>
                                <asp:ListItem Text="阅读社" Value="emc.yuedu"></asp:ListItem>
                                <asp:ListItem Text="家教问答" Value="emc.qa"></asp:ListItem>
                            </asp:DropDownList>
                        </td>
                    </tr>
                    <tr>
                        <td>简述</td>
                        <td colspan="3">
                            <asp:TextBox ID="txtResume" TextMode="MultiLine" Rows="3"  Width="95%" runat="server"></asp:TextBox>
                        </td>
                    </tr>
                    <tr>
                        <td>内容</td>
                        <td colspan="3">
                            <FCKeditorV2:FCKeditor ID="txtTextContent" runat="server" DefaultLanguage="zh-cn" Height="500px" Width="100%" ></FCKeditorV2:FCKeditor>
                        </td>
                    </tr>
                    <tr>
                        <td>分享标题</td>
                        <td colspan="3">
                            <asp:TextBox TextMode="MultiLine" runat="server" ID="txtShareTitle"></asp:TextBox>
                        </td>
                    </tr>
                    <tr>
                        <td>分享简介</td>
                        <td colspan="3">
                            <asp:TextBox TextMode="MultiLine" runat="server" ID="txtShareDese"></asp:TextBox>
                        </td>
                    </tr>
                </table>
            </asp:Panel>
            <asp:HiddenField ID="hfMode" runat="server" />
            <asp:HiddenField ID="hfMID" runat="server" />
            <asp:HiddenField ID="hfID" runat="server" />
            <asp:HiddenField ID="hfPic" runat="server" />
        </cc1:TabOptionItem>
    </cc1:TabOptionWebControls>
    <script src="control/js/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../../js/My97DatePicker/WdatePicker.js" type="text/javascript"></script>
    
</asp:Content>
