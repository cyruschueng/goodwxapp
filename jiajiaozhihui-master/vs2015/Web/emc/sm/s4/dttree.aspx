<%@ Page Language="C#" MasterPageFile="~/MasterPage/FrameTemplate.Master" AutoEventWireup="true" CodeBehind="dttree.aspx.cs" Inherits="SfSoft.web.emc.sm.s4.dttree" Title="无标题页" %>
<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
<script language =javascript >
            function OpenDocument( FunID )
            {                
               parent.mainbody.location="list.aspx?state=browse&FunID="+FunID;
            }
</script>
    <asp:Panel ID="Panel1" runat="server" Height="424px" ScrollBars="Auto" Width="175px">
        <asp:TreeView ID="DTTreeView" runat="server" ExpandDepth="1">
        </asp:TreeView>
    </asp:Panel>
</asp:Content>
