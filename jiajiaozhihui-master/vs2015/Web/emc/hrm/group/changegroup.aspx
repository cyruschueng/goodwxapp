<%@ Page Language="C#" MasterPageFile="~/MasterPage/PageTemplate.Master" AutoEventWireup="true"
    CodeBehind="changegroup.aspx.cs" Inherits="SfSoft.web.emc.hrm.group.changegroup"
    Title="部门调整" %>

<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
    <cc1:TabOptionWebControls ID="TabOptionWebControls1" runat="server">
        <cc1:TabOptionItem ID="TabOptionItem1" runat="server" Tab_Name="部门调整">
        <table class="fromtable"><tr><td>
            原部门：&nbsp;<asp:TextBox ID="txtDeptName" runat="server" Width="194px"></asp:TextBox>
            <br />  <br /><br />
            调整到：<asp:DropDownList ID="ddlDeptID" runat="server">
            </asp:DropDownList>
            下级<asp:HiddenField ID="hfDeptID" runat="server" />
         </td></tr></table>
        </cc1:TabOptionItem>
    </cc1:TabOptionWebControls>
</asp:Content>
