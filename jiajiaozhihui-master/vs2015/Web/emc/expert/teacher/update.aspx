<%@ Page Language="C#" MasterPageFile="~/MasterPage/PageTemplate.Master" AutoEventWireup="true" CodeBehind="update.aspx.cs" Inherits="SfSoft.web.emc.expert.teacher.update" Title="无标题页" %>
<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
    <script src="../../../js/My97DatePicker/WdatePicker.js" type="text/javascript"></script>
    <script  src="/js/emccommon.js"></script>
    <script src="../../../js/comm.js" type="text/javascript"></script>
    <cc1:TabOptionWebControls ID="TabOptionWebControls1" runat="server">
        <cc1:TabOptionItem ID="TabOptionItem1" runat="server" Tab_Name="群信息">
            <asp:Panel ID="Panel1" GroupingText="基本数据" runat="server">
                <style>
                    .td{ width:80px;}
                </style>
                <table border="0" cellpadding="2" cellspacing="0" width="100%" class="fromtable">
                    <tr>
                        <td class="td">姓名</td>
                        <td ><asp:TextBox ID="txtUName" runat="server" Width="95%"></asp:TextBox></td>
                    </tr>
                    <tr>
                        <td class="td">电话号码</td>
                        <td ><asp:TextBox ID="txtTelephone" runat="server" Width="95%"></asp:TextBox></td>
                    </tr>
                    <tr>
                        <td class="td">性别</td>
                        <td >
                            <asp:RadioButtonList ID="rblSex" RepeatDirection="Horizontal" runat="server">
                                <asp:ListItem Selected="True" Text="男" Value="男"></asp:ListItem>
                                <asp:ListItem  Text="女" Value="女"></asp:ListItem>
                            </asp:RadioButtonList>
                        </td>
                    </tr>
                    <tr>   
                        <td class="td">简介</td>
                        <td ><asp:TextBox ID="txtIntro" TextMode="MultiLine" Rows="3" Width="100%"  runat="server"></asp:TextBox></td>
                    </tr>
                     <tr>   
                        <td class="td">详情</td>
                        <td ><FCKeditorV2:FCKeditor ID="txtDetail" runat="server" DefaultLanguage="zh-cn" Height="300px" Width="98%" ></FCKeditorV2:FCKeditor></td>
                    </tr>
                    <tr>
                        <td class="td">自定义头像</td>
                        <td >
                            <asp:Image ID="imgUrl" Visible="false" runat="server"  />
                            <asp:FileUpload ID="fileimgUrl" runat="server"  />
                            <asp:Button ID="btnDeleLogo" OnClick="btnDelPic_Click"  runat="server" Text="删除" CssClass="btn" Visible="false" OnClientClick="return confirm('确定要删除图片？');"  />
                        </td>
                    </tr>
                     <tr>   
                        <td colspan="2">
                            <asp:RadioButtonList ID="rblIsAct" RepeatDirection="Horizontal" style=" display:inline-block" runat="server">
                                <asp:ListItem Text="专家启用" Value="1"></asp:ListItem>
                                <asp:ListItem Text="专家禁用" Value="0"></asp:ListItem>
                            </asp:RadioButtonList>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <asp:RadioButtonList ID="rblIsRest" RepeatDirection="Horizontal" style=" display:inline-block" runat="server">
                                <asp:ListItem Text="专家上岗" Value="0"></asp:ListItem>
                                <asp:ListItem Text="专家休息" Value="1"></asp:ListItem>
                            </asp:RadioButtonList>
                        </td>
                    </tr>
                    <tr> 
                        <td colspan="2">
                        
                            <asp:CheckBox ID="cbIsDefault" style=" display:inline-block" runat="server" />默认专家
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            专家类型
                            <asp:DropDownList ID="ddlExpertType" runat="server">
                                <asp:ListItem Text="" Value="0"></asp:ListItem>
                                <asp:ListItem Text="系统专家" Value="1"></asp:ListItem>
                                <asp:ListItem Text="普通专家" Value="2"></asp:ListItem>
                            </asp:DropDownList>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <asp:CheckBox ID="cblIsCheck" style=" display:inline-block" runat="server" />是否审核
                        </td>
                    </tr>
                    <tr> 
                        <td colspan="2">
                            关注数：<asp:Label ID="lbLikeNumber" Text="0" runat="server" Width="200px"></asp:Label>
                        </td>
                    </tr>
                    <tr>
                        <td class="td">顺序</td>
                        <td ><asp:TextBox ID="txtSn"  TextMode="Number"  Width="100px"  runat="server"></asp:TextBox></td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            微信帐号：<asp:Label ID="lbOpenId" runat="server"></asp:Label>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            微信昵称：<asp:Label ID="lbNickName" runat="server"></asp:Label>
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
