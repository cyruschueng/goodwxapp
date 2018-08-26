<%@ Page Language="C#" MasterPageFile="~/MasterPage/PageTemplate.Master" AutoEventWireup="true" CodeBehind="update.aspx.cs" Inherits="SfSoft.web.emc.parents.plan.update" Title="无标题页" %>
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
                        <td class="td">活动编码</td>
                        <td ><asp:DropDownList ID="ddlAppId" runat="server">
                            <asp:ListItem Text="app001" Value="app001"></asp:ListItem>
                            <asp:ListItem Text="app002" Value="app002"></asp:ListItem>
                            <asp:ListItem Text="app003" Value="app003"></asp:ListItem>
                            <asp:ListItem Text="app004" Value="app004"></asp:ListItem>
                            <asp:ListItem Text="app005" Value="app005"></asp:ListItem>
                        </asp:DropDownList></td>
                    </tr>
                    <tr>
                        <td class="td">计划名称</td>
                        <td ><asp:TextBox ID="txtPlanName" runat="server" Width="95%"></asp:TextBox></td>
                    </tr>
                    <tr>
                        <td class="td">关数</td>
                        <td ><asp:TextBox TextMode="Number" ID="txtSn" onkeyup="javascript:permitInt(this);" runat="server" ></asp:TextBox></td>
                    </tr>
                    <tr>
                        <td class="td">过关分数</td>
                        <td ><asp:TextBox TextMode="Number" ID="txtScore" onkeyup="javascript:permitInt(this);" runat="server"></asp:TextBox></td>
                    </tr>
                    
                    <tr>
                        <td class="td">证书名称</td>
                        <td ><asp:TextBox ID="txtMedalName"  runat="server"></asp:TextBox></td>
                    </tr>
                    <tr>
                        <td class="td">题库</td>
                        <td >
                            <asp:DropDownList ID="ddlClass1" AutoPostBack="true" runat="server"  CssClass="questionclass"
                                onselectedindexchanged="ddlClass1_SelectedIndexChanged"></asp:DropDownList>
                            &nbsp;&nbsp;&nbsp;
                            <asp:DropDownList ID="ddlClass2" runat="server"  CssClass="questionclass"
                                onselectedindexchanged="ddlClass2_SelectedIndexChanged"></asp:DropDownList>
                        </td>
                    </tr>
                    <tr>
                        <td class="td">题库数量</td>
                        <td ><asp:TextBox TextMode="Number" ID="txtQuantity" onkeyup="javascript:permitInt(this);" runat="server"></asp:TextBox></td>
                    </tr>
                    <tr>
                        <td class="td">简介</td>
                        <td ><asp:TextBox TextMode="MultiLine" ID="txtIntro"  Rows="3" runat="server" Width="98%" ></asp:TextBox></td>
                    </tr>
                     <tr>   
                        <td class="td">学习内容</td>
                        <td ><FCKeditorV2:FCKeditor ID="txtContents" runat="server" DefaultLanguage="zh-cn" Height="300px" Width="98%" ></FCKeditorV2:FCKeditor></td>
                    </tr>
                     <tr>   
                        <td class="td">状态</td>
                        <td >
                            <asp:DropDownList ID="ddlStatus" runat="server">
                                <asp:ListItem Text="启用" Value="1"></asp:ListItem>
                                <asp:ListItem Text="未启用" Value="0"></asp:ListItem>
                            </asp:DropDownList>
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
