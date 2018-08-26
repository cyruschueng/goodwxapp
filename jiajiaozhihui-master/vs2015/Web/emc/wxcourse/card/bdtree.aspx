<%@ Page Language="C#" MasterPageFile="~/MasterPage/FrameTemplate.Master" AutoEventWireup="true" CodeBehind="bdtree.aspx.cs" Inherits="SfSoft.web.emc.wxcourse.card.bdtree" Title="无标题页" %>
<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
<script language =javascript >
            function OpenDocument( ClassID,mediaType ) {                
               parent.mainbody.location="list.aspx?state=browse&ClassID="+ClassID+"&mediaType="+mediaType;
            }
</script>
    <asp:Panel ID="Panel1" runat="server" Height="424px" ScrollBars="Auto" Width="175px">
        <asp:TreeView ID="BDTreeView" runat="server" ExpandDepth="1"  >
        </asp:TreeView>
    </asp:Panel>
</asp:Content>
