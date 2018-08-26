<%@ Page Language="C#" MasterPageFile="~/MasterPage/FrameTemplate.Master" AutoEventWireup="true" CodeBehind="left.aspx.cs" Inherits="SfSoft.web.help.emc.left" Title="无标题页" %>
<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
<script type ="text/javascript" language ="javascript" >
function openupdate(helpid,dpath) {
  if (dpath=="") {
  parent.mainFrame.location="main.aspx?state=browse&HelpID="+helpid;
  }
  else {
  parent.mainFrame.location=dpath+"?state=browse&HelpID="+helpid;
  }
}
</script>
                
                            <asp:TreeView ID="TreeView1" runat="server" ExpandDepth="2" Width="130px" SkinID="Roles" style="background-color :#F5F6F6">
                            </asp:TreeView>
                        
</asp:Content>
