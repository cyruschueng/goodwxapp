<%@ Page Language="C#" MasterPageFile="~/MasterPage/PageTemplate.Master" AutoEventWireup="true" CodeBehind="updatepassd.aspx.cs" Inherits="SfSoft.web.emc.updatepassd" Title="密码修改" %>
<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
    <cc1:TabOptionWebControls ID="TabOptionWebControls1" runat="server">
        <cc1:TabOptionItem ID="TabOptionItem1" runat="server" Tab_Name="密码修改">
            用户名：<asp:Label ID="Lbl_UserName" runat="server" Width="146px"></asp:Label>
            <br />
            原密码：<asp:TextBox ID="txt_OldPassword" runat="server" TextMode="Password"></asp:TextBox>
            <asp:RequiredFieldValidator ID="RequiredFieldValidator1" runat="server" ControlToValidate="txt_OldPassword"
                ErrorMessage="RequiredFieldValidator">必须输入原密码</asp:RequiredFieldValidator><br />
            新密码：<asp:TextBox ID="txt_NewPassword" runat="server" TextMode="Password"></asp:TextBox>      <br /><br />
            <asp:Button ID="btn_SecUpdate" runat="server" OnClick="btn_SecUpdate_Click" CssClass="btn" onmouseover="this.className='btn_mouseover'" onmouseout="this.className='btn'" Text="更新密码" /> 
      
            <asp:Label ID="lbl_Tips" runat="server" ForeColor="Red"></asp:Label></cc1:TabOptionItem>
    </cc1:TabOptionWebControls>
</asp:Content>
