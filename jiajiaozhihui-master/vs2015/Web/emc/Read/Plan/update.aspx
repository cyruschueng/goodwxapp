<%@ Page Language="C#" MasterPageFile="~/MasterPage/PageTemplate.Master" AutoEventWireup="true" CodeBehind="update.aspx.cs" Inherits="SfSoft.web.emc.read.plan.update" Title="无标题页" %>
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
                        <td class="td">名称</td>
                        <td ><asp:TextBox ID="txtPlanName" runat="server" Width="95%"></asp:TextBox></td>
                    </tr>
                    <tr>
                        <td class="td">类型</td>
                        <td >
                            <asp:RadioButtonList ID="rblFileType" RepeatDirection="Horizontal" runat="server">
                                    <asp:ListItem  Text="故事" Value="1"></asp:ListItem>
                                    <asp:ListItem  Text="诵读" Value="0"></asp:ListItem>
                            </asp:RadioButtonList>
                        </td>
                    </tr>
                    <tr>
                        <td class="td">简介</td>
                        <td >
                            <asp:TextBox ID="txtIntro"  TextMode="MultiLine" Rows="3" Width="98%"  runat="server"></asp:TextBox>
                        </td>
                    </tr>
                     <tr>   
                        <td class="td">活动简介</td>
                        <td ><FCKeditorV2:FCKeditor ID="txtDetail" runat="server" DefaultLanguage="zh-cn" Height="300px" Width="98%" ></FCKeditorV2:FCKeditor></td>
                    </tr>
                     <tr>   
                        <td class="td">状态</td>
                        <td >
                            <asp:RadioButtonList ID="rblIsAct" RepeatDirection="Horizontal" runat="server">
                                    <asp:ListItem  Text="启用" Value="1"></asp:ListItem>
                                    <asp:ListItem  Text="未启用" Value="0"></asp:ListItem>
                            </asp:RadioButtonList>
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
