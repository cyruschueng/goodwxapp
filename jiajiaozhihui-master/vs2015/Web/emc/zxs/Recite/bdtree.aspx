<%@ Page Language="C#" MasterPageFile="~/MasterPage/FrameTemplate.Master" AutoEventWireup="true" CodeBehind="bdtree.aspx.cs" Inherits="SfSoft.web.emc.zxs.recite.bdtree" Title="无标题页" %>
<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
<script language =javascript >
    function OpenDocument(ThemId, Week) {
        parent.mainbody.location = "list.aspx?state=browse&AppId=" + ThemId + "&ThemId=" + Week;
            }
</script>
    <asp:Panel ID="Panel1" runat="server" Height="100%" ScrollBars="Auto" Width="175px">
        <asp:TreeView ID="BDTreeView" runat="server" ExpandDepth="1"  >
        </asp:TreeView>
    </asp:Panel>
</asp:Content>
