<%@ Page Language="C#" MasterPageFile="~/MasterPage/TargetTemplate.Master" AutoEventWireup="true" CodeBehind="ApproveList.aspx.cs" Inherits="SfSoft.web.emc.common.ApproveList" Title="无标题页" %>
<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
    <cc1:TabOptionWebControls ID="TabOptionWebControls1" runat="server">
        <cc1:TabOptionItem ID="TabOptionItem1" runat="server" Tab_Name="审批记录">
        <table class="divtitle" style="width:100%"><tr><td>
         <asp:PlaceHolder ID="phAppResult" runat="server"></asp:PlaceHolder>
         
         
         </td></tr>
         <tr><td>
         <asp:Label ID="lblApproval" runat ="server" ></asp:Label>
         </td></tr>
         </table>
         
        </cc1:TabOptionItem>
    </cc1:TabOptionWebControls>        
</asp:Content>
