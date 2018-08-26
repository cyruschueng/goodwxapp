<%@ Page Language="C#" MasterPageFile="~/MasterPage/FrameTemplate.Master" AutoEventWireup="true" CodeBehind="bdtree.aspx.cs" Inherits="SfSoft.web.emc.gardenia.task.bdtree" Title="无标题页" %>
<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
<script language =javascript >
            function OpenEveryDay(classId) {
                parent.mainbody.location = "everyday.aspx?state=browse&classId=" + classId;
            }
            function OpenEveryWeek(classId) {
                parent.mainbody.location = "everyweeks.aspx?state=browse&classId=" + classId;
            }
            function OpenEveryMonth(classId) {
                parent.mainbody.location = "everymonth.aspx?state=browse&classId=" + classId;
            }
            function OpenWangMama(classId) {
                parent.mainbody.location = "wangmama.aspx?state=browse&classId=" + classId;
            }
</script>
    <asp:Panel ID="Panel1" runat="server" Height="424px" ScrollBars="Auto" Width="175px">
        <asp:TreeView ID="BDTreeView" runat="server" ExpandDepth="1"  >
        </asp:TreeView>
    </asp:Panel>
</asp:Content>
