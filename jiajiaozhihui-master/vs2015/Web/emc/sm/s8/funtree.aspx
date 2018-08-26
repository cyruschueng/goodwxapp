<%@ Page Language="C#" MasterPageFile="~/MasterPage/FrameTemplate.Master" AutoEventWireup="true" CodeBehind="funtree.aspx.cs" Inherits="SfSoft.web.emc.sm.s8.funtree" Title="无标题页" %>
<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
<script language =javascript >
            function OpenDocument( MID, MName )
            {                
               parent.mainbody.location="list.aspx?state=browse&mode=list&MID="+MID+"&MName="+MName;
            }
</script>
    <asp:Panel ID="Panel1" runat="server" Height="424px" ScrollBars="Auto" Width="175px">
        <asp:TreeView ID="FunTreeView" runat="server" ExpandDepth="1">
        </asp:TreeView>
    </asp:Panel>
</asp:Content>
