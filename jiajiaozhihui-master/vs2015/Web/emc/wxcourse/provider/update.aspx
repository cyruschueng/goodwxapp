<%@ Page Language="C#" MasterPageFile="~/MasterPage/PageTemplate.Master" AutoEventWireup="true" CodeBehind="update.aspx.cs" Inherits="SfSoft.web.emc.wxcourse.provider.update" Title="无标题页" %>
<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
    <script src="../../../js/My97DatePicker/WdatePicker.js" type="text/javascript"></script>
    <script  src="/js/emccommon.js"></script>
    <cc1:TabOptionWebControls ID="TabOptionWebControls1" runat="server">
        <cc1:TabOptionItem ID="TabOptionItem1" runat="server" Tab_Name="编辑课程供应商">
            <asp:Panel ID="Panel1" GroupingText="基本数据" runat="server">
                <table border="0" cellpadding="2" cellspacing="0" width="100%" class="fromtable">
                    <tr>
                        <td>供应商</td>
                        <td ><asp:TextBox ID="txtName" runat="server" Width="95%"></asp:TextBox></td>
                        <td >类型</td>
                        <td >
                            <asp:DropDownList ID="ddlType" runat="server" Width="95%" CssClass="select">
                                <asp:ListItem Text="" Value="" ></asp:ListItem>
                                <asp:ListItem Text="公司" Value="1" ></asp:ListItem>
                                <asp:ListItem Text="个人" Value="2"></asp:ListItem>
                            </asp:DropDownList>
                        </td>
                        <td >状态</td>
                        <td >
                            <asp:DropDownList ID="ddlIsAct" runat="server" Width="95%" CssClass="select">
                                <asp:ListItem Text="" Value="" ></asp:ListItem>
                                <asp:ListItem Text="正常" Value="1" ></asp:ListItem>
                                <asp:ListItem Text="取消" Value="0"></asp:ListItem>
                            </asp:DropDownList>
                        </td>
                        <td>合作日期</td>
                        <td ><asp:TextBox ID="txtCollDate" onFocus="WdatePicker({isShowClear:true,readOnly:true})" runat="server" Width="95%"></asp:TextBox></td>
                    </tr>
                    <tr>
                        <td >联系人</td>
                        <td "><asp:TextBox ID="txtLinkMan" runat="server" Width="95%"></asp:TextBox></td>
                        <td >手机</td>
                        <td "><asp:TextBox ID="txtMobile" runat="server" Width="95%"></asp:TextBox></td>
                        <td >微信号</td>
                        <td "><asp:TextBox ID="txtWeixin" runat="server" Width="95%"></asp:TextBox></td>
                        <td >QQ号</td>
                        <td "><asp:TextBox ID="txtQQ" runat="server" Width="95%"></asp:TextBox></td>
                    </tr>
                    <tr>
                        <td >收款帐号</td>
                        <td "><asp:TextBox ID="txtAccountNumber" runat="server" Width="95%"></asp:TextBox></td>
                        <td >收款户名</td>
                        <td "><asp:TextBox ID="txtBeneficiaryName" runat="server" Width="95%"></asp:TextBox></td>
                        <td >收款银行</td>
                        <td "><asp:TextBox ID="txtReceivingBank" runat="server" Width="95%"></asp:TextBox></td>
                        <td ></td>
                        <td "></td>
                    </tr>
                </table>
            </asp:Panel>
            <asp:HiddenField ID="hfMode" runat="server" />
            <asp:HiddenField ID="hfMID" runat="server" />
            <asp:HiddenField ID="hfID" runat="server" />
        </cc1:TabOptionItem>
    </cc1:TabOptionWebControls>
</asp:Content>
